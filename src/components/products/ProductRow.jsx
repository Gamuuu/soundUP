'use client';

import Image from 'next/image';
import { ShoppingCart, Check } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useState } from 'react';

export default function ProductRow({ product }) {
    const { addToCart } = useCart();
    const [isAdded, setIsAdded] = useState(false);

    const handleAddToCart = () => {
        addToCart(product);
        setIsAdded(true);

        // Reset button state after 1.5 seconds
        setTimeout(() => {
            setIsAdded(false);
        }, 1500);
    };

    const isOutOfStock = product.stock === 0;

    return (
        <div className="group relative overflow-hidden rounded-xl bg-white/5 backdrop-blur-sm border border-white/10 hover:border-accent/30 transition-all duration-300 hover:scale-[1.01]">
            {/* Subtle glow on hover */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent/0 via-accent/5 to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

            <div className="relative p-4 md:p-6">
                <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-start md:items-center">
                    {/* Product Image */}
                    <div className="w-full md:w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden bg-gradient-to-br from-gray-800 via-gray-900 to-black">
                        {product.images && product.images[0] && (
                            <div className="relative w-full h-full flex items-center justify-center p-2">
                                <Image
                                    src={product.images[0]}
                                    alt={product.name}
                                    width={80}
                                    height={80}
                                    className="object-contain"
                                    onError={(e) => {
                                        e.target.style.display = 'none';
                                    }}
                                />
                            </div>
                        )}
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 min-w-0">
                        <div className="flex items-start gap-2 mb-2">
                            <h4 className="text-lg md:text-xl font-semibold text-white">
                                {product.name}
                            </h4>
                            <span className="px-2 py-1 rounded-md bg-white/10 text-xs text-gray-300 whitespace-nowrap">
                                {product.category}
                            </span>
                        </div>
                        <p className="text-sm text-gray-400 line-clamp-2">
                            {product.description}
                        </p>
                    </div>

                    {/* Price, Stock, and Add to Cart */}
                    <div className="flex md:flex-col items-center md:items-end gap-4 md:gap-3 w-full md:w-auto">
                        {/* Stock Status */}
                        <div className="flex items-center gap-2 flex-1 md:flex-initial">
                            {product.stock > 0 && (
                                <div className="flex items-center gap-1.5">
                                    <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                                    <span className="text-xs text-green-400">In Stock</span>
                                </div>
                            )}
                            {product.stock === 0 && (
                                <span className="text-xs text-red-400">Out of Stock</span>
                            )}
                        </div>

                        {/* Price */}
                        <div className="text-right">
                            <div className="text-2xl md:text-3xl font-bold text-accent">
                                ฿{product.price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                            </div>
                            <div className="text-xs text-gray-500 mt-1">
                                Stock: {product.stock}
                            </div>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            onClick={handleAddToCart}
                            disabled={isOutOfStock}
                            className={`
                                flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg font-medium text-sm
                                transition-all duration-300 min-w-[140px]
                                ${isOutOfStock
                                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                                    : isAdded
                                        ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]'
                                        : 'bg-accent hover:bg-accent/80 text-white shadow-[0_0_15px_rgba(255,85,0,0.3)] hover:shadow-[0_0_25px_rgba(255,85,0,0.5)] hover:scale-105'
                                }
                            `}
                        >
                            {isAdded ? (
                                <>
                                    <Check size={18} />
                                    <span>Added!</span>
                                </>
                            ) : (
                                <>
                                    <ShoppingCart size={18} />
                                    <span>Add to Cart</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
