'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, User, ShoppingBag, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { AnimatePresence, motion } from 'framer-motion';

const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'About us', href: '/about-us' },
    { name: 'Products', href: '/products' },
    { name: 'Service', href: '/service' },
    { name: 'Promotion', href: '/promotion' },
    { name: 'Contact', href: '/contact' },
];

const Navbar = () => {
    const pathname = usePathname();
    const { user } = useAuth();
    const { toggleCart, cartCount } = useCart();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-2xl font-monoton text-white z-50">
                    Sound<span className="text-accent">Up</span>
                </Link>

                {/* Desktop Links */}
                <div className="hidden md:flex items-center space-x-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`relative group text-sm font-medium transition-colors ${pathname === link.href
                                ? 'text-accent'
                                : 'text-gray-300 hover:text-white'
                                }`}
                        >
                            {link.name}
                            <span className={`absolute left-0 -bottom-1 w-full h-0.5 bg-accent scale-x-0 transition-transform duration-300 ${
                                pathname === link.href ? 'scale-x-100' : 'group-hover:scale-x-100'
                            } origin-left`} />
                        </Link>
                    ))}
                </div>

                {/* Right Side Actions */}
                <div className="hidden md:flex items-center space-x-6">
                    {/* Search Icon */}
                    <button className="text-white hover:text-accent transition-colors">
                        <Search size={20} />
                    </button>

                    {/* Cart Icon */}
                    <button 
                        onClick={toggleCart}
                        className="relative text-white hover:text-accent transition-colors p-1"
                    >
                        <ShoppingBag size={20} />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white shadow-sm ring-1 ring-black">
                                {cartCount}
                            </span>
                        )}
                    </button>

                    {/* Auth Section */}
                    {user ? (
                        <Link 
                            href="/profile" 
                            className="flex items-center space-x-2 text-sm font-medium text-accent hover:text-white transition-colors border border-accent/20 rounded-full px-4 py-1.5 hover:bg-accent/10"
                        >
                            <User size={16} />
                            <span>Hi, {user.name || user.email?.split('@')[0] || 'User'}</span>
                        </Link>
                    ) : (
                        <Link 
                            href="/login" 
                            className="text-sm font-medium text-white hover:text-accent transition-colors"
                        >
                            Login
                        </Link>
                    )}
                </div>

                {/* Mobile Menu Toggle & Cart (Mobile) */}
                <div className="flex md:hidden items-center space-x-4 z-50">
                    <button 
                        onClick={toggleCart}
                        className="relative text-white hover:text-accent transition-colors p-1"
                    >
                        <ShoppingBag size={20} />
                        {cartCount > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-accent text-[10px] font-bold text-white shadow-sm ring-1 ring-black">
                                {cartCount}
                            </span>
                        )}
                    </button>
                    <button 
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className="text-white hover:text-accent transition-colors"
                    >
                        {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-20 left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 md:hidden flex flex-col p-6 shadow-2xl h-[calc(100vh-80px)] overflow-y-auto"
                    >
                        <div className="flex flex-col space-y-6">
                            {/* Mobile Links */}
                            {navLinks.map((link) => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={() => setIsMenuOpen(false)}
                                    className={`text-2xl font-medium transition-colors ${
                                        pathname === link.href ? 'text-accent' : 'text-gray-300'
                                    }`}
                                >
                                    {link.name}
                                </Link>
                            ))}

                            <hr className="border-white/10" />

                            {/* Mobile Actions */}
                            <div className="flex flex-col space-y-4">
                                <button className="flex items-center space-x-3 text-gray-300 hover:text-white transition-colors">
                                    <Search size={20} />
                                    <span className="text-lg">Search</span>
                                </button>
                                
                                {user ? (
                                    <Link 
                                        href="/profile"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center space-x-3 text-accent"
                                    >
                                        <User size={20} />
                                        <span className="text-lg">Profile ({user.name || user.email?.split('@')[0]})</span>
                                    </Link>
                                ) : (
                                    <Link 
                                        href="/login"
                                        onClick={() => setIsMenuOpen(false)}
                                        className="flex items-center space-x-3 text-white hover:text-accent"
                                    >
                                        <User size={20} />
                                        <span className="text-lg">Login / Register</span>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
