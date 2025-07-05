// app/components/Scene3D.js
'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

const Scene3D = ({ sceneType = 'default' }) => {
    const containerRef = useRef(null);

    useEffect(() => {
        if (!containerRef.current) return;

        const container = containerRef.current;

        // Clear previous animations
        gsap.killTweensOf(container.children);

        // Create floating elements based on scene type
        const createFloatingElements = () => {
            container.innerHTML = '';

            const colors = {
                'about': ['#3B82F6', '#8B5CF6', '#06B6D4'],
                'skills': ['#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#06B6D4'],
                'projects': ['#F59E0B', '#EF4444', '#10B981'],
                'contact': ['#8B5CF6', '#3B82F6', '#06B6D4'],
                'default': ['#3B82F6', '#10B981', '#F59E0B']
            };

            const sceneColors = colors[sceneType] || colors['default'];
            const numElements = sceneColors.length;

            for (let i = 0; i < numElements; i++) {
                const element = document.createElement('div');
                element.className = 'absolute rounded-full opacity-60';

                // Random size
                const size = Math.random() * 100 + 50;
                element.style.width = `${size}px`;
                element.style.height = `${size}px`;

                // Random position
                element.style.left = `${Math.random() * 100}%`;
                element.style.top = `${Math.random() * 100}%`;

                // Gradient background
                element.style.background = `linear-gradient(45deg, ${sceneColors[i]}, ${sceneColors[(i + 1) % sceneColors.length]})`;

                // Add subtle shadow
                element.style.boxShadow = `0 0 20px ${sceneColors[i]}40`;

                container.appendChild(element);
            }
        };

        createFloatingElements();

        // Animate elements
        const elements = container.children;
        Array.from(elements).forEach((element, index) => {
            // Initial animation
            gsap.fromTo(element,
                {
                    scale: 0,
                    opacity: 0,
                    rotation: 0
                },
                {
                    scale: 1,
                    opacity: 0.6,
                    rotation: 360,
                    duration: 2,
                    delay: index * 0.3,
                    ease: 'elastic.out(1, 0.3)'
                }
            );

            // Continuous floating animation
            gsap.to(element, {
                y: `${Math.random() * 100 - 50}px`,
                x: `${Math.random() * 100 - 50}px`,
                rotation: `+=${360 + Math.random() * 180}`,
                duration: 8 + Math.random() * 4,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: Math.random() * 2
            });

            // Scale animation
            gsap.to(element, {
                scale: 0.8 + Math.random() * 0.4,
                duration: 3 + Math.random() * 2,
                repeat: -1,
                yoyo: true,
                ease: 'sine.inOut',
                delay: Math.random() * 1
            });
        });

        return () => {
            gsap.killTweensOf(elements);
        };
    }, [sceneType]);

    return (
        <div
            ref={containerRef}
            className="absolute inset-0 overflow-hidden pointer-events-none"
            style={{ zIndex: 1 }}
        />
    );
};

export default Scene3D;
