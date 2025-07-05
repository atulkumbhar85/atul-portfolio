// app/test-page.js
'use client';

import { useState } from 'react';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';

export default function TestPage() {
    const [currentSection, setCurrentSection] = useState(0);

    const sections = [
        { name: 'About', component: <About key="about" /> },
        { name: 'Skills', component: <Skills key="skills" /> },
        { name: 'Projects', component: <Projects key="projects" /> },
        { name: 'Contact', component: <Contact key="contact" /> }
    ];

    return (
        <div className="relative">
            {/* Simple Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg text-white px-6 py-4">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-2xl font-bold">Test Navigation</div>
                    <div className="flex space-x-4">
                        {sections.map((section, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentSection(index)}
                                className={`px-4 py-2 rounded-lg transition-all duration-300 ${currentSection === index
                                        ? 'text-blue-400 bg-blue-400/20'
                                        : 'text-white hover:bg-white/10'
                                    }`}
                            >
                                {section.name}
                            </button>
                        ))}
                    </div>
                </div>
            </nav>

            {/* Simple Section Display */}
            <div className="relative w-full h-screen overflow-hidden">
                {sections.map((section, index) => (
                    <div
                        key={index}
                        className={`absolute inset-0 w-full h-full transition-opacity duration-500 ${index === currentSection ? 'opacity-100' : 'opacity-0 pointer-events-none'
                            }`}
                    >
                        {section.component}
                    </div>
                ))}
            </div>

            {/* Debug Info */}
            <div className="fixed bottom-4 left-4 bg-black/80 text-white p-4 rounded-lg">
                <p>Current Section: {currentSection} ({sections[currentSection]?.name})</p>
            </div>
        </div>
    );
}
