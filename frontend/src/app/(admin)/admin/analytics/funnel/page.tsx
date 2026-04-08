'use client';

import { useEffect, useState } from 'react';
import { Loader2, TrendingUp, Users, Calendar, AlertCircle } from 'lucide-react';
import styles from '@/styles/admin.module.scss';

interface Conversion {
  from: string;
  to: string;
  from_count: number;
  to_count: number;
  rate: number;
}

interface SourceStat {
  source: string;
  applications: number;
  hired: number;
  hire_rate: number;
}

interface RejectionReason {
  rejection_reason: string;
  count: number;
}

interface FunnelData {
  filter: { job_id: number | null; date_from: string; date_to: string };
  total_applications: number;
  pipeline: {
    stage_counts: Record<string, number>;
    current_status_counts: Record<string, number>;
    conversions: Conversion[];
  };
  source_quality: SourceStat[];
  rejection_reasons: RejectionReason[];
  time_to_hire: {
    hired_count: number;
    avg_days: number;
    median_days: number;
    min_days: number;
    max_days: number;
  };
}

function pct(rate: number): string {
  return `${(rate * 100).toFixed(1)}%`;
}

function getRateColor(rate: number): string {
  if (rate >= 0.5) return '#059669';
  if (rate >= 0.25) return '#D97706';
  return '#DC2626';
}

