'use client';

import { Fragment, useEffect, useState, useCallback } from 'react';
import { Users, Trash2, ChevronDown, ChevronUp, Download, ExternalLink } from 'lucide-react';
import { getApplicationStatusBadge } from '@/components/admin/StatusBadge';
import Pagination from '@/components/admin/Pagination';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import { useToast } from '@/components/admin/Toast';
import styles from '@/styles/admin.module.scss';
import type { ApplicationWithJob, PaginationMeta } from '@/types';

const STATUS_OPTIONS = [
  { value: '', label: 'All Statuses' },
  { value: 'new', label: 'New' },
  { value: 'reviewed', label: 'Reviewed' },
  { value: 'interview', label: 'Interview' },
  { value: 'rejected', label: 'Rejected' },
  { value: 'accepted', label: 'Accepted' },
];

export default function AdminApplicationsPage() {
  const { showToast } = useToast();
  const [applications, setApplications] = useState<ApplicationWithJob[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({ page: 1, perPage: 20, total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  const fetchApplications = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), perPage: '20' });
      if (statusFilter) params.set('status', statusFilter);

      const res = await fetch(`/api/applications?${params}`);
      const data = await res.json();
      if (data.success) {
        setApplications(data.data || []);
        setMeta(data.meta || { page: 1, perPage: 20, total: 0, totalPages: 0 });
      }
    } catch {
      showToast('error', 'Failed to load applications');
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, showToast]);

  useEffect(() => {
    fetchApplications();
  }, [fetchApplications]);

  const handleStatusChange = async (appId: number, newStatus: string) => {
    try {
      const res = await fetch(`/api/applications/${appId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', 'Status updated');
        fetchApplications();
      } else {
        showToast('error', data.error || 'Failed to update status');
      }
    } catch {
      showToast('error', 'Failed to update status');
    }
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/applications/${deleteId}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        showToast('success', 'Application deleted');
        fetchApplications();
      } else {
        showToast('error', data.error || 'Failed to delete');
      }
    } catch {
      showToast('error', 'Failed to delete application');
    } finally {
      setDeleting(false);
      setDeleteId(null);
    }
  };

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1>Applications</h1>
      </div>

      <div className={styles.card}>
        <div className={styles.toolbar}>
          <div className={styles.toolbarLeft}>
            <select
              className={styles.filterSelect}
              value={statusFilter}
              onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            >
              {STATUS_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div style={{ fontSize: '14px', color: '#6c757d' }}>
            {meta.total} application{meta.total !== 1 ? 's' : ''}
          </div>
        </div>

        {loading ? (
          <div className={styles.loading}><div className={styles.spinner} /></div>
        ) : applications.length === 0 ? (
          <div className={styles.emptyState}>
            <Users />
            <h3>No applications found</h3>
            <p>Applications will appear here when candidates apply.</p>
          </div>
        ) : (
          <>
            <div className={styles.tableContainer}>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th style={{ width: 30 }}></th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Position</th>
                    <th>Status</th>
                    <th>Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {applications.map((app) => (
                    <Fragment key={app.id}>
                      <tr>
                        <td>
                          <button
                            className={`${styles.btnGhost} ${styles.btnSmall} ${styles.btnIcon}`}
                            onClick={() => setExpandedId(expandedId === app.id ? null : app.id)}
                          >
                            {expandedId === app.id ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                          </button>
                        </td>
                        <td style={{ fontWeight: 500 }}>{app.name}</td>
                        <td>
                          <a href={`mailto:${app.email}`} style={{ color: '#1EBCC5', textDecoration: 'none' }}>
                            {app.email}
                          </a>
                        </td>
                        <td>{app.job_title || 'General'}</td>
                        <td>
                          <select
                            value={app.status}
                            onChange={(e) => handleStatusChange(app.id, e.target.value)}
                            style={{
                              fontSize: '12px',
                              padding: '2px 6px',
                              border: '1px solid #dee2e6',
                              borderRadius: '4px',
                              background: '#fff',
                              cursor: 'pointer',
                            }}
                          >
                            <option value="new">New</option>
                            <option value="reviewed">Reviewed</option>
                            <option value="interview">Interview</option>
                            <option value="rejected">Rejected</option>
                            <option value="accepted">Accepted</option>
                          </select>
                        </td>
                        <td>
                          {new Date(app.created_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </td>
                        <td>
                          <div className={styles.tableActions}>
                            {app.cv_path && (
                              <a
                                href={app.cv_path}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={`${styles.btnGhost} ${styles.btnSmall} ${styles.btnIcon}`}
                                title="Download CV"
                              >
                                <Download size={14} />
                              </a>
                            )}
                            <button
                              className={`${styles.btnGhost} ${styles.btnSmall} ${styles.btnIcon}`}
                              onClick={() => setDeleteId(app.id)}
                              title="Delete"
                            >
                              <Trash2 size={14} color="#ef4444" />
                            </button>
                          </div>
                        </td>
                      </tr>
                      {expandedId === app.id && (
                        <tr key={`detail-${app.id}`}>
                          <td colSpan={7} style={{ padding: 0 }}>
                            <div className={styles.detailPanel}>
                              <div className={styles.detailRow}>
                                <div className={styles.detailLabel}>Name</div>
                                <div className={styles.detailValue}>{app.name}</div>
                              </div>
                              <div className={styles.detailRow}>
                                <div className={styles.detailLabel}>Email</div>
                                <div className={styles.detailValue}>
                                  <a href={`mailto:${app.email}`} style={{ color: '#1EBCC5' }}>{app.email}</a>
                                </div>
                              </div>
                              <div className={styles.detailRow}>
                                <div className={styles.detailLabel}>Position</div>
                                <div className={styles.detailValue}>
                                  {app.job_title || 'General Application'}
                                  {app.job_slug && (
                                    <a
                                      href={`/careers/${app.job_slug}`}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      style={{ marginLeft: '8px', color: '#1EBCC5' }}
                                    >
                                      <ExternalLink size={12} style={{ display: 'inline' }} />
                                    </a>
                                  )}
                                </div>
                              </div>
                              <div className={styles.detailRow}>
                                <div className={styles.detailLabel}>Status</div>
                                <div className={styles.detailValue}>{getApplicationStatusBadge(app.status)}</div>
                              </div>
                              <div className={styles.detailRow}>
                                <div className={styles.detailLabel}>Applied</div>
                                <div className={styles.detailValue}>
                                  {new Date(app.created_at).toLocaleString('en-US', {
                                    dateStyle: 'medium',
                                    timeStyle: 'short',
                                  })}
                                </div>
                              </div>
                              {app.cover_letter && (
                                <div className={styles.detailRow}>
                                  <div className={styles.detailLabel}>Cover Letter</div>
                                  <div className={styles.detailValue} style={{ whiteSpace: 'pre-wrap' }}>
                                    {app.cover_letter}
                                  </div>
                                </div>
                              )}
                              {app.cv_path && (
                                <div className={styles.detailRow}>
                                  <div className={styles.detailLabel}>CV</div>
                                  <div className={styles.detailValue}>
                                    <a
                                      href={app.cv_path}
                                      target="_blank"
                                      rel="noopener noreferrer"
                                      className={styles.btnSecondary}
                                      style={{ display: 'inline-flex', fontSize: '13px', padding: '4px 12px' }}
                                    >
                                      <Download size={14} />
                                      Download CV
                                    </a>
                                  </div>
                                </div>
                              )}
                            </div>
                          </td>
                        </tr>
                      )}
                    </Fragment>
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
        title="Delete Application"
        message="Are you sure you want to delete this application? This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
        loading={deleting}
      />
    </div>
  );
}
