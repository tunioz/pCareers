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

export async function generateStaticParams() {
  const jobs = queryAll<Job>('SELECT slug FROM jobs WHERE is_published = 1');
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const job = queryOne<Job>('SELECT * FROM jobs WHERE slug = ? AND is_published = 1', [slug]);
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

  const job = queryOne<Job>('SELECT * FROM jobs WHERE slug = ? AND is_published = 1', [slug]);
  if (!job) notFound();

  // Get interview template (job's template or default)
  let template: InterviewTemplate | null = null;
  let stages: InterviewStage[] = [];

  if (job.interview_template_id) {
    template = queryOne<InterviewTemplate>(
      'SELECT * FROM interview_templates WHERE id = ? AND is_published = 1',
      [job.interview_template_id]
    ) ?? null;
  }
  if (!template) {
    template = queryOne<InterviewTemplate>(
      'SELECT * FROM interview_templates WHERE is_default = 1 AND is_published = 1'
    ) ?? null;
  }
  if (template) {
    stages = queryAll<InterviewStage>(
      'SELECT * FROM interview_stages WHERE template_id = ? AND is_published = 1 ORDER BY stage_number ASC',
      [template.id]
    );
  }

  // Get shared hiring content
  const candidateValues = queryAll<CandidateValue>(
    'SELECT * FROM candidate_values WHERE is_published = 1 ORDER BY sort_order ASC'
  );
  const pcloudBarCriteria = queryAll<PCloudBarCriterion>(
    'SELECT * FROM pcloud_bar_criteria WHERE is_published = 1 ORDER BY sort_order ASC'
  );
  // Get process template (job's template or default)
  let processTemplate: ProcessTemplate | null = null;
  let processSteps: ProcessStep[] = [];

  if (job.process_template_id) {
    processTemplate = queryOne<ProcessTemplate>(
      'SELECT * FROM process_templates WHERE id = ? AND is_published = 1',
      [job.process_template_id]
    ) ?? null;
  }
  if (!processTemplate) {
    processTemplate = queryOne<ProcessTemplate>(
      'SELECT * FROM process_templates WHERE is_default = 1 AND is_published = 1'
    ) ?? null;
  }
  if (processTemplate) {
    processSteps = queryAll<ProcessStep>(
      'SELECT * FROM process_steps WHERE template_id = ? AND is_published = 1 ORDER BY step_number ASC',
      [processTemplate.id]
    );
  }

  const defaultBenefits = queryAll<DefaultBenefit>(
    'SELECT * FROM default_benefits WHERE is_published = 1 ORDER BY sort_order ASC'
  );

  // Get job-specific benefits via junction table
  const jobBenefits = queryAll<DefaultBenefit>(
    `SELECT db.* FROM default_benefits db
     JOIN job_benefits jb ON jb.benefit_id = db.id
     WHERE jb.job_id = ? AND db.is_published = 1
     ORDER BY db.sort_order ASC`,
    [job.id]
  );

  // Get relevant settings
  const settingsRows = queryAll<{ key: string; value: string }>(
    "SELECT key, value FROM company_settings WHERE key IN ('pcloud_bar_subtitle', 'benefits_intro_text', 'process_intro_text')"
  );
  const settings: Record<string, string> = {};
  for (const row of settingsRows) settings[row.key] = row.value;

  return (
    <div style={{ backgroundColor: 'white', minHeight: '100vh' }}>
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
