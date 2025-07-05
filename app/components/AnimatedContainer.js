// app/components/AnimatedContainer.js
'use client';

import { useEffect, useRef, forwardRef, useImperativeHandle, useCallback } from 'react';
import { gsap } from 'gsap';

const AnimatedContainer = forwardRef(({ children, currentSection, setCurrentSection }, ref) => {
    const containerRef = useRef(null);
    const sectionsRef = useRef([]);

    useImperativeHandle(ref, () => ({
        navigateToSection: (sectionIndex) => {
            console.log('Navigating to section:', sectionIndex);
            if (sectionIndex >= 0 && sectionIndex < children.length) {
                animateToSection(sectionIndex);
            }
        }
    }));

    // Debug: Log current section changes
    useEffect(() => {
        console.log('Current section changed to:', currentSection);
    }, [currentSection]); const animateToSection = useCallback((targetIndex) => {
        const sections = sectionsRef.current;
        const currentIndex = currentSection;

        if (targetIndex === currentIndex || !sections[targetIndex]) return;

        console.log('Animating from section', currentIndex, 'to section', targetIndex);

        const currentSectionEl = sections[currentIndex];
        const targetSectionEl = sections[targetIndex];

        // Create timeline for the transition
        const tl = gsap.timeline({
            onComplete: () => {
                setCurrentSection(targetIndex);
                console.log('Animation complete, section set to:', targetIndex);
            }
        });

        // Animate out current section
        if (currentSectionEl) {
            tl.to(currentSectionEl, {
                y: targetIndex > currentIndex ? '-100vh' : '100vh',
                opacity: 0,
                scale: 0.8,
                duration: 0.8,
                ease: 'power2.inOut',
                onStart: () => {
                    gsap.set(currentSectionEl, { zIndex: 1 });
                }
            });
        }

        // Animate in target section
        if (targetSectionEl) {
            // Set initial position
            gsap.set(targetSectionEl, {
                y: targetIndex > currentIndex ? '100vh' : '-100vh',
                opacity: 0,
                scale: 0.8,
                zIndex: 10
            });

            tl.to(targetSectionEl, {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 0.8,
                ease: 'power2.inOut'
            }, 0.2);
        }
    }, [currentSection, setCurrentSection]);

    // Initialize sections
    useEffect(() => {
        const sections = sectionsRef.current;
        if (!sections.length || sections.length !== children.length) {
            console.log('Sections not ready yet, waiting...', sections.length, children.length);
            return;
        }

        console.log('Initializing sections...');

        // Initialize all sections
        sections.forEach((section, index) => {
            if (section) {
                if (index === 0) {
                    gsap.set(section, {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        zIndex: 10
                    });
                } else {
                    gsap.set(section, {
                        y: '100vh',
                        opacity: 0,
                        scale: 0.8,
                        zIndex: 1
                    });
                }
            }
        });

        console.log('Sections initialized successfully');
    }, [children.length]);

    // Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                e.preventDefault();
                const nextSection = Math.min(currentSection + 1, children.length - 1);
                if (nextSection !== currentSection) {
                    animateToSection(nextSection);
                }
            } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                e.preventDefault();
                const prevSection = Math.max(currentSection - 1, 0);
                if (prevSection !== currentSection) {
                    animateToSection(prevSection);
                }
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentSection, children.length, animateToSection]);

    return (
        <div
            ref={containerRef}
            className="animated-container relative w-full h-screen overflow-hidden"
        >
            {children.map((child, index) => (
                <div
                    key={index}
                    ref={el => sectionsRef.current[index] = el}
                    className="absolute inset-0 w-full h-full"
                >
                    {child}
                </div>
            ))}
        </div>
    );
});

AnimatedContainer.displayName = 'AnimatedContainer';

export default AnimatedContainer;
