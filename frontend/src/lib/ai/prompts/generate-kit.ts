/**
 * Interview kit generator — creates a structured question bank for a specific role + stage.
 */

export const GENERATE_KIT_SYSTEM = `You are a senior engineering hiring manager at a serious tech company.

Your job: given a job description and an interview stage, generate a structured interview kit with 5-8 high-quality questions.

QUESTION QUALITY STANDARDS:
1. Questions must reveal REAL depth, not memorized answers
2. Prefer open-ended "tell me about a time..." or "walk me through..." formats
3. Each question should map to one scoring dimension (technical_depth, problem_solving, ownership, communication, cultural_add, growth_potential)
4. Avoid trivia ("what's the difference between X and Y")
5. Avoid "culture fit" — use "what unique strength would you add"
6. Provide expected_signal: what a strong answer demonstrates
7. Provide follow_up: how to dig deeper if the initial answer is surface-level
8. Match difficulty to the stage (screening = easier, final = harder)

STAGE GUIDE:
- screening (30 min): Can they do the basics? Red flags? Interest level?
- technical (60-90 min): Depth in the stack, problem solving, code quality
- systems (60 min): Architecture thinking, scale, tradeoffs
- culture (45 min): Ownership, collaboration, values alignment
- final (45 min): Synthesis, seniority, fit with team

Output STRICT JSON. No markdown, no commentary.`;

export const GENERATE_KIT_SCHEMA_HINT = `{
  "kit": {
    "name": "string — e.g. 'Senior Backend Engineer — Technical Deep Dive'",
    "description": "string — 1-2 sentences on what this interview covers",
    "duration_minutes": 60,
    "instructions": "string — interviewer prep notes (what to focus on)",
    "focus_dimensions": ["technical_depth", "problem_solving"]
  },
  "questions": [
    {
      "question": "string — the actual question to ask",
      "category": "behavioral | technical | systems | coding",
      "expected_signal": "string — what a strong answer looks like",
      "follow_up": "string — optional follow-up prompt",
      "dimension": "technical_depth | problem_solving | ownership | communication | cultural_add | growth_potential",
      "difficulty": "easy | medium | hard"
    }
  ]
}`;

export interface GeneratedKit {
  kit: {
    name: string;
    description: string;
    duration_minutes: number;
    instructions: string;
    focus_dimensions: string[];
  };
  questions: Array<{
    question: string;
    category: 'behavioral' | 'technical' | 'systems' | 'coding';
    expected_signal: string;
    follow_up: string;
    dimension:
      | 'technical_depth'
      | 'problem_solving'
      | 'ownership'
      | 'communication'
      | 'cultural_add'
      | 'growth_potential';
    difficulty: 'easy' | 'medium' | 'hard';
  }>;
}

export function buildGenerateKitPrompt(options: {
  jobTitle: string;
  jobDescription: string;
  stage: string;
  roleType?: string;
}): string {
  const { jobTitle, jobDescription, stage, roleType } = options;
  return `Generate an interview kit for this role. Output ONLY valid JSON matching the schema.

SCHEMA:
${GENERATE_KIT_SCHEMA_HINT}

ROLE: ${jobTitle}
${roleType ? `ROLE TYPE: ${roleType}` : ''}
STAGE: ${stage}

JOB DESCRIPTION:
${jobDescription.slice(0, 4000)}`;
}
