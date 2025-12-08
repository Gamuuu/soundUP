import React, { useState, useEffect } from 'react';
import { ArrowRight, User } from 'lucide-react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import SectionHeading from '../ui/SectionHeading';
import NeonCube from '../ui/NeonCube';

const Hero = () => {
    const words = ["Products", "Experience", "Instruments", "Gear"];
    const [index, setIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % words.length);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <section id="hero" className="relative min-h-screen flex items-center pt-20 px-6 max-w-7xl mx-auto snap-start">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 w-full">
                {/* Left Content */}
                <div className="flex flex-col justify-center">
                    <SectionHeading className="text-7xl md:text-8xl leading-[2.5] tracking-tight mb-6">
                        Store. The best way to buy the{' '}
                        <span className="inline-block relative w-[14ch] align-middle h-[1.3em] overflow-hidden">
                            <AnimatePresence mode="popLayout">
                                <motion.span
                                    key={words[index]}
                                    initial={{ y: 50, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    exit={{ y: -50, opacity: 0 }}
                                    transition={{ duration: 0.7, ease: "easeOut" }}
                                    className="absolute left-0 top-[0.2em] text-accent block drop-shadow-[0_0_15px_rgba(255,85,0,0.6)] [text-shadow:_-1px_-1px_2px_rgba(255,255,255,0.25)] font-monoton font-normal"
                                >
                                    {words[index]}
                                </motion.span>
                            </AnimatePresence>
                        </span>{'   '}
                        you love.
                    </SectionHeading>
                </div>

                {/* Right Widget - Floating Contact */}
                <div className="flex items-center justify-center lg:justify-end">
                    <div className="bg-zinc-900/80 backdrop-blur-sm p-3 pr-4 rounded-full flex items-center gap-4 border border-white/5 max-w-md shadow-2xl">
                        {/* Avatar */}
                        <div className="flex-shrink-0">
                            <NeonCube size={48} color="#FF5500" />
                        </div>

                        {/* Text */}
                        <div className="flex flex-col overflow-hidden w-[160px]">
                            <div className="animate-marquee whitespace-nowrap flex gap-8">
                                <span className="text-xs text-gray-400 font-medium">Hesitated? See more what we have made.</span>
                                <span className="text-xs text-gray-400 font-medium">Hesitated? See more what we have made.</span>
                                <span className="text-xs text-gray-400 font-medium">Hesitated? See more what we have made.</span>
                            </div>
                            <span className="text-sm text-white font-bold">See more →</span>
                        </div>

                        {/* Arrow Button */}
                        <Link href="/about-us#experiences" className="w-10 h-10 rounded-full bg-white text-black flex items-center justify-center hover:bg-accent hover:text-white transition-colors ml-2 flex-shrink-0">
                            <ArrowRight size={20} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Hero;
