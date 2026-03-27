import { NextResponse } from 'next/server';
import { queryOne, execute } from '@/lib/db';
import { validateJob } from '@/lib/validations';
import { getAuthUser } from '@/lib/auth';
import { createUniqueSlug } from '@/lib/slugify';
import type { Job } from '@/types';

interface RouteContext {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, context: RouteContext) {
  try {
    const { id } = await context.params;
    const jobId = parseInt(id, 10);

    if (isNaN(jobId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid job ID' },
        { status: 400 }
      );
    }

    const user = await getAuthUser();
    const job = queryOne<Job>('SELECT * FROM jobs WHERE id = ?', [jobId]);

    if (!job) {
      return NextResponse.json(
        { success: false, error: 'Job not found' },
        { status: 404 }
      );
    }

    if (!job.is_published && !user) {
      return NextResponse.json(
        { success: false, error: 'Job not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: job,
    });
  } catch (error) {
    console.error('Get job error:', error);
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
    const jobId = parseInt(id, 10);

    if (isNaN(jobId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid job ID' },
        { status: 400 }
      );
    }

    const existing = queryOne<Job>('SELECT * FROM jobs WHERE id = ?', [jobId]);
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Job not found' },
        { status: 404 }
      );
    }

    const body = await request.json();

    // Re-generate slug if title changed and slug not explicitly set
    if (body.title && body.title !== existing.title && !body.slug) {
      body.slug = createUniqueSlug(body.title, (slug) => {
        return !!queryOne<Job>('SELECT id FROM jobs WHERE slug = ? AND id != ?', [slug, jobId]);
      });
    }

    const merged = {
      title: body.title ?? existing.title,
      slug: body.slug ?? existing.slug,
      department: body.department ?? existing.department,
      product: body.product ?? existing.product,
      seniority: body.seniority ?? existing.seniority,
      location: body.location !== undefined ? body.location : existing.location,
      salary_range: body.salary_range !== undefined ? body.salary_range : existing.salary_range,
      employment_type: body.employment_type ?? existing.employment_type,
      description: body.description ?? existing.description,
      requirements: body.requirements !== undefined ? body.requirements : existing.requirements,
      nice_to_have: body.nice_to_have !== undefined ? body.nice_to_have : existing.nice_to_have,
      benefits: body.benefits !== undefined ? body.benefits : existing.benefits,
      cover_image: body.cover_image !== undefined ? body.cover_image : existing.cover_image,
      is_new: body.is_new !== undefined ? body.is_new : existing.is_new,
      is_high_priority: body.is_high_priority !== undefined ? body.is_high_priority : existing.is_high_priority,
      is_published: body.is_published !== undefined ? body.is_published : existing.is_published,
      tags: body.tags !== undefined ? body.tags : existing.tags,
      challenges: body.challenges !== undefined ? body.challenges : existing.challenges,
      team_name: body.team_name !== undefined ? body.team_name : existing.team_name,
      team_size: body.team_size !== undefined ? body.team_size : existing.team_size,
      team_lead: body.team_lead !== undefined ? body.team_lead : existing.team_lead,
      team_quote: body.team_quote !== undefined ? body.team_quote : existing.team_quote,
      team_photo: body.team_photo !== undefined ? body.team_photo : existing.team_photo,
      tech_stack: body.tech_stack !== undefined ? body.tech_stack : existing.tech_stack,
      what_youll_learn: body.what_youll_learn !== undefined ? body.what_youll_learn : existing.what_youll_learn,
      interview_template_id: body.interview_template_id !== undefined ? body.interview_template_id : existing.interview_template_id,
      process_template_id: body.process_template_id !== undefined ? body.process_template_id : existing.process_template_id,
    };

    const validation = validateJob(merged);
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const data = validation.data!;

    execute(
      `UPDATE jobs SET
        title = ?, slug = ?, department = ?, product = ?,
        seniority = ?, location = ?, salary_range = ?, employment_type = ?,
        description = ?, requirements = ?,
        nice_to_have = ?, benefits = ?,
        cover_image = ?, is_new = ?, is_high_priority = ?, is_published = ?,
        tags = ?, challenges = ?, team_name = ?, team_size = ?,
        team_lead = ?, team_quote = ?, team_photo = ?,
        tech_stack = ?, what_youll_learn = ?, interview_template_id = ?,
        process_template_id = ?,
        updated_at = datetime('now')
       WHERE id = ?`,
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
        jobId,
      ]
    );

    const updated = queryOne<Job>('SELECT * FROM jobs WHERE id = ?', [jobId]);

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error('Update job error:', error);
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
    const jobId = parseInt(id, 10);

    if (isNaN(jobId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid job ID' },
        { status: 400 }
      );
    }

    const existing = queryOne<Job>('SELECT id FROM jobs WHERE id = ?', [jobId]);
    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Job not found' },
        { status: 404 }
      );
    }

    execute('DELETE FROM jobs WHERE id = ?', [jobId]);

    return NextResponse.json({
      success: true,
      data: { message: 'Job deleted successfully' },
    });
  } catch (error) {
    console.error('Delete job error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
