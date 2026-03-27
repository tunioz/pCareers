'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Star } from 'lucide-react';
import {
  getCandidateStatusBadge,
  getRecommendationBadge,
} from '@/components/admin/StatusBadge';
import styles from '@/styles/admin.module.scss';
import type { CandidateWithJob, CandidateScore } from '@/types';

const SCORE_DIMENSIONS = [
  { key: 'technical_depth', label: 'Technical Depth', weight: 25 },
  { key: 'problem_solving', label: 'Problem Solving', weight: 20 },
  { key: 'ownership', label: 'Ownership', weight: 20 },
  { key: 'communication', label: 'Communication', weight: 15 },
  { key: 'cultural_add', label: 'Cultural Add', weight: 10 },
  { key: 'growth_potential', label: 'Growth Potential', weight: 10 },
] as const;

function getScoreColor(score: number | null): string {
  if (!score) return '#e5e7eb';
  if (score <= 2) return '#ef4444';
  if (score <= 3) return '#f59e0b';
  return '#10b981';
}

interface CandidateCompareData {
  candidate: CandidateWithJob;
  scores: CandidateScore[];
  compositeScore: number | null;
}

export default function CandidateComparePage() {
  const searchParams = useSearchParams();
  const idsParam = searchParams.get('ids');
  const [candidates, setCandidates] = useState<CandidateCompareData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!idsParam) {
      setLoading(false);
      return;
    }

    const ids = idsParam.split(',').map((id) => id.trim()).filter(Boolean).slice(0, 4);

    Promise.all(
      ids.map(async (id) => {
        const [candidateRes, scoresRes] = await Promise.all([
          fetch(`/api/candidates/${id}`).then((r) => r.json()),
          fetch(`/api/candidates/${id}/scores`).then((r) => r.json()),
        ]);

        if (!candidateRes.success) return null;

        return {
          candidate: candidateRes.data as CandidateWithJob,
          scores: (scoresRes.data?.scorecards || []) as CandidateScore[],
          compositeScore: scoresRes.data?.composite_score ?? null,
        } as CandidateCompareData;
      })
    ).then((results) => {
      setCandidates(results.filter((r): r is CandidateCompareData => r !== null));
      setLoading(false);
    }).catch(() => setLoading(false));
  }, [idsParam]);

  if (loading) {
    return <div className={styles.loading}><div className={styles.spinner} /></div>;
  }

  if (candidates.length === 0) {
    return (
      <div>
        <Link
          href="/admin/candidates"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: '#6c757d', textDecoration: 'none', marginBottom: '16px' }}
        >
          <ArrowLeft size={14} /> Back to Candidates
        </Link>
        <div className={styles.emptyState}>
          <h3>No candidates selected for comparison</h3>
          <p>Select candidates to compare by adding their IDs to the URL: ?ids=1,2,3</p>
        </div>
      </div>
    );
  }

  // Compute average scores per dimension for each candidate
  function getAvgScore(scores: CandidateScore[], dimension: string): number | null {
    const values = scores
      .map((s) => s[dimension as keyof CandidateScore] as number | null)
      .filter((v): v is number => v !== null && v !== undefined);
    if (values.length === 0) return null;
    return Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10) / 10;
  }

  function getLatestRecommendation(scores: CandidateScore[]): string | null {
    const withRec = scores.filter((s) => s.recommendation);
    if (withRec.length === 0) return null;
    return withRec[withRec.length - 1].recommendation;
  }

  const colWidth = `${100 / candidates.length}%`;

  return (
    <div>
      <Link
        href="/admin/candidates"
        style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', fontSize: '14px', color: '#6c757d', textDecoration: 'none', marginBottom: '16px' }}
      >
        <ArrowLeft size={14} /> Back to Candidates
      </Link>

      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Compare Candidates ({candidates.length})</h1>
      </div>

      {/* Candidate Headers */}
      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
        {candidates.map((c) => {
          const initials = c.candidate.full_name
            .split(' ')
            .map((n) => n.charAt(0).toUpperCase())
            .slice(0, 2)
            .join('');

          return (
            <div key={c.candidate.id} className={styles.card} style={{ flex: 1, padding: '20px', textAlign: 'center' }}>
              <div style={{
                width: 56, height: 56, borderRadius: '50%', background: '#e5e7eb',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '18px', fontWeight: 700, color: '#4b5563', margin: '0 auto 12px',
              }}>
                {c.candidate.photo ? (
                  <img src={c.candidate.photo} alt={c.candidate.full_name} style={{ width: '100%', height: '100%', borderRadius: '50%', objectFit: 'cover' }} />
                ) : (
                  initials
                )}
              </div>
              <Link href={`/admin/candidates/${c.candidate.id}`} style={{ fontSize: '16px', fontWeight: 600, color: '#1f2937', textDecoration: 'none' }}>
                {c.candidate.full_name}
              </Link>
              <div style={{ fontSize: '13px', color: '#6b7280', marginTop: '4px' }}>
                {c.candidate.job_title || 'General Application'}
              </div>
              <div style={{ marginTop: '8px' }}>
                {getCandidateStatusBadge(c.candidate.status)}
              </div>
              <div style={{ marginTop: '8px', fontSize: '12px', color: '#6b7280' }}>
                Source: {c.candidate.source}
              </div>
            </div>
          );
        })}
      </div>

      {/* Composite Score Comparison */}
      <div className={styles.card} style={{ padding: '24px', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Composite Score</h2>
        <div style={{ display: 'flex', gap: '16px' }}>
          {candidates.map((c) => (
            <div key={c.candidate.id} style={{ flex: 1, textAlign: 'center' }}>
              <div style={{ fontSize: '32px', fontWeight: 700, color: getScoreColor(c.compositeScore) }}>
                {c.compositeScore !== null ? c.compositeScore.toFixed(1) : '--'}
              </div>
              <div style={{ marginTop: '4px', height: '8px', background: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                <div style={{
                  height: '100%',
                  width: c.compositeScore ? `${(c.compositeScore / 5) * 100}%` : '0%',
                  background: getScoreColor(c.compositeScore),
                  borderRadius: '4px',
                }} />
              </div>
              <div style={{ marginTop: '8px' }}>
                {getLatestRecommendation(c.scores) && getRecommendationBadge(getLatestRecommendation(c.scores))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dimension Scores */}
      <div className={styles.card} style={{ padding: '24px', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Dimension Scores</h2>
        {SCORE_DIMENSIONS.map((dim) => (
          <div key={dim.key} style={{ marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
              <span style={{ fontSize: '13px', fontWeight: 500, color: '#4b5563' }}>{dim.label}</span>
              <span style={{ fontSize: '11px', color: '#9ca3af' }}>Weight: {dim.weight}%</span>
            </div>
            <div style={{ display: 'flex', gap: '16px' }}>
              {candidates.map((c) => {
                const avg = getAvgScore(c.scores, dim.key);
                return (
                  <div key={c.candidate.id} style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ flex: 1, height: '20px', background: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{
                          height: '100%',
                          width: avg ? `${(avg / 5) * 100}%` : '0%',
                          background: getScoreColor(avg),
                          borderRadius: '4px',
                          transition: 'width 0.3s ease',
                        }} />
                      </div>
                      <span style={{ fontSize: '13px', fontWeight: 600, color: getScoreColor(avg), width: '32px', textAlign: 'right' }}>
                        {avg !== null ? avg.toFixed(1) : '--'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Key Info Comparison */}
      <div className={styles.card} style={{ padding: '24px', marginBottom: '24px' }}>
        <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '16px' }}>Key Information</h2>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ textAlign: 'left', padding: '8px', color: '#6b7280', fontWeight: 500, width: '140px' }}>Field</th>
              {candidates.map((c) => (
                <th key={c.candidate.id} style={{ textAlign: 'left', padding: '8px', color: '#6b7280', fontWeight: 500, width: colWidth }}>
                  {c.candidate.full_name.split(' ')[0]}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '10px 8px', color: '#6b7280' }}>Work Model</td>
              {candidates.map((c) => (
                <td key={c.candidate.id} style={{ padding: '10px 8px' }}>{c.candidate.work_model || '--'}</td>
              ))}
            </tr>
            <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '10px 8px', color: '#6b7280' }}>Salary Range</td>
              {candidates.map((c) => (
                <td key={c.candidate.id} style={{ padding: '10px 8px' }}>
                  {c.candidate.salary_min || c.candidate.salary_max
                    ? `${c.candidate.salary_min?.toLocaleString() || '?'} - ${c.candidate.salary_max?.toLocaleString() || '?'} ${c.candidate.salary_currency}`
                    : '--'}
                </td>
              ))}
            </tr>
            <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '10px 8px', color: '#6b7280' }}>Earliest Start</td>
              {candidates.map((c) => (
                <td key={c.candidate.id} style={{ padding: '10px 8px' }}>{c.candidate.earliest_start || '--'}</td>
              ))}
            </tr>
            <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '10px 8px', color: '#6b7280' }}>Source</td>
              {candidates.map((c) => (
                <td key={c.candidate.id} style={{ padding: '10px 8px' }}>{c.candidate.source}</td>
              ))}
            </tr>
            <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '10px 8px', color: '#6b7280' }}>LinkedIn</td>
              {candidates.map((c) => (
                <td key={c.candidate.id} style={{ padding: '10px 8px' }}>
                  {c.candidate.linkedin_url ? (
                    <a href={c.candidate.linkedin_url} target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6' }}>View</a>
                  ) : '--'}
                </td>
              ))}
            </tr>
            <tr style={{ borderBottom: '1px solid #f3f4f6' }}>
              <td style={{ padding: '10px 8px', color: '#6b7280' }}>GitHub</td>
              {candidates.map((c) => (
                <td key={c.candidate.id} style={{ padding: '10px 8px' }}>
                  {c.candidate.github_url ? (
                    <a href={c.candidate.github_url} target="_blank" rel="noopener noreferrer" style={{ color: '#3b82f6' }}>View</a>
                  ) : '--'}
                </td>
              ))}
            </tr>
            <tr>
              <td style={{ padding: '10px 8px', color: '#6b7280' }}>Days in Pipeline</td>
              {candidates.map((c) => (
                <td key={c.candidate.id} style={{ padding: '10px 8px' }}>
                  {Math.floor((Date.now() - new Date(c.candidate.created_at).getTime()) / (1000 * 60 * 60 * 24))} days
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
