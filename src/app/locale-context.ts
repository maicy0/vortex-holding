import { createContext, useContext } from 'react'

import { DEFAULT_LOCALE, LOCALE_DIR, type Locale } from './locale'

export interface LocaleContextValue {
  locale: Locale
  dir: 'ltr' | 'rtl'
  setLocale: (next: Locale) => void
  toggleLocale: () => void
}

export const LocaleContext = createContext<LocaleContextValue>({
  locale: DEFAULT_LOCALE,
  dir: LOCALE_DIR[DEFAULT_LOCALE],
  setLocale: () => {},
  toggleLocale: () => {},
})

export function useLocale(): LocaleContextValue {
  return useContext(LocaleContext)
}