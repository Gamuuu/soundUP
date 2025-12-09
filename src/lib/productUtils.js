// Utility functions for product brand extraction and grouping

/**
 * Extract brand name from product name
 */
export function extractBrand(productName) {
    const brands = [
        'Rockford Fosgate',
        'JBL',
        'Focal',
        'Alpine',
        'Kicker',
        'Pioneer',
        'Kenwood',
        'Sony'
    ];

    for (const brand of brands) {
        if (productName && productName.includes(brand)) {
            return brand;
        }
    }

    // Fallback: Use first word of product name
    return productName ? productName.split(' ')[0] : 'Unknown';
}

/**
 * Group products by brand
 */
export function groupProductsByBrand(products) {
    const grouped = {};

    products.forEach(product => {
        const brand = extractBrand(product.name);
        if (!grouped[brand]) {
            grouped[brand] = [];
        }
        grouped[brand].push(product);
    });

    // Sort brands alphabetically
    const sorted = {};
    Object.keys(grouped)
        .sort()
        .forEach(key => {
            sorted[key] = grouped[key];
        });

    return sorted;
}

/**
 * Category mapping for URL slugs
 */
export const categoryMapping = {
    'speakers': { category: 'Speaker', display: 'Speakers' },
    'subwoofers': { category: 'Subwoofer', display: 'Subwoofers' },
    'amplifiers': { category: 'Amplifier', display: 'Amplifiers' },
    'head-units': { category: 'Head Unit', display: 'Head Units' }
};

/**
 * Get category slug from item_type
 */
export function getCategorySlug(itemType) {
    const mapping = {
        'Speaker': 'speakers',
        'Subwoofer': 'subwoofers',
        'Amplifier': 'amplifiers',
        'Head Unit': 'head-units'
    };
    return mapping[itemType] || itemType.toLowerCase();
}
