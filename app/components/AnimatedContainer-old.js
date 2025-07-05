// app/components/AnimatedContainer.js
'use client';

import { useEffect, useRef, forwardRef, useImperativeHandle } from 'react';
import { gsap } from 'gsap';

const AnimatedContainer = forwardRef(({ children, currentSection, setCurrentSection }, ref) => {
    const containerRef = useRef(null);
    const sectionsRef = useRef([]);
    const timelineRef = useRef(null);    useImperativeHandle(ref, () => ({
        navigateToSection: (sectionIndex) => {
            console.log('Navigating to section:', sectionIndex, 'of', children.length);
            if (sectionIndex >= 0 && sectionIndex < children.length) {
                if (children.length === 1) {
                    // If only one section, just show it
                    setCurrentSection(sectionIndex);
                    return;
                }
                
                if (timelineRef.current) {
                    const progress = sectionIndex / (children.length - 1);
                    console.log('Timeline progress:', progress);
                    timelineRef.current.progress(progress);
                }
                setCurrentSection(sectionIndex);
            }
        }
    }));    useEffect(() => {
        const sections = sectionsRef.current;
        if (!sections.length || sections.length !== children.length) {
            console.log('Sections not ready yet, waiting...', sections.length, children.length);
            return;
        }

        console.log('Setting up timeline with', sections.length, 'sections');

        // Initialize all sections as hidden except the first one
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

        // Create timeline for section transitions
        const tl = gsap.timeline({ paused: true });

        if (sections.length > 1) {
            for (let i = 1; i < sections.length; i++) {
                const prevSection = sections[i - 1];
                const currentSection = sections[i];
                const progress = (i - 1) / (sections.length - 1);

                if (prevSection && currentSection) {
                    // Animate previous section out
                    tl.to(prevSection, {
                        y: '-100vh',
                        opacity: 0,
                        scale: 0.8,
                        duration: 0.8,
                        ease: 'power2.inOut',
                        onStart: () => {
                            gsap.set(prevSection, { zIndex: 1 });
                        }
                    }, progress)
                    // Animate current section in
                    .to(currentSection, {
                        y: 0,
                        opacity: 1,
                        scale: 1,
                        duration: 0.8,
                        ease: 'power2.inOut',
                        onStart: () => {
                            gsap.set(currentSection, { zIndex: 10 });
                        }
                    }, progress);
                }
            }
        }

        timelineRef.current = tl;
        console.log('Timeline created successfully');

        return () => {
            if (tl) {
                tl.kill();
            }
        };
    }, [children.length, setCurrentSection]);// Handle keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'ArrowDown' || e.key === 'PageDown') {
                e.preventDefault();
                const nextSection = Math.min(currentSection + 1, children.length - 1);
                if (nextSection !== currentSection) {
                    console.log('Keyboard navigation: moving to section', nextSection);
                    if (timelineRef.current) {
                        const progress = nextSection / (children.length - 1);
                        timelineRef.current.progress(progress);
                    }
                    setCurrentSection(nextSection);
                }
            } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
                e.preventDefault();
                const prevSection = Math.max(currentSection - 1, 0);
                if (prevSection !== currentSection) {
                    console.log('Keyboard navigation: moving to section', prevSection);
                    if (timelineRef.current) {
                        const progress = prevSection / (children.length - 1);
                        timelineRef.current.progress(progress);
                    }
                    setCurrentSection(prevSection);
                }
            }
        };        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [currentSection, children.length, setCurrentSection]);

    // Debug: Log current section changes
    useEffect(() => {
        console.log('Current section changed to:', currentSection);
    }, [currentSection]);

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
