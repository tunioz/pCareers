import { describe, it, expect } from 'vitest';
import { t, scopedT } from '@/i18n';
import bg from '@/i18n/bg.json';
import en from '@/i18n/en.json';

describe('i18n', () => {
  it('returns Bulgarian translation by default', () => {
    expect(t('nav.home')).toBe('Начало');
    expect(t('nav.careers')).toBe('Кариери');
  });

  it('returns English translation when locale is en', () => {
    expect(t('nav.home', 'en')).toBe('Home');
    expect(t('nav.careers', 'en')).toBe('Careers');
  });

  it('falls back to English for missing bg keys', () => {
    // If a key exists in en but not bg, should return en value
    expect(t('nonexistent.key', 'bg')).toBe('nonexistent.key');
  });

  it('returns the key itself for completely missing keys', () => {
    expect(t('this.does.not.exist')).toBe('this.does.not.exist');
    expect(t('this.does.not.exist', 'en')).toBe('this.does.not.exist');
  });

  it('scopedT works for namespaced translations', () => {
    const tc = scopedT('careers');
    expect(tc('title')).toBe('Отворени позиции');

    const tcEn = scopedT('careers', 'en');
    expect(tcEn('title')).toBe('Open Positions');
  });

  it('bg and en have the same top-level keys', () => {
    const bgKeys = Object.keys(bg).sort();
    const enKeys = Object.keys(en).sort();
    expect(bgKeys).toEqual(enKeys);
  });

  it('bg and en have matching nested keys for each section', () => {
    for (const section of Object.keys(bg)) {
      const bgSection = bg[section as keyof typeof bg];
      const enSection = en[section as keyof typeof en];
      if (typeof bgSection === 'object' && typeof enSection === 'object') {
        const bgSubKeys = Object.keys(bgSection as Record<string, unknown>).sort();
        const enSubKeys = Object.keys(enSection as Record<string, unknown>).sort();
        expect(bgSubKeys, `Mismatch in section "${section}"`).toEqual(enSubKeys);
      }
    }
  });
});
