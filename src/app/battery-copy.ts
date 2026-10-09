/**
 * Copy for VORTEX BATTERY.
 *
 * An independently branded business, so its own copy module rather than an
 * extension of the holding's or Trade's. The register is technical and
 * product-facing: a battery catalogue talks about formats, chemistries and
 * envelopes, and the copy does the same rather than borrowing the corporate
 * register of the parent or the commercial register of Trade.
 *
 * ALL COPY IS DRAFT CONTENT pending client review.
 *
 * NOTHING INVENTED. No capacity, voltage, cycle life, weight, price, minimum
 * order quantity, lead time, licence, stock level or manufacturer appears in
 * this file. A specification value belongs to a specific product, so where a
 * page would normally print one it points at the catalogue entry instead — and
 * the catalogue labels its own entries as demonstration data, which
 * src/app/battery-catalogue.ts explains at length.
 *
 * Product names, cell format designations and chemistry classifications are
 * not product data and are stated plainly: `18650` is what the format means,
 * and NMC is a chemistry. They appear here as the language of the trade, not as
 * claims about stock.
 */

/**
 * Every string in this module is stored in both locales; the active one is
 * picked per render. The pages index them with the locale from useLocale(), so
 * a missing translation is a compile error rather than an empty string.
 */
import type { Locale } from './locale'

export type { Locale }

/** Labels reused across every Battery page. */
export const BATTERY_CHROME = {
  breadcrumbHome: { en: 'Home', fa: 'خانه' },
  breadcrumbBattery: { en: 'VORTEX BATTERY', fa: 'ورتکس باتری' },
  /** Return-path band above the footer. */
  backToParentLabel: {
    en: 'Part of Vortex Holding',
    fa: 'بخشی از هلدینگ ورتکس',
  },
  backToParentBody: {
    en: 'See the holding company, its structure and its other lines of business.',
    fa: 'شرکت هلدینگ، ساختار و سایر حوزه‌های فعالیت آن را ببینید.',
  },
  /** The wordmark sub-line, set on the mark itself. */
  parentQualifier: {
    en: 'A Vortex Holding company',
    fa: 'یک شرکت از هلدینگ ورتکس',
  },
  /**
   * The footer's specification panel — four facts, not a link column. The
   * labels are here rather than inline because "Demonstration" appears twice
   * more in this same panel and the two claims it makes (no stock, no checkout)
   * have to stay consistent with the catalogue banner above them.
   */
  footerFacts: {
    siteLabel: { en: 'Site', fa: 'وب‌سایت' },
    siteValue: {
      en: 'Demonstration, no checkout',
      fa: 'نمایشی، بدون پرداخت',
    },
    catalogueLabel: { en: 'Catalogue', fa: 'کاتالوگ' },
    catalogueValue: {
      en: 'Demonstration data',
      fa: 'داده نمایشی',
    },
  },
  /**
   * The drawer's way out of the brand. Its own key because it is the one place
   * the label has to say what the link *does* — inside a list of four product
   * routes, "Vortex Holding" alone reads as a fifth page of this site rather
   * than as a level up.
   */
  drawerParentLabel: {
    en: 'Back to Vortex Holding',
    fa: 'بازگشت به هلدینگ ورتکس',
  },
  /** Field names, reused by the specification table and the detail pattern. */
  specLabels: {
    category: { en: 'Category', fa: 'دسته' },
    chemistry: { en: 'Chemistry', fa: 'شیمی' },
    voltage: { en: 'Nominal voltage', fa: 'ولتاژ اسمی' },
    capacity: { en: 'Capacity', fa: 'ظرفیت' },
    dimensions: { en: 'Dimensions', fa: 'ابعاد' },
    applications: { en: 'Applications', fa: 'کاربردها' },
    datasheet: { en: 'Datasheet', fa: 'برگه داده فنی' },
  },
  /** The card footer's standing in for a datasheet link, when none exists. */
  noDatasheetLabel: {
    en: 'No datasheet',
    fa: 'بدون برگه داده فنی',
  },
  /** Headings used by the catalogue and the detail pattern. */
  catalogueLabel: { en: 'Catalogue', fa: 'کاتالوگ' },
  entriesLabel: { en: 'entries', fa: 'ورودی' },
  entryLabel: { en: 'entry', fa: 'ورودی' },
  filtersLabel: { en: 'Filters', fa: 'فیلترها' },
  clearFilters: { en: 'Clear filters', fa: 'پاک کردن فیلترها' },
  /** Checklist heading on the closing inquiry band. */
  includeLabel: { en: 'Useful to include', fa: 'مواردی که کمک می‌کند' },
  /**
   * The standing notice about the site itself, repeated on the contact page
   * and the inquiry form. There is no backend and nothing is transmitted.
   */
  demonstrationNotice: {
    en: 'Demonstration site — inquiries are not delivered anywhere.',
    fa: 'سایت نمایشی است — هیچ درخواستی به جایی ارسال نمی‌شود.',
  },
  demonstrationSuccess: {
    en: 'This is a demonstration, so nothing was sent. Contact details will be added once they are provided.',
    fa: 'این نسخه نمایشی است و چیزی ارسال نشد. اطلاعات تماس به‌محض فراهم‌شدن افزوده خواهد شد.',
  },
} as const satisfies Record<string, unknown>

