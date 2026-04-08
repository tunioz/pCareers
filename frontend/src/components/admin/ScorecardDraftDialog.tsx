'use client';

import { useState } from 'react';
import { Sparkles, Loader2, X, Check, AlertCircle } from 'lucide-react';

interface ScorecardDraftDialogProps {
  candidateId: number;
  stage: string;
  onAccept: (drafted: DraftedScorecard) => void;
  onClose: () => void;
}

export interface DraftedScorecard {
  scores: {
    technical_depth: { score: number | null; notes: string };
    problem_solving: { score: number | null; notes: string };
    ownership: { score: number | null; notes: string };
    communication: { score: number | null; notes: string };
    cultural_add: { score: number | null; notes: string };
    growth_potential: { score: number | null; notes: string };
  };
  overall: {
    recommendation: string;
    one_line_summary: string;
    key_strengths: string[];
    key_concerns: string[];
    red_flags: string[];
    key_quotes: string[];
  };
  confidence: string;
}

export function ScorecardDraftDialog({
  candidateId,
  stage,
  onAccept,
  onClose,
}: ScorecardDraftDialogProps) {
  const [step, setStep] = useState<'input' | 'preview'>('input');
  const [rawNotes, setRawNotes] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [draft, setDraft] = useState<DraftedScorecard | null>(null);

  async function runDraft() {
    if (rawNotes.trim().length < 30) {
      setError('Please enter at least 30 characters of notes.');
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/ai/draft-scorecard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          candidate_id: candidateId,
          stage,
          raw_notes: rawNotes,
        }),
      });
      const json = await res.json();
      if (!json.success) {
        setError(json.error || 'Failed to generate draft');
      } else {
        setDraft(json.data.draft);
        setStep('preview');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px',
    }}
      onClick={onClose}
    >
      <div style={{
        background: '#FFFFFF',
        borderRadius: '16px',
        maxWidth: '680px',
        width: '100%',
        maxHeight: '90vh',
        overflowY: 'auto',
        padding: '32px',
      }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <Sparkles size={22} color="#17BED0" />
            <div>
              <h2 style={{ margin: 0, fontSize: '20px' }}>AI Scorecard Draft</h2>
              <p style={{ margin: '4px 0 0', fontSize: '13px', color: '#6B7280' }}>
                Paste your raw interview notes. AI will propose a scorecard — you review and edit before saving.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: '8px',
              color: '#6B7280',
            }}
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        {error && (
          <div style={{
            padding: '12px 16px',
            background: '#FEE2E2',
            color: '#991B1B',
            borderRadius: '8px',
            marginBottom: '16px',
            fontSize: '13px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
          }}>
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {step === 'input' && (
          <>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 600, marginBottom: '6px' }}>
              Raw interview notes
            </label>
            <textarea
              value={rawNotes}
              onChange={(e) => setRawNotes(e.target.value)}
              rows={12}
              placeholder="E.g. &quot;Talked through async/await and backpressure. Strong on event loop, confused about queues. Proposed Redis token bucket for rate limiting. Asked thoughtful questions about our scale.&quot;"
              style={{
                width: '100%',
                padding: '12px',
                border: '1px solid #E5E7EB',
                borderRadius: '8px',
                fontSize: '14px',
                fontFamily: 'inherit',
                resize: 'vertical',
                outline: 'none',
              }}
            />
            <div style={{ fontSize: '12px', color: '#6B7280', marginTop: '4px' }}>
              {rawNotes.length} / 20000 characters
            </div>

            <div style={{ display: 'flex', gap: '10px', marginTop: '20px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={onClose}
                style={{
                  padding: '10px 20px',
                  background: 'transparent',
                  color: '#6B7280',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={runDraft}
                disabled={loading || rawNotes.trim().length < 30}
                style={{
                  padding: '10px 20px',
                  background: loading ? '#9CA3AF' : '#17BED0',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: loading || rawNotes.trim().length < 30 ? 'not-allowed' : 'pointer',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                {loading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                {loading ? 'Generating…' : 'Generate Draft'}
              </button>
            </div>
          </>
        )}

        {step === 'preview' && draft && (
          <>
            <div style={{
              padding: '12px 16px',
              background: '#FEF3C7',
              color: '#92400E',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '13px',
              lineHeight: 1.5,
            }}>
              <strong>AI-generated draft.</strong> This is a suggestion based on your notes.
              Review every score before accepting. You are responsible for the final evaluation.
            </div>

            <div style={{ marginBottom: '20px' }}>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#6B7280', marginBottom: '4px' }}>
                Recommendation · Confidence: {draft.confidence}
              </div>
              <div style={{
                padding: '12px 16px',
                background: '#F3F4F6',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: 600,
                color: '#1F2937',
              }}>
                {draft.overall.recommendation.replace(/_/g, ' ').toUpperCase()}
              </div>
              <p style={{ margin: '8px 0 0', fontSize: '13px', color: '#6B7280' }}>
                {draft.overall.one_line_summary}
              </p>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px', marginBottom: '20px' }}>
              {Object.entries(draft.scores).map(([key, val]) => (
                <div key={key} style={{
                  padding: '12px',
                  background: '#F9FAFB',
                  borderRadius: '8px',
                  border: '1px solid #E5E7EB',
                }}>
                  <div style={{ fontSize: '12px', color: '#6B7280', textTransform: 'capitalize' }}>
                    {key.replace(/_/g, ' ')}
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: 700, color: '#1F2937' }}>
                    {val.score !== null ? `${val.score}/5` : '—'}
                  </div>
                  {val.notes && (
                    <p style={{ margin: '4px 0 0', fontSize: '11px', color: '#6B7280', lineHeight: 1.4 }}>
                      {val.notes}
                    </p>
                  )}
                </div>
              ))}
            </div>

            {draft.overall.key_strengths.length > 0 && (
              <div style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#059669', marginBottom: '6px', fontWeight: 600 }}>
                  Key strengths
                </div>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#1F2937' }}>
                  {draft.overall.key_strengths.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            )}

            {draft.overall.key_concerns.length > 0 && (
              <div style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#D97706', marginBottom: '6px', fontWeight: 600 }}>
                  Concerns
                </div>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#1F2937' }}>
                  {draft.overall.key_concerns.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            )}

            {draft.overall.red_flags.length > 0 && (
              <div style={{ marginBottom: '14px' }}>
                <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#DC2626', marginBottom: '6px', fontWeight: 600 }}>
                  Red flags
                </div>
                <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#1F2937' }}>
                  {draft.overall.red_flags.map((s, i) => <li key={i}>{s}</li>)}
                </ul>
              </div>
            )}

            <div style={{ display: 'flex', gap: '10px', marginTop: '24px', justifyContent: 'flex-end' }}>
              <button
                type="button"
                onClick={() => setStep('input')}
                style={{
                  padding: '10px 20px',
                  background: 'transparent',
                  color: '#6B7280',
                  border: '1px solid #E5E7EB',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 500,
                }}
              >
                Back to edit
              </button>
              <button
                type="button"
                onClick={() => onAccept(draft)}
                style={{
                  padding: '10px 20px',
                  background: '#17BED0',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontWeight: 600,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                }}
              >
                <Check size={14} />
                Accept draft
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
