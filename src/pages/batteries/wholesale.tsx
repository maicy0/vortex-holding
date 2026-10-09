import { batteryCrumbs } from '../../app/battery-crumbs'
import {
  BATTERY_CHROME,
  BATTERY_WHOLESALE,
  batteryInquiryChecklist,
} from '../../app/battery-copy'
import { useLocale } from '../../app/locale-context'
import { usePageTitle } from '../../app/use-page-title'
import { Container } from '../../shared/components/Container'
import { BatteryButtonLink } from '../../shared/components/battery/BatteryButtonLink'
import { BatteryInquiryCTA, BatteryParentLink } from '../../shared/components/battery/BatteryInquiryCTA'
import { BatteryPageHero } from '../../shared/components/battery/BatteryPageHero'
import { BatterySectionHeading } from '../../shared/components/battery/BatterySectionHeading'

/**
 * VORTEX BATTERY — wholesale supply.
 *
 * Built as a document rather than a brochure, because that is what a buyer
 * arrives for: they need to know what an inquiry has to contain before they
 * write one. So the page is the specification sheet — four labelled groups,
 * divided like a form — followed by who it suits and by the commercial terms.
 *
 * THE TERMS ARE PRINTED AS FIELDS WITH NO VALUES. Every commercial term a
 * wholesale page would normally quote is named and left blank, each reading
 * "Set per inquiry", and the section says in as many words that none of them has
 * been agreed. This is the deliberate empty state the rest of the ecosystem
 * uses, and here it is not a placeholder to be filled in later by whoever gets
 * round to it — a minimum order quantity or a lead time that has not been set
 * with anyone is exactly the kind of figure that becomes a promise by accident.
 */
export function BatteryWholesalePage() {
  const { locale } = useLocale()
  const copy = BATTERY_WHOLESALE
  usePageTitle(copy.hero.title[locale])

  return (
    <>
      <BatteryPageHero
        eyebrow={copy.hero.eyebrow[locale]}
        title={copy.hero.title[locale]}
        lede={copy.hero.lede[locale]}
        crumbs={batteryCrumbs(
          BATTERY_CHROME.breadcrumbHome[locale],
          BATTERY_CHROME.breadcrumbBattery[locale],
          copy.hero.title[locale],
        )}
      />

      {/* --- What a wholesale inquiry contains ----------------------------
           The core of the page. Four groups, each a bordered cell ruled against
           its neighbours, laid out as a form rather than a list of paragraphs. */}
      <section className="bg-white">
        <Container size="wide" className="py-20 lg:py-24">
          <BatterySectionHeading
            eyebrow={copy.fields.eyebrow[locale]}
            title={copy.fields.title[locale]}
            lede={copy.fields.lede[locale]}
          />

          <dl className="mt-14 grid gap-px border border-line bg-line md:grid-cols-2">
            {copy.fields.groups.map((group, index) => (
              <div key={group.title.en} className="bg-white p-8">
                <dt className="flex items-baseline gap-4">
                  <span className="battery-mono text-lg text-gold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="battery-mono text-[0.6875rem] font-medium tracking-[0.16em] text-navy uppercase">
                    {group.title[locale]}
                  </span>
                </dt>

                <dd className="mt-6 flex flex-col">
                  {group.items.map((item) => (
                    <span
                      key={item.en}
                      className="flex items-start gap-3 border-t border-line py-3 text-sm text-gray first:border-t-0 first:pt-0"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 block size-1.5 shrink-0 bg-gold"
                      />
                      {item[locale]}
                    </span>
                  ))}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10">
            <BatteryButtonLink to="/businesses/batteries/contact">
              {copy.terms.actionLabel[locale]}
            </BatteryButtonLink>
          </div>
        </Container>
      </section>

      {/* --- Who this suits ------------------------------------------------ */}
      <section className="border-y border-line bg-off-white">
        <Container size="wide" className="py-20 lg:py-24">
          <BatterySectionHeading
            eyebrow={copy.audience.eyebrow[locale]}
            title={copy.audience.title[locale]}
          />

          <dl className="mt-12 divide-y divide-line border-y border-line">
            {copy.audience.items.map((item, index) => (
              <div
                key={item.title.en}
                className="grid gap-3 py-7 md:grid-cols-12 md:gap-8"
              >
                <dt className="flex items-baseline gap-4 md:col-span-4">
                  <span className="battery-mono text-sm text-gold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="title text-[1.25rem] text-navy">
                    {item.title[locale]}
                  </span>
                </dt>

                <dd className="text-sm leading-relaxed text-gray md:col-span-8">
                  {item.body[locale]}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* --- Commercial terms ----------------------------------------------
           A specification table with every value deliberately absent. The row
           keeps its label and its blank rule, so the page shows the shape of
           the agreement without asserting any part of it. */}
      <section className="bg-navy text-white">
        <Container size="wide" className="py-20 lg:py-24">
          <BatterySectionHeading
            eyebrow={copy.terms.eyebrow[locale]}
            title={copy.terms.title[locale]}
            lede={copy.terms.lede[locale]}
            tone="light"
          />

          <dl className="mt-14 border-t border-white/15">
            {copy.terms.rows.map((row) => (
              <div
                key={row.label.en}
                className="grid items-baseline gap-2 border-b border-white/15 py-5 sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] sm:gap-8"
              >
                <dt className="text-sm text-white/70">{row.label[locale]}</dt>

                {/* The blank rule where the value belongs. Not a dash, not an
                    em dash, not zero — a line, because a figure could go here
                    and does not yet. */}
                <dd className="flex items-baseline gap-4">
                  <span
                    aria-hidden="true"
                    className="block h-px flex-1 bg-white/25"
                  />
                  <span className="battery-mono text-[0.6875rem] tracking-[0.12em] text-gold uppercase">
                    {copy.terms.setPerInquiry[locale]}
                  </span>
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <BatteryParentLink
        label={BATTERY_CHROME.backToParentLabel[locale]}
        description={BATTERY_CHROME.backToParentBody[locale]}
      />

      <BatteryInquiryCTA
        eyebrow={copy.cta.eyebrow[locale]}
        title={copy.cta.title[locale]}
        description={copy.cta.description[locale]}
        actionLabel={copy.cta.actionLabel[locale]}
        actionHref="/businesses/batteries/contact"
        secondaryActionLabel={copy.cta.secondaryActionLabel[locale]}
        secondaryActionHref={copy.cta.secondaryActionHref}
        context={batteryInquiryChecklist(locale)}
        contextLabel={BATTERY_CHROME.includeLabel[locale]}
      />
    </>
  )
}