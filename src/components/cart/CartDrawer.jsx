'use client';

import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useRouter } from 'next/navigation';
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useState } from 'react';

export default function CartDrawer() {
    const {
        isCartOpen,
        setIsCartOpen,
        cartItems,
        removeFromCart,
        updateQuantity,
        cartTotal,
        discount,
        appliedCode,
        discountError,
        discountSuccess,
        applyCoupon,
        removeCoupon
    } = useCart();

    const { user } = useAuth();
    const router = useRouter();
    const [couponCode, setCouponCode] = useState('');

    const handleApplyCoupon = () => {
        applyCoupon(couponCode);
    };

    // Prevent body scroll when cart is open
    useEffect(() => {
        if (isCartOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isCartOpen]);

    const handleCheckout = () => {
        if (!user) {
            setIsCartOpen(false);
            router.push('/login');
            return;
        }
        // Proceed to checkout page (to be implemented)
        setIsCartOpen(false);
        router.push('/checkout');
    };

    if (!isCartOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex justify-end">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={() => setIsCartOpen(false)}
            />

            {/* Drawer */}
            <div className="relative w-full max-w-md h-full bg-[#0a0a0a] border-l border-white/10 shadow-2xl flex flex-col animate-slideInRight">

                {/* Header */}
                <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/5">
                    <div className="flex items-center gap-3">
                        <ShoppingBag className="text-accent" />
                        <h2 className="text-xl font-bold text-white">Your Cart</h2>
                        <span className="bg-white/10 text-xs px-2 py-1 rounded-full text-gray-300">
                            {cartItems.length} items
                        </span>
                    </div>
                    <button
                        onClick={() => setIsCartOpen(false)}
                        className="p-2 hover:bg-white/10 rounded-full transition-colors text-gray-400 hover:text-white"
                    >
                        <X size={24} />
                    </button>
                </div>

                {/* Cart Items */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                    {cartItems.length === 0 ? (
                        <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mb-2">
                                <ShoppingBag size={40} className="text-gray-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-300">Your cart is empty</h3>
                            <p className="text-gray-500 max-w-xs">Looks like you haven't added anything to your cart yet.</p>
                            <button
                                onClick={() => setIsCartOpen(false)}
                                className="mt-4 px-6 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors"
                            >
                                Continue Shopping
                            </button>
                        </div>
                    ) : (
                        cartItems.map((item) => (
                            <div key={item.id} className="flex gap-4 bg-white/5 p-4 rounded-xl border border-white/5">
                                {/* Product Image */}
                                <div className="w-20 h-20 bg-white/10 rounded-lg flex-shrink-0 relative overflow-hidden">
                                    {item.image ? (
                                        <Image
                                            src={item.image}
                                            alt={item.name}
                                            fill
                                            className="object-contain p-2"
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center text-gray-500 text-xs">No Image</div>
                                    )}
                                </div>

                                {/* Info */}
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <h4 className="text-white font-medium line-clamp-1">{item.name}</h4>
                                        <p className="text-sm text-gray-400">{item.category}</p>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        <p className="text-accent font-bold">
                                            ฿{(item.price * item.quantity).toLocaleString()}
                                        </p>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center gap-3 bg-black/40 rounded-lg px-2 py-1 border border-white/10">
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                className="text-gray-400 hover:text-white transition-colors"
                                            >
                                                <Minus size={14} />
                                            </button>
                                            <span className="text-sm font-medium w-4 text-center">{item.quantity}</span>
                                            <button
                                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                className="text-gray-400 hover:text-white transition-colors"
                                            >
                                                <Plus size={14} />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Remove Button */}
                                <button
                                    onClick={() => removeFromCart(item.id)}
                                    className="self-start text-gray-500 hover:text-red-400 transition-colors p-1"
                                >
                                    <Trash2 size={18} />
                                </button>
                            </div>
                        ))
                    )}
                </div>

                {/* Footer / Checkout */}
                {cartItems.length > 0 && (
                    <div className="p-6 bg-white/5 border-t border-white/10 space-y-4">

                        {/* Discount Code Input */}
                        <div className="space-y-2">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    placeholder="Discount Code"
                                    className="flex-1 bg-black/40 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-gray-500 focus:outline-none focus:border-accent"
                                    value={couponCode}
                                    onChange={(e) => setCouponCode(e.target.value)}
                                    onKeyDown={(e) => e.key === 'Enter' && handleApplyCoupon()}
                                />
                                <button
                                    onClick={handleApplyCoupon}
                                    className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors font-medium"
                                >
                                    Apply
                                </button>
                            </div>
                            {discountError && <p className="text-red-400 text-xs">{discountError}</p>}
                            {discountSuccess && (
                                <div className="flex justify-between items-center bg-green-500/10 border border-green-500/20 rounded-lg p-2">
                                    <p className="text-green-400 text-xs">{discountSuccess}</p>
                                    <button onClick={removeCoupon} className="text-green-400 hover:text-white">
                                        <X size={14} />
                                    </button>
                                </div>
                            )}
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between text-gray-400">
                                <span>Subtotal</span>
                                <span>฿{(cartTotal + discount).toLocaleString()}</span>
                            </div>
                            {discount > 0 && (
                                <div className="flex justify-between text-green-400">
                                    <span>Discount</span>
                                    <span>-฿{discount.toLocaleString()}</span>
                                </div>
                            )}
                            <div className="flex justify-between text-white text-xl font-bold">
                                <span>Total</span>
                                <span className="text-accent">฿{cartTotal.toLocaleString()}</span>
                            </div>
                        </div>
                        <button
                            onClick={handleCheckout}
                            className="w-full py-4 bg-accent hover:bg-accent/80 text-white font-bold rounded-xl transition-all shadow-[0_0_20px_rgba(124,58,237,0.3)] hover:shadow-[0_0_30px_rgba(124,58,237,0.5)] flex items-center justify-center gap-2"
                        >
                            <ShoppingBag size={20} />
                            Checkout Securely
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
