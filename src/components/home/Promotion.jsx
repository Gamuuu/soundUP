import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const promotions = [
    { title: 'Summer Sale', discount: '20% OFF', color: 'from-orange-500/20 to-orange-900/20' },
    { title: 'New Arrivals', discount: 'Check it out', color: 'from-blue-500/20 to-blue-900/20' },
    { title: 'Member Exclusive', discount: 'Points x2', color: 'from-purple-500/20 to-purple-900/20' },
    { title: 'Clearance', discount: 'Up to 50%', color: 'from-red-500/20 to-red-900/20' },
];

const Promotion = () => {
    return (
        <section id="promotion" className="min-h-screen flex flex-col justify-center py-20 px-6 max-w-7xl mx-auto snap-start">
            <SectionHeading className="mb-12">Promotion. Specialist for you.</SectionHeading>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {promotions.map((promo, index) => (
                    <div
                        key={index}
                        className="aspect-[3/4] rounded-3xl relative overflow-hidden group cursor-pointer border border-white/5"
                    >
                        {/* Background Gradient Placeholder */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${promo.color} group-hover:scale-105 transition-transform duration-500`} />

                        {/* Content Overlay */}
                        <div className="absolute inset-0 p-6 flex flex-col justify-end bg-gradient-to-t from-black/80 to-transparent">
                            <h3 className="text-2xl font-bold text-white mb-1">{promo.title}</h3>
                            <p className="text-accent font-medium">{promo.discount}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-center">
                <Link href="/promotion">
                    <button className="bg-white text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-accent hover:text-white transition-colors cursor-pointer">
                        See more <ArrowRight size={20} />
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default Promotion;
