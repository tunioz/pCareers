/**
 * Fetch and extract text content from URLs for AI analysis.
 *
 * Used to pull candidate profile data from LinkedIn, GitHub, portfolio sites, etc.
 * Strips HTML tags, scripts, styles. Returns clean text limited to maxLength.
 *
 * Timeouts after 8 seconds per URL. Failures are silent (returns null).
 */

const FETCH_TIMEOUT_MS = 8000;
const MAX_TEXT_LENGTH = 4000;

// Common elements to strip from HTML
const STRIP_TAGS = /<(script|style|noscript|iframe|svg|head|nav|footer|header)[^>]*>[\s\S]*?<\/\1>/gi;
const STRIP_HTML = /<[^>]+>/g;
const COLLAPSE_WHITESPACE = /\s{2,}/g;

interface FetchResult {
  url: string;
  text: string | null;
  error?: string;
}

/**
 * Fetch a single URL and extract readable text.
 */
async function fetchUrlText(url: string): Promise<FetchResult> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);

    const response = await fetch(url, {
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; pCloudATS/1.0; +https://careers.pcloud.com)',
        'Accept': 'text/html,application/xhtml+xml,text/plain',
      },
      redirect: 'follow',
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return { url, text: null, error: `HTTP ${response.status}` };
    }

    const contentType = response.headers.get('content-type') || '';
    const body = await response.text();

    let text: string;
    if (contentType.includes('text/html') || contentType.includes('application/xhtml')) {
      // Strip HTML tags, scripts, styles
      text = body
        .replace(STRIP_TAGS, ' ')
        .replace(STRIP_HTML, ' ')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(COLLAPSE_WHITESPACE, ' ')
        .trim();
    } else {
      // Plain text or JSON — use as-is
      text = body.trim();
    }

    // Truncate
    if (text.length > MAX_TEXT_LENGTH) {
      text = text.slice(0, MAX_TEXT_LENGTH) + '...[truncated]';
    }

    return { url, text: text.length > 50 ? text : null }; // Skip if too short (likely blocked)
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return { url, text: null, error: message.includes('abort') ? 'Timeout' : message };
  }
}

/**
 * Fetch multiple URLs in parallel. Returns results for each URL.
 * URLs that fail or return no useful content have text: null.
 */
export async function fetchProfileUrls(urls: { label: string; url: string }[]): Promise<
  Array<{ label: string; url: string; text: string | null; error?: string }>
> {
  const validUrls = urls.filter(u => u.url && u.url.startsWith('http'));
  if (validUrls.length === 0) return [];

  const results = await Promise.allSettled(
    validUrls.map(async ({ label, url }) => {
      const result = await fetchUrlText(url);
      return { label, url, text: result.text, error: result.error };
    })
  );

  return results.map((r, i) => {
    if (r.status === 'fulfilled') return r.value;
    return { ...validUrls[i], text: null, error: 'Fetch failed' };
  });
}
