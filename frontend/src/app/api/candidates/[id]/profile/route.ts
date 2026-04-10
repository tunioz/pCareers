import { NextResponse } from 'next/server';
import { queryOne, execute } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';

/**
 * GET /api/candidates/[id]/profile — Get parsed CV profile data
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
    }

    const { id } = await params;
    const candidateId = parseInt(id, 10);
    if (isNaN(candidateId)) {
      return NextResponse.json({ success: false, error: 'Invalid candidate ID' }, { status: 400 });
    }

    const candidate = await queryOne<{
      parsed_skills: string | null;
      parsed_experience: string | null;
      parsed_education: string | null;
      parsed_certifications: string | null;
      parsed_languages: string | null;
      parsed_projects: string | null;
      professional_summary: string | null;
    }>(
      `SELECT parsed_skills, parsed_experience, parsed_education,
              parsed_certifications, parsed_languages, parsed_projects,
              professional_summary
       FROM candidates WHERE id = ?`,
      [candidateId]
    );

    if (!candidate) {
      return NextResponse.json({ success: false, error: 'Candidate not found' }, { status: 404 });
    }

    // Parse JSON fields safely
    const parseJson = (val: string | null) => {
      if (!val) return null;
      try { return JSON.parse(val); } catch { return null; }
    };

    return NextResponse.json({
      success: true,
      data: {
        parsed_skills: parseJson(candidate.parsed_skills),
        parsed_experience: parseJson(candidate.parsed_experience),
        parsed_education: parseJson(candidate.parsed_education),
        parsed_certifications: parseJson(candidate.parsed_certifications),
        parsed_languages: parseJson(candidate.parsed_languages),
        parsed_projects: parseJson(candidate.parsed_projects),
        professional_summary: candidate.professional_summary,
      },
    });
  } catch (error) {
    console.error('Get candidate profile error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

/**
 * PUT /api/candidates/[id]/profile — Update parsed CV profile data (admin)
 */
export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const user = await getAuthUser();
    if (!user) {
      return NextResponse.json({ success: false, error: 'Not authenticated' }, { status: 401 });
    }

    const { id } = await params;
    const candidateId = parseInt(id, 10);
    if (isNaN(candidateId)) {
      return NextResponse.json({ success: false, error: 'Invalid candidate ID' }, { status: 400 });
    }

    const existing = await queryOne<{ id: number }>('SELECT id FROM candidates WHERE id = ?', [candidateId]);
    if (!existing) {
      return NextResponse.json({ success: false, error: 'Candidate not found' }, { status: 404 });
    }

    const body = await request.json();

    const fields: string[] = [];
    const values: unknown[] = [];

    const jsonFields = [
      'parsed_skills', 'parsed_experience', 'parsed_education',
      'parsed_certifications', 'parsed_languages', 'parsed_projects',
    ];

    for (const field of jsonFields) {
      if (body[field] !== undefined) {
        fields.push(`${field} = ?`);
        values.push(body[field] !== null ? JSON.stringify(body[field]) : null);
      }
    }

    if (body.professional_summary !== undefined) {
      fields.push('professional_summary = ?');
      values.push(body.professional_summary || null);
    }

    if (fields.length === 0) {
      return NextResponse.json({ success: false, error: 'No fields to update' }, { status: 400 });
    }

    fields.push("updated_at = datetime('now')");
    values.push(candidateId);

    await execute(
      `UPDATE candidates SET ${fields.join(', ')} WHERE id = ?`,
      values
    );

    return NextResponse.json({ success: true, data: { id: candidateId } });
  } catch (error) {
    console.error('Update candidate profile error:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
