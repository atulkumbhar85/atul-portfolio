// app/components/LoadingScreen.js
'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const LoadingScreen = ({ onLoadComplete }) => {
    const loaderRef = useRef(null);
    const progressRef = useRef(null);
    const textRef = useRef(null);

    useEffect(() => {
        const tl = gsap.timeline();

        // Animate progress bar
        tl.to(progressRef.current, {
            width: '100%',
            duration: 2,
            ease: 'power2.inOut'
        })
            .to(textRef.current, {
                opacity: 0,
                y: -20,
                duration: 0.5
            })
            .to(loaderRef.current, {
                y: '-100%',
                duration: 1,
                ease: 'power2.inOut',
                onComplete: () => {
                    if (onLoadComplete) onLoadComplete();
                }
            });

        return () => tl.kill();
    }, [onLoadComplete]);

    return (
        <div
            ref={loaderRef}
            className="fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center"
        >
            <div className="text-center">
                <div
                    ref={textRef}
                    className="mb-8"
                >
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-600 bg-clip-text text-transparent">
                        Atul Kumbhar
                    </h1>
                    <p className="text-xl text-gray-300">
                        Loading Portfolio...
                    </p>
                </div>

                <div className="w-64 h-2 bg-gray-700 rounded-full overflow-hidden">
                    <div
                        ref={progressRef}
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-600 w-0 rounded-full"
                    />
                </div>
            </div>
        </div>
    );
};

export default LoadingScreen;
