import type { Locale } from './locale'
import type { Service } from './services'

/**
 * Full copy for the five service detail pages, keyed by service slug.
 *
 * Each service answers the same nine questions — but answers them in its own
 * shape, because a cross-border trade inquiry is not a battery technical
 * question and neither is a repeat wholesale order:
 *
 *   breadcrumb  trail, with the visitor's own journey named
 *   hero        eyebrow, headline, lede, three at-a-glance facts
 *   description a standalone paragraph, stated plainly
 *   audience    who this suits, and what they are trying to do
 *   useCases    the situations that actually arrive
 *   inquiry     what to put in an inquiry, and how it moves afterwards
 *   detail      the supporting section, whose form is per-service
 *   cta         a closing call to action in that service's own terms
 *   related     which of the other four to lead with, and why
 *
 * Each service also names a `layout` — the composition its page is built in,
 * so no two pages are built the same way. See src/pages/service-layouts/.
 *
 * NOTHING INVENTED. No minimum order quantity, price, lead time, licence,
 * stock level, product brand or country of operation appears anywhere in this
 * file. Where a real page would carry one of those — a tariff, a delivery
 * window, a list of the cell formats we hold — the copy says the figure is
 * established when the inquiry is reviewed. `detailedList` is deliberately
 * structured for that: its label is stable copy ("Values we establish with
 * you"), while its entries are drawn from the live inquiry draft, so the
 * section shows honest placeholders rather than invented numbers.
 *
 * ALL COPY IS DRAFT CONTENT pending client review.
 */

export interface DetailItem {
  title: Record<Locale, string>
  body: Record<Locale, string>
}

/** A numbered or titled row, with an optional short qualifier beside it. */
export interface Capability extends DetailItem {
  meta?: Record<Locale, string>
}

export interface ServicePageCopy {
  /** Crumb label naming where the visitor is in their own journey. */
  breadcrumb: Record<Locale, string>
  hero: {
    eyebrow: Record<Locale, string>
    title: Record<Locale, string>
    lede: Record<Locale, string>
    /** Three at-a-glance facts. Supplied by the layout, not stored per service. */
    facts: string[]
  }
  description: Record<Locale, string>
  /** Short eyebrow for the description block, which sits directly under the hero. */
  descriptionLabel: Record<Locale, string>
  audience: {
    eyebrow: Record<Locale, string>
    title: Record<Locale, string>
    lede: Record<Locale, string>
    items: DetailItem[]
  }
  useCases: {
    eyebrow: Record<Locale, string>
    title: Record<Locale, string>
    items: DetailItem[]
  }
  inquiry: {
    eyebrow: Record<Locale, string>
    title: Record<Locale, string>
    lede: Record<Locale, string>
    /** What helps us answer — the more specific, the better the response. */
    include: DetailItem[]
    /** What happens after the inquiry is sent. */
    next: DetailItem[]
  }
  /** Label naming the supporting section above the shared section labels. */
  detailLabel: Record<Locale, string>
  detailTitle: Record<Locale, string>
  detailLede: Record<Locale, string>
  detail: {
    kind: 'capabilities' | 'questions'
    /** For `capabilities`: titled rows. For `questions`: prompts to answer. */
    items: Capability[]
    /** For `questions`: values established during inquiry review. */
    detailedLabel?: Record<Locale, string>
    detailedList?: Record<Locale, string>[]
  }
  /** Cross-links to the holding, its contact page, and one sibling service. */
  primary: { label: Record<Locale, string>; href: string }
  secondary: { label: Record<Locale, string>; href: string }
  /** Leads the related-services grid; the other three follow. */
  leadRelated: string
  cta: {
    eyebrow: Record<Locale, string>
    title: Record<Locale, string>
    description: Record<Locale, string>
    actionLabel: Record<Locale, string>
    actionHref: string
    secondaryActionLabel: Record<Locale, string>
  }
}

/** Section headings shared by all five pages live in src/app/copy.ts. */

/* ==========================================================================
   1. Import & export
   ========================================================================== */

