import { NextResponse } from 'next/server';
import { queryOne, execute } from '@/lib/db';
import { validateCategory } from '@/lib/validations';
import { getAuthUser } from '@/lib/auth';
import { createUniqueSlug } from '@/lib/slugify';
import type { Category } from '@/types';

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

    const existing = await queryOne<Category>('SELECT * FROM categories WHERE id = ?', [categoryId]);
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }

    const body = await request.json();

    // Re-generate slug if name changed and slug not explicitly set
    if (body.name && body.name !== existing.name && !body.slug) {
      body.slug = await createUniqueSlug(body.name, async (slug) => {
        return !!(await queryOne<Category>('SELECT id FROM categories WHERE slug = ? AND id != ?', [slug, categoryId]));
      });
    }

    const merged = {
      name: body.name ?? existing.name,
      slug: body.slug ?? existing.slug,
    };

    const validation = validateCategory(merged);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const data = validation.data!;

    // Check slug uniqueness (excluding current category)
    const slugConflict = await queryOne<Category>(
      'SELECT id FROM categories WHERE slug = ? AND id != ?',
      [data.slug, categoryId]
    );
    if (slugConflict) {
      return NextResponse.json(
        { success: false, error: 'A category with this slug already exists' },
        { status: 400 }
      );
    }

    // If slug changed, update posts that reference the old slug
    const oldSlug = existing.slug;
    await execute(
      'UPDATE categories SET name = ?, slug = ? WHERE id = ?',
      [data.name, data.slug, categoryId]
    );

    if (oldSlug !== data.slug) {
      await execute('UPDATE posts SET category = ? WHERE category = ?', [data.slug, oldSlug]);
    }

    const updated = await queryOne<Category>('SELECT * FROM categories WHERE id = ?', [categoryId]);

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error('Update category error:', error);
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

    const existing = await queryOne<Category>('SELECT * FROM categories WHERE id = ?', [categoryId]);
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Category not found' },
        { status: 404 }
      );
    }

    // Check if category is in use
    const postCount = await queryOne<{ cnt: number }>(
      'SELECT COUNT(*) as cnt FROM posts WHERE category = ?',
      [existing.slug]
    );

    if (postCount && postCount.cnt > 0) {
      return NextResponse.json(
        { success: false, error: `Cannot delete category: ${postCount.cnt} post(s) are using it` },
        { status: 400 }
      );
    }

    await execute('DELETE FROM categories WHERE id = ?', [categoryId]);

    return NextResponse.json({
      success: true,
      data: { message: 'Category deleted successfully' },
    });
  } catch (error) {
    console.error('Delete category error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
