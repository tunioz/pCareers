import { NextResponse } from 'next/server';
import { queryAll, queryOne, execute } from '@/lib/db';
import { validateGalleryCategory } from '@/lib/validations';
import { getAuthUser } from '@/lib/auth';
import { createSlug } from '@/lib/slugify';
import type { GalleryCategoryWithCount } from '@/types';

export async function GET() {
  try {
    const categories = queryAll<GalleryCategoryWithCount>(
      `SELECT gc.*, IFNULL(cnt.photo_count, 0) as photo_count
       FROM gallery_categories gc
       LEFT JOIN (
         SELECT category_id, COUNT(*) as photo_count
         FROM gallery_photos
         GROUP BY category_id
       ) cnt ON cnt.category_id = gc.id
       ORDER BY gc.sort_order ASC, gc.id ASC`
    );

    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error('Get gallery categories error:', error);
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

    // Auto-generate slug if not provided
    if (!body.slug && body.name) {
      body.slug = createSlug(body.name);
    }

    const validation = validateGalleryCategory(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const data = validation.data!;

    // Check for duplicate slug
    const existing = queryOne<{ id: number }>(
      'SELECT id FROM gallery_categories WHERE slug = ?',
      [data.slug]
    );
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'A category with this slug already exists' },
        { status: 400 }
      );
    }

    // Auto-assign sort_order if not provided
    let sortOrder = data.sort_order ?? 0;
    if (!body.sort_order && body.sort_order !== 0) {
      const maxOrder = queryOne<{ max_order: number | null }>(
        'SELECT MAX(sort_order) as max_order FROM gallery_categories'
      );
      sortOrder = (maxOrder?.max_order ?? -1) + 1;
    }

    const result = execute(
      'INSERT INTO gallery_categories (name, slug, sort_order) VALUES (?, ?, ?)',
      [data.name, data.slug, sortOrder]
    );

    const newCategory = queryOne(
      'SELECT * FROM gallery_categories WHERE id = ?',
      [result.lastInsertRowid]
    );

    return NextResponse.json(
      { success: true, data: newCategory },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create gallery category error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