const IMPORT_EXPORT: ServicePageCopy = {
  breadcrumb: { en: 'Cross-border trade', fa: 'تجارت بین‌المللی' },

  hero: {
    eyebrow: { en: 'Import & export', fa: 'واردات و صادرات' },
    title: {
      en: 'Moving goods across borders, from the first quote to the paperwork.',
      fa: 'جابه‌جایی کالا میان مرزها، از نخستین استعلام تا اسناد',
    },
    lede: {
      en: 'We handle general sourcing and cross-border trade for corporate and commercial buyers — identifying suppliers, matching the specification you need, and coordinating the documentation and transport each movement requires.',
      fa: 'ما تأمین عمومی و تجارت بین‌المللی را برای خریداران سازمانی و تجاری انجام می‌دهیم: شناسایی تأمین‌کننده، تطبیق مشخصات مورد نیاز و هماهنگی اسناد و حمل مورد نیاز هر محموله.',
    },
    facts: ['Sourcing', 'Documentation', 'Freight coordination'],
  },

  description: {
    en: 'Cross-border trade is mostly coordination. A movement goes wrong in the gaps between one party and the next — a supplier that cannot meet the specification, a document that does not match the cargo, a mode of transport that does not fit the route. This line of business exists to hold those gaps open and keep each party working from the same information. You describe the goods and where they need to go; we take responsibility for finding a route that works and for the paperwork attached to it.',
    fa: 'تجارت بین‌المللی عمدتاً هماهنگی است. یک محموله معمولاً در شکاف میان یک طرف و طرف دیگر دچار مشکل می‌شود: تأمین‌کننده‌ای که نمی‌تواند مشخصات را تأمین کند، سندی که با محموله مطابقت ندارد، یا شیوه حملی که با مسیر سازگار نیست. این حوزه فعالیت دقیقاً برای آن شکاف‌ها شکل گرفته است تا هر طرف بر پایه یک اطلاعات مشترک کار کند. شما کالا و مقصد را شرح می‌دهید و ما مسیر مناسب و اسناد مربوط به آن را بر عهده می‌گیریم.',
  },
  descriptionLabel: { en: 'About this service', fa: 'درباره این خدمت' },

  audience: {
    eyebrow: { en: 'Who this suits', fa: 'مخاطب این خدمت' },
    title: {
      en: 'Buyers who need goods to cross a border',
      fa: 'خریدارانی که کالا باید از مرز عبور کند',
    },
    lede: {
      en: 'Every inquiry here starts with a specification and an origin or destination. These are the kinds of organisation that tend to send one.',
      fa: 'هر درخواست در این حوزه با یک مشخصات فنی و مبدأ یا مقصد آغاز می‌شود. سازمان‌هایی از این دست معمولاً چنین درخواستی ارسال می‌کنند.',
    },
    items: [
      {
        title: { en: 'Manufacturers', fa: 'تولیدکنندگان' },
        body: {
          en: 'sourcing components or raw materials that are not available from a domestic supplier.',
          fa: 'تأمین قطعات یا مواد اولیه‌ای که از تأمین‌کننده داخلی در دسترس نیست.',
        },
      },
      {
        title: { en: 'Trading companies', fa: 'شرکت‌های بازرگانی' },
        body: {
          en: 'moving third-party goods across a border without building an in-house trade operation.',
          fa: 'جابه‌جایی کالای شخص ثالث از مرز، بدون راه‌اندازی واحد بازرگانی داخلی.',
        },
      },
      {
        title: { en: 'Distributors', fa: 'توزیع‌کنندگان' },
        body: {
          en: 'replenishing a product line from an overseas manufacturer rather than a local agent.',
          fa: 'تکمیل خط محصول از یک تولیدکننده خارجی به‌جای نماینده محلی.',
        },
      },
      {
        title: { en: 'Retailers', fa: 'خرده‌فروشان' },
        body: {
          en: 'buying directly from manufacturers rather than through a wholesaler, where the volume supports it.',
          fa: 'خرید مستقیم از تولیدکنندگان به‌جای واسطه عمده‌فروش، هرجا حجم خرید توجیه‌کننده باشد.',
        },
      },
    ],
  },

  useCases: {
    eyebrow: { en: 'Where it comes up', fa: 'کاربردهای رایج' },
    title: { en: 'The inquiries we receive', fa: 'درخواست‌هایی که دریافت می‌کنیم' },
    items: [
      {
        title: {
          en: 'A product that cannot be sourced domestically',
          fa: 'محصولی که در داخل قابل تأمین نیست',
        },
        body: {
          en: 'You know what you need and where it is made, but no local supplier carries it at a specification you can use.',
          fa: 'می‌دانید چه می‌خواهید و کجا ساخته می‌شود، اما هیچ تأمین‌کننده داخلی آن را با مشخصات قابل استفاده ندارد.',
        },
      },
      {
        title: {
          en: 'A supplier identified, nothing arranged',
          fa: 'تأمین‌کننده مشخص است، اما چیزی هماهنگ نشده',
        },
        body: {
          en: 'You have a manufacturer in mind but no one to handle the documentation, customs and transport that follow.',
          fa: 'تولیدکننده‌ای در نظر دارید، اما کسی برای اسناد، گمرک و حمل پس از آن وجود ندارد.',
        },
      },
      {
        title: {
          en: 'A recurring shipment without a trade desk',
          fa: 'محموله تکرارشونده بدون واحد بازرگانی',
        },
        body: {
          en: 'The movement happens regularly, but the work between placing an order and receiving the goods is being done ad hoc.',
          fa: 'این جابه‌جایی منظم است، اما کار میان ثبت سفارش و دریافت کالا موردی و پراکنده انجام می‌شود.',
        },
      },
      {
        title: {
          en: 'Someone who wants a second opinion on a quote',
          fa: 'کسی که نظر دوم درباره یک پیشنهاد قیمت می‌خواهد',
        },
        body: {
          en: 'You have a supplier offer in hand and want it read by a party with no stake in the outcome.',
          fa: 'پیشنهاد قیمت یک تأمین‌کننده را دارید و می‌خواهید طرفی مستقل از نتیجه آن را بررسی کند.',
        },
      },
    ],
  },

  inquiry: {
    eyebrow: { en: 'How an inquiry works', fa: 'فرایند ثبت درخواست' },
    title: { en: 'What to send, and what happens next', fa: 'چه بفرستید و پس از آن چه می‌شود' },
    lede: {
      en: 'We read every inquiry before replying. The more specific the request, the more specific the answer.',
      fa: 'ما هر درخواست را پیش از پاسخ‌گویی می‌خوانیم. هرچه درخواست دقیق‌تر باشد، پاسخ ما نیز دقیق‌تر خواهد بود.',
    },
    include: [
      {
        title: { en: 'What the goods are', fa: 'اینکه کالا چیست' },
        body: {
          en: 'the product, and the specification that defines it — dimensions, grade, material, capacity, packaging.',
          fa: 'محصول و مشخصاتی که آن را تعریف می‌کند: ابعاد، گرید، متریال، ظرفیت، بسته‌بندی.',
        },
      },
      {
        title: { en: 'The route', fa: 'مسیر' },
        body: {
          en: 'the country of origin and the destination country, and whether the movement is inbound or outbound.',
          fa: 'کشور مبدأ و کشور مقصد، و اینکه محموله ورودی است یا خروجی.',
        },
      },
      {
        title: { en: 'The quantity', fa: 'مقدار' },
        body: {
          en: 'the volume involved, however approximate. It sets the form the movement takes.',
          fa: 'حجم مورد نیاز، هرچقدر تقریبی. این عدد شکل جابه‌جایی را مشخص می‌کند.',
        },
      },
      {
        title: { en: 'Any reference to work with', fa: 'هر مرجعی که بتوانیم روی آن کار کنیم' },
        body: {
          en: 'a drawing, a sample reference, a supplier quote, or a written specification you already hold.',
          fa: 'نقشه، نمونه مرجع، پیشنهاد قیمت تأمین‌کننده یا مشخصات کتبی که از پیش در اختیار دارید.',
        },
      },
    ],
    next: [
      {
        title: { en: 'We read it against your specification', fa: 'بررسی در برابر مشخصات شما' },
        body: {
          en: 'and identify what is still missing before we can look for suppliers.',
          fa: 'و مشخص می‌کنیم پیش از جست‌وجوی تأمین‌کننده چه چیزی هنوز کم است.',
        },
      },
      {
        title: { en: 'We discuss sourcing options', fa: 'بررسی گزینه‌های تأمین' },
        body: {
          en: 'and put the commercial, documentation and transport questions side by side with you.',
          fa: 'و پرسش‌های تجاری، اسنادی و حمل را کنار هم با شما مرور می‌کنیم.',
        },
      },
      {
        title: { en: 'Terms are agreed before anything moves', fa: 'توافق بر شرایط پیش از هر جابه‌جایی' },
        body: {
          en: 'and no goods, documents or payments change hands until they are.',
          fa: 'و تا پیش از آن هیچ کالا، سند یا پرداختی مبادله نمی‌شود.',
        },
      },
    ],
  },

  detailLabel: { en: 'Scope', fa: 'دامنه کار' },
  detailTitle: { en: 'What sits inside this service', fa: 'آنچه در این خدمت قرار دارد' },
  detailLede: {
    en: 'Three strands run through every cross-border movement. They overlap — a shipment is rarely one without the others — but each has its own work attached to it.',
    fa: 'سه رشته در هر جابه‌جایی بین‌المللی جریان دارد. این سه با هم هم‌پوشانی دارند — یک محموله به‌ندرت بدون یکی از آن‌هاست — اما هرکدام کار مستقلی به خود متصل دارند.',
  },
  detail: {
    kind: 'capabilities',
    items: [
      {
        meta: { en: 'Sourcing', fa: 'تأمین منبع' },
        title: { en: 'Finding a supplier who can actually make it', fa: 'یافتن تأمین‌کننده‌ای که واقعاً بتواند تولید کند' },
        body: {
          en: 'Manufacturer or trading company, screened against the specification you gave us rather than against a product catalogue. Where your requirement is unusual, the search is part of the job rather than a lookup.',
          fa: 'تولیدکننده یا شرکت بازرگانی، که بر پایه مشخصاتی که شما داده‌اید سنجیده می‌شود، نه بر پایه یک کاتالوگ محصول. اگر نیاز شما غیرمعمول باشد، جست‌وجو بخشی از کار است، نه یک بررسی ساده.',
        },
      },
      {
        meta: { en: 'Documentation', fa: 'اسناد' },
        title: { en: 'The paper that has to match the cargo', fa: 'اسنادی که باید با محموله مطابقت داشته باشند' },
        body: {
          en: 'The customs and shipping documentation a movement needs depends on the goods, the route and the mode of transport. We assemble it so that what is declared, what is shipped and what is invoiced all describe the same thing.',
          fa: 'اسناد گمرکی و حمل مورد نیاز یک محموله به کالا، مسیر و شیوه حمل بستگی دارد. ما آن‌ها را طوری تهیه می‌کنیم که آنچه اظهار می‌شود، آنچه حمل می‌شود و آنچه صورت‌حساب می‌شود، همگی یک چیز را توصیف کنند.',
        },
      },
      {
        meta: { en: 'Freight coordination', fa: 'هماهنگی حمل' },
        title: { en: 'Transport, and knowing where the goods are', fa: 'حمل، و اینکه کالا کجاست' },
        body: {
          en: 'Arranging transport for the route, and tracking the consignment until it arrives — so that a delay is something you hear from us before you hear it from someone else.',
          fa: 'هماهنگی حمل برای مسیر مورد نظر و رهگیری محموله تا رسیدن — به‌گونه‌ای که هر تأخیری را پیش از دیگران از ما بشنوید.',
        },
      },
    ],
  },

  primary: {
    label: { en: 'Make a trade inquiry', fa: 'ثبت درخواست تجارت' },
    href: '/contact',
  },
  secondary: {
    label: { en: 'Procurement', fa: 'تأمین کالا' },
    href: '/services/procurement',
  },
  leadRelated: 'procurement',

  cta: {
    eyebrow: { en: 'Import & export', fa: 'واردات و صادرات' },
    title: { en: 'Tell us what needs to cross the border', fa: 'بگویید چه چیزی باید از مرز عبور کند' },
    description: {
      en: 'The goods, the specification, the origin and the destination. We will come back with what we can source and what we need clarified.',
      fa: 'کالا، مشخصات، مبدأ و مقصد را بنویسید. ما با آنچه قابل تأمین است و آنچه نیاز به شفاف‌سازی دارد پاسخ می‌دهیم.',
    },
    actionLabel: { en: 'Make a trade inquiry', fa: 'ثبت درخواست تجارت' },
    actionHref: '/contact',
    secondaryActionLabel: { en: 'See all services', fa: 'مشاهده همه خدمات' },
  },
}

/* ==========================================================================
   2. Wholesale
   ========================================================================== */