/* ==========================================================================
   Homepage
   ========================================================================== */

export const BATTERY_HOME = {
  hero: {
    eyebrow: { en: 'Cells, modules and packs', fa: 'سلول، ماژول و پک' },
    title: {
      en: 'Batteries, specified properly.',
      fa: 'باتری، با مشخصات درست.',
    },
    lede: {
      en: 'A technical catalogue of lithium cells and the assemblies built from them, organised the way a buyer actually searches: by cell format, by chemistry, by what the thing has to do.',
      fa: 'یک کاتالوگ فنی از سلول‌های لیتیومی و مجموعه‌هایی که از آن‌ها ساخته می‌شود، سازمان‌دهی‌شده به همان شیوه‌ای که خریدار واقعاً جست‌وجو می‌کند: بر اساس قالب سلول، شیمی و کاربردی که باید انجام شود.',
    },
    primaryCta: { en: 'Browse the catalogue', fa: 'مرور کاتالوگ' },
    primaryCtaHref: '/businesses/batteries/products',
    secondaryCta: { en: 'Wholesale inquiries', fa: 'درخواست عمده' },
    secondaryCtaHref: '/businesses/batteries/wholesale',
    /**
     * The licence credit for the hero photograph, printed beside the image
     * rather than in a credits page. CC BY 4.0 requires attribution and
     * requires it to be reasonable to the medium, so it travels with the
     * picture.
     */
    imageCredit: {
      en: 'Image: 18650 and 21700 lithium-ion cells, Wikimedia Commons, CC BY 4.0',
      fa: 'تصویر: ۱۸۶۵۰ و ۲۱۷۰۰، ویکی‌مدیا کامانز، CC BY 4.0',
    },
  },

  /** Three lines naming what the business is. A masthead strip. */
  heroFacts: [
    {
      en: 'Organised by cell format, because that is how cells are specified.',
      fa: 'بر اساس قالب سلول، چون سلول‌ها بر همین اساس مشخص می‌شوند.',
    },
    {
      en: 'Chemistry, voltage, capacity and envelope, stated per product.',
      fa: 'شیمی، ولتاژ، ظرفیت و ابعاد، برای هر محصول به‌صراحت.',
    },
    {
      en: 'No cart, no checkout, and nothing sold from this site.',
      fa: 'بدون سبد خرید، بدون پرداخت، و بدون فروش از این سایت.',
    },
  ],

  categories: {
    eyebrow: { en: 'Product categories', fa: 'دسته‌های محصول' },
    title: { en: 'Find the cell by its shape first.', fa: 'ابتدا سلول را با شکلش پیدا کنید.' },
    lede: {
      en: 'A cell catalogue is organised by format before anything else, because the format fixes the diameter, the length and most of the mechanical questions a buyer has to answer.',
      fa: 'کاتالوگ سلول پیش از هر چیز بر اساس قالب سازمان می‌یابد، چون قالب، قطر و طول و بیشتر پرسش‌های مکانیکی خریدار را مشخص می‌کند.',
    },
  },

  featured: {
    eyebrow: { en: 'Featured catalogue', fa: 'کاتالوگ منتخب' },
    title: { en: 'A cross-section of the formats.', fa: 'نگاهی به پرکاربردترین قالب‌ها.' },
    lede: {
      en: 'Four entries from across the catalogue, chosen to show the range of formats rather than to promote anything. The full set, with filters, is on the products page.',
      fa: 'چهار ورودی از سراسر کاتالوگ، انتخاب‌شده برای نشان دادن تنوع قالب‌ها و نه برای تبلیغ چیزی. مجموعه کامل، همراه با فیلترها، در صفحه محصولات است.',
    },
    allProductsLabel: { en: 'All catalogue entries', fa: 'همه ورودی‌های کاتالوگ' },
  },

  technical: {
    eyebrow: { en: 'Technical information', fa: 'اطلاعات فنی' },
    title: {
      en: 'The vocabulary, before the numbers.',
      fa: 'اصطلاحات، پیش از اعداد.',
    },
    lede: {
      en: 'Four terms decide most of what a cell can and cannot do. They are defined here in the plainest terms available, because a specification that cannot be read cannot be checked.',
      fa: 'چهار اصطلاح بیشترِ توانایی و ناتوانی یک سلول را تعیین می‌کنند. اینجا به ساده‌ترین شکل ممکن تعریف می‌شوند، چون مشخصاتی که خوانده نشود قابل بررسی هم نیست.',
    },
  },

  wholesale: {
    eyebrow: { en: 'Wholesale', fa: 'عمده‌فروشی' },
    title: { en: 'Supply, described as a requirement.', fa: 'تأمین، با بیان آن به‌عنوان یک نیاز.' },
    lede: {
      en: 'Wholesale enquiries are handled against a written requirement rather than a shopping list, so the arrangement that comes back is one somebody has reviewed.',
      fa: 'درخواست‌های عمده بر پایه نیاز مکتوب بررسی می‌شوند، نه فهرست خرید؛ به همین دلیل توافقی که بازمی‌گردد، توافقی است که کسی آن را بررسی کرده است.',
    },
    actionLabel: { en: 'Wholesale inquiries', fa: 'درخواست عمده' },
  },

  cta: {
    eyebrow: { en: 'Product inquiries', fa: 'درخواست محصول' },
    title: { en: 'Tell us what the battery has to do.', fa: 'بگویید باتری باید چه کاری انجام دهد.' },
    description: {
      en: 'Format, chemistry, voltage, capacity, enclosure, cycle life, timeline. A requirement written in those terms can be answered; a catalogue browsing session cannot.',
      fa: 'قالب، شیمی، ولتاژ، ظرفیت، محفظه، عمر چرخه، زمان‌بندی. نیازی که با این اصطلاحات نوشته شود قابل پاسخ است؛ جست‌وجوی بی‌هدف در کاتالوگ نیست.',
    },
    actionLabel: { en: 'Start an inquiry', fa: 'شروع درخواست' },
    secondaryActionLabel: { en: 'Ask about supply', fa: 'پرسش درباره تأمین' },
    secondaryActionHref: '/businesses/batteries/wholesale',
  },
} as const satisfies Record<string, unknown>

