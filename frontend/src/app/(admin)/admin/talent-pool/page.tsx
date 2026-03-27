'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { UserPlus, Search, Star, RefreshCw, Trash2 } from 'lucide-react';
import { useToast } from '@/components/admin/Toast';
import ConfirmDialog from '@/components/admin/ConfirmDialog';
import styles from '@/styles/admin.module.scss';
import type { CandidateWithJob } from '@/types';

function renderStars(score: number | null) {
  if (score === null || score === undefined) return <span style={{ color: '#9ca3af', fontSize: '12px' }}>--</span>;
  return (
    <span style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} size={12} fill={i <= Math.round(score) ? '#f59e0b' : 'none'} stroke={i <= Math.round(score) ? '#f59e0b' : '#d1d5db'} />
      ))}
      <span style={{ marginLeft: 4, fontSize: '12px', color: '#6b7280' }}>({score.toFixed(1)})</span>
    </span>
  );
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function TalentPoolPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [candidates, setCandidates] = useState<CandidateWithJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [confirmAction, setConfirmAction] = useState<{ type: 'reactivate' | 'remove'; id: number; name: string } | null>(null);
  const [actionLoading, setActionLoading] = useState(false);

  const loadTalentPool = useCallback(async () => {
    setLoading(true);
    try {
      // Fetch rejected candidates with keep_in_talent_pool = 1
      const params = new URLSearchParams({ status: 'rejected', perPage: '200' });
      const res = await fetch(`/api/candidates?${params.toString()}`);
      const data = await res.json();
      if (data.success) {
        // Filter to only talent pool candidates
        const poolCandidates = (data.data || []).filter(
          (c: CandidateWithJob) => c.keep_in_talent_pool === 1
        );
        setCandidates(poolCandidates);
      }
    } catch {
      showToast('error', 'Failed to load talent pool');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  useEffect(() => { loadTalentPool(); }, [loadTalentPool]);

  const handleReactivate = async (id: number) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/candidates/${id}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'new', notes: 'Re-activated from talent pool' }),
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', 'Candidate re-activated');
        loadTalentPool();
      } else {
        showToast('error', data.error || 'Failed to re-activate');
      }
    } catch {
      showToast('error', 'Failed to re-activate candidate');
    } finally {
      setActionLoading(false);
      setConfirmAction(null);
    }
  };

  const handleRemoveFromPool = async (id: number) => {
    setActionLoading(true);
    try {
      const res = await fetch(`/api/candidates/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keep_in_talent_pool: 0 }),
      });
      const data = await res.json();
      if (data.success) {
        showToast('success', 'Removed from talent pool');
        loadTalentPool();
      } else {
        showToast('error', data.error || 'Failed to remove');
      }
    } catch {
      showToast('error', 'Failed to remove from talent pool');
    } finally {
      setActionLoading(false);
      setConfirmAction(null);
    }
  };

  const filtered = search
    ? candidates.filter((c) =>
        c.full_name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        (c.job_title || '').toLowerCase().includes(search.toLowerCase())
      )
    : candidates;

  if (loading) {
    return <div className={styles.loading}><div className={styles.spinner} /></div>;
  }

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>
          <UserPlus size={24} /> Talent Pool
        </h1>
        <span style={{ fontSize: '14px', color: '#6b7280' }}>
          {candidates.length} candidate{candidates.length !== 1 ? 's' : ''} in pool
        </span>
      </div>

      {/* Search */}
      <div style={{ marginBottom: '20px', maxWidth: '400px' }}>
        <div style={{ position: 'relative' }}>
          <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          <input
            className={styles.formInput}
            style={{ paddingLeft: '36px' }}
            placeholder="Search by name, email, or position..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {filtered.length === 0 ? (
        <div className={styles.emptyState}>
          <UserPlus />
          <h3>No candidates in talent pool</h3>
          <p>
            {search
              ? 'No candidates match your search.'
              : 'Candidates marked "keep in talent pool" when rejected will appear here.'}
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gap: '12px' }}>
          {filtered.map((c) => (
            <div key={c.id} className={styles.card} style={{ padding: '16px 20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <Link
                    href={`/admin/candidates/${c.id}`}
                    style={{ fontSize: '15px', fontWeight: 600, color: '#1a1a2e', textDecoration: 'none' }}
                  >
                    {c.full_name}
                  </Link>
                  <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px', display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                    <span>Previous: {c.job_title || 'General Application'}</span>
                    {c.rejection_reason && <span>Reason: {c.rejection_reason}</span>}
                    <span>Rejected: {formatDate(c.status_changed_at)}</span>
                    <span>{c.source}</span>
                  </div>
                  <div style={{ marginTop: '6px' }}>
                    {renderStars(c.composite_score)}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
                  <button
                    className={styles.btnSecondary}
                    onClick={() => setConfirmAction({ type: 'reactivate', id: c.id, name: c.full_name })}
                    style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px' }}
                  >
                    <RefreshCw size={14} /> Re-activate
                  </button>
                  <button
                    className={`${styles.btnGhost} ${styles.btnSmall}`}
                    onClick={() => setConfirmAction({ type: 'remove', id: c.id, name: c.full_name })}
                    style={{ color: '#ef4444' }}
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={confirmAction !== null}
        title={confirmAction?.type === 'reactivate' ? 'Re-activate Candidate' : 'Remove from Talent Pool'}
        message={
          confirmAction?.type === 'reactivate'
            ? `Re-activate ${confirmAction.name}? Their status will be set back to "New" for a new position.`
            : `Remove ${confirmAction?.name} from the talent pool? They will remain in the rejected list but won't appear here.`
        }
        confirmLabel={confirmAction?.type === 'reactivate' ? 'Re-activate' : 'Remove'}
        onConfirm={() => {
          if (!confirmAction) return;
          if (confirmAction.type === 'reactivate') {
            handleReactivate(confirmAction.id);
          } else {
            handleRemoveFromPool(confirmAction.id);
          }
        }}
        onCancel={() => setConfirmAction(null)}
        loading={actionLoading}
      />
    </div>
  );
}
