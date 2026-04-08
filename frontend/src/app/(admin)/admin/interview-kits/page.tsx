'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Sparkles, Plus, Loader2, BookOpen, Clock, Target } from 'lucide-react';
import styles from '@/styles/admin.module.scss';

interface Kit {
  id: number;
  name: string;
  description: string | null;
  role_type: string | null;
  stage: string;
  duration_minutes: number;
  focus_dimensions: string | null;
  instructions: string | null;
  is_published: number;
  ai_generated: number;
  created_at: string;
}

interface Job {
  id: number;
  title: string;
  department: string;
  slug: string;
}

const STAGES = [
  { value: 'screening', label: 'Screening (30 min)' },
  { value: 'technical', label: 'Technical Deep Dive (60-90 min)' },
  { value: 'systems', label: 'Systems Design (60 min)' },
  { value: 'culture', label: 'Culture & Values (45 min)' },
  { value: 'final', label: 'Final Round (45 min)' },
];

export default function InterviewKitsPage() {
  const [kits, setKits] = useState<Kit[]>([]);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [generating, setGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [showGenerator, setShowGenerator] = useState(false);
  const [genJobId, setGenJobId] = useState<number | ''>('');
  const [genStage, setGenStage] = useState('technical');

  async function loadKits() {
    setLoading(true);
    try {
      const [kitsRes, jobsRes] = await Promise.all([
        fetch('/api/interview-kits'),
        fetch('/api/jobs?perPage=100'),
      ]);
      const kitsJson = await kitsRes.json();
      const jobsJson = await jobsRes.json();
      if (kitsJson.success) setKits(kitsJson.data);
      if (jobsJson.success) setJobs(jobsJson.data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load');
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadKits();
  }, []);

  async function runGenerate() {
    if (!genJobId) {
      setError('Please select a job');
      return;
    }
    setGenerating(true);
    setError(null);
    try {
      const res = await fetch('/api/ai/generate-kit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ job_id: genJobId, stage: genStage, save: true }),
      });
      const json = await res.json();
      if (!json.success) {
        setError(json.error || 'Failed to generate');
      } else {
        setShowGenerator(false);
        await loadKits();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error');
    } finally {
      setGenerating(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm('Delete this interview kit?')) return;
    try {
      const res = await fetch(`/api/interview-kits/${id}`, { method: 'DELETE' });
      if (res.ok) await loadKits();
    } catch {
      setError('Failed to delete');
    }
  }

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Interview Kits</h1>
          <p className={styles.pageSubtitle}>
            Structured question banks per role and stage. Generate kits with AI or build manually.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setShowGenerator(true)}
          className={styles.primaryButton}
          style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
        >
          <Sparkles size={16} />
          Generate with AI
        </button>
      </div>

      {error && (
        <div style={{ padding: '12px', background: '#FEE2E2', color: '#991B1B', borderRadius: '8px', marginBottom: '16px' }}>
          {error}
        </div>
      )}

      {showGenerator && (
        <div style={{
          border: '1px solid #E5E7EB',
          borderRadius: '12px',
          padding: '24px',
          marginBottom: '24px',
          background: '#F9FAFB',
        }}>
          <h3 style={{ marginTop: 0 }}>Generate Interview Kit with AI</h3>
          <p style={{ fontSize: '13px', color: '#6B7280' }}>
            Claude will read the job description and produce a structured kit with 5-8 questions,
            scoring dimensions, and interviewer prep notes.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Job</label>
              <select
                value={genJobId}
                onChange={(e) => setGenJobId(e.target.value ? parseInt(e.target.value, 10) : '')}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #E5E7EB' }}
              >
                <option value="">Select a job…</option>
                {jobs.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.title} · {job.department}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>Stage</label>
              <select
                value={genStage}
                onChange={(e) => setGenStage(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #E5E7EB' }}
              >
                {STAGES.map((s) => (
                  <option key={s.value} value={s.value}>{s.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginTop: '16px', justifyContent: 'flex-end' }}>
            <button
              type="button"
              onClick={() => setShowGenerator(false)}
              style={{ padding: '8px 16px', background: 'transparent', border: '1px solid #E5E7EB', borderRadius: '6px', cursor: 'pointer' }}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={runGenerate}
              disabled={generating || !genJobId}
              style={{
                padding: '8px 16px',
                background: generating ? '#9CA3AF' : '#17BED0',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '6px',
                cursor: generating || !genJobId ? 'not-allowed' : 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              {generating ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
              {generating ? 'Generating…' : 'Generate'}
            </button>
          </div>
        </div>
      )}

      {loading ? (
        <div style={{ padding: '40px', textAlign: 'center' }}>
          <Loader2 size={24} className="animate-spin" />
        </div>
      ) : kits.length === 0 ? (
        <div style={{
          padding: '60px 20px',
          textAlign: 'center',
          background: '#F9FAFB',
          borderRadius: '12px',
          border: '1px dashed #E5E7EB',
        }}>
          <BookOpen size={32} color="#9CA3AF" style={{ marginBottom: '12px' }} />
          <h3 style={{ margin: 0 }}>No interview kits yet</h3>
          <p style={{ fontSize: '14px', color: '#6B7280', marginTop: '8px' }}>
            Generate your first kit with AI from a job description, or create one manually.
          </p>
        </div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '16px' }}>
          {kits.map((kit) => (
            <div
              key={kit.id}
              style={{
                border: '1px solid #E5E7EB',
                borderRadius: '12px',
                padding: '20px',
                background: '#FFFFFF',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px' }}>
                <h3 style={{ margin: 0, fontSize: '16px' }}>{kit.name}</h3>
                {kit.ai_generated === 1 && (
                  <span title="AI-generated">
                    <Sparkles size={14} color="#17BED0" />
                  </span>
                )}
              </div>
              {kit.description && (
                <p style={{ fontSize: '13px', color: '#6B7280', lineHeight: 1.5, margin: '0 0 12px' }}>
                  {kit.description}
                </p>
              )}
              <div style={{ display: 'flex', gap: '10px', fontSize: '12px', color: '#6B7280', marginBottom: '12px' }}>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Target size={12} />
                  {kit.stage}
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  <Clock size={12} />
                  {kit.duration_minutes} min
                </span>
                {kit.role_type && <span>· {kit.role_type}</span>}
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <Link
                  href={`/admin/interview-kits/${kit.id}`}
                  style={{
                    padding: '6px 12px',
                    background: '#F3F4F6',
                    color: '#1F2937',
                    borderRadius: '6px',
                    fontSize: '12px',
                    textDecoration: 'none',
                    fontWeight: 500,
                  }}
                >
                  View / Edit
                </Link>
                <button
                  type="button"
                  onClick={() => handleDelete(kit.id)}
                  style={{
                    padding: '6px 12px',
                    background: 'transparent',
                    color: '#DC2626',
                    border: 'none',
                    fontSize: '12px',
                    cursor: 'pointer',
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
