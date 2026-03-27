import { format, formatDistanceToNow, parseISO } from 'date-fns';
import { enUS } from 'date-fns/locale';

// ---------------------------------------------------------------------------
// Date formatting
// ---------------------------------------------------------------------------

/**
 * Format a date string (ISO or SQLite datetime) to a human-readable format.
 * Example: '2024-01-15' => 'January 15, 2024'
 */
export function formatDate(
  dateStr: string,
  formatStr: string = 'MMMM dd, yyyy'
): string {
  const date = parseISO(dateStr);
  return format(date, formatStr, { locale: enUS });
}

/**
 * Format a date as relative time.
 * Example: '3 days ago'
 */
export function formatRelativeDate(dateStr: string): string {
  const date = parseISO(dateStr);
  return formatDistanceToNow(date, {
    addSuffix: true,
    locale: enUS,
  });
}

// ---------------------------------------------------------------------------
// String utilities
// ---------------------------------------------------------------------------

/**
 * Truncate a string to a maximum length, adding ellipsis if needed.
 */
export function truncate(str: string, maxLength: number): string {
  if (str.length <= maxLength) return str;
  return str.slice(0, maxLength).trimEnd() + '...';
}

/**
 * Capitalize the first letter of a string.
 */
export function capitalize(str: string): string {
  if (!str) return '';
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// ---------------------------------------------------------------------------
// API response helpers
// ---------------------------------------------------------------------------

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  meta?: PaginationMeta;
}

export interface PaginationMeta {
  page: number;
  perPage: number;
  total: number;
  totalPages: number;
}

/**
 * Create a success response.
 */
export function successResponse<T>(data: T, meta?: PaginationMeta): ApiResponse<T> {
  return { success: true, data, meta };
}

/**
 * Create an error response.
 */
export function errorResponse(message: string): ApiResponse<never> {
  return { success: false, error: message };
}

/**
 * Calculate pagination offset and metadata.
 */
export function paginate(
  page: number,
  perPage: number,
  total: number
): { offset: number; meta: PaginationMeta } {
  const safePage = Math.max(1, page);
  const safePerPage = Math.min(Math.max(1, perPage), 100);
  const totalPages = Math.ceil(total / safePerPage);

  return {
    offset: (safePage - 1) * safePerPage,
    meta: {
      page: safePage,
      perPage: safePerPage,
      total,
      totalPages,
    },
  };
}

// ---------------------------------------------------------------------------
// CSS class helpers
// ---------------------------------------------------------------------------

/**
 * Conditionally join CSS class names.
 * Example: cn('base', isActive && 'active', isPrimary && 'primary')
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
