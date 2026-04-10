import bg from './bg.json';
import en from './en.json';

export type Locale = 'bg' | 'en';

const translations: Record<Locale, Record<string, unknown>> = { bg, en };

const DEFAULT_LOCALE: Locale = 'bg';

/**
 * Get a nested translation value by dot-separated key.
 * Example: t('nav.home') → 'Начало' (bg) or 'Home' (en)
 *
 * Falls back to English if key not found in current locale,
 * then to the key itself if not found in either.
 */
export function t(key: string, locale: Locale = DEFAULT_LOCALE): string {
  const value = getNestedValue(translations[locale], key);
  if (value !== undefined) return String(value);

  // Fallback to English
  if (locale !== 'en') {
    const enValue = getNestedValue(translations.en, key);
    if (enValue !== undefined) return String(enValue);
  }

  // Return key as last resort
  return key;
}

/**
 * Get all translations for a given locale.
 */
export function getTranslations(locale: Locale = DEFAULT_LOCALE): Record<string, unknown> {
  return translations[locale];
}

/**
 * Create a scoped translation function for a specific namespace.
 * Example: const tc = scopedT('careers'); tc('title') → 'Отворени позиции'
 */
export function scopedT(namespace: string, locale: Locale = DEFAULT_LOCALE) {
  return (key: string): string => t(`${namespace}.${key}`, locale);
}

function getNestedValue(obj: Record<string, unknown>, path: string): unknown {
  return path.split('.').reduce<unknown>((current, key) => {
    if (current && typeof current === 'object' && key in (current as Record<string, unknown>)) {
      return (current as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

export { DEFAULT_LOCALE };
