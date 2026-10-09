import type { Locale } from './locale'

/**
 * The VORTEX BATTERY product catalogue, as data.
 *
 * Separate from src/app/services.ts and src/app/trade-services.ts for the same
 * reason those are separate: a third independently branded business with its
 * own copy register and its own page composition. The category `anchor` is the
 * id of that category's section on the products page, so the homepage's
 * category navigation and the products page's sections are driven by one entry
 * and cannot drift apart.
 *
 * ---------------------------------------------------------------------------
 * EVERY ENTRY BELOW IS A DEMONSTRATION FIXTURE
 *
 * No cell, module or pack in this file exists, has been quoted, has been
 * sampled, or has been ordered. Nothing here is inventory, and nothing here may
 * be represented as inventory. The figures are plausible demonstration values,
 * present so the catalogue, the filter, the specification tables and the
 * product-detail pattern can be seen and reviewed in a working state — that is
 * the only job they do.
 *
 * Three consequences shape the whole design:
 *
 * 1. The empty fields are the point. `brand`, `datasheetUrl` and `image` are
 *    modelled as genuinely optional and are left unset on every fixture. A
 *    manufacturer name would be an invented company; a datasheet URL would be
 *    a link to nothing; a product photograph would be a picture of somebody
 *    else's product presented as this one. The catalogue therefore renders
 *    explicit "not supplied" states, which is also the state a real catalogue
 *    is in on the day before its first part is loaded.
 *
 * 2. Cell format names and chemistries are not product data. `18650` means
 *    18 mm × 65 mm because that is what the format name denotes, and
 *    LiFePO₄ / LTO / NMC are chemistry classifications, not claims about stock.
 *    Those two fields are therefore real. Capacity, voltage and dimensions are
 *    per-product and belong to a specific cell — so they are demonstration
 *    values like everything else here.
 *
 * 3. The fixtures are labelled at every point of use, not just once at the
 *    top. `CATALOGUE_STATUS` is rendered as a banner above the catalogue, as a
 *    tag on every product card, and as a caption on every specification table,
 *    so no screenshot of any single element can travel without its label.
 *
 * Replacing this file with real data is a data change, not a code change:
 * fill in the fields below, and the cards, tables, filters and the
 * product-detail pattern all render whatever they are given. The
 * demonstration labelling is wired to the presence of fixtures in
 * `batteryIsDemonstration` below, and is removed by setting it to false.
 * ---------------------------------------------------------------------------
 */

export interface BatteryCategory {
  id: string
  /** Section id on /businesses/batteries/products. */
  anchor: string
  label: Record<Locale, string>
  summary: Record<Locale, string>
  /**
   * Icon key, resolved in src/app/battery-icons.ts. Named by cell *shape*,
   * because that is how a cell catalogue is actually organised — a buyer asks
   * for a format far more often than they ask for an application.
   */
  icon: 'cylindrical' | 'pouch' | 'prismatic' | 'module'
}

/**
 * A catalogue entry.
 *
 * Every field after `category` is optional, and every one of them is optional
 * for a reason: this is the shape a product has to be able to be in before
 * anything is known about it. `ProductSpecTable` and `ProductDetail` render an
 * explicit not-supplied state for each absent field rather than hiding the row,
 * so an incomplete entry looks incomplete instead of looking short.
 */
export interface BatteryProduct {
  /** Stable key: React list key, and the #anchor on the products page. */
  id: string
  name: Record<Locale, string>
  category: string
  /** Chemistry is a classification, not a product claim, so it is required. */
  chemistry: Record<Locale, string>
  /** Manufacturer or supplier. Unset: no brand has been appointed. */
  brand?: Record<Locale, string>
  /** Nominal cell or pack voltage. */
  voltage?: Record<Locale, string>
  /** Nominal capacity. */
  capacity?: Record<Locale, string>
  /** Physical envelope. */
  dimensions?: Record<Locale, string>
  /** What the product is typically considered for. */
  applications?: Record<Locale, string>[]
  /** Link to the manufacturer's datasheet. Unset: none exists to link to. */
  datasheetUrl?: string
  /** Product photograph, with the credit its licence requires. */
  image?: BatteryImage
  /** Configuration note — series count, cell count, pack layout. */
  configuration?: Record<Locale, string>
}

