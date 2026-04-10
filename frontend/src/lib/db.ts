import { Pool } from 'pg';
import path from 'node:path';
import fs from 'node:fs';

/**
 * PostgreSQL database layer for pCloud Employee Branding.
 *
 * Provides the same queryAll/queryOne/execute/transaction API as the old SQLite layer,
 * but backed by PostgreSQL via `pg` Pool.
 *
 * Compatibility features:
 *   - Accepts `?` placeholders and converts to `$1, $2, $3` (SQLite compat)
 *   - Converts SQLite-specific SQL to PostgreSQL equivalents
 *   - `execute()` returns { changes, lastInsertRowid } like better-sqlite3
 *
 * Connection:
 *   Set DATABASE_URL env var (e.g. from Railway).
 *   Falls back to local dev defaults if not set.
 */

const DATABASE_URL = process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:5432/pcloud';

const isBuildMode = process.env.NEXT_BUILD_MODE === '1' ||
  process.env.NEXT_PHASE === 'phase-production-build';

// Pool singleton (skip during build)
let pool: Pool | null = null;

function getPool(): Pool {
  if (!pool) {
    if (isBuildMode) {
      // During build, create a dummy pool that won't actually connect
      pool = new Pool({ connectionString: DATABASE_URL, max: 1 });
    } else {
      pool = new Pool({
        connectionString: DATABASE_URL,
        max: 20,
        idleTimeoutMillis: 30000,
        connectionTimeoutMillis: 5000,
        ssl: DATABASE_URL.includes('railway.app') || DATABASE_URL.includes('neon.tech')
          ? { rejectUnauthorized: false }
          : undefined,
      });
    }
  }
  return pool;
}

// ─── SQL Compatibility Layer ───

/**
 * Convert `?` placeholders to `$1, $2, $3` for PostgreSQL.
 */
function convertPlaceholders(sql: string): string {
  let idx = 0;
  return sql.replace(/\?/g, () => `$${++idx}`);
}

/**
 * Convert SQLite-specific SQL to PostgreSQL equivalents.
 */
function convertSql(sql: string): string {
  let converted = sql;

  // datetime('now') → NOW()
  converted = converted.replace(/datetime\('now'\)/gi, 'NOW()');
  // datetime('now', '+30 days') → NOW() + INTERVAL '30 days'
  converted = converted.replace(/datetime\('now',\s*'([^']+)'\)/gi, "NOW() + INTERVAL '$1'");

  // INTEGER PRIMARY KEY AUTOINCREMENT → SERIAL PRIMARY KEY (only in CREATE TABLE)
  converted = converted.replace(/INTEGER\s+PRIMARY\s+KEY\s+AUTOINCREMENT/gi, 'SERIAL PRIMARY KEY');

  // SQLite boolean: keep INTEGER for now (PG handles 0/1 fine)

  // julianday(x) - julianday(y) → EXTRACT(EPOCH FROM (x::timestamp - y::timestamp)) / 86400
  converted = converted.replace(
    /julianday\(([^)]+)\)\s*-\s*julianday\(([^)]+)\)/gi,
    'EXTRACT(EPOCH FROM ($1::timestamp - $2::timestamp)) / 86400'
  );

  // CAST(... AS INTEGER) for days calculation
  converted = converted.replace(
    /CAST\(EXTRACT\(EPOCH/gi,
    'CAST(EXTRACT(EPOCH'
  );

  // strftime('%Y-%m', col) → TO_CHAR(col, 'YYYY-MM')
  converted = converted.replace(
    /strftime\('%Y-%m',\s*([^)]+)\)/gi,
    "TO_CHAR($1::timestamp, 'YYYY-MM')"
  );

  // date('now', '-6 months') → NOW() - INTERVAL '6 months'
  converted = converted.replace(
    /date\('now',\s*'(-?\d+)\s+months?'\)/gi,
    "NOW() + INTERVAL '$1 months'"
  );
  converted = converted.replace(
    /date\('now',\s*'-(\d+)\s+months?'\)/gi,
    "NOW() - INTERVAL '$1 months'"
  );

  // DEFAULT (datetime('now')) → DEFAULT NOW() (in CREATE TABLE)
  converted = converted.replace(/DEFAULT\s*\(datetime\('now'\)\)/gi, 'DEFAULT NOW()');
  // DEFAULT (datetime('now', '+30 days')) → DEFAULT (NOW() + INTERVAL '30 days')
  converted = converted.replace(
    /DEFAULT\s*\(datetime\('now',\s*'([^']+)'\)\)/gi,
    "DEFAULT (NOW() + INTERVAL '$1')"
  );

  // TEXT type for dates → TIMESTAMP WITH TIME ZONE where used as datetime
  // (Keep TEXT for now to minimize breakage, PG handles text dates fine)

  // ROUND(expr, N) — PG needs numeric, not double precision
  // ROUND(double, int) doesn't exist in PG, cast to numeric first
  converted = converted.replace(
    /ROUND\(([^,)]+),\s*(\d+)\)/gi,
    'ROUND(($1)::numeric, $2)'
  );

  // CAST(x AS REAL) → (x)::double precision
  converted = converted.replace(
    /CAST\(([^)]+)\s+AS\s+REAL\)/gi,
    '($1)::double precision'
  );

  // INSERT OR IGNORE → INSERT ... ON CONFLICT DO NOTHING
  converted = converted.replace(/INSERT\s+OR\s+IGNORE/gi, 'INSERT');
  // Add ON CONFLICT DO NOTHING if not already there for these converted inserts
  // (handled manually in code, this is a safety net)

  // Convert ? placeholders last
  converted = convertPlaceholders(converted);

  return converted;
}

