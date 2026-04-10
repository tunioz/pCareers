import { NextResponse } from 'next/server';
import { queryAll, execute, transaction } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import type { DefaultBenefit } from '@/types';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/jobs/[id]/benefits
 * Returns the benefits linked to a specific job via the job_benefits junction table.
 */
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

    const benefits = await queryAll<DefaultBenefit>(
      `SELECT db.* FROM default_benefits db
       JOIN job_benefits jb ON jb.benefit_id = db.id
       WHERE jb.job_id = ? AND db.is_published = 1
       ORDER BY db.sort_order ASC`,
      [jobId]
    );

    return NextResponse.json({
      success: true,
      data: benefits,
    });
  } catch (error) {
    console.error('Get job benefits error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/jobs/[id]/benefits
 * Replaces all job_benefits for this job.
 * Accepts { benefit_ids: number[] }
 * Auth required.
 */
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

    const body = await request.json();
    const benefitIds: unknown = body.benefit_ids;

    // Validate benefit_ids is an array of numbers
    if (!Array.isArray(benefitIds)) {
      return NextResponse.json(
        { success: false, error: 'benefit_ids must be an array' },
        { status: 400 }
      );
    }

    for (const bid of benefitIds) {
      if (typeof bid !== 'number' || !Number.isInteger(bid) || bid < 1) {
        return NextResponse.json(
          { success: false, error: 'Each benefit_id must be a positive integer' },
          { status: 400 }
        );
      }
    }

    // Use a transaction: delete all existing, then insert new ones
    await transaction(async () => {
      await execute('DELETE FROM job_benefits WHERE job_id = ?', [jobId]);

      for (const benefitId of benefitIds as number[]) {
        await execute(
          'INSERT INTO job_benefits (job_id, benefit_id) VALUES (?, ?) ON CONFLICT DO NOTHING',
          [jobId, benefitId]
        );
      }
    });

    // Return the updated list
    const benefits = await queryAll<DefaultBenefit>(
      `SELECT db.* FROM default_benefits db
       JOIN job_benefits jb ON jb.benefit_id = db.id
       WHERE jb.job_id = ? AND db.is_published = 1
       ORDER BY db.sort_order ASC`,
      [jobId]
    );

    return NextResponse.json({
      success: true,
      data: benefits,
    });
  } catch (error) {
    console.error('Update job benefits error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
