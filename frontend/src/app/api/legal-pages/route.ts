import { NextResponse } from 'next/server';
import { queryAll, queryOne, execute } from '@/lib/db';
import { validateLegalPage } from '@/lib/validations';
import { getAuthUser } from '@/lib/auth';
import { createUniqueSlug } from '@/lib/slugify';
import type { LegalPage } from '@/types';

export async function GET() {
  try {
    const pages = queryAll<LegalPage>(
      'SELECT * FROM legal_pages ORDER BY title ASC'
    );

    return NextResponse.json({
      success: true,
      data: pages,
    });
  } catch (error) {
    console.error('Get legal pages error:', error);
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

    // Auto-generate slug from title if not provided
    if (!body.slug && body.title) {
      body.slug = createUniqueSlug(body.title, (slug) => {
        return !!queryOne('SELECT 1 FROM legal_pages WHERE slug = ?', [slug]);
      });
    }

    const validation = validateLegalPage(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const data = validation.data!;

    // Check for duplicate slug
    const existing = queryOne<LegalPage>(
      'SELECT id FROM legal_pages WHERE slug = ?',
      [data.slug]
    );
    if (existing) {
      return NextResponse.json(
        { success: false, error: 'A page with this slug already exists' },
        { status: 400 }
      );
    }

    const result = execute(
      `INSERT INTO legal_pages (slug, title, content, last_updated, is_published)
       VALUES (?, ?, ?, IFNULL(?, datetime('now')), ?)`,
      [
        data.slug,
        data.title,
        data.content,
        data.last_updated || null,
        data.is_published ?? 1,
      ]
    );

    const newPage = queryOne<LegalPage>(
      'SELECT * FROM legal_pages WHERE id = ?',
      [result.lastInsertRowid]
    );

    return NextResponse.json(
      { success: true, data: newPage },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create legal page error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
