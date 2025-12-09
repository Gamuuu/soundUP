'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import CategoryCard from '../../components/products/CategoryCard';
import Footer from '../../components/layout/Footer';

export default function Products() {
    const containerRef = useRef(null);
    const heroRef = useRef(null);
    
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    // Scroll Animation Logic for Hero
    const { scrollYProgress } = useScroll({
        target: heroRef,
        container: containerRef,
        offset: ["start start", "end start"]
    });

    const scale = useTransform(scrollYProgress, [0, 1], [1, 3]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch('/api/products');
                const data = await response.json();
                if (Array.isArray(data)) {
                    setProducts(data);
                } else {
                    console.error('Fetched data is not an array:', data);
                    setProducts([]);
                }
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    // Group products by category
    const groupedProducts = {
        Speaker: products.filter(p => p.category === 'Speaker'),
        Subwoofer: products.filter(p => p.category === 'Subwoofer'),
        Amplifier: products.filter(p => p.category === 'Amplifier'),
        'Head Unit': products.filter(p => p.category === 'Head Unit')
    };

    const categories = [
        {
            title: 'Speakers',
            type: 'Speaker',
            products: groupedProducts.Speaker
        },
        {
            title: 'Subwoofers',
            type: 'Subwoofer',
            products: groupedProducts.Subwoofer
        },
        {
            title: 'Amplifiers',
            type: 'Amplifier',
            products: groupedProducts.Amplifier
        },
        {
            title: 'Head Units',
            type: 'Head Unit',
            products: groupedProducts['Head Unit']
        }
    ];

    return (
        <div ref={containerRef} className="h-screen overflow-y-scroll snap-y snap-mandatory bg-background text-white scroll-smooth relative">
            
            {/* Hero Section with Scroll Snap and Knockout Text */}
            <section ref={heroRef} className="relative w-full h-screen snap-start overflow-hidden flex items-center justify-center bg-black">
                 {/* Background Elements */}
                 <div className="absolute inset-0 bg-black z-0" />

                {/* "PRODUCTS" Knockout Text with Scaling Animation */}
                <div className="relative z-10 flex items-center justify-center">
                    <motion.h1
                        className="text-[15vw] md:text-[12vw] font-black leading-none tracking-tighter text-transparent select-none animate-pulse"
                        style={{
                            WebkitBackgroundClip: 'text',
                            backgroundClip: 'text',
                            backgroundImage: "url('/assets/images/service_amplifier.png')", 
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            WebkitTextStroke: '1px rgba(255, 255, 255, 0.1)',
                            scale 
                        }}
                    >
                        PRODUCTS
                    </motion.h1>
                </div>

                {/* Subtitle Overlay */}
                <div className="absolute bottom-20 z-20 text-center w-full">
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="text-xl md:text-2xl text-gray-400 font-light tracking-widest uppercase font-monoton"
                    >
                        Premium Audio Collection
                    </motion.p>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.8 }}
                        className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-500"
                    >
                        <span className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                            {products.length} Products Available
                        </span>
                        <span>•</span>
                        <span className="text-green-500/80">All Items In Stock</span>
                    </motion.div>
                </div>
            </section>

            {/* Product Grid Section */}
            <section className="min-h-screen snap-start bg-background py-24 px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    {/* Loading State */}
                    {loading && (
                        <div className="flex items-center justify-center py-20">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin" />
                                <p className="text-gray-400">Loading products...</p>
                            </div>
                        </div>
                    )}

                    {/* Category Grid */}
                    {!loading && (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                            {categories.map((category) => (
                                <CategoryCard
                                    key={category.type}
                                    title={category.title}
                                    products={category.products}
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>

             {/* Footer Section (Snap Start) */}
             <div className="snap-start relative z-20">
                <Footer className="bg-black border-t border-white/10" />
            </div>
        </div>
    );
}
