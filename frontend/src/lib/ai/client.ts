import Anthropic from '@anthropic-ai/sdk';
import { logAiCall, type AiCallLog } from './audit';

/**
 * Centralized Claude client for the ATS AI layer.
 *
 * Responsibilities:
 *   - Instantiate a single Anthropic SDK client
 *   - Enforce per-admin daily budget (cost cap)
 *   - Circuit breaker: if N consecutive calls fail, open the circuit for M minutes
 *   - Uniform error handling + audit logging
 *   - Type-safe wrapper for structured outputs
 */

// ---------------------------------------------------------------------------
// Environment
// ---------------------------------------------------------------------------

const API_KEY = process.env.ANTHROPIC_API_KEY;
const DAILY_BUDGET_USD = parseFloat(process.env.AI_DAILY_BUDGET_USD || '5');

// Model IDs (sync with CLAUDE.md canonical list)
export const MODELS = {
  opus: 'claude-opus-4-6',
  sonnet: 'claude-sonnet-4-6',
  haiku: 'claude-haiku-4-5-20251001',
} as const;

export type ModelKey = keyof typeof MODELS;

// Approximate cost per 1M tokens (input / output) in USD
const PRICING: Record<ModelKey, { input: number; output: number }> = {
  opus: { input: 15, output: 75 },
  sonnet: { input: 3, output: 15 },
  haiku: { input: 1, output: 5 },
};

// ---------------------------------------------------------------------------
// Client singleton
// ---------------------------------------------------------------------------

let client: Anthropic | null = null;

function getClient(): Anthropic {
  if (!API_KEY) {
    throw new Error(
      'ANTHROPIC_API_KEY is not set. Add it to .env.local or Railway env vars to enable AI features.'
    );
  }
  if (!client) {
    client = new Anthropic({ apiKey: API_KEY });
  }
  return client;
}

export function isAiAvailable(): boolean {
  return Boolean(API_KEY);
}

// ---------------------------------------------------------------------------
// Circuit breaker
// ---------------------------------------------------------------------------

interface CircuitState {
  consecutiveFailures: number;
  openedAt: number | null;
}

const circuit: CircuitState = {
  consecutiveFailures: 0,
  openedAt: null,
};

const CIRCUIT_THRESHOLD = 5;
const CIRCUIT_OPEN_MS = 5 * 60 * 1000; // 5 minutes

function isCircuitOpen(): boolean {
  if (circuit.openedAt === null) return false;
  if (Date.now() - circuit.openedAt > CIRCUIT_OPEN_MS) {
    // Half-open: allow next call to attempt reset
    circuit.openedAt = null;
    circuit.consecutiveFailures = 0;
    return false;
  }
  return true;
}

function recordSuccess() {
  circuit.consecutiveFailures = 0;
  circuit.openedAt = null;
}

function recordFailure() {
  circuit.consecutiveFailures += 1;
  if (circuit.consecutiveFailures >= CIRCUIT_THRESHOLD) {
    circuit.openedAt = Date.now();
  }
}

// ---------------------------------------------------------------------------
// Daily budget enforcement
// ---------------------------------------------------------------------------

import { queryOne } from '@/lib/db';

function getTodaySpendForUser(username: string): number {
  const row = queryOne<{ total: number }>(
    `SELECT COALESCE(SUM(cost_usd), 0) as total FROM ai_audit_log
     WHERE user_username = ? AND date(created_at) = date('now')`,
    [username]
  );
  return row?.total || 0;
}

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AiCallOptions {
  model?: ModelKey;
  maxTokens?: number;
  temperature?: number;
  systemPrompt?: string;
  userPrompt: string;
  // Context for audit log
  skill: string; // e.g. 'parse-cv', 'draft-scorecard'
  userUsername: string;
  candidateId?: number;
  // If provided, response must be valid JSON matching this description
  jsonSchemaHint?: string;
}

export interface AiCallResult<T = string> {
  ok: boolean;
  data?: T;
  error?: string;
  tokensIn?: number;
  tokensOut?: number;
  costUsd?: number;
  durationMs?: number;
}

