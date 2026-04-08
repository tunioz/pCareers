/**
 * CV parsing prompt — extracts structured profile data from raw CV text.
 *
 * Design principles:
 *  - Zero hallucination: only extract what's explicitly in the CV
 *  - Deterministic: JSON schema ensures consistent shape
 *  - Bias-aware: NEVER infer demographics (age, gender, nationality)
 */

export const PARSE_CV_SYSTEM = `You are an expert CV parser for a software engineering ATS.

Your job: extract structured data from a candidate's CV text.

RULES:
1. Only extract information that is EXPLICITLY stated in the CV. Never invent or infer.
2. Never include demographic information (age, gender, nationality, photo descriptions).
3. If a field is not present, return null or an empty array — never guess.
4. Dates: parse into ISO format (YYYY-MM or YYYY-MM-DD) when possible.
5. Skills: normalize common variations (e.g., "Javascript" and "JS" → "JavaScript").
6. For experience descriptions, preserve the candidate's own wording.
7. Output STRICT JSON matching the schema below. No markdown, no commentary.`;

export const PARSE_CV_SCHEMA_HINT = `{
  "professional_summary": "string — 2-3 sentence synthesis of the CV (generate from experience, not fabricated)",
  "skills": {
    "technical": ["array of technical skills"],
    "tools": ["array of tools/frameworks"],
    "soft": ["array of soft skills explicitly mentioned"]
  },
  "experience": [
    {
      "company": "string",
      "title": "string",
      "start_date": "YYYY-MM or null",
      "end_date": "YYYY-MM or 'present' or null",
      "location": "string or null",
      "description": "string — bullet points joined with newlines",
      "achievements": ["array of concrete achievements if listed"]
    }
  ],
  "education": [
    {
      "institution": "string",
      "degree": "string",
      "field": "string or null",
      "start_date": "YYYY or null",
      "end_date": "YYYY or null",
      "gpa": "string or null"
    }
  ],
  "certifications": [
    {
      "name": "string",
      "issuer": "string or null",
      "year": "YYYY or null"
    }
  ],
  "languages": [
    {
      "language": "string",
      "proficiency": "string or null"
    }
  ],
  "projects": [
    {
      "name": "string",
      "description": "string",
      "technologies": ["array of techs used"],
      "url": "string or null"
    }
  ],
  "years_of_experience": "number or null",
  "highest_education": "string or null"
}`;

export function buildParseCvPrompt(cvText: string): string {
  const truncated = cvText.length > 20000 ? cvText.slice(0, 20000) + '\n\n[truncated]' : cvText;
  return `Parse the following CV into the JSON schema below. Respond with ONLY valid JSON.

SCHEMA:
${PARSE_CV_SCHEMA_HINT}

CV TEXT:
${truncated}`;
}

export interface ParsedCv {
  professional_summary: string | null;
  skills: {
    technical: string[];
    tools: string[];
    soft: string[];
  };
  experience: Array<{
    company: string;
    title: string;
    start_date: string | null;
    end_date: string | null;
    location: string | null;
    description: string;
    achievements: string[];
  }>;
  education: Array<{
    institution: string;
    degree: string;
    field: string | null;
    start_date: string | null;
    end_date: string | null;
    gpa: string | null;
  }>;
  certifications: Array<{ name: string; issuer: string | null; year: string | null }>;
  languages: Array<{ language: string; proficiency: string | null }>;
  projects: Array<{
    name: string;
    description: string;
    technologies: string[];
    url: string | null;
  }>;
  years_of_experience: number | null;
  highest_education: string | null;
}
