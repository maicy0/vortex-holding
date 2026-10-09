/**
 * Site-wide copy, kept out of components so the bilingual surface is one
 * auditable file.
 *
 * Persian is the primary language; English is drafted alongside it so the later
 * localisation step is a translation pass rather than a rewrite.
 *
 * ALL COPY IS DRAFT CONTENT pending client review.
 */

/** Every string is stored in both locales; the active one is picked per render. */
export interface Bilingual {
  en: string
  fa: string
}

export const HOME_COPY = {
  hero: {
    eyebrow: { en: 'Vortex Holding', fa: 'هلدینگ ورتکس' },
    title: {
      en: 'Connecting opportunity, trade and supply.',
      fa: 'ورتکس؛ پیوند فرصت‌ها، تجارت و تأمین کالا',
    },
    lede: {
      en: 'Vortex Holding operates in trade, import and export, goods supply and product sales, offering a range of services to corporate clients and consumers.',
      fa: 'هلدینگ ورتکس در حوزه بازرگانی، واردات و صادرات، تأمین کالا و فروش محصولات فعالیت می‌کند و خدمات متنوعی را برای مشتریان سازمانی و مصرف‌کنندگان ارائه می‌دهد.',
    },
    primaryCta: { en: 'Our services', fa: 'خدمات ما' },
    secondaryCta: { en: 'Contact us', fa: 'تماس با ما' },
  },
  intro: {
    eyebrow: { en: 'Introduction', fa: 'معرفی' },
    title: { en: 'A diversified holding company', fa: 'یک هلدینگ چندشاخه' },
    body: {
      en: 'Vortex Holding brings together five lines of business — import and export, wholesale, retail, batteries and procurement — under a single corporate structure. Each is run as a distinct business, and together they cover the route of a product from source to end customer.',
      fa: 'هلدینگ ورتکس پنج حوزه فعالیت — واردات و صادرات، بازرگانی عمده، خرده‌فروشی، باتری و تأمین کالا — را در یک ساختار شرکتی واحد گرد هم آورده است. هر حوزه به‌عنوان کسب‌وکاری مستقل اداره می‌شود و در کنار یکدیگر مسیر یک محصول را از منبع تا مشتری نهایی پوشش می‌دهند.',
    },
    points: [
      {
        title: { en: 'Sourcing', fa: 'تأمین' },
        body: {
          en: 'Finding and qualifying suppliers for the products we handle.',
          fa: 'شناسایی و ارزیابی تأمین‌کنندگان محصولاتی که با آن‌ها کار می‌کنیم.',
        },
      },
      {
        title: { en: 'Trade', fa: 'بازرگانی' },
        body: {
          en: 'Moving goods across borders and through the supply chain.',
          fa: 'جابه‌جایی کالا میان مرزها و در طول زنجیره تأمین.',
        },
      },
      {
        title: { en: 'Sale', fa: 'فروش' },
        body: {
          en: 'Supplying businesses and consumers from the same structure.',
          fa: 'تأمین کسب‌وکارها و مصرف‌کنندگان از ساختاری واحد.',
        },
      },
    ],
    ctaLabel: { en: 'More about the holding', fa: 'درباره هلدینگ بیشتر' },
  },
  services: {
    eyebrow: { en: 'What we do', fa: 'حوزه فعالیت' },
    title: { en: 'Our services', fa: 'خدمات ما' },
    lede: {
      en: 'Five lines of business, each with its own scope and team.',
      fa: 'پنج حوزه فعالیت، هر یک با دامنه و تیم مستقل خود.',
    },
    ctaLabel: { en: 'All services', fa: 'همه خدمات' },
  },
  businesses: {
    eyebrow: { en: 'Our companies', fa: 'شرکت‌های ما' },
    title: { en: 'Two dedicated businesses', fa: 'دو کسب‌وکار تخصصی' },
    lede: {
      en: 'Alongside the holding, we operate two companies with their own identity and focus.',
      fa: 'در کنار هلدینگ، دو شرکت با هویت و تمرکز مستقل خود اداره می‌کنیم.',
    },
    trade: {
      body: {
        en: 'Focused on import, export and the supply of goods.',
        fa: 'با تمرکز بر واردات، صادرات و تأمین کالا.',
      },
      visit: { en: 'Visit the trade site', fa: 'ورود به سایت تجارت' },
    },
    battery: {
      body: {
        en: 'Focused on battery products and energy storage.',
        fa: 'با تمرکز بر محصولات باتری و ذخیره‌سازی انرژی.',
      },
      visit: { en: 'Visit the battery site', fa: 'ورود به سایت باتری' },
    },
  },
  process: {
    eyebrow: { en: 'How it works', fa: 'فرایند همکاری' },
    title: { en: 'How an inquiry proceeds', fa: 'فرایند ثبت درخواست' },
    lede: {
      en: 'Three steps from first contact to delivery.',
      fa: 'سه گام از نخستین تماس تا تحویل.',
    },
    steps: [
      {
        title: { en: 'You get in touch', fa: 'تماس شما' },
        body: {
          en: 'Tell us what you need, with quantity and destination where relevant.',
          fa: 'نیاز خود را بگویید و در صورت نیاز، مقدار و مقصد را هم بنویسید.',
        },
      },
      {
        title: { en: 'We review and quote', fa: 'بررسی و ارائه قیمت' },
        body: {
          en: 'We assess the request, confirm specification and availability, and respond.',
          fa: 'درخواست را بررسی می‌کنیم، مشخصات و موجودی را تأیید می‌کنیم و پاسخ می‌دهیم.',
        },
      },
      {
        title: { en: 'Order and delivery', fa: 'سفارش و تحویل' },
        body: {
          en: 'Once terms are agreed, we proceed with the order through to delivery.',
          fa: 'پس از توافق بر شرایط، سفارش را تا تحویل پیش می‌بریم.',
        },
      },
    ],
  },
  founders: {
    eyebrow: { en: 'Founders', fa: 'بنیان‌گذاران' },
    title: { en: 'The founders', fa: 'بنیان‌گذاران' },
    lede: {
      en: 'Vortex Holding was founded by Mr. Ma’dani and Mr. Stiri.',
      fa: 'هلدینگ ورتکس به دست آقای معدنی و آقای استیری تأسیس شده است.',
    },
    role: { en: 'Founder', fa: 'بنیان‌گذار' },
  },
  cta: {
    title: { en: 'Make an inquiry', fa: 'ثبت درخواست' },
    description: {
      en: 'Tell us what you are looking for and we will review your request.',
      fa: 'آنچه را به دنبال آن هستید به ما بگویید تا درخواست شما را بررسی کنیم.',
    },
    actionLabel: { en: 'Contact us', fa: 'تماس با ما' },
    secondaryActionLabel: { en: 'Our services', fa: 'خدمات ما' },
    secondaryActionHref: '/services',
  },
} as const satisfies Record<string, unknown>

