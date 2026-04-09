/**
 * Comprehensive candidate analysis prompt.
 *
 * Synthesizes ALL data: parsed CV, LinkedIn text, admin notes, interview scores,
 * interviewer notes, reference feedback, task submissions — into a holistic
 * hiring recommendation.
 *
 * The AI is an advisor. The hiring team makes the decision.
 */

export const ANALYZE_CANDIDATE_SYSTEM = `You are a senior hiring manager doing a final candidate review synthesis.

Your job: read ALL available data about a candidate and produce an honest, comprehensive analysis that helps the hiring team make a final decision.

DATA YOU WILL RECEIVE (any subset may be present):
- Parsed CV profile (skills, experience, education)
- LinkedIn profile text (if provided)
- Admin notes and attachments
- Interview scorecards from multiple interviewers (if multiple, synthesize consensus vs disagreement)
- Interviewer raw notes
- Reference check responses with ratings and written feedback
- Technical task submission notes

RULES:
1. Be honest. A weak candidate gets a weak assessment. A strong candidate gets a strong one.
2. Synthesize patterns ACROSS data sources. If scores are high but references are hesitant, flag it.
3. If interviewers DISAGREE on scores, surface that explicitly — not everyone liked them equally.
4. Distinguish signal from noise. Anecdotes < patterns.
5. NEVER use protected characteristics (age, gender, nationality, accent, appearance).
6. NEVER use "culture fit" — say "culture add" (what unique strengths they bring).
7. Rate confidence honestly. If data is thin, say "low confidence".
8. Output STRICT JSON. No markdown, no commentary.`;

export const ANALYZE_CANDIDATE_SCHEMA_HINT = `{
  "overall_summary": "string — 3-5 sentence synthesis of the whole candidate",
  "strengths": ["array of 3-5 key strengths backed by specific evidence from the data"],
  "concerns": ["array of 0-4 concerns backed by specific evidence"],
  "red_flags": ["array of 0-3 concrete red flags, may be empty"],
  "scorecard_consensus": {
    "dimensions_agreement": "strong | mixed | weak — how much interviewers agreed",
    "dimensions_summary": {
      "technical_depth": "string — synthesis across interviewers",
      "problem_solving": "string",
      "ownership": "string",
      "communication": "string",
      "cultural_add": "string",
      "growth_potential": "string"
    },
    "disagreements": ["array of dimensions where interviewers diverged significantly, with details"]
  },
  "reference_synthesis": {
    "overall_sentiment": "enthusiastic | positive | neutral | mixed | negative | none",
    "key_signals": ["array of 0-4 synthesized signals from all references"]
  },
  "data_gaps": ["array of important things the team doesn't know yet"],
  "recommendation": "strong_hire | hire | lean_hire | no_hire | strong_no_hire",
  "recommendation_rationale": "string — 2-3 sentence justification",
  "confidence": "high | medium | low",
  "next_steps_suggested": ["array of 1-3 concrete suggestions, e.g. additional reference, tech screen on X, etc."]
}`;

export interface CandidateAnalysis {
  overall_summary: string;
  strengths: string[];
  concerns: string[];
  red_flags: string[];
  scorecard_consensus: {
    dimensions_agreement: 'strong' | 'mixed' | 'weak';
    dimensions_summary: {
      technical_depth: string;
      problem_solving: string;
      ownership: string;
      communication: string;
      cultural_add: string;
      growth_potential: string;
    };
    disagreements: string[];
  };
  reference_synthesis: {
    overall_sentiment: 'enthusiastic' | 'positive' | 'neutral' | 'mixed' | 'negative' | 'none';
    key_signals: string[];
  };
  data_gaps: string[];
  recommendation: 'strong_hire' | 'hire' | 'lean_hire' | 'no_hire' | 'strong_no_hire';
  recommendation_rationale: string;
  confidence: 'high' | 'medium' | 'low';
  next_steps_suggested: string[];
}

export interface AnalyzeInputs {
  candidateFirstName: string;
  jobTitle: string;
  parsedSkills?: string | null;
  parsedExperience?: string | null;
  parsedEducation?: string | null;
  professionalSummary?: string | null;
  linkedinProfile?: string | null;
  adminNotes: Array<{ author: string; content: string; note_type: string; created_at: string }>;
  scorecards: Array<{
    interviewer_name: string;
    stage: string;
    technical_depth: number | null;
    problem_solving: number | null;
    ownership: number | null;
    communication: number | null;
    cultural_add: number | null;
    growth_potential: number | null;
    recommendation: string | null;
    general_notes: string | null;
    raw_notes: string | null;
    key_quotes: string | null;
    red_flags: string | null;
  }>;
  references: Array<{
    referee_name: string;
    referee_relationship: string | null;
    technical_competence: number | null;
    reliability: number | null;
    communication: number | null;
    teamwork: number | null;
    initiative: number | null;
    strengths: string | null;
    improvements: string | null;
    would_rehire: string | null;
    additional_comments: string | null;
  }>;
}

