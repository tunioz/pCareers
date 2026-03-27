'use client';

import { useState, useEffect } from 'react';
import {
  BarChart3,
  TrendingUp,
  Clock,
  Users,
  Target,
  Award,
} from 'lucide-react';
import styles from '@/styles/admin.module.scss';
import type { AnalyticsData } from '@/types';

const STATUS_LABELS: Record<string, string> = {
  new: 'New',
  screening: 'Screening',
  phone_screen: 'Phone Screen',
  technical: 'Technical',
  team_interview: 'Team Interview',
  culture_chat: 'Culture Chat',
  offer: 'Offer',
  hired: 'Hired',
  rejected: 'Rejected',
  on_hold: 'On Hold',
  withdrawn: 'Withdrawn',
};

const STATUS_COLORS: Record<string, string> = {
  new: '#6b7280',
  screening: '#3b82f6',
  phone_screen: '#14b8a6',
  technical: '#8b5cf6',
  team_interview: '#f97316',
  culture_chat: '#ec4899',
  offer: '#22c55e',
  hired: '#eab308',
  rejected: '#ef4444',
  on_hold: '#f59e0b',
  withdrawn: '#9ca3af',
};

const SCORE_LABELS: Record<string, string> = {
  technical_depth: 'Technical Depth',
  problem_solving: 'Problem Solving',
  ownership: 'Ownership',
  communication: 'Communication',
  cultural_add: 'Cultural Add',
  growth_potential: 'Growth Potential',
};

