import React from 'react';
import SectionHeading from '../ui/SectionHeading';

const products = [
    { id: 1, name: 'Premium Speakers', price: '$299', image: 'https://images.unsplash.com/photo-1545454675-3531b543be5d?q=80&w=2940&auto=format&fit=crop' },
    { id: 2, name: 'Wireless Headphones', price: '$199', image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=2940&auto=format&fit=crop' },
    { id: 3, name: 'Bass Subwoofer', price: '$499', image: 'https://images.unsplash.com/photo-1558403194-611308249627?q=80&w=2940&auto=format&fit=crop' },
    { id: 4, name: 'Car Audio System', price: '$899', image: 'https://images.unsplash.com/photo-1615906655593-ad0386982a0f?q=80&w=2787&auto=format&fit=crop' },
    { id: 5, name: 'Digital Amplifier', price: '$349', image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=2940&auto=format&fit=crop' },
    { id: 6, name: 'Tweeters Pair', price: '$149', image: 'https://images.unsplash.com/photo-1564424224827-cd24b8915874?q=80&w=2940&auto=format&fit=crop' },
];

const ProductListing = () => {
    return (
        <section className="min-h-screen pt-24 px-6 bg-background">
            <div className="max-w-7xl mx-auto">
                <div className="mb-12">
                    <SectionHeading>Our Products</SectionHeading>
                    <p className="text-gray-400 mt-4 max-w-2xl">Discover sound quality like never before. From immersive car audio systems to high-fidelity home theaters.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {products.map((product) => (
                        <div key={product.id} className="group bg-zinc-900/50 rounded-2xl overflow-hidden border border-white/5 hover:border-accent/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
                            <div className="relative h-64 overflow-hidden">
                                <img
                                    src={product.image}
                                    alt={product.name}
                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                                    <button className="bg-accent text-white px-6 py-2 rounded-full font-bold hover:bg-orange-600 transition-colors w-full">
                                        View Details
                                    </button>
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-white mb-2">{product.name}</h3>
                                <p className="text-accent font-bold text-lg">{product.price}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default ProductListing;
