/**
 * Copy for VORTEX TRADE.
 *
 * An independently branded business, so its own copy module rather than an
 * extension of the holding's. The register is deliberately different too:
 * commercial and operational rather than corporate-abstract, and bilingual so
 * the Persian draft is a translation of settled English rather than a separate
 * negotiation.
 *
 * ALL COPY IS DRAFT CONTENT pending client review.
 *
 * NOTHING INVENTED. No minimum order quantity, price, lead time, licence,
 * stock level, product brand, carrier, port or country of operation appears
 * anywhere in this file. Where a commercial site would normally print figures,
 * this one prints the field and leaves the value to be established per
 * inquiry — and says so in as many words rather than implying a figure exists.
 */

/**
 * Every string in this module is stored in both locales; the active one is
 * picked per render. The pages index them with the locale from useLocale(), so
 * a missing translation is a compile error rather than an empty string.
 */
import type { Locale } from './locale'

/**
 * Every string in this module is stored in both locales; the active one is
 * picked per render. The pages index them with the locale from useLocale(), so
 * a missing translation is a compile error rather than an empty string.
 */
export type { Locale }

/** Labels reused across every Trade page. */
export const TRADE_CHROME = {
  /** Wordmark sub-line: identifies the business as part of the holding. */
  parentQualifier: {
    en: 'A Vortex Holding company',
    fa: 'یک شرکت از هلدینگ ورتکس',
  },
  breadcrumbHome: { en: 'Home', fa: 'خانه' },
  breadcrumbTrade: { en: 'VORTEX TRADE', fa: 'ورتکس ترید' },
  servicesLabel: { en: 'Services', fa: 'خدمات' },
  /** Return-path band above the footer. */
  backToParentLabel: {
    en: 'Part of Vortex Holding',
    fa: 'بخشی از هلدینگ ورتکس',
  },
  backToParentBody: {
    en: 'See the holding company, its structure and its other lines of business.',
    fa: 'بازگشت به هلدینگ ورتکس',
  },
  backToParentAction: {
    en: 'Back to Vortex Holding',
    fa: 'بازگشت به هلدینگ ورتکس',
  },
  /** Checklist heading on the closing inquiry band. */
  includeLabel: {
    en: 'Useful to include',
    fa: 'مواردی که کمک می‌کند',
  },
  /**
   * Shown wherever a figure would otherwise be invented. The honest form of
   * an empty value: the field is real, the number is set per inquiry.
   */
  setPerInquiry: {
    en: 'Set per inquiry',
    fa: 'در هر درخواست تعیین می‌شود',
  },
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

export const TRADE_HOME = {
  hero: {
    eyebrow: { en: 'Trade and supply', fa: 'تجارت و تأمین' },
    title: {
      en: 'Sourcing, cross-border trade and supply for commercial buyers.',
      fa: 'تأمین، تجارت فرامرزی و عرضه برای خریداران تجاری.',
    },
    lede: {
      en: 'VORTEX TRADE handles four commercial lines — import and export, wholesale supply, product sourcing and customized procurement. Each begins as a written inquiry and is worked through specification, supply and delivery.',
      fa: 'ورتکس ترید چهار حوزه تجاری را بر عهده دارد: واردات و صادرات، تأمین عمده، تأمین محصول و تأمین اختصاصی. هر یک با یک درخواست مکتوب آغاز می‌شود و از مرحله مشخصات تا تأمین و تحویل پیش می‌رود.',
    },
    primaryCta: { en: 'Our services', fa: 'خدمات ما' },
    primaryCtaHref: '/businesses/trade/services',
    secondaryCta: { en: 'Make an inquiry', fa: 'ثبت درخواست' },
    secondaryCtaHref: '/businesses/trade/contact',
    /** Three lines naming what the business is, under the hero. */
    facts: [
      { en: 'Written inquiries', fa: 'درخواست مکتوب' },
      { en: 'Specification first', fa: 'مشخصات در اولویت' },
      { en: 'Terms set per order', fa: 'شرایط، سفارش به سفارش' },
    ],
  },

  overview: {
    eyebrow: { en: 'What we do', fa: 'حوزه فعالیت' },
    title: { en: 'Four commercial lines', fa: 'چهار حوزه تجاری' },
    lede: {
      en: 'Run as four distinct lines rather than one general service, because a repeat wholesale supply and a one-off sourcing search are different problems with different answers.',
      fa: 'این چهار حوزه به‌صورت خطوطی مستقل اجرا می‌شوند و نه یک خدمت عمومی، زیرا تأمین عمده تکرارشونده و جست‌وجوی یک‌باره تأمین‌کننده، دو مسئله متفاوت با دو پاسخ متفاوت‌اند.',
    },
    ctaLabel: { en: 'All four in detail', fa: 'هر چهار به‌صورت کامل' },
    ctaHref: '/businesses/trade/services',
  },

  process: {
    eyebrow: { en: 'How it works', fa: 'فرایند کار' },
    title: { en: 'From inquiry to delivery', fa: 'از درخواست تا تحویل' },
    lede: {
      en: 'Three stages. Nothing in them is automated, and nothing is confirmed before it has been checked.',
      fa: 'سه مرحله. هیچ‌کدام خودکار نیست و هیچ چیزی پیش از بررسی تأیید نمی‌شود.',
    },
    steps: [
      {
        title: { en: 'Inquiry', fa: 'درخواست' },
        body: {
          en: 'You write with what you need — product, quantity, destination and any specification you already hold. A written inquiry is the only way work starts.',
          fa: 'نیاز خود را می‌نویسید: محصول، مقدار، مقصد و هر مشخصاتی که در اختیار دارید. تنها راه آغاز کار، درخواست مکتوب است.',
        },
      },
      {
        title: { en: 'Specification', fa: 'مشخصات' },
        body: {
          en: 'The inquiry is read against what you wrote. Where something is unclear it is asked back rather than assumed, and the fields that would normally carry figures are set out for your particular request.',
          fa: 'درخواست در برابر نوشته شما بررسی می‌شود. هر آنچه نامشخص باشد پرسیده می‌شود و فرض نمی‌شود، و فیلدهایی که معمولاً عدد دارند برای درخواست شما مشخص می‌شوند.',
        },
      },
      {
        title: { en: 'Supply and delivery', fa: 'تأمین و تحویل' },
        body: {
          en: 'Terms are agreed in writing, and the order is followed through to the delivery point you named.',
          fa: 'شرایط به‌صورت مکتوب توافق می‌شود و سفارش تا نقطه تحویلی که اعلام کرده‌اید پیگیری می‌شود.',
        },
      },
    ],
  },

  position: {
    eyebrow: { en: 'How we work', fa: 'روش کار ما' },
    title: { en: 'What this site does and does not promise', fa: 'آنچه این سایت وعده می‌دهد و آنچه نمی‌دهد' },
    points: [
      {
        title: { en: 'No published figures', fa: 'بدون اعداد منتشرشده' },
        body: {
          en: 'There are no minimum quantities, prices or lead times on this site, because none have been supplied. They are set out for your inquiry when it is reviewed.',
          fa: 'در این سایت هیچ حداقل سفارش، قیمت یا زمان تحویلی درج نشده است، زیرا هیچ‌کدام اعلام نشده‌اند. این موارد هنگام بررسی درخواست شما مشخص می‌شوند.',
        },
      },
      {
        title: { en: 'No checkout, no basket', fa: 'بدون سبد خرید و پرداخت آنلاین' },
        body: {
          en: 'Nothing can be ordered from this website. Every commercial conversation begins as a message and is completed directly.',
          fa: 'از این وب‌سایت نمی‌توان چیزی سفارش داد. هر گفت‌وگوی تجاری با یک پیام آغاز می‌شود و مستقیماً تکمیل می‌شود.',
        },
      },
      {
        title: { en: 'No inquiry is delivered', fa: 'هیچ درخواستی ارسال نمی‌شود' },
        body: {
          en: 'The contact form on this site is front-end only. It has no backend, sends nothing and stores nothing.',
          fa: 'فرم تماس این سایت صرفاً سمت کاربر است. هیچ بک‌اندی ندارد، چیزی ارسال نمی‌کند و چیزی ذخیره نمی‌کند.',
        },
      },
    ],
  },

  cta: {
    eyebrow: { en: 'Business inquiries', fa: 'درخواست‌های تجاری' },
    title: { en: 'Tell us what you need sourced or supplied', fa: 'آنچه را نیاز دارید تأمین یا تهیه شود بنویسید' },
    description: {
      en: 'Describe the product, the quantity and the destination, and we will review the request against what is available to us.',
      fa: 'محصول، مقدار و مقصد را شرح دهید تا درخواست شما را در برابر آنچه در اختیار داریم بررسی کنیم.',
    },
    actionLabel: { en: 'Make an inquiry', fa: 'ثبت درخواست' },
    secondaryActionLabel: { en: 'Our services', fa: 'خدمات ما' },
    secondaryActionHref: '/businesses/trade/services',
  },
} as const satisfies Record<string, unknown>

/* ==========================================================================
   Services index
   ========================================================================== */

export const TRADE_SERVICES_INDEX = {
  hero: {
    eyebrow: { en: 'Services', fa: 'خدمات' },
    title: { en: 'Four commercial services', fa: 'چهار خدمت تجاری' },
    lede: {
      en: 'Each line below is worked separately, with its own inquiry shape and its own process. Jump to the one you came for, or read them in order.',
      fa: 'هر یک از خطوط زیر جداگانه انجام می‌شود، با شکل درخواست و فرایند مخصوص خود. مستقیم به همان موردی که دنبالش بودید بروید یا همه را به‌ترتیب بخوانید.',
    },
  },
  /** Heading above the per-service detail blocks. */
  detailLabel: { en: 'In detail', fa: 'به‌صورت کامل' },
  /** "An inquiry on this service should carry" — the per-service checklist. */
  includesLabel: { en: 'An inquiry should carry', fa: 'یک درخواست باید شامل باشد' },
  /** The note under each service's own values sheet. */
  valuesNote: {
    en: 'These fields are stated for your particular inquiry when it is reviewed. Nothing is published in advance.',
    fa: 'این موارد هنگام بررسی درخواست شما و متناسب با آن مشخص می‌شوند. چیزی از پیش منتشر نمی‌شود.',
  },
  /** Column heading for the values a service would normally state. */
  valuesLabel: { en: 'Set when your inquiry is reviewed', fa: 'هنگام بررسی درخواست شما تعیین می‌شود' },
  /** Closing block on the services page. */
  cta: {
    eyebrow: { en: 'Not sure which line fits?', fa: 'نمی‌دانید کدام حوزه مناسب شماست؟' },
    title: { en: 'Send the requirement and we will point you to the right one', fa: 'نیاز خود را بنویسید تا شما را به حوزه درست راهنمایی کنیم' },
    description: {
      en: 'A repeat supply arrangement and a one-off sourcing search are different problems. Describe yours and we will tell you which of the four it belongs to.',
      fa: 'توافق تأمین تکرارشونده و جست‌وجوی یک‌باره تأمین‌کننده، دو مسئله متفاوت‌اند. مسئله خود را شرح دهید تا بگوییم به کدام‌یک از چهار حوزه تعلق دارد.',
    },
    actionLabel: { en: 'Make an inquiry', fa: 'ثبت درخواست' },
    secondaryActionLabel: { en: 'Procurement', fa: 'تأمین اختصاصی' },
    secondaryActionHref: '/businesses/trade/procurement',
  },
} as const satisfies Record<string, unknown>

/* ==========================================================================
   Procurement
   ========================================================================== */

export const TRADE_PROCUREMENT = {
  hero: {
    eyebrow: { en: 'Customized procurement', fa: 'تأمین اختصاصی' },
    title: { en: 'Describe a specification. We will tell you what can be sourced.', fa: 'مشخصات را شرح دهید تا بگوییم چه چیزی قابل تأمین است.' },
    lede: {
      en: 'This is the structured route into the business. Instead of a general message, an inquiry here carries a specification and a sourcing requirement, so it can be reviewed as a requirement rather than a request.',
      fa: 'این مسیر ساختارمند ورود به کسب‌وکار است. درخواست در اینجا به‌جای پیام عمومی، مشخصات و نیاز تأمین را همراه دارد تا به‌عنوان یک نیاز بررسی شود، نه یک درخواست.',
    },
  },

  /** What a structured inquiry is for. */
  purpose: {
    eyebrow: { en: 'Why structure', fa: 'چرا ساختارمند' },
    title: { en: 'A specification is the only thing that can be sourced against', fa: 'مشخصات تنها چیزی است که می‌توان بر اساس آن تأمین کرد' },
    body: {
      en: 'A product name alone leaves too much open: format, grade, tolerance, packaging, certification and the destination all change what is possible. A written specification narrows that before anyone quotes or commits to anything.',
      fa: 'نام محصول به‌تنهایی فضای باز زیادی باقی می‌گذارد: ابعاد، گرید، تلورانس، بسته‌بندی، گواهی و مقصد، همگی بر امکان‌پذیری اثر می‌گذارند. مشخصات مکتوب این ابهام را پیش از هر قیمت یا تعهدی برطرف می‌کند.',
    },
  },

  /** The fields, as a specification sheet. */
  fields: {
    eyebrow: { en: 'Specification sheet', fa: 'برگه مشخصات' },
    title: { en: 'What to include', fa: 'چه چیزی بنویسید' },
    lede: {
      en: 'Write as much or as little of this as you actually hold. An incomplete specification is still useful — it is completed by asking, not by assuming.',
      fa: 'هر آنچه را واقعاً در اختیار دارید بنویسید، کم یا زیاد. مشخصات ناقص هم مفید است؛ از طریق پرسیدن تکمیل می‌شود، نه با فرض‌کردن.',
    },
    groups: [
      {
        title: { en: 'Product', fa: 'محصول' },
        items: [
          { en: 'What the product is, or what it has to do', fa: 'محصول چیست، یا چه کاری باید انجام دهد' },
          { en: 'Dimensions, format or grade, if held', fa: 'ابعاد، فرمت یا گرید، در صورت وجود' },
          { en: 'Material, composition or standard, if held', fa: 'متریال، ترکیب یا استاندارد، در صورت وجود' },
          { en: 'The use it is intended for', fa: 'کاربرد مورد نظر' },
        ],
      },
      {
        title: { en: 'Quantity', fa: 'مقدار' },
        items: [
          { en: 'The quantity you expect to take', fa: 'مقداری که انتظار دارید بگیرید' },
          { en: 'Whether that is one order or a recurring one', fa: 'آیا یک سفارش است یا تکرارشونده' },
          { en: 'Packaging or unit format', fa: 'بسته‌بندی یا فرمت واحد' },
        ],
      },
      {
        title: { en: 'Sourcing requirement', fa: 'الزامات تأمین' },
        items: [
          { en: 'Where the goods must come from, if it matters', fa: 'منبع مورد قبول، در صورت اهمیت' },
          { en: 'Certification or compliance you require', fa: 'گواهی یا الزامات انطباق مورد نیاز' },
          { en: 'Any supplier you must work through', fa: 'تأمین‌کننده‌ای که باید از طریق آن کار شود' },
        ],
      },
      {
        title: { en: 'Delivery', fa: 'تحویل' },
        items: [
          { en: 'Destination, and whether it is domestic or cross-border', fa: 'مقصد، و اینکه داخلی است یا فرامرزی' },
          { en: 'Your timeline, in your own terms', fa: 'زمان‌بندی شما، به بیان خودتان' },
          { en: 'Anything the shipment has to satisfy on arrival', fa: 'الزامات محموله هنگام رسیدن' },
        ],
      },
    ],
  },

  /** Who this page is aimed at. */
  audience: {
    eyebrow: { en: 'Who this is for', fa: 'این صفحه برای چه کسانی است' },
    title: { en: 'Built for buyers who already know what they need', fa: 'برای خریدارانی که می‌دانند چه می‌خواهند' },
    items: [
      {
        title: { en: 'Procurement teams', fa: 'تیم‌های تأمین' },
        body: {
          en: 'Working to a specification and a supplier qualification requirement, and writing both down.',
          fa: 'کسانی که با مشخصات و الزام تأیید تأمین‌کننده کار می‌کنند و هر دو را مکتوب می‌کنند.',
        },
      },
      {
        title: { en: 'Manufacturers', fa: 'تولیدکنندگان' },
        body: {
          en: 'Looking for a component or material that is specified but not yet sourced.',
          fa: 'کسانی که به دنبال قطعه یا متریالی با مشخصات مشخص اما بدون تأمین‌کننده هستند.',
        },
      },
      {
        title: { en: 'Distributors', fa: 'توزیع‌کنندگان' },
        body: {
          en: 'Assembling a range that needs to come from more than one source, on your own terms.',
          fa: 'کسانی که مجموعه‌ای را می‌چینند که باید از چند منبع و بر اساس شرایط خودشان تأمین شود.',
        },
      },
      {
        title: { en: 'First-time importers', fa: 'واردکنندگان تازه‌کار' },
        body: {
          en: 'Buying across a border for the first time and working out what the specification needs to contain.',
          fa: 'کسانی که برای نخستین بار خرید فرامرزی می‌کنند و در حال مشخص‌کردن محتوای درست مشخصات هستند.',
        },
      },
    ],
  },

  /** What happens to an inquiry submitted here. */
  process: {
    eyebrow: { en: 'What happens next', fa: 'پس از ثبت درخواست چه می‌شود' },
    title: { en: 'How a specification is reviewed', fa: 'یک مشخصات چگونه بررسی می‌شود' },
    steps: [
      {
        title: { en: 'Read against your specification', fa: 'بررسی در برابر مشخصات شما' },
        body: {
          en: 'What you wrote is read as the requirement. Where a field is missing it is asked back, not filled in.',
          fa: 'آنچه نوشته‌اید به‌عنوان نیاز بررسی می‌شود. هر فیلد ناقص پرسیده می‌شود و تکمیل نمی‌شود.',
        },
      },
      {
        title: { en: 'Fields set out for you', fa: 'تعیین موارد برای شما' },
        body: {
          en: 'Quantity, price basis, lead time and packaging are stated for this particular requirement once it has been read.',
          fa: 'مقدار، مبنای قیمت، زمان تحویل و بسته‌بندی برای همین نیاز خاص، پس از بررسی مشخص می‌شوند.',
        },
      },
      {
        title: { en: 'You confirm or amend', fa: 'شما تأیید یا اصلاح می‌کنید' },
        body: {
          en: 'Nothing is treated as agreed until you have confirmed it in writing.',
          fa: 'هیچ‌چیز توافق‌شده تلقی نمی‌شود تا شما آن را مکتوب تأیید کنید.',
        },
      },
    ],
  },

  cta: {
    eyebrow: { en: 'Start here', fa: 'از اینجا شروع کنید' },
    title: { en: 'Send a specification', fa: 'مشخصات خود را ارسال کنید' },
    description: {
      en: 'The more of the specification you hold, the more specific the response can be. What is missing will be asked for.',
      fa: 'هرچه از مشخصات بیشتری در اختیار داشته باشید، پاسخ ما دقیق‌تر می‌تواند باشد. موارد ناقص پرسیده می‌شوند.',
    },
    actionLabel: { en: 'Make an inquiry', fa: 'ثبت درخواست' },
    secondaryActionLabel: { en: 'All services', fa: 'همه خدمات' },
    secondaryActionHref: '/businesses/trade/services',
  },
} as const satisfies Record<string, unknown>

/* ==========================================================================
   Contact
   ========================================================================== */

export const TRADE_CONTACT = {
  hero: {
    eyebrow: { en: 'Business inquiries', fa: 'درخواست تجاری' },
    title: { en: 'Make an inquiry', fa: 'ثبت درخواست' },
    lede: {
      en: 'Tell us what you are looking to source or supply. The more you can say about the product, the quantity and the destination, the more specific the response.',
      fa: 'آنچه را می‌خواهید تأمین یا تهیه کنید بنویسید. هرچه درباره محصول، مقدار و مقصد بیشتر بگویید، پاسخ ما دقیق‌تر خواهد بود.',
    },
  },

  /** The inquiry form. Field labels only — no field invents a required value. */
  form: {
    name: { en: 'Full name', fa: 'نام و نام خانوادگی' },
    email: { en: 'Email address', fa: 'نشانی ایمیل' },
    company: { en: 'Company (optional)', fa: 'شرکت (اختیاری)' },
    phone: { en: 'Phone number (optional)', fa: 'شماره تماس (اختیاری)' },
    service: { en: 'Service of interest', fa: 'حوزه مورد نظر' },
    servicePlaceholder: { en: 'Select a service', fa: 'یک حوزه را انتخاب کنید' },
    quantity: { en: 'Quantity (optional)', fa: 'مقدار (اختیاری)' },
    destination: { en: 'Destination (optional)', fa: 'مقصد (اختیاری)' },
    message: { en: 'Product and requirements', fa: 'محصول و الزامات' },
    messagePlaceholder: {
      en: 'Describe the product, any specification you hold, the quantity and the destination.',
      fa: 'محصول، هر مشخصاتی که در اختیار دارید، مقدار و مقصد را شرح دهید.',
    },
    submit: { en: 'Send inquiry', fa: 'ارسال درخواست' },
    rewrite: { en: 'Write another inquiry', fa: 'درخواست دیگری بنویسید' },
  },

  /** Sidebar beside the form. */
  sidebar: {
    title: { en: 'Before you write', fa: 'پیش از نوشتن' },
    body: {
      en: 'A specification is worth more than a product name. Dimensions, grade, certification and destination all change what is possible, and all of them can be asked for later if you do not have them now.',
      fa: 'مشخصات ارزشمندتر از نام محصول است. ابعاد، گرید، گواهی و مقصد همگی بر امکان‌پذیری اثر می‌گذارند و اگر اکنون نداشته باشید، همگی بعداً قابل پرسیدن‌اند.',
    },
  },

  cta: {
    eyebrow: { en: 'What an inquiry needs', fa: 'یک درخواست چه لازم دارد' },
    title: { en: 'A specification, not just a product name', fa: 'مشخصات، نه صرفاً نام محصول' },
    description: {
      en: 'The four things below are what make an inquiry reviewable. Anything you do not have yet is asked for rather than assumed.',
      fa: 'چهار مورد زیر همان چیزی است که یک درخواست را قابل بررسی می‌کند. هر آنچه هنوز ندارید، پرسیده می‌شود نه اینکه فرض شود.',
    },
    actionLabel: { en: 'Write it now', fa: 'همین حالا بنویسید' },
    actionHref: '/businesses/trade/contact',
  },
} as const satisfies Record<string, unknown>

/** The closing checklist, shared by every Trade inquiry band. */
export const TRADE_INQUIRY_CHECKLIST = {
  product: { en: 'The product, in as much detail as you have', fa: 'محصول، تا آنجا که جزئیات دارید' },
  quantity: { en: 'Quantity, and whether it recurs', fa: 'مقدار، و اینکه تکرارشونده است یا نه' },
  destination: { en: 'Destination, domestic or cross-border', fa: 'مقصد، داخلی یا فرامرزی' },
  specification: { en: 'Any specification, standard or certification you hold', fa: 'هر مشخصات، استاندارد یا گواهی که در اختیار دارید' },
} as const satisfies Record<string, unknown>

/**
 * Display order for the checklist.
 *
 * Explicit rather than relying on object key order: the order a reader should
 * meet these in — what, how much, where, against what standard — is an editorial
 * decision, and `Object.values` would tie it to key order instead.
 */
export const TRADE_INQUIRY_CHECKLIST_ORDER = [
  'product',
  'quantity',
  'destination',
  'specification',
] as const satisfies readonly (keyof typeof TRADE_INQUIRY_CHECKLIST)[]

/**
 * The checklist as plain strings for the active locale.
 *
 * Every Trade page's inquiry band resolves it the same way, so the four pages
 * cannot disagree about what an inquiry should carry.
 */
export function tradeChecklist(locale: Locale): string[] {
  return TRADE_INQUIRY_CHECKLIST_ORDER.map((key) => TRADE_INQUIRY_CHECKLIST[key][locale])
}