export interface BatteryImage {
  src: string
  /** Optional WebP sibling, served first when present. */
  webp?: string
  alt: string
  /** Required attribution line, rendered as a caption wherever it is used. */
  credit: string
}

export const BATTERY_CATEGORIES: BatteryCategory[] = [
  {
    id: 'cylindrical',
    anchor: 'cylindrical',
    icon: 'cylindrical',
    label: { en: 'Cylindrical cells', fa: 'سلول‌های استوانه‌ای' },
    summary: {
      en: 'Round cells named for their diameter and length in millimetres — 18650, 21700, 32700 and the formats either side of them.',
      fa: 'سلول‌های گرد که نامشان از قطر و طول آن‌ها به میلی‌متر گرفته شده است — ۱۸۶۵۰، ۲۱۷۰۰، ۳۲۷۰۰ و قالب‌های پیرامون آن‌ها.',
    },
  },
  {
    id: 'pouch',
    anchor: 'pouch',
    icon: 'pouch',
    label: { en: 'Pouch cells', fa: 'سلول‌های پاکتی' },
    summary: {
      en: 'Flat laminated cells that stack efficiently and suit thin assemblies, where a cylindrical cell would waste volume.',
      fa: 'سلول‌های تخت لمینت‌شده که به‌طور کارآمد روی هم چیده می‌شوند و برای مجموعه‌های باریک، جایی که سلول استوانه‌ای حجم هدر می‌دهد، مناسب‌اند.',
    },
  },
  {
    id: 'prismatic',
    anchor: 'prismatic',
    icon: 'prismatic',
    label: { en: 'Prismatic cells', fa: 'سلول‌های منشوری' },
    summary: {
      en: 'Hard-case rectangular cells in the capacity range stationary storage and industrial duty are built around.',
      fa: 'سلول‌های مستطیلی با قاب سخت در بازه ظرفیتی که ذخیره‌سازی ثابت و کاربرد صنعتی بر پایه آن ساخته می‌شود.',
    },
  },
  {
    id: 'module',
    anchor: 'module',
    icon: 'module',
    label: { en: 'Modules and packs', fa: 'ماژول‌ها و پک‌ها' },
    summary: {
      en: 'Multiple cells combined in series, parallel or both, with the busbar, enclosure and balancing arrangement already decided.',
      fa: 'چند سلول که به‌صورت سری، موازی یا هر دو ترکیب شده‌اند و شمش، محفظه و آرایش متعادل‌سازی آن‌ها از پیش تعیین شده است.',
    },
  },
]

/**
 * DEMONSTRATION FIXTURES — see the header of this file. Nothing below is
 * inventory.
 *
 * Names are format designations and chemistry, never a manufacturer or a model
 * code: `18650 NMC Cell` describes a category of cell, and asserts nothing about
 * any particular product from any particular company.
 */
