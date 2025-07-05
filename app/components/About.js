// app/components/About.js
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Scene3D from './Scene3D';

const About = () => {
    const contentRef = useRef(null);
    const titleRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        tl.fromTo(titleRef.current,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
        )
            .fromTo(textRef.current,
                { y: 50, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.8, ease: 'power2.out' },
                '-=0.5'
            );

        return () => tl.kill();
    }, []);

    return (
        <section className="relative w-full h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 overflow-hidden">
            {/* 3D Scene Background */}
            <div className="absolute inset-0 opacity-30">
                <Scene3D sceneType="about" />
            </div>

            {/* Content */}            <div
                ref={contentRef}
                className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-center"
            >
                <h1
                    ref={titleRef}
                    className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 bg-clip-text text-transparent"
                >
                    About Me
                </h1>
                <div
                    ref={textRef}
                    className="max-w-4xl mx-auto"
                >
                    <p className="text-xl md:text-2xl text-gray-300 mb-6 leading-relaxed">
                        Hi! I&apos;m <span className="text-blue-400 font-semibold">Atul Kumbhar</span>, a passionate developer
                        focused on creating innovative solutions in the tech industry.
                    </p>
                    <p className="text-lg md:text-xl text-gray-400 leading-relaxed">
                        I specialize in building modern web applications with cutting-edge technologies,
                        combining creativity with technical expertise to deliver exceptional user experiences.
                    </p>
                </div>

                {/* Floating particles */}
                <div className="absolute inset-0 pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`,
                                animationDuration: `${2 + Math.random() * 2}s`
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