export default function AnalyticsPage() {
  const [data, setData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/candidates/analytics')
      .then((res) => res.json())
      .then((result) => {
        if (result.success) {
          setData(result.data);
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <div className={styles.loading}><div className={styles.spinner} /></div>;
  }

  if (!data) {
    return <p>Failed to load analytics data.</p>;
  }

  const maxPipelineCount = Math.max(...data.pipeline_counts.map((p) => p.count), 1);
  const totalCandidates = data.pipeline_counts.reduce((sum, p) => sum + p.count, 0);

  return (
    <div>
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>
          <BarChart3 size={24} /> Analytics
        </h1>
      </div>

      {/* Summary Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '32px' }}>
        <div className={styles.card} style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ width: 40, height: 40, borderRadius: '10px', background: '#eff6ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Users size={20} color="#3b82f6" />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#1f2937' }}>{totalCandidates}</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>Total Candidates</div>
            </div>
          </div>
        </div>
        <div className={styles.card} style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ width: 40, height: 40, borderRadius: '10px', background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <TrendingUp size={20} color="#22c55e" />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#1f2937' }}>{data.avg_time_to_hire || '--'}</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>Avg Days to Hire</div>
            </div>
          </div>
        </div>
        <div className={styles.card} style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ width: 40, height: 40, borderRadius: '10px', background: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Clock size={20} color="#f59e0b" />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#1f2937' }}>{data.avg_time_to_first_action || '--'}</div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>Avg Days to First Action</div>
            </div>
          </div>
        </div>
        <div className={styles.card} style={{ padding: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{ width: 40, height: 40, borderRadius: '10px', background: '#fdf2f8', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <Award size={20} color="#ec4899" />
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: '#1f2937' }}>
                {data.pipeline_counts.find((p) => p.status === 'hired')?.count || 0}
              </div>
              <div style={{ fontSize: '12px', color: '#6b7280' }}>Total Hired</div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        {/* Pipeline Overview */}
        <div className={styles.card} style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Target size={18} /> Pipeline Overview
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {data.pipeline_counts.map((item) => (
              <div key={item.status} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '120px', fontSize: '13px', color: '#4b5563', flexShrink: 0 }}>
                  {STATUS_LABELS[item.status] || item.status}
                </div>
                <div style={{ flex: 1, height: '24px', background: '#f3f4f6', borderRadius: '6px', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${(item.count / maxPipelineCount) * 100}%`,
                      background: STATUS_COLORS[item.status] || '#6b7280',
                      borderRadius: '6px',
                      transition: 'width 0.5s ease',
                      minWidth: item.count > 0 ? '20px' : '0',
                    }}
                  />
                </div>
                <div style={{ width: '36px', textAlign: 'right', fontSize: '14px', fontWeight: 600, color: '#1f2937' }}>
                  {item.count}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Source Effectiveness */}
        <div className={styles.card} style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '20px' }}>Source Effectiveness</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                <th style={{ textAlign: 'left', padding: '8px 4px', color: '#6b7280', fontWeight: 500 }}>Source</th>
                <th style={{ textAlign: 'right', padding: '8px 4px', color: '#6b7280', fontWeight: 500 }}>Total</th>
                <th style={{ textAlign: 'right', padding: '8px 4px', color: '#6b7280', fontWeight: 500 }}>Hired</th>
                <th style={{ textAlign: 'right', padding: '8px 4px', color: '#6b7280', fontWeight: 500 }}>Conv. %</th>
              </tr>
            </thead>
            <tbody>
              {data.source_stats.map((s) => (
                <tr key={s.source} style={{ borderBottom: '1px solid #f3f4f6' }}>
                  <td style={{ padding: '10px 4px', fontWeight: 500, color: '#1f2937' }}>{s.source}</td>
                  <td style={{ padding: '10px 4px', textAlign: 'right', color: '#4b5563' }}>{s.total}</td>
                  <td style={{ padding: '10px 4px', textAlign: 'right', color: '#22c55e', fontWeight: 600 }}>{s.hired}</td>
                  <td style={{ padding: '10px 4px', textAlign: 'right', color: '#4b5563' }}>{s.conversion_rate}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Stage Conversion Rates */}
        <div className={styles.card} style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '20px' }}>Stage Conversion Rates</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.stage_conversions.map((sc) => (
              <div key={`${sc.from_stage}-${sc.to_stage}`} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '90px', fontSize: '11px', color: '#6b7280', textAlign: 'right', flexShrink: 0 }}>
                  {STATUS_LABELS[sc.from_stage] || sc.from_stage}
                </div>
                <div style={{ fontSize: '10px', color: '#9ca3af' }}>&rarr;</div>
                <div style={{ width: '90px', fontSize: '11px', color: '#6b7280', flexShrink: 0 }}>
                  {STATUS_LABELS[sc.to_stage] || sc.to_stage}
                </div>
                <div style={{ flex: 1, height: '18px', background: '#f3f4f6', borderRadius: '4px', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${Math.min(sc.percentage, 100)}%`,
                      background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)',
                      borderRadius: '4px',
                    }}
                  />
                </div>
                <div style={{ width: '50px', textAlign: 'right', fontSize: '12px', fontWeight: 600, color: '#1f2937' }}>
                  {sc.percentage}%
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Applications */}
        <div className={styles.card} style={{ padding: '24px' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '20px' }}>Monthly Applications (Last 6 Months)</h2>
          {data.monthly_applications.length === 0 ? (
            <p style={{ color: '#9ca3af', fontSize: '14px' }}>No data available yet.</p>
          ) : (
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '160px' }}>
              {(() => {
                const maxCount = Math.max(...data.monthly_applications.map((m) => m.count), 1);
                return data.monthly_applications.map((m) => (
                  <div key={m.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                    <div style={{ fontSize: '12px', fontWeight: 600, color: '#1f2937' }}>{m.count}</div>
                    <div
                      style={{
                        width: '100%',
                        maxWidth: '60px',
                        height: `${(m.count / maxCount) * 120}px`,
                        background: 'linear-gradient(180deg, #3b82f6, #1d4ed8)',
                        borderRadius: '4px 4px 0 0',
                        minHeight: m.count > 0 ? '8px' : '0',
                      }}
                    />
                    <div style={{ fontSize: '11px', color: '#6b7280', transform: 'rotate(-45deg)', transformOrigin: 'top left', whiteSpace: 'nowrap' }}>
                      {m.month}
                    </div>
                  </div>
                ));
              })()}
            </div>
          )}
        </div>

        {/* Score Distribution */}
        <div className={styles.card} style={{ padding: '24px', gridColumn: 'span 2' }}>
          <h2 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '20px' }}>Average Scores Across All Candidates</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '16px' }}>
            {Object.entries(data.avg_scores).map(([key, value]) => (
              <div key={key} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '28px', fontWeight: 700, color: value >= 4 ? '#22c55e' : value >= 3 ? '#f59e0b' : '#ef4444' }}>
                  {value > 0 ? value.toFixed(1) : '--'}
                </div>
                <div style={{ fontSize: '11px', color: '#6b7280', marginTop: '4px' }}>
                  {SCORE_LABELS[key] || key}
                </div>
                <div style={{ marginTop: '8px', height: '6px', background: '#f3f4f6', borderRadius: '3px', overflow: 'hidden' }}>
                  <div
                    style={{
                      height: '100%',
                      width: `${(value / 5) * 100}%`,
                      background: value >= 4 ? '#22c55e' : value >= 3 ? '#f59e0b' : '#ef4444',
                      borderRadius: '3px',
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