// ---------------------------------------------------------------------------
// Core call function
// ---------------------------------------------------------------------------

function computeCost(model: ModelKey, tokensIn: number, tokensOut: number): number {
  const price = PRICING[model];
  return (tokensIn * price.input + tokensOut * price.output) / 1_000_000;
}

export async function callAi(options: AiCallOptions): Promise<AiCallResult<string>> {
  const {
    model = 'sonnet',
    maxTokens = 4096,
    temperature = 0.2,
    systemPrompt,
    userPrompt,
    skill,
    userUsername,
    candidateId,
  } = options;

  const startTime = Date.now();

  // Guard: AI available
  if (!isAiAvailable()) {
    return { ok: false, error: 'AI is not configured (ANTHROPIC_API_KEY missing)' };
  }

  // Guard: circuit breaker
  if (isCircuitOpen()) {
    return { ok: false, error: 'AI circuit breaker is open, try again in a few minutes' };
  }

  // Guard: daily budget
  const todaySpend = getTodaySpendForUser(userUsername);
  if (todaySpend >= DAILY_BUDGET_USD) {
    return {
      ok: false,
      error: `Daily AI budget reached ($${todaySpend.toFixed(2)}/$${DAILY_BUDGET_USD})`,
    };
  }

  try {
    const anthropic = getClient();
    const response = await anthropic.messages.create({
      model: MODELS[model],
      max_tokens: maxTokens,
      temperature,
      ...(systemPrompt ? { system: systemPrompt } : {}),
      messages: [{ role: 'user', content: userPrompt }],
    });

    const textContent = response.content
      .map((block) => (block.type === 'text' ? block.text : ''))
      .join('\n');

    const tokensIn = response.usage.input_tokens;
    const tokensOut = response.usage.output_tokens;
    const costUsd = computeCost(model, tokensIn, tokensOut);
    const durationMs = Date.now() - startTime;

    recordSuccess();

    // Audit log (fire and forget but still await for consistency)
    const logEntry: AiCallLog = {
      skill,
      userUsername,
      candidateId,
      model: MODELS[model],
      tokensIn,
      tokensOut,
      costUsd,
      durationMs,
      success: 1,
      errorMessage: null,
      promptPreview: userPrompt.slice(0, 500),
      outputPreview: textContent.slice(0, 500),
    };
    logAiCall(logEntry);

    return {
      ok: true,
      data: textContent,
      tokensIn,
      tokensOut,
      costUsd,
      durationMs,
    };
  } catch (err) {
    recordFailure();
    const message = err instanceof Error ? err.message : 'Unknown AI error';
    const durationMs = Date.now() - startTime;

    logAiCall({
      skill,
      userUsername,
      candidateId,
      model: MODELS[model],
      tokensIn: 0,
      tokensOut: 0,
      costUsd: 0,
      durationMs,
      success: 0,
      errorMessage: message.slice(0, 500),
      promptPreview: userPrompt.slice(0, 500),
      outputPreview: null,
    });

    return { ok: false, error: message, durationMs };
  }
}

// ---------------------------------------------------------------------------
// JSON output helper
// ---------------------------------------------------------------------------

/**
 * Call AI and parse the response as JSON.
 * Handles the common case where Claude wraps JSON in ```json ... ``` blocks.
 */
export async function callAiJson<T = unknown>(
  options: AiCallOptions
): Promise<AiCallResult<T>> {
  const result = await callAi(options);
  if (!result.ok || !result.data) {
    return result as AiCallResult<T>;
  }

  // Strip markdown code fences if present
  let text = result.data.trim();
  const jsonFence = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonFence) {
    text = jsonFence[1].trim();
  }

  try {
    const parsed = JSON.parse(text) as T;
    return { ...result, data: parsed };
  } catch (err) {
    return {
      ok: false,
      error: `Failed to parse AI response as JSON: ${err instanceof Error ? err.message : 'unknown'}`,
      tokensIn: result.tokensIn,
      tokensOut: result.tokensOut,
      costUsd: result.costUsd,
      durationMs: result.durationMs,
    };
  }
}