export const BATTERY_PRODUCTS: BatteryProduct[] = [
  {
    id: '18650-nmc',
    name: { en: '18650 NMC Cell', fa: 'سلول ۱۸۶۵۰ NMC' },
    category: 'cylindrical',
    chemistry: { en: 'Lithium-ion (NMC)', fa: 'لیتیوم-یون (NMC)' },
    voltage: { en: '3.6 V nominal', fa: '۳٫۶ ولت اسمی' },
    capacity: { en: '3,000 mAh', fa: '۳٬۰۰۰ میلی‌آمپرساعت' },
    dimensions: { en: 'Ø 18 × 65 mm', fa: 'قطر ۱۸ × ۶۵ میلی‌متر' },
    applications: [
      { en: 'Cordless power tools', fa: 'ابزار برقی شارژی' },
      { en: 'Flashlights and torches', fa: 'چراغ‌قوه و نورافکن' },
      { en: 'Consumer electronics', fa: 'لوازم الکترونیکی مصرفی' },
    ],
  },
  {
    id: '21700-lfp',
    name: { en: '21700 LFP Cell', fa: 'سلول ۲۱۷۰۰ LFP' },
    category: 'cylindrical',
    chemistry: { en: 'Lithium iron phosphate (LiFePO₄)', fa: 'فوسفات آهن لیتیوم (LiFePO₄)' },
    voltage: { en: '3.2 V nominal', fa: '۳٫۲ ولت اسمی' },
    capacity: { en: '5,000 mAh', fa: '۵٬۰۰۰ میلی‌آمپرساعت' },
    dimensions: { en: 'Ø 21 × 70 mm', fa: 'قطر ۲۱ × ۷۰ میلی‌متر' },
    applications: [
      { en: 'Electric bicycles', fa: 'دوچرخه‌های برقی' },
      { en: 'Portable power stations', fa: 'نیروگاه‌های همراه' },
      { en: 'Solar storage', fa: 'ذخیره‌سازی خورشیدی' },
    ],
  },
  {
    id: '32700-lto',
    name: { en: '32700 LTO Cell', fa: 'سلول ۳۲۷۰۰ LTO' },
    category: 'cylindrical',
    chemistry: { en: 'Lithium titanate (LTO)', fa: 'تیتانات لیتیوم (LTO)' },
    voltage: { en: '2.3 V nominal', fa: '۲٫۳ ولت اسمی' },
    capacity: { en: '5,000 mAh', fa: '۵٬۰۰۰ میلی‌آمپرساعت' },
    dimensions: { en: 'Ø 32 × 70 mm', fa: 'قطر ۳۲ × ۷۰ میلی‌متر' },
    applications: [
      { en: 'Uninterruptible power supplies', fa: 'منابع تغذیه بدون وقفه' },
      { en: 'Telecom backup', fa: 'پشتیبان مخابراتی' },
      { en: 'High-cycle cycling duty', fa: 'کاربرد چرخه‌ای با سیکل بالا' },
    ],
  },
  {
    id: 'pouch-nmc',
    name: { en: 'Pouch Cell, 5 Ah', fa: 'سلول پاکتی، ۵ آمپرساعت' },
    category: 'pouch',
    chemistry: { en: 'Lithium-ion (NMC)', fa: 'لیتیوم-یون (NMC)' },
    voltage: { en: '3.7 V nominal', fa: '۳٫۷ ولت اسمی' },
    capacity: { en: '5,000 mAh', fa: '۵٬۰۰۰ میلی‌آمپرساعت' },
    dimensions: { en: '74 × 36 × 4 mm', fa: '۷۴ × ۳۶ × ۴ میلی‌متر' },
    applications: [
      { en: 'Tablets and laptops', fa: 'تبلت و لپ‌تاپ' },
      { en: 'Unmanned aerial vehicles', fa: 'پهپاد' },
      { en: 'Wearables', fa: 'پوشیدنی‌های هوشمند' },
    ],
  },
  {
    id: 'pouch-lfp',
    name: { en: 'LFP Pouch Cell, 10 Ah', fa: 'سلول پاکتی LFP، ۱۰ آمپرساعت' },
    category: 'pouch',
    chemistry: { en: 'Lithium iron phosphate (LiFePO₄)', fa: 'فوسفات آهن لیتیوم (LiFePO₄)' },
    voltage: { en: '3.2 V nominal', fa: '۳٫۲ ولت اسمی' },
    capacity: { en: '10,000 mAh', fa: '۱۰٬۰۰۰ میلی‌آمپرساعت' },
    dimensions: { en: '120 × 65 × 4 mm', fa: '۱۲۰ × ۶۵ × ۴ میلی‌متر' },
    applications: [
      { en: 'Portable power stations', fa: 'نیروگاه‌های همراه' },
      { en: 'Solar storage', fa: 'ذخیره‌سازی خورشیدی' },
      { en: 'Small electric vehicle packs', fa: 'پک خودروهای برقی کوچک' },
    ],
  },
  {
    id: 'prismatic-lfp-100',
    name: { en: 'Prismatic LFP Cell, 100 Ah', fa: 'سلول منشوری LFP، ۱۰۰ آمپرساعت' },
    category: 'prismatic',
    chemistry: { en: 'Lithium iron phosphate (LiFePO₄)', fa: 'فوسفات آهن لیتیوم (LiFePO₄)' },
    voltage: { en: '3.2 V nominal', fa: '۳٫۲ ولت اسمی' },
    capacity: { en: '100 Ah', fa: '۱۰۰ آمپرساعت' },
    dimensions: { en: '130 × 66 × 38 mm', fa: '۱۳۰ × ۶۶ × ۳۸ میلی‌متر' },
    applications: [
      { en: 'Solar storage', fa: 'ذخیره‌سازی خورشیدی' },
      { en: 'Uninterruptible power supplies', fa: 'منابع تغذیه بدون وقفه' },
      { en: 'Small commercial vehicles', fa: 'خودروهای تجاری کوچک' },
    ],
  },
  {
    id: 'prismatic-lfp-280',
    name: { en: 'Prismatic LFP Cell, 280 Ah', fa: 'سلول منشوری LFP، ۲۸۰ آمپرساعت' },
    category: 'prismatic',
    chemistry: { en: 'Lithium iron phosphate (LiFePO₄)', fa: 'فوسفات آهن لیتیوم (LiFePO₄)' },
    voltage: { en: '3.2 V nominal', fa: '۳٫۲ ولت اسمی' },
    capacity: { en: '280 Ah', fa: '۲۸۰ آمپرساعت' },
    dimensions: { en: '200 × 142 × 49 mm', fa: '۲۰۰ × ۱۴۲ × ۴۹ میلی‌متر' },
    applications: [
      { en: 'Energy storage systems', fa: 'سامانه‌های ذخیره‌سازی انرژی' },
      { en: 'Solar installations', fa: 'تأسیسات خورشیدی' },
      { en: 'Industrial equipment', fa: 'تجهیزات صنعتی' },
    ],
  },
  {
    id: 'module-18650-4s',
    name: { en: '18650 Module, 4S', fa: 'ماژول ۱۸۶۵۰، ۴ سری' },
    category: 'module',
    chemistry: { en: 'Lithium-ion (NMC)', fa: 'لیتیوم-یون (NMC)' },
    configuration: {
      en: '4 cells in series, protected pack',
      fa: '۴ سلول به‌صورت سری، پک محافظت‌شده',
    },
    voltage: { en: '14.4 V nominal (4S)', fa: '۱۴٫۴ ولت اسمی (۴ سری)' },
    capacity: { en: '3,000 mAh', fa: '۳٬۰۰۰ میلی‌آمپرساعت' },
    dimensions: { en: '65 × 40 × 40 mm', fa: '۶۵ × ۴۰ × ۴۰ میلی‌متر' },
    applications: [
      { en: 'Robotics', fa: 'رباتیک' },
      { en: 'Assembled power packs', fa: 'پک‌های سرهم‌شده' },
      { en: 'Small appliances', fa: 'لوازم خانگی کوچک' },
    ],
  },
  {
    id: 'module-21700-10s',
    name: { en: '21700 Module, 10S', fa: 'ماژول ۲۱۷۰۰، ۱۰ سری' },
    category: 'module',
    chemistry: { en: 'Lithium iron phosphate (LiFePO₄)', fa: 'فوسفات آهن لیتیوم (LiFePO₄)' },
    configuration: {
      en: '10 cells in series, busbar joined',
      fa: '۱۰ سلول به‌صورت سری، اتصال با شمش',
    },
    voltage: { en: '32 V nominal (10S)', fa: '۳۲ ولت اسمی (۱۰ سری)' },
    capacity: { en: '5,000 mAh', fa: '۵٬۰۰۰ میلی‌آمپرساعت' },
    dimensions: { en: '70 × 140 × 70 mm', fa: '۷۰ × ۱۴۰ × ۷۰ میلی‌متر' },
    applications: [
      { en: 'Electric bicycles', fa: 'دوچرخه‌های برقی' },
      { en: 'Solar storage', fa: 'ذخیره‌سازی خورشیدی' },
      { en: 'Industrial equipment', fa: 'تجهیزات صنعتی' },
    ],
  },
]

