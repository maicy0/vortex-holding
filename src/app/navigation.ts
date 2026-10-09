import type { Locale } from './locale'

/**
 * Site navigation for the parent brand.
 *
 * Copy is defined in both locales so the RTL layout is exercised by real
 * Persian strings. Every href here is a live route.
 */
export interface NavItem {
  href: string
  label: Record<Locale, string>
}

export const NAV_ITEMS: NavItem[] = [
  { href: '/', label: { en: 'Home', fa: 'خانه' } },
  { href: '/about', label: { en: 'About', fa: 'درباره ما' } },
  { href: '/services', label: { en: 'Services', fa: 'خدمات' } },
  { href: '/contact', label: { en: 'Contact', fa: 'تماس' } },
]

/** Cross-links to the two independently branded sites. */
export const ECOSYSTEM_ITEMS: NavItem[] = [
  { href: '/trade', label: { en: 'Trade', fa: 'تجارت' } },
  { href: '/battery', label: { en: 'Battery', fa: 'باتری' } },
]