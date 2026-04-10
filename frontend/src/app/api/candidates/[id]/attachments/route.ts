import { NextResponse } from 'next/server';
import { queryOne, queryAll, execute } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { saveUploadedFile } from '@/lib/upload';
import type { Candidate, CandidateAttachment } from '@/types';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * GET /api/candidates/[id]/attachments — List all attachments (auth required)
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

    const candidate = await queryOne<Candidate>(
      'SELECT id FROM candidates WHERE id = ?',
      [candidateId]
    );

    if (!candidate) {
      return NextResponse.json(
        { success: false, error: 'Candidate not found' },
        { status: 404 }
      );
    }

    const attachments = await queryAll<CandidateAttachment>(
      'SELECT * FROM candidate_attachments WHERE candidate_id = ? ORDER BY created_at DESC',
      [candidateId]
    );

    return NextResponse.json({
      success: true,
      data: attachments,
    });
  } catch (error) {
    console.error('Get candidate attachments error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/candidates/[id]/attachments — Upload an attachment (auth required)
 * Accepts FormData with 'file' field.
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

    const candidate = await queryOne<Candidate>(
      'SELECT id FROM candidates WHERE id = ?',
      [candidateId]
    );

    if (!candidate) {
      return NextResponse.json(
        { success: false, error: 'Candidate not found' },
        { status: 404 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;

    if (!file || file.size === 0) {
      return NextResponse.json(
        { success: false, error: 'File is required' },
        { status: 400 }
      );
    }

    // Determine subdirectory based on file type
    const isImage = file.type.startsWith('image/');
    const subDir = isImage ? 'candidate-attachments' : 'cv';

    const uploadResult = await saveUploadedFile(file, subDir);
    if (!uploadResult.success) {
      return NextResponse.json(
        { success: false, error: uploadResult.error || 'Failed to upload file' },
        { status: 400 }
      );
    }

    const result = await execute(
      `INSERT INTO candidate_attachments (candidate_id, file_path, file_name, file_type, uploaded_by)
       VALUES (?, ?, ?, ?, ?)`,
      [
        candidateId,
        uploadResult.publicUrl,
        file.name,
        file.type,
        user.username,
      ]
    );

    const attachment = await queryOne<CandidateAttachment>(
      'SELECT * FROM candidate_attachments WHERE id = ?',
      [result.lastInsertRowid]
    );

    return NextResponse.json(
      { success: true, data: attachment },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create candidate attachment error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
