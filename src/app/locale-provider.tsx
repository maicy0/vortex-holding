import { useEffect, useMemo, useState } from 'react'

import { LocaleContext, type LocaleContextValue } from './locale-context'
import { DEFAULT_LOCALE, LOCALE_DIR, LOCALE_TAG, type Locale } from './locale'

export function LocaleProvider({
  initialLocale = DEFAULT_LOCALE,
  children,
}: {
  initialLocale?: Locale
  children: React.ReactNode
}) {
  const [locale, setLocale] = useState<Locale>(
    // Read from localStorage if available, otherwise fall back to default.
    typeof localStorage !== 'undefined' && localStorage.getItem('locale')
      ? (localStorage.getItem('locale') as Locale)
      : initialLocale,
  )

  useDocumentLocale(locale)

  // Persist the chosen locale so it survives reload and brand-crossing.
  useEffect(() => {
    try {
      localStorage.setItem('locale', locale)
    } catch {}
  }, [locale])

  const value = useMemo<LocaleContextValue>(
    () => ({
      locale,
      dir: LOCALE_DIR[locale],
      setLocale,
      toggleLocale: () =>
        setLocale((current) => (current === 'en' ? 'fa' : 'en')),
    }),
    [locale],
  )

  return (
    <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
  )
}

/**
 * Keeps <html lang> and <html dir> in sync with the active locale.
 *
 * Document-level rather than per-subtree on purpose: text direction drives
 * layout, and a document carrying two directions is a bug rather than a
 * feature. The font stack and RTL typography rules in global.css key off
 * these attributes.
 */
function useDocumentLocale(locale: Locale) {
  useEffect(() => {
    const root = document.documentElement
    root.lang = LOCALE_TAG[locale]
    root.dir = LOCALE_DIR[locale]
  }, [locale])
}