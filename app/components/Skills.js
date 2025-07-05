// app/components/Skills.js
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Scene3D from './Scene3D';

const Skills = () => {
    const contentRef = useRef(null);
    const titleRef = useRef(null);
    const skillsRef = useRef([]);
    const skills = [
        { name: "JavaScript", level: 90, color: "#F7DF1E" },
        { name: "React.js", level: 85, color: "#61DAFB" },
        { name: "Next.js", level: 80, color: "#000000" },
        { name: "Node.js", level: 75, color: "#339933" },
        { name: "HTML & CSS", level: 95, color: "#E34F26" },
        { name: "GSAP", level: 70, color: "#88CE02" },
        { name: "Three.js", level: 65, color: "#000000" }
    ]; useEffect(() => {
        const tl = gsap.timeline();

        // Set initial state
        gsap.set(titleRef.current, { y: 100, opacity: 0 });
        gsap.set(skillsRef.current, { y: 50, opacity: 0, scale: 0.8 });

        // Add a small delay to ensure proper initialization
        const animateSection = () => {
            tl.to(titleRef.current, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: 'power2.out'
            })
                .to(skillsRef.current, {
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 0.6,
                    ease: 'back.out(1.7)',
                    stagger: 0.1
                }, '-=0.5');
        };

        // Start animation after a brief delay
        const timer = setTimeout(animateSection, 100);

        return () => {
            clearTimeout(timer);
            tl.kill();
        };
    }, []);

    return (
        <section className="relative w-full h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
            {/* 3D Scene Background */}
            <div className="absolute inset-0 opacity-20">
                <Scene3D sceneType="skills" />
            </div>

            {/* Content */}            <div
                ref={contentRef}
                className="relative z-10 flex flex-col items-center justify-center h-full px-6"
            >
                <h1
                    ref={titleRef}
                    className="text-6xl md:text-8xl font-bold mb-12 bg-gradient-to-r from-green-400 via-blue-500 to-purple-600 bg-clip-text text-transparent text-center"
                >
                    Skills
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl">
                    {skills.map((skill, index) => (
                        <div
                            key={skill.name}
                            ref={el => skillsRef.current[index] = el}
                            className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group"
                        >
                            <div className="text-center">
                                <h3 className="text-xl font-bold text-white mb-4 group-hover:text-blue-400 transition-colors">
                                    {skill.name}
                                </h3>
                                <div className="relative w-full h-3 bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 to-purple-600 rounded-full transition-all duration-1000 ease-out"
                                        style={{
                                            width: `${skill.level}%`,
                                            animationDelay: `${index * 0.1}s`
                                        }}
                                    />
                                </div>
                                <span className="text-sm text-gray-300 mt-2 block">
                                    {skill.level}%
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Skills;
