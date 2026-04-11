import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { queryOne, queryAll } from '@/lib/db';
import type {
  Job,
  InterviewTemplate,
  InterviewStage,
  CandidateValue,
  PCloudBarCriterion,
  ProcessTemplate,
  ProcessStep,
  DefaultBenefit,
} from '@/types';
import { RolePreview } from '@/components/public/jobs/RolePreview';

export const dynamic = 'force-dynamic';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = await queryOne<Job>('SELECT * FROM jobs WHERE slug = ? AND is_published = 1', [slug]);
  if (!job) return { title: 'Not Found' };

  return {
    title: `${job.title} | pCloud Careers`,
    description: job.description
      ? job.description.slice(0, 160)
      : `Join pCloud as ${job.title}. ${job.department} department, ${job.employment_type}.`,
    openGraph: {
      title: `${job.title} | pCloud Careers`,
      description: job.description
        ? job.description.slice(0, 160)
        : `Join pCloud as ${job.title}.`,
      type: 'website',
    },
  };
}

export default async function JobDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const job = await queryOne<Job>('SELECT * FROM jobs WHERE slug = ? AND is_published = 1', [slug]);
  if (!job) notFound();

  // Get interview template (job's template or default)
  let template: InterviewTemplate | null = null;
  let stages: InterviewStage[] = [];

  if (job.interview_template_id) {
    template = await queryOne<InterviewTemplate>(
      'SELECT * FROM interview_templates WHERE id = ? AND is_published = 1',
      [job.interview_template_id]
    ) ?? null;
  }
  if (!template) {
    template = await queryOne<InterviewTemplate>(
      'SELECT * FROM interview_templates WHERE is_default = 1 AND is_published = 1'
    ) ?? null;
  }
  if (template) {
    stages = await queryAll<InterviewStage>(
      'SELECT * FROM interview_stages WHERE template_id = ? AND is_published = 1 ORDER BY stage_number ASC',
      [template.id]
    );
  }

  // Get shared hiring content
  const candidateValues = await queryAll<CandidateValue>(
    'SELECT * FROM candidate_values WHERE is_published = 1 ORDER BY sort_order ASC'
  );
  const pcloudBarCriteria = await queryAll<PCloudBarCriterion>(
    'SELECT * FROM pcloud_bar_criteria WHERE is_published = 1 ORDER BY sort_order ASC'
  );
  // Get process template (job's template or default)
  let processTemplate: ProcessTemplate | null = null;
  let processSteps: ProcessStep[] = [];

  if (job.process_template_id) {
    processTemplate = await queryOne<ProcessTemplate>(
      'SELECT * FROM process_templates WHERE id = ? AND is_published = 1',
      [job.process_template_id]
    ) ?? null;
  }
  if (!processTemplate) {
    processTemplate = await queryOne<ProcessTemplate>(
      'SELECT * FROM process_templates WHERE is_default = 1 AND is_published = 1'
    ) ?? null;
  }
  if (processTemplate) {
    processSteps = await queryAll<ProcessStep>(
      'SELECT * FROM process_steps WHERE template_id = ? AND is_published = 1 ORDER BY step_number ASC',
      [processTemplate.id]
    );
  }

  const defaultBenefits = await queryAll<DefaultBenefit>(
    'SELECT * FROM default_benefits WHERE is_published = 1 ORDER BY sort_order ASC'
  );

  // Get job-specific benefits via junction table
  const jobBenefits = await queryAll<DefaultBenefit>(
    `SELECT db.* FROM default_benefits db
     JOIN job_benefits jb ON jb.benefit_id = db.id
     WHERE jb.job_id = ? AND db.is_published = 1
     ORDER BY db.sort_order ASC`,
    [job.id]
  );

  // Get relevant settings
  const settingsRows = await queryAll<{ key: string; value: string }>(
    "SELECT key, value FROM company_settings WHERE key IN ('pcloud_bar_subtitle', 'benefits_intro_text', 'process_intro_text')"
  );
  const settings: Record<string, string> = {};
  for (const row of settingsRows) settings[row.key] = row.value;

  // Schema.org JobPosting structured data for job aggregators (Google, Indeed, LinkedIn)
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://careers.pcloud.com';
  const jobPostingSchema = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: job.description || '',
    datePosted: job.created_at ? new Date(job.created_at).toISOString().slice(0, 10) : undefined,
    validThrough: undefined as string | undefined,
    employmentType: job.employment_type === 'Full-time' ? 'FULL_TIME'
      : job.employment_type === 'Part-time' ? 'PART_TIME'
      : job.employment_type === 'Contract' ? 'CONTRACTOR'
      : job.employment_type === 'Remote' ? 'FULL_TIME'
      : 'FULL_TIME',
    hiringOrganization: {
      '@type': 'Organization',
      name: 'pCloud',
      sameAs: 'https://www.pcloud.com',
      logo: `${siteUrl}/pcloud-logo.png`,
    },
    jobLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: job.location || 'Sofia',
        addressCountry: 'BG',
      },
    },
    ...(job.employment_type === 'Remote' && {
      jobLocationType: 'TELECOMMUTE',
    }),
    ...(job.salary_range && {
      baseSalary: {
        '@type': 'MonetaryAmount',
        currency: 'EUR',
        value: {
          '@type': 'QuantitativeValue',
          value: job.salary_range,
          unitText: 'YEAR',
        },
      },
    }),
    industry: 'Cloud Storage & Technology',
    occupationalCategory: job.department,
    url: `${siteUrl}/careers/${job.slug}`,
  };

  // JSON-LD is safe here: jobPostingSchema is built from server-side DB data,
  // not user input. JSON.stringify escapes any special characters.
  const jsonLd = JSON.stringify(jobPostingSchema);

  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <RolePreview
        job={job}
        interviewTemplate={template}
        interviewStages={stages}
        candidateValues={candidateValues}
        pcloudBarCriteria={pcloudBarCriteria}
        processTemplate={processTemplate}
        processSteps={processSteps}
        defaultBenefits={defaultBenefits}
        jobBenefits={jobBenefits}
        settings={settings}
      />
    </div>
  );
}