export const ABOUT_COPY = {
  eyebrow: { en: 'About', fa: 'درباره ما' },
  title: { en: 'About Vortex Holding', fa: 'درباره هلدینگ ورتکس' },
  lede: {
    en: 'A diversified business holding company operating across trade, import and export, goods supply and product sales.',
    fa: 'یک شرکت هلدینگ چندشاخه فعال در حوزه‌های بازرگانی، واردات و صادرات، تأمین کالا و فروش محصولات.',
  },
  body: [
    {
      en: 'Vortex Holding operates five lines of business: import and export, wholesale, retail, batteries and procurement. Together these cover the route of a product from source to end customer, and allow the holding to serve both corporate clients and consumers from a single structure.',
      fa: 'هلدینگ ورتکس در پنج حوزه فعالیت می‌کند: واردات و صادرات، بازرگانی عمده، خرده‌فروشی، باتری و تأمین کالا. این حوزه‌ها در کنار هم مسیر یک محصول را از منبع تا مشتری نهایی پوشش می‌دهند و به هلدینگ اجازه می‌دهند در ساختاری واحد هم به مشتریان سازمانی و هم به مصرف‌کنندگان خدمات ارائه دهد.',
    },
    {
      en: 'Alongside the holding, two dedicated companies — VORTEX TRADE and VORTEX BATTERY — operate with their own identity and focus.',
      fa: 'در کنار هلدینگ، دو شرکت تخصصی — ورتکس ترید و ورتکس باتری — با هویت و تمرکز مستقل خود فعالیت می‌کنند.',
    },
  ],
  servicesEyebrow: { en: 'Structure', fa: 'ساختار' },
  servicesTitle: { en: 'Five lines of business', fa: 'پنج حوزه فعالیت' },
  companiesEyebrow: { en: 'Our companies', fa: 'شرکت‌های ما' },
  companiesTitle: { en: 'Two dedicated businesses', fa: 'دو کسب‌وکار تخصصی' },
  foundersEyebrow: { en: 'Founders', fa: 'بنیان‌گذاران' },
  foundersTitle: { en: 'Founded by', fa: 'تأسیس‌کنندگان' },
  foundersLede: {
    en: 'Vortex Holding was founded by Mr. Ma’dani and Mr. Stiri.',
    fa: 'هلدینگ ورتکس به دست آقای معدنی و آقای استیری تأسیس شده است.',
  },
  role: { en: 'Founder', fa: 'بنیان‌گذار' },
  cta: {
    title: { en: 'Work with us', fa: 'همکاری با ما' },
    description: {
      en: 'Tell us what you are looking for and we will review your request.',
      fa: 'آنچه را به دنبال آن هستید به ما بگویید تا درخواست شما را بررسی کنیم.',
    },
    actionLabel: { en: 'Contact us', fa: 'تماس با ما' },
  },
} as const satisfies Record<string, unknown>

