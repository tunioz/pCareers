import type { Metadata } from 'next';
import { queryAll } from '@/lib/db';
import type { Job } from '@/types';
import { CareersPage as CareersPageClient } from '@/components/public/jobs/CareersPage';
import { TalentCommunity } from '@/components/public/TalentCommunity';

export const metadata: Metadata = {
  title: 'Careers | pCloud',
  description:
    'Join our world-class team of builders. Explore open roles at pCloud and build products used by 22M+ people.',
};

export default function CareersPage() {
  const jobs = queryAll<Job>(
    'SELECT * FROM jobs WHERE is_published = 1 ORDER BY created_at DESC',
  );

  const departments = [...new Set(jobs.map((j) => j.department))];
  const products = [...new Set(jobs.map((j) => j.product))];
  const seniorities = [...new Set(jobs.map((j) => j.seniority))];

  // Extract unique tags from all jobs (comma-separated field)
  const allTags = [
    ...new Set(
      jobs.flatMap((j) =>
        j.tags ? j.tags.split(',').map((t) => t.trim()) : [],
      ),
    ),
  ].filter(Boolean);

  return (
    <>
      <CareersPageClient
        jobs={jobs}
        departments={departments}
        products={products}
        seniorities={seniorities}
        allTags={allTags}
      />
      <TalentCommunity />
    </>
  );
}
