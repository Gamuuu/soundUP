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
        if (productName.includes(brand)) {
            return brand;
        }
    }

    // Fallback: Use first word of product name
    return productName.split(' ')[0];
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
    'speakers': { item_type: 'Speaker', display: 'Speakers' },
    'subwoofers': { item_type: 'Subwoofer', display: 'Subwoofers' },
    'amplifiers': { item_type: 'Amplifier', display: 'Amplifiers' },
    'head-units': { item_type: 'Head Unit', display: 'Head Units' }
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
