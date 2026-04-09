import { NextResponse } from 'next/server';
import { queryAll, queryOne, execute, transaction } from '@/lib/db';
import { getAuthUser } from '@/lib/auth';
import { validateCandidate } from '@/lib/validations';
import { saveUploadedFile } from '@/lib/upload';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import { getAuthenticatedUser, stripSensitiveFromArray } from '@/lib/permissions';
import type { CandidateWithJob } from '@/types';

/**
 * GET /api/candidates — List candidates (auth required)
 * Query params: status, job_id, source, search, page, perPage
 */
export async function GET(request: Request) {
  try {
    const user = await getAuthenticatedUser();
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'Not authenticated' },
        { status: 401 }
      );
    }

    const { searchParams } = new URL(request.url);
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10));
    const perPage = Math.min(50, Math.max(1, parseInt(searchParams.get('perPage') || '20', 10)));
    const status = searchParams.get('status');
    const jobId = searchParams.get('jobId') || searchParams.get('job_id');
    const source = searchParams.get('source');
    const search = searchParams.get('search');
    const archived = searchParams.get('archived');

    const whereClauses: string[] = [];
    const queryParams: unknown[] = [];

    if (status) {
      whereClauses.push('c.status = ?');
      queryParams.push(status);
    }

    if (jobId) {
      whereClauses.push('c.job_id = ?');
      queryParams.push(parseInt(jobId, 10));
    }

    if (source) {
      whereClauses.push('c.source = ?');
      queryParams.push(source);
    }

    if (search) {
      whereClauses.push('(c.full_name LIKE ? OR c.email LIKE ?)');
      const searchTerm = `%${search}%`;
      queryParams.push(searchTerm, searchTerm);
    }

    // Default: show non-archived unless explicitly requested
    if (archived === '1') {
      whereClauses.push('c.is_archived = 1');
    } else if (archived !== 'all') {
      whereClauses.push('c.is_archived = 0');
    }

    const whereSQL = whereClauses.length > 0 ? `WHERE ${whereClauses.join(' AND ')}` : '';

    const countResult = queryOne<{ total: number }>(
      `SELECT COUNT(*) as total FROM candidates c ${whereSQL}`,
      queryParams
    );
    const total = countResult?.total || 0;
    const totalPages = Math.ceil(total / perPage);
    const offset = (page - 1) * perPage;

    const candidates = queryAll<CandidateWithJob>(
      `SELECT c.*, j.title as job_title, j.slug as job_slug, j.department as job_department
       FROM candidates c
       LEFT JOIN jobs j ON c.job_id = j.id
       ${whereSQL}
       ORDER BY c.created_at DESC
       LIMIT ? OFFSET ?`,
      [...queryParams, perPage, offset]
    );

    const filtered = stripSensitiveFromArray(
      candidates as unknown as Record<string, unknown>[],
      user.role
    ) as unknown as CandidateWithJob[];

    return NextResponse.json({
      success: true,
      data: filtered,
      meta: { page, perPage, total, totalPages, viewer_role: user.role },
    });
  } catch (error) {
    console.error('Get candidates error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

/**
 * POST /api/candidates — Submit a new application (public)
 * Accepts FormData with file upload for CV.
 */
export async function POST(request: Request) {
  try {
    // Rate limit: 10 attempts per hour per IP
    const ip = getClientIp(request);
    const { allowed, retryAfter } = checkRateLimit(`candidate:${ip}`, 10, 60 * 60 * 1000);
    if (!allowed) {
      return NextResponse.json(
        { success: false, error: `Too many submissions. Try again in ${retryAfter} seconds.` },
        { status: 429 }
      );
    }

    const contentType = request.headers.get('content-type') || '';
    let data: Record<string, unknown>;
    let cvFile: File | null = null;

    if (contentType.includes('multipart/form-data')) {
      const formData = await request.formData();
      data = {};
      for (const [key, value] of formData.entries()) {
        if (key === 'cv' && value instanceof File) {
          cvFile = value;
        } else {
          // Attempt to parse numbers for numeric fields
          if (['job_id', 'salary_min', 'salary_max', 'is_internal_referral'].includes(key)) {
            const num = parseInt(value as string, 10);
            data[key] = isNaN(num) ? value : num;
          } else {
            data[key] = value;
          }
        }
      }
    } else {
      data = await request.json();
    }

    const validation = validateCandidate(data);
    if (!validation.success || !validation.data) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors: validation.errors },
        { status: 400 }
      );
    }

    const v = validation.data;

    // Handle CV upload
    let cvPath: string | null = null;
    let cvOriginalName: string | null = null;
    if (cvFile && cvFile.size > 0) {
      const uploadResult = await saveUploadedFile(cvFile, 'cv');
      if (!uploadResult.success) {
        return NextResponse.json(
          { success: false, error: uploadResult.error || 'Failed to upload CV' },
          { status: 400 }
        );
      }
      cvPath = uploadResult.publicUrl || null;
      cvOriginalName = cvFile.name;
    }

    let candidateId: number | bigint;

    transaction(() => {
      const result = execute(
        `INSERT INTO candidates (
          full_name, email, phone, job_id, cover_message, cv_path, cv_original_name,
          linkedin_url, github_url, portfolio_url, website_url,
          source, referrer_name, referrer_email, referrer_company, is_internal_referral,
          salary_min, salary_max, salary_currency, earliest_start, work_model,
          status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          v.full_name,
          v.email,
          v.phone || null,
          v.job_id || null,
          v.cover_message || null,
          cvPath,
          cvOriginalName,
          v.linkedin_url || null,
          v.github_url || null,
          v.portfolio_url || null,
          v.website_url || null,
          v.source || 'Direct',
          v.referrer_name || null,
          v.referrer_email || null,
          v.referrer_company || null,
          v.is_internal_referral || 0,
          v.salary_min || null,
          v.salary_max || null,
          v.salary_currency || 'EUR',
          v.earliest_start || null,
          v.work_model || 'On-site Sofia',
          'new',
        ]
      );

      candidateId = result.lastInsertRowid;

      // Create initial history entry
      execute(
        `INSERT INTO candidate_history (candidate_id, action, to_status, performed_by, notes)
         VALUES (?, ?, ?, ?, ?)`,
        [candidateId, 'application_submitted', 'new', 'system', 'Candidate submitted application']
      );

      // Returning candidate detection: check for existing candidates with same email or phone
      const existingByEmail = queryAll<{ id: number; full_name: string; created_at: string; status: string }>(
        `SELECT id, full_name, created_at, status FROM candidates WHERE email = ? AND id != ? ORDER BY created_at DESC`,
        [v.email, candidateId]
      );

      const existingByPhone = v.phone
        ? queryAll<{ id: number; full_name: string; created_at: string; status: string }>(
            `SELECT id, full_name, created_at, status FROM candidates WHERE phone = ? AND phone IS NOT NULL AND id != ? ORDER BY created_at DESC`,
            [v.phone, candidateId]
          )
        : [];

      // Merge and deduplicate
      const previousIds = new Set<number>();
      const allPrevious = [...existingByEmail, ...existingByPhone];
      for (const prev of allPrevious) {
        previousIds.add(prev.id);
      }

      if (previousIds.size > 0) {
        const firstPreviousId = allPrevious[0].id;
        execute(
          `UPDATE candidates SET is_returning = 1, previous_candidate_id = ? WHERE id = ?`,
          [firstPreviousId, candidateId]
        );

        // Add system note about returning candidate
        const previousApplications = allPrevious
          .map(p => `ID #${p.id} (${p.status}, ${p.created_at})`)
          .join('; ');
        execute(
          `INSERT INTO candidate_notes (candidate_id, author, content, note_type)
           VALUES (?, ?, ?, ?)`,
          [
            candidateId,
            'system',
            `Returning candidate detected. Previous applications: ${previousApplications}`,
            'system',
          ]
        );

        // Cooldown policy check (Feature 9): if rejected less than 6 months ago
        const rejectedPrevious = allPrevious.filter(p => p.status === 'rejected');
        if (rejectedPrevious.length > 0) {
          const lastRejection = rejectedPrevious[0];
          const rejectedDate = new Date(lastRejection.created_at);
          const sixMonthsLater = new Date(rejectedDate);
          sixMonthsLater.setMonth(sixMonthsLater.getMonth() + 6);
          const now = new Date();

          if (now < sixMonthsLater) {
            const cooldownUntil = sixMonthsLater.toISOString().substring(0, 10);
            const rejectedDateStr = rejectedDate.toISOString().substring(0, 10);

            // Look up the previous job title
            const prevCandidate = queryOne<{ job_id: number | null }>(
              'SELECT job_id FROM candidates WHERE id = ?',
              [lastRejection.id]
            );
            let prevJobTitle = 'Unknown Position';
            if (prevCandidate?.job_id) {
              const prevJob = queryOne<{ title: string }>(
                'SELECT title FROM jobs WHERE id = ?',
                [prevCandidate.job_id]
              );
              if (prevJob) prevJobTitle = prevJob.title;
            }

            execute(
              `INSERT INTO candidate_notes (candidate_id, author, content, note_type)
               VALUES (?, ?, ?, ?)`,
              [
                candidateId,
                'system',
                `COOLDOWN WARNING: Candidate was rejected on ${rejectedDateStr} for "${prevJobTitle}". Re-apply eligible after ${cooldownUntil}. Flagged for hiring manager review.`,
                'system',
              ]
            );
          }
        }
      }
    });

    const candidate = queryOne<CandidateWithJob>(
      `SELECT c.*, j.title as job_title, j.slug as job_slug, j.department as job_department
       FROM candidates c
       LEFT JOIN jobs j ON c.job_id = j.id
       WHERE c.id = ?`,
      [candidateId!]
    );

    return NextResponse.json(
      { success: true, data: candidate },
      { status: 201 }
    );
  } catch (error) {
    console.error('Create candidate error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
