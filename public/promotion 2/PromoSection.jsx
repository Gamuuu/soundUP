import React from 'react';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

// Default promotions data
const defaultPromotions = [
    { title: 'Summer Sale', discount: '20% OFF', color: 'from-orange-500/20 to-orange-900/20' },
    { title: 'New Arrivals', discount: 'Check it out', color: 'from-blue-500/20 to-blue-900/20' },
    { title: 'Member Exclusive', discount: 'Points x2', color: 'from-purple-500/20 to-purple-900/20' },
    { title: 'Clearance', discount: 'Up to 50%', color: 'from-red-500/20 to-red-900/20' },
];

const PromoSection = ({
    promotions = defaultPromotions,
    backgroundImage = '/assets/images/home-bg-2.jpg',
    SectionHeading,
    linkHref = '/promotion',
    showLink = true
}) => {
    return (
        <section id="promotion"
            className="min-h-screen w-full flex flex-col justify-center py-20 px-6 max-w-7xl mx-auto snap-start bg-cover bg-center bg-no-repeat bg-fixed relative overflow-hidden"
            style={{ backgroundImage: `url('${backgroundImage}')` }}
        >
            <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
            <div className="relative z-10 w-full">
                {SectionHeading ? (
                    <SectionHeading className="mb-12">Promotion. Specialist for you.</SectionHeading>
                ) : (
                    <h2 className="text-4xl font-bold text-white mb-12">Promotion. Specialist for you.</h2>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    {promotions.map((promo, index) => (
                        <div
                            key={index}
                            className="aspect-[3/4] rounded-3xl relative overflow-hidden group cursor-pointer border border-white/10 hover:border-accent/50 transition-all duration-500 hover:shadow-[0_0_50px_rgba(255,85,0,0.2)]"
                        >
                            {/* Background Gradient Placeholder */}
                            <div className={`absolute inset-0 bg-gradient-to-br ${promo.color} opacity-50 group-hover:opacity-100 group-hover:scale-110 transition-all duration-700`} />
                            <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px] group-hover:backdrop-blur-none transition-all duration-500" />

                            {/* Content Overlay */}
                            <div className="absolute inset-0 p-8 flex flex-col justify-end bg-gradient-to-t from-black via-black/50 to-transparent">
                                <h3 className="text-3xl font-bold text-white mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">{promo.title}</h3>
                                <p className="text-accent font-bold tracking-wider uppercase text-sm transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500 delay-100">{promo.discount}</p>
                            </div>
                        </div>
                    ))}
                </div>

                {showLink && (
                    <div className="flex justify-center">
                        <Link href={linkHref}>
                            <button className="bg-white text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-accent hover:text-white transition-colors cursor-pointer">
                                See more <ArrowRight size={20} />
                            </button>
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
};

export default PromoSection;
