import { NextResponse } from 'next/server';
import { queryAll, queryOne, execute } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import type { Product } from '@/types';

export async function GET() {
  try {
    const products = queryAll<Product>(
      'SELECT * FROM products ORDER BY sort_order ASC, name ASC'
    );

    return NextResponse.json({
      success: true,
      data: products,
    });
  } catch (error) {
    console.error('Get products error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const body = await request.json();
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const sort_order = typeof body.sort_order === 'number' ? body.sort_order : 0;

    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Product name is required' },
        { status: 400 }
      );
    }

    // Check for duplicate
    const existing = queryOne<Product>('SELECT id FROM products WHERE name = ?', [name]);
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Product already exists' },
        { status: 400 }
      );
    }

    const result = execute(
      'INSERT INTO products (name, sort_order) VALUES (?, ?)',
      [name, sort_order]
    );

    const newProduct = queryOne<Product>('SELECT * FROM products WHERE id = ?', [result.lastInsertRowid]);

    return NextResponse.json(
      { success: true, data: newProduct },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create product error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
