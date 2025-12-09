'use client';

import { useState, useEffect } from 'react';
import Navbar from '../../components/layout/Navbar';
import CategoryCard from '../../components/products/CategoryCard';
import { motion } from 'framer-motion';

export default function Products() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch('/api/products');
                const data = await response.json();
                setProducts(data);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    // Group products by item_type
    const groupedProducts = {
        Speaker: products.filter(p => p.item_type === 'Speaker'),
        Subwoofer: products.filter(p => p.item_type === 'Subwoofer'),
        Amplifier: products.filter(p => p.item_type === 'Amplifier'),
        'Head Unit': products.filter(p => p.item_type === 'Head Unit')
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
        <div className="min-h-screen bg-background text-white">
            <Navbar />

            <main className="pb-16">
                {/* Hero Section with Knockout Text Gimmick */}
                <section className="relative w-full h-[50vh] flex items-center justify-center overflow-hidden mb-10">
                    {/* Background Elements */}
                    <div className="absolute inset-0 bg-black z-0" />

                    {/* "PRODUCTS" Knockout Text */}
                    <div className="relative z-10 flex items-center justify-center">
                        <h1
                            className="text-[12vw] md:text-[10vw] font-black leading-none tracking-tighter text-transparent select-none animate-pulse"
                            style={{
                                WebkitBackgroundClip: 'text',
                                backgroundClip: 'text',
                                backgroundImage: "url('/assets/images/ProductBanner.jpg')",
                                backgroundSize: 'cover',
                                backgroundPosition: 'center 78%',
                                WebkitTextStroke: '1px rgba(255, 255, 255, 0.1)'
                            }}
                        >
                            PRODUCTS
                        </h1>
                    </div>

                    {/* Subtitle Overlay */}
                    <div className="absolute bottom-10 z-20 text-center w-full">
                        <p className="text-xl md:text-2xl text-gray-400 font-light tracking-widest uppercase font-monoton">
                            Premium Audio Collection
                        </p>

                        <div className="mt-6 flex items-center justify-center gap-4 text-sm text-gray-500">
                            <span className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                                {products.length} Products Available
                            </span>
                            <span>•</span>
                            <span className="text-green-500/80">All Items In Stock</span>
                        </div>
                    </div>
                </section>

                <div className="max-w-7xl mx-auto px-6">
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
            </main>
        </div>
    );
}
