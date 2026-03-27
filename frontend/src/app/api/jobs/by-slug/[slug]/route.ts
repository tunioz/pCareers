import { NextResponse } from 'next/server';
import { queryOne } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import type { Job } from '@/types';

interface RouteContext {
  params: Promise<{ slug: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const { slug } = await context.params;

    const job = queryOne<Job>('SELECT * FROM jobs WHERE slug = ?', [slug]);

    if (!job) {
      return NextResponse.json(
        { success: false, error: 'Job not found' },
        { status: 404 }
      );
    }

    if (!job.is_published) {
      const user = await getAuthUser();
      if (!user) {
        return NextResponse.json(
          { success: false, error: 'Job not found' },
          { status: 404 }
        );
      }
    }

    return NextResponse.json({
      success: true,
      data: job,
    });
  } catch (error) {
    console.error('Get job by slug error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
