/**
 * Reference summary prompt — analyzes a completed reference check and extracts
 * key themes, strengths, concerns, and a risk level.
 */

export const SUMMARIZE_REFERENCE_SYSTEM = `You are a senior hiring manager analyzing a reference check response.

Your job: read a referee's written feedback about a candidate and produce a concise, honest summary.

RULES:
1. Be honest. Don't sugarcoat. A weak reference is a weak reference.
2. Surface red flags plainly. Don't bury them in diplomatic language.
3. Distinguish between things the referee SAID and things they implied or avoided.
4. "Would rehire" is a critical signal — treat it seriously.
5. If the referee avoided answering something, note it.
6. Respect privacy: don't speculate about non-professional context.
7. Output STRICT JSON. No markdown, no commentary.`;

export const SUMMARIZE_REFERENCE_SCHEMA_HINT = `{
  "overall_impression": "string — 1-2 sentence synthesis",
  "key_strengths": ["array of 2-4 strongest signals from the reference"],
  "key_concerns": ["array of 0-3 concerns, may be empty"],
  "red_flags": ["array of 0-2 concrete red flags, may be empty"],
  "signals_not_given": ["array of questions the referee avoided or gave vague answers to"],
  "would_rehire_signal": "enthusiastic_yes | yes | neutral | hesitant | no | not_asked",
  "trust_level": "high | medium | low — how confident to place in this reference",
  "memorable_quotes": ["array of 0-3 direct quotes worth saving"],
  "risk_level": "low | medium | high — overall hiring risk based on this reference"
}`;

export interface ReferenceSummary {
  overall_impression: string;
  key_strengths: string[];
  key_concerns: string[];
  red_flags: string[];
  signals_not_given: string[];
  would_rehire_signal:
    | 'enthusiastic_yes'
    | 'yes'
    | 'neutral'
    | 'hesitant'
    | 'no'
    | 'not_asked';
  trust_level: 'high' | 'medium' | 'low';
  memorable_quotes: string[];
  risk_level: 'low' | 'medium' | 'high';
}

export function buildSummarizeReferencePrompt(options: {
  candidateFirstName: string;
  jobTitle: string;
  refereeRelationship: string | null;
  durationWorked: string | null;
  ratings: {
    technical_competence: number | null;
    reliability: number | null;
    communication: number | null;
    teamwork: number | null;
    initiative: number | null;
  };
  strengths: string | null;
  improvements: string | null;
  wouldRehire: string | null;
  additionalComments: string | null;
}): string {
  const {
    candidateFirstName,
    jobTitle,
    refereeRelationship,
    durationWorked,
    ratings,
    strengths,
    improvements,
    wouldRehire,
    additionalComments,
  } = options;

  return `Analyze this reference check. Output ONLY valid JSON matching the schema.

SCHEMA:
${SUMMARIZE_REFERENCE_SCHEMA_HINT}

CONTEXT:
- Candidate: ${candidateFirstName}
- Role being filled: ${jobTitle}
- Referee relationship: ${refereeRelationship || 'not specified'}
- Duration worked together: ${durationWorked || 'not specified'}

RATINGS (1-5 scale, null = not rated):
- Technical competence: ${ratings.technical_competence ?? 'null'}
- Reliability: ${ratings.reliability ?? 'null'}
- Communication: ${ratings.communication ?? 'null'}
- Teamwork: ${ratings.teamwork ?? 'null'}
- Initiative: ${ratings.initiative ?? 'null'}

WRITTEN FEEDBACK:

Strengths:
${strengths || '(no answer)'}

Areas for improvement:
${improvements || '(no answer)'}

Would rehire?
${wouldRehire || '(no answer)'}

Additional comments:
${additionalComments || '(no answer)'}`;
}