/**
 * The four terms, defined.
 *
 * Definitions only — no cycle-life figures, no C-rates, no temperature windows,
 * because every one of those is a product-specific claim and none has been
 * supplied. Where a buyer would need one, the copy points at the inquiry
 * route rather than printing a typical value, because a "typical value" on a
 * catalogue page reads as a guarantee and is not one.
 */
export const BATTERY_TECHNICAL_TERMS = [
  {
    key: 'chemistry',
    title: { en: 'Chemistry', fa: 'شیمی' },
    body: {
      en: 'The electrochemistry the cell is built on. It sets the usable voltage window, how fast the cell can be charged and discharged, its thermal behaviour and broadly what it costs. LiFePO₄ and LTO are the two chemistries most often specified for stationary duty; NMC is the usual choice where energy density matters more than the rest.',
      fa: 'الکتروشیمی‌ای که سلول بر پایه آن ساخته شده است. پنجره ولتاژ قابل استفاده، سرعت شارژ و تخلیه، رفتار حرارتی و به‌طور کلی هزینه را تعیین می‌کند. LiFePO₄ و LTO دو شیمی رایج در کاربرد ثابت هستند؛ NMC معمولاً انتخاب می‌شود آنجا که چگالی انرژی بر بقیه اولویت دارد.',
    },
  },
  {
    key: 'voltage',
    title: { en: 'Nominal voltage', fa: 'ولتاژ اسمی' },
    body: {
      en: 'The voltage a cell sits at for most of its discharge, and the figure a series count multiplies from. A cell does not hold it constant — the terminals move across the discharge, which is why a series arrangement is specified by its cell count and its chemistry rather than by a single voltage.',
      fa: 'ولتاژی که سلول در بیشتر بخش تخلیه روی آن قرار دارد و عددی که شمارش سری از آن ضرب می‌شود. سلول این ولتاژ را ثابت نگه نمی‌دارد — ترمینال‌ها در طول تخلیه جابه‌جا می‌شوند، و به همین دلیل آرایش سری با شمارش سلول و شیمی آن مشخص می‌شود، نه با یک ولتاژ واحد.',
    },
  },
  {
    key: 'capacity',
    title: { en: 'Capacity', fa: 'ظرفیت' },
    body: {
      en: 'The charge a cell can deliver under a stated test condition — which is the important qualifier, because the same cell measures differently at different discharge rates and temperatures. A capacity quoted without its condition is not yet a specification.',
      fa: 'باری که یک سلول می‌تواند تحت یک شرایط آزمون مشخص تحویل دهد — و همین قید است که مهم است، چون همان سلول در نرخ‌های تخلیه و دماهای متفاوت عدد متفاوتی می‌دهد. ظرفیتی که بدون شرایط آن نقل شود هنوز مشخصات نیست.',
    },
  },
  {
    key: 'configuration',
    title: { en: 'Configuration', fa: 'پیکربندی' },
    body: {
      en: 'How cells are combined. Series raises voltage and leaves capacity alone; parallel raises capacity and leaves voltage alone; doing both gives a pack described by both numbers. The arrangement also fixes the enclosure, the busbar and how the cells are balanced.',
      fa: 'سلول‌ها چگونه ترکیب می‌شوند. سری ولتاژ را بالا می‌برد و ظرفیت را دست‌نخورده می‌گذارد؛ موازی ظرفیت را بالا می‌برد و ولتاژ را؛ انجام هر دو پکی می‌سازد که با هر دو عدد توصیف می‌شود. آرایش همچنین محفظه، شمش و نحوه متعادل‌سازی سلول‌ها را تعیین می‌کند.',
    },
  },
]

