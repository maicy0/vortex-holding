import type { Locale } from './locale'

/**
 * Navigation for VORTEX TRADE.
 *
 * Kept separate from src/app/navigation.ts, which belongs to the holding
 * site, so the two brands' link sets cannot be confused by a shared constant.
 * Both are plain data: `TradeLayout` renders whichever list it is given.
 *
 * Every href here is a live route under /businesses/trade.
 */
export interface TradeNavItem {
  href: string
  label: Record<Locale, string>
}

export const TRADE_NAV: TradeNavItem[] = [
  { href: '/businesses/trade', label: { en: 'Overview', fa: 'نمای کلی' } },
  { href: '/businesses/trade/services', label: { en: 'Services', fa: 'خدمات' } },
  {
    href: '/businesses/trade/procurement',
    label: { en: 'Procurement', fa: 'تأمین' },
  },
  {
    href: '/businesses/trade/contact',
    label: { en: 'Contact', fa: 'تماس' },
  },
]

/** The way back to the parent company, from anywhere in the Trade site. */
export const TRADE_PARENT_LINK: TradeNavItem = {
  href: '/',
  label: { en: 'Vortex Holding', fa: 'هلدینگ ورتکس' },
}