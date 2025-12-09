'use client';

import ProductRow from './ProductRow';

export default function BrandAccordion({ brandName, products }) {
    return (
        <div className="mb-8">
            {/* Brand Header - No Box */}
            <div className="mb-4 px-2">
                <div className="flex items-center gap-4">
                    <h3 className="text-2xl md:text-3xl font-bold text-white">
                        {brandName}
                    </h3>
                    <span className="px-3 py-1 rounded-full bg-accent/20 text-accent text-sm font-semibold">
                        {products.length} {products.length === 1 ? 'model' : 'models'}
                    </span>
                </div>
            </div>

            {/* Products List - Always Visible */}
            <div>
                <div className="space-y-3">
                    {products.map((product) => (
                        <ProductRow key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </div>
    );
}
