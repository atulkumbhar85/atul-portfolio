'use client';

import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

const SECTIONS = [
  { id: 'hero', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Work' },
  { id: 'contact', label: 'Contact' },
];

export default function Navbar() {
  const [active, setActive] = useState('hero');

  useEffect(() => {
    const elements = SECTIONS.map(({ id }) => document.getElementById(id)).filter(
      Boolean
    );

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNav = (e, id) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 pt-4 px-4 pointer-events-none">
      <nav className="mx-auto max-w-5xl flex items-center justify-between pointer-events-auto rounded-none border border-border bg-bg/80 backdrop-blur-md px-5 py-3">
        <a
          href="#hero"
          onClick={(e) => handleNav(e, 'hero')}
          className="font-display text-sm tracking-wide text-ink hover:text-accent transition-colors"
        >
          AK
        </a>
        <ul className="flex items-center gap-1 sm:gap-4">
          {SECTIONS.filter((s) => s.id !== 'hero').map(({ id, label }) => (
            <li key={id}>
              <a
                href={`#${id}`}
                onClick={(e) => handleNav(e, id)}
                className={cn(
                  'relative text-xs sm:text-sm px-2 py-1 transition-colors',
                  active === id ? 'text-accent' : 'text-muted hover:text-ink'
                )}
              >
                {label}
                {active === id && (
                  <span className="absolute left-2 right-2 -bottom-0.5 h-px bg-accent" />
                )}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}
