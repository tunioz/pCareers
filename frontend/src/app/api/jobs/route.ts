import { NextResponse } from 'next/server';
import { queryAll, queryOne, execute } from '@/lib/db';
import { validateJob } from '@/lib/validations';
import { getAuthUser } from '@/lib/auth';
import { createUniqueSlug } from '@/lib/slugify';
import { logAudit, getClientIp, getUserAgent } from '@/lib/audit';
import type { Job } from '@/types';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const perPage = Math.min(50, Math.max(1, parseInt(searchParams.get('perPage') || '20', 10)));
    const department = searchParams.get('department');
    const product = searchParams.get('product');
    const seniority = searchParams.get('seniority');
    const search = searchParams.get('search');
    const tag = searchParams.get('tag');

    const user = await getAuthUser();
    const isAdmin = !!user;

    const whereClauses: string[] = [];
    const queryParams: unknown[] = [];

    if (!isAdmin) {
      whereClauses.push('is_published = 1');
    }

    if (department) {
      whereClauses.push('department = ?');
      queryParams.push(department);
    }

    if (product) {
      whereClauses.push('product = ?');
      queryParams.push(product);
    }

    if (seniority) {
      whereClauses.push('seniority = ?');
      queryParams.push(seniority);
    }

    if (search) {
      whereClauses.push('(title LIKE ? OR description LIKE ?)');
      const searchTerm = `%${search}%`;
      queryParams.push(searchTerm, searchTerm);
    }

    if (tag) {
      // tags is a comma-separated string in the DB
      whereClauses.push("(',' || tags || ',' LIKE ?)");
      queryParams.push(`%,${tag},%`);
    }

    const whereSQL = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    const countResult = await queryOne<{ total: number }>(
      `SELECT COUNT(*) as total FROM jobs ${whereSQL}`,
      queryParams
    );
    const total = countResult?.total || 0;
    const totalPages = Math.ceil(total / perPage);
    const offset = (page - 1) * perPage;

    const jobs = await queryAll<Job>(
      `SELECT * FROM jobs ${whereSQL} ORDER BY is_high_priority DESC, is_new DESC, created_at DESC LIMIT ? OFFSET ?`,
      [...queryParams, perPage, offset]
    );

    const response = NextResponse.json({
      success: true,
      data: jobs,
      meta: {
        page,
        perPage,
        total,
        totalPages,
      },
    });
    // Cache public job listings for 5 minutes
    if (!isAdmin) {
      response.headers.set('Cache-Control', 'public, max-age=300, s-maxage=600, stale-while-revalidate=60');
    }
    return response;
  } catch (error) {
    console.error('Get jobs error:', error);
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
      body.slug = await createUniqueSlug(body.title, async (slug) => {
        return !!(await queryOne('SELECT 1 FROM jobs WHERE slug = ?', [slug]));
      });
    }

    const validation = validateJob(body);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const data = validation.data!;

    const result = await execute(
      `INSERT INTO jobs (title, slug, department, product, seniority, location, salary_range, employment_type, description, requirements, nice_to_have, benefits, cover_image, is_new, is_high_priority, is_published, tags, challenges, team_name, team_size, team_lead, team_quote, team_photo, tech_stack, what_youll_learn, interview_template_id, process_template_id)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        data.title,
        data.slug,
        data.department,
        data.product,
        data.seniority,
        data.location || null,
        data.salary_range || null,
        data.employment_type || 'Full-time',
        data.description,
        data.requirements || null,
        data.nice_to_have || null,
        data.benefits || null,
        data.cover_image || null,
        data.is_new || 0,
        data.is_high_priority || 0,
        data.is_published || 0,
        data.tags || null,
        data.challenges || null,
        data.team_name || null,
        data.team_size || null,
        data.team_lead || null,
        data.team_quote || null,
        data.team_photo || null,
        data.tech_stack || null,
        data.what_youll_learn || null,
        data.interview_template_id ?? null,
        data.process_template_id ?? null,
      ]
    );

    const newJob = await queryOne<Job>('SELECT * FROM jobs WHERE id = ?', [result.lastInsertRowid]);

    logAudit({
      userId: user.userId,
      userUsername: user.username,
      action: 'create',
      entityType: 'job',
      entityId: newJob?.id,
      details: { title: newJob?.title, slug: newJob?.slug },
      ipAddress: getClientIp(request),
      userAgent: getUserAgent(request),
    });

    return NextResponse.json(
      { success: true, data: newJob },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create job error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
