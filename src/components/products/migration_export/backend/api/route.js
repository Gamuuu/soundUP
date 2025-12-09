import { NextResponse } from 'next/server';
import db from '../../../lib/db.js';

// GET all products or single product by ID
export async function GET(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (id) {
            // Get single product
            const product = db.prepare('SELECT * FROM products WHERE id = ?').get(id);

            if (!product) {
                return NextResponse.json(
                    { error: 'Product not found' },
                    { status: 404 }
                );
            }

            return NextResponse.json(product);
        } else {
            // Get all products
            const category = searchParams.get('category');

            let products;
            if (category) {
                products = db.prepare('SELECT * FROM products WHERE category = ?').all(category);
            } else {
                products = db.prepare('SELECT * FROM products').all();
            }

            return NextResponse.json(products);
        }
    } catch (error) {
        console.error('Error fetching products:', error);
        return NextResponse.json(
            { error: 'Failed to fetch products' },
            { status: 500 }
        );
    }
}

// POST - Create new product
export async function POST(request) {
    try {
        const body = await request.json();
        const { name, description, price, image, category, stock } = body;

        // Validate required fields
        if (!name || !price) {
            return NextResponse.json(
                { error: 'Name and price are required' },
                { status: 400 }
            );
        }

        const stmt = db.prepare(`
            INSERT INTO products (name, description, price, image, category, stock)
            VALUES (?, ?, ?, ?, ?, ?)
        `);

        const result = stmt.run(
            name,
            description || null,
            price,
            image || null,
            category || null,
            stock || 0
        );

        const newProduct = db.prepare('SELECT * FROM products WHERE id = ?').get(result.lastInsertRowid);

        return NextResponse.json(newProduct, { status: 201 });
    } catch (error) {
        console.error('Error creating product:', error);
        return NextResponse.json(
            { error: 'Failed to create product' },
            { status: 500 }
        );
    }
}

// PUT - Update product
export async function PUT(request) {
    try {
        const body = await request.json();
        const { id, name, description, price, image, category, stock } = body;

        if (!id) {
            return NextResponse.json(
                { error: 'Product ID is required' },
                { status: 400 }
            );
        }

        const stmt = db.prepare(`
            UPDATE products
            SET name = ?, description = ?, price = ?, image = ?, category = ?, stock = ?
            WHERE id = ?
        `);

        const result = stmt.run(name, description, price, image, category, stock, id);

        if (result.changes === 0) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            );
        }

        const updatedProduct = db.prepare('SELECT * FROM products WHERE id = ?').get(id);

        return NextResponse.json(updatedProduct);
    } catch (error) {
        console.error('Error updating product:', error);
        return NextResponse.json(
            { error: 'Failed to update product' },
            { status: 500 }
        );
    }
}

// DELETE - Delete product
export async function DELETE(request) {
    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json(
                { error: 'Product ID is required' },
                { status: 400 }
            );
        }

        const stmt = db.prepare('DELETE FROM products WHERE id = ?');
        const result = stmt.run(id);

        if (result.changes === 0) {
            return NextResponse.json(
                { error: 'Product not found' },
                { status: 404 }
            );
        }

        return NextResponse.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        return NextResponse.json(
            { error: 'Failed to delete product' },
            { status: 500 }
        );
    }
}
