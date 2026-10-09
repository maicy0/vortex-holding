import { FileText } from 'lucide-react'
import { Link } from 'react-router-dom'

import { BATTERY_CHROME } from '../../../app/battery-copy'
import {
  CATALOGUE_STATUS,
  batteryIsDemonstration,
  findBatteryCategory,
  type BatteryProduct,
} from '../../../app/battery-catalogue'
import { useLocale } from '../../../app/locale-context'
import { cn } from '../../lib/cn'
import { BatteryDemoNotice } from './BatteryDemoNotice'

/**
 * A catalogue card, for browsing rather than for buying.
 *
 * Structured as a spec sheet rather than a product photograph: the media area
 * is a hairline panel with the cell format typeset large in the technical face,
 * and the four fields a buyer scans for sit below it in a fixed order. Card
 * heights are held equal with `mt-auto` on the footer, so a row of cards reads
 * as one row rather than as a ragged edge.
 *
 * THE IMAGE IS OPTIONAL AND ITS ABSENCE IS VISIBLE. No manufacturer has been
 * appointed, so no product photograph exists to show, and inventing one —
 * or reusing a stock photo of a different company's cell — would be presenting
 * someone else's product as this one. So the placeholder states that plainly
 * instead of filling the space with a generic battery icon that reads as a
 * picture of the product.
 *
 * The demonstration tag sits on the card itself, not only on the page, for the
 * reason set out in BatteryDemoNotice: a cropped card has to carry its label.
 */
export function BatteryProductCard({
  product,
  /** Where the card's own link points — a catalogue anchor or a filter query. */
  href,
  className,
}: {
  product: BatteryProduct
  href?: string
  className?: string
}) {
  const { locale } = useLocale()
  const category = findBatteryCategory(product.category)

  const format = product.name[locale]

  /* The four fields a buyer scans a card for. Each carries its own label —
     a card reading "Chemistry … 3.6 V nominal" would be unreadable, and one
     reading "Not supplied" in four places would say nothing at all. Rows are
     filtered rather than printed as absences: on a card, a missing field should
     take less space, not more, and the full sheet with every row present is
     one click away. */
  const specs = [
    { label: BATTERY_CHROME.specLabels.chemistry[locale], value: product.chemistry?.[locale] },
    { label: BATTERY_CHROME.specLabels.voltage[locale], value: product.voltage?.[locale] },
    { label: BATTERY_CHROME.specLabels.capacity[locale], value: product.capacity?.[locale] },
    {
      label: BATTERY_CHROME.specLabels.dimensions[locale],
      value: product.dimensions?.[locale],
    },
  ].filter((row) => Boolean(row.value))

  const body = (
    <>
      {/* --- Media -------------------------------------------------------
          The product photograph when one has been supplied, and an explicit
          absence when not. The format name is set in the technical face at a
          display size in both cases, because the format is the single most
          identifying thing about a cell. */}
      <div className="relative flex aspect-4/3 items-center justify-center overflow-hidden border-b border-line bg-off-white">
        {product.image ? (
          <img
            src={product.image.webp ?? product.image.src}
            alt={product.image.alt}
            loading="lazy"
            className="size-full object-cover"
          />
        ) : (
          <>
            <span
              aria-hidden="true"
              className="battery-mono text-[0.6875rem] tracking-[0.14em] text-blue-muted uppercase"
            >
              {CATALOGUE_STATUS.noImageShort[locale]}
            </span>
            <span
              className="battery-mono text-2xl leading-none text-navy/25 lg:text-3xl"
            >
              {format}
            </span>
          </>
        )}

        {category && (
          <span className="battery-mono absolute top-0 start-0 bg-navy px-2.5 py-1.5 text-[0.625rem] font-medium tracking-[0.14em] text-white uppercase">
            {category.label[locale]}
          </span>
        )}

        {batteryIsDemonstration && (
          <BatteryDemoNotice
            variant="tag"
            tag={CATALOGUE_STATUS.demoTag[locale]}
            className="absolute top-0 end-0"
          />
        )}
      </div>

      {/* --- Body --------------------------------------------------------
          The title is held to two lines' worth of height rather than one.
          Persian cell names run longer than their English equivalents —
          "سلول پاکتی LFP، ۱۰ آمپرساعت" against "LFP Pouch Cell, 10 Ah" — so a
          single-line title fits in English and wraps in Persian, and the whole
          row of cards grows by the difference. A fixed two-line box is the same
          in both locales and still leaves room for the longest name here. */}
      <div className="flex flex-1 flex-col gap-4 p-6">
        <h3 className="title line-clamp-2 min-h-[3rem] text-[1.25rem] text-navy">
          {product.name[locale]}
        </h3>

        <dl className="flex flex-col gap-2">
          {specs.map((row) => (
            <div key={row.label} className="flex items-baseline gap-3">
              <dt className="shrink-0 text-xs text-gray">{row.label}</dt>
              <span aria-hidden="true" className="block h-px flex-1 bg-line" />
              <dd className="battery-mono shrink-0 text-xs text-navy">
                {row.value}
              </dd>
            </div>
          ))}
        </dl>

        {/* --- Applications ------------------------------------------------
            Capped to two rows. mt-auto below pins the footer, but the cards
            themselves only match height when the content above the footer does,
            and a card whose three application labels wrap to three rows is 34px
            taller than its neighbours — a ragged edge across a row of four, from
            nothing but how long the translated labels happen to be. Two rows is
            enough for the short list a card shows, and a fixed height keeps the
            grid square at every width; the full list is in the detail pattern
            one click away. */}
        {product.applications && (
          <ul className="flex h-16 flex-wrap content-start gap-1.5 overflow-hidden">
            {product.applications.slice(0, 3).map((application) => (
              <li
                key={application.en}
                className="border border-line px-2 py-1 text-[0.6875rem] text-gray"
              >
                {application[locale]}
              </li>
            ))}
          </ul>
        )}

        {/* --- Footer ---------------------------------------------------
            mt-auto holds the row of cards to one height, so the link sits on
            the baseline of every card beside it regardless of how many
            applications the entry has. */}
        <div className="mt-auto flex items-center justify-between gap-3 border-t border-line pt-4">
          {product.datasheetUrl ? (
            <a
              href={product.datasheetUrl}
              onClick={(event) => event.stopPropagation()}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-xs text-navy underline underline-offset-4 hover:text-blue-muted"
            >
              <FileText aria-hidden className="size-3.5" />
              {BATTERY_CHROME.specLabels.datasheet[locale]}
            </a>
          ) : (
            <span className="flex items-center gap-1.5 text-xs text-blue-muted">
              <FileText aria-hidden className="size-3.5" />
              {BATTERY_CHROME.noDatasheetLabel[locale]}
            </span>
          )}

          <span
            aria-hidden="true"
            className="text-navy transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
          >
            →
          </span>
        </div>
      </div>
    </>
  )

  const classes = cn(
    'group flex flex-col overflow-hidden border border-line bg-white transition-colors hover:border-gold',
    className,
  )

  if (href) {
    return (
      <Link to={href} className={classes}>
        {body}
      </Link>
    )
  }

  return <div className={classes}>{body}</div>
}