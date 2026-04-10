import { NextResponse } from 'next/server';
import { queryOne, execute } from '@/lib/db';
import { getAuthenticatedUser, hasPermission } from '@/lib/permissions';
import { saveUploadedFile } from '@/lib/upload';
import { logAudit, getClientIp, getUserAgent } from '@/lib/audit';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * POST /api/candidates/[id]/cv
 *
 * Upload or replace a candidate's CV file.
 * Accepts: PDF, DOC, DOCX, TXT, RTF (max 10MB).
 */
export async function POST(request: Request, context: RouteContext) {
  const user = await getAuthenticatedUser();
  if (!user) {
    return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
  }
  if (!hasPermission(user.role, 'candidates:edit')) {
    return NextResponse.json({ success: false, error: 'Insufficient permissions' }, { status: 403 });
  }

  try {
    const { id } = await context.params;
    const candidateId = parseInt(id, 10);
    if (isNaN(candidateId)) {
      return NextResponse.json({ success: false, error: 'Invalid candidate ID' }, { status: 400 });
    }

    const candidate = await queryOne<{ id: number; cv_path: string | null }>(
      'SELECT id, cv_path FROM candidates WHERE id = ?',
      [candidateId]
    );
    if (!candidate) {
      return NextResponse.json({ success: false, error: 'Candidate not found' }, { status: 404 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File | null;
    if (!file || file.size === 0) {
      return NextResponse.json({ success: false, error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'text/plain',
      'application/rtf',
      'text/rtf',
    ];
    const allowedExtensions = ['.pdf', '.doc', '.docx', '.txt', '.rtf'];
    const ext = '.' + file.name.split('.').pop()?.toLowerCase();

    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(ext)) {
      return NextResponse.json(
        { success: false, error: 'Invalid file type. Accepted: PDF, DOC, DOCX, TXT, RTF' },
        { status: 400 }
      );
    }

    // Max 10MB
    if (file.size > 10 * 1024 * 1024) {
      return NextResponse.json(
        { success: false, error: 'File too large. Maximum size is 10MB.' },
        { status: 400 }
      );
    }

    const uploadResult = await saveUploadedFile(file, 'cv');
    if (!uploadResult.success) {
      return NextResponse.json(
        { success: false, error: uploadResult.error || 'Failed to upload file' },
        { status: 500 }
      );
    }

    await execute(
      `UPDATE candidates SET cv_path = ?, cv_original_name = ?, updated_at = datetime('now') WHERE id = ?`,
      [uploadResult.publicUrl, file.name, candidateId]
    );

    logAudit({
      userId: user.userId,
      userUsername: user.username,
      userRole: user.role,
      action: 'update',
      entityType: 'candidate',
      entityId: candidateId,
      details: {
        field: 'cv',
        filename: file.name,
        size_bytes: file.size,
        previous_cv: candidate.cv_path,
      },
      ipAddress: getClientIp(request),
      userAgent: getUserAgent(request),
    });

    return NextResponse.json({
      success: true,
      data: {
        cv_path: uploadResult.publicUrl,
        cv_original_name: file.name,
      },
    });
  } catch (err) {
    return NextResponse.json(
      { success: false, error: err instanceof Error ? err.message : 'Error' },
      { status: 500 }
    );
  }
}
