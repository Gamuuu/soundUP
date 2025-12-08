'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Search, User } from 'lucide-react';
import { supabaseAuth } from '../../lib/supabaseAuth';

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
    const [user, setUser] = useState(null);

    useEffect(() => {
        const checkUser = async () => {
            // Check Supabase Session (Google Login)
            const { data: { session } } = await supabaseAuth.auth.getSession();

            if (session?.user) {
                setUser({
                    ...session.user,
                    name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || 'User'
                });
                return;
            }

            // Check for logged-in user in localStorage (Email Login)
            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                try {
                    setUser(JSON.parse(storedUser));
                } catch (error) {
                    console.error("Error parsing user data:", error);
                    setUser(null);
                }
            } else {
                setUser(null);
            }
        };

        checkUser();

        // Listen for Supabase auth changes
        const { data: { subscription } } = supabaseAuth.auth.onAuthStateChange((_event, session) => {
            if (session?.user) {
                setUser({
                    ...session.user,
                    name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || 'User'
                });
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [pathname]); // Re-check on route change (e.g. after login/logout)

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-white/10">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="text-2xl font-monoton text-white">
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
                            <span className={`absolute left-0 -bottom-1 w-full h-0.5 scale-x-0 transition-transform duration-300 group-hover:scale-x-100 origin-left ${pathname === link.href ? 'bg-accent' : 'bg-white'
                                }`} />
                        </Link>
                    ))}
                </div>

                {/* Right Side Actions */}
                <div className="flex items-center space-x-6">
                    {/* Search Icon */}
                    <button className="text-white hover:text-accent transition-colors">
                        <Search size={20} />
                    </button>

                    {/* Auth Section */}
                    {user ? (
                        <Link 
                            href="/profile" 
                            className="flex items-center space-x-2 text-sm font-medium text-accent hover:text-white transition-colors border border-accent/20 rounded-full px-4 py-1.5 hover:bg-accent/10"
                        >
                            <User size={16} />
                            <span>Hi, {user.name || 'User'}</span>
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
            </div>
        </nav>
    );
};

export default Navbar;
