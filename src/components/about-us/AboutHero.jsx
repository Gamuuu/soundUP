'use client';

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const AboutHero = ({ containerRef }) => {
    const targetRef = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: targetRef,
        container: containerRef,
        offset: ["start start", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 3]); // Expand scale gently

    return (
        <section ref={targetRef} className="relative w-full h-screen snap-start overflow-hidden flex items-center justify-center bg-black">

            {/* Actual Knockout Text Implementation */}
            <div className="absolute inset-0 z-30 flex items-center justify-center bg-black overflow-hidden">
                <motion.h1
                    className="font-black leading-none tracking-tighter text-transparent bg-[url('/assets/images/about-us.jpg')] bg-cover bg-center select-none origin-center whitespace-nowrap"
                    style={{
                        WebkitBackgroundClip: 'text',
                        backgroundClip: 'text',
                        backgroundImage: "url('/assets/images/about-us.jpg')",
                        backgroundAttachment: 'fixed',
                        scale,
                        fontSize: '18vw'
                    }}
                >
                    ABOUT US
                </motion.h1>
            </div>

            {/* Floating Subtitle or Decorative Elements */}
            <div className="absolute bottom-20 z-40 text-center">
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                    className="text-white/80 text-lg md:text-xl font-light tracking-widest uppercase font-monoton"
                >
                    Premium Sound Experience
                </motion.p>

                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1, duration: 1 }}
                    className="mt-4 animate-bounce text-white/50"
                >
                    ↓
                </motion.div>
            </div>
        </section>
    );
};

export default AboutHero;