// ─── Query Helpers (async, compatible API) ───

export interface RunResult {
  changes: number;
  lastInsertRowid: number | bigint;
}

/**
 * Execute a SELECT query and return all rows.
 */
export async function queryAll<T>(sql: string, params: unknown[] = []): Promise<T[]> {
  if (isBuildMode) return [];
  const p = getPool();
  const result = await p.query(convertSql(sql), params);
  return result.rows as T[];
}

/**
 * Execute a SELECT query and return the first row.
 */
export async function queryOne<T>(sql: string, params: unknown[] = []): Promise<T | undefined> {
  if (isBuildMode) return undefined;
  const p = getPool();
  const converted = convertSql(sql);
  // Add LIMIT 1 if not already present and it's a SELECT
  const limited = /LIMIT\s+\d/i.test(converted) ? converted : converted.replace(/(;?\s*)$/, ' LIMIT 1$1');
  const result = await p.query(limited, params);
  return result.rows[0] as T | undefined;
}

/**
 * Execute an INSERT, UPDATE, or DELETE query.
 * Returns { changes, lastInsertRowid } for compatibility with better-sqlite3.
 */
export async function execute(sql: string, params: unknown[] = []): Promise<RunResult> {
  if (isBuildMode) return { changes: 0, lastInsertRowid: 0 };
  const p = getPool();
  let converted = convertSql(sql);

  // For INSERT, add RETURNING id to get lastInsertRowid
  const isInsert = /^\s*INSERT\s+INTO/i.test(converted);
  if (isInsert && !/RETURNING/i.test(converted)) {
    converted = converted.replace(/(;?\s*)$/, ' RETURNING id$1');
  }

  const result = await p.query(converted, params);
  return {
    changes: result.rowCount || 0,
    lastInsertRowid: isInsert && result.rows[0]?.id ? result.rows[0].id : 0,
  };
}

/**
 * Run multiple statements inside a transaction.
 */
export async function transaction<T>(fn: () => T | Promise<T>): Promise<T> {
  if (isBuildMode) return fn();
  const p = getPool();
  const client = await p.connect();
  try {
    await client.query('BEGIN');
    const result = await fn();
    await client.query('COMMIT');
    return result;
  } catch (err) {
    await client.query('ROLLBACK');
    throw err;
  } finally {
    client.release();
  }
}

/**
 * Execute raw SQL (for schema creation, multi-statement).
 */
