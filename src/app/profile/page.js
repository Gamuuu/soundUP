'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { LogOut, User as UserIcon, ShoppingBag, ChevronLeft } from 'lucide-react';
import { supabaseAuth, signOut } from '../../lib/supabaseAuth';
import NeonCube from '../../components/ui/NeonCube';

export default function Profile() {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const checkUser = async () => {
             // Check Supabase Session
            const { data: { session } } = await supabaseAuth.auth.getSession();
            if (session?.user) {
                setUser({
                    name: session.user.user_metadata?.full_name || session.user.user_metadata?.name || 'User',
                    email: session.user.email,
                    role: session.user.user_metadata?.role || 'Member',
                    ...session.user
                });
                return;
            }

            const storedUser = localStorage.getItem('user');
            if (storedUser) {
                setUser(JSON.parse(storedUser));
            } else {
                router.push('/login');
            }
        };
        
        checkUser();
    }, [router]);

    const handleLogout = async () => {
        await signOut();
        localStorage.removeItem('user');
        alert('You have been logged out.');
        router.push('/login');
    };

    if (!user) return null; // Or a loading spinner

    return (
        <div className="min-h-screen bg-black text-white pt-24 px-6 relative overflow-hidden">
             {/* Background Effects */}
             <div className="absolute top-0 right-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[20%] right-[-10%] w-[40%] h-[40%] bg-accent/10 rounded-full blur-[100px]" />
            </div>

            <div className="max-w-4xl mx-auto relative z-10">
                <button 
                    onClick={() => router.back()} 
                    className="flex items-center gap-2 text-gray-400 hover:text-accent transition-colors mb-6 group"
                >
                    <ChevronLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                    <span>Back</span>
                </button>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-zinc-900/50 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl"
                >
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-8">
                        {/* 3D Cube Avatar */}
                        <div className="shrink-0">
                             <NeonCube size={120} color="#FF5500" />
                        </div>

                        {/* User Info */}
                        <div className="flex-1 text-center md:text-left space-y-4">
                            <div>
                                <h1 className="text-3xl font-bold font-monoton text-white">{user.name}</h1>
                                <p className="text-gray-400">{user.email}</p>
                            </div>
                            
                            <div className="flex flex-wrap justify-center md:justify-start gap-4 pt-2">
                                <div className="bg-zinc-800/50 px-4 py-2 rounded-full border border-white/5 flex items-center gap-2 text-sm text-gray-300">
                                    <ShoppingBag size={16} className="text-accent" />
                                    <span>No recent orders</span>
                                </div>
                                <div className="bg-zinc-800/50 px-4 py-2 rounded-full border border-white/5 flex items-center gap-2 text-sm text-gray-300">
                                    <span className="w-2 h-2 rounded-full bg-green-500" />
                                    <span>{user.role} Account</span>
                                </div>
                            </div>
                        </div>

                        {/* Logout Button */}
                        <button
                            onClick={handleLogout}
                            className="group flex items-center gap-2 px-6 py-3 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white border border-red-500/50 rounded-xl transition-all duration-300"
                        >
                            <LogOut size={20} className="group-hover:rotate-180 transition-transform duration-500" />
                            <span>Sign Out</span>
                        </button>
                    </div>

                    {/* Dashboard Content (Placeholder) */}
                    <div className="mt-12 pt-8 border-t border-white/10">
                        <h2 className="text-xl font-bold mb-6 text-white">Your Dashboard</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="p-6 rounded-2xl bg-black/40 border border-white/5 hover:border-accent/30 transition-colors cursor-pointer group">
                                <h3 className="font-semibold text-lg group-hover:text-accent transition-colors">Order History</h3>
                                <p className="text-sm text-gray-500 mt-2">View and track your past purchases.</p>
                            </div>
                            <div className="p-6 rounded-2xl bg-black/40 border border-white/5 hover:border-accent/30 transition-colors cursor-pointer group">
                                <h3 className="font-semibold text-lg group-hover:text-accent transition-colors">Account Settings</h3>
                                <p className="text-sm text-gray-500 mt-2">Manage your delivery addresses and password.</p>
                            </div>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
