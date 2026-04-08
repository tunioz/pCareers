import { execute, queryAll, queryOne } from '@/lib/db';

/**
 * AI audit log — records every call to Claude for compliance and cost tracking.
 *
 * GDPR: Stores only previews (first 500 chars) of prompts and outputs,
 * not full content. Full data can be reconstructed from candidate records
 * if needed but is never persisted here long-term.
 */

export interface AiCallLog {
  skill: string;
  userUsername: string;
  candidateId?: number;
  model: string;
  tokensIn: number;
  tokensOut: number;
  costUsd: number;
  durationMs: number;
  success: 0 | 1;
  errorMessage: string | null;
  promptPreview: string;
  outputPreview: string | null;
}

export function logAiCall(entry: AiCallLog): void {
  try {
    execute(
      `INSERT INTO ai_audit_log (
        skill, user_username, candidate_id, model,
        tokens_in, tokens_out, cost_usd, duration_ms,
        success, error_message, prompt_preview, output_preview
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        entry.skill,
        entry.userUsername,
        entry.candidateId ?? null,
        entry.model,
        entry.tokensIn,
        entry.tokensOut,
        entry.costUsd,
        entry.durationMs,
        entry.success,
        entry.errorMessage,
        entry.promptPreview,
        entry.outputPreview,
      ]
    );
  } catch (err) {
    // Never let audit failure break the AI call
    console.error('Failed to write ai_audit_log:', err);
  }
}

export interface AiSpendByDay {
  date: string;
  total_cost: number;
  total_calls: number;
  total_tokens: number;
}

export function getSpendByDay(days: number = 30): AiSpendByDay[] {
  return queryAll<AiSpendByDay>(
    `SELECT
       date(created_at) as date,
       SUM(cost_usd) as total_cost,
       COUNT(*) as total_calls,
       SUM(tokens_in + tokens_out) as total_tokens
     FROM ai_audit_log
     WHERE created_at >= datetime('now', '-' || ? || ' days')
     GROUP BY date(created_at)
     ORDER BY date DESC`,
    [days]
  );
}

export interface AiSpendBySkill {
  skill: string;
  total_cost: number;
  total_calls: number;
  avg_duration_ms: number;
  success_rate: number;
}

export function getSpendBySkill(days: number = 30): AiSpendBySkill[] {
  return queryAll<AiSpendBySkill>(
    `SELECT
       skill,
       SUM(cost_usd) as total_cost,
       COUNT(*) as total_calls,
       AVG(duration_ms) as avg_duration_ms,
       AVG(CAST(success AS REAL)) as success_rate
     FROM ai_audit_log
     WHERE created_at >= datetime('now', '-' || ? || ' days')
     GROUP BY skill
     ORDER BY total_cost DESC`,
    [days]
  );
}

export function getTotalSpendToday(): number {
  const row = queryOne<{ total: number }>(
    `SELECT COALESCE(SUM(cost_usd), 0) as total FROM ai_audit_log
     WHERE date(created_at) = date('now')`
  );
  return row?.total || 0;
}
