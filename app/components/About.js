'use client';

import { InView } from '@/components/motion-primitives/in-view';

export default function About() {
  return (
    <section id="about" className="relative px-6 md:px-12 py-24 md:py-32">
      <div className="max-w-3xl mx-auto">
        <InView
          once
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          viewOptions={{ margin: '0px 0px -10% 0px' }}
        >
          <p className="text-accent text-sm tracking-[0.2em] uppercase mb-4">
            About
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink mb-8">
            Developer focused on clear, crafted interfaces.
          </h2>
          <div className="space-y-5 text-lg text-muted leading-relaxed">
            <p>
              I&apos;m Atul Kumbhar — a developer building modern web
              applications with an eye for motion, structure, and the details
              that make products feel finished.
            </p>
            <p>
              I work across React and Next.js stacks, turning ideas into
              experiences that feel intentional from the first scroll.
            </p>
          </div>
        </InView>
      </div>
    </section>
  );
}