/** How a wholesale enquiry is handled. Positions, not promises. */
export const BATTERY_PROCESS = {
  eyebrow: { en: 'How supply works', fa: 'تأمین چگونه انجام می‌شود' },
  title: { en: 'Three steps, in order.', fa: 'سه گام، به‌ترتیب.' },
  lede: {
    en: 'An inquiry moves through the same three steps whatever the product. What changes between one inquiry and the next is the specification, not the route.',
    fa: 'هر درخواست، صرف‌نظر از محصول، از همین سه گام عبور می‌کند. آنچه میان دو درخواست تغییر می‌کند مشخصات است، نه مسیر.',
  },
  steps: [
    {
      title: { en: 'Requirement', fa: 'نیاز' },
      body: {
        en: 'The inquiry arrives as a written requirement: application, format, chemistry, voltage, capacity, quantity, and the timeline. Anything not yet known is stated as unknown rather than guessed, and the gap is worked through.',
        fa: 'درخواست به‌صورت نیاز مکتوب می‌رسد: کاربرد، قالب، شیمی، ولتاژ، ظرفیت، مقدار و زمان‌بندی. هر آنچه هنوز نامعلوم است به‌جای حدس، نامعلوم اعلام می‌شود و شکاف موجود بررسی می‌گردد.',
      },
    },
    {
      title: { en: 'Matching', fa: 'تطبیق' },
      body: {
        en: 'The requirement is matched against what is actually available. Where the answer is that a product does not exist in that form, that is the answer given — with the nearest thing that does, and why it differs.',
        fa: 'نیاز با آنچه واقعاً موجود است تطبیق داده می‌شود. جایی که پاسخ این است که محصولی با آن مشخصات وجود ندارد، همان پاسخ داده می‌شود — به‌همراه نزدیک‌ترین گزینه موجود و دلیل تفاوت آن.',
      },
    },
    {
      title: { en: 'Supply', fa: 'تأمین' },
      body: {
        en: 'Volumes, packaging, compliance documentation, delivery point and timeline are agreed in writing before anything moves. Terms are settled per inquiry, and nothing on this site states them in advance.',
        fa: 'حجم، بسته‌بندی، مستندات انطباق، محل تحویل و زمان‌بندی پیش از هر جابه‌جایی به‌صورت مکتوب توافق می‌شود. شرایط در هر درخواست تعیین می‌شود و هیچ‌چیز در این سایت از پیش اعلام نشده است.',
      },
    },
  ],
} as const satisfies Record<string, unknown>

/** The standing statement about what this site is, on the homepage. */
export const BATTERY_POSITION = {
  eyebrow: { en: 'What this site is', fa: 'این سایت چیست' },
  title: { en: 'A catalogue, not a shop.', fa: 'یک کاتالوگ، نه یک فروشگاه.' },
  points: [
    {
      title: { en: 'Nothing is sold here', fa: 'اینجا چیزی فروخته نمی‌شود' },
      body: {
        en: 'There is no cart, no checkout and no payment processing anywhere on this site, and there will not be one. Ordering happens through a conversation about a requirement.',
        fa: 'در این سایت هیچ سبد خرید، پرداخت یا پردازش تراکنشی وجود ندارد و نخواهد بود. سفارش از راه گفت‌وگو درباره یک نیاز انجام می‌شود.',
      },
    },
    {
      title: { en: 'The catalogue is demonstration data', fa: 'داده کاتالوگ نمایشی است' },
      body: {
        en: 'Entries are written to demonstrate the catalogue, the filters and the specification tables. None of them is stock, and no product shown here is held or available.',
        fa: 'ورودی‌ها برای نمایش کاتالوگ، فیلترها و جدول‌های مشخصات نوشته شده‌اند. هیچ‌کدام موجودی نیستند و هیچ محصولی که اینجا دیده می‌شود در انبار موجود یا قابل ارائه نیست.',
      },
    },
    {
      title: { en: 'No product photography yet', fa: 'هنوز تصویر محصولی نیست' },
      body: {
        en: 'No manufacturer has been appointed, so no product photograph or datasheet link can honestly be shown. Those fields read as not supplied until real ones exist.',
        fa: 'هیچ سازنده‌ای تعیین نشده، بنابراین نمی‌توان صادقانه تصویر محصول یا پیوند برگه داده فنی نمایش داد. آن فیلدها تا زمان وجود داده واقعی، «ارائه نشده» باقی می‌مانند.',
      },
    },
  ],
} as const satisfies Record<string, unknown>