/**
 * Whether the catalogue is showing demonstration fixtures.
 *
 * Every demonstration notice in the brand is driven from this one flag rather
 * than from a check on the data, so loading the first real product part is the
 * only edit needed to remove the labelling — and it is impossible to load real
 * data while leaving up a banner that calls it fictional, because the two are
 * the same switch.
 */
export const batteryIsDemonstration = true

export const CATALOGUE_STATUS = {
  /** Banner heading, above the catalogue and above the featured section. */
  bannerTitle: {
    en: 'Demonstration catalogue',
    fa: 'کاتالوگ نمایشی',
  },
  bannerBody: {
    en: 'Every entry below is a placeholder entry written to demonstrate the catalogue, the filters and the specification tables. None of it is stock, none of it is quoted, and no product listed here is held or available. No manufacturer, datasheet or photograph has been supplied, so those fields are shown as not supplied.',
    fa: 'همه موارد زیر ورودی‌های نمایشی هستند که برای نشان دادن کاتالوگ، فیلترها و جدول‌های مشخصات نوشته شده‌اند. هیچ‌کدام موجودی نیستند، هیچ قیمتی برایشان اعلام نشده و هیچ محصولی از فهرست در انبار موجود یا قابل ارائه نیست. هیچ سازنده، برگه داده فنی یا تصویری ارائه نشده است، بنابراین آن فیلدها به‌عنوان «ارائه نشده» نمایش داده می‌شوند.',
  },
  /** Tag on each product card, and on each specification table. */
  demoTag: {
    en: 'Demonstration',
    fa: 'نمایشی',
  },
  /**
   * Caption under a specification table. Sits next to the table rather than
   * only above the page, so a screenshot of the table carries it.
   */
  tableCaption: {
    en: 'Illustrative specification — demonstration data, not a datasheet.',
    fa: 'مشخصات نمونه — داده نمایشی، نه برگه داده فنی.',
  },
  /** The state rendered in place of a field that has not been supplied. */
  notSupplied: {
    en: 'Not supplied',
    fa: 'ارائه نشده',
  },
  /** Shown in place of a product photograph that does not exist. */
  noImage: {
    en: 'No product photograph has been supplied for this entry.',
    fa: 'برای این ورودی هیچ تصویر محصولی ارائه نشده است.',
  },
  /**
   * The same absence, stated in the mono register over the media area, where
   * the sentence form above would be far too long to set at that size.
   */
  noImageShort: {
    en: 'No image',
    fa: 'بدون تصویر',
  },
  /** Used where a datasheet link would sit. */
  noDatasheet: {
    en: 'No datasheet has been supplied for this entry.',
    fa: 'برای این ورودی هیچ برگه داده فنی ارائه نشده است.',
  },
} as const satisfies Record<string, unknown>

