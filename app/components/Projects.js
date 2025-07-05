// app/components/Projects.js
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Scene3D from './Scene3D';

const Projects = () => {
    const contentRef = useRef(null);
    const titleRef = useRef(null);
    const projectsRef = useRef([]);

    const projects = [
        {
            title: "3D Animated Portfolio",
            description: "A modern portfolio website featuring 3D animations, GSAP transitions, and immersive user experience.",
            technologies: ["React", "Next.js", "Three.js", "GSAP"],
            gradient: "from-purple-500 to-pink-500"
        },
        {
            title: "Task Manager Pro",
            description: "A full-stack task management application with real-time updates, drag-and-drop functionality, and team collaboration features.",
            technologies: ["React", "Node.js", "MongoDB", "Socket.io"],
            gradient: "from-blue-500 to-cyan-500"
        },
        {
            title: "E-Commerce Platform",
            description: "A complete e-commerce solution with payment integration, inventory management, and admin dashboard.",
            technologies: ["Next.js", "Stripe", "PostgreSQL", "Tailwind"],
            gradient: "from-green-500 to-teal-500"
        },
        {
            title: "Weather Analytics App",
            description: "An interactive weather application with data visualization, forecasting, and location-based services.",
            technologies: ["React", "D3.js", "OpenWeather API", "Charts.js"],
            gradient: "from-orange-500 to-red-500"
        }
    ];

    useEffect(() => {
        const tl = gsap.timeline();

        tl.fromTo(titleRef.current,
            { y: 100, opacity: 0 },
            { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
        )
            .fromTo(projectsRef.current,
                { y: 100, opacity: 0, rotationY: 45 },
                {
                    y: 0,
                    opacity: 1,
                    rotationY: 0,
                    duration: 0.8,
                    ease: 'power2.out',
                    stagger: 0.2
                },
                '-=0.5'
            );

        return () => tl.kill();
    }, []);

    return (
        <section className="relative w-full h-screen bg-gradient-to-br from-slate-900 via-orange-900 to-slate-900 overflow-hidden">
            {/* 3D Scene Background */}
            <div className="absolute inset-0 opacity-20">
                <Scene3D sceneType="projects" />
            </div>

            {/* Content */}
            <div
                ref={contentRef}
                className="relative z-10 flex flex-col items-center justify-center h-full px-6 py-20"
            >
                <h1
                    ref={titleRef}
                    className="text-6xl md:text-8xl font-bold mb-12 bg-gradient-to-r from-orange-400 via-red-500 to-pink-600 bg-clip-text text-transparent text-center"
                >
                    Projects
                </h1>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl">
                    {projects.map((project, index) => (
                        <div
                            key={project.title}
                            ref={el => projectsRef.current[index] = el}
                            className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 hover:bg-white/20 transition-all duration-300 group hover:scale-105"
                        >
                            <div className={`w-full h-2 bg-gradient-to-r ${project.gradient} rounded-full mb-6`} />

                            <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors">
                                {project.title}
                            </h3>

                            <p className="text-gray-300 mb-6 leading-relaxed">
                                {project.description}
                            </p>

                            <div className="flex flex-wrap gap-2">
                                {project.technologies.map((tech, techIndex) => (
                                    <span
                                        key={tech}
                                        className="px-3 py-1 bg-white/10 text-white text-sm rounded-full border border-white/20"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Projects;
