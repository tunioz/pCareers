import { NextResponse } from 'next/server';
import { queryOne, execute } from '@/lib/db';
import { validateReferenceSubmission } from '@/lib/validations';
import type { CandidateReference, Candidate } from '@/types';

interface RouteContext {
  params: Promise<{ token: string }>;
}

/**
 * GET /api/references/[token] — Get reference info by token (public)
 */
export async function GET(_request: Request, context: RouteContext) {
  try {
    const { token } = await context.params;

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Token is required' },
        { status: 400 }
      );
    }

    const reference = queryOne<CandidateReference>(
      "SELECT * FROM candidate_references WHERE token = ? AND (expires_at IS NULL OR expires_at > datetime('now'))",
      [token]
    );

    if (!reference) {
      return NextResponse.json(
        { success: false, error: 'Reference not found or link has expired' },
        { status: 404 }
      );
    }

    if (reference.status === 'completed') {
      return NextResponse.json(
        { success: false, error: 'This reference has already been submitted' },
        { status: 400 }
      );
    }

    // Get candidate info (only first name for privacy)
    const candidate = queryOne<Candidate>(
      'SELECT full_name, job_id FROM candidates WHERE id = ?',
      [reference.candidate_id]
    );

    let candidateFirstName = '';
    let positionTitle = '';

    if (candidate) {
      candidateFirstName = candidate.full_name.split(' ')[0];
      if (candidate.job_id) {
        const job = queryOne<{ title: string }>(
          'SELECT title FROM jobs WHERE id = ?',
          [candidate.job_id]
        );
        positionTitle = job?.title || '';
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        id: reference.id,
        candidate_id: reference.candidate_id,
        referee_name: reference.referee_name,
        referee_email: reference.referee_email,
        candidate_first_name: candidateFirstName,
        position_title: positionTitle,
        status: reference.status,
      },
    });
  } catch (error) {
    console.error('Get reference by token error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * PUT /api/references/[token] — Submit reference by token (public)
 */
export async function PUT(request: Request, context: RouteContext) {
  try {
    const { token } = await context.params;

    if (!token) {
      return NextResponse.json(
        { success: false, error: 'Token is required' },
        { status: 400 }
      );
    }

    const reference = queryOne<CandidateReference>(
      "SELECT * FROM candidate_references WHERE token = ? AND (expires_at IS NULL OR expires_at > datetime('now'))",
      [token]
    );

    if (!reference) {
      return NextResponse.json(
        { success: false, error: 'Reference not found or link has expired' },
        { status: 404 }
      );
    }

    if (reference.status === 'completed') {
      return NextResponse.json(
        { success: false, error: 'This reference has already been submitted' },
        { status: 400 }
      );
    }

    const body = await request.json();
    const validation = validateReferenceSubmission(body);

    if (!validation.success || !validation.data) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const v = validation.data;

    execute(
      `UPDATE candidate_references SET
        referee_relationship = ?,
        duration_worked = ?,
        technical_competence = ?,
        reliability = ?,
        communication = ?,
        teamwork = ?,
        initiative = ?,
        strengths = ?,
        improvements = ?,
        would_rehire = ?,
        additional_comments = ?,
        status = 'completed',
        completed_at = datetime('now')
      WHERE token = ?`,
      [
        v.referee_relationship,
        v.duration_worked,
        v.technical_competence,
        v.reliability,
        v.communication,
        v.teamwork,
        v.initiative,
        v.strengths,
        v.improvements,
        v.would_rehire,
        v.additional_comments || null,
        token,
      ]
    );

    // Add history entry
    execute(
      `INSERT INTO candidate_history (candidate_id, action, performed_by, notes)
       VALUES (?, ?, ?, ?)`,
      [
        reference.candidate_id,
        'reference_completed',
        reference.referee_name,
        `Reference submitted by ${reference.referee_name}`,
      ]
    );

    return NextResponse.json({
      success: true,
      data: { message: 'Reference submitted successfully' },
    });
  } catch (error) {
    console.error('Submit reference error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
