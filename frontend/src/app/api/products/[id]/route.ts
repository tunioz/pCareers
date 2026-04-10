import { NextResponse } from 'next/server';
import { queryOne, execute } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import type { Product } from '@/types';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function PUT(request: Request, context: RouteContext) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const productId = parseInt(id, 10);

    if (isNaN(productId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    const existing = await queryOne<Product>('SELECT * FROM products WHERE id = ?', [productId]);
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const name = typeof body.name === 'string' ? body.name.trim() : '';
    const sort_order = typeof body.sort_order === 'number' ? body.sort_order : existing.sort_order;

    if (!name) {
      return NextResponse.json(
        { success: false, error: 'Product name is required' },
        { status: 400 }
      );
    }

    // Check for duplicate name (excluding this product)
    const duplicate = await queryOne<Product>(
      'SELECT id FROM products WHERE name = ? AND id != ?',
      [name, productId]
    );
    if (duplicate) {
      return NextResponse.json(
        { success: false, error: 'A product with this name already exists' },
        { status: 400 }
      );
    }

    await execute(
      'UPDATE products SET name = ?, sort_order = ? WHERE id = ?',
      [name, sort_order, productId]
    );

    const updated = await queryOne<Product>('SELECT * FROM products WHERE id = ?', [productId]);

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error('Update product error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const productId = parseInt(id, 10);

    if (isNaN(productId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid product ID' },
        { status: 400 }
      );
    }

    const existing = await queryOne<Product>('SELECT * FROM products WHERE id = ?', [productId]);
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Product not found' },
        { status: 404 }
      );
    }

    // Check if any jobs use this product
    const jobCount = await queryOne<{ cnt: number }>(
      'SELECT COUNT(*) as cnt FROM jobs WHERE product = ?',
      [existing.name]
    );
    if (jobCount && jobCount.cnt > 0) {
      return NextResponse.json(
        { success: false, error: `Cannot delete: ${jobCount.cnt} job(s) use this product` },
        { status: 400 }
      );
    }

    await execute('DELETE FROM products WHERE id = ?', [productId]);

    return NextResponse.json({
      success: true,
      data: { message: 'Product deleted successfully' },
    });
  } catch (error) {
    console.error('Delete product error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
