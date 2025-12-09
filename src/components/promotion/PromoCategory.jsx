'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Tag } from 'lucide-react';

const PromoCategory = ({ title, subtitle, products = [], alignment = 'left', background }) => {
    return (
        <section className="h-screen w-full relative snap-start flex items-center bg-zinc-950 overflow-hidden">
            {/* Background Image/Gradient */}
            <div className={`absolute inset-0 z-0 ${background ? '' : 'bg-gradient-to-b from-zinc-900 to-black'}`}>
                {background && (
                    <>
                        <div
                            className="absolute inset-0 bg-cover bg-center opacity-20"
                            style={{ backgroundImage: `url('${background}')` }}
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
                    </>
                )}
            </div>

            <div className="max-w-7xl mx-auto px-6 w-full z-10 relative">
                <div className={`flex flex-col ${alignment === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'} items-center gap-12`}>

                    {/* Text Content */}
                    <div className="flex-1 space-y-8">
                        <div>
                            <motion.h2
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="text-5xl md:text-7xl font-bold text-white mb-4"
                            >
                                {title}
                            </motion.h2>
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ delay: 0.3, duration: 0.8 }}
                                className="text-xl text-accent font-light tracking-wide"
                            >
                                {subtitle}
                            </motion.p>
                        </div>

                        <div className="w-24 h-1 bg-white/20" />

                        <p className="text-gray-400 leading-relaxed max-w-lg">
                            Upgrade your listening experience with our premium selection.
                            Engineered for those who demand nothing but the absolute best in audio fidelity.
                        </p>
                    </div>

                    {/* Products Grid */}
                    <div className="flex-1 w-full">
                        <div className="grid grid-cols-1 gap-6">
                            {products.map((product, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.6 }}
                                    className="group relative bg-white/5 backdrop-blur-sm border border-white/10 p-6 rounded-2xl hover:bg-white/10 transition-all duration-300"
                                >
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-4">
                                            <div className="w-16 h-16 bg-gradient-to-br from-zinc-800 to-black rounded-xl flex items-center justify-center border border-white/5 group-hover:border-accent/50 transition-colors overflow-hidden">
                                                {product.image ? (
                                                    <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
                                                ) : (
                                                    <Tag className="text-gray-400 group-hover:text-accent" size={24} />
                                                )}
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-bold text-white group-hover:text-accent transition-colors">{product.name}</h3>
                                                <p className="text-sm text-gray-500">{product.desc}</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <div className="text-2xl font-bold text-white">{product.price}</div>
                                            <div className="text-xs text-red-500 font-bold line-through">{product.originalPrice || product.oldPrice}</div>
                                        </div>
                                    </div>

                                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-2 group-hover:translate-y-0">
                                        <span className="text-xs text-accent uppercase tracking-widest font-bold">Limited Offer</span>
                                        <button className="flex items-center gap-2 text-sm text-white hover:text-accent transition-colors">
                                            View Details <ArrowRight size={16} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default PromoCategory;
