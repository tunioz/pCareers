import Database from 'better-sqlite3';
import path from 'node:path';
import fs from 'node:fs';

const DB_DIR = process.env.DB_DIR || path.resolve(process.cwd(), '..', 'data');
const DB_PATH = process.env.DB_PATH || path.join(DB_DIR, 'pcloud.db');

let db: Database.Database;

if (process.env.NEXT_BUILD_MODE === '1') {
  db = new Database(':memory:');
} else {
  if (!fs.existsSync(DB_DIR)) {
    fs.mkdirSync(DB_DIR, { recursive: true });
  }
  db = new Database(DB_PATH);
}

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');
db.pragma('busy_timeout = 5000');

/**
 * Run all table creation statements.
 * Called on first import to ensure schema exists.
 */
function initializeSchema(): void {
  db.exec(`
    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      -- Profile fields
      full_name TEXT,
      email TEXT,
      photo TEXT,
      role TEXT NOT NULL DEFAULT 'admin',  -- admin, recruiter, interviewer, hiring_manager
      title TEXT,                          -- e.g. "Senior Recruiter", "Head of Engineering"
      is_active INTEGER DEFAULT 1,
      last_login_at TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS tags (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS posts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
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
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS post_tags (
      post_id INTEGER NOT NULL,
      tag_id INTEGER NOT NULL,
      PRIMARY KEY (post_id, tag_id),
      FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE,
      FOREIGN KEY (tag_id) REFERENCES tags(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS interview_templates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      overall_timeline TEXT NOT NULL DEFAULT '2-4 weeks',
      overall_label TEXT NOT NULL DEFAULT 'From application to offer decision',
      feedback_label TEXT NOT NULL DEFAULT 'At each stage to all candidates',
      subtitle TEXT,
      is_default INTEGER DEFAULT 0,
      is_published INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS interview_stages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      template_id INTEGER NOT NULL,
      stage_number INTEGER NOT NULL,
      title TEXT NOT NULL,
      duration TEXT NOT NULL,
      description TEXT NOT NULL,
      focus TEXT NOT NULL,
      timeline TEXT NOT NULL,
      icon TEXT NOT NULL DEFAULT 'Phone',
      is_published INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (template_id) REFERENCES interview_templates(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS candidate_values (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      image TEXT,
      sort_order INTEGER DEFAULT 0,
      is_published INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS pcloud_bar_criteria (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      sort_order INTEGER DEFAULT 0,
      is_published INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS process_highlights (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      label TEXT NOT NULL,
      detail TEXT NOT NULL,
      sort_order INTEGER DEFAULT 0,
      is_published INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS default_benefits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      sort_order INTEGER DEFAULT 0,
      is_published INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS process_templates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      intro_text TEXT,
      is_default INTEGER DEFAULT 0,
      is_published INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS process_steps (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      template_id INTEGER NOT NULL,
      step_number INTEGER NOT NULL,
      label TEXT NOT NULL,
      detail TEXT NOT NULL,
      is_published INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (template_id) REFERENCES process_templates(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS jobs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
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
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS job_benefits (
      job_id INTEGER NOT NULL,
      benefit_id INTEGER NOT NULL,
      PRIMARY KEY (job_id, benefit_id),
      FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
      FOREIGN KEY (benefit_id) REFERENCES default_benefits(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS team_members (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      bio TEXT,
      photo TEXT,
      department TEXT,
      sort_order INTEGER DEFAULT 0,
      is_published INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS candidates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      -- Basic info
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT,
      photo TEXT,
      -- Application
      job_id INTEGER,
      cover_message TEXT,
      cv_path TEXT,
      cv_original_name TEXT,
      -- Links
      linkedin_url TEXT,
      github_url TEXT,
      portfolio_url TEXT,
      website_url TEXT,
      -- Source & Referral
      source TEXT DEFAULT 'Direct',
      referrer_name TEXT,
      referrer_email TEXT,
      referrer_company TEXT,
      is_internal_referral INTEGER DEFAULT 0,
      -- Preferences
      salary_min INTEGER,
      salary_max INTEGER,
      salary_currency TEXT DEFAULT 'EUR',
      earliest_start TEXT,
      work_model TEXT DEFAULT 'On-site Sofia',
      -- Pipeline
      status TEXT NOT NULL DEFAULT 'new',
      previous_status TEXT,
      status_changed_at TEXT DEFAULT (datetime('now')),
      -- Scoring
      composite_score REAL,
      -- Rejection
      rejection_reason TEXT,
      rejection_notes TEXT,
      keep_in_talent_pool INTEGER DEFAULT 0,
      -- Returning candidate
      is_returning INTEGER DEFAULT 0,
      previous_candidate_id INTEGER,
      -- Parsed CV profile fields (Feature 1: Standardized CV Template View)
      parsed_skills TEXT,
      parsed_experience TEXT,
      parsed_education TEXT,
      parsed_certifications TEXT,
      parsed_languages TEXT,
      parsed_projects TEXT,
      professional_summary TEXT,
      -- Decision fields (Feature 6: Decision View)
      final_decision TEXT,
      decision_justification TEXT,
      -- Meta
      is_archived INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS position_criteria (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      job_id INTEGER NOT NULL,
      name TEXT NOT NULL,
      description TEXT,
      weight INTEGER DEFAULT 10,
      sort_order INTEGER DEFAULT 0,
      FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS candidate_notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      candidate_id INTEGER NOT NULL,
      author TEXT NOT NULL,
      content TEXT NOT NULL,
      note_type TEXT DEFAULT 'general',
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS candidate_scores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      candidate_id INTEGER NOT NULL,
      interviewer_name TEXT NOT NULL,
      interview_stage TEXT NOT NULL,
      -- 6 core dimensions (1-5 scale)
      technical_depth INTEGER,
      problem_solving INTEGER,
      ownership INTEGER,
      communication INTEGER,
      cultural_add INTEGER,
      growth_potential INTEGER,
      -- Evidence / justification
      technical_depth_notes TEXT,
      problem_solving_notes TEXT,
      ownership_notes TEXT,
      communication_notes TEXT,
      cultural_add_notes TEXT,
      growth_potential_notes TEXT,
      -- Overall
      recommendation TEXT,
      general_notes TEXT,
      key_quotes TEXT,
      red_flags TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS custom_scores (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      score_id INTEGER NOT NULL,
      criterion_id INTEGER NOT NULL,
      score INTEGER,
      notes TEXT,
      FOREIGN KEY (score_id) REFERENCES candidate_scores(id) ON DELETE CASCADE,
      FOREIGN KEY (criterion_id) REFERENCES position_criteria(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS candidate_references (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      candidate_id INTEGER NOT NULL,
      referee_name TEXT NOT NULL,
      referee_email TEXT NOT NULL,
      referee_relationship TEXT,
      referee_company TEXT,
      token TEXT UNIQUE,
      duration_worked TEXT,
      -- Ratings (1-5)
      technical_competence INTEGER,
      reliability INTEGER,
      communication INTEGER,
      teamwork INTEGER,
      initiative INTEGER,
      -- Feedback
      strengths TEXT,
      improvements TEXT,
      would_rehire TEXT,
      additional_comments TEXT,
      -- Status
      status TEXT DEFAULT 'pending',
      requested_at TEXT DEFAULT (datetime('now')),
      completed_at TEXT,
      expires_at TEXT DEFAULT (datetime('now', '+30 days')),
      FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS candidate_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      candidate_id INTEGER NOT NULL,
      action TEXT NOT NULL,
      from_status TEXT,
      to_status TEXT,
      performed_by TEXT DEFAULT 'system',
      notes TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS candidate_attachments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      candidate_id INTEGER NOT NULL,
      file_path TEXT NOT NULL,
      file_name TEXT NOT NULL,
      file_type TEXT,
      uploaded_by TEXT DEFAULT 'candidate',
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS company_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL,
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS products (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      sort_order INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS tech_stacks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS legal_pages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      slug TEXT UNIQUE NOT NULL,
      title TEXT NOT NULL,
      content TEXT NOT NULL,
      last_updated TEXT DEFAULT (datetime('now')),
      is_published INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS gallery_categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      sort_order INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS gallery_photos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      category_id INTEGER NOT NULL,
      image TEXT NOT NULL,
      alt_text TEXT,
      sort_order INTEGER DEFAULT 0,
      is_published INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (category_id) REFERENCES gallery_categories(id) ON DELETE CASCADE
    );

    CREATE TABLE IF NOT EXISTS team_stories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      role TEXT NOT NULL,
      photo TEXT,
      quote TEXT NOT NULL,
      sort_order INTEGER DEFAULT 0,
      is_published INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS email_templates (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      subject TEXT NOT NULL,
      body TEXT NOT NULL,
      template_type TEXT NOT NULL,
      is_active INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS technical_tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      job_id INTEGER,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      instructions TEXT NOT NULL,
      deadline_days INTEGER DEFAULT 7,
      is_active INTEGER DEFAULT 1,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE SET NULL
    );

    CREATE TABLE IF NOT EXISTS candidate_task_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      candidate_id INTEGER NOT NULL,
      task_id INTEGER NOT NULL,
      submission_token TEXT UNIQUE NOT NULL,
      file_path TEXT,
      notes TEXT,
      score INTEGER,
      reviewer_notes TEXT,
      status TEXT DEFAULT 'pending',
      deadline TEXT,
      submitted_at TEXT,
      reviewed_at TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE,
      FOREIGN KEY (task_id) REFERENCES technical_tasks(id) ON DELETE CASCADE
    );

    -- ═══════════════════════════════════════════════════════════════════
    -- AI AUDIT LOG — track all Claude/AI calls for compliance and cost
    -- ═══════════════════════════════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS ai_audit_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
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
      created_at TEXT DEFAULT (datetime('now'))
    );

    -- ═══════════════════════════════════════════════════════════════════
    -- INTERVIEW KITS — structured question banks per role/stage
    -- ═══════════════════════════════════════════════════════════════════
    CREATE TABLE IF NOT EXISTS interview_kits (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      role_type TEXT,              -- "Backend Engineer", "Designer", etc.
      stage TEXT NOT NULL,         -- "screening", "technical", "culture", "final"
      duration_minutes INTEGER DEFAULT 60,
      focus_dimensions TEXT,       -- JSON array: ["technical_depth", "problem_solving"]
      instructions TEXT,           -- Interviewer prep notes
      is_published INTEGER DEFAULT 1,
      ai_generated INTEGER DEFAULT 0,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS interview_kit_questions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      kit_id INTEGER NOT NULL,
      sort_order INTEGER DEFAULT 0,
      question TEXT NOT NULL,
      category TEXT,               -- "behavioral", "technical", "systems", "coding"
      expected_signal TEXT,        -- what a strong answer demonstrates
      follow_up TEXT,              -- suggested follow-up prompts
      dimension TEXT,              -- which scorecard dimension this maps to
      difficulty TEXT DEFAULT 'medium', -- easy / medium / hard
      FOREIGN KEY (kit_id) REFERENCES interview_kits(id) ON DELETE CASCADE
    );

    -- Link a candidate's interview to a kit
    CREATE TABLE IF NOT EXISTS candidate_interview_sessions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      candidate_id INTEGER NOT NULL,
      kit_id INTEGER,
      interviewer_name TEXT NOT NULL,
      stage TEXT NOT NULL,
      scheduled_at TEXT,
      completed_at TEXT,
      raw_notes TEXT,              -- freeform notes before AI draft
      score_id INTEGER,            -- link to candidate_scores after submission
      status TEXT DEFAULT 'scheduled', -- scheduled / in_progress / completed / cancelled
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE,
      FOREIGN KEY (kit_id) REFERENCES interview_kits(id) ON DELETE SET NULL
    );

    -- Indexes for common queries
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

    -- AUDIT LOG — record every admin action (who, when, what)
    CREATE TABLE IF NOT EXISTS audit_log (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id INTEGER,
      user_username TEXT NOT NULL,
      user_role TEXT,
      action TEXT NOT NULL,
      entity_type TEXT,
      entity_id INTEGER,
      details TEXT,
      ip_address TEXT,
      user_agent TEXT,
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (user_id) REFERENCES admin_users(id) ON DELETE SET NULL
    );
    CREATE INDEX IF NOT EXISTS idx_audit_log_user ON audit_log(user_username, created_at);
    CREATE INDEX IF NOT EXISTS idx_audit_log_entity ON audit_log(entity_type, entity_id);
    CREATE INDEX IF NOT EXISTS idx_audit_log_action ON audit_log(action);

    -- CANDIDATE ANALYSIS CACHE — unified AI analysis results
    CREATE TABLE IF NOT EXISTS candidate_analysis (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      candidate_id INTEGER NOT NULL,
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
      created_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS idx_candidate_analysis_candidate ON candidate_analysis(candidate_id, created_at);

    -- CANDIDATE EMAILS — draft/edit/send workflow for offer/rejection/invite emails
    CREATE TABLE IF NOT EXISTS candidate_emails (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      candidate_id INTEGER NOT NULL,
      email_type TEXT NOT NULL,
      subject TEXT,
      body TEXT,
      status TEXT NOT NULL DEFAULT 'draft',
      ai_generated INTEGER DEFAULT 0,
      ai_prompt_context TEXT,
      sent_at TEXT,
      sent_by TEXT,
      sent_to_email TEXT,
      created_by TEXT NOT NULL,
      created_at TEXT DEFAULT (datetime('now')),
      updated_at TEXT DEFAULT (datetime('now')),
      FOREIGN KEY (candidate_id) REFERENCES candidates(id) ON DELETE CASCADE
    );
    CREATE INDEX IF NOT EXISTS idx_candidate_emails_candidate ON candidate_emails(candidate_id, created_at);
    CREATE INDEX IF NOT EXISTS idx_candidate_emails_status ON candidate_emails(status);
  `);

  runMigrations();
}