export default function FunnelAnalyticsPage() {
  const [data, setData] = useState<FunnelData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch('/api/analytics/funnel');
        const json = await res.json();
        if (json.success) setData(json.data);
        else setError(json.error || 'Failed to load');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Network error');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}><Loader2 className="animate-spin" /></div>;
  if (error || !data) return <div style={{ padding: '20px', color: '#DC2626' }}>{error || 'No data'}</div>;

  const maxCount = Math.max(...Object.values(data.pipeline.stage_counts));

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Hiring Funnel</h1>
          <p className={styles.pageSubtitle}>
            Conversion rates, source quality, and time-to-hire metrics for {data.filter.date_from} → {data.filter.date_to}
          </p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '32px' }}>
        <div style={{ padding: '20px', background: '#F9FAFB', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>Total applications</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#1F2937' }}>{data.total_applications}</div>
        </div>
        <div style={{ padding: '20px', background: '#F9FAFB', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>Hired</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#059669' }}>{data.time_to_hire.hired_count}</div>
        </div>
        <div style={{ padding: '20px', background: '#F9FAFB', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>Avg time to hire</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#1F2937' }}>
            {data.time_to_hire.avg_days.toFixed(0)}<span style={{ fontSize: '14px', fontWeight: 400, marginLeft: '4px' }}>days</span>
          </div>
        </div>
        <div style={{ padding: '20px', background: '#F9FAFB', borderRadius: '12px', border: '1px solid #E5E7EB' }}>
          <div style={{ fontSize: '12px', color: '#6B7280', marginBottom: '4px' }}>Overall conversion</div>
          <div style={{ fontSize: '28px', fontWeight: 700, color: '#17BED0' }}>
            {data.total_applications > 0 ? pct(data.time_to_hire.hired_count / data.total_applications) : '—'}
          </div>
        </div>
      </div>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <TrendingUp size={18} /> Pipeline funnel
        </h2>
        <div style={{ border: '1px solid #E5E7EB', borderRadius: '12px', padding: '24px', background: '#FFFFFF' }}>
          {Object.entries(data.pipeline.stage_counts).map(([stage, count], i, arr) => {
            const pctWidth = maxCount > 0 ? (count / maxCount) * 100 : 0;
            const conv = data.pipeline.conversions.find((c) => c.to === stage);
            return (
              <div key={stage} style={{ marginBottom: i === arr.length - 1 ? 0 : '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                  <span style={{ fontSize: '13px', fontWeight: 600, textTransform: 'capitalize', color: '#1F2937' }}>
                    {stage}
                  </span>
                  <span style={{ fontSize: '13px', color: '#6B7280' }}>
                    <strong style={{ color: '#1F2937' }}>{count}</strong>
                    {conv && (
                      <span style={{ marginLeft: '12px', color: getRateColor(conv.rate) }}>
                        {pct(conv.rate)} from {conv.from}
                      </span>
                    )}
                  </span>
                </div>
                <div style={{ background: '#F3F4F6', borderRadius: '6px', height: '10px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    background: 'linear-gradient(to right, #17BED0, #7C5CBF)',
                    width: `${pctWidth}%`,
                    transition: 'width 0.3s ease',
                  }} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Users size={18} /> Source quality
        </h2>
        <div style={{ border: '1px solid #E5E7EB', borderRadius: '12px', overflow: 'hidden', background: '#FFFFFF' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead style={{ background: '#F9FAFB' }}>
              <tr>
                <th style={{ textAlign: 'left', padding: '12px 16px', fontSize: '11px', textTransform: 'uppercase', color: '#6B7280' }}>Source</th>
                <th style={{ textAlign: 'right', padding: '12px 16px', fontSize: '11px', textTransform: 'uppercase', color: '#6B7280' }}>Apps</th>
                <th style={{ textAlign: 'right', padding: '12px 16px', fontSize: '11px', textTransform: 'uppercase', color: '#6B7280' }}>Hired</th>
                <th style={{ textAlign: 'right', padding: '12px 16px', fontSize: '11px', textTransform: 'uppercase', color: '#6B7280' }}>Hire rate</th>
              </tr>
            </thead>
            <tbody>
              {data.source_quality.map((row, i) => (
                <tr key={i} style={{ borderTop: '1px solid #F3F4F6' }}>
                  <td style={{ padding: '12px 16px', fontSize: '14px', color: '#1F2937' }}>{row.source}</td>
                  <td style={{ padding: '12px 16px', fontSize: '14px', textAlign: 'right', color: '#374151' }}>{row.applications}</td>
                  <td style={{ padding: '12px 16px', fontSize: '14px', textAlign: 'right', color: '#059669', fontWeight: 600 }}>{row.hired}</td>
                  <td style={{ padding: '12px 16px', fontSize: '14px', textAlign: 'right', color: getRateColor(row.hire_rate), fontWeight: 600 }}>
                    {pct(row.hire_rate)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
        <div>
          <h2 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={18} /> Time to hire
          </h2>
          <div style={{ border: '1px solid #E5E7EB', borderRadius: '12px', padding: '20px', background: '#FFFFFF' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              <div>
                <div style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase' }}>Avg</div>
                <div style={{ fontSize: '20px', fontWeight: 700 }}>{data.time_to_hire.avg_days.toFixed(0)} days</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase' }}>Median</div>
                <div style={{ fontSize: '20px', fontWeight: 700 }}>{data.time_to_hire.median_days} days</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase' }}>Fastest</div>
                <div style={{ fontSize: '20px', fontWeight: 700 }}>{data.time_to_hire.min_days} days</div>
              </div>
              <div>
                <div style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase' }}>Slowest</div>
                <div style={{ fontSize: '20px', fontWeight: 700 }}>{data.time_to_hire.max_days} days</div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <h2 style={{ fontSize: '18px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <AlertCircle size={18} /> Rejection reasons
          </h2>
          <div style={{ border: '1px solid #E5E7EB', borderRadius: '12px', padding: '20px', background: '#FFFFFF' }}>
            {data.rejection_reasons.length === 0 ? (
              <p style={{ margin: 0, color: '#6B7280', fontSize: '13px' }}>No rejections in this period.</p>
            ) : (
              data.rejection_reasons.slice(0, 6).map((r, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', borderTop: i > 0 ? '1px solid #F3F4F6' : 'none', fontSize: '13px' }}>
                  <span style={{ color: '#374151' }}>{r.rejection_reason}</span>
                  <strong style={{ color: '#1F2937' }}>{r.count}</strong>
                </div>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
