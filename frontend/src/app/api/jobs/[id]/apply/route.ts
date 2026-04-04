import { NextResponse } from 'next/server';
import { queryOne, queryAll, execute, transaction } from '@/lib/db';
import { saveUploadedFile } from '@/lib/upload';
import { checkRateLimit, getClientIp } from '@/lib/rate-limit';
import type { Job, CandidateWithJob } from '@/types';

interface RouteContext {
  params: Promise<{ id: string }>;
}

/**
 * POST /api/jobs/[id]/apply — Submit an application for a specific job (public)
 * Creates a candidate record in the ATS candidates table.
 */
export async function POST(request: Request, context: RouteContext) {
  try {
    // Rate limit: 5 attempts per hour per IP
    const ip = getClientIp(request);
    const { allowed, retryAfter } = checkRateLimit(`apply:${ip}`, 5, 60 * 60 * 1000);
    if (!allowed) {
      return NextResponse.json(
        { success: false, error: `Too many applications. Try again in ${retryAfter} seconds.` },
        { status: 429 }
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

    // Verify job exists and is published
    const job = queryOne<Job>('SELECT id, is_published FROM jobs WHERE id = ?', [jobId]);
    if (!job || !job.is_published) {
      return NextResponse.json(
        { success: false, error: 'Job not found' },
        { status: 404 }
      );
    }

    const formData = await request.formData();
    const fullName = formData.get('name') as string | null || formData.get('full_name') as string | null;
    const email = formData.get('email') as string | null;
    const phone = formData.get('phone') as string | null;
    const coverMessage = formData.get('cover_letter') as string | null || formData.get('cover_message') as string | null;
    const cvFile = formData.get('cv') as File | null;
    const linkedinUrl = formData.get('linkedin_url') as string | null;
    const githubUrl = formData.get('github_url') as string | null;
    const portfolioUrl = formData.get('portfolio_url') as string | null;
    const websiteUrl = formData.get('website_url') as string | null;
    const source = formData.get('source') as string | null;
    const referrerName = formData.get('referrer_name') as string | null;
    const referrerEmail = formData.get('referrer_email') as string | null;
    const referrerCompany = formData.get('referrer_company') as string | null;
    const salaryMinStr = formData.get('salary_min') as string | null;
    const salaryMaxStr = formData.get('salary_max') as string | null;
    const salaryCurrency = formData.get('salary_currency') as string | null;
    const earliestStart = formData.get('earliest_start') as string | null;
    const workModel = formData.get('work_model') as string | null;

    // Validate required fields
    const errors: { field: string; message: string }[] = [];

    if (!fullName || fullName.trim().length === 0) {
      errors.push({ field: 'name', message: 'Name is required' });
    }

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      errors.push({ field: 'email', message: 'Valid email is required' });
    }

    if (errors.length > 0) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', errors },
        { status: 400 }
      );
    }

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

    const salaryMin = salaryMinStr ? parseInt(salaryMinStr, 10) : null;
    const salaryMax = salaryMaxStr ? parseInt(salaryMaxStr, 10) : null;
    const isInternal = formData.get('is_internal_referral') === '1' ? 1 : 0;

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
          fullName!.trim(),
          email!.trim().toLowerCase(),
          phone?.trim() || null,
          jobId,
          coverMessage?.trim() || null,
          cvPath,
          cvOriginalName,
          linkedinUrl?.trim() || null,
          githubUrl?.trim() || null,
          portfolioUrl?.trim() || null,
          websiteUrl?.trim() || null,
          source?.trim() || 'Direct',
          referrerName?.trim() || null,
          referrerEmail?.trim() || null,
          referrerCompany?.trim() || null,
          isInternal,
          isNaN(salaryMin as number) ? null : salaryMin,
          isNaN(salaryMax as number) ? null : salaryMax,
          salaryCurrency?.trim() || 'EUR',
          earliestStart?.trim() || null,
          workModel?.trim() || 'On-site Sofia',
          'new',
        ]
      );

      candidateId = result.lastInsertRowid;

      // Create initial history entry
      execute(
        `INSERT INTO candidate_history (candidate_id, action, to_status, performed_by, notes)
         VALUES (?, ?, ?, ?, ?)`,
        [candidateId, 'application_submitted', 'new', 'system', 'Candidate applied via job listing']
      );

      // Returning candidate detection
      const existingByEmail = queryAll<{ id: number; full_name: string; created_at: string; status: string }>(
        `SELECT id, full_name, created_at, status FROM candidates WHERE email = ? AND id != ? ORDER BY created_at DESC`,
        [email!.trim().toLowerCase(), candidateId]
      );

      if (existingByEmail.length > 0) {
        execute(
          `UPDATE candidates SET is_returning = 1, previous_candidate_id = ? WHERE id = ?`,
          [existingByEmail[0].id, candidateId]
        );

        const previousApplications = existingByEmail
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
    console.error('Apply error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
