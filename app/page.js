// app/page.js
'use client';

import { useState, useRef } from 'react';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import AnimatedContainer from './components/AnimatedContainer';
import Navbar from './components/Navbar';
import LoadingScreen from './components/LoadingScreen';

export default function Home() {
  const [currentSection, setCurrentSection] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const containerRef = useRef(null);

  const sections = [
    <About key="about" />,
    <Skills key="skills" />,
    <Projects key="projects" />,
    <Contact key="contact" />
  ];

  const handleSectionChange = (sectionIndex) => {
    console.log('handleSectionChange called with:', sectionIndex);
    if (sectionIndex >= 0 && sectionIndex < sections.length) {
      if (containerRef.current?.navigateToSection) {
        containerRef.current.navigateToSection(sectionIndex);
      }
    }
  };

  const handleLoadComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <LoadingScreen onLoadComplete={handleLoadComplete} />;
  }

  return (
    <div className="relative">
      <Navbar
        currentSection={currentSection}
        onSectionChange={handleSectionChange}
      />
      <AnimatedContainer
        ref={containerRef}
        currentSection={currentSection}
        setCurrentSection={setCurrentSection}
      >
        {sections}
      </AnimatedContainer>
    </div>
  );
}
