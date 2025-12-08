import React from 'react';
import SectionHeading from '../ui/SectionHeading';
import { Tag } from 'lucide-react';

const promotions = [
    { id: 1, title: 'Summer Sale', discount: '20% OFF', description: 'On all Car Audio Systems', code: 'SUMMER2025' },
    { id: 2, title: 'Bundle Deal', discount: 'Save $50', description: 'Buy Speakers + Subwoofer', code: 'BUNDLE50' },
    { id: 3, title: 'Installation Special', discount: 'Free Tuning', description: 'With any complete system purchase', code: 'TUNEUPFREE' },
];

const PromoList = () => {
    return (
        <section className="min-h-screen pt-24 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <SectionHeading>Current Promotions</SectionHeading>
                    <p className="text-gray-400 mt-4 max-w-2xl">Don't miss out on our limited time offers and special bundles.</p>
                </div>

                <div className="flex flex-col gap-6">
                    {promotions.map((promo) => (
                        <div key={promo.id} className="bg-gradient-to-r from-zinc-900 to-black p-8 rounded-2xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 hover:border-accent/50 transition-colors group">
                            <div className="flex items-center gap-6">
                                <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                                    <Tag className="text-accent" size={32} />
                                </div>
                                <div>
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-2xl font-bold text-white">{promo.title}</h3>
                                        <span className="bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse">
                                            {promo.discount}
                                        </span>
                                    </div>
                                    <p className="text-gray-400">{promo.description}</p>
                                </div>
                            </div>

                            <div className="flex flex-col items-end gap-2 w-full md:w-auto">
                                <span className="text-sm text-gray-500 uppercase tracking-widest font-bold">Promo Code</span>
                                <div className="bg-white/10 px-6 py-3 rounded-xl border border-dashed border-white/30 text-xl font-monoton text-accent tracking-widest select-all cursor-pointer hover:bg-white/20 transition-colors">
                                    {promo.code}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default PromoList;
