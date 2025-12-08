import React from 'react';
import { Monitor, Speaker, Camera, Shield, Layers, Zap } from 'lucide-react';

const categories = [
    { name: 'In-car monitor', icon: Monitor },
    { name: 'Car audio', icon: Speaker },
    { name: 'Dash cam', icon: Camera },
    { name: 'Window tint', icon: Shield },
    { name: 'Damping', icon: Layers },
    { name: 'Amp', icon: Zap },
];

const Categories = () => {
    return (
        <section id="categories" className="min-h-screen flex flex-col justify-center py-12 pl-6 max-w-7xl mx-auto snap-start">
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 scrollbar-hide">
                {categories.map((cat, index) => (
                    <div
                        key={index}
                        className="flex-none w-40 md:w-48 snap-start group cursor-pointer"
                    >
                        <div className="aspect-square bg-zinc-900 rounded-3xl flex items-center justify-center mb-3 border border-white/5 group-hover:border-accent/50 transition-colors">
                            <cat.icon size={40} className="text-gray-400 group-hover:text-accent transition-colors" />
                        </div>
                        <p className="text-sm font-medium text-gray-300 group-hover:text-white text-center">{cat.name}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Categories;