const WHOLESALE: ServicePageCopy = {
  breadcrumb: { en: 'Bulk purchasing', fa: 'خرید عمده' },

  hero: {
    eyebrow: { en: 'Wholesale', fa: 'بازرگانی عمده' },
    title: {
      en: 'Buying in volume, and buying it the same way twice.',
      fa: 'خرید در حجم بالا، و خرید یکسان در دفعات بعد',
    },
    lede: {
      en: 'Wholesale is about supply that behaves predictably — the same product, to the same specification, order after order. We supply businesses, distributors and resellers on that basis.',
      fa: 'بازرگانی عمده درباره تأمینی است که قابل پیش‌بینی باشد: همان محصول، با همان مشخصات، سفارش پس از سفارش. ما بر این اساس به کسب‌وکارها، توزیع‌کنندگان و واسطه‌ها عرضه می‌کنیم.',
    },
    facts: ['Volume supply', 'Repeatable specification', 'Order terms'],
  },

  description: {
    en: 'The commercial weight of a wholesale relationship sits in what happens after the first order. Anyone can fill a single purchase; the question is whether the tenth order arrives as the same item, in the same condition, against the same paperwork — because that is what lets a business plan stock, pricing and shelf space around you. This service is built around that question. We supply to volume, we hold the specification steady between orders, and we treat the terms we agree on the first order as the ones that apply afterwards.',
    fa: 'وزن تجاری یک رابطه عمده‌فروشی در آنچه پس از سفارش نخست رخ می‌دهد نهفته است. هر کسی می‌تواند یک خرید را تأمین کند؛ پرسش این است که آیا سفارش دهم هم همان کالا، با همان وضعیت و همان اسناد می‌رسد — چون همین است که به یک کسب‌وکار اجازه می‌دهد موجودی، قیمت‌گذاری و فضای قفسه را بر پایه شما برنامه‌ریزی کند. این خدمت حول همین پرسش ساخته شده است. در حجم عرضه می‌کنیم، مشخصات را میان سفارش‌ها ثابت نگه می‌داریم و شرایط توافق‌شده در سفارش نخست را همان شرایط سفارش‌های بعدی می‌دانیم.',
  },
  descriptionLabel: { en: 'About this service', fa: 'درباره این خدمت' },

  audience: {
    eyebrow: { en: 'Who this suits', fa: 'مخاطب این خدمت' },
    title: { en: 'Organisations buying on someone else’s behalf', fa: 'سازمان‌هایی که برای دیگران خرید می‌کنند' },
    lede: {
      en: 'The common factor is that these buyers sell the goods on. Their reputation sits with every unit they pass to a customer.',
      fa: 'وجه مشترک این خریداران آن است که کالا را به دیگران می‌فروشند. اعتبار آن‌ها با هر واحدی که به مشتری می‌رسانند گره خورده است.',
    },
    items: [
      {
        title: { en: 'Retailers', fa: 'خرده‌فروشان' },
        body: {
          en: 'restocking a shop or a small chain and needing the same goods to arrive each time.',
          fa: 'تکمیل موجودی یک فروشگاه یا زنجیره کوچک و نیاز به دریافت یکسان کالا در هر بار.',
        },
      },
      {
        title: { en: 'Distributors', fa: 'توزیع‌کنندگان' },
        body: {
          en: 'supplying a territory or a customer base without holding manufacturing capacity of your own.',
          fa: 'تأمین یک منطقه یا پایه مشتری، بدون ظرفیت تولید مستقل.',
        },
      },
      {
        title: { en: 'Resellers and brokers', fa: 'واسطه‌ها و دلالان' },
        body: {
          en: 'buying on to sell on, where the margin depends on volume rather than on exclusivity.',
          fa: 'خرید برای فروش مجدد، جایی که حاشیه سود به حجم بستگی دارد نه به انحصار.',
        },
      },
      {
        title: { en: 'Institutional buyers', fa: 'خریداران سازمانی' },
        body: {
          en: 'offices, workshops and facilities replacing consumables on a schedule.',
          fa: 'دفاتر، کارگاه‌ها و تأسیساتی که اقلام مصرفی را طبق برنامه جایگزین می‌کنند.',
        },
      },
    ],
  },

  useCases: {
    eyebrow: { en: 'Where it comes up', fa: 'کاربردهای رایج' },
    title: { en: 'The inquiries we receive', fa: 'درخواست‌هایی که دریافت می‌کنیم' },
    items: [
      {
        title: { en: 'A standing reorder', fa: 'سفارش تکرارشونده ثابت' },
        body: {
          en: 'the same goods at the same specification on a cycle, where the real question is whether it stays consistent.',
          fa: 'همان کالا با همان مشخصات در یک چرخه ثابت، جایی که پرسش اصلی ثبات آن است.',
        },
      },
      {
        title: { en: 'Buying below the retail level', fa: 'خرید پایین‌تر از سطح خرده‌فروشی' },
        body: {
          en: 'you need a quantity that only makes sense bought in bulk, and priced accordingly.',
          fa: 'به مقداری نیاز دارید که تنها در خرید عمده معنا پیدا می‌کند و با همان قیمت.',
        },
      },
      {
        title: { en: 'Supplying several customers at once', fa: 'تأمین هم‌زمان چند مشتری' },
        body: {
          en: 'you resell the goods, so what matters is that what you sell on is always the same item.',
          fa: 'کالا را بازمی‌فروشید، پس آنچه اهمیت دارد این است که آنچه می‌فروشید همیشه همان کالا باشد.',
        },
      },
      {
        title: { en: 'A supply gap that has to be covered quickly', fa: 'خلأ تأمین که باید سریع پر شود' },
        body: {
          en: 'an existing supplier has let you down and you need cover without re-planning your stock.',
          fa: 'تأمین‌کننده فعلی کوتاهی کرده و به پوشش نیاز دارید، بدون آنکه موجودی را دوباره برنامه‌ریزی کنید.',
        },
      },
    ],
  },

  inquiry: {
    eyebrow: { en: 'How an inquiry works', fa: 'فرایند ثبت درخواست' },
    title: { en: 'What to send, and what happens next', fa: 'چه بفرستید و پس از آن چه می‌شود' },
    lede: {
      en: 'A wholesale inquiry needs to be specific about the goods and repeatable enough to become an order schedule.',
      fa: 'یک درخواست عمده باید درباره کالا مشخص باشد و آن‌قدر تکرارپذیر که بتواند به برنامه سفارش تبدیل شود.',
    },
    include: [
      {
        title: { en: 'The exact item', fa: 'کالای دقیق' },
        body: {
          en: 'a product reference where you have one, or a description specific enough to identify it without guessing.',
          fa: 'کد کالا در صورتی که دارید، یا توصیفی به‌اندازه کافی دقیق که بدون حدس زدن قابل شناسایی باشد.',
        },
      },
      {
        title: { en: 'The volume per order', fa: 'حجم هر سفارش' },
        body: {
          en: 'the quantity per order and how often you intend to order. Both matter, not just the total.',
          fa: 'مقدار در هر سفارش و تناوبی که قصد سفارش دارید. هر دو مهم‌اند، نه فقط مجموع.',
        },
      },
      {
        title: { en: 'How it is packaged', fa: 'نحوه بسته‌بندی' },
        body: {
          en: 'the packaging unit — inner pack, carton, pallet — because that is how the goods reach your shelf.',
          fa: 'واحد بسته‌بندی — بسته داخلی، کارتن، پالت — چون کالا به هین شکل به قفسه شما می‌رسد.',
        },
      },
      {
        title: { en: 'Where it has to be delivered', fa: 'محل تحویل' },
        body: {
          en: 'the delivery point, and any receiving constraints that would affect a collection.',
          fa: 'نقطه تحویل و هر محدودیتی در پذیرش که بر تحویل اثر بگذارد.',
        },
      },
    ],
    next: [
      {
        title: { en: 'We confirm specification and availability', fa: 'تأیید مشخصات و موجودی' },
        body: {
          en: 'against the item you named, and say plainly what we can and cannot supply.',
          fa: 'بر اساس کالایی که اعلام کردید، و به‌روشنی می‌گوییم چه چیزی را می‌توانیم تأمین کنیم و چه چیزی را نه.',
        },
      },
      {
        title: { en: 'We put commercial terms in writing', fa: 'ارائه شرایط تجاری به‌صورت مکتوب' },
        body: {
          en: 'so that both sides are working from the same numbers rather than from an understanding.',
          fa: 'تا هر دو طرف از یک اعداد مشترک کار کنند، نه از یک برداشت.',
        },
      },
      {
        title: { en: 'We hold the line between repeat orders', fa: 'ثبات مشخصات میان سفارش‌های تکراری' },
        body: {
          en: 'which is the point of a wholesale relationship and what we are judged on.',
          fa: 'که هدف یک رابطه عمده‌فروشی است و ما بر همین اساس سنجیده می‌شویم.',
        },
      },
    ],
  },

  detailLabel: { en: 'Commercial terms', fa: 'شرایط تجاری' },
  detailTitle: { en: 'What we settle before an order is placed', fa: 'آنچه پیش از ثبت سفارش تعیین می‌کنیم' },
  detailLede: {
    en: 'These are the things a wholesale buyer needs settled up front rather than discovered mid-order. They are set out for your inquiry when it is reviewed.',
    fa: 'این‌ها همان چیزهایی است که خریدار عمده باید از ابتدا تعیین‌شده باشد، نه اینکه در میانه سفارش کشف شود. این موارد در جریان بررسی درخواست شما مشخص می‌شود.',
  },
  detail: {
    kind: 'capabilities',
    items: [
      {
        meta: { en: 'Volume', fa: 'حجم' },
        title: { en: 'Quantities at the level you actually order', fa: 'مقادیر در سطحی که واقعاً سفارش می‌دهید' },
        body: {
          en: 'supplied in the packaging unit your operation works in, and assessed against the volume of your order rather than a fixed figure.',
          fa: 'عرضه در واحد بسته‌بندی که عملیات شما بر پایه آن کار می‌کند، و ارزیابی بر اساس حجم سفارش شما نه یک عدد ثابت.',
        },
      },
      {
        meta: { en: 'Specification', fa: 'مشخصات' },
        title: { en: 'One specification, held across repeat orders', fa: 'یک مشخصات، ثابت در تمام سفارش‌های تکراری' },
        body: {
          en: 'the item you approve is the item you receive, so pricing, labelling and packaging can be planned around.',
          fa: 'کالایی که تأیید می‌کنید همان کالایی است که دریافت می‌کنید، تا بتوانید قیمت‌گذاری، برچسب‌گذاری و بسته‌بندی را بر پایه آن برنامه‌ریزی کنید.',
        },
      },
      {
        meta: { en: 'Terms', fa: 'شرایط' },
        title: { en: 'Terms that apply to more than the first order', fa: 'شرایطی که فراتر از سفارش نخست اعمال می‌شود' },
        body: {
          en: 'payment, order and delivery terms agreed once and carried forward, rather than renegotiated with every reorder.',
          fa: 'شرایط پرداخت، سفارش و تحویل که یک بار توافق و در ادامه ادامه می‌یابد، نه اینکه در هر سفارش دوباره مذاکره شود.',
        },
      },
    ],
    detailedLabel: {
      en: 'Values we establish with you',
      fa: 'مقادیری که با شما تعیین می‌کنیم',
    },
    detailedList: [
      {
        en: 'Minimum order quantity for the item',
        fa: 'حداقل مقدار سفارش این کالا',
      },
      {
        en: 'Unit pricing and how it is held',
        fa: 'قیمت واحد و نحوه تثبیت آن',
      },
      {
        en: 'Payment terms for repeat orders',
        fa: 'شرایط پرداخت سفارش‌های تکراری',
      },
      {
        en: 'Order cut-off and expected delivery',
        fa: 'مهلت ثبت سفارش و تحویل مورد انتظار',
      },
    ],
  },

  primary: {
    label: { en: 'Request a supply quote', fa: 'درخواست قیمت تأمین' },
    href: '/contact',
  },
  secondary: {
    label: { en: 'Import & export', fa: 'واردات و صادرات' },
    href: '/services/import-export',
  },
  leadRelated: 'import-export',

  cta: {
    eyebrow: { en: 'Wholesale', fa: 'بازرگانی عمده' },
    title: { en: 'Tell us what you buy and how often', fa: 'بگویید چه چیزی و چند بار خرید می‌کنید' },
    description: {
      en: 'Item, quantity per order and packaging unit. That is enough for us to come back with terms you can actually plan against.',
      fa: 'کالا، مقدار در هر سفارش و واحد بسته‌بندی. همین برای پاسخی که بتوانید بر اساس آن برنامه‌ریزی کنید کافی است.',
    },
    actionLabel: { en: 'Request a supply quote', fa: 'درخواست قیمت تأمین' },
    actionHref: '/contact',
    secondaryActionLabel: { en: 'See all services', fa: 'مشاهده همه خدمات' },
  },
}

