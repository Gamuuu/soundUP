'use client';


import AboutHero from '../../components/about-us/AboutHero';
import Footer from '../../components/layout/Footer';

import { motion } from 'framer-motion';

import { useRef } from 'react';

export default function AboutUs() {
    const containerRef = useRef(null);

    return (
        <div ref={containerRef} className="h-screen overflow-y-scroll snap-y snap-mandatory bg-black text-white scroll-smooth relative">
            {/* Global Fixed Background for Parallax */}
            <div
                className="fixed inset-0 bg-[url('/assets/images/about-us.jpg')] bg-cover bg-center z-0 pointer-events-none opacity-50"
            />

            <div className="relative z-10 w-full">


                {/* Section 1: Hero (Parallax & Knockout Text) */}
                <AboutHero containerRef={containerRef} />

                {/* Section 2: Our Story (Content Scrolling over Fixed Background) */}
                <section className="relative min-h-screen snap-start flex items-center justify-center bg-zinc-900/90 py-24 px-6 z-20">
                    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-5xl font-bold mb-6 font-monoton text-accent">Our Story</h2>
                            <span className="block w-24 h-1 bg-white mb-8" />
                            <p className="text-gray-300 text-lg leading-relaxed mb-6">
                                SoundUp wasn't born in a boardroom. It started in a garage, fueled by a passion for pure audio and a hatred for tangled wires. We believe that music is not just something you hear, but something you feel.
                            </p>
                            <p className="text-gray-300 text-lg leading-relaxed">
                                Every product we curate is tested by our team of audiophiles to ensure it delivers the crisp highs and deep lows that artists intended. We are more than just a store; we are a community of listeners.
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                            className="relative h-[400px] w-full rounded-2xl overflow-hidden shadow-2xl border border-white/10"
                        >
                            {/* Placeholder for another image or video if needed */}
                            <div className="absolute inset-0 bg-[url('/assets/images/about-us.jpg')] bg-cover bg-center opacity-50 grayscale hover:grayscale-0 transition-all duration-700 transform hover:scale-105" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-2xl font-bold border-2 border-white px-6 py-2 rounded-full backdrop-blur-sm">Since 2025</span>
                            </div>
                        </motion.div>
                    </div>
                </section>

                {/* Section 3: Our Experiences */}
                <section id="experiences" className="relative min-h-screen snap-start flex items-center justify-center bg-gradient-to-b from-zinc-900 to-black py-24 px-6 z-20">
                    <div className="max-w-7xl mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-5xl font-bold mb-4">Our <span className="text-accent">Experiences</span></h2>
                            <p className="text-gray-400 max-w-2xl mx-auto">See how we transform vehicles into acoustic masterpieces.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="relative group overflow-hidden rounded-2xl h-[300px] border border-white/5">
                                <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7" alt="Car Audio Exhibition" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                                <div className="absolute bottom-0 p-6">
                                    <span className="px-3 py-1 bg-accent/20 text-accent text-xs rounded-full mb-2 inline-block">Dec 2025</span>
                                    <h3 className="text-xl font-bold">Car Audio Exhibition</h3>
                                </div>
                            </div>
                            <div className="relative group overflow-hidden rounded-2xl h-[300px] border border-white/5">
                                <img src="https://images.unsplash.com/photo-1598488035139-bdbb2231ce04" alt="Sound Tuning Workshop" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                                <div className="absolute bottom-0 p-6">
                                    <span className="px-3 py-1 bg-accent/20 text-accent text-xs rounded-full mb-2 inline-block">Nov 2025</span>
                                    <h3 className="text-xl font-bold">Sound Tuning Workshop</h3>
                                </div>
                            </div>
                            <div className="relative group overflow-hidden rounded-2xl h-[300px] border border-white/5">
                                <img src="https://images.unsplash.com/photo-1626224169649-165f6c6e730e" alt="Customer Showcases" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                                <div className="absolute bottom-0 p-6">
                                    <span className="px-3 py-1 bg-accent/20 text-accent text-xs rounded-full mb-2 inline-block">Oct 2025</span>
                                    <h3 className="text-xl font-bold">Customer Showcases</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>



                {/* Footer Section (Snap Start) */}
                <div className="snap-start relative z-20">
                    <Footer className="bg-black border-t border-white/10" />
                </div>
            </div>
        </div>
    );
}
