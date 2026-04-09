import { NextResponse } from 'next/server';
import { queryOne, queryAll, execute } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { validateCandidateNote } from '@/lib/validations';
import { logAudit, getClientIp, getUserAgent } from '@/lib/audit';
import type { Candidate, CandidateNote } from '@/types';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/candidates/[id]/notes — List all notes for a candidate (auth required)
 */
export async function GET(request: Request, context: RouteContext) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const candidateId = parseInt(id, 10);

    if (isNaN(candidateId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid candidate ID' },
        { status: 400 }
      );
    }

    // Verify candidate exists
    const candidate = queryOne<Candidate>(
      'SELECT id FROM candidates WHERE id = ?',
      [candidateId]
    );

    if (!candidate) {
      return NextResponse.json(
        { success: false, error: 'Candidate not found' },
        { status: 404 }
      );
    }

    const notes = queryAll<CandidateNote>(
      'SELECT * FROM candidate_notes WHERE candidate_id = ? ORDER BY created_at DESC',
      [candidateId]
    );

    return NextResponse.json({
      success: true,
      data: notes,
    });
  } catch (error) {
    console.error('Get candidate notes error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/candidates/[id]/notes — Add a note to a candidate (auth required)
 */
export async function POST(request: Request, context: RouteContext) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { id } = await context.params;
    const candidateId = parseInt(id, 10);

    if (isNaN(candidateId)) {
      return NextResponse.json(
        { success: false, error: 'Invalid candidate ID' },
        { status: 400 }
      );
    }

    // Verify candidate exists
    const candidate = queryOne<Candidate>(
      'SELECT id FROM candidates WHERE id = ?',
      [candidateId]
    );

    if (!candidate) {
      return NextResponse.json(
        { success: false, error: 'Candidate not found' },
        { status: 404 }
      );
    }

    const body = await request.json();
    const validation = validateCandidateNote(body);

    if (!validation.success || !validation.data) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const v = validation.data;

    const result = execute(
      `INSERT INTO candidate_notes (candidate_id, author, content, note_type)
       VALUES (?, ?, ?, ?)`,
      [candidateId, user.username, v.content, v.note_type || 'general']
    );

    const note = queryOne<CandidateNote>(
      'SELECT * FROM candidate_notes WHERE id = ?',
      [result.lastInsertRowid]
    );

    logAudit({
      userId: user.userId,
      userUsername: user.username,
      action: 'create',
      entityType: 'candidate',
      entityId: candidateId,
      details: {
        sub_entity: 'note',
        note_id: note?.id,
        note_type: v.note_type || 'general',
      },
      ipAddress: getClientIp(request),
      userAgent: getUserAgent(request),
    });

    return NextResponse.json(
      { success: true, data: note },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create candidate note error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
