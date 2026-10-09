export const LOCALES = ['en', 'fa'] as const

export type Locale = (typeof LOCALES)[number]

/**
 * Persian is the primary language for this site, so the document starts in
 * RTL. Switching to 'en' flips the whole page via <html dir>.
 */
export const DEFAULT_LOCALE: Locale = 'fa'

export const LOCALE_DIR: Record<Locale, 'ltr' | 'rtl'> = {
  en: 'ltr',
  fa: 'rtl',
}

/** BCP 47 tags, for `lang` on the document and on language controls. */
export const LOCALE_TAG: Record<Locale, string> = {
  en: 'en',
  fa: 'fa',
}

export function isLocale(value: string): value is Locale {
  return (LOCALES as readonly string[]).includes(value)
}