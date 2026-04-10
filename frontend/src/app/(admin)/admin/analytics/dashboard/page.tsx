'use client';

import { useEffect, useState } from 'react';
import {
  Loader2, TrendingUp, Users, Briefcase, Clock, CheckCircle,
  XCircle, Target, BarChart3, ArrowUpRight, ArrowDownRight,
} from 'lucide-react';
import styles from '@/styles/admin.module.scss';

interface KpiData {
  period: { months: number; date_from: string };
  summary: {
    total_candidates: number;
    total_hired: number;
    total_rejected: number;
    open_jobs: number;
    active_pipeline: number;
    offer_acceptance_rate: number;
  };
  time_to_hire: {
    count: number;
    avg: number;
    median: number;
    min: number;
    max: number;
  };
  time_to_hire_by_job: Array<{
    job_id: number;
    job_title: string;
    avg_days: number;
    hired_count: number;
  }>;
  sources: Array<{
    source: string;
    total: number;
    hired: number;
    in_pipeline: number;
    hire_rate: number;
  }>;
  conversions: Array<{
    from: string;
    to: string;
    moved: number;
    total: number;
    rate: number;
  }>;
  monthly_trends: Array<{
    month: string;
    applications: number;
    hired: number;
    rejected: number;
  }>;
  pipeline_by_status: Array<{
    status: string;
    count: number;
  }>;
  stage_velocity: Array<{
    stage: string;
    avg_days: number;
  }>;
  top_jobs: Array<{
    job_id: number;
    title: string;
    candidates: number;
    hired: number;
    active: number;
  }>;
}

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
  new: '#6B7280',
  screening: '#3B82F6',
  phone_screen: '#14B8A6',
  technical: '#8B5CF6',
  team_interview: '#F97316',
  culture_chat: '#EC4899',
  offer: '#22C55E',
  hired: '#059669',
  rejected: '#EF4444',
  on_hold: '#F59E0B',
  withdrawn: '#9CA3AF',
};

function pct(rate: number): string {
  return `${rate.toFixed(1)}%`;
}

function rateColor(rate: number): string {
  if (rate >= 50) return '#059669';
  if (rate >= 25) return '#D97706';
  return '#DC2626';
}

function Card({ children, style }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      background: '#FFFFFF',
      borderRadius: '12px',
      border: '1px solid #E5E7EB',
      padding: '20px',
      ...style,
    }}>
      {children}
    </div>
  );
}

function KpiCard({
  icon,
  iconBg,
  iconColor,
  label,
  value,
  suffix,
  sub,
}: {
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
  label: string;
  value: string | number;
  suffix?: string;
  sub?: string;
}) {
  return (
    <Card>
      <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
        <div style={{
          width: 44, height: 44, borderRadius: '11px', background: iconBg,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}>
          {icon}
        </div>
        <div>
          <div style={{ fontSize: '26px', fontWeight: 700, color: '#1F2937', lineHeight: 1.1 }}>
            {value}
            {suffix && <span style={{ fontSize: '14px', fontWeight: 400, color: '#6B7280', marginLeft: '3px' }}>{suffix}</span>}
          </div>
          <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '2px' }}>{label}</div>
          {sub && <div style={{ fontSize: '11px', color: '#9CA3AF', marginTop: '1px' }}>{sub}</div>}
        </div>
      </div>
    </Card>
  );
}

function SectionTitle({ icon, children }: { icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <h2 style={{
      fontSize: '16px', fontWeight: 600, marginBottom: '16px', color: '#1F2937',
      display: 'flex', alignItems: 'center', gap: '8px',
    }}>
      {icon} {children}
    </h2>
  );
}