export const SERVICES_INDEX_COPY = {
  eyebrow: { en: 'Services', fa: 'خدمات' },
  title: { en: 'Our services', fa: 'خدمات ما' },
  lede: {
    en: 'Five lines of business, each operated as a distinct company within the holding.',
    fa: 'پنج حوزه فعالیت، هر یک به‌عنوان کسب‌وکاری مستقل در هلدینگ اداره می‌شود.',
  },
  otherTitle: { en: 'Other services', fa: 'سایر خدمات' },
  cta: {
    title: { en: 'Not sure which service fits?', fa: 'هنوز مطمئن نیستید کدام خدمت مناسب شماست؟' },
    description: {
      en: 'Send us your requirement and we will point you to the right line of business.',
      fa: 'نیاز خود را برای ما بنویسید تا شما را به حوزه فعالیت مناسب راهنمایی کنیم.',
    },
    actionLabel: { en: 'Make an inquiry', fa: 'ثبت درخواست' },
  },
} as const satisfies Record<string, unknown>

/**
 * Labels shared by the five service pages.
 *
 * Only the chrome is here — breadcrumbs, section headings, the lead-in to the
 * inquiry section. Everything specific to a service lives in
 * src/app/service-pages.ts.
 */
export const SERVICE_PAGE_COPY = {
  relatedEyebrow: { en: 'Related', fa: 'مرتبط' },
  relatedTitle: { en: 'Other services', fa: 'سایر خدمات' },
  breadcrumbRoot: { en: 'Home', fa: 'خانه' },
  breadcrumbServices: { en: 'Services', fa: 'خدمات' },
  servicesIndexLabel: { en: 'See all five services', fa: 'مشاهده هر پنج خدمت' },
  /** Eyebrow on the hero, reading as the journey stage rather than a category. */
  heroEyebrow: { en: 'Service', fa: 'خدمت' },
  /** Field labels for the hero's at-a-glance strip. */
  atAGlance: { en: 'At a glance', fa: 'در یک نگاه' },
  /** The two columns of the inquiry section. */
  inquiryIncludeHeading: { en: 'Useful to include', fa: 'مواردی که کمک می‌کند' },
  inquiryNextHeading: { en: 'What happens next', fa: 'آنچه پس از آن رخ می‌دهد' },
  /** Note on the values sheet: nothing is stated until the inquiry is read. */
  sheetNote: { en: 'Set per inquiry', fa: 'در هر درخواست تعیین می‌شود' },
  /** Shown wherever a figure would otherwise be invented. */
  notStatedNote: {
    en: 'Set out for your inquiry when it is reviewed.',
    fa: 'در جریان بررسی درخواست شما مشخص می‌شود.',
  },
  /** Cross-link block beneath the related services. */
  crossLinksLabel: { en: 'Continue', fa: 'ادامه' },
  crossLinksRoot: {
    en: 'About the holding',
    fa: 'درباره هلدینگ',
  },
  crossLinksServices: {
    en: 'All five services',
    fa: 'هر پنج خدمت',
  },
  /** Contextual checklist on the closing call to action. */
  ctaContextLabel: { en: 'Useful to include', fa: 'مواردی که کمک می‌کند' },
  /** Fallback for a service with no contextual checklist of its own. */
  cta: {
    title: { en: 'Talk to us about this service', fa: 'با ما درباره این خدمت گفتگو کنید' },
    actionLabel: { en: 'Make an inquiry', fa: 'ثبت درخواست' },
  },
} as const satisfies Record<string, unknown>

