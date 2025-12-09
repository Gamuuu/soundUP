'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { getCategorySlug } from '../../lib/productUtils';

export default function CategoryCard({ title, products }) {
    const router = useRouter();
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);

    // Auto-cycle through products every 4 seconds
    useEffect(() => {
        if (!products || products.length === 0 || isHovered) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % products.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [products, isHovered]);

    if (!products || products.length === 0) {
        return null;
    }

    const currentProduct = products[currentIndex];

    // Handle navigation to category page
    const handleClick = () => {
        if (currentProduct?.category) {
            const slug = getCategorySlug(currentProduct.category);
            router.push(`/products/${slug}`);
        }
    };

    return (
        <div
            className="group relative overflow-hidden rounded-3xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-accent/50 transition-all duration-300 hover:scale-[1.02] cursor-pointer"
            onClick={handleClick}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Glow effect on hover */}
            <div className="absolute inset-0 bg-gradient-to-br from-accent/0 via-accent/0 to-accent/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Content */}
            <div className="relative p-6 h-full flex flex-col">
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-2xl font-bold text-white">{title}</h3>
                        <p className="text-sm text-gray-400">{products.length} models</p>
                    </div>
                    <div className="px-3 py-1 rounded-full bg-accent/20 text-accent text-xs font-semibold">
                        {currentIndex + 1}/{products.length}
                    </div>
                </div>

                {/* Product Display */}
                <div className="flex-1 relative min-h-[280px]">
                    {/* Product Image/Gradient */}
                    <div className="absolute inset-0 rounded-2xl overflow-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-black">
                        {/* Render all product images with opacity transitions */}
                        {products.map((product, idx) => (
                            product.images && product.images[0] && (
                                <div
                                    key={product.id}
                                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${idx === currentIndex ? 'opacity-100' : 'opacity-0'
                                        }`}
                                >
                                    <div className="relative w-full h-full flex items-center justify-center p-8">
                                        <div className="relative w-full h-full">
                                            <Image
                                                src={product.images[0]}
                                                alt={product.name}
                                                fill
                                                className="object-contain"
                                                onError={(e) => {
                                                    e.target.style.display = 'none';
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )
                        ))}
                        {/* Gradient overlay */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none z-10" />
                    </div>

                    {/* Product Info Overlay */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 space-y-2 z-20">
                        <div className="flex items-center gap-2">
                            <span className="px-2 py-1 rounded-md bg-white/10 backdrop-blur-sm text-xs text-gray-300">
                                {currentProduct.category}
                            </span>
                            {currentProduct.stock > 0 && (
                                <span className="px-2 py-1 rounded-md bg-green-500/20 backdrop-blur-sm text-xs text-green-400">
                                    In Stock
                                </span>
                            )}
                        </div>
                        <h4 className="text-lg font-semibold text-white line-clamp-1">
                            {currentProduct.name}
                        </h4>
                        <p className="text-sm text-gray-400 line-clamp-2">
                            {currentProduct.description}
                        </p>
                        <div className="flex items-center justify-between">
                            <span className="text-2xl font-bold text-accent">
                                ฿{currentProduct.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </span>
                            <span className="text-xs text-gray-500">
                                Stock: {currentProduct.stock}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Cycling Indicator Dots */}
                <div className="flex gap-1.5 mt-4 justify-center">
                    {products.slice(0, 8).map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => setCurrentIndex(idx)}
                            className={`h-1.5 rounded-full transition-all duration-300 ${idx === currentIndex
                                ? 'w-8 bg-accent'
                                : 'w-1.5 bg-white/20 hover:bg-white/40'
                                }`}
                        />
                    ))}
                    {products.length > 8 && (
                        <span className="text-xs text-gray-500 ml-1">+{products.length - 8}</span>
                    )}
                </div>
            </div>
        </div>
    );
}
