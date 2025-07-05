// app/debug/page.js
'use client';

import { useState, useRef } from 'react';
import AnimatedContainer from '../components/AnimatedContainer';

export default function DebugPage() {
    const [currentSection, setCurrentSection] = useState(0);
    const containerRef = useRef(null);

    const TestSection = ({ title, color }) => (
        <div className={`w-full h-screen flex items-center justify-center ${color}`}>
            <h1 className="text-6xl font-bold text-white">{title}</h1>
        </div>
    );

    const sections = [
        <TestSection key="0" title="Section 1" color="bg-red-500" />,
        <TestSection key="1" title="Section 2" color="bg-blue-500" />,
        <TestSection key="2" title="Section 3" color="bg-green-500" />,
        <TestSection key="3" title="Section 4" color="bg-purple-500" />
    ];

    const handleSectionChange = (index) => {
        console.log('Debug: Changing to section', index);
        if (containerRef.current?.navigateToSection) {
            containerRef.current.navigateToSection(index);
        }
    };

    return (
        <div className="relative">
            <nav className="fixed top-0 left-0 right-0 z-50 bg-black text-white p-4">
                <div className="flex space-x-4">
                    {sections.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => handleSectionChange(index)}
                            className={`px-4 py-2 rounded ${currentSection === index ? 'bg-blue-500' : 'bg-gray-700'
                                }`}
                        >
                            Section {index + 1}
                        </button>
                    ))}
                </div>
                <div className="mt-2 text-sm">
                    Current Section: {currentSection}
                </div>
            </nav>

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
