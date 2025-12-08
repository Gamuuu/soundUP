import React from 'react';
import Link from 'next/link';
import { Headphones, Watch, Footprints, Mic, ArrowRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const popularItems = [
    { name: 'Headphones', color: 'Purple', icon: Headphones, bg: 'bg-gray-100', iconColor: 'text-purple-600' },
    { name: 'Watch', color: 'White', icon: Watch, bg: 'bg-white', iconColor: 'text-zinc-800' },
    { name: 'Shoes', color: 'White', icon: Footprints, bg: 'bg-gray-50', iconColor: 'text-zinc-800' },
    { name: 'Earbuds', color: 'Transparent', icon: Mic, bg: 'bg-zinc-200', iconColor: 'text-zinc-600' },
];

const Popular = () => {
    return (
        <section id="popular" className="min-h-screen flex flex-col justify-center py-20 px-6 max-w-7xl mx-auto snap-start">
            <SectionHeading className="mb-12">Popular. what's new and hot.</SectionHeading>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {popularItems.map((item, index) => (
                    <div
                        key={index}
                        className={`${item.bg} aspect-[3/4] rounded-3xl p-6 flex flex-col justify-between group cursor-pointer transition-transform hover:-translate-y-2 duration-300`}
                    >
                        <div className="flex-1 flex items-center justify-center">
                            <item.icon size={80} className={`${item.iconColor} drop-shadow-2xl group-hover:scale-110 transition-transform duration-300`} />
                        </div>

                        <div>
                            <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">New Arrival</p>
                            <h3 className="text-xl font-bold text-black">{item.name}</h3>
                            <p className="text-sm text-gray-500">{item.color}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center">
                <Link href="/products">
                    <button className="bg-white text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-accent hover:text-white transition-colors cursor-pointer">
                        See more <ArrowRight size={20} />
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default Popular;
