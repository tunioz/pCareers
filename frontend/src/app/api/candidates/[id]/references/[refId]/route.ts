import { NextResponse } from 'next/server';
import { queryOne, execute } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { validateCandidateReference } from '@/lib/validations';
import type { CandidateReference } from '@/types';

interface RouteContext {
  params: Promise<{ id: string; refId: string }>;
}

/**
 * PUT /api/candidates/[id]/references/[refId]
 * - Public: referee can submit their feedback (fills in ratings, strengths, etc.)
 * - Auth: admin can update reference status or other fields
 */
export async function PUT(request: Request, context: RouteContext) {
  try {
    const { id, refId } = await context.params;
    const candidateId = parseInt(id, 10);
    const referenceId = parseInt(refId, 10);

    if (isNaN(candidateId) || isNaN(referenceId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid ID' },
        { status: 400 }
      );
    }

    const existing = await queryOne<CandidateReference>(
      'SELECT * FROM candidate_references WHERE id = ? AND candidate_id = ?',
      [referenceId, candidateId]
    );

    if (!existing) {
      return NextResponse.json(
        { success: false, error: 'Reference not found' },
        { status: 404 }
      );
    }

    const body = await request.json();

    // Check if this is a referee submission (public) or admin update (auth)
    const user = await getAuthUser();

    if (!user) {
      // Public referee submission -- must provide ratings
      const validation = validateCandidateReference({
        ...body,
        referee_name: body.referee_name || existing.referee_name,
        referee_email: body.referee_email || existing.referee_email,
      });

      if (!validation.success || !validation.data) {
        return NextResponse.json(
          { success: false, error: 'Validation failed', errors: validation.errors },
          { status: 400 }
        );
      }

      const v = validation.data;

      await execute(
        `UPDATE candidate_references SET
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
        WHERE id = ?`,
        [
          v.technical_competence ?? null,
          v.reliability ?? null,
          v.communication ?? null,
          v.teamwork ?? null,
          v.initiative ?? null,
          v.strengths ?? null,
          v.improvements ?? null,
          v.would_rehire ?? null,
          v.additional_comments ?? null,
          referenceId,
        ]
      );
    } else {
      // Admin update -- can change any field including status
      const setClauses: string[] = [];
      const params: unknown[] = [];

      const allowedFields = [
        'referee_name', 'referee_email', 'referee_relationship', 'referee_company',
        'technical_competence', 'reliability', 'communication', 'teamwork', 'initiative',
        'strengths', 'improvements', 'would_rehire', 'additional_comments', 'status',
      ];

      for (const field of allowedFields) {
        if (body[field] !== undefined) {
          setClauses.push(`${field} = ?`);
          params.push(body[field] === '' ? null : body[field]);
        }
      }

      if (body.status === 'completed' && !existing.completed_at) {
        setClauses.push("completed_at = datetime('now')");
      }

      if (setClauses.length === 0) {
        return NextResponse.json(
          { success: false, error: 'No fields to update' },
          { status: 400 }
        );
      }

      params.push(referenceId);

      await execute(
        `UPDATE candidate_references SET ${setClauses.join(', ')} WHERE id = ?`,
        params
      );
    }

    const updated = await queryOne<CandidateReference>(
      'SELECT * FROM candidate_references WHERE id = ?',
      [referenceId]
    );

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error('Update candidate reference error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
