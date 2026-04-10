import { NextResponse } from 'next/server';
import { queryAll, queryOne, execute } from '@/lib/db';
import { validateGalleryPhoto } from '@/lib/validations';
import { getAuthUser } from '@/lib/auth';
import type { GalleryPhotoWithCategory } from '@/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('category_id');

    const user = await getAuthUser();
    const isAdmin = !!user;

    let sql = `
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM gallery_photos p
      JOIN gallery_categories c ON p.category_id = c.id
    `;
    const params: unknown[] = [];
    const conditions: string[] = [];

    if (!isAdmin) {
      conditions.push('p.is_published = 1');
    }

    if (categoryId) {
      const catId = parseInt(categoryId, 10);
      if (!isNaN(catId)) {
        conditions.push('p.category_id = ?');
        params.push(catId);
      }
    }

    if (conditions.length > 0) {
      sql += ' WHERE ' + conditions.join(' AND ');
    }

    sql += ' ORDER BY p.sort_order ASC, p.id ASC';

    const photos = await queryAll<GalleryPhotoWithCategory>(sql, params);

    return NextResponse.json({
      success: true,
      data: photos,
    });
  } catch (error) {
    console.error('Get gallery photos error:', error);
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

    const validation = validateGalleryPhoto(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const data = validation.data!;

    // Verify category exists
    const category = await queryOne<{ id: number }>(
      'SELECT id FROM gallery_categories WHERE id = ?',
      [data.category_id]
    );
    if (!category) {
      return NextResponse.json(
        { success: false, error: 'Gallery category not found' },
        { status: 400 }
      );
    }

    // Auto-assign sort_order if not provided
    let sortOrder = data.sort_order ?? 0;
    if (!body.sort_order && body.sort_order !== 0) {
      const maxOrder = await queryOne<{ max_order: number | null }>(
        'SELECT MAX(sort_order) as max_order FROM gallery_photos WHERE category_id = ?',
        [data.category_id]
      );
      sortOrder = (maxOrder?.max_order ?? -1) + 1;
    }

    const result = await execute(
      `INSERT INTO gallery_photos (category_id, image, alt_text, sort_order, is_published)
       VALUES (?, ?, ?, ?, ?)`,
      [
        data.category_id,
        data.image,
        data.alt_text || null,
        sortOrder,
        data.is_published ?? 1,
      ]
    );

    const newPhoto = await queryOne<GalleryPhotoWithCategory>(
      `SELECT p.*, c.name as category_name, c.slug as category_slug
       FROM gallery_photos p
       JOIN gallery_categories c ON p.category_id = c.id
       WHERE p.id = ?`,
      [result.lastInsertRowid]
    );

    return NextResponse.json(
      { success: true, data: newPhoto },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create gallery photo error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