export function findBatteryCategory(id: string): BatteryCategory | undefined {
  return BATTERY_CATEGORIES.find((category) => category.id === id)
}

export function findBatteryProduct(id: string): BatteryProduct | undefined {
  return BATTERY_PRODUCTS.find((product) => product.id === id)
}

/**
 * The specification rows a product can have, in the order a buyer reads them,
 * each paired with the accessor that yields its value or `undefined`.
 *
 * Driving the specification table from one ordered list is what lets an absent
 * field render as an explicit "not supplied" row instead of silently
 * shortening the table — the table keeps its full shape whatever the entry
 * happens to be missing, which is the difference between a catalogue that is
 * incomplete and one that is lying by omission.
 */
export const PRODUCT_SPEC_FIELDS: readonly {
  key: keyof BatteryProduct
  label: Record<Locale, string>
  /** True for the values that must be set in a monospaced face. */
  mono?: boolean
}[] = [
  { key: 'chemistry', label: { en: 'Chemistry', fa: 'شیمی' } },
  { key: 'brand', label: { en: 'Brand', fa: 'برند' } },
  { key: 'voltage', label: { en: 'Nominal voltage', fa: 'ولتاژ اسمی' }, mono: true },
  { key: 'capacity', label: { en: 'Capacity', fa: 'ظرفیت' }, mono: true },
  { key: 'dimensions', label: { en: 'Dimensions', fa: 'ابعاد' }, mono: true },
  {
    key: 'configuration',
    label: { en: 'Configuration', fa: 'پیکربندی' },
  },
]