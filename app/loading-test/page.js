// app/loading-test/page.js
'use client';

import { useState } from 'react';
import LoadingScreen from '../components/LoadingScreen';

export default function LoadingTest() {
    const [isLoading, setIsLoading] = useState(true);

    const handleLoadComplete = () => {
        setIsLoading(false);
    };

    const resetLoading = () => {
        setIsLoading(true);
    };

    if (isLoading) {
        return <LoadingScreen onLoadComplete={handleLoadComplete} />;
    }

    return (
        <div className="min-h-screen bg-gray-900 flex items-center justify-center">
            <div className="text-center">
                <h1 className="text-4xl font-bold text-white mb-8">Loading Complete!</h1>
                <button
                    onClick={resetLoading}
                    className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                    Test Loading Again
                </button>
            </div>
        </div>
    );
}
