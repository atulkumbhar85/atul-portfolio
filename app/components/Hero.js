'use client';

import { TextEffect } from '@/components/motion-primitives/text-effect';
import { Magnetic } from '@/components/motion-primitives/magnetic';

export default function Hero() {
  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-12 overflow-hidden"
    >
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden
        style={{
          background:
            'radial-gradient(ellipse 70% 60% at 70% 40%, rgba(61,255,232,0.12), transparent 60%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto w-full pt-24 pb-16">
        <TextEffect
          as="h1"
          per="char"
          preset="fade-in-blur"
          className="font-display text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold tracking-tight text-ink leading-[0.95]"
        >
          Atul Kumbhar
        </TextEffect>

        <p className="mt-8 max-w-xl text-lg md:text-xl text-muted leading-relaxed">
          I build modern web applications where craft and motion meet clarity.
        </p>

        <div className="mt-10 flex flex-wrap gap-4">
          <Magnetic intensity={0.3} range={80}>
            <button
              type="button"
              onClick={() => scrollTo('projects')}
              className="px-7 py-3 bg-accent text-bg font-medium text-sm tracking-wide hover:brightness-110 transition-[filter]"
            >
              View work
            </button>
          </Magnetic>
          <Magnetic intensity={0.3} range={80}>
            <button
              type="button"
              onClick={() => scrollTo('contact')}
              className="px-7 py-3 border border-border text-ink font-medium text-sm tracking-wide hover:border-accent hover:text-accent transition-colors"
            >
              Contact
            </button>
          </Magnetic>
        </div>
      </div>
    </section>
  );
}
