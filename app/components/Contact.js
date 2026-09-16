'use client';

import { Mail, Link as LinkIcon, AtSign, MapPin } from 'lucide-react';
import { InView } from '@/components/motion-primitives/in-view';
import { Magnetic } from '@/components/motion-primitives/magnetic';
import { TextLoop } from '@/components/motion-primitives/text-loop';

const links = [
  {
    type: 'Email',
    value: 'atulkumbhar1985@gmail.com',
    href: 'mailto:atulkumbhar1985@gmail.com',
    icon: Mail,
  },
  {
    type: 'LinkedIn',
    value: 'Atul Kumbhar',
    href: 'https://www.linkedin.com/in/atul-kumbhar-393523165/',
    icon: LinkIcon,
  },
  {
    type: 'GitHub',
    value: 'View my work',
    href: 'https://github.com/',
    icon: AtSign,
  },
  {
    type: 'Location',
    value: 'Available worldwide',
    href: '#contact',
    icon: MapPin,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="relative px-6 md:px-12 py-24 md:py-32 pb-32">
      <div className="max-w-3xl mx-auto">
        <InView
          once
          variants={{
            hidden: { opacity: 0, y: 40 },
            visible: { opacity: 1, y: 0 },
          }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <p className="text-accent text-sm tracking-[0.2em] uppercase mb-4">
            Contact
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-ink mb-4">
            Let&apos;s build something sharp.
          </h2>
          <div className="text-lg text-muted mb-2 flex flex-wrap items-baseline gap-2">
            Available for
            <TextLoop
              className="text-accent font-medium"
              interval={2.2}
              transition={{ duration: 0.35 }}
            >
              <span>frontend work</span>
              <span>full-stack builds</span>
              <span>product interfaces</span>
            </TextLoop>
          </div>

          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {links.map(({ type, value, href, icon: Icon }) => (
              <Magnetic key={type} intensity={0.25} range={60}>
                <a
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  className="flex items-center gap-4 border border-border bg-surface/40 p-5 hover:border-accent/60 transition-colors group w-full"
                >
                  <Icon
                    className="w-5 h-5 text-muted group-hover:text-accent transition-colors shrink-0"
                    strokeWidth={1.5}
                  />
                  <div className="min-w-0">
                    <p className="text-xs text-muted uppercase tracking-wider">
                      {type}
                    </p>
                    <p className="text-ink truncate group-hover:text-accent transition-colors">
                      {value}
                    </p>
                  </div>
                </a>
              </Magnetic>
            ))}
          </div>
        </InView>
      </div>
    </section>
  );
}