export default function KpiDashboardPage() {
  const [data, setData] = useState<KpiData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [months, setMonths] = useState(6);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/analytics/kpi?months=${months}`)
      .then(res => res.json())
      .then(json => {
        if (json.success) setData(json.data);
        else setError(json.error || 'Failed to load');
      })
      .catch(err => setError(err instanceof Error ? err.message : 'Network error'))
      .finally(() => setLoading(false));
  }, [months]);

  if (loading) {
    return (
      <div className={styles.page} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '400px' }}>
        <Loader2 size={32} className="animate-spin" style={{ color: '#17BED0' }} />
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className={styles.page}>
        <div style={{ padding: '40px', textAlign: 'center', color: '#DC2626' }}>{error || 'No data'}</div>
      </div>
    );
  }

  const s = data.summary;
  const maxPipeline = Math.max(...data.pipeline_by_status.map(p => p.count), 1);
  const maxMonthly = Math.max(...data.monthly_trends.map(m => m.applications), 1);

  return (
    <div className={styles.page}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
        <div>
          <h1 className={styles.pageTitle} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <BarChart3 size={24} /> KPI Dashboard
          </h1>
          <p style={{ fontSize: '13px', color: '#6B7280', margin: '4px 0 0' }}>
            Hiring metrics for the last {months} months (since {data.period.date_from})
          </p>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          {[3, 6, 12].map(m => (
            <button
              key={m}
              onClick={() => setMonths(m)}
              style={{
                padding: '6px 14px',
                borderRadius: '6px',
                border: months === m ? '1px solid #17BED0' : '1px solid #D1D5DB',
                background: months === m ? '#F0FDFA' : '#FFFFFF',
                color: months === m ? '#0EA5B7' : '#6B7280',
                fontSize: '12px',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {m}m
            </button>
          ))}
        </div>
      </div>

      {/* Summary KPI cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '28px' }}>
        <KpiCard
          icon={<Users size={20} color="#3B82F6" />}
          iconBg="#EFF6FF" iconColor="#3B82F6"
          label="Total Candidates" value={s.total_candidates}
        />
        <KpiCard
          icon={<CheckCircle size={20} color="#059669" />}
          iconBg="#ECFDF5" iconColor="#059669"
          label="Hired" value={s.total_hired}
          sub={s.total_candidates > 0 ? `${((s.total_hired / s.total_candidates) * 100).toFixed(1)}% overall` : undefined}
        />
        <KpiCard
          icon={<Clock size={20} color="#F59E0B" />}
          iconBg="#FFFBEB" iconColor="#F59E0B"
          label="Avg Time to Hire" value={data.time_to_hire.avg} suffix="days"
          sub={`Median: ${data.time_to_hire.median}d`}
        />
        <KpiCard
          icon={<Target size={20} color="#17BED0" />}
          iconBg="#F0FDFA" iconColor="#17BED0"
          label="Offer Acceptance" value={`${s.offer_acceptance_rate}%`}
        />
        <KpiCard
          icon={<Briefcase size={20} color="#8B5CF6" />}
          iconBg="#F5F3FF" iconColor="#8B5CF6"
          label="Open Jobs" value={s.open_jobs}
          sub={`${s.active_pipeline} in pipeline`}
        />
        <KpiCard
          icon={<XCircle size={20} color="#EF4444" />}
          iconBg="#FEF2F2" iconColor="#EF4444"
          label="Rejected" value={s.total_rejected}
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '28px' }}>
        {/* Conversion funnel */}
        <Card>
          <SectionTitle icon={<TrendingUp size={16} />}>Stage Conversions</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {data.conversions.map(c => (
              <div key={`${c.from}-${c.to}`}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px', fontSize: '12px' }}>
                  <span style={{ color: '#374151' }}>
                    {STATUS_LABELS[c.from] || c.from} → {STATUS_LABELS[c.to] || c.to}
                  </span>
                  <span style={{ fontWeight: 600, color: rateColor(c.rate) }}>
                    {pct(c.rate)}
                    <span style={{ color: '#9CA3AF', fontWeight: 400, marginLeft: '6px' }}>({c.moved}/{c.total})</span>
                  </span>
                </div>
                <div style={{ background: '#F3F4F6', borderRadius: '4px', height: '8px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${Math.min(c.rate, 100)}%`,
                    background: `linear-gradient(90deg, #17BED0, #7C5CBF)`,
                    borderRadius: '4px',
                    transition: 'width 0.4s ease',
                  }} />
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Monthly trends */}
        <Card>
          <SectionTitle icon={<BarChart3 size={16} />}>Monthly Trends</SectionTitle>
          {data.monthly_trends.length === 0 ? (
            <p style={{ color: '#9CA3AF', fontSize: '13px' }}>No data yet.</p>
          ) : (
            <>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '8px', fontSize: '11px' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <span style={{ width: 10, height: 10, borderRadius: 2, background: '#17BED0', display: 'inline-block' }} /> Applications
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '12px' }}>
                  <span style={{ width: 10, height: 10, borderRadius: 2, background: '#059669', display: 'inline-block' }} /> Hired
                </span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px', marginLeft: '12px' }}>
                  <span style={{ width: 10, height: 10, borderRadius: 2, background: '#EF4444', display: 'inline-block' }} /> Rejected
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '140px' }}>
                {data.monthly_trends.map(m => (
                  <div key={m.month} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: '#1F2937' }}>{m.applications}</div>
                    <div style={{ display: 'flex', gap: '1px', alignItems: 'flex-end', width: '100%', justifyContent: 'center' }}>
                      <div style={{
                        width: '30%', maxWidth: '16px',
                        height: `${(m.applications / maxMonthly) * 100}px`,
                        background: '#17BED0', borderRadius: '3px 3px 0 0',
                        minHeight: m.applications > 0 ? '4px' : '0',
                      }} />
                      <div style={{
                        width: '30%', maxWidth: '16px',
                        height: `${(m.hired / maxMonthly) * 100}px`,
                        background: '#059669', borderRadius: '3px 3px 0 0',
                        minHeight: m.hired > 0 ? '4px' : '0',
                      }} />
                      <div style={{
                        width: '30%', maxWidth: '16px',
                        height: `${(m.rejected / maxMonthly) * 100}px`,
                        background: '#EF4444', borderRadius: '3px 3px 0 0',
                        minHeight: m.rejected > 0 ? '4px' : '0',
                      }} />
                    </div>
                    <div style={{ fontSize: '10px', color: '#9CA3AF', whiteSpace: 'nowrap' }}>
                      {m.month.slice(5)}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '28px' }}>
        {/* Source breakdown */}
        <Card>
          <SectionTitle icon={<ArrowUpRight size={16} />}>Source Breakdown</SectionTitle>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
            <thead>
              <tr style={{ borderBottom: '2px solid #F3F4F6' }}>
                <th style={{ textAlign: 'left', padding: '8px 4px', fontSize: '11px', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase' }}>Source</th>
                <th style={{ textAlign: 'right', padding: '8px 4px', fontSize: '11px', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase' }}>Total</th>
                <th style={{ textAlign: 'right', padding: '8px 4px', fontSize: '11px', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase' }}>Hired</th>
                <th style={{ textAlign: 'right', padding: '8px 4px', fontSize: '11px', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase' }}>Active</th>
                <th style={{ textAlign: 'right', padding: '8px 4px', fontSize: '11px', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase' }}>Rate</th>
              </tr>
            </thead>
            <tbody>
              {data.sources.map((src, i) => (
                <tr key={i} style={{ borderBottom: '1px solid #F9FAFB' }}>
                  <td style={{ padding: '10px 4px', color: '#1F2937', fontWeight: 500 }}>{src.source}</td>
                  <td style={{ padding: '10px 4px', textAlign: 'right', color: '#374151' }}>{src.total}</td>
                  <td style={{ padding: '10px 4px', textAlign: 'right', color: '#059669', fontWeight: 600 }}>{src.hired}</td>
                  <td style={{ padding: '10px 4px', textAlign: 'right', color: '#3B82F6' }}>{src.in_pipeline}</td>
                  <td style={{ padding: '10px 4px', textAlign: 'right', fontWeight: 600, color: rateColor(src.hire_rate) }}>
                    {pct(src.hire_rate)}
                  </td>
                </tr>
              ))}
              {data.sources.length === 0 && (
                <tr><td colSpan={5} style={{ padding: '16px 4px', color: '#9CA3AF', textAlign: 'center' }}>No data</td></tr>
              )}
            </tbody>
          </table>
        </Card>

        {/* Time-to-hire per job */}
        <Card>
          <SectionTitle icon={<Clock size={16} />}>Time to Hire by Role</SectionTitle>
          {data.time_to_hire_by_job.length === 0 ? (
            <p style={{ color: '#9CA3AF', fontSize: '13px' }}>No hires in this period.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {data.time_to_hire_by_job.map(j => {
                const maxDays = Math.max(...data.time_to_hire_by_job.map(jj => jj.avg_days), 1);
                return (
                  <div key={j.job_id}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}>
                      <span style={{ fontSize: '13px', color: '#1F2937', fontWeight: 500 }}>{j.job_title}</span>
                      <span style={{ fontSize: '12px', color: '#6B7280' }}>
                        <strong style={{ color: '#1F2937' }}>{j.avg_days}d</strong> avg
                        <span style={{ marginLeft: '8px', color: '#9CA3AF' }}>{j.hired_count} hired</span>
                      </span>
                    </div>
                    <div style={{ background: '#F3F4F6', borderRadius: '4px', height: '6px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        width: `${(j.avg_days / maxDays) * 100}%`,
                        background: j.avg_days <= data.time_to_hire.avg ? '#059669' : '#F59E0B',
                        borderRadius: '4px',
                      }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '28px' }}>
        {/* Pipeline snapshot */}
        <Card>
          <SectionTitle icon={<Users size={16} />}>Pipeline Snapshot</SectionTitle>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {data.pipeline_by_status.map(p => (
              <div key={p.status} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{ width: '100px', fontSize: '12px', color: '#6B7280', flexShrink: 0 }}>
                  {STATUS_LABELS[p.status] || p.status}
                </div>
                <div style={{ flex: 1, height: '20px', background: '#F3F4F6', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    height: '100%',
                    width: `${(p.count / maxPipeline) * 100}%`,
                    background: STATUS_COLORS[p.status] || '#6B7280',
                    borderRadius: '4px',
                    minWidth: p.count > 0 ? '16px' : '0',
                  }} />
                </div>
                <div style={{ width: '32px', textAlign: 'right', fontSize: '13px', fontWeight: 600, color: '#1F2937' }}>
                  {p.count}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Stage velocity */}
        <Card>
          <SectionTitle icon={<ArrowDownRight size={16} />}>Avg Days per Stage</SectionTitle>
          {data.stage_velocity.length === 0 ? (
            <p style={{ color: '#9CA3AF', fontSize: '13px' }}>Not enough data yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {data.stage_velocity.map(sv => {
                const maxV = Math.max(...data.stage_velocity.map(s => s.avg_days), 1);
                return (
                  <div key={sv.stage} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <div style={{ width: '100px', fontSize: '12px', color: '#6B7280', flexShrink: 0 }}>
                      {STATUS_LABELS[sv.stage] || sv.stage}
                    </div>
                    <div style={{ flex: 1, height: '16px', background: '#F3F4F6', borderRadius: '4px', overflow: 'hidden' }}>
                      <div style={{
                        height: '100%',
                        width: `${(sv.avg_days / maxV) * 100}%`,
                        background: sv.avg_days <= 7 ? '#059669' : sv.avg_days <= 14 ? '#F59E0B' : '#EF4444',
                        borderRadius: '4px',
                      }} />
                    </div>
                    <div style={{ width: '50px', textAlign: 'right', fontSize: '12px', fontWeight: 600, color: '#1F2937' }}>
                      {sv.avg_days}d
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Card>
      </div>

      {/* Top jobs */}
      <Card style={{ marginBottom: '28px' }}>
        <SectionTitle icon={<Briefcase size={16} />}>Top Jobs by Candidates</SectionTitle>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
          <thead>
            <tr style={{ borderBottom: '2px solid #F3F4F6' }}>
              <th style={{ textAlign: 'left', padding: '8px 4px', fontSize: '11px', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase' }}>Job</th>
              <th style={{ textAlign: 'right', padding: '8px 4px', fontSize: '11px', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase' }}>Candidates</th>
              <th style={{ textAlign: 'right', padding: '8px 4px', fontSize: '11px', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase' }}>Active</th>
              <th style={{ textAlign: 'right', padding: '8px 4px', fontSize: '11px', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase' }}>Hired</th>
              <th style={{ textAlign: 'right', padding: '8px 4px', fontSize: '11px', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase' }}>Conv.</th>
            </tr>
          </thead>
          <tbody>
            {data.top_jobs.map(j => (
              <tr key={j.job_id} style={{ borderBottom: '1px solid #F9FAFB' }}>
                <td style={{ padding: '10px 4px', color: '#1F2937', fontWeight: 500 }}>{j.title}</td>
                <td style={{ padding: '10px 4px', textAlign: 'right', color: '#374151' }}>{j.candidates}</td>
                <td style={{ padding: '10px 4px', textAlign: 'right', color: '#3B82F6' }}>{j.active}</td>
                <td style={{ padding: '10px 4px', textAlign: 'right', color: '#059669', fontWeight: 600 }}>{j.hired}</td>
                <td style={{ padding: '10px 4px', textAlign: 'right', fontWeight: 600, color: rateColor(j.candidates > 0 ? (j.hired / j.candidates) * 100 : 0) }}>
                  {j.candidates > 0 ? pct((j.hired / j.candidates) * 100) : '—'}
                </td>
              </tr>
            ))}
            {data.top_jobs.length === 0 && (
              <tr><td colSpan={5} style={{ padding: '16px 4px', color: '#9CA3AF', textAlign: 'center' }}>No published jobs</td></tr>
            )}
          </tbody>
        </table>
      </Card>

      {/* Time-to-hire summary */}
      <Card>
        <SectionTitle icon={<Clock size={16} />}>Time to Hire Distribution</SectionTitle>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px' }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase', marginBottom: '4px' }}>Average</div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#1F2937' }}>{data.time_to_hire.avg}<span style={{ fontSize: '14px', fontWeight: 400, marginLeft: '2px' }}>d</span></div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase', marginBottom: '4px' }}>Median</div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#1F2937' }}>{data.time_to_hire.median}<span style={{ fontSize: '14px', fontWeight: 400, marginLeft: '2px' }}>d</span></div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase', marginBottom: '4px' }}>Fastest</div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#059669' }}>{data.time_to_hire.min}<span style={{ fontSize: '14px', fontWeight: 400, marginLeft: '2px' }}>d</span></div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '11px', color: '#6B7280', textTransform: 'uppercase', marginBottom: '4px' }}>Slowest</div>
            <div style={{ fontSize: '28px', fontWeight: 700, color: '#DC2626' }}>{data.time_to_hire.max}<span style={{ fontSize: '14px', fontWeight: 400, marginLeft: '2px' }}>d</span></div>
          </div>
        </div>
      </Card>
    </div>
  );
}
