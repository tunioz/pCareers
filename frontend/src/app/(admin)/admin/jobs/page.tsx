'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Plus, Pencil, Trash2, Briefcase } from 'lucide-react';
import { getPublishBadge } from '@/components/admin/StatusBadge';
import StatusBadge from '@/components/admin/StatusBadge';
import Pagination from '@/components/admin/Pagination';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { useToast } from '@/components/admin/Toast';
import styles from '@/styles/admin.module.scss';
import type { Job, PaginationMeta } from '@/types';

export default function AdminJobsPage() {
  const { showToast } = useToast();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({ page: 1, perPage: 20, total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [deptFilter, setDeptFilter] = useState('');
  const [productFilter, setProductFilter] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchJobs = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), perPage: '20' });
      if (deptFilter) params.set('department', deptFilter);
      if (productFilter) params.set('product', productFilter);
      if (search) params.set('search', search);

      const res = await fetch(`/api/jobs?${params}`);
      const data = await res.json();
      if (data.success) {
        setJobs(data.data || []);
        setMeta(data.meta || { page: 1, perPage: 20, total: 0, totalPages: 0 });
      }
    } catch {
      showToast('error', 'Failed to load jobs');
    } finally {
      setLoading(false);
    }
  }, [page, deptFilter, productFilter, search, showToast]);

  useEffect(() => {
    fetchJobs();
  }, [fetchJobs]);

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/jobs/${deleteId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast('success', 'Job deleted');
        fetchJobs();
      } else {
        showToast('error', data.error || 'Failed to delete');
      }
    } catch {
      showToast('error', 'Failed to delete job');
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  const handleTogglePublish = async (job: Job) => {
    try {
      const res = await fetch(`/api/jobs/${job.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ is_published: job.is_published ? 0 : 1 }),
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', job.is_published ? 'Job unpublished' : 'Job published');
        fetchJobs();
      }
    } catch {
      showToast('error', 'Failed to update job');
    }
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1>Jobs</h1>
        <div className={styles.pageActions}>
          <Link href="/admin/jobs/new" className={styles.btnPrimary}>
            <Plus size={16} />
            New Job
          </Link>
        </div>
      </div>

      <div className={styles.card}>
        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            <input
              type="text"
              className={styles.searchInput}
              placeholder="Search jobs..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            />
            <select className={styles.filterSelect} value={deptFilter} onChange={(e) => { setDeptFilter(e.target.value); setPage(1); }}>
              <option value="">All Departments</option>
              {['Engineering', 'Infrastructure', 'Security', 'Mobile', 'Design', 'Quality', 'Business'].map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
            <select className={styles.filterSelect} value={productFilter} onChange={(e) => { setProductFilter(e.target.value); setPage(1); }}>
              <option value="">All Products</option>
              {['pCloud Drive', 'pCloud Encryption', 'pCloud Pass', 'pCloud Business', 'Platform/Core'].map((p) => (
                <option key={p} value={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>

        {loading ? (
          <div className={styles.loading}><div className={styles.spinner} /></div>
        ) : jobs.length === 0 ? (
          <div className={styles.emptyState}>
            <Briefcase />
            <h3>No jobs found</h3>
            <p>Create your first job posting.</p>
            <Link href="/admin/jobs/new" className={styles.btnPrimary}><Plus size={16} />New Job</Link>
          </div>
        ) : (
          <>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Department</th>
                    <th>Product</th>
                    <th>Seniority</th>
                    <th>Status</th>
                    <th>Priority</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {jobs.map((job) => (
                    <tr key={job.id}>
                      <td>
                        <Link href={`/admin/jobs/${job.id}/edit`} style={{ color: '#212529', textDecoration: 'none', fontWeight: 500 }}>
                          {job.title}
                        </Link>
                      </td>
                      <td>{job.department}</td>
                      <td>{job.product}</td>
                      <td>{job.seniority}</td>
                      <td>
                        <button onClick={() => handleTogglePublish(job)} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }} title="Click to toggle">
                          {getPublishBadge(job.is_published)}
                        </button>
                      </td>
                      <td>
                        {job.is_high_priority ? <StatusBadge label="High" variant="red" /> : <StatusBadge label="Normal" variant="gray" />}
                      </td>
                      <td>
                        <div className={styles.tableActions}>
                          <Link href={`/admin/jobs/${job.id}/edit`} className={`${styles.btnGhost} ${styles.btnSmall} ${styles.btnIcon}`} title="Edit">
                            <Pencil size={14} />
                          </Link>
                          <button className={`${styles.btnGhost} ${styles.btnSmall} ${styles.btnIcon}`} onClick={() => setDeleteId(job.id)} title="Delete">
                            <Trash2 size={14} color="#ef4444" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Pagination page={meta.page} totalPages={meta.totalPages} onPageChange={setPage} />
          </>
        )}
      </div>

      <ConfirmDialog
        open={deleteId !== null}
        title="Delete Job"
        message="Are you sure you want to delete this job posting? This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleting}
      />
    </div>
  );
}
