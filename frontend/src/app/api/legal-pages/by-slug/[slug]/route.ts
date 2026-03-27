import { NextResponse } from 'next/server';
import { queryOne } from '@/lib/db';
import type { LegalPage } from '@/types';

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const { slug } = await context.params;

    const page = queryOne<LegalPage>(
      'SELECT * FROM legal_pages WHERE slug = ? AND is_published = 1',
      [slug]
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
    console.error('Get legal page by slug error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
