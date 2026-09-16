'use client';

import { useEffect, useState, useRef } from 'react';
import { useInView } from 'motion/react';
import { InView } from '@/components/motion-primitives/in-view';
import { AnimatedNumber } from '@/components/motion-primitives/animated-number';
import { InfiniteSlider } from '@/components/motion-primitives/infinite-slider';

const TECH = [
  'JavaScript',
  'React',
  'Next.js',
  'Node.js',
  'TypeScript',
  'Tailwind',
  'Motion',
  'HTML & CSS',
];

const STATS = [
  { label: 'Years building', value: 5, suffix: '+' },
  { label: 'Projects shipped', value: 20, suffix: '+' },
  { label: 'Stack focus', value: 8, suffix: '' },
];

function Stat({ value, label, suffix }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-10%' });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) setDisplay(value);
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-center sm:text-left">
      <div className="font-display text-5xl md:text-6xl font-bold text-ink tabular-nums">
        <AnimatedNumber value={display} />
        {suffix}
      </div>
      <p className="mt-2 text-sm text-muted tracking-wide">{label}</p>
    </div>
  );
}

export default function Skills() {
  return (
    <section id="skills" className="relative px-6 md:px-12 py-24 md:py-32">
      <div className="max-w-5xl mx-auto">
        <InView
          once
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="text-accent text-sm tracking-[0.2em] uppercase mb-4">
            Craft
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink mb-16 max-w-2xl">
            Tools I use to ship polished product experiences.
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 mb-20">
            {STATS.map((stat) => (
              <Stat key={stat.label} {...stat} />
            ))}
          </div>
        </InView>

        <div className="border-y border-border py-8 overflow-hidden">
          <InfiniteSlider gap={48} speed={60} speedOnHover={30}>
            {TECH.map((tech) => (
              <span
                key={tech}
                className="font-display text-2xl md:text-3xl text-muted whitespace-nowrap"
              >
                {tech}
                <span className="text-accent ml-12">/</span>
              </span>
            ))}
          </InfiniteSlider>
        </div>
      </div>
    </section>
  );
}
