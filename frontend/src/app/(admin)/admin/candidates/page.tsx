'use client';

import { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  Users,
  LayoutGrid,
  List,
  Star,
  Search,
  ChevronDown,
  ChevronUp,
  TrendingUp,
  Clock,
  UserPlus,
  Download,
} from 'lucide-react';
import { getCandidateStatusBadge, CANDIDATE_STATUS_MAP } from '@/components/admin/StatusBadge';
import Pagination from '@/components/admin/Pagination';
import { useToast } from '@/components/admin/Toast';
import styles from '@/styles/admin.module.scss';
import type { CandidateWithJob, CandidateStatus, PaginationMeta, Job } from '@/types';

// Pipeline columns (active statuses for the board)
const PIPELINE_STATUSES: CandidateStatus[] = [
  'new', 'screening', 'phone_screen', 'technical',
  'team_interview', 'culture_chat', 'offer', 'hired',
];

const TERMINAL_STATUSES: CandidateStatus[] = ['rejected', 'on_hold', 'withdrawn'];

interface PipelineStats {
  byStatus: { status: string; count: number }[];
  bySource: { source: string; count: number }[];
  byJob: { job_id: number | null; job_title: string | null; count: number }[];
  totals: {
    active: number;
    archived: number;
    recentApplications: number;
    avgCompositeScore: number | null;
  };
}

function daysInStage(statusChangedAt: string): number {
  const changed = new Date(statusChangedAt);
  const now = new Date();
  return Math.floor((now.getTime() - changed.getTime()) / (1000 * 60 * 60 * 24));
}

function renderStars(score: number | null) {
  if (score === null || score === undefined) return null;
  const rounded = Math.round(score);
  return (
    <span className={styles.atsCandidateCardScore}>
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={12}
          fill={i <= rounded ? '#f59e0b' : 'none'}
          stroke={i <= rounded ? '#f59e0b' : '#d1d5db'}
        />
      ))}
    </span>
  );
}

