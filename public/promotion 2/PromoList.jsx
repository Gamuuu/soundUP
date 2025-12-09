import React from 'react';
import { Tag, Music, Zap, Layers, Gift, Calendar } from 'lucide-react';
import { promotionsData } from './data';

const PromoCard = ({ promo, theme }) => {
    const themeStyles = {
        christmas: {
            border: 'border-red-500/30',
            hoverBorder: 'group-hover:border-red-500',
            iconBg: 'bg-red-500/20',
            iconColor: 'text-red-500',
            discountBg: 'bg-green-600',
            gradient: 'from-zinc-900 to-red-950/30'
        },
        newyear: {
            border: 'border-yellow-500/30',
            hoverBorder: 'group-hover:border-yellow-500',
            iconBg: 'bg-yellow-500/20',
            iconColor: 'text-yellow-500',
            discountBg: 'bg-yellow-600',
            gradient: 'from-zinc-900 to-yellow-950/30'
        }
    };

    const style = themeStyles[theme];
    const Icon = promo.icon;

    return (
        <div className={`bg-gradient-to-r ${style.gradient} p-8 rounded-2xl border ${style.border} flex flex-col md:flex-row items-center justify-between gap-6 ${style.hoverBorder} transition-colors group`}>
            <div className="flex items-center gap-6">
                <div className={`w-16 h-16 ${style.iconBg} rounded-full flex items-center justify-center flex-shrink-0`}>
                    <Icon className={style.iconColor} size={32} />
                </div>
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        <h3 className="text-2xl font-bold text-white">{promo.title}</h3>
                        <span className={`${style.discountBg} text-white text-xs font-bold px-2 py-1 rounded-full animate-pulse`}>
                            {promo.discount}
                        </span>
                    </div>
                    <p className="text-gray-400">{promo.description}</p>
                </div>
            </div>

            <div className="flex flex-col items-end gap-2 w-full md:w-auto">
                <span className="text-sm text-gray-500 uppercase tracking-widest font-bold">Promo Code</span>
                <div className="bg-white/10 px-6 py-3 rounded-xl border border-dashed border-white/30 text-xl font-monoton text-white tracking-widest select-all cursor-pointer hover:bg-white/20 transition-colors">
                    {promo.code}
                </div>
            </div>
        </div>
    );
};

const PromoList = ({ SectionHeading }) => {
    return (
        <section className="min-h-screen pt-24 px-6 bg-background">
            <div className="max-w-7xl mx-auto pb-20">
                <div className="mb-12 text-center">
                    {SectionHeading ? (
                        <SectionHeading>Seasonal Promotions</SectionHeading>
                    ) : (
                        <h1 className="text-4xl font-bold text-white">Seasonal Promotions</h1>
                    )}
                    <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
                        Celebrate the holidays with upgraded sound. Limited time offers for Christmas and New Year.
                    </p>
                </div>

                {/* Christmas Section */}
                <div className="mb-16">
                    <div className="flex items-center gap-3 mb-6">
                        <Gift className="text-red-500" size={28} />
                        <h2 className="text-3xl font-bold text-white">Christmas Specials</h2>
                    </div>
                    <div className="flex flex-col gap-6">
                        {promotionsData.christmas.map((promo) => (
                            <PromoCard key={promo.id} promo={promo} theme="christmas" />
                        ))}
                    </div>
                </div>

                {/* New Year Section */}
                <div>
                    <div className="flex items-center gap-3 mb-6">
                        <Calendar className="text-yellow-500" size={28} />
                        <h2 className="text-3xl font-bold text-white">New Year Celebration</h2>
                    </div>
                    <div className="flex flex-col gap-6">
                        {promotionsData.newyear.map((promo) => (
                            <PromoCard key={promo.id} promo={promo} theme="newyear" />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export { PromoCard };
export default PromoList;
