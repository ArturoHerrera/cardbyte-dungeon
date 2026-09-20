import { SupportedLocale, TranslationDictionary } from './types';
import { en } from './en';
import { es } from './es';

export * from './types';

export const dictionaries: Record<SupportedLocale, TranslationDictionary> = {
  en,
  es,
};

/**
 * Retrieves a nested string key path from the dictionary (e.g. 'titleScreen.jackIn')
 * and interpolates optional dynamic parameters (e.g. {{hp}} -> 24).
 */
export function t(
  locale: SupportedLocale,
  keyPath: string,
  params?: Record<string, string | number>
): string {
  const dict = dictionaries[locale] || dictionaries.en;
  const parts = keyPath.split('.');
  
  let current: unknown = dict;
  for (const part of parts) {
    if (current && typeof current === 'object' && part in current) {
      current = (current as Record<string, unknown>)[part];
    } else {
      // Fallback to English dictionary if key not found
      let fallback: unknown = dictionaries.en;
      for (const p of parts) {
        if (fallback && typeof fallback === 'object' && p in fallback) {
          fallback = (fallback as Record<string, unknown>)[p];
        } else {
          return keyPath; // Return key path as ultimate fallback
        }
      }
      current = fallback;
      break;
    }
  }

  if (typeof current !== 'string') {
    return keyPath;
  }

  if (!params) {
    return current;
  }

  // Replace {{paramName}} tokens
  return current.replace(/\{\{\s*(\w+)\s*\}\}/g, (_, paramName) => {
    return params[paramName] !== undefined ? String(params[paramName]) : `{{${paramName}}}`;
  });
}
