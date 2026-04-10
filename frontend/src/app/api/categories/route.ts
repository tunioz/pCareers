import { NextResponse } from 'next/server';
import { queryAll, queryOne, execute } from '@/lib/db';
import { validateCategory } from '@/lib/validations';
import { getAuthUser } from '@/lib/auth';
import { createUniqueSlug } from '@/lib/slugify';
import type { CategoryWithCount, Category } from '@/types';

export async function GET() {
  try {
    const categories = await queryAll<CategoryWithCount>(
      `SELECT c.*, IFNULL(pc.cnt, 0) as post_count
       FROM categories c
       LEFT JOIN (
         SELECT category, COUNT(*) as cnt
         FROM posts
         WHERE is_published = 1
         GROUP BY category
       ) pc ON c.slug = pc.category
       ORDER BY c.name ASC`
    );

    return NextResponse.json({
      success: true,
      data: categories,
    });
  } catch (error) {
    console.error('Get categories error:', error);
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

    // Auto-generate slug from name if not provided
    if (!body.slug && body.name) {
      body.slug = await createUniqueSlug(body.name, async (slug) => {
        return !!(await queryOne('SELECT 1 FROM categories WHERE slug = ?', [slug]));
      });
    }

    const validation = validateCategory(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const data = validation.data!;

    // Check for duplicate slug
    const existingSlug = await queryOne<Category>('SELECT id FROM categories WHERE slug = ?', [data.slug]);
    if (existingSlug) {
      return NextResponse.json(
        { success: false, error: 'A category with this slug already exists' },
        { status: 400 }
      );
    }

    const result = await execute(
      'INSERT INTO categories (name, slug) VALUES (?, ?)',
      [data.name, data.slug]
    );

    const newCategory = await queryOne<Category>(
      'SELECT * FROM categories WHERE id = ?',
      [result.lastInsertRowid]
    );

    return NextResponse.json(
      { success: true, data: newCategory },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create category error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
