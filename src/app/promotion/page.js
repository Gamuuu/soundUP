'use client';

import Navbar from '../../components/layout/Navbar';
import PromoHero from '../../components/promotion/PromoHero';
import PromoCategory from '../../components/promotion/PromoCategory';
import PromoList from '../../components/promotion/PromoList';
import { productsByCategory } from '../../components/promotion/data';
import SectionHeading from '../../components/ui/SectionHeading';

export default function Promotion() {
    return (
        <div className="h-screen bg-black text-white overflow-y-scroll snap-y snap-mandatory scroll-smooth">
            <Navbar />

            {/* Hero Section */}
            <PromoHero />

            {/* Speaker Category */}
            <PromoCategory
                title="SPEAKERS"
                subtitle="The Voice of Soul"
                background="/assets/images/service_speaker.png"
                products={productsByCategory.speakers}
            />

            {/* Amplifier Category */}
            <PromoCategory
                title="AMPLIFIERS"
                subtitle="Power Perfected. Distortion Zero."
                alignment="right"
                background="/assets/images/service_amplifier.png"
                products={productsByCategory.amplifiers}
            />

            {/* Subwoofer Category */}
            <PromoCategory
                title="SUBWOOFERS"
                subtitle="Earth Shaking Bass. Precise Control."
                alignment="left"
                background="/assets/images/service_sub.png"
                products={productsByCategory.subwoofers}
            />

            {/* Promo List Section */}
            <PromoList SectionHeading={SectionHeading} />
        </div>
    );
}