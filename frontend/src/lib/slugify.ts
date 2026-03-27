import slugifyLib from 'slugify';

/**
 * Generate a URL-safe slug from a string.
 * English only -- no transliteration needed.
 *
 * Examples:
 *   createSlug('Senior Frontend Developer') => 'senior-frontend-developer'
 *   createSlug('How We Scaled to 500 Petabytes') => 'how-we-scaled-to-500-petabytes'
 */
export function createSlug(text: string): string {
  return slugifyLib(text, {
    lower: true,
    strict: true,
    trim: true,
  });
}

/**
 * Generate a unique slug by appending a counter suffix if needed.
 * The `existsCheck` function should query the database.
 *
 * Example: 'my-post' => 'my-post', 'my-post-2', 'my-post-3', etc.
 */
export function createUniqueSlug(
  text: string,
  existsCheck: (slug: string) => boolean
): string {
  const baseSlug = createSlug(text);
  let slug = baseSlug;
  let counter = 2;

  while (existsCheck(slug)) {
    slug = `${baseSlug}-${counter}`;
    counter++;
  }

  return slug;
}
