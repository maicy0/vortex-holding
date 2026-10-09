import type { Locale } from './locale'

/**
 * Index data for the five service lines of the holding.
 *
 * This is the short form — what a card, a nav entry or a dropdown needs. The
 * full copy for each service page (hero, description, customer types, use
 * cases, how an inquiry moves, closing call to action) lives in
 * src/app/service-pages.ts, keyed by the same slug.
 *
 * Copy lives here rather than in the page components so the whole site's
 * bilingual copy is one auditable file; English strings are drafted alongside
 * the Persian.
 *
 * ALL COPY IS DRAFT CONTENT pending client review.
 */

export interface Service {
  slug: string
  path: string
  title: Record<Locale, string>
  /** One line, used on cards and in the hero strip. */
  summary: Record<Locale, string>
  /** Icon key, resolved in src/app/service-icons.ts */
  icon: 'container' | 'warehouse' | 'store' | 'battery' | 'sourcing'
}

export const SERVICES: Service[] = [
  {
    slug: 'import-export',
    path: '/services/import-export',
    icon: 'container',
    title: { en: 'Import & Export', fa: 'واردات و صادرات' },
    summary: {
      en: 'International trade of goods, coordinated end to end.',
      fa: 'بازرگانی بین‌المللی کالا با هماهنگی سرتاسری.',
    },
  },
  {
    slug: 'wholesale',
    path: '/services/wholesale',
    icon: 'warehouse',
    title: { en: 'Wholesale', fa: 'بازرگانی عمده' },
    summary: {
      en: 'Bulk supply of goods to businesses and resellers.',
      fa: 'تأمین عمده کالا برای کسب‌وکارها و واسطه‌ها.',
    },
  },
  {
    slug: 'retail',
    path: '/services/retail',
    icon: 'store',
    title: { en: 'Retail', fa: 'خرده‌فروشی' },
    summary: {
      en: 'Sale of goods direct to end consumers.',
      fa: 'فروش کالا مستقیماً به مصرف‌کننده نهایی.',
    },
  },
  {
    slug: 'batteries',
    path: '/services/batteries',
    icon: 'battery',
    title: { en: 'Batteries', fa: 'باتری' },
    summary: {
      en: 'Battery products and energy storage solutions.',
      fa: 'محصولات باتری و راهکارهای ذخیره‌سازی انرژی.',
    },
  },
  {
    slug: 'procurement',
    path: '/services/procurement',
    icon: 'sourcing',
    title: { en: 'Procurement', fa: 'تأمین کالا' },
    summary: {
      en: 'Structured purchasing, from specification to delivery.',
      fa: 'خرید ساختاریافته، از تعیین مشخصات تا تحویل.',
    },
  },
]

export function findService(slug: string): Service | undefined {
  return SERVICES.find((service) => service.slug === slug)
}