export const CONTACT_COPY = {
  eyebrow: { en: 'Contact', fa: 'تماس با ما' },
  title: { en: 'Make an inquiry', fa: 'ثبت درخواست' },
  lede: {
    en: 'Tell us what you are looking for and we will review your request.',
    fa: 'آنچه را به دنبال آن هستید به ما بگویید تا درخواست شما را بررسی کنیم.',
  },
  detailsTitle: { en: 'Before you write', fa: 'پیش از نوشتن' },
  detailsBody: {
    en: 'Including the quantity and the destination, where relevant, lets us respond with something specific.',
    fa: 'ذکر مقدار و مقصد، در صورت نیاز، امکان پاسخ دقیق‌تری را به ما می‌دهد.',
  },
  form: {
    name: { en: 'Full name', fa: 'نام و نام خانوادگی' },
    email: { en: 'Email address', fa: 'نشانی ایمیل' },
    phone: { en: 'Phone number', fa: 'شماره تماس' },
    company: { en: 'Company (optional)', fa: 'شرکت (اختیاری)' },
    service: { en: 'Service of interest', fa: 'حوزه مورد نظر' },
    servicePlaceholder: { en: 'Select a service', fa: 'یک حوزه را انتخاب کنید' },
    message: { en: 'Message', fa: 'پیام' },
    messagePlaceholder: {
      en: 'Describe what you need, including quantity and destination if relevant.',
      fa: 'نیاز خود را شرح دهید؛ در صورت نیاز، مقدار و مقصد را نیز بنویسید.',
    },
    submit: { en: 'Send inquiry', fa: 'ارسال درخواست' },
    /** Button on the demonstration confirmation that returns to the form. */
    rewrite: { en: 'Write another inquiry', fa: 'درخواست دیگری بنویسید' },
  },
  /** Front-end only: there is no backend and nothing is transmitted. */
  notice: {
    en: 'Demonstration form — nothing is submitted or stored.',
    fa: 'فرم نمایشی است — هیچ اطلاعاتی ارسال یا ذخیره نمی‌شود.',
  },
  success: {
    en: 'This is a demonstration, so nothing was sent. Contact details will be added once they are provided.',
    fa: 'این نسخه نمایشی است و چیزی ارسال نشد. اطلاعات تماس به‌محض فراهم‌شدن افزوده خواهد شد.',
  },
} as const satisfies Record<string, unknown>

export const NOT_FOUND_COPY = {
  breadcrumb: { en: 'Not found', fa: 'یافت نشد' },
  title: { en: 'Page not found', fa: 'صفحه یافت نشد' },
  body: {
    en: 'The page you are looking for does not exist.',
    fa: 'صفحه‌ای که به دنبال آن هستید وجود ندارد.',
  },
  action: { en: 'Go home', fa: 'بازگشت به خانه' },
  servicesAction: { en: 'Browse our services', fa: 'مشاهده خدمات' },
} as const satisfies Record<string, unknown>

/**
 * Screen-reader labels shared by the mobile menu triggers and the landmarks
 * that carry no visible text. Hardcoded English here would be announced in
 * English over a Persian page, so every audible label is bilingual.
 */
export const A11Y_LABELS = {
  openMenu: { en: 'Open menu', fa: 'باز کردن منو' },
  closeMenu: { en: 'Close menu', fa: 'بستن منو' },
  mainNav: { en: 'Main', fa: 'اصلی' },
  mobileNav: { en: 'Menu', fa: 'منو' },
  language: { en: 'Language', fa: 'زبان' },
  breadcrumb: { en: 'Breadcrumb', fa: 'مسیر صفحه' },
  footerNav: { en: 'Footer', fa: 'پانوشت' },
  ecosystem: { en: 'Ecosystem', fa: 'اکوسیستم' },
  home: { en: 'VORTEX Holding — home', fa: 'هلدینگ ورتکس — خانه' },
  servicesOnThisPage: {
    en: 'Services on this page',
    fa: 'خدمات این صفحه',
  },
} as const satisfies Record<string, Bilingual>