/* ==========================================================================
   3. Retail
   ========================================================================== */

const RETAIL: ServicePageCopy = {
  breadcrumb: { en: 'Individual purchasing', fa: 'خرید فردی' },

  hero: {
    eyebrow: { en: 'Retail', fa: 'خرده‌فروشی' },
    title: {
      en: 'Buying as an individual, not as an account.',
      fa: 'خرید به‌عنوان یک فرد، نه به‌عنوان یک حساب کاربری',
    },
    lede: {
      en: 'Retail here means purchasing individually, as a private customer rather than a business. Everything on this page is arranged around a conversation: what you are looking for, whether we have it, and what it is.',
      fa: 'خرده‌فروشی در اینجا یعنی خرید فردی، به‌عنوان مشتری خصوصی و نه کسب‌وکار. همه‌چیز در این صفحه حول یک گفتگو تنظیم شده است: چه می‌خواهید، آیا موجود است و چیست.',
    },
    facts: ['No online checkout', 'Specification in writing', 'Support after the sale'],
  },

  description: {
    en: 'This page is deliberately short on promises. There is no basket on this website and no online checkout: every purchase begins as a message and is completed through a conversation with us. What that buys you is a straight answer about the product before you commit to it — what it is, what it is specified as, and what the alternatives are if it does not suit. If you are buying a small number of items for yourself, this is the right page. If you are buying by the pallet, wholesale or procurement will serve you better.',
    fa: 'این صفحه عمداً کم‌قول است. در این وب‌سایت سبد خرید و پرداخت آنلاین وجود ندارد: هر خرید با یک پیام آغاز می‌شود و در گفتگویی با ما کامل می‌گردد. آنچه در ازای این به دست می‌آورید، پاسخ روشن درباره محصول پیش از تعهد به خرید است: چیست، با چه مشخصاتی عرضه می‌شود و اگر مناسب شما نبود چه گزینه‌های دیگری هست. اگر تعداد کمی از کالا برای خودتان می‌خرید، همین صفحه مناسب شماست. اگر در مقیاس پالت خرید می‌کنید، بازرگانی عمده یا تأمین کالا مناسب‌تر است.',
  },
  descriptionLabel: { en: 'About this service', fa: 'درباره این خدمت' },

  audience: {
    eyebrow: { en: 'Who this suits', fa: 'مخاطب این خدمت' },
    title: { en: 'People buying for themselves', fa: 'کسانی که برای خودشان می‌خرند' },
    lede: {
      en: 'If you are reading this as a private buyer rather than on behalf of a company, this is the section that describes you.',
      fa: 'اگر این صفحه را به‌عنوان خریدار خصوصی می‌خوانید و نه از جانب یک شرکت، این بخش شما را توصیف می‌کند.',
    },
    items: [
      {
        title: { en: 'For your own use', fa: 'برای مصرف شخصی' },
        body: {
          en: 'household, workshop or personal equipment, bought in ones and twos rather than by the case.',
          fa: 'تجهیزات خانگی، کارگاهی یا شخصی، خرید در حد یکی دو عدد و نه در حد کارتن.',
        },
      },
      {
        title: {
          en: 'For a small, specific job',
          fa: 'برای یک کار مشخص و کوچک',
        },
        body: {
          en: 'a single project where you know exactly what you need and only need that.',
          fa: 'یک پروژه که دقیقاً می‌دانید چه لازم دارید و فقط همان را لازم دارید.',
        },
      },
      {
        title: { en: 'Replacing a part', fa: 'جایگزینی یک قطعه' },
        body: {
          en: 'a component for equipment you already own, where matching matters more than choice.',
          fa: 'قطعه‌ای برای دستگاهی که از قبل دارید، جایی که تطبیق مهم‌تر از تنوع است.',
        },
      },
      {
        title: {
          en: 'Buying again, one at a time',
          fa: 'خرید دوباره، یکی‌یکی',
        },
        body: {
          en: 'you know the product already and are topping up rather than researching.',
          fa: 'محصول را از قبل می‌شناسید و در حال تکمیل خرید هستید، نه در حال تحقیق.',
        },
      },
    ],
  },

  useCases: {
    eyebrow: { en: 'What we get asked', fa: 'پرسش‌هایی که دریافت می‌کنیم' },
    title: { en: 'The questions behind the inquiry', fa: 'پرسش‌های پشت هر درخواست' },
    items: [
      {
        title: { en: '“Is this the right product for what I have?”', fa: 'آیا این محصول برای آنچه دارم مناسب است؟' },
        body: {
          en: 'You have the equipment or the task, and want to know what fits it before buying anything.',
          fa: 'دستگاه یا کار مشخصی دارید و می‌خواهید پیش از خرید بدانید چه چیزی به آن می‌خورد.',
        },
      },
      {
        title: { en: '“What exactly does this consist of?”', fa: 'این دقیقاً شامل چه چیزی است؟' },
        body: {
          en: 'You want the contents described plainly, so you can tell whether it matches what you pictured.',
          fa: 'می‌خواهید محتویات کالا به‌روشنی شرح داده شود تا بفهمید با تصور شما هم‌خوان است یا نه.',
        },
      },
      {
        title: {
          en: '“Can I buy one, rather than a case?”',
          fa: 'آیا می‌توانم یک عدد بخرم، نه یک کارتن؟',
        },
        body: {
          en: 'The quantity you want is smaller than the packaging unit, and you want to know what is possible.',
          fa: 'مقدار مورد نیاز شما از واحد بسته‌بندی کمتر است و می‌خواهید بدانید چه امکانی وجود دارد.',
        },
      },
      {
        title: { en: '“Is there something better suited?”', fa: 'آیا گزینه مناسب‌تری هم هست؟' },
        body: {
          en: 'You have an impression rather than a specification, and would rather be corrected than confirmed.',
          fa: 'تصوری به‌جای مشخصات فنی دارید و ترجیح می‌دهید اصلاح شوید تا تأیید.',
        },
      },
    ],
  },

  inquiry: {
    eyebrow: { en: 'How an inquiry works', fa: 'فرایند ثبت درخواست' },
    title: { en: 'There is no checkout — it starts with a message', fa: 'پرداخت آنلاینی وجود ندارد — با یک پیام آغاز می‌شود' },
    lede: {
      en: 'Buying here is a conversation rather than a transaction. Nothing on this website takes payment, and the form on the contact page does not transmit anything; it is a front-end demonstration. What follows is the intended path once contact details are in place.',
      fa: 'خرید در اینجا یک گفتگوست نه یک تراکنش. هیچ‌چیز در این وب‌سایت پرداختی انجام نمی‌دهد و فرم صفحه تماس نیز چیزی ارسال نمی‌کند؛ این یک نسخه نمایشی است. آنچه در ادامه می‌آید مسیر مورد نظر پس از فراهم‌شدن اطلاعات تماس است.',
    },
    include: [
      {
        title: { en: 'What you are looking for', fa: 'آنچه به دنبال آن هستید' },
        body: {
          en: 'the product itself, or a description of the job you need it for if you do not know the product.',
          fa: 'خود محصول، یا شرح کاری که به آن نیاز دارید اگر محصول را نمی‌شناسید.',
        },
      },
      {
        title: { en: 'The device, or the situation', fa: 'دستگاه یا موقعیت' },
        body: {
          en: 'what it has to fit or work with. This is usually what decides the answer.',
          fa: 'آنچه باید با آن جور شود یا کار کند. معمولاً همین تعیین‌کننده پاسخ است.',
        },
      },
      {
        title: { en: 'How many you need', fa: 'تعداد مورد نیاز' },
        body: {
          en: 'an approximate number is fine, and tells us whether a purchase of that size is worth discussing.',
          fa: 'یک عدد تقریبی کافی است و به ما می‌گوید آیا خریدی در آن ابعاد ارزش بررسی دارد.',
        },
      },
      {
        title: { en: 'Anything that would rule it out', fa: 'هر چیزی که آن را از پیش رد می‌کند' },
        body: {
          en: 'a budget, a size limit, or anything else that would rule the product out and save us both time.',
          fa: 'بودجه، محدودیت اندازه یا هر چیز دیگری که محصول را از همان ابتدا کنار می‌گذارد و وقت هر دو را نجات می‌دهد.',
        },
      },
    ],
    next: [
      {
        title: { en: 'We answer the question you asked', fa: 'به پرسش شما پاسخ می‌دهیم' },
        body: {
          en: 'and tell you plainly if the answer is that we cannot supply it.',
          fa: 'و اگر پاسخ این است که نمی‌توانیم تأمین کنیم، به‌روشنی می‌گوییم.',
        },
      },
      {
        title: { en: 'You get the specification in writing', fa: 'مشخصات را به‌صورت مکتوب دریافت می‌کنید' },
        body: {
          en: 'before any commitment, so you know what you are agreeing to buy.',
          fa: 'پیش از هر تعهدی، تا بدانید به چه چیزی متعهد می‌شوید.',
        },
      },
      {
        title: { en: 'Purchase and after-sales are arranged directly', fa: 'خرید و پشتیبانی پس از فروش مستقیم انجام می‌شود' },
        body: {
          en: 'with us. This page is a place to start that conversation, not a shop.',
          fa: 'مستقیماً با ما. این صفحه نقطه آغاز گفتگوست، نه یک فروشگاه.',
        },
      },
    ],
  },

  detailLabel: { en: 'Buying individually', fa: 'خرید فردی' },
  detailTitle: { en: 'What to expect, stated plainly', fa: 'آنچه انتظار داشته باشید، به‌روشنی' },
  detailLede: {
    en: 'Four things that are true of every retail purchase here, so nobody has to guess at them.',
    fa: 'چهار نکته که درباره هر خرید خرده‌فروشی در اینجا صادق است، تا کسی ناچار به حدس زدن نباشد.',
  },
  detail: {
    kind: 'capabilities',
    items: [
      {
        meta: { en: 'How it happens', fa: 'نحوه انجام' },
        title: { en: 'By conversation, not through a basket', fa: 'با گفتگو، نه از طریق سبد خرید' },
        body: {
          en: 'you write to us, we confirm the product and its specification, and the purchase is completed with us directly. There is no online checkout on this website.',
          fa: 'به ما می‌نویسید، ما محصول و مشخصات آن را تأیید می‌کنیم و خرید مستقیماً با ما نهایی می‌شود. در این وب‌سایت پرداخت آنلاینی وجود ندارد.',
        },
      },
      {
        meta: { en: 'Who it is for', fa: 'مخاطب' },
        title: { en: 'Individuals, at small quantities', fa: 'اشخاص، در مقادیر کم' },
        body: {
          en: 'this page serves private buyers purchasing for themselves. Larger orders belong with the wholesale or procurement services.',
          fa: 'این صفحه برای خریداران خصوصی است که برای خودشان می‌خرند. سفارش‌های بزرگ‌تر به بازرگانی عمده یا تأمین کالا تعلق دارد.',
        },
      },
      {
        meta: { en: 'Transparency', fa: 'شفافیت' },
        title: { en: 'Specification before purchase', fa: 'مشخصات پیش از خرید' },
        body: {
          en: 'the product details are put in writing before you commit, including where they leave something open.',
          fa: 'جزئیات محصول پیش از تعهد شما به‌صورت مکتوب ارائه می‌شود، از جمله آنچه هنوز روشن نیست.',
        },
      },
      {
        meta: { en: 'Afterwards', fa: 'پس از خرید' },
        title: { en: 'Support that continues past the sale', fa: 'پشتیبانی که پس از فروش ادامه دارد' },
        body: {
          en: 'a question about what you bought is a normal reason to write to us, not an exception.',
          fa: 'پرسش درباره آنچه خریده‌اید دلیل معمولی برای نوشتن به ماست، نه یک استثنا.',
        },
      },
    ],
  },

  primary: {
    label: { en: 'Ask about a product', fa: 'پرسش درباره یک محصول' },
    href: '/contact',
  },
  secondary: {
    label: { en: 'Batteries', fa: 'باتری' },
    href: '/services/batteries',
  },
  leadRelated: 'batteries',

  cta: {
    eyebrow: { en: 'Retail', fa: 'خرده‌فروشی' },
    title: { en: 'Tell us what you are trying to buy', fa: 'بگویید می‌خواهید چه چیزی بخرید' },
    description: {
      en: 'What it is for, and what it has to fit. There is no checkout here — the first step is a message, and we will take it from there.',
      fa: 'برای چه چیزی است و باید با چه چیزی جور شود. اینجا پرداخت آنلاینی وجود ندارد — نخستین گام یک پیام است و ما ادامه‌اش را پیش می‌بریم.',
    },
    actionLabel: { en: 'Ask about a product', fa: 'پرسش درباره یک محصول' },
    actionHref: '/contact',
    secondaryActionLabel: { en: 'See all services', fa: 'مشاهده همه خدمات' },
  },
}