/* ==========================================================================
   Products
   ========================================================================== */

export const BATTERY_PRODUCTS_PAGE = {
  hero: {
    eyebrow: { en: 'Product catalogue', fa: 'کاتالوگ محصولات' },
    title: { en: 'The catalogue.', fa: 'کاتالوگ.' },
    lede: {
      en: 'Filter by category or search across formats, chemistries and applications. Filters run in the page — there is no cart and nothing is ordered from here.',
      fa: 'بر اساس دسته فیلتر کنید یا در میان قالب‌ها، شیمی‌ها و کاربردها جست‌وجو کنید. فیلترها در همین صفحه اجرا می‌شوند — سبد خریدی نیست و از اینجا چیزی سفارش داده نمی‌شود.',
    },
  },

  /** Table of contents at the foot of the page, one row per category. */
  contents: {
    eyebrow: { en: 'By category', fa: 'بر اساس دسته' },
    title: { en: 'Every entry, by format.', fa: 'همه ورودی‌ها، بر اساس قالب.' },
    lede: {
      en: 'The same entries, grouped the way the catalogue itself is grouped — so a category page reads as a short specification list rather than a wall of cards.',
      fa: 'همان ورودی‌ها، گروه‌بندی‌شده به همان شیوه‌ای که خود کاتالوگ گروه‌بندی شده است — تا صفحه هر دسته به‌جای انبوه کارت، خوانده شود.',
    },
  },

  /** The closing band, when the filter has narrowed the catalogue to nothing
   *  or the visitor simply could not find what they needed. */
  cta: {
    eyebrow: { en: 'Product inquiries', fa: 'درخواست محصول' },
    title: { en: 'Did not find the format you need?', fa: 'قالب مورد نظر را پیدا نکردید؟' },
    description: {
      en: 'The catalogue is not the whole range. Describe what you need and we will say what exists — including when the answer is that nothing does.',
      fa: 'کاتالوگ تمام دامنه نیست. آنچه را نیاز دارید شرح دهید تا بگوییم چه چیزی وجود دارد — از جمله وقتی پاسخ این است که هیچ چیزی وجود ندارد.',
    },
    actionLabel: { en: 'Start an inquiry', fa: 'شروع درخواست' },
  },

  emptyState: {
    title: { en: 'Nothing matches that.', fa: 'چیزی با این مطابقت ندارد.' },
    body: {
      en: 'No catalogue entry matches the current filters. Clear them to see the full set — or describe what you are looking for in an inquiry, since the catalogue is not the whole range.',
      fa: 'هیچ ورودی کاتالوگی با فیلترهای فعلی مطابقت ندارد. برای دیدن همه موارد فیلترها را پاک کنید — یا آنچه را می‌خواهید در یک درخواست شرح دهید، چون کاتالوگ تمام دامنه نیست.',
      },
  },

  filters: {
    searchLabel: { en: 'Search the catalogue', fa: 'جست‌وجو در کاتالوگ' },
    searchPlaceholder: {
      en: 'Format, chemistry or application',
      fa: 'قالب، شیمی یا کاربرد',
    },
    searchHint: {
      en: 'Matches format names, chemistries and applications.',
      fa: 'نام قالب‌ها، شیمی‌ها و کاربردها را جست‌وجو می‌کند.',
    },
    categoryLabel: { en: 'Category', fa: 'دسته' },
    allLabel: { en: 'All categories', fa: 'همه دسته‌ها' },
  },

  detail: {
    /** Section id per product, so a card link and a section anchor agree. */
    specifications: { en: 'Specifications', fa: 'مشخصات' },
    applications: { en: 'Applications', fa: 'کاربردها' },
    inquiryLabel: { en: 'Inquire about this format', fa: 'پرسش درباره این قالب' },
    inquiryHref: '/businesses/batteries/contact',
    backToTop: { en: 'Back to the top of the catalogue', fa: 'بازگشت به بالای کاتالوگ' },
  },
} as const satisfies Record<string, unknown>

/* ==========================================================================
   Wholesale
   ========================================================================== */

