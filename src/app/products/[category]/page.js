'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '../../../components/layout/Navbar';
import BrandAccordion from '../../../components/products/BrandAccordion';
import { categoryMapping, groupProductsByBrand } from '../../../lib/productUtils';

export default function CategoryCatalog() {
    const params = useParams();
    const router = useRouter();
    const categorySlug = params.category; // Ensure this matches folder name [category]

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedBrands, setSelectedBrands] = useState([]);

    // Get category info from mapping
    const categoryInfo = categoryMapping[categorySlug];

    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch('/api/products');
                const data = await response.json();

                // Filter products by category if data is valid
                if (Array.isArray(data)) {
                    const filtered = data.filter(p => p.category === categoryInfo?.category);
                    setProducts(filtered);
                } else {
                    console.error("API response is not an array:", data);
                    setProducts([]);
                }

            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Failed to load products');
            } finally {
                setLoading(false);
            }
        }

        if (categoryInfo) {
            fetchProducts();
        } else {
            setError('Category not found');
            setLoading(false);
        }
    }, [categorySlug, categoryInfo]);

    // Group products by brand
    const brandedProducts = groupProductsByBrand(products);
    const allBrandNames = Object.keys(brandedProducts);

    // Filter brands based on selection
    const brandNames = selectedBrands.length > 0
        ? allBrandNames.filter(brand => selectedBrands.includes(brand))
        : allBrandNames;

    // Toggle brand filter
    const toggleBrand = (brand) => {
        setSelectedBrands(prev =>
            prev.includes(brand)
                ? prev.filter(b => b !== brand)
                : [...prev, brand]
        );
    };

    // Clear all filters
    const clearFilters = () => {
        setSelectedBrands([]);
    };

    // Handle invalid category
    if (!categoryInfo) {
        return (
            <div className="min-h-screen bg-background text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Category Not Found</h1>
                    <button
                        onClick={() => router.push('/products')}
                        className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/80 transition"
                    >
                        Back to Products
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background text-white">
            <Navbar />

            <main className="pb-16">
                {/* Modern Header Section */}
                <section className="relative w-full pt-24 pb-16 px-6 mb-10">
                    {/* Big Cool Text Header */}
                    <div className="text-center max-w-6xl mx-auto">
                        <h1
                            className="text-6xl md:text-8xl font-black mb-6 bg-gradient-to-r from-accent via-purple-500 to-pink-500 bg-clip-text text-transparent leading-tight"
                            style={{
                                textShadow: '0 0 80px rgba(124, 58, 237, 0.3)'
                            }}
                        >
                            {categoryInfo.display.toUpperCase()}
                        </h1>

                        {/* Stats */}
                        <div className="flex items-center justify-center gap-6 text-sm text-gray-400">
                            <button
                                onClick={() => router.push('/products')}
                                className="flex items-center gap-2 hover:text-accent transition-colors"
                            >
                                ← Back to Products
                            </button>
                            <span>•</span>
                            <span className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
                                {products.length} Products
                            </span>
                            <span>•</span>
                            <span>{allBrandNames.length} Brands Available</span>
                        </div>
                    </div>
                </section>

                <div className="max-w-6xl mx-auto px-6">
                    {/* Brand Filter Section */}
                    {!loading && !error && allBrandNames.length > 0 && (
                        <div className="mb-8 p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                            <div className="flex items-center justify-between mb-4">
                                <h3 className="text-lg font-semibold text-white">Filter by Brand</h3>
                                {selectedBrands.length > 0 && (
                                    <button
                                        onClick={clearFilters}
                                        className="text-sm text-accent hover:text-accent/80 transition-colors"
                                    >
                                        Clear All ({selectedBrands.length})
                                    </button>
                                )}
                            </div>

                            <div className="flex flex-wrap gap-3">
                                {allBrandNames.map((brand) => (
                                    <button
                                        key={brand}
                                        onClick={() => toggleBrand(brand)}
                                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${selectedBrands.includes(brand)
                                            ? 'bg-accent text-white shadow-lg shadow-accent/30'
                                            : 'bg-white/5 text-gray-300 hover:bg-white/10 border border-white/10'
                                            }`}
                                    >
                                        {brand}
                                        <span className="ml-2 text-sm opacity-70">
                                            ({brandedProducts[brand].length})
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Loading State */}
                    {loading && (
                        <div className="flex items-center justify-center py-20">
                            <div className="flex flex-col items-center gap-4">
                                <div className="w-12 h-12 border-4 border-accent/30 border-t-accent rounded-full animate-spin" />
                                <p className="text-gray-400">Loading products...</p>
                            </div>
                        </div>
                    )}

                    {/* Error State */}
                    {error && !loading && (
                        <div className="text-center py-20">
                            <p className="text-red-400 mb-4">{error}</p>
                            <button
                                onClick={() => router.push('/products')}
                                className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/80 transition"
                            >
                                Back to Products
                            </button>
                        </div>
                    )}

                    {/* Brand Accordions */}
                    {!loading && !error && brandNames.length > 0 && (
                        <div className="space-y-6">
                            {brandNames.map((brandName, index) => (
                                <div
                                    key={brandName}
                                    className="animate-fadeInUp"
                                    style={{
                                        animationDelay: `${index * 50}ms`,
                                        animationFillMode: 'both'
                                    }}
                                >
                                    <BrandAccordion
                                        brandName={brandName}
                                        products={brandedProducts[brandName]}
                                    />
                                </div>
                            ))}
                        </div>
                    )}

                    {/* No Products State */}
                    {!loading && !error && brandNames.length === 0 && selectedBrands.length > 0 && (
                        <div className="text-center py-20">
                            <p className="text-gray-400 text-lg mb-4">No products found with the selected filters.</p>
                            <button
                                onClick={clearFilters}
                                className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/80 transition"
                            >
                                Clear Filters
                            </button>
                        </div>
                    )}

                    {/* No Products in Category State */}
                    {!loading && !error && products.length === 0 && (
                        <div className="text-center py-20">
                            <p className="text-gray-400 text-lg mb-4">No products found in this category.</p>
                            <button
                                onClick={() => router.push('/products')}
                                className="px-6 py-3 bg-accent text-white rounded-lg hover:bg-accent/80 transition"
                            >
                                Back to Products
                            </button>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}