export async function execRaw(sql: string): Promise<void> {
  if (isBuildMode) return;
  const p = getPool();
  await p.query(sql);
}

/**
 * Get the pool for advanced use.
 */
export function getDb(): Pool {
  return getPool();
}

// ─── Schema ───

const SCHEMA_SQL = `
  CREATE TABLE IF NOT EXISTS admin_users (
    id SERIAL PRIMARY KEY,
    username TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name TEXT,
    email TEXT,
    photo TEXT,
    role TEXT NOT NULL DEFAULT 'admin',
    title TEXT,
    is_active INTEGER DEFAULT 1,
    last_login_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS tags (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS posts (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    category TEXT NOT NULL,
    author TEXT NOT NULL,
    author_title TEXT,
    author_image TEXT,
    cover_image TEXT,
    read_time TEXT,
    is_featured INTEGER DEFAULT 0,
    is_published INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS post_tags (
    post_id INTEGER NOT NULL REFERENCES posts(id) ON DELETE CASCADE,
    tag_id INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
    PRIMARY KEY (post_id, tag_id)
  );

  CREATE TABLE IF NOT EXISTS interview_templates (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    overall_timeline TEXT NOT NULL DEFAULT '2-4 weeks',
    overall_label TEXT NOT NULL DEFAULT 'From application to offer decision',
    feedback_label TEXT NOT NULL DEFAULT 'At each stage to all candidates',
    subtitle TEXT,
    is_default INTEGER DEFAULT 0,
    is_published INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS interview_stages (
    id SERIAL PRIMARY KEY,
    template_id INTEGER NOT NULL REFERENCES interview_templates(id) ON DELETE CASCADE,
    stage_number INTEGER NOT NULL,
    title TEXT NOT NULL,
    duration TEXT NOT NULL,
    description TEXT NOT NULL,
    focus TEXT NOT NULL,
    timeline TEXT NOT NULL,
    icon TEXT NOT NULL DEFAULT 'Phone',
    is_published INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS candidate_values (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    image TEXT,
    sort_order INTEGER DEFAULT 0,
    is_published INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS pcloud_bar_criteria (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    is_published INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS process_highlights (
    id SERIAL PRIMARY KEY,
    label TEXT NOT NULL,
    detail TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    is_published INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS default_benefits (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    is_published INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS process_templates (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    intro_text TEXT,
    is_default INTEGER DEFAULT 0,
    is_published INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS process_steps (
    id SERIAL PRIMARY KEY,
    template_id INTEGER NOT NULL REFERENCES process_templates(id) ON DELETE CASCADE,
    step_number INTEGER NOT NULL,
    label TEXT NOT NULL,
    detail TEXT NOT NULL,
    is_published INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS jobs (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    department TEXT NOT NULL,
    product TEXT NOT NULL,
    seniority TEXT NOT NULL,
    location TEXT,
    salary_range TEXT,
    employment_type TEXT DEFAULT 'Full-time',
    description TEXT NOT NULL,
    requirements TEXT,
    nice_to_have TEXT,
    benefits TEXT,
    cover_image TEXT,
    is_new INTEGER DEFAULT 0,
    is_high_priority INTEGER DEFAULT 0,
    is_published INTEGER DEFAULT 0,
    tags TEXT,
    challenges TEXT,
    team_name TEXT,
    team_size TEXT,
    team_lead TEXT,
    team_quote TEXT,
    team_photo TEXT,
    tech_stack TEXT,
    what_youll_learn TEXT,
    interview_template_id INTEGER REFERENCES interview_templates(id),
    process_template_id INTEGER REFERENCES process_templates(id),
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS job_benefits (
    job_id INTEGER NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    benefit_id INTEGER NOT NULL REFERENCES default_benefits(id) ON DELETE CASCADE,
    PRIMARY KEY (job_id, benefit_id)
  );

  CREATE TABLE IF NOT EXISTS team_members (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    bio TEXT,
    photo TEXT,
    department TEXT,
    sort_order INTEGER DEFAULT 0,
    is_published INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS candidates (
    id SERIAL PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    photo TEXT,
    job_id INTEGER REFERENCES jobs(id) ON DELETE SET NULL,
    cover_message TEXT,
    cv_path TEXT,
    cv_original_name TEXT,
    linkedin_url TEXT,
    github_url TEXT,
    portfolio_url TEXT,
    website_url TEXT,
    source TEXT DEFAULT 'Direct',
    referrer_name TEXT,
    referrer_email TEXT,
    referrer_company TEXT,
    is_internal_referral INTEGER DEFAULT 0,
    salary_min INTEGER,
    salary_max INTEGER,
    salary_currency TEXT DEFAULT 'EUR',
    earliest_start TEXT,
    work_model TEXT DEFAULT 'On-site Sofia',
    status TEXT NOT NULL DEFAULT 'new',
    previous_status TEXT,
    status_changed_at TIMESTAMP DEFAULT NOW(),
    composite_score REAL,
    rejection_reason TEXT,
    rejection_notes TEXT,
    keep_in_talent_pool INTEGER DEFAULT 0,
    is_returning INTEGER DEFAULT 0,
    previous_candidate_id INTEGER,
    parsed_skills TEXT,
    parsed_experience TEXT,
    parsed_education TEXT,
    parsed_certifications TEXT,
    parsed_languages TEXT,
    parsed_projects TEXT,
    professional_summary TEXT,
    linkedin_profile_text TEXT,
    final_decision TEXT,
    decision_justification TEXT,
    is_archived INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS position_criteria (
    id SERIAL PRIMARY KEY,
    job_id INTEGER NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    weight INTEGER DEFAULT 10,
    sort_order INTEGER DEFAULT 0
  );

  CREATE TABLE IF NOT EXISTS candidate_notes (
    id SERIAL PRIMARY KEY,
    candidate_id INTEGER NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
    author TEXT NOT NULL,
    content TEXT NOT NULL,
    note_type TEXT DEFAULT 'general',
    created_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS candidate_scores (
    id SERIAL PRIMARY KEY,
    candidate_id INTEGER NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
    interviewer_name TEXT NOT NULL,
    interview_stage TEXT NOT NULL,
    technical_depth INTEGER,
    problem_solving INTEGER,
    ownership INTEGER,
    communication INTEGER,
    cultural_add INTEGER,
    growth_potential INTEGER,
    technical_depth_notes TEXT,
    problem_solving_notes TEXT,
    ownership_notes TEXT,
    communication_notes TEXT,
    cultural_add_notes TEXT,
    growth_potential_notes TEXT,
    recommendation TEXT,
    general_notes TEXT,
    key_quotes TEXT,
    red_flags TEXT,
    session_id INTEGER,
    interviewer_user_id INTEGER,
    submitted_at TEXT,
    raw_notes TEXT,
    created_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS custom_scores (
    id SERIAL PRIMARY KEY,
    score_id INTEGER NOT NULL REFERENCES candidate_scores(id) ON DELETE CASCADE,
    criterion_id INTEGER NOT NULL REFERENCES position_criteria(id) ON DELETE CASCADE,
    score INTEGER,
    notes TEXT
  );

  CREATE TABLE IF NOT EXISTS candidate_references (
    id SERIAL PRIMARY KEY,
    candidate_id INTEGER NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
    referee_name TEXT NOT NULL,
    referee_email TEXT NOT NULL,
    referee_relationship TEXT,
    referee_company TEXT,
    token TEXT UNIQUE,
    duration_worked TEXT,
    technical_competence INTEGER,
    reliability INTEGER,
    communication INTEGER,
    teamwork INTEGER,
    initiative INTEGER,
    strengths TEXT,
    improvements TEXT,
    would_rehire TEXT,
    additional_comments TEXT,
    status TEXT DEFAULT 'pending',
    requested_at TIMESTAMP DEFAULT NOW(),
    completed_at TIMESTAMP,
    expires_at TIMESTAMP DEFAULT (NOW() + INTERVAL '30 days')
  );

  CREATE TABLE IF NOT EXISTS candidate_history (
    id SERIAL PRIMARY KEY,
    candidate_id INTEGER NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
    action TEXT NOT NULL,
    from_status TEXT,
    to_status TEXT,
    performed_by TEXT DEFAULT 'system',
    notes TEXT,
    details TEXT,
    created_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS candidate_attachments (
    id SERIAL PRIMARY KEY,
    candidate_id INTEGER NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
    file_path TEXT NOT NULL,
    file_name TEXT NOT NULL,
    file_type TEXT,
    uploaded_by TEXT DEFAULT 'candidate',
    created_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS company_settings (
    key TEXT PRIMARY KEY,
    value TEXT NOT NULL,
    updated_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS products (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS tech_stacks (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS legal_pages (
    id SERIAL PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    last_updated TIMESTAMP DEFAULT NOW(),
    is_published INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS gallery_categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS gallery_photos (
    id SERIAL PRIMARY KEY,
    category_id INTEGER NOT NULL REFERENCES gallery_categories(id) ON DELETE CASCADE,
    image TEXT NOT NULL,
    alt_text TEXT,
    sort_order INTEGER DEFAULT 0,
    is_published INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS team_stories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    photo TEXT,
    quote TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    is_published INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS email_templates (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    subject TEXT NOT NULL,
    body TEXT NOT NULL,
    template_type TEXT NOT NULL,
    is_active INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS technical_tasks (
    id SERIAL PRIMARY KEY,
    job_id INTEGER REFERENCES jobs(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    instructions TEXT NOT NULL,
    deadline_days INTEGER DEFAULT 7,
    is_active INTEGER DEFAULT 1,
    created_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS candidate_task_submissions (
    id SERIAL PRIMARY KEY,
    candidate_id INTEGER NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
    task_id INTEGER NOT NULL REFERENCES technical_tasks(id) ON DELETE CASCADE,
    submission_token TEXT UNIQUE NOT NULL,
    file_path TEXT,
    notes TEXT,
    score INTEGER,
    reviewer_notes TEXT,
    status TEXT DEFAULT 'pending',
    deadline TIMESTAMP,
    submitted_at TIMESTAMP,
    reviewed_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS ai_audit_log (
    id SERIAL PRIMARY KEY,
    skill TEXT NOT NULL,
    user_username TEXT NOT NULL,
    candidate_id INTEGER,
    model TEXT NOT NULL,
    tokens_in INTEGER DEFAULT 0,
    tokens_out INTEGER DEFAULT 0,
    cost_usd REAL DEFAULT 0,
    duration_ms INTEGER DEFAULT 0,
    success INTEGER DEFAULT 1,
    error_message TEXT,
    prompt_preview TEXT,
    output_preview TEXT,
    created_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS interview_kits (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    role_type TEXT,
    stage TEXT NOT NULL,
    duration_minutes INTEGER DEFAULT 60,
    focus_dimensions TEXT,
    instructions TEXT,
    is_published INTEGER DEFAULT 1,
    ai_generated INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS interview_kit_questions (
    id SERIAL PRIMARY KEY,
    kit_id INTEGER NOT NULL REFERENCES interview_kits(id) ON DELETE CASCADE,
    sort_order INTEGER DEFAULT 0,
    question TEXT NOT NULL,
    category TEXT,
    expected_signal TEXT,
    follow_up TEXT,
    dimension TEXT,
    difficulty TEXT DEFAULT 'medium'
  );

  CREATE TABLE IF NOT EXISTS candidate_interview_sessions (
    id SERIAL PRIMARY KEY,
    candidate_id INTEGER NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
    kit_id INTEGER REFERENCES interview_kits(id) ON DELETE SET NULL,
    interviewer_name TEXT NOT NULL,
    stage TEXT NOT NULL,
    scheduled_at TIMESTAMP,
    completed_at TIMESTAMP,
    raw_notes TEXT,
    score_id INTEGER,
    status TEXT DEFAULT 'scheduled',
    location TEXT,
    meet_link TEXT,
    duration_minutes INTEGER,
    created_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS audit_log (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES admin_users(id) ON DELETE SET NULL,
    user_username TEXT NOT NULL,
    user_role TEXT,
    action TEXT NOT NULL,
    entity_type TEXT,
    entity_id INTEGER,
    details TEXT,
    ip_address TEXT,
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS candidate_analysis (
    id SERIAL PRIMARY KEY,
    candidate_id INTEGER NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
    generated_by TEXT NOT NULL,
    overall_summary TEXT,
    strengths TEXT,
    concerns TEXT,
    red_flags TEXT,
    recommendation TEXT,
    confidence TEXT,
    sources_analyzed TEXT,
    model TEXT,
    cost_usd REAL,
    created_at TIMESTAMP DEFAULT NOW()
  );

  CREATE TABLE IF NOT EXISTS candidate_emails (
    id SERIAL PRIMARY KEY,
    candidate_id INTEGER NOT NULL REFERENCES candidates(id) ON DELETE CASCADE,
    email_type TEXT NOT NULL,
    subject TEXT,
    body TEXT,
    status TEXT NOT NULL DEFAULT 'draft',
    ai_generated INTEGER DEFAULT 0,
    ai_prompt_context TEXT,
    session_id INTEGER,
    sent_at TIMESTAMP,
    sent_by TEXT,
    sent_to_email TEXT,
    created_by TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
  );
`;

