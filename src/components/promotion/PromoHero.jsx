'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const PromoHero = () => {
    return (
        <section className="h-screen w-full relative snap-start flex items-center justify-center bg-black overflow-hidden">
            {/* Background with Gradient Mesh */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-accent/20 rounded-full blur-[128px] animate-pulse" />
                <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-purple-900/10 rounded-full blur-[128px]" />
                <div className="absolute inset-0 bg-[url('/assets/images/promotion-bg.jpg')] bg-cover bg-center opacity-30 mix-blend-overlay" />
                <div className="absolute inset-0 bg-gradient-to-b from-black via-black/50 to-black" />
            </div>

            <div className="relative z-10 text-center px-6">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-accent tracking-[0.2em] mb-4 text-sm font-bold uppercase">Exclusive Deals</h2>
                    <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 font-monoton">
                        ELEVATE<br />YOUR SOUND
                    </h1>
                    <p className="text-gray-400 max-w-xl mx-auto text-lg mb-12 font-light leading-relaxed">
                        Experience audio perfection with our curated selection of premium car audio components. Limited time offers for the discerning listener.
                    </p>

                    <motion.div
                        animate={{ y: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 2 }}
                        className="flex flex-col items-center gap-2 text-gray-500 text-sm tracking-widest uppercase"
                    >
                        <span>Scroll to Explore</span>
                        <ArrowDown size={20} className="text-accent" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
};

export default PromoHero;
