import type { Locale } from './locale'

/**
 * The four commercial lines VORTEX TRADE operates, as data.
 *
 * Separate from src/app/services.ts on purpose. That file is the *holding's*
 * service list and is rendered on the holding site; these four belong to an
 * independently branded business with its own routes, copy register and page
 * composition. The overlap in wording is real but incidental — merging the two
 * would couple two brands' copy to one file.
 *
 * `anchor` is the id of this service's section on the Trade services page, so
 * the homepage service overview and the services page sections are driven by
 * the same entry and cannot drift apart.
 *
 * NOTHING INVENTED. No minimum order quantity, price, lead time, licence,
 * stock level, product brand, carrier or country of operation appears in this
 * file or anywhere else in the Trade copy.
 */

export interface TradeService {
  slug: string
  /** Section id on /businesses/trade/services. */
  anchor: string
  /** Route for the dedicated page, where one exists. */
  href: string
  /** Numbered prefix, matching the position in this array. */
  number: string
  title: Record<Locale, string>
  summary: Record<Locale, string>
  /** What a buyer would ask. Each answers an inquiry rather than promising. */
  includes: Record<Locale, string>[]
  /** Icon key, resolved in src/app/trade-icons.ts. */
  icon: 'import' | 'wholesale' | 'sourcing' | 'procurement'
}

export const TRADE_SERVICES: TradeService[] = [
  {
    slug: 'import-export',
    anchor: 'import-export',
    href: '/businesses/trade/procurement',
    number: '01',
    icon: 'import',
    title: { en: 'Import and export', fa: 'واردات و صادرات' },
    summary: {
      en: 'Cross-border movement of goods, and the general sourcing and trade inquiries that sit behind it.',
      fa: 'جابه‌جایی کالا میان مرزها، و درخواست‌های عمومی تأمین و تجارت که پشت آن قرار دارند.',
    },
    includes: [
      { en: 'The product category', fa: 'دسته کالا' },
      { en: 'Quantity', fa: 'مقدار' },
      { en: 'Origin and destination', fa: 'مبدأ و مقصد' },
      { en: 'What the shipment must meet', fa: 'الزامات محموله' },
    ],
  },
  {
    slug: 'wholesale',
    anchor: 'wholesale',
    href: '/businesses/trade/procurement',
    number: '02',
    icon: 'wholesale',
    title: { en: 'Wholesale supply', fa: 'تأمین عمده' },
    summary: {
      en: 'Bulk purchasing and repeat commercial supply, handled as a supply arrangement rather than a transaction.',
      fa: 'خرید عمده و تأمین تجاری تکرارشونده، به‌عنوان یک توافق تأمین و نه یک معامله ساده.',
    },
    includes: [
      { en: 'Quantity and frequency', fa: 'مقدار و تناوب' },
      { en: 'Specification required', fa: 'مشخصات مورد نیاز' },
      { en: 'Packaging', fa: 'نوع بسته‌بندی' },
      { en: 'Delivery point', fa: 'محل تحویل' },
    ],
  },
  {
    slug: 'sourcing',
    anchor: 'sourcing',
    href: '/businesses/trade/procurement',
    number: '03',
    icon: 'sourcing',
    title: { en: 'Product sourcing', fa: 'تأمین محصول' },
    summary: {
      en: 'Finding product and qualifying a supplier against a specification, when you do not already have a source.',
      fa: 'یافتن محصول و ارزیابی تأمین‌کننده بر اساس مشخصات، وقتی هنوز منبعی در اختیار ندارید.',
    },
    includes: [
      { en: 'What the product must do', fa: 'کارکرد مورد انتظار محصول' },
      { en: 'Where it may come from', fa: 'مبدأهای قابل قبول' },
      { en: 'Certification you require', fa: 'گواهی مورد نیاز' },
      { en: 'Target quantity', fa: 'مقدار هدف' },
    ],
  },
  {
    slug: 'procurement',
    anchor: 'procurement',
    href: '/businesses/trade/procurement',
    number: '04',
    icon: 'procurement',
    title: { en: 'Customized procurement', fa: 'تأمین اختصاصی' },
    summary: {
      en: 'A structured way to describe a specification and a sourcing requirement, so the inquiry arrives reviewable.',
      fa: 'راهی ساختارمند برای شرح مشخصات و نیاز تأمین، تا درخواست شما قابل بررسی باشد.',
    },
    includes: [
      { en: 'Specification, as precisely as you have it', fa: 'مشخصات، تا آنجا که در اختیار دارید' },
      { en: 'Volumes', fa: 'حجم مورد نیاز' },
      { en: 'Compliance requirements', fa: 'الزامات انطباق' },
      { en: 'Your timeline', fa: 'زمان‌بندی شما' },
    ],
  },
]

export function findTradeService(slug: string): TradeService | undefined {
  return TRADE_SERVICES.find((service) => service.slug === slug)
}