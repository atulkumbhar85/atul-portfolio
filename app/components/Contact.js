// app/components/Contact.js
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Scene3D from './Scene3D';

const Contact = () => {
  const contentRef = useRef(null);
  const titleRef = useRef(null);
  const contactItemsRef = useRef([]);

  const contactInfo = [
    {
      type: "Email",
      value: "atulkumbhar1985@gmail.com",
      href: "mailto:atulkumbhar1985@gmail.com",
      icon: "📧",
      color: "from-red-500 to-pink-500"
    },
    {
      type: "LinkedIn",
      value: "Atul Kumbhar",
      href: "https://www.linkedin.com/in/atul-kumbhar-393523165/",
      icon: "💼",
      color: "from-blue-500 to-cyan-500"
    },
    {
      type: "GitHub",
      value: "View My Work",
      href: "#",
      icon: "🐙",
      color: "from-purple-500 to-indigo-500"
    },
    {
      type: "Location",
      value: "Available Worldwide",
      href: "#",
      icon: "🌍",
      color: "from-green-500 to-teal-500"
    }
  ];

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(titleRef.current,
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power2.out' }
    )
      .fromTo(contactItemsRef.current,
        { y: 50, opacity: 0, scale: 0.8 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.6,
          ease: 'back.out(1.7)',
          stagger: 0.1
        },
        '-=0.5'
      );

    return () => tl.kill();
  }, []);

  return (
    <section className="relative w-full h-screen bg-gradient-to-br from-slate-900 via-indigo-900 to-slate-900 overflow-hidden">
      {/* 3D Scene Background */}
      <div className="absolute inset-0 opacity-20">
        <Scene3D sceneType="contact" />
      </div>      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 flex flex-col items-center justify-center h-full px-6"
      >
        <h1
          ref={titleRef}
          className="text-6xl md:text-8xl font-bold mb-8 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent text-center"
        >
          Contact
        </h1>

        <p className="text-xl text-gray-300 mb-12 text-center max-w-2xl">
          Let&apos;s create something amazing together. Feel free to reach out through any of these platforms.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full">
          {contactInfo.map((contact, index) => (
            <a
              key={contact.type}
              href={contact.href}
              target={contact.href.startsWith('http') ? '_blank' : '_self'}
              rel={contact.href.startsWith('http') ? 'noopener noreferrer' : ''}
              ref={el => contactItemsRef.current[index] = el}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group hover:scale-105 cursor-pointer"
            >
              <div className="flex items-center space-x-4">
                <div className={`text-4xl p-3 rounded-full bg-gradient-to-r ${contact.color} flex items-center justify-center`}>
                  {contact.icon}
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors">
                    {contact.type}
                  </h3>
                  <p className="text-gray-300 group-hover:text-white transition-colors">
                    {contact.value}
                  </p>
                </div>
              </div>
            </a>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <p className="text-lg text-gray-400 mb-4">
            Ready to start your next project?
          </p>
          <button className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold rounded-full hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105">
            Get In Touch
          </button>
        </div>
      </div>
    </section>
  );
};

export default Contact;
