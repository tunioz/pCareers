/**
 * Scorecard drafting prompt — takes interview notes and proposes a structured scorecard.
 *
 * IMPORTANT: AI is an ASSISTANT. The human interviewer always reviews and can edit
 * before saving. The UI must make this clear. AI never saves scores directly.
 */

export const DRAFT_SCORECARD_SYSTEM = `You are an assistant helping a senior engineer draft a structured interview scorecard from their raw notes.

Your job: read the interviewer's freeform notes and propose scores for 6 dimensions + a recommendation.

SCORING DIMENSIONS (1-5 scale, 1 = weak, 3 = meets bar, 5 = exceptional):
  1. technical_depth   — depth of knowledge in relevant technical areas
  2. problem_solving   — ability to decompose and solve open-ended problems
  3. ownership        — taking responsibility, initiative, shipping things
  4. communication    — clarity, listening, collaboration
  5. cultural_add     — what they bring that complements the team (NOT "culture fit")
  6. growth_potential — trajectory, learning from feedback, curiosity

RULES:
1. Score ONLY dimensions with evidence in the notes. If no signal, return null for that dimension.
2. Every score must have a short justification (1-2 sentences) citing specific observations.
3. "Red flags" must be concrete behaviors, not vibes.
4. Recommendation is one of: "strong_hire", "hire", "lean_hire", "no_hire", "strong_no_hire"
5. NEVER penalize for things like accent, background, or anything that smells biased.
6. NEVER use terms like "culture fit" — use "culture add" (what unique strengths they bring).
7. Be honest. A weak candidate gets weak scores. Don't inflate.
8. Output STRICT JSON. No markdown, no commentary outside the JSON.`;

export const DRAFT_SCORECARD_SCHEMA_HINT = `{
  "scores": {
    "technical_depth": { "score": 1-5 or null, "notes": "string explanation" },
    "problem_solving": { "score": 1-5 or null, "notes": "string explanation" },
    "ownership": { "score": 1-5 or null, "notes": "string explanation" },
    "communication": { "score": 1-5 or null, "notes": "string explanation" },
    "cultural_add": { "score": 1-5 or null, "notes": "string explanation" },
    "growth_potential": { "score": 1-5 or null, "notes": "string explanation" }
  },
  "overall": {
    "recommendation": "strong_hire | hire | lean_hire | no_hire | strong_no_hire",
    "one_line_summary": "string — single sentence synthesis",
    "key_strengths": ["array of 2-4 strongest signals"],
    "key_concerns": ["array of 0-3 concerns, may be empty"],
    "red_flags": ["array of 0-2 red flags, may be empty"],
    "key_quotes": ["array of 0-3 memorable quotes from candidate if any"]
  },
  "confidence": "high | medium | low — how confident the AI is in this draft"
}`;

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
    recommendation: 'strong_hire' | 'hire' | 'lean_hire' | 'no_hire' | 'strong_no_hire';
    one_line_summary: string;
    key_strengths: string[];
    key_concerns: string[];
    red_flags: string[];
    key_quotes: string[];
  };
  confidence: 'high' | 'medium' | 'low';
}

export function buildDraftScorecardPrompt(options: {
  candidateName: string;
  jobTitle: string;
  stage: string;
  rawNotes: string;
  jobDescription?: string;
}): string {
  const { candidateName, jobTitle, stage, rawNotes, jobDescription } = options;
  return `Draft a scorecard for this interview. Output ONLY valid JSON matching the schema.

SCHEMA:
${DRAFT_SCORECARD_SCHEMA_HINT}

INTERVIEW CONTEXT:
- Candidate: ${candidateName}
- Role: ${jobTitle}
- Stage: ${stage}
${jobDescription ? `- Job description: ${jobDescription.slice(0, 1000)}` : ''}

INTERVIEWER'S RAW NOTES:
${rawNotes}`;
}