function runMigrations(): void {
  const addCol = (table: string, column: string, definition: string) => {
    try {
      db.exec(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`);
    } catch (e) {
      if (e instanceof Error && !e.message.includes('duplicate column')) {
        console.warn(`Migration warning on ${table}.${column}:`, e.message);
      }
    }
  };

  addCol('admin_users', 'full_name', 'TEXT');
  addCol('admin_users', 'email', 'TEXT');
  addCol('admin_users', 'photo', 'TEXT');
  addCol('admin_users', 'role', "TEXT NOT NULL DEFAULT 'admin'");
  addCol('admin_users', 'title', 'TEXT');
  addCol('admin_users', 'is_active', 'INTEGER DEFAULT 1');
  addCol('admin_users', 'last_login_at', 'TEXT');
  // SQLite ALTER TABLE ADD COLUMN cannot use non-constant defaults like datetime('now'),
  // so we add as nullable TEXT and backfill existing rows with a constant.
  addCol('admin_users', 'updated_at', 'TEXT');
  try {
    db.exec(`UPDATE admin_users SET updated_at = datetime('now') WHERE updated_at IS NULL`);
  } catch {
    // ignore
  }

  addCol('candidates', 'linkedin_profile_text', 'TEXT');

  addCol('candidate_scores', 'session_id', 'INTEGER');
  addCol('candidate_scores', 'interviewer_user_id', 'INTEGER');
  addCol('candidate_scores', 'submitted_at', 'TEXT');
  addCol('candidate_scores', 'raw_notes', 'TEXT');

  addCol('candidate_interview_sessions', 'location', 'TEXT');
  addCol('candidate_interview_sessions', 'meet_link', 'TEXT');
  addCol('candidate_interview_sessions', 'duration_minutes', 'INTEGER');

  addCol('candidate_emails', 'session_id', 'INTEGER');
}

// Run schema initialization
initializeSchema();

// ---------------------------------------------------------------------------
// Query helpers
// ---------------------------------------------------------------------------

/**
 * Execute a SELECT query and return all rows.
 */
export function queryAll<T>(sql: string, params: unknown[] = []): T[] {
  const stmt = db.prepare(sql);
  return stmt.all(...params) as T[];
}

/**
 * Execute a SELECT query and return the first row.
 */
export function queryOne<T>(sql: string, params: unknown[] = []): T | undefined {
  const stmt = db.prepare(sql);
  return stmt.get(...params) as T | undefined;
}

/**
 * Execute an INSERT, UPDATE, or DELETE query.
 * Returns the result with changes count and lastInsertRowid.
 */
export function execute(
  sql: string,
  params: unknown[] = []
): Database.RunResult {
  const stmt = db.prepare(sql);
  return stmt.run(...params);
}

/**
 * Run multiple statements inside a transaction.
 * Automatically rolls back on error.
 */
export function transaction<T>(fn: () => T): T {
  const txn = db.transaction(fn);
  return txn();
}

/**
 * Get the raw database instance for advanced use cases.
 */
export function getDb(): Database.Database {
  return db;
}

// During build: force exit after routes-manifest is written
if (process.env.NEXT_BUILD_MODE === '1') {
  const checkDone = setInterval(() => {
    try {
      const routesPath = path.join(process.cwd(), '.next', 'routes-manifest.json');
      if (fs.existsSync(routesPath)) {
        clearInterval(checkDone);
        // Write prerender-manifest if missing (process can't exit to write it)
        const prerenderPath = path.join(process.cwd(), '.next', 'prerender-manifest.json');
        if (!fs.existsSync(prerenderPath)) {
          fs.writeFileSync(prerenderPath, JSON.stringify({ version: 4, routes: {}, dynamicRoutes: {}, staticRoutes: {}, notFoundRoutes: [] }));
        }
        setTimeout(() => { try { db.close(); } catch {} process.exit(0); }, 3000);
      }
    } catch { /* ignore */ }
  }, 5000);
}
process.on('beforeExit', () => {
  try { db.close(); } catch { /* ignore */ }
});

export default db;
