import React from 'react';
import Link from 'next/link';
import { ArrowRight, Image as ImageIcon } from 'lucide-react';
import SectionHeading from '../ui/SectionHeading';

const galleryImages = [
    "bg-zinc-800", "bg-zinc-700", "bg-zinc-600", "bg-zinc-900"
];

const Gallery = () => {
    return (
        <section id="gallery" className="min-h-screen flex flex-col justify-center py-20 px-6 max-w-7xl mx-auto snap-start">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
                <SectionHeading>Hesitated? See more what we have made.</SectionHeading>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
                {galleryImages.map((bg, index) => (
                    <div key={index} className={`aspect-square rounded-3xl ${bg} flex items-center justify-center overflow-hidden group`}>
                        {/* Placeholder for gallery image */}
                        <ImageIcon size={48} className="text-white/20 group-hover:text-white/40 transition-colors" />
                    </div>
                ))}
            </div>

            <div className="flex justify-center">
                <Link href="/about-us#experiences">
                    <button className="bg-white text-black px-8 py-4 rounded-full font-bold flex items-center gap-2 hover:bg-accent hover:text-white transition-colors cursor-pointer">
                        See more <ArrowRight size={20} />
                    </button>
                </Link>
            </div>
        </section>
    );
};

export default Gallery;