export const BATTERY_WHOLESALE = {
  hero: {
    eyebrow: { en: 'Wholesale', fa: 'عمده‌فروشی' },
    title: { en: 'Supply, at the volume you actually need.', fa: 'تأمین، در حجمی که واقعاً نیاز دارید.' },
    lede: {
      en: 'Wholesale here means a repeat supply arrangement against a written requirement — not a discount applied to a shopping cart, and not a quantity held in a warehouse somewhere.',
      fa: 'عمده‌فروشی اینجا یعنی توافق تأمین تکرارشونده بر پایه نیاز مکتوب — نه تخفیفی روی سبد خرید، و نه مقداری که در انباری جایی نگهداری می‌شود.',
    },
  },

  /** The four groups of the wholesale inquiry form, as a specification sheet. */
  fields: {
    eyebrow: { en: 'What a wholesale inquiry contains', fa: 'یک درخواست عمده شامل چیست' },
    title: { en: 'Four groups of information.', fa: 'چهار گروه اطلاعات.' },
    lede: {
      en: 'The form asks for these and nothing else. Anything left blank is understood as not yet decided rather than as zero, which is why every group below can be partly filled.',
      fa: 'فرم فقط همین‌ها را می‌پرسد. هر مورد خالی به‌عنوان «هنوز تصمیم‌گیری نشده» فهمیده می‌شود، نه صفر — و به همین دلیل هر گروه زیر می‌تواند ناقص پر شود.',
    },
    groups: [
      {
        title: { en: 'Product', fa: 'محصول' },
        items: [
          { en: 'Format or category', fa: 'قالب یا دسته' },
          { en: 'Chemistry', fa: 'شیمی' },
          { en: 'Nominal voltage', fa: 'ولتاژ اسمی' },
          { en: 'Capacity, with its test condition if known', fa: 'ظرفیت، با شرایط آزمون اگر معلوم باشد' },
          { en: 'Cell, module or finished pack', fa: 'سلول، ماژول یا پک نهایی' },
        ],
      },
      {
        title: { en: 'Application', fa: 'کاربرد' },
        items: [
          { en: 'What the battery will power', fa: 'باتری چه چیزی را تغذیه می‌کند' },
          { en: 'Discharge and charge profile', fa: 'پروفایل تخلیه و شارژ' },
          { en: 'Ambient temperature range', fa: 'بازه دمای محیط' },
          { en: 'Enclosure or mechanical constraints', fa: 'محدودیت محفظه یا مکانیکی' },
        ],
      },
      {
        title: { en: 'Quantity and terms', fa: 'مقدار و شرایط' },
        items: [
          { en: 'Quantity per order', fa: 'مقدار هر سفارش' },
          { en: 'Frequency, if repeat supply', fa: 'تناوب، در صورت تأمین تکرارشونده' },
          { en: 'Packaging', fa: 'بسته‌بندی' },
          { en: 'Compliance documentation required', fa: 'مستندات انطباق مورد نیاز' },
        ],
      },
      {
        title: { en: 'Delivery', fa: 'تحویل' },
        items: [
          { en: 'Delivery point', fa: 'محل تحویل' },
          { en: 'Required date', fa: 'تارخ مورد نیاز' },
          { en: 'Incoterms, if the trade has a view', fa: 'اینکوترمز، اگر موردی در تجارت وجود داشته باشد' },
          { en: 'Who will receive it', fa: 'گیرنده چه کسی است' },
        ],
      },
    ],
  },

  audience: {
    eyebrow: { en: 'Who this suits', fa: 'این برای چه کسانی است' },
    title: { en: 'Where wholesale is the right conversation.', fa: 'عمده‌فروشی کجا گفت‌وگوی درستی است.' },
    items: [
      {
        title: { en: 'Equipment manufacturers', fa: 'تولیدکنندگان تجهیزات' },
        body: {
          en: 'You need a specific format inside a mechanical envelope you have already designed around, on a schedule set by your own production plan.',
          fa: 'به قالبی مشخص درون محفظه‌ای که پیش‌تر حول آن طراحی کرده‌اید نیاز دارید، با زمان‌بندی‌ای که برنامه تولید خودتان تعیین می‌کند.',
        },
      },
      {
        title: { en: 'Storage and solar integrators', fa: 'مجریان ذخیره‌سازی و خورشیدی' },
        body: {
          en: 'You are assembling a system rather than buying a part, and the cell format, chemistry and balancing arrangement all have to agree with each other.',
          fa: 'در حال مونتاژ یک سامانه هستید نه خرید یک قطعه، و قالب سلول، شیمی و آرایش متعادل‌سازی باید با هم بخوانند.',
        },
      },
      {
        title: { en: 'Distributors', fa: 'توزیع‌کنندگان' },
        body: {
          en: 'You buy in volume and resell, so what matters is continuity of supply and a specification you can put in writing to your own customers.',
          fa: 'حجم می‌خرید و دوباره می‌فروشید، پس آنچه اهمیت دارد تداوم تأمین و مشخصاتی است که بتوانید آن را برای مشتریان خودتان مکتوب کنید.',
        },
      },
      {
        title: { en: 'Research and prototyping', fa: 'پژوهش و نمونه‌سازی' },
        body: {
          en: 'You need a small quantity of a cell that is genuinely representative, and you need to know what it is before you commit to it.',
          fa: 'به مقدار کمی از یک سلول واقعاً نماینده نیاز دارید، و پیش از تعهد به آن می‌خواهید بدانید با چه چیزی طرفید.',
        },
      },
    ],
  },

  /** What is settled per inquiry, stated as fields rather than as figures. */
  terms: {
    eyebrow: { en: 'Commercial terms', fa: 'شرایط تجاری' },
    title: { en: 'Set per inquiry, in writing.', fa: 'در هر درخواست، به‌صورت مکتوب.' },
    lede: {
      en: 'These are the terms a wholesale arrangement is built from. None of them is published here, because each is agreed against a specific requirement and none has been agreed.',
      fa: 'این‌ها شرایطی است که یک توافق عمده از آن ساخته می‌شود. هیچ‌کدام اینجا منتشر نمی‌شود، چون هر کدام بر پایه یک نیاز مشخص توافق می‌شود و هنوز هیچ توافقی انجام نشده است.',
    },
    rows: [
      { label: { en: 'Unit price', fa: 'قیمت واحد' } },
      { label: { en: 'Minimum order quantity', fa: 'حداقل مقدار سفارش' } },
      { label: { en: 'Lead time', fa: 'زمان تحویل' } },
      { label: { en: 'Payment terms', fa: 'شرایط پرداخت' } },
      { label: { en: 'Validity period', fa: 'مدت اعتبار' } },
      { label: { en: 'Packaging', fa: 'بسته‌بندی' } },
      { label: { en: 'Delivery point', fa: 'محل تحویل' } },
      { label: { en: 'Compliance documentation', fa: 'مستندات انطباق' } },
    ],
    setPerInquiry: { en: 'Set per inquiry', fa: 'در هر درخواست تعیین می‌شود' },
    /** The action the four groups end on. */
    actionLabel: { en: 'Start a wholesale inquiry', fa: 'شروع درخواست عمده' },
  },

  cta: {
    eyebrow: { en: 'Wholesale inquiries', fa: 'درخواست عمده' },
    title: { en: 'Send a requirement, not a shopping list.', fa: 'یک نیاز بفرستید، نه فهرست خرید.' },
    description: {
      en: 'The more specific the requirement, the more useful the answer. If you have a datasheet, a drawing or a working cell already, say so — that is the fastest route to a straight answer.',
      fa: 'هرچه نیاز مشخص‌تر باشد، پاسخ مفیدتر است. اگر برگه داده فنی، نقشه یا یک سلول نمونه در دست دارید، بگویید — سریع‌ترین راه به یک پاسخ روشن همین است.',
    },
    actionLabel: { en: 'Send an inquiry', fa: 'ارسال درخواست' },
    secondaryActionLabel: { en: 'Browse the catalogue', fa: 'مرور کاتالوگ' },
    secondaryActionHref: '/businesses/batteries/products',
  },
} as const satisfies Record<string, unknown>

