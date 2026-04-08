'use client';

import { useEffect, useState, use } from 'react';
import Link from 'next/link';
import { ArrowLeft, Loader2, Sparkles } from 'lucide-react';
import styles from '@/styles/admin.module.scss';

interface Question {
  id: number;
  kit_id: number;
  sort_order: number;
  question: string;
  category: string | null;
  expected_signal: string | null;
  follow_up: string | null;
  dimension: string | null;
  difficulty: string;
}

interface Kit {
  id: number;
  name: string;
  description: string | null;
  role_type: string | null;
  stage: string;
  duration_minutes: number;
  focus_dimensions: string | null;
  instructions: string | null;
  ai_generated: number;
  questions: Question[];
}

export default function InterviewKitDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [kit, setKit] = useState<Kit | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(`/api/interview-kits/${id}`);
        const json = await res.json();
        if (json.success) setKit(json.data);
        else setError(json.error || 'Failed to load');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Network error');
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  if (loading) return <div style={{ padding: '40px', textAlign: 'center' }}><Loader2 className="animate-spin" /></div>;
  if (error || !kit) return <div style={{ padding: '20px', color: '#DC2626' }}>{error || 'Not found'}</div>;

  const focusDimensions = kit.focus_dimensions ? JSON.parse(kit.focus_dimensions) : [];

  return (
    <div className={styles.page}>
      <Link href="/admin/interview-kits" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#6B7280', textDecoration: 'none', fontSize: '13px', marginBottom: '20px' }}>
        <ArrowLeft size={14} />
        Back to all kits
      </Link>

      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '24px' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h1 className={styles.pageTitle} style={{ margin: 0 }}>{kit.name}</h1>
            {kit.ai_generated === 1 && (
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: '4px', padding: '4px 10px', background: '#E0F7FA', color: '#006064', borderRadius: '100px', fontSize: '11px', fontWeight: 600 }}>
                <Sparkles size={12} />
                AI-generated
              </span>
            )}
          </div>
          {kit.description && <p style={{ color: '#6B7280', margin: '4px 0 0' }}>{kit.description}</p>}
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', fontSize: '13px', color: '#6B7280', marginBottom: '20px' }}>
        <span>Stage: <strong>{kit.stage}</strong></span>
        <span>· Duration: <strong>{kit.duration_minutes} min</strong></span>
        {kit.role_type && <span>· Role: <strong>{kit.role_type}</strong></span>}
      </div>

      {focusDimensions.length > 0 && (
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#6B7280', marginBottom: '6px', fontWeight: 600 }}>Focus dimensions</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {focusDimensions.map((d: string) => (
              <span key={d} style={{ padding: '4px 10px', background: '#F3F4F6', borderRadius: '100px', fontSize: '12px', color: '#374151' }}>
                {d.replace(/_/g, ' ')}
              </span>
            ))}
          </div>
        </div>
      )}

      {kit.instructions && (
        <div style={{ background: '#FEF3C7', padding: '16px', borderRadius: '8px', marginBottom: '24px', fontSize: '13px', lineHeight: 1.6, color: '#92400E' }}>
          <strong>Interviewer prep:</strong>
          <p style={{ margin: '6px 0 0' }}>{kit.instructions}</p>
        </div>
      )}

      <h2 style={{ fontSize: '18px', marginBottom: '16px' }}>Questions ({kit.questions.length})</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {kit.questions.map((q, i) => (
          <div key={q.id} style={{ border: '1px solid #E5E7EB', borderRadius: '12px', padding: '20px', background: '#FFFFFF' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '8px', gap: '16px' }}>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>
                <span style={{ color: '#9CA3AF', marginRight: '8px' }}>{i + 1}.</span>
                {q.question}
              </h3>
              <div style={{ display: 'flex', gap: '6px', flexShrink: 0 }}>
                {q.category && (
                  <span style={{ padding: '2px 8px', background: '#F3F4F6', borderRadius: '4px', fontSize: '10px', fontWeight: 600, textTransform: 'uppercase' }}>
                    {q.category}
                  </span>
                )}
                <span style={{
                  padding: '2px 8px',
                  borderRadius: '4px',
                  fontSize: '10px',
                  fontWeight: 600,
                  textTransform: 'uppercase',
                  background: q.difficulty === 'hard' ? '#FEE2E2' : q.difficulty === 'easy' ? '#D1FAE5' : '#FEF3C7',
                  color: q.difficulty === 'hard' ? '#991B1B' : q.difficulty === 'easy' ? '#065F46' : '#92400E',
                }}>
                  {q.difficulty}
                </span>
              </div>
            </div>

            {q.expected_signal && (
              <div style={{ marginTop: '12px', fontSize: '13px' }}>
                <div style={{ fontSize: '10px', textTransform: 'uppercase', color: '#059669', fontWeight: 600, marginBottom: '2px' }}>
                  Expected signal
                </div>
                <p style={{ margin: 0, color: '#374151', lineHeight: 1.5 }}>{q.expected_signal}</p>
              </div>
            )}

            {q.follow_up && (
              <div style={{ marginTop: '10px', fontSize: '13px' }}>
                <div style={{ fontSize: '10px', textTransform: 'uppercase', color: '#6B7280', fontWeight: 600, marginBottom: '2px' }}>
                  Follow-up
                </div>
                <p style={{ margin: 0, color: '#6B7280', lineHeight: 1.5, fontStyle: 'italic' }}>{q.follow_up}</p>
              </div>
            )}

            {q.dimension && (
              <div style={{ marginTop: '10px', fontSize: '11px', color: '#6B7280' }}>
                Scores: <strong>{q.dimension.replace(/_/g, ' ')}</strong>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