export default function CandidatesPage() {
  const router = useRouter();
  const { showToast } = useToast();
  const [view, setView] = useState<'board' | 'list'>('board');
  const [stats, setStats] = useState<PipelineStats | null>(null);
  const [candidates, setCandidates] = useState<CandidateWithJob[]>([]);
  const [meta, setMeta] = useState<PaginationMeta>({ page: 1, perPage: 20, total: 0, totalPages: 0 });
  const [loading, setLoading] = useState(true);

  // List view filters
  const [statusFilter, setStatusFilter] = useState('');
  const [jobFilter, setJobFilter] = useState('');
  const [sourceFilter, setSourceFilter] = useState('');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  // Board view data
  const [boardCandidates, setBoardCandidates] = useState<CandidateWithJob[]>([]);
  const [terminalExpanded, setTerminalExpanded] = useState(false);
  const [dragOverStatus, setDragOverStatus] = useState<string | null>(null);
  const [draggingId, setDraggingId] = useState<number | null>(null);

  // Jobs for filter dropdown
  const [jobs, setJobs] = useState<Job[]>([]);

  // Load stats
  const loadStats = useCallback(async () => {
    try {
      const res = await fetch('/api/candidates/stats');
      const data = await res.json();
      if (data.success) {
        setStats(data.data);
      }
    } catch {
      // Silent fail for stats
    }
  }, []);

  // Load board candidates (all non-archived)
  const loadBoardCandidates = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/candidates?perPage=50');
      const data = await res.json();
      if (data.success) {
        setBoardCandidates(data.data || []);
      }
    } catch {
      showToast('error', 'Failed to load candidates');
    } finally {
      setLoading(false);
    }
  }, [showToast]);

  // Load list candidates (with filters)
  const loadListCandidates = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), perPage: '20' });
      if (statusFilter) params.set('status', statusFilter);
      if (jobFilter) params.set('job_id', jobFilter);
      if (sourceFilter) params.set('source', sourceFilter);
      if (search) params.set('search', search);

      const res = await fetch(`/api/candidates?${params}`);
      const data = await res.json();
      if (data.success) {
        setCandidates(data.data || []);
        setMeta(data.meta || { page: 1, perPage: 20, total: 0, totalPages: 0 });
      }
    } catch {
      showToast('error', 'Failed to load candidates');
    } finally {
      setLoading(false);
    }
  }, [page, statusFilter, jobFilter, sourceFilter, search, showToast]);

  // Drag-drop: move candidate to new pipeline stage
  const handleDrop = useCallback(async (candidateId: number, newStatus: string) => {
    setDragOverStatus(null);
    setDraggingId(null);
    const candidate = boardCandidates.find(c => c.id === candidateId);
    if (!candidate || candidate.status === newStatus) return;

    // Rejection requires a reason — prompt user
    let rejectionReason: string | undefined;
    if (newStatus === 'rejected') {
      const reason = prompt('Rejection reason (required):');
      if (!reason) return; // Cancelled
      rejectionReason = reason;
    }

    // Optimistic update
    const prevStatus = candidate.status;
    const prevChangedAt = candidate.status_changed_at;
    setBoardCandidates(prev =>
      prev.map(c => c.id === candidateId ? { ...c, status: newStatus as CandidateStatus, status_changed_at: new Date().toISOString() } : c)
    );

    try {
      const res = await fetch(`/api/candidates/${candidateId}/status`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus, rejection_reason: rejectionReason }),
      });
      const data = await res.json();
      if (!data.success) {
        setBoardCandidates(prev =>
          prev.map(c => c.id === candidateId ? { ...c, status: prevStatus, status_changed_at: prevChangedAt } : c)
        );
        showToast('error', data.error || 'Failed to update status');
      } else {
        showToast('success', `${candidate.full_name} moved to ${CANDIDATE_STATUS_MAP[newStatus as CandidateStatus]?.label || newStatus}`);
        loadStats();
      }
    } catch {
      setBoardCandidates(prev =>
        prev.map(c => c.id === candidateId ? { ...c, status: prevStatus, status_changed_at: prevChangedAt } : c)
      );
      showToast('error', 'Network error');
    }
  }, [boardCandidates, showToast, loadStats]);

  // Load jobs for filter
  useEffect(() => {
    fetch('/api/jobs?perPage=50')
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setJobs(data.data || []);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    loadStats();
  }, [loadStats]);

  useEffect(() => {
    if (view === 'board') {
      loadBoardCandidates();
    } else {
      loadListCandidates();
    }
  }, [view, loadBoardCandidates, loadListCandidates]);

  // Group candidates by status for board view
  const groupedByStatus = PIPELINE_STATUSES.reduce<Record<string, CandidateWithJob[]>>((acc, status) => {
    acc[status] = boardCandidates.filter((c) => c.status === status);
    return acc;
  }, {});

  const terminalCandidates = boardCandidates.filter((c) =>
    TERMINAL_STATUSES.includes(c.status as CandidateStatus)
  );

  // Compute stats
  const totalCandidates = stats?.totals?.active || 0;
  const newToday = stats?.byStatus?.find((s) => s.status === 'new')?.count || 0;
  const inPipeline = (stats?.byStatus || [])
    .filter((s) => !['rejected', 'on_hold', 'withdrawn', 'hired'].includes(s.status))
    .reduce((sum, s) => sum + s.count, 0);
  const avgScore = stats?.totals?.avgCompositeScore;
  const hiredCount = stats?.byStatus?.find((s) => s.status === 'hired')?.count || 0;
  const offerRate = totalCandidates > 0 ? Math.round((hiredCount / totalCandidates) * 100) : 0;

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1>Candidates</h1>
        <div className={styles.pageActions}>
          <div className={styles.atsViewToggle}>
            <button
              className={view === 'board' ? styles.atsViewActive : ''}
              onClick={() => setView('board')}
            >
              <LayoutGrid size={14} />
              Board
            </button>
            <button
              className={view === 'list' ? styles.atsViewActive : ''}
              onClick={() => setView('list')}
            >
              <List size={14} />
              List
            </button>
          </div>
          <button
            className={styles.btnSecondary}
            onClick={() => {
              const params = new URLSearchParams();
              if (statusFilter) params.set('status', statusFilter);
              if (jobFilter) params.set('job_id', jobFilter);
              if (sourceFilter) params.set('source', sourceFilter);
              if (search) params.set('search', search);
              window.open(`/api/candidates/export?${params.toString()}`, '_blank');
            }}
            style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px' }}
          >
            <Download size={14} /> Export CSV
          </button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className={styles.atsStatsBar}>
        <div className={styles.atsStatItem}>
          <h4>{totalCandidates}</h4>
          <p>Total Candidates</p>
        </div>
        <div className={styles.atsStatItem}>
          <h4>{newToday}</h4>
          <p>New</p>
        </div>
        <div className={styles.atsStatItem}>
          <h4>{inPipeline}</h4>
          <p>In Pipeline</p>
        </div>
        <div className={styles.atsStatItem}>
          <h4>{avgScore !== null && avgScore !== undefined ? avgScore.toFixed(1) : '--'}</h4>
          <p>Avg Score</p>
        </div>
        <div className={styles.atsStatItem}>
          <h4>{offerRate}%</h4>
          <p>Hire Rate</p>
        </div>
      </div>

      {/* Board View */}
      {view === 'board' && (
        <>
          {loading ? (
            <div className={styles.loading}><div className={styles.spinner} /></div>
          ) : (
            <>
              <div className={styles.atsPipelineBoard}>
                {PIPELINE_STATUSES.map((status) => {
                  const info = CANDIDATE_STATUS_MAP[status];
                  const candidates = groupedByStatus[status] || [];
                  return (
                    <div
                      key={status}
                      className={styles.atsPipelineCol}
                      onDragOver={(e) => { e.preventDefault(); setDragOverStatus(status); }}
                      onDragLeave={() => setDragOverStatus(null)}
                      onDrop={(e) => {
                        e.preventDefault();
                        const candidateId = parseInt(e.dataTransfer.getData('text/plain'), 10);
                        if (candidateId) handleDrop(candidateId, status);
                      }}
                      style={dragOverStatus === status ? { outline: '2px dashed #17BED0', outlineOffset: '-2px', borderRadius: '8px' } : undefined}
                    >
                      <div
                        className={styles.atsPipelineColHeader}
                        style={{ background: info.color }}
                      >
                        <h3>{info.label}</h3>
                        <span className={styles.atsPipelineCount}>{candidates.length}</span>
                      </div>
                      <div className={styles.atsPipelineColBody}>
                        {candidates.length === 0 ? (
                          <p style={{ fontSize: '12px', color: '#9ca3af', textAlign: 'center', padding: '16px 0' }}>
                            {dragOverStatus === status ? 'Drop here' : 'No candidates'}
                          </p>
                        ) : (
                          candidates.map((c) => (
                            <div
                              key={c.id}
                              className={styles.atsCandidateCard}
                              draggable
                              onDragStart={(e) => {
                                e.dataTransfer.setData('text/plain', String(c.id));
                                setDraggingId(c.id);
                              }}
                              onDragEnd={() => { setDraggingId(null); setDragOverStatus(null); }}
                              onClick={() => router.push(`/admin/candidates/${c.id}`)}
                              style={draggingId === c.id ? { opacity: 0.5 } : undefined}
                            >
                              <div className={styles.atsCandidateCardName}>{c.full_name}</div>
                              <div className={styles.atsCandidateCardJob}>
                                {c.job_title || 'General Application'}
                              </div>
                              <div className={styles.atsCandidateCardMeta}>
                                {renderStars(c.composite_score)}
                                <span className={styles.atsCandidateCardDays}>
                                  <Clock size={10} style={{ display: 'inline', verticalAlign: 'middle', marginRight: 2 }} />
                                  {daysInStage(c.status_changed_at)}d
                                </span>
                                <span className={styles.atsCandidateCardSource}>{c.source}</span>
                              </div>
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Terminal statuses collapsed section */}
              {terminalCandidates.length > 0 && (
                <div className={styles.atsCollapsedSection}>
                  <div className={styles.collapsibleSection}>
                    <button
                      className={styles.collapsibleHeader}
                      onClick={() => setTerminalExpanded(!terminalExpanded)}
                    >
                      <span>
                        Rejected / On Hold / Withdrawn ({terminalCandidates.length})
                      </span>
                      {terminalExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>
                    {terminalExpanded && (
                      <div className={styles.collapsibleContent}>
                        <div className={styles.tableContainer}>
                          <table className={styles.table}>
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>Position</th>
                                <th>Status</th>
                                <th>Date</th>
                              </tr>
                            </thead>
                            <tbody>
                              {terminalCandidates.map((c) => (
                                <tr
                                  key={c.id}
                                  onClick={() => router.push(`/admin/candidates/${c.id}`)}
                                  style={{ cursor: 'pointer' }}
                                >
                                  <td style={{ fontWeight: 500 }}>{c.full_name}</td>
                                  <td>{c.job_title || 'General'}</td>
                                  <td>{getCandidateStatusBadge(c.status)}</td>
                                  <td>
                                    {new Date(c.created_at).toLocaleDateString('en-US', {
                                      month: 'short', day: 'numeric', year: 'numeric',
                                    })}
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </>
          )}
        </>
      )}

      {/* List View */}
      {view === 'list' && (
        <div className={styles.card}>
          <div className={styles.toolbar}>
            <div className={styles.toolbarLeft}>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  className={styles.searchInput}
                  placeholder="Search candidates..."
                  value={search}
                  onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                />
              </div>
              <select
                className={styles.filterSelect}
                value={statusFilter}
                onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
              >
                <option value="">All Statuses</option>
                {Object.entries(CANDIDATE_STATUS_MAP).map(([key, info]) => (
                  <option key={key} value={key}>{info.label}</option>
                ))}
              </select>
              <select
                className={styles.filterSelect}
                value={jobFilter}
                onChange={(e) => { setJobFilter(e.target.value); setPage(1); }}
              >
                <option value="">All Positions</option>
                {jobs.map((j) => (
                  <option key={j.id} value={j.id}>{j.title}</option>
                ))}
              </select>
              <select
                className={styles.filterSelect}
                value={sourceFilter}
                onChange={(e) => { setSourceFilter(e.target.value); setPage(1); }}
              >
                <option value="">All Sources</option>
                <option value="Direct">Direct</option>
                <option value="LinkedIn">LinkedIn</option>
                <option value="Referral">Referral</option>
                <option value="Job Board">Job Board</option>
                <option value="Conference">Conference</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div style={{ fontSize: '14px', color: '#6c757d' }}>
              {meta.total} candidate{meta.total !== 1 ? 's' : ''}
            </div>
          </div>

          {loading ? (
            <div className={styles.loading}><div className={styles.spinner} /></div>
          ) : candidates.length === 0 ? (
            <div className={styles.emptyState}>
              <Users />
              <h3>No candidates found</h3>
              <p>Adjust your filters or wait for new applications.</p>
            </div>
          ) : (
            <>
              <div className={styles.tableContainer}>
                <table className={styles.table}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Position</th>
                      <th>Status</th>
                      <th>Score</th>
                      <th>Source</th>
                      <th>Applied</th>
                    </tr>
                  </thead>
                  <tbody>
                    {candidates.map((c) => (
                      <tr
                        key={c.id}
                        onClick={() => router.push(`/admin/candidates/${c.id}`)}
                        style={{ cursor: 'pointer' }}
                      >
                        <td style={{ fontWeight: 500 }}>{c.full_name}</td>
                        <td>{c.job_title || 'General'}</td>
                        <td>{getCandidateStatusBadge(c.status)}</td>
                        <td>{renderStars(c.composite_score)}</td>
                        <td>
                          <span className={styles.atsCandidateCardSource}>{c.source}</span>
                        </td>
                        <td>
                          {new Date(c.created_at).toLocaleDateString('en-US', {
                            month: 'short', day: 'numeric', year: 'numeric',
                          })}
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
      )}
    </div>
  );
}