/* ==========================================================================
   Contact
   ========================================================================== */

export const BATTERY_CONTACT = {
  hero: {
    eyebrow: { en: 'Product inquiry', fa: 'درخواست محصول' },
    title: { en: 'Start with what it has to do.', fa: 'با آنچه باید انجام دهد شروع کنید.' },
    lede: {
      en: 'The form asks for the requirement rather than for an address. Whatever is not yet decided can be left blank, and saying so is more useful than guessing.',
      fa: 'فرم نیاز را می‌پرسد نه نشانی را. هر آنچه هنوز قطعی نیست می‌تواند خالی بماند، و اعلام همین موضوع از حدس زدن مفیدتر است.',
    },
  },

  sidebar: {
    title: { en: 'Before you write', fa: 'پیش از نوشتن' },
    body: {
      en: 'The most useful inquiry describes the application rather than the part. What the battery powers, how it is charged, how often, and what happens if it is not available — that answers more than a part number would.',
      fa: 'مفیدترین درخواست، کاربرد را شرح می‌دهد نه قطعه را. اینکه باتری چه چیزی را تغذیه می‌کند، چگونه شارژ می‌شود، هر چند بار، و اگر در دسترس نباشد چه می‌شود — اینها بیش از یک کد قطعه پاسخ می‌دهند.',
    },
    noContactDetails: {
      en: 'No address, phone number or email has been supplied, so none is shown here.',
      fa: 'هیچ نشانی، شماره تماس یا ایمیلی ارائه نشده است؛ بنابراین اینجا درج نمی‌شود.',
    },
  },

  form: {
    name: { en: 'Name', fa: 'نام' },
    organisation: { en: 'Organisation', fa: 'سازمان' },
    email: { en: 'Email', fa: 'ایمیل' },
    application: { en: 'Application', fa: 'کاربرد' },
    applicationHint: {
      en: 'What the battery powers, and what happens to it when it is not available.',
      fa: 'باتری چه چیزی را تغذیه می‌کند و وقتی در دسترس نباشد چه می‌شود.',
    },
    format: { en: 'Cell format or category', fa: 'قالب یا دسته سلول' },
    chemistry: { en: 'Chemistry', fa: 'شیمی' },
    voltage: { en: 'Nominal voltage', fa: 'ولتاژ اسمی' },
    quantity: { en: 'Quantity', fa: 'مقدار' },
    timeline: { en: 'Timeline', fa: 'زمان‌بندی' },
    notes: { en: 'Specification or notes', fa: 'مشخصات یا توضیحات' },
    notesHint: {
      en: 'A datasheet, a drawing, or a working cell you already use. Anything undecided can be left blank.',
      fa: 'یک برگه داده فنی، نقشه، یا یک سلول نمونه که هم‌اکنون استفاده می‌کنید. هر آنچه قطعی نیست می‌تواند خالی بماند.',
    },
    submit: { en: 'Send inquiry', fa: 'ارسال درخواست' },
    rewrite: { en: 'Write another inquiry', fa: 'نوشتن درخواست دیگر' },
    requiredNote: {
      en: 'Only the name and the requirement are required. Everything else can be decided later.',
      fa: 'تنها نام و شرح نیاز الزامی است. بقیه بعداً قابل تصمیم‌گیری است.',
    },
    /** The empty option on the category select. */
    undecided: { en: '— not decided —', fa: '— تعیین نشده —' },
    /**
     * What the sidebar says when a category arrived in the query string, and
     * what it says when one did not. Two separate keys rather than one string
     * with a placeholder, because the second case has to explain the absence
     * and the first must not.
     */
    preselected: (label: string): string =>
      `The “${label}” category has been selected from the catalogue. Change it if you need another.`,
    preselectedFa: (label: string): string =>
      `دسته «${label}» از کاتالوگ برای شما انتخاب شده است. اگر دسته دیگری لازم دارید، آن را تغییر دهید.`,
    notPreselected: {
      en: 'If you arrived from a catalogue entry, its category is not carried across automatically — please choose one below.',
      fa: 'اگر از یکی از ورودی‌های کاتالوگ آمده‌اید، دسته آن محصول به‌طور خودکار در فرم منتقل نمی‌شود؛ لطفاً آن را خودتان انتخاب کنید.',
    },
  },

  /** Heading on the state the form reports after an inert submit. */
  submitted: { en: 'Inquiry noted', fa: 'دریافت شد' },

  cta: {
    eyebrow: { en: 'Still deciding', fa: 'هنوز در حال تصمیم‌گیری' },
    title: { en: 'Start from the catalogue instead.', fa: 'به‌جای آن از کاتالوگ شروع کنید.' },
    description: {
      en: 'If you know the format and the chemistry but not the product, the catalogue is the shorter route — filter it, then describe what you found.',
      fa: 'اگر قالب و شیمی را می‌دانید اما محصول را نه، کاتالوگ مسیر کوتاه‌تری است — آن را فیلتر کنید و سپس آنچه یافتید را شرح دهید.',
    },
    actionLabel: { en: 'Browse the catalogue', fa: 'مرور کاتالوگ' },
    secondaryActionLabel: { en: 'Wholesale inquiries', fa: 'درخواست عمده' },
    secondaryActionHref: '/businesses/batteries/wholesale',
  },
} as const satisfies Record<string, unknown>

/* ==========================================================================
   Shared blocks
   ========================================================================== */

/** What the closing inquiry band lists under an inquiry. */
export function batteryInquiryChecklist(locale: Locale): string[] {
  const items: Record<Locale, string>[] = [
    { en: 'Application, not just a part', fa: 'کاربرد، نه فقط یک قطعه' },
    { en: 'Format and chemistry', fa: 'قالب و شیمی' },
    { en: 'Voltage and capacity', fa: 'ولتاژ و ظرفیت' },
    { en: 'Quantity and timeline', fa: 'مقدار و زمان‌بندی' },
  ]

  return items.map((item) => item[locale])
}