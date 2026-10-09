import type { Locale } from './locale'

/**
 * The founders of Vortex Holding.
 *
 * Names only. No biography, portrait, founding date, achievement or company
 * statistic appears anywhere on the site, because none has been supplied.
 *
 * `initial` is a typographic placeholder derived from the surname — there is
 * no photograph to show, and the site does not invent one. It is marked
 * aria-hidden at every call site and never carries meaning.
 *
 * ALL COPY IS DRAFT CONTENT pending client review.
 */
export interface Founder {
  /** Title and given name. Persian keeps the honorific attached. */
  title: Record<Locale, string>
  /** Family name, which also yields the placeholder initial. */
  family: Record<Locale, string>
}

export const FOUNDERS: readonly Founder[] = [
  {
    title: { en: 'Mr.', fa: 'آقای' },
    family: { en: 'Ma’dani', fa: 'معدنی' },
  },
  {
    title: { en: 'Mr.', fa: 'آقای' },
    family: { en: 'Stiri', fa: 'استیری' },
  },
]

/** "Mr. Ma’dani" / "آقای معدنی" — Persian sets the honorific before the name. */
export function founderName(founder: Founder, locale: Locale): string {
  return `${founder.title[locale]} ${founder.family[locale]}`
}