/* ==========================================================================
   4. Batteries
   ========================================================================== */

const BATTERIES: ServicePageCopy = {
  breadcrumb: { en: 'Battery products', fa: 'محصولات باتری' },

  hero: {
    eyebrow: { en: 'Batteries', fa: 'باتری' },
    title: {
      en: 'The right cell, chosen on the specification rather than the label.',
      fa: 'سلول مناسب، انتخاب‌شده بر پایه مشخصات، نه برچسب',
    },
    lede: {
      en: 'Battery products and energy storage, supplied through Vortex Battery — the holding’s dedicated battery business. Most of what arrives here is a technical question about a specification, so this page is written to give you the vocabulary to ask it properly.',
      fa: 'محصولات باتری و ذخیره‌سازی انرژی، از طریق ورتکس باتری — کسب‌وکار تخصصی باتری هلدینگ. بیشتر آنچه به اینجا می‌رسد یک پرسش فنی درباره مشخصات است، بنابراین این صفحه طوری نوشته شده که واژگان لازم برای طرح درست آن پرسش را به شما بدهد.',
    },
    facts: ['Cells and packs', 'Storage systems', 'Technical inquiries'],
  },

  description: {
    en: 'Two rechargeable chemistries account for most of what we are asked about: lithium-ion, including the cylindrical cells and battery packs built from them, and lead-acid, still common where cost and availability matter more than weight. Alongside those sit storage systems — assembled units that hold charge for backup or for operational continuity — which are a different question again from a single cell. This page does not list products, because the correct answer depends on the specification you are working to. Tell us the requirements and we will say what fits.',
    fa: 'دو شیمیایی شارژپذیر بیشترِ آنچه از ما پرسیده می‌شود را تشکیل می‌دهند: یون لیتیوم، شامل سلول‌های استوانه‌ای و پک‌هایی که از آن‌ها ساخته می‌شوند؛ و سرب-اسید، که هنوز جایی که هزینه و در دسترس‌بودن مهم‌تر از وزن است رایج است. در کنار این‌ها راهکارهای ذخیره‌سازی نیز قرار دارند — واحدهای اسمبل‌شده‌ای که برای پشتیبان یا تداوم عملیات شارژ نگه می‌دارند — که خود پرسشی متفاوت از یک سلول منفرد است. این صفحه فهرست محصولات را ارائه نمی‌کند، چون پاسخ درست به مشخصاتی بستگی دارد که شما بر اساس آن کار می‌کنید. نیازتان را بگویید و می‌گوییم چه چیزی مناسب است.',
  },
  descriptionLabel: { en: 'About this category', fa: 'درباره این دسته محصول' },

  audience: {
    eyebrow: { en: 'Who this suits', fa: 'مخاطب این خدمت' },
    title: { en: 'People with a specification to meet', fa: 'کسانی که مشخصاتی برای رعایت دارند' },
    lede: {
      en: 'Battery inquiries are rarely general. These are the kinds of person who arrive with a requirement in hand.',
      fa: 'پرسش‌های باتری به‌ندرت کلی هستند. این‌ها همان کسانی هستند که با یک نیاز مشخص مراجعه می‌کنند.',
    },
    items: [
      {
        title: { en: 'Product engineers', fa: 'مهندسان محصول' },
        body: {
          en: 'selecting cells for a device where the enclosure, the load and the safety margin are already fixed.',
          fa: 'انتخاب سلول برای دستگاهی که قاب، بار و حاشیه ایمنی آن از پیش تعیین شده است.',
        },
      },
      {
        title: { en: 'Manufacturers', fa: 'تولیدکنندگان' },
        body: {
          en: 'sourcing cells or packs as a component in something you build and sell yourself.',
          fa: 'تأمین سلول یا پک به‌عنوان قطعه‌ای در محصولی که خودتان می‌سازید و می‌فروشید.',
        },
      },
      {
        title: { en: 'Facilities and operations teams', fa: 'تیم‌های تأسیسات و بهره‌برداری' },
        body: {
          en: 'looking at storage to carry operations through an outage, or to remove a dependency on the grid.',
          fa: 'بررسی ذخیره‌سازی برای عبور از قطعی یا رفع وابستگی به شبکه برق.',
        },
      },
      {
        title: { en: 'Technicians and installers', fa: 'تکنسین‌ها و نصب‌کنندگان' },
        body: {
          en: 'matching a replacement to equipment already in service, where compatibility is everything.',
          fa: 'تطبیق یک قطعه جایگزین با تجهیزاتی که هم‌اکنون در سرویس است، جایی که سازگاری همه‌چیز است.',
        },
      },
      {
        title: { en: 'Individual buyers', fa: 'خریداران فردی' },
        body: {
          en: 'purchasing a cell or a pack for themselves, through the retail side of the holding.',
          fa: 'خرید یک سلول یا پک برای خودشان، از طریق بخش خرده‌فروشی هلدینگ.',
        },
      },
    ],
  },

  useCases: {
    eyebrow: { en: 'Where it comes up', fa: 'کاربردهای رایج' },
    title: { en: 'The technical questions we get', fa: 'پرسش‌های فنی که دریافت می‌کنیم' },
    items: [
      {
        title: { en: '“Which chemistry fits this duty?”', fa: 'کدام شیمیایی با این کاربرد می‌خواند؟' },
        body: {
          en: 'You know the load and the environment, and want to know whether lithium-ion or lead-acid is the right answer.',
          fa: 'بار و محیط را می‌دانید و می‌خواهید بدانید یون لیتیوم بهتر است یا سرب-اسید.',
        },
      },
      {
        title: { en: '“Will this cell fit the space?”', fa: 'آیا این سلول در آن فضا جا می‌شود؟' },
        body: {
          en: 'You have a physical envelope to fill, and the answer depends on dimensions as much as capacity.',
          fa: 'فضای فیزیکی مشخصی برای پر کردن دارید و پاسخ به اندازه به‌اندازه ظرفیت بستگی دارد.',
        },
      },
      {
        title: {
          en: '“How many do I need, and how do they connect?”',
          fa: 'چند عدد لازم دارم و چگونه به هم متصل می‌شوند؟',
        },
        body: {
          en: 'A capacity question that turns into an arrangement question once the voltage is fixed.',
          fa: 'پرسش ظرفیت که با تعیین ولتاژ به پرسش چیدمان تبدیل می‌شود.',
        },
      },
      {
        title: {
          en: '“What do I need for backup, not for a product?”',
          fa: 'برای پشتیبانی چه لازم دارم، نه برای یک محصول؟',
        },
        body: {
          en: 'Storage is chosen around how long the load has to run and what it is running, not on a single capacity number.',
          fa: 'ذخیره‌سازی بر پایه مدت زمانی که بار باید کار کند و آنچه تغذیه می‌کند انتخاب می‌شود، نه بر پایه یک عدد ظرفیت.',
        },
      },
    ],
  },

  inquiry: {
    eyebrow: { en: 'How an inquiry works', fa: 'فرایند ثبت درخواست' },
    title: { en: 'What to send, and what happens next', fa: 'چه بفرستید و پس از آن چه می‌شود' },
    lede: {
      en: 'A battery inquiry is easier to answer the more of the specification you can state. None of the values below is required — send what you have and ask what you do not.',
      fa: 'پرسش باتری هرچه مشخصات بیشتری از آن بدهید، پاسخ‌دادن به آن آسان‌تر است. هیچ‌یک از مقادیر زیر الزامی نیست — آنچه را دارید بفرستید و درباره بقیه بپرسید.',
    },
    include: [
      {
        title: { en: 'The form factor', fa: 'فرم فاکتور' },
        body: {
          en: 'cylindrical or prismatic, and the diameter and length you have to work within.',
          fa: 'استوانه‌ای یا صفحه‌ای (پریسماتیک)، و قطر و طولی که در آن کار می‌کنید.',
        },
      },
      {
        title: { en: 'Voltage and capacity', fa: 'ولتاژ و ظرفیت' },
        body: {
          en: 'the nominal voltage and the capacity you need — and whether they are a target or already fixed.',
          fa: 'ولتاژ اسمی و ظرفیت مورد نیاز — و اینکه هدف هستند یا از پیا تعیین شده‌اند.',
        },
      },
      {
        title: { en: 'The load', fa: 'بار' },
        body: {
          en: 'what it will power, how hard it runs, and for how long it has to keep going.',
          fa: 'آنچه را تغذیه می‌کند، با چه شدتی کار می‌کند و چقدر باید ادامه یابد.',
        },
      },
      {
        title: {
          en: 'The conditions, if you know them',
          fa: 'شرایط، اگر می‌دانید',
        },
        body: {
          en: 'temperature range and orientation matter, and are often what rules a candidate in or out.',
          fa: 'محدوده دما و جهت‌گیری مهم‌اند و اغلب همان چیزی هستند که یک گزینه را کنار می‌گذارد یا تأیید می‌کند.',
        },
      },
    ],
    next: [
      {
        title: { en: 'We read it as an engineering question', fa: 'آن را به‌عنوان یک پرسش مهندسی می‌خوانیم' },
        body: {
          en: 'and answer with the specification, not with a product name.',
          fa: 'و با مشخصات پاسخ می‌دهیم، نه با نام یک محصول.',
        },
      },
      {
        title: { en: 'We suggest alternatives and their trade-offs', fa: 'گزینه‌های جایگزین و مصالحه‌هایشان را مطرح می‌کنیم' },
        body: {
          en: 'including where a different format would serve the application better than the obvious one.',
          fa: 'از جمله جایی که فرمتی متفاوت کاربرد را بهتر از گزینه آشکار پاسخ می‌دهد.',
        },
      },
      {
        title: {
          en: 'Technical detail is handled directly, not relayed',
          fa: 'جزئیات فنی مستقیم پیگیری می‌شود، نه از طریق واسطه',
        },
        body: {
          en: '— questions here are answered by the people who handle the products.',
          fa: '— پرسش‌ها اینجا را همان کسانی پاسخ می‌دهند که با محصولات سروکار دارند.',
        },
      },
    ],
  },

  detailLabel: { en: 'The category', fa: 'این دسته محصول' },
  detailTitle: { en: 'What a battery inquiry needs to pin down', fa: 'آنچه یک پرسش باتری باید مشخص کند' },
  detailLede: {
    en: 'These are the parameters that decide whether a battery is suitable. Their values are established with you when your inquiry is reviewed.',
    fa: 'این‌ها پارامترهایی هستند که تعیین می‌کنند یک باتری مناسب هست یا نه. مقادیرشان در جریان بررسی درخواست شما با شما تعیین می‌شود.',
  },
  detail: {
    kind: 'questions',
    items: [
      {
        meta: { en: '01', fa: '۰۱' },
        title: { en: 'The form factor', fa: 'فرم فاکتور' },
        body: {
          en: 'Cylindrical cells and prismatic cells pack into different spaces and are assembled differently. What does the enclosure give you to work with?',
          fa: 'سلول‌های استوانه‌ای و صفحه‌ای در فضاهای متفاوتی جا می‌شوند و به شیوه متفاوتی اسمبل می‌شوند. قاب شما چه فضایی در اختیار می‌گذارد؟',
        },
      },
      {
        meta: { en: '02', fa: '۰۲' },
        title: { en: 'The load', fa: 'بار' },
        body: {
          en: 'What the battery powers, how it is drawn and for how long. Capacity alone does not describe an application.',
          fa: 'باتری چه چیزی را تغذیه می‌کند، چگونه تخلیه می‌شود و تا چه مدت. ظرفیت به‌تنهایی یک کاربرد را توصیف نمی‌کند.',
        },
      },
      {
        meta: { en: '03', fa: '۰۳' },
        title: { en: 'Chemistry', fa: 'شیمیایی' },
        body: {
          en: 'Lithium-ion and lead-acid trade against each other on weight, cost, cycle life and thermal behaviour. Which of those matters most here?',
          fa: 'یون لیتیوم و سرب-اسید در وزن، هزینه، عمر چرخه و رفتار حرارتی با هم رقابت می‌کنند. کدام‌یک در اینجا مهم‌تر است؟',
        },
      },
      {
        meta: { en: '04', fa: '۰۴' },
        title: { en: 'Management and protection', fa: 'مدیریت و حفاظت' },
        body: {
          en: 'A multi-cell pack needs a protection and management arrangement, and that arrangement is part of the specification rather than an extra.',
          fa: 'یک پک چندسلولی به یک آرایش حفاظت و مدیریت نیاز دارد، و این آرایش بخشی از مشخصات است نه یک افزوده.',
        },
      },
      {
        meta: { en: '05', fa: '۰۵' },
        title: { en: 'The environment it works in', fa: 'محیطی که در آن کار می‌کند' },
        body: {
          en: 'Temperature range, orientation and enclosure determine how a cell should be used and how it is installed.',
          fa: 'محدوده دما، جهت‌گیری و نوع قاب تعیین می‌کنند که یک سلول چگونه باید استفاده و نصب شود.',
        },
      },
      {
        meta: { en: '06', fa: '۰۶' },
        title: { en: 'Storage rather than a cell', fa: 'ذخیره‌سازی به‌جای یک سلول' },
        body: {
          en: 'An assembled storage system is specified around how long it must carry a load, and what happens to that load when it does.',
          fa: 'یک سیستم ذخیره‌سازی اسمبل‌شده بر اساس مدتی که باید باری را حمل کند و آنچه در آن فاصله برای آن بار اتفاق می‌افتد مشخص می‌شود.',
        },
      },
    ],
    detailedLabel: {
      en: 'Values we establish with you',
      fa: 'مقادیری که با شما تعیین می‌کنیم',
    },
    detailedList: [
      { en: 'Cell format and dimensions', fa: 'فرمت و ابعاد سلول' },
      { en: 'Nominal voltage and capacity', fa: 'ولتاژ و ظرفیت اسمی' },
      { en: 'Charge and discharge rate', fa: 'نرخ شارژ و دیشارژ' },
      { en: 'Operating temperature range', fa: 'محدوده دمای کاری' },
    ],
  },

  primary: {
    label: { en: 'Ask a technical question', fa: 'طرح پرسش فنی' },
    href: '/contact',
  },
  secondary: {
    label: { en: 'Retail', fa: 'خرده‌فروشی' },
    href: '/services/retail',
  },
  leadRelated: 'retail',

  cta: {
    eyebrow: { en: 'Batteries', fa: 'باتری' },
    title: { en: 'Send the specification, not the product name', fa: 'مشخصات را بفرستید، نه نام محصول' },
    description: {
      en: 'Form factor, voltage, capacity and load. That is enough for us to tell you what fits and what does not.',
      fa: 'فرم فاکتور، ولتاژ، ظرفیت و بار. همین برای گفتن اینکه چه چیزی مناسب است و چه چیزی نه کافی است.',
    },
    actionLabel: { en: 'Ask a technical question', fa: 'طرح پرسش فنی' },
    actionHref: '/contact',
    secondaryActionLabel: { en: 'See all services', fa: 'مشاهده همه خدمات' },
  },
}

