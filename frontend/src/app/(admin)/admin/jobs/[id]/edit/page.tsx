'use client';

import { useEffect, useState, use } from 'react';
import JobForm from '@/components/admin/JobForm';
import styles from '@/styles/admin.module.scss';
import type { Job } from '@/types';

export default function AdminEditJobPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const jobId = parseInt(id, 10);
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/jobs/${jobId}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setJob(data.data);
        } else {
          setError(data.error || 'Job not found');
        }
      })
      .catch(() => setError('Failed to load job'))
      .finally(() => setLoading(false));
  }, [jobId]);

  if (loading) {
    return <div className={styles.loading}><div className={styles.spinner} /></div>;
  }

  if (error || !job) {
    return <div className={styles.emptyState}><h3>{error || 'Job not found'}</h3></div>;
  }

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1>Edit Job</h1>
      </div>
      <div className={styles.card}>
        <JobForm job={job} jobId={jobId} />
      </div>
    </div>
  );
}
