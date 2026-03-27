'use client';

import JobForm from '@/components/admin/JobForm';
import styles from '@/styles/admin.module.scss';

export default function AdminNewJobPage() {
  return (
    <div>
      <div className={styles.pageHeader}>
        <h1>Create New Job</h1>
      </div>
      <div className={styles.card}>
        <JobForm />
      </div>
    </div>
  );
}