const INDEXES_SQL = `
  CREATE INDEX IF NOT EXISTS idx_legal_pages_slug ON legal_pages(slug);
  CREATE INDEX IF NOT EXISTS idx_posts_slug ON posts(slug);
  CREATE INDEX IF NOT EXISTS idx_posts_published ON posts(is_published, created_at);
  CREATE INDEX IF NOT EXISTS idx_posts_featured ON posts(is_featured, is_published);
  CREATE INDEX IF NOT EXISTS idx_jobs_slug ON jobs(slug);
  CREATE INDEX IF NOT EXISTS idx_jobs_published ON jobs(is_published);
  CREATE INDEX IF NOT EXISTS idx_jobs_department ON jobs(department);
  CREATE INDEX IF NOT EXISTS idx_candidates_email ON candidates(email);
  CREATE INDEX IF NOT EXISTS idx_candidates_status ON candidates(status);
  CREATE INDEX IF NOT EXISTS idx_candidates_job ON candidates(job_id);
  CREATE INDEX IF NOT EXISTS idx_candidates_created ON candidates(created_at);
  CREATE UNIQUE INDEX IF NOT EXISTS idx_candidates_email_job ON candidates(email, job_id) WHERE job_id IS NOT NULL;
  CREATE INDEX IF NOT EXISTS idx_candidate_notes_candidate ON candidate_notes(candidate_id);
  CREATE INDEX IF NOT EXISTS idx_candidate_scores_candidate ON candidate_scores(candidate_id);
  CREATE INDEX IF NOT EXISTS idx_candidate_references_candidate ON candidate_references(candidate_id);
  CREATE INDEX IF NOT EXISTS idx_candidate_history_candidate ON candidate_history(candidate_id);
  CREATE INDEX IF NOT EXISTS idx_candidate_attachments_candidate ON candidate_attachments(candidate_id);
  CREATE INDEX IF NOT EXISTS idx_ai_audit_user_date ON ai_audit_log(user_username, created_at);
  CREATE INDEX IF NOT EXISTS idx_ai_audit_skill ON ai_audit_log(skill);
  CREATE INDEX IF NOT EXISTS idx_ai_audit_candidate ON ai_audit_log(candidate_id);
  CREATE INDEX IF NOT EXISTS idx_interview_kit_questions_kit ON interview_kit_questions(kit_id, sort_order);
  CREATE INDEX IF NOT EXISTS idx_candidate_sessions_candidate ON candidate_interview_sessions(candidate_id);
  CREATE INDEX IF NOT EXISTS idx_team_order ON team_members(sort_order);
  CREATE INDEX IF NOT EXISTS idx_interview_stages_template ON interview_stages(template_id, stage_number);
  CREATE INDEX IF NOT EXISTS idx_candidate_values_order ON candidate_values(sort_order);
  CREATE INDEX IF NOT EXISTS idx_pcloud_bar_order ON pcloud_bar_criteria(sort_order);
  CREATE INDEX IF NOT EXISTS idx_process_highlights_order ON process_highlights(sort_order);
  CREATE INDEX IF NOT EXISTS idx_default_benefits_order ON default_benefits(sort_order);
  CREATE INDEX IF NOT EXISTS idx_jobs_template ON jobs(interview_template_id);
  CREATE INDEX IF NOT EXISTS idx_jobs_process_template ON jobs(process_template_id);
  CREATE INDEX IF NOT EXISTS idx_process_steps_template ON process_steps(template_id, step_number);
  CREATE INDEX IF NOT EXISTS idx_products_order ON products(sort_order);
  CREATE INDEX IF NOT EXISTS idx_gallery_categories_order ON gallery_categories(sort_order);
  CREATE INDEX IF NOT EXISTS idx_gallery_photos_category ON gallery_photos(category_id, sort_order);
  CREATE INDEX IF NOT EXISTS idx_gallery_photos_published ON gallery_photos(is_published, sort_order);
  CREATE INDEX IF NOT EXISTS idx_team_stories_order ON team_stories(sort_order);
  CREATE INDEX IF NOT EXISTS idx_team_stories_published ON team_stories(is_published, sort_order);
  CREATE INDEX IF NOT EXISTS idx_email_templates_type ON email_templates(template_type);
  CREATE INDEX IF NOT EXISTS idx_email_templates_slug ON email_templates(slug);
  CREATE INDEX IF NOT EXISTS idx_technical_tasks_job ON technical_tasks(job_id);
  CREATE INDEX IF NOT EXISTS idx_technical_tasks_active ON technical_tasks(is_active);
  CREATE INDEX IF NOT EXISTS idx_task_submissions_candidate ON candidate_task_submissions(candidate_id);
  CREATE INDEX IF NOT EXISTS idx_task_submissions_token ON candidate_task_submissions(submission_token);
  CREATE INDEX IF NOT EXISTS idx_candidate_references_token ON candidate_references(token);
  CREATE INDEX IF NOT EXISTS idx_position_criteria_job ON position_criteria(job_id, sort_order);
  CREATE INDEX IF NOT EXISTS idx_custom_scores_score ON custom_scores(score_id);
  CREATE INDEX IF NOT EXISTS idx_custom_scores_criterion ON custom_scores(criterion_id);
  CREATE INDEX IF NOT EXISTS idx_audit_log_user ON audit_log(user_username, created_at);
  CREATE INDEX IF NOT EXISTS idx_audit_log_entity ON audit_log(entity_type, entity_id);
  CREATE INDEX IF NOT EXISTS idx_audit_log_action ON audit_log(action);
  CREATE INDEX IF NOT EXISTS idx_candidate_analysis_candidate ON candidate_analysis(candidate_id, created_at);
  CREATE INDEX IF NOT EXISTS idx_candidate_emails_candidate ON candidate_emails(candidate_id, created_at);
  CREATE INDEX IF NOT EXISTS idx_candidate_emails_status ON candidate_emails(status);
`;

/**
 * Initialize schema — creates all tables and indexes if they don't exist.
 * Called once on server startup.
 */
export async function initializeSchema(): Promise<void> {
  if (isBuildMode) return;
  try {
    await execRaw(SCHEMA_SQL);
    await execRaw(INDEXES_SQL);
    console.log('[db] PostgreSQL schema initialized');
  } catch (err) {
    console.error('[db] Schema initialization error:', err);
    throw err;
  }
}

// Auto-initialize on first import (non-blocking)
let _schemaReady: Promise<void> | null = null;
export function ensureSchema(): Promise<void> {
  if (!_schemaReady) {
    _schemaReady = initializeSchema();
  }
  return _schemaReady;
}

// Trigger initialization
ensureSchema();
