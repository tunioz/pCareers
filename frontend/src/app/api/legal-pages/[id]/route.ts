import { NextResponse } from 'next/server';
import { queryOne, execute } from '@/lib/db';
import { validateLegalPage } from '@/lib/validations';
import { getAuthUser } from '@/lib/auth';
import type { LegalPage } from '@/types';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const pageId = parseInt(id, 10);

    if (isNaN(pageId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid page ID' },
        { status: 400 }
      );
    }

    const page = await queryOne<LegalPage>(
      'SELECT * FROM legal_pages WHERE id = ?',
      [pageId]
    );

    if (!page) {
      return NextResponse.json(
        { success: false, error: 'Legal page not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: page,
    });
  } catch (error) {
    console.error('Get legal page error:', error);
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
    const pageId = parseInt(id, 10);

    if (isNaN(pageId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid page ID' },
        { status: 400 }
      );
    }

    const existing = await queryOne<LegalPage>(
      'SELECT * FROM legal_pages WHERE id = ?',
      [pageId]
    );
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Legal page not found' },
        { status: 404 }
      );
    }

    const body = await request.json();

    // Merge existing data with updates for validation
    const merged = {
      title: body.title ?? existing.title,
      slug: body.slug ?? existing.slug,
      content: body.content ?? existing.content,
      last_updated: body.last_updated !== undefined ? body.last_updated : existing.last_updated,
      is_published: body.is_published !== undefined ? body.is_published : existing.is_published,
    };

    const validation = validateLegalPage(merged);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const data = validation.data!;

    // Check for duplicate slug (excluding current page)
    if (data.slug !== existing.slug) {
      const duplicate = await queryOne<LegalPage>(
        'SELECT id FROM legal_pages WHERE slug = ? AND id != ?',
        [data.slug, pageId]
      );
      if (duplicate) {
        return NextResponse.json(
          { success: false, error: 'A page with this slug already exists' },
          { status: 400 }
        );
      }
    }

    await execute(
      `UPDATE legal_pages SET
        title = ?, slug = ?, content = ?,
        last_updated = IFNULL(?, datetime('now')),
        is_published = ?,
        updated_at = datetime('now')
       WHERE id = ?`,
      [
        data.title,
        data.slug,
        data.content,
        data.last_updated || null,
        data.is_published ?? 1,
        pageId,
      ]
    );

    const updated = await queryOne<LegalPage>(
      'SELECT * FROM legal_pages WHERE id = ?',
      [pageId]
    );

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error('Update legal page error:', error);
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
    const pageId = parseInt(id, 10);

    if (isNaN(pageId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid page ID' },
        { status: 400 }
      );
    }

    const existing = await queryOne<LegalPage>(
      'SELECT * FROM legal_pages WHERE id = ?',
      [pageId]
    );
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Legal page not found' },
        { status: 404 }
      );
    }

    // Prevent deletion of core legal pages
    const coreSlugs = ['privacy-policy', 'cookie-policy', 'terms-of-use', 'legal-notice'];
    if (coreSlugs.includes(existing.slug)) {
      return NextResponse.json(
        { success: false, error: 'Core legal pages cannot be deleted' },
        { status: 403 }
      );
    }

    await execute('DELETE FROM legal_pages WHERE id = ?', [pageId]);

    return NextResponse.json({
      success: true,
      data: { message: 'Legal page deleted successfully' },
    });
  } catch (error) {
    console.error('Delete legal page error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
