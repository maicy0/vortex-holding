import { ArrowRight, FileText } from 'lucide-react'
import { Link } from 'react-router-dom'

import {
  CATALOGUE_STATUS,
  batteryIsDemonstration,
  findBatteryCategory,
  type BatteryProduct,
} from '../../../app/battery-catalogue'
import { BATTERY_CHROME, BATTERY_PRODUCTS_PAGE } from '../../../app/battery-copy'
import { useLocale } from '../../../app/locale-context'
import { cn } from '../../lib/cn'
import { BatteryDemoNotice } from './BatteryDemoNotice'
import { BatterySpecTable } from './BatterySpecTable'

/**
 * The product-detail presentation pattern.
 *
 * Two columns: the specification sheet on the leading edge, and the media plus
 * applications on the trailing edge. Reversed by CSS in RTL rather than by a
 * second layout, so a Persian page is the same page mirrored rather than a
 * different page.
 *
 * Built for the fields that are genuinely optional. No manufacturer has been
 * appointed, so the brand row reads "Not supplied"; no photograph exists, so
 * the media panel says so instead of showing a stand-in; no datasheet exists,
 * so the datasheet row states that too. All three absences are rendered where
 * the value would have been, which is what makes the entry honest rather than
 * merely sparse — and it is the state the component will render for a real
 * product too, on the day before its photograph arrives.
 *
 * The demonstration caption sits directly beneath the table rather than only at
 * the top of the page, so this section carries its label when it is screenshotted
 * or cropped on its own.
 */
export function BatteryProductDetail({
  product,
  className,
}: {
  product: BatteryProduct
  className?: string
}) {
  const { locale } = useLocale()
  const category = findBatteryCategory(product.category)
  const applications = product.applications ?? []

  return (
    <article
      id={product.id}
      className={cn(
        'scroll-mt-28 grid gap-px border border-line bg-line lg:grid-cols-2',
        className,
      )}
    >
      {/* --- Specification sheet ---------------------------------------- */}
      <div className="flex flex-col gap-6 bg-white p-7 lg:p-10">
        <div className="flex flex-col gap-3">
          {category && (
            <p className="battery-mono text-[0.6875rem] font-medium tracking-[0.16em] text-blue-muted uppercase">
              {category.label[locale]}
            </p>
          )}

          <h3 className="title text-[1.5rem] text-navy">{product.name[locale]}</h3>
        </div>

        <BatterySpecTable product={product} />

        {batteryIsDemonstration && (
          <BatteryDemoNotice
            variant="caption"
            caption={CATALOGUE_STATUS.tableCaption[locale]}
          />
        )}

        {/* A datasheet is a document a buyer must be able to open. Since none
            has been supplied, this states its absence rather than rendering a
            disabled button that looks like a broken link. */}
        {product.datasheetUrl ? (
          <a
            href={product.datasheetUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 self-start border border-navy px-4 py-2.5 text-sm text-navy transition-colors hover:bg-navy hover:text-white"
          >
            <FileText aria-hidden className="size-4" />
            {BATTERY_CHROME.specLabels.datasheet[locale]}
          </a>
        ) : (
          <p className="text-xs text-blue-muted">
            {CATALOGUE_STATUS.noDatasheet[locale]}
          </p>
        )}
      </div>

      {/* --- Media and applications ------------------------------------- */}
      <div className="flex flex-col gap-6 bg-off-white p-7 lg:p-10">
        <div className="flex aspect-4/3 flex-col items-center justify-center gap-3 border border-line bg-white">
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
                className="battery-mono text-2xl text-navy/25 lg:text-3xl"
                aria-hidden="true"
              >
                {product.name[locale]}
              </span>
              <p className="max-w-[16rem] text-center text-xs leading-relaxed text-gray">
                {CATALOGUE_STATUS.noImage[locale]}
              </p>
            </>
          )}
        </div>

        {applications.length > 0 && (
          <div className="flex flex-col gap-4">
            <h4 className="battery-mono text-[0.6875rem] font-medium tracking-[0.16em] text-blue-muted uppercase">
              {BATTERY_CHROME.specLabels.applications[locale]}
            </h4>

            <ul className="flex flex-col gap-2.5">
              {applications.map((application) => (
                <li
                  key={application.en}
                  className="flex items-start gap-3 text-sm text-navy"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 block size-1.5 shrink-0 bg-gold"
                  />
                  {application[locale]}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/*
          The one route out of a catalogue entry, carrying the category in the
          query string so the inquiry form arrives with it selected. The id is
          the *category*, not the product: what a buyer specifies against is the
          shape, and passing the product id would imply this entry had been
          chosen when only its category is known.

          A router Link, not a raw <a>: the query string here is presentation,
          and routing through React Router keeps the rest of the brand's
          navigation behaviour — middle-click, client transitions — intact.
        */}
        <Link
          to={{
            pathname: BATTERY_PRODUCTS_PAGE.detail.inquiryHref,
            search: `?format=${encodeURIComponent(product.category)}`,
          }}
          className="group mt-auto inline-flex items-center gap-3 self-start border-t border-line pt-5 text-sm font-medium text-navy"
        >
          {BATTERY_PRODUCTS_PAGE.detail.inquiryLabel[locale]}
          <ArrowRight
            aria-hidden
            className="size-4 transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
          />
        </Link>
      </div>
    </article>
  )
}