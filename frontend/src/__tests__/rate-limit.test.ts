import { describe, it, expect } from 'vitest';
import { checkRateLimit } from '@/lib/rate-limit';

describe('rate-limit', () => {
  it('allows requests within the limit', () => {
    const key = `test-${Date.now()}-allow`;
    expect(checkRateLimit(key, 3, 60000).allowed).toBe(true);
    expect(checkRateLimit(key, 3, 60000).allowed).toBe(true);
    expect(checkRateLimit(key, 3, 60000).allowed).toBe(true);
  });

  it('blocks requests exceeding the limit', () => {
    const key = `test-${Date.now()}-block`;
    checkRateLimit(key, 2, 60000);
    checkRateLimit(key, 2, 60000);
    const result = checkRateLimit(key, 2, 60000);
    expect(result.allowed).toBe(false);
    expect(result.retryAfter).toBeGreaterThan(0);
  });

  it('resets after window expires', () => {
    const key = `test-${Date.now()}-reset`;
    // Use a very short window
    checkRateLimit(key, 1, 1); // 1ms window
    // After the window, should be allowed again
    // Sleep briefly
    const start = Date.now();
    while (Date.now() - start < 5) { /* wait 5ms */ }
    expect(checkRateLimit(key, 1, 1).allowed).toBe(true);
  });

  it('different keys have independent limits', () => {
    const key1 = `test-${Date.now()}-a`;
    const key2 = `test-${Date.now()}-b`;
    checkRateLimit(key1, 1, 60000);
    const r1 = checkRateLimit(key1, 1, 60000);
    const r2 = checkRateLimit(key2, 1, 60000);
    expect(r1.allowed).toBe(false);
    expect(r2.allowed).toBe(true);
  });
});
