import {useEffect, useRef, useState} from "react";
import {ChevronLeft, ChevronRight} from 'lucide-react';

export default function Hero({heroData, heroCount, setHeroCount, slides = []}) {
    const [isPaused, setIsPaused] = useState(false);
    const autoRef = useRef();
    const total = slides.length || 3;

    // Colorful gradient themes for each slide
    const colorThemes = [
        { primary: 'from-pink-500 to-rose-500', secondary: 'text-pink-600', accent: 'bg-pink-500' },
        { primary: 'from-purple-500 to-indigo-500', secondary: 'text-purple-600', accent: 'bg-purple-500' },
        { primary: 'from-orange-500 to-amber-500', secondary: 'text-orange-600', accent: 'bg-orange-500' }
    ];

    const currentTheme = colorThemes[heroCount] || colorThemes[0];

    useEffect(() => {
        autoRef.current = () => {
            setHeroCount((c) => (c + 1) % total);
        };
    }, [setHeroCount, total]);

    useEffect(() => {
        if (isPaused) return;
        const id = setInterval(() => autoRef.current(), 4500);
        return () => clearInterval(id);
    }, [isPaused, total]);

    useEffect(() => {
        const onKey = (e) => {
            if (e.key === 'ArrowLeft') setHeroCount((c) => (c - 1 + total) % total);
            if (e.key === 'ArrowRight') setHeroCount((c) => (c + 1) % total);
        };
        window.addEventListener('keydown', onKey);
        return () => window.removeEventListener('keydown', onKey);
    }, [setHeroCount, total]);

    const goPrev = () => setHeroCount((c) => (c - 1 + total) % total);
    const goNext = () => setHeroCount((c) => (c + 1) % total);

    return (
        <div
            className="w-full sm:w-[90%] md:w-[80%] lg:w-[70%] xl:w-[60%] h-full relative z-10 px-4 sm:px-6 md:px-8 lg:px-12"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            aria-roledescription="carousel"
        >
            {/* Main Content */}
            <div className="absolute left-4 sm:left-6 md:left-8 lg:left-12 top-8 sm:top-12 md:top-16 lg:top-20 xl:top-24 transition-all duration-700 max-w-[90%] sm:max-w-[85%] md:max-w-[75%]">
                <div className="inline-block mb-2 sm:mb-3 md:mb-4">
                    <span className={`inline-block px-3 py-1 sm:px-4 sm:py-1.5 md:px-5 md:py-2 rounded-full text-white text-xs sm:text-sm md:text-base font-semibold bg-gradient-to-r ${currentTheme.primary} shadow-lg`}>
                        Special Offer
                    </span>
                </div>
                <h1 className={`bg-gradient-to-r ${currentTheme.primary} bg-clip-text text-transparent text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-extrabold leading-tight mb-2 sm:mb-3 md:mb-4 drop-shadow-sm`}>
                    {heroData?.text1}
                </h1>
                <p className="text-gray-700 sm:text-gray-800 text-base sm:text-lg md:text-xl lg:text-2xl xl:text-3xl font-semibold mb-4 sm:mb-6 md:mb-8 drop-shadow-sm">
                    {heroData?.text2}
                </p>
                <button className={`bg-gradient-to-r ${currentTheme.primary} text-white px-6 py-2 sm:px-8 sm:py-3 md:px-10 md:py-3.5 rounded-full font-bold text-sm sm:text-base md:text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300`}>
                    Shop Now
                </button>
            </div>

            {/* Navigation Buttons */}
            <button
                onClick={goPrev}
                aria-label="Previous slide"
                className="absolute left-2 sm:left-4 md:left-6 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white shadow-xl p-2 sm:p-2.5 md:p-3 rounded-full transition-all duration-200 border-2 border-gray-200 hover:border-pink-300 hover:scale-110 z-20"
            >
                <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-800" />
            </button>

            <button
                onClick={goNext}
                aria-label="Next slide"
                className="absolute right-2 sm:right-4 md:right-6 top-1/2 -translate-y-1/2 bg-white/95 hover:bg-white shadow-xl p-2 sm:p-2.5 md:p-3 rounded-full transition-all duration-200 border-2 border-gray-200 hover:border-pink-300 hover:scale-110 z-20"
            >
                <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6 text-gray-800" />
            </button>

            {/* Indicator Dots */}
            <div className="absolute bottom-6 sm:bottom-8 md:bottom-10 lg:bottom-12 left-1/2 -translate-x-1/2 flex items-center justify-center gap-2 sm:gap-3">
                {Array.from({length: total}).map((_, idx) => {
                    const dotTheme = colorThemes[idx];
                    return (
                        <button
                            key={idx}
                            onClick={() => setHeroCount(idx)}
                            aria-label={`Go to slide ${idx + 1}`}
                            className={`rounded-full focus:outline-none transition-all duration-300 ${
                                heroCount === idx 
                                    ? `${dotTheme.accent} w-3 h-3 sm:w-3.5 sm:h-3.5 md:w-4 md:h-4 shadow-lg scale-125` 
                                    : 'bg-gray-300 w-2 h-2 sm:w-2.5 sm:h-2.5 md:w-3 md:h-3 hover:bg-gray-400 hover:scale-110'
                            }`}
                        />
                    );
                })}
            </div>
        </div>
    );
}