/* ==========================================================================
   5. Procurement
   ========================================================================== */

const PROCUREMENT: ServicePageCopy = {
  breadcrumb: { en: 'Product specification', fa: 'تعیین مشخصات محصول' },

  hero: {
    eyebrow: { en: 'Procurement', fa: 'تأمین کالا' },
    title: {
      en: 'The requirement, written down properly, before anyone is asked for a price.',
      fa: 'نیاز، پیش از آنکه از کسی قیمت خواسته شود، درست مکتوب شود',
    },
    lede: {
      en: 'Procurement starts where most purchasing problems start: with a requirement that exists in someone’s head and has never been written down. This service is the structured way to put it on paper — what the product is, what it must do, and what would disqualify it.',
      fa: 'تأمین کالا از همان‌جا آغاز می‌شود که بیشتر مشکلات خرید آغاز می‌شود: با نیازی که در ذهن کسی وجود دارد و هرگز مکتوب نشده است. این خدمت راه ساختاریافته‌ای برای مکتوب کردن آن است: محصول چیست، چه کاری باید انجام دهد، و چه چیزی آن را رد می‌کند.',
    },
    facts: ['Specification', 'Supplier qualification', 'Order follow-through'],
  },

  description: {
    en: 'Most supplier quotes are hard to compare because the requests behind them were vague. Ask three suppliers for a battery and you will get three answers, because nobody was told what the battery had to do. Writing the requirement down first is unglamorous work, and it is the part that decides whether the rest of the process is worth anything: it is what makes quotes comparable, what lets a supplier quote accurately rather than cautiously, and what tells us whether the goods arriving match what you expected. This page is a form for that requirement.',
    fa: 'بیشتر پیشنهادهای قیمت تأمین‌کنندگان به‌سختی قابل مقایسه‌اند، چون درخواست‌های پشت آن‌ها مبهم بوده است. از سه تأمین‌کننده برای یک باتری قیمت بخواهید و سه پاسخ متفاوت می‌گیرید، چون هیچ‌کس نگفته بود آن باتری باید چه کاری انجام دهد. مکتوب کردن نیاز، کاری پرسیده‌رنگ و بدون جلوه است، اما همین بخش است که تعیین می‌کند بقیه فرایند ارزشی دارد یا نه: همین است که پیشنهادها را قابل مقایسه می‌کند، به تأمین‌کننده اجازه می‌دهد دقیق و نه محتاطانه قیمت بدهد، و به ما می‌گوید کالای رسیده با آنچه انتظار داشتید هم‌خوان است یا نه. این صفحه فرمی برای همان نیاز است.',
  },
  descriptionLabel: { en: 'About this service', fa: 'درباره این خدمت' },

  audience: {
    eyebrow: { en: 'Who this suits', fa: 'مخاطب این خدمت' },
    title: { en: 'Buyers who need quotes they can compare', fa: 'خریدارانی که به پیشنهادهای قابل مقایسه نیاز دارند' },
    lede: {
      en: 'The common thread is a purchase where being wrong is expensive — where the specification has to be right before an order goes in.',
      fa: 'وجه مشترک، خریدی است که اشتباه در آن پرهزینه است — جایی که مشخصات باید پیش از ثبت سفارش درست باشد.',
    },
    items: [
      {
        title: { en: 'Operations and procurement teams', fa: 'تیم‌های عملیات و تأمین' },
        body: {
          en: 'running repeat purchasing where suppliers are compared against a written standard.',
          fa: 'اداره خریدهای تکرارشونده که تأمین‌کنندگان با آن با یک استاندارد مکتوب سنجیده می‌شوند.',
        },
      },
      {
        title: { en: 'Project teams', fa: 'تیم‌های پروژه' },
        body: {
          en: 'buying to a specification that the work depends on being correct.',
          fa: 'خرید بر پایه مشخصاتی که درست بودنشان برای انجام کار حیاتی است.',
        },
      },
      {
        title: { en: 'Engineers and technical buyers', fa: 'مهندسان و خریداران فنی' },
        body: {
          en: 'writing down a requirement precisely enough that a supplier can quote against it without guessing.',
          fa: 'نوشتن دقیق یک نیاز، به‌اندازه‌ای که تأمین‌کننده بدون حدس زدن بتواند بر اساس آن قیمت بدهد.',
        },
      },
      {
        title: { en: 'Businesses scaling a purchase', fa: 'کسب‌وکارهایی که خریدی را گسترش می‌دهند' },
        body: {
          en: 'where informal buying worked at one volume and no longer does.',
          fa: 'جایی که خرید غیررسمی در یک مقیاس کار می‌کرد و دیگر نمی‌کند.',
        },
      },
    ],
  },

  useCases: {
    eyebrow: { en: 'Where it comes up', fa: 'کاربردهای رایج' },
    title: { en: 'The inquiries we receive', fa: 'درخواست‌هایی که دریافت می‌کنیم' },
    items: [
      {
        title: { en: 'Quotes that cannot be compared', fa: 'پیشنهادهایی که قابل مقایسه نیستند' },
        body: {
          en: 'three suppliers, three answers, and no way to tell which one is actually quoting the same thing.',
          fa: 'سه تأمین‌کننده، سه پاسخ، و هیچ راهی برای فهمیدن اینکه کدام‌یک واقعاً برای یک چیز قیمت می‌دهد.',
        },
      },
      {
        title: { en: 'A requirement that lives in someone’s head', fa: 'نیازی که در ذهن کسی زندگی می‌کند' },
        body: {
          en: 'the person who knows exactly what is needed has left, or is on leave, or is unavailable to answer.',
          fa: 'کسی که دقیقاً می‌داند چه لازم است رفته، یا در مرخصی است، یا در دسترس نیست.',
        },
      },
      {
        title: { en: 'Repeat buying without a standard', fa: 'خرید تکرارشونده بدون استاندارد' },
        body: {
          en: 'the same purchase made differently each time, so quality drifts without anyone deciding it should.',
          fa: 'همان خرید هر بار متفاوت انجام می‌شود، پس کیفیت بدون آنکه کسی تصمیم بگیرد باید، جابه‌جا می‌شود.',
        },
      },
      {
        title: { en: 'Goods that arrive unlike the sample', fa: 'کالایی که برخلاف نمونه می‌رسد' },
        body: {
          en: 'it was right when approved and different when it arrived, and nobody can point to what changed.',
          fa: 'هنگام تأیید درست بود و هنگام رسیدن متفاوت، و کسی نمی‌تواند بگوید چه چیزی تغییر کرده است.',
        },
      },
    ],
  },

  inquiry: {
    eyebrow: { en: 'How an inquiry works', fa: 'فرایند ثبت درخواست' },
    title: { en: 'The specification you send, and what happens to it', fa: 'مشخصاتی که می‌فرستید و سرنوشت آن' },
    lede: {
      en: 'This is the structured version of an inquiry: the more of the requirement you can put in writing, the more useful the response.',
      fa: 'این نسخه ساختاریافته یک درخواست است: هرچه بیشتر از نیاز خود را مکتوب کنید، پاسخ ما مفیدتر خواهد بود.',
    },
    include: [
      {
        title: { en: 'What the product is for', fa: 'محصول برای چه کاری است' },
        body: {
          en: 'the application behind the purchase. It is usually the line that decides which products are even candidates.',
          fa: 'کاربردی که پشت خرید است. معمولاً همین سطر است که مشخص می‌کند اصلاً کدام محصولات کاندید هستند.',
        },
      },
      {
        title: { en: 'The specification', fa: 'مشخصات فنی' },
        body: {
          en: 'the attributes that define it, however informal — a drawing, a datasheet, a competitor’s product, a description.',
          fa: 'ویژگی‌هایی که آن را تعریف می‌کنند، هرچقدر غیررسمی: نقشه، برگه داده فنی، محصول رقیب یا یک توصیف.',
        },
      },
      {
        title: { en: 'Quantity and frequency', fa: 'مقدار و تناوب' },
        body: {
          en: 'per order and over time. A requirement that is only ever met once is a different kind of requirement.',
          fa: 'در هر سفارش و در گذر زمان. نیازی که تنها یک بار تأمین شود، نیاز از جنس دیگری است.',
        },
      },
      {
        title: { en: 'What would disqualify it', fa: 'چه چیزی آن را رد می‌کند' },
        body: {
          en: 'the disqualifiers. Stating these up front is what stops an unsuitable quote reaching your desk.',
          fa: 'شرایطی که محصول را رد می‌کند. بیان این موارد از ابتدا همان چیزی است که جلوی رسیدن پیشنهاد نامناسب به دست شما را می‌گیرد.',
        },
      },
    ],
    next: [
      {
        title: { en: 'We read the requirement back to you', fa: 'نیاز را برای شما بازخوانی می‌کنیم' },
        body: {
          en: 'as we understood it, so any gap is visible before it becomes an order.',
          fa: 'آن‌گونه که فهمیده‌ایم، تا هر خلأیی پیش از آنکه به سفارش تبدیل شود دیده شود.',
        },
      },
      {
        title: { en: 'We raise what is missing or ambiguous', fa: 'آنچه مبهم یا ناقص است را مطرح می‌کنیم' },
        body: {
          en: 'and resolve it with you, rather than assuming and quoting.',
          fa: 'و با شما رفع می‌کنیم، به‌جای آنکه فرض کنیم و قیمت بدهیم.',
        },
      },
      {
        title: { en: 'We follow the order through to receipt', fa: 'سفارش را تا دریافت پیگیری می‌کنیم' },
        body: {
          en: 'and check the goods against the specification they were bought on.',
          fa: 'و کالا را با مشخصاتی که بر اساس آن خریداری شده مقایسه می‌کنیم.',
        },
      },
    ],
  },

  detailLabel: { en: 'The specification', fa: 'مشخصات فنی' },
  detailTitle: { en: 'The six things a requirement should state', fa: 'شش چیزی که یک نیاز باید بیان کند' },
  detailLede: {
    en: 'Work through these in your inquiry and a supplier can quote against them accurately. The values are established with you when the inquiry is reviewed.',
    fa: 'این شش مورد را در درخواست خود مرور کنید تا تأمین‌کننده بتواند بر اساس آن‌ها دقیق قیمت بدهد. مقادیر در جریان بررسی درخواست شما تعیین می‌شود.',
  },
  detail: {
    kind: 'questions',
    items: [
      {
        meta: { en: '01', fa: '۰۱' },
        title: { en: 'The application', fa: 'کاربرد' },
        body: {
          en: 'What the product is for, and what happens if it fails. Everything else on this list is judged against this.',
          fa: 'محصول برای چه چیزی است و در صورت خرابی چه اتفاقی می‌افتد. هر چیز دیگری در این فهرست با همین سنجیده می‌شود.',
        },
      },
      {
        meta: { en: '02', fa: '۰۲' },
        title: { en: 'The specification', fa: 'مشخصات فنی' },
        body: {
          en: 'Dimensions, rating, material, standard or interface — whatever defines this product and nothing that does not.',
          fa: 'ابعاد، رده، متریال، استاندارد یا رابط — هر آنچه این محصول را تعریف می‌کند و نه آنچه تعریف نمی‌کند.',
        },
      },
      {
        meta: { en: '03', fa: '۰۳' },
        title: { en: 'Quantity and frequency', fa: 'مقدار و تناوب' },
        body: {
          en: 'Per order and over the period you are planning for. It decides what kind of supplier can meet the requirement.',
          fa: 'در هر سفارش و در بازه‌ای که برنامه‌ریزی می‌کنید. این تعیین می‌کند چه نوع تأمین‌کننده‌ای می‌تواند نیاز را برآورده کند.',
        },
      },
      {
        meta: { en: '04', fa: '۰۴' },
        title: { en: 'The qualifications', fa: 'الزامات' },
        body: {
          en: 'Standards, testing or documentation the product has to carry or come with.',
          fa: 'استانداردها، آزمون‌ها یا مستنداتی که محصول باید داشته باشد یا همراه آن ارائه شود.',
        },
      },
      {
        meta: { en: '05', fa: '۰۵' },
        title: { en: 'The disqualifiers', fa: 'شرایط رد کننده' },
        body: {
          en: 'What would rule a product out, stated plainly. Without these, an unsuitable quote arrives looking identical to a suitable one.',
          fa: 'آنچه یک محصول را کنار می‌گذارد، به‌روشنی. بدون این‌ها، پیشنهاد نامناسب دقیقاً شبیه پیشنهاد مناسب می‌رسد.',
        },
      },
      {
        meta: { en: '06', fa: '۰۶' },
        title: { en: 'How it will be checked', fa: 'نحوه بررسی' },
        body: {
          en: 'The test, sample or inspection the goods will be measured against on arrival.',
          fa: 'آزمون، نمونه یا بازرسی که کالا در لحظه رسیدن با آن سنجیده می‌شود.',
        },
      },
    ],
    detailedLabel: {
      en: 'Values we establish with you',
      fa: 'مقادیری که با شما تعیین می‌کنیم',
    },
    detailedList: [
      { en: 'Minimum order quantity', fa: 'حداقل مقدار سفارش' },
      { en: 'Price and payment terms', fa: 'قیمت و شرایط پرداخت' },
      { en: 'Production and delivery lead time', fa: 'زمان تولید و تحویل' },
      { en: 'Packaging and shipping unit', fa: 'بسته‌بندی و واحد حمل' },
    ],
  },

  primary: {
    label: { en: 'Submit a specification', fa: 'ارسال مشخصات فنی' },
    href: '/contact',
  },
  secondary: {
    label: { en: 'Import & export', fa: 'واردات و صادرات' },
    href: '/services/import-export',
  },
  leadRelated: 'import-export',

  cta: {
    eyebrow: { en: 'Procurement', fa: 'تأمین کالا' },
    title: { en: 'Describe the product before you price it', fa: 'محصول را پیش از قیمت‌گذاری توصیف کنید' },
    description: {
      en: 'Application, specification, quantity and disqualifiers. That is what turns a quote into a comparable one.',
      fa: 'کاربرد، مشخصات، مقدار و شرایط رد کننده. همین چیزی است که یک پیشنهاد قیمت را به پیشنهادی قابل مقایسه تبدیل می‌کند.',
    },
    actionLabel: { en: 'Submit a specification', fa: 'ارسال مشخصات فنی' },
    actionHref: '/contact',
    secondaryActionLabel: { en: 'See all services', fa: 'مشاهده همه خدمات' },
  },
}

/* ==========================================================================
   Lookup
   ========================================================================== */

export const SERVICE_PAGE_COPY: Record<string, ServicePageCopy> = {
  'import-export': IMPORT_EXPORT,
  wholesale: WHOLESALE,
  retail: RETAIL,
  batteries: BATTERIES,
  procurement: PROCUREMENT,
}

export function findServicePage(service: Service): ServicePageCopy {
  const copy = SERVICE_PAGE_COPY[service.slug]
  // Every entry in SERVICES has page copy; a missing key is a wiring bug in
  // src/app/services.ts rather than a runtime condition to handle.
  if (!copy) throw new Error(`No service page copy for slug "${service.slug}"`)
  return copy
}