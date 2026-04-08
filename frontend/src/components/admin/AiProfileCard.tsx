'use client';

import { useState } from 'react';
import { Sparkles, Loader2, AlertCircle, RefreshCw } from 'lucide-react';

interface AiProfileCardProps {
  candidateId: number;
  hasCv: boolean;
  existingSummary: string | null;
  existingSkills: string | null; // JSON string
  existingExperience: string | null; // JSON string
  onRefresh?: () => void;
}

interface ParsedData {
  professional_summary: string | null;
  skills?: { technical?: string[]; tools?: string[]; soft?: string[] };
  experience?: Array<{
    company: string;
    title: string;
    start_date: string | null;
    end_date: string | null;
    description: string;
  }>;
  years_of_experience?: number | null;
}

function parseJson<T>(s: string | null): T | null {
  if (!s) return null;
  try {
    return JSON.parse(s) as T;
  } catch {
    return null;
  }
}

export function AiProfileCard({
  candidateId,
  hasCv,
  existingSummary,
  existingSkills,
  existingExperience,
  onRefresh,
}: AiProfileCardProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ParsedData | null>(() => {
    if (!existingSummary && !existingSkills) return null;
    return {
      professional_summary: existingSummary,
      skills: parseJson<ParsedData['skills']>(existingSkills) || undefined,
      experience: parseJson<ParsedData['experience']>(existingExperience) || undefined,
    };
  });

  async function runParse() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/ai/parse-cv', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ candidate_id: candidateId }),
      });
      const json = await res.json();
      if (!json.success) {
        setError(json.error || 'Failed to parse CV');
      } else {
        setData(json.data.parsed);
        onRefresh?.();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Network error');
    } finally {
      setLoading(false);
    }
  }

  const hasData = data && (data.professional_summary || (data.skills && data.skills.technical));

  return (
    <div style={{
      border: '1px solid #E5E7EB',
      borderRadius: '12px',
      padding: '24px',
      background: '#FAFAFA',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Sparkles size={18} color="#17BED0" />
          <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>AI Profile</h3>
        </div>
        <button
          type="button"
          onClick={runParse}
          disabled={loading || !hasCv}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '8px 14px',
            background: loading ? '#9CA3AF' : '#17BED0',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '8px',
            fontSize: '13px',
            fontWeight: 600,
            cursor: loading || !hasCv ? 'not-allowed' : 'pointer',
          }}
        >
          {loading ? <Loader2 size={14} className="animate-spin" /> : hasData ? <RefreshCw size={14} /> : <Sparkles size={14} />}
          {loading ? 'Parsing…' : hasData ? 'Re-parse' : 'Parse CV'}
        </button>
      </div>

      {!hasCv && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px',
          background: '#FEF3C7',
          borderRadius: '6px',
          color: '#92400E',
          fontSize: '13px',
        }}>
          <AlertCircle size={14} />
          Candidate has no CV uploaded.
        </div>
      )}

      {error && (
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '12px',
          background: '#FEE2E2',
          borderRadius: '6px',
          color: '#991B1B',
          fontSize: '13px',
          marginBottom: '12px',
        }}>
          <AlertCircle size={14} />
          {error}
        </div>
      )}

      {hasData && data && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {data.professional_summary && (
            <div>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#6B7280', marginBottom: '6px', letterSpacing: '0.5px' }}>
                Summary
              </div>
              <p style={{ margin: 0, fontSize: '14px', lineHeight: 1.5, color: '#1F2937' }}>
                {data.professional_summary}
              </p>
            </div>
          )}

          {data.skills?.technical && data.skills.technical.length > 0 && (
            <div>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#6B7280', marginBottom: '6px', letterSpacing: '0.5px' }}>
                Technical Skills ({data.skills.technical.length})
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {data.skills.technical.slice(0, 20).map((skill, i) => (
                  <span key={i} style={{
                    padding: '4px 10px',
                    background: '#E0F7FA',
                    color: '#006064',
                    fontSize: '12px',
                    borderRadius: '100px',
                    fontWeight: 500,
                  }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {data.experience && data.experience.length > 0 && (
            <div>
              <div style={{ fontSize: '11px', textTransform: 'uppercase', color: '#6B7280', marginBottom: '6px', letterSpacing: '0.5px' }}>
                Experience ({data.experience.length} roles)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {data.experience.slice(0, 3).map((exp, i) => (
                  <div key={i} style={{ fontSize: '13px', lineHeight: 1.4 }}>
                    <div style={{ fontWeight: 600, color: '#1F2937' }}>
                      {exp.title} @ {exp.company}
                    </div>
                    <div style={{ color: '#6B7280', fontSize: '12px' }}>
                      {exp.start_date || '?'} — {exp.end_date || 'present'}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {!hasData && !loading && hasCv && !error && (
        <div style={{ fontSize: '13px', color: '#6B7280' }}>
          Click "Parse CV" to extract structured profile data from the candidate's CV using AI.
        </div>
      )}
    </div>
  );
}
