import type { Locale } from './locale'

/**
 * Navigation for VORTEX BATTERY.
 *
 * Kept separate from src/app/navigation.ts (holding) and
 * src/app/trade-navigation.ts (Trade), for the same reason: three brands with
 * three link sets should not share a constant, because a shared constant is
 * exactly how one brand's link ends up in another's header.
 *
 * Every href here is a live route under /businesses/batteries. Note that the
 * catalogue lives at /products and not at /catalog — the route is the public
 * contract of the site, and it is written out in full rather than assembled
 * from a prefix, so a rename cannot leave a dangling link behind.
 */
export interface BatteryNavItem {
  href: string
  label: Record<Locale, string>
}

export const BATTERY_NAV: BatteryNavItem[] = [
  {
    href: '/businesses/batteries',
    label: { en: 'Overview', fa: 'نمای کلی' },
  },
  {
    href: '/businesses/batteries/products',
    label: { en: 'Products', fa: 'محصولات' },
  },
  {
    href: '/businesses/batteries/wholesale',
    label: { en: 'Wholesale', fa: 'عمده‌فروشی' },
  },
  {
    href: '/businesses/batteries/contact',
    label: { en: 'Contact', fa: 'تماس' },
  },
]

/** The way back to the parent company, from anywhere in the Battery site. */
export const BATTERY_PARENT_LINK: BatteryNavItem = {
  href: '/',
  label: { en: 'Vortex Holding', fa: 'هلدینگ ورتکس' },
}