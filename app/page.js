'use client';

import { ScrollProgress } from '@/components/motion-primitives/scroll-progress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

export default function Home() {
  return (
    <div className="relative min-h-screen bg-bg text-ink">
      <ScrollProgress className="fixed top-0 left-0 right-0 z-[60] h-0.5 bg-accent" />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
    </div>
  );
}
