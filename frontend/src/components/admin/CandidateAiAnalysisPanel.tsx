'use client';

import { useEffect, useState } from 'react';
import { Sparkles, Loader2, AlertCircle, RefreshCw, CheckCircle, AlertTriangle, XCircle, Info } from 'lucide-react';

interface Props {
  candidateId: number;
}

interface Analysis {
  id?: number;
  overall_summary: string;
  strengths: string[];
  concerns: string[];
  red_flags: string[];
  scorecard_consensus?: {
    dimensions_agreement: string;
    disagreements: string[];
  };
  reference_synthesis?: {
    overall_sentiment: string;
    key_signals: string[];
  };
  data_gaps?: string[];
  recommendation: string;
  recommendation_rationale?: string;
  confidence: string;
  next_steps_suggested?: string[];
  sources_analyzed?: Record<string, unknown>;
  created_at?: string;
  generated_by?: string;
}

function recColor(rec: string): string {
  if (rec === 'strong_hire') return '#059669';
  if (rec === 'hire') return '#10B981';
  if (rec === 'lean_hire') return '#D97706';
  if (rec === 'no_hire') return '#DC2626';
  if (rec === 'strong_no_hire') return '#991B1B';
  return '#6B7280';
}

function confColor(conf: string): string {
  if (conf === 'high') return '#059669';
  if (conf === 'medium') return '#D97706';
  return '#DC2626';
}

export function CandidateAiAnalysisPanel({ candidateId }: Props) {
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const [loading, setLoading] = useState(true);
  const [running, setRunning] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function loadCached() {
    try {
      const res = await fetch(`/api/ai/analyze-candidate?candidate_id=${candidateId}`);
      const json = await res.json();
      if (json.success && json.data) {
        setAnalysis(json.data);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCached();

  }, [candidateId]);

  async function runAnalysis() {
    setRunning(true);
    setError(null);
    try {
      const res = await fetch('/api/ai/analyze-candidate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidate_id: candidateId }),
      });
      const json = await res.json();
      if (!json.success) {
        setError(json.error || 'Analysis failed');
      } else {
        setAnalysis(json.data.analysis);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error');
    } finally {
      setRunning(false);
    }
  }

  if (loading) {
    return (
      <div style={{ padding: '20px', textAlign: 'center', color: '#6B7280' }}>
        <Loader2 size={20} className="animate-spin" />
      </div>
    );
  }

  return (
    <div style={{
      border: '1px solid #E5E7EB',
      borderRadius: '12px',
      padding: '24px',
      background: 'linear-gradient(135deg, #F0FDFA 0%, #FAFAFA 100%)',
      marginBottom: '24px',
    }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Sparkles size={20} color="#17BED0" />
          <div>
            <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>AI Candidate Analysis</h3>
            <p style={{ margin: '2px 0 0', fontSize: '12px', color: '#6B7280' }}>
              Unified synthesis of CV, LinkedIn, notes, scorecards, and references
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={runAnalysis}
          disabled={running}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 16px',
            background: running ? '#9CA3AF' : '#17BED0',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 600,
            cursor: running ? 'not-allowed' : 'pointer',
          }}
        >
          {running ? <Loader2 size={14} className="animate-spin" /> : analysis ? <RefreshCw size={14} /> : <Sparkles size={14} />}
          {running ? 'Analyzing…' : analysis ? 'Re-analyze' : 'Run analysis'}
        </button>
      </div>

      {error && (
        <div style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: '8px',
          padding: '12px',
          background: '#FEE2E2',
          color: '#991B1B',
          borderRadius: '8px',
          fontSize: '13px',
          marginBottom: '12px',
        }}>
          <AlertCircle size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
          {error}
        </div>
      )}

      {!analysis && !error && (
        <div style={{ padding: '20px 0', textAlign: 'center', fontSize: '13px', color: '#6B7280' }}>
          No analysis yet. Click "Run analysis" to synthesize all available data.
        </div>
      )}

      {analysis && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{
            padding: '16px',
            background: '#FFFFFF',
            borderRadius: '8px',
            border: '1px solid #E5E7EB',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
              <span style={{
                padding: '4px 12px',
                borderRadius: '100px',
                fontSize: '11px',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                color: '#FFFFFF',
                background: recColor(analysis.recommendation),
              }}>
                {analysis.recommendation.replace(/_/g, ' ')}
              </span>
              <span style={{ fontSize: '11px', color: confColor(analysis.confidence), fontWeight: 600 }}>
                Confidence: {analysis.confidence}
              </span>
            </div>
            <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.5, color: '#1F2937' }}>
              {analysis.overall_summary}
            </p>
            {analysis.recommendation_rationale && (
              <p style={{ margin: '8px 0 0', fontSize: '12px', color: '#6B7280', fontStyle: 'italic' }}>
                {analysis.recommendation_rationale}
              </p>
            )}
          </div>

          {analysis.strengths && analysis.strengths.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <CheckCircle size={14} color="#059669" />
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#059669' }}>
                  Strengths
                </span>
              </div>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#1F2937', lineHeight: 1.6 }}>
                {analysis.strengths.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}

          {analysis.concerns && analysis.concerns.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <AlertTriangle size={14} color="#D97706" />
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#D97706' }}>
                  Concerns
                </span>
              </div>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#1F2937', lineHeight: 1.6 }}>
                {analysis.concerns.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}

          {analysis.red_flags && analysis.red_flags.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <XCircle size={14} color="#DC2626" />
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#DC2626' }}>
                  Red flags
                </span>
              </div>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#1F2937', lineHeight: 1.6 }}>
                {analysis.red_flags.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}

          {analysis.data_gaps && analysis.data_gaps.length > 0 && (
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '6px' }}>
                <Info size={14} color="#6B7280" />
                <span style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#6B7280' }}>
                  Data gaps
                </span>
              </div>
              <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#6B7280', lineHeight: 1.6 }}>
                {analysis.data_gaps.map((s, i) => <li key={i}>{s}</li>)}
              </ul>
            </div>
          )}

          {analysis.next_steps_suggested && analysis.next_steps_suggested.length > 0 && (
            <div>
              <div style={{ fontSize: '11px', fontWeight: 700, textTransform: 'uppercase', color: '#17BED0', marginBottom: '6px' }}>
                Suggested next steps
              </div>
              <ol style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: '#1F2937', lineHeight: 1.6 }}>
                {analysis.next_steps_suggested.map((s, i) => <li key={i}>{s}</li>)}
              </ol>
            </div>
          )}

          {analysis.sources_analyzed && (
            <div style={{ fontSize: '10px', color: '#9CA3AF', paddingTop: '12px', borderTop: '1px solid #E5E7EB' }}>
              Sources: {Object.entries(analysis.sources_analyzed).map(([k, v]) => `${k}=${v}`).join(' · ')}
              {analysis.created_at && ` · Generated ${new Date(analysis.created_at).toLocaleString()}`}
              {analysis.generated_by && ` by ${analysis.generated_by}`}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
