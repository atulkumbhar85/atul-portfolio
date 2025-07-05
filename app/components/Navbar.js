// app/components/Navbar.js
'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

const Navbar = ({ currentSection, onSectionChange }) => {
    const navRef = useRef(null);
    const indicatorRef = useRef(null);
    const buttonRefs = useRef([]);
    const hideTimeoutRef = useRef(null);
    const [isVisible, setIsVisible] = useState(true);
    const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });
    const sections = ['about', 'skills', 'projects', 'contact'];

    useEffect(() => {
        // Animate navbar on mount
        gsap.fromTo(navRef.current,
            { y: -100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
        );
    }, []);

    // Auto-hide navbar functionality
    useEffect(() => {
        const handleMouseMove = (e) => {
            const mouseX = e.clientX;
            const mouseY = e.clientY;

            // Show navbar when mouse is at the top of the screen
            if (mouseY <= 100) {
                setIsVisible(true);
                if (hideTimeoutRef.current) {
                    clearTimeout(hideTimeoutRef.current);
                }
            } else {
                // Hide navbar after 3 seconds of no mouse movement near the top
                if (hideTimeoutRef.current) {
                    clearTimeout(hideTimeoutRef.current);
                }
                hideTimeoutRef.current = setTimeout(() => {
                    setIsVisible(false);
                }, 3000);
            }

            setLastMousePosition({ x: mouseX, y: mouseY });
        };

        const handleMouseLeave = () => {
            // Hide navbar when mouse leaves the window
            if (hideTimeoutRef.current) {
                clearTimeout(hideTimeoutRef.current);
            }
            hideTimeoutRef.current = setTimeout(() => {
                setIsVisible(false);
            }, 2000);
        };

        const handleKeyDown = (e) => {
            // Show navbar on any key press
            if (e.key === 'Escape' || e.key === 'Tab') {
                setIsVisible(true);
                if (hideTimeoutRef.current) {
                    clearTimeout(hideTimeoutRef.current);
                }
            }
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseleave', handleMouseLeave);
        window.addEventListener('keydown', handleKeyDown);

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseleave', handleMouseLeave);
            window.removeEventListener('keydown', handleKeyDown);
            if (hideTimeoutRef.current) {
                clearTimeout(hideTimeoutRef.current);
            }
        };
    }, []);

    // Animate navbar visibility
    useEffect(() => {
        if (navRef.current) {
            gsap.to(navRef.current, {
                y: isVisible ? 0 : -100,
                opacity: isVisible ? 1 : 0,
                duration: 0.3,
                ease: 'power2.inOut'
            });
        }
    }, [isVisible]);

    useEffect(() => {
        // Animate indicator position based on active button
        if (indicatorRef.current && buttonRefs.current[currentSection]) {
            const activeButton = buttonRefs.current[currentSection];
            const buttonRect = activeButton.getBoundingClientRect();
            const navRect = activeButton.parentElement.parentElement.getBoundingClientRect();

            const leftPosition = activeButton.offsetLeft;
            const buttonWidth = activeButton.offsetWidth;

            gsap.to(indicatorRef.current, {
                x: leftPosition,
                width: buttonWidth,
                duration: 0.5,
                ease: 'power2.inOut'
            });
        }
    }, [currentSection]);

    const handleSectionClick = (index) => {
        if (onSectionChange) {
            onSectionChange(index);
        }
    }; return (
        <>
            {/* Navbar */}
            <nav
                ref={navRef}
                className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-lg text-white px-6 py-4 transition-all duration-300"
            >
                <div className="container mx-auto flex justify-between items-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                        Atul Kumbhar
                    </div>
                    <div className="relative">
                        <ul className="flex space-x-6">
                            {sections.map((section, index) => (
                                <li key={section}>
                                    <button
                                        ref={el => buttonRefs.current[index] = el}
                                        onClick={() => handleSectionClick(index)}
                                        className={`px-4 py-2 rounded-lg transition-all duration-300 hover:text-blue-400 ${currentSection === index
                                            ? 'text-blue-400 bg-blue-400/20'
                                            : 'text-white hover:bg-white/10'
                                            }`}
                                    >
                                        {section.charAt(0).toUpperCase() + section.slice(1)}
                                    </button>
                                </li>
                            ))}
                        </ul>
                        <div
                            ref={indicatorRef}
                            className="absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-600 rounded-full"
                            style={{ width: '64px' }}
                        />
                    </div>
                </div>
            </nav>

            {/* Navbar Hint - Only show when navbar is hidden */}
            {!isVisible && (
                <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-40 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-b-lg text-sm opacity-70 hover:opacity-100 transition-opacity duration-300">
                    <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                        <span>Move mouse to top to show navigation</span>
                    </div>
                </div>
            )}
        </>
    );
};

export default Navbar;
