#!/usr/bin/env node
/**
 * Migrate all data from SQLite (data/pcloud.db) to PostgreSQL (DATABASE_URL).
 *
 * Usage: node scripts/migrate-sqlite-to-pg.js
 *
 * Requires: DATABASE_URL env var (or .env.local loaded via dotenv)
 */

const Database = require('better-sqlite3');
const { Pool } = require('pg');
const path = require('path');
const fs = require('fs');

// Load .env.local
const envPath = path.resolve(__dirname, '..', '.env.local');
if (fs.existsSync(envPath)) {
  const lines = fs.readFileSync(envPath, 'utf8').split('\n');
  for (const line of lines) {
    const match = line.match(/^([^#=]+)=(.*)$/);
    if (match) process.env[match[1].trim()] = match[2].trim();
  }
}

const DB_PATH = path.resolve(__dirname, '..', '..', 'data', 'pcloud.db');
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  console.error('ERROR: DATABASE_URL not set');
  process.exit(1);
}

// Tables in dependency order (parents first)
const TABLES = [
  'admin_users',
  'categories',
  'tags',
  'interview_templates',
  'interview_stages',
  'candidate_values',
  'pcloud_bar_criteria',
  'process_highlights',
  'default_benefits',
  'process_templates',
  'process_steps',
  'products',
  'tech_stacks',
  'gallery_categories',
  'gallery_photos',
  'team_members',
  'team_stories',
  'company_settings',
  'legal_pages',
  'email_templates',
  'jobs',
  'job_benefits',
  'posts',
  'post_tags',
  'candidates',
  'position_criteria',
  'candidate_notes',
  'candidate_scores',
  'custom_scores',
  'candidate_references',
  'candidate_history',
  'candidate_attachments',
  'candidate_task_submissions',
  'technical_tasks',
  'candidate_interview_sessions',
  'interview_kits',
  'interview_kit_questions',
  'ai_audit_log',
  'audit_log',
  'candidate_analysis',
  'candidate_emails',
];

async function main() {
  console.log(`SQLite: ${DB_PATH}`);
  console.log(`PostgreSQL: ${DATABASE_URL.replace(/:[^:@]+@/, ':***@')}`);
  console.log('');

  const sqlite = new Database(DB_PATH, { readonly: true });
  const pg = new Pool({
    connectionString: DATABASE_URL,
    ssl: DATABASE_URL.includes('railway') || DATABASE_URL.includes('neon')
      ? { rejectUnauthorized: false }
      : undefined,
  });

  const client = await pg.connect();

  try {
    // Get list of actual SQLite tables
    const sqliteTables = sqlite.prepare(
      "SELECT name FROM sqlite_master WHERE type='table' AND name NOT LIKE 'sqlite_%'"
    ).all().map(r => r.name);

    // Get list of actual PG tables
    const pgTablesResult = await client.query(
      "SELECT tablename FROM pg_tables WHERE schemaname = 'public'"
    );
    const pgTables = pgTablesResult.rows.map(r => r.tablename);

    let totalRows = 0;
    let tablesProcessed = 0;

    for (const table of TABLES) {
      // Skip if not in SQLite or PG
      if (!sqliteTables.includes(table)) continue;
      if (!pgTables.includes(table)) {
        console.log(`  SKIP ${table} (not in PG schema)`);
        continue;
      }

      const rows = sqlite.prepare(`SELECT * FROM "${table}"`).all();
      if (rows.length === 0) {
        continue; // Skip empty tables
      }

      // Get column names from the first row
      const columns = Object.keys(rows[0]);

      // Check which columns exist in PG
      const pgColsResult = await client.query(
        `SELECT column_name FROM information_schema.columns WHERE table_name = $1 AND table_schema = 'public'`,
        [table]
      );
      const pgCols = new Set(pgColsResult.rows.map(r => r.column_name));

      // Only use columns that exist in both SQLite and PG
      const commonCols = columns.filter(c => pgCols.has(c));
      if (commonCols.length === 0) {
        console.log(`  SKIP ${table} (no common columns)`);
        continue;
      }

      // Clear existing data in PG
      await client.query(`DELETE FROM "${table}"`);

      // Build INSERT statement with $1, $2, ... placeholders
      const placeholders = commonCols.map((_, i) => `$${i + 1}`).join(', ');
      const insertSql = `INSERT INTO "${table}" (${commonCols.map(c => `"${c}"`).join(', ')}) VALUES (${placeholders})`;

      // Insert rows
      let inserted = 0;
      for (const row of rows) {
        const values = commonCols.map(c => {
          const val = row[c];
          // Convert SQLite NULLs
          if (val === null || val === undefined) return null;
          return val;
        });

        try {
          await client.query(insertSql, values);
          inserted++;
        } catch (err) {
          console.error(`  ERROR ${table} row:`, err.message.slice(0, 120));
          // Try to continue with other rows
        }
      }

      // Reset sequence for SERIAL columns
      if (commonCols.includes('id')) {
        try {
          await client.query(
            `SELECT setval(pg_get_serial_sequence('"${table}"', 'id'), COALESCE((SELECT MAX(id) FROM "${table}"), 0) + 1, false)`
          );
        } catch {
          // Not all tables have sequences
        }
      }

      console.log(`  ✓ ${table}: ${inserted}/${rows.length} rows`);
      totalRows += inserted;
      tablesProcessed++;
    }

    console.log('');
    console.log(`Done: ${tablesProcessed} tables, ${totalRows} total rows migrated.`);

    // Verify counts
    console.log('');
    console.log('=== VERIFICATION ===');
    for (const table of TABLES) {
      if (!sqliteTables.includes(table) || !pgTables.includes(table)) continue;
      const sqliteCount = sqlite.prepare(`SELECT COUNT(*) as c FROM "${table}"`).get().c;
      if (sqliteCount === 0) continue;
      const pgCount = (await client.query(`SELECT COUNT(*) as c FROM "${table}"`)).rows[0].c;
      const match = parseInt(pgCount) === sqliteCount ? '✓' : '✗ MISMATCH';
      console.log(`  ${match} ${table}: SQLite=${sqliteCount} PG=${pgCount}`);
    }

  } finally {
    client.release();
    await pg.end();
    sqlite.close();
  }
}

main().catch(err => {
  console.error('FATAL:', err);
  process.exit(1);
});