export function buildAnalyzeCandidatePrompt(inputs: AnalyzeInputs): string {
  const parts: string[] = [];

  parts.push(`SCHEMA:\n${ANALYZE_CANDIDATE_SCHEMA_HINT}\n\n`);
  parts.push(`CANDIDATE: ${inputs.candidateFirstName}\nROLE: ${inputs.jobTitle}\n\n`);

  if (inputs.professionalSummary) {
    parts.push(`=== PROFESSIONAL SUMMARY ===\n${inputs.professionalSummary}\n\n`);
  }

  if (inputs.parsedSkills) {
    parts.push(`=== SKILLS (from CV) ===\n${inputs.parsedSkills}\n\n`);
  }

  if (inputs.parsedExperience) {
    // Limit to avoid bloating context
    const exp =
      inputs.parsedExperience.length > 3000
        ? inputs.parsedExperience.slice(0, 3000) + '...[truncated]'
        : inputs.parsedExperience;
    parts.push(`=== EXPERIENCE (from CV) ===\n${exp}\n\n`);
  }

  if (inputs.parsedEducation) {
    parts.push(`=== EDUCATION (from CV) ===\n${inputs.parsedEducation}\n\n`);
  }

  if (inputs.linkedinProfile) {
    const linkedin =
      inputs.linkedinProfile.length > 3000
        ? inputs.linkedinProfile.slice(0, 3000) + '...[truncated]'
        : inputs.linkedinProfile;
    parts.push(`=== LINKEDIN PROFILE ===\n${linkedin}\n\n`);
  }

  if (inputs.adminNotes.length > 0) {
    parts.push(`=== ADMIN NOTES (${inputs.adminNotes.length}) ===\n`);
    inputs.adminNotes.forEach((n) => {
      parts.push(
        `[${n.author} · ${n.note_type} · ${n.created_at}]\n${n.content}\n\n`
      );
    });
  }

  if (inputs.scorecards.length > 0) {
    parts.push(`=== INTERVIEW SCORECARDS (${inputs.scorecards.length} interviewers) ===\n`);
    inputs.scorecards.forEach((s, i) => {
      parts.push(`\n--- Interviewer ${i + 1}: ${s.interviewer_name} (${s.stage}) ---\n`);
      parts.push(
        `Scores: technical=${s.technical_depth ?? '—'}/5, problem_solving=${s.problem_solving ?? '—'}/5, ownership=${s.ownership ?? '—'}/5, communication=${s.communication ?? '—'}/5, cultural_add=${s.cultural_add ?? '—'}/5, growth=${s.growth_potential ?? '—'}/5\n`
      );
      parts.push(`Recommendation: ${s.recommendation || '—'}\n`);
      if (s.general_notes) parts.push(`Notes: ${s.general_notes}\n`);
      if (s.raw_notes) parts.push(`Raw notes: ${s.raw_notes.slice(0, 1500)}\n`);
      if (s.key_quotes) parts.push(`Key quotes: ${s.key_quotes}\n`);
      if (s.red_flags) parts.push(`Red flags: ${s.red_flags}\n`);
    });
    parts.push('\n');
  }

  if (inputs.references.length > 0) {
    parts.push(`=== REFERENCE CHECKS (${inputs.references.length}) ===\n`);
    inputs.references.forEach((r, i) => {
      parts.push(
        `\n--- Reference ${i + 1}: ${r.referee_name} (${r.referee_relationship || 'relationship not specified'}) ---\n`
      );
      parts.push(
        `Ratings: technical=${r.technical_competence ?? '—'}/5, reliability=${r.reliability ?? '—'}/5, communication=${r.communication ?? '—'}/5, teamwork=${r.teamwork ?? '—'}/5, initiative=${r.initiative ?? '—'}/5\n`
      );
      if (r.strengths) parts.push(`Strengths: ${r.strengths}\n`);
      if (r.improvements) parts.push(`Improvements: ${r.improvements}\n`);
      if (r.would_rehire) parts.push(`Would rehire: ${r.would_rehire}\n`);
      if (r.additional_comments) parts.push(`Comments: ${r.additional_comments}\n`);
    });
    parts.push('\n');
  }

  parts.push(
    '\nProduce the analysis as STRICT JSON matching the schema above. Be honest, specific, and concise.'
  );

  return parts.join('');
}
