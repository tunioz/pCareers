import { NextResponse } from 'next/server';
import { queryOne, execute } from '@/lib/db';
import { validateGalleryPhoto } from '@/lib/validations';
import { getAuthUser } from '@/lib/auth';
import type { GalleryPhoto, GalleryPhotoWithCategory } from '@/types';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const photoId = parseInt(id, 10);

    if (isNaN(photoId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid photo ID' },
        { status: 400 }
      );
    }

    const photo = queryOne<GalleryPhotoWithCategory>(
      `SELECT p.*, c.name as category_name, c.slug as category_slug
       FROM gallery_photos p
       JOIN gallery_categories c ON p.category_id = c.id
       WHERE p.id = ?`,
      [photoId]
    );

    if (!photo) {
      return NextResponse.json(
        { success: false, error: 'Gallery photo not found' },
        { status: 404 }
      );
    }

    const user = await getAuthUser();
    if (!photo.is_published && !user) {
      return NextResponse.json(
        { success: false, error: 'Gallery photo not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: photo,
    });
  } catch (error) {
    console.error('Get gallery photo error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
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
    const photoId = parseInt(id, 10);

    if (isNaN(photoId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid photo ID' },
        { status: 400 }
      );
    }

    const existing = queryOne<GalleryPhoto>(
      'SELECT * FROM gallery_photos WHERE id = ?',
      [photoId]
    );

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Gallery photo not found' },
        { status: 404 }
      );
    }

    const body = await request.json();

    const merged = {
      category_id: body.category_id ?? existing.category_id,
      image: body.image ?? existing.image,
      alt_text: body.alt_text !== undefined ? body.alt_text : existing.alt_text,
      sort_order: body.sort_order !== undefined ? body.sort_order : existing.sort_order,
      is_published: body.is_published !== undefined ? body.is_published : existing.is_published,
    };

    const validation = validateGalleryPhoto(merged);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const data = validation.data!;

    // Verify category exists if changed
    if (data.category_id !== existing.category_id) {
      const category = queryOne<{ id: number }>(
        'SELECT id FROM gallery_categories WHERE id = ?',
        [data.category_id]
      );
      if (!category) {
        return NextResponse.json(
          { success: false, error: 'Gallery category not found' },
          { status: 400 }
        );
      }
    }

    execute(
      `UPDATE gallery_photos SET
        category_id = ?, image = ?, alt_text = ?, sort_order = ?, is_published = ?
       WHERE id = ?`,
      [
        data.category_id,
        data.image,
        data.alt_text || null,
        data.sort_order ?? 0,
        data.is_published ?? 1,
        photoId,
      ]
    );

    const updated = queryOne<GalleryPhotoWithCategory>(
      `SELECT p.*, c.name as category_name, c.slug as category_slug
       FROM gallery_photos p
       JOIN gallery_categories c ON p.category_id = c.id
       WHERE p.id = ?`,
      [photoId]
    );

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error('Update gallery photo error:', error);
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
    const photoId = parseInt(id, 10);

    if (isNaN(photoId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid photo ID' },
        { status: 400 }
      );
    }

    const existing = queryOne<{ id: number }>(
      'SELECT id FROM gallery_photos WHERE id = ?',
      [photoId]
    );

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Gallery photo not found' },
        { status: 404 }
      );
    }

    execute('DELETE FROM gallery_photos WHERE id = ?', [photoId]);

    return NextResponse.json({
      success: true,
      data: { message: 'Gallery photo deleted successfully' },
    });
  } catch (error) {
    console.error('Delete gallery photo error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
