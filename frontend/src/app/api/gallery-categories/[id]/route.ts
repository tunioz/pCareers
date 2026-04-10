import { NextResponse } from 'next/server';
import { queryOne, execute } from '@/lib/db';
import { validateGalleryCategory } from '@/lib/validations';
import { getAuthUser } from '@/lib/auth';
import { createSlug } from '@/lib/slugify';
import type { GalleryCategory } from '@/types';

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
    const categoryId = parseInt(id, 10);

    if (isNaN(categoryId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid category ID' },
        { status: 400 }
      );
    }

    const existing = await queryOne<GalleryCategory>(
      'SELECT * FROM gallery_categories WHERE id = ?',
      [categoryId]
    );

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Gallery category not found' },
        { status: 404 }
      );
    }

    const body = await request.json();

    const merged = {
      name: body.name ?? existing.name,
      slug: body.slug ?? (body.name ? createSlug(body.name) : existing.slug),
      sort_order: body.sort_order !== undefined ? body.sort_order : existing.sort_order,
    };

    const validation = validateGalleryCategory(merged);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const data = validation.data!;

    // Check for duplicate slug (excluding current)
    const duplicateSlug = await queryOne<{ id: number }>(
      'SELECT id FROM gallery_categories WHERE slug = ? AND id != ?',
      [data.slug, categoryId]
    );
    if (duplicateSlug) {
      return NextResponse.json(
        { success: false, error: 'A category with this slug already exists' },
        { status: 400 }
      );
    }

    await execute(
      'UPDATE gallery_categories SET name = ?, slug = ?, sort_order = ? WHERE id = ?',
      [data.name, data.slug, data.sort_order ?? 0, categoryId]
    );

    const updated = await queryOne(
      'SELECT * FROM gallery_categories WHERE id = ?',
      [categoryId]
    );

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error('Update gallery category error:', error);
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
    const categoryId = parseInt(id, 10);

    if (isNaN(categoryId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid category ID' },
        { status: 400 }
      );
    }

    const existing = await queryOne<{ id: number }>(
      'SELECT id FROM gallery_categories WHERE id = ?',
      [categoryId]
    );

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Gallery category not found' },
        { status: 404 }
      );
    }

    // CASCADE will delete associated photos
    await execute('DELETE FROM gallery_categories WHERE id = ?', [categoryId]);

    return NextResponse.json({
      success: true,
      data: { message: 'Gallery category deleted successfully' },
    });
  } catch (error) {
    console.error('Delete gallery category error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
