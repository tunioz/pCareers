/**
 * Technical task analysis prompt.
 *
 * Given a task description and (optionally) a candidate's submission,
 * AI analyzes:
 *   - What skills does this task evaluate?
 *   - Suggested evaluation criteria
 *   - Estimated difficulty
 *   - Red flags to watch for
 *   - For submissions: quality assessment, strengths, concerns
 */

export const ANALYZE_TASK_SYSTEM = `You are a senior engineer helping a hiring team design and evaluate technical tasks.

Your job: analyze a technical task (and optionally a candidate's submission) and provide structured insights.

RULES:
1. Be concrete. Name specific skills, patterns, and concerns.
2. For submissions, focus on code quality, correctness, and engineering judgment — not cosmetic issues.
3. Never rank candidates based on coding style preferences.
4. If analyzing a submission, explicitly note what you cannot evaluate (e.g., runtime behavior without running it).
5. Output STRICT JSON. No markdown, no commentary.`;

export const ANALYZE_TASK_SCHEMA_HINT = `{
  "task_analysis": {
    "skills_evaluated": ["array of specific technical skills this task tests"],
    "difficulty": "junior | mid | senior | staff",
    "estimated_time": "string — expected completion time in hours",
    "evaluation_criteria": [
      {
        "criterion": "string",
        "weight": "high | medium | low",
        "what_to_look_for": "string"
      }
    ],
    "common_pitfalls": ["array of things weak candidates typically miss"],
    "stretch_goals": ["array of things strong candidates would add"]
  },
  "submission_analysis": {
    "can_analyze": true,
    "overall_quality": "string — 1-2 sentence assessment",
    "strengths": ["array of concrete strengths"],
    "concerns": ["array of concrete concerns"],
    "code_quality_score": 1,
    "correctness_score": 1,
    "engineering_judgment_score": 1,
    "cannot_evaluate": ["array of things requiring runtime/context the AI cannot verify"],
    "recommendation": "strong_pass | pass | weak_pass | fail"
  }
}`;

export interface TaskAnalysis {
  task_analysis: {
    skills_evaluated: string[];
    difficulty: 'junior' | 'mid' | 'senior' | 'staff';
    estimated_time: string;
    evaluation_criteria: Array<{
      criterion: string;
      weight: 'high' | 'medium' | 'low';
      what_to_look_for: string;
    }>;
    common_pitfalls: string[];
    stretch_goals: string[];
  };
  submission_analysis?: {
    can_analyze: boolean;
    overall_quality: string;
    strengths: string[];
    concerns: string[];
    code_quality_score: number;
    correctness_score: number;
    engineering_judgment_score: number;
    cannot_evaluate: string[];
    recommendation: 'strong_pass' | 'pass' | 'weak_pass' | 'fail';
  };
}

export function buildAnalyzeTaskPrompt(options: {
  taskTitle: string;
  taskDescription: string;
  roleContext?: string;
  submissionNotes?: string;
  hasSubmission: boolean;
}): string {
  const { taskTitle, taskDescription, roleContext, submissionNotes, hasSubmission } = options;

  return `Analyze this technical task${hasSubmission ? ' and the candidate\'s submission' : ''}.
Output ONLY valid JSON matching the schema. If there's no submission, set submission_analysis to null.

SCHEMA:
${ANALYZE_TASK_SCHEMA_HINT}

TASK TITLE: ${taskTitle}

TASK DESCRIPTION:
${taskDescription.slice(0, 4000)}

${roleContext ? `ROLE CONTEXT: ${roleContext.slice(0, 1000)}\n` : ''}
${hasSubmission && submissionNotes ? `SUBMISSION NOTES / OBSERVATIONS:\n${submissionNotes.slice(0, 4000)}\n` : ''}
${hasSubmission ? '' : 'NO SUBMISSION YET — only analyze the task itself.'}`;
}
