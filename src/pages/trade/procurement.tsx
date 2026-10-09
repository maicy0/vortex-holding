import { useLocale } from '../../app/locale-context'
import { usePageTitle } from '../../app/use-page-title'
import { TRADE_CHROME, TRADE_PROCUREMENT } from '../../app/trade-copy'
import { Container } from '../../shared/components/Container'
import { TradeInquiryCTA, TradeParentLink } from '../../shared/components/trade/TradeInquiryCTA'
import { TradePageHero } from '../../shared/components/trade/TradePageHero'
import { tradeCrumbs } from '../../app/trade-crumbs'
import { TradeSectionHeading } from '../../shared/components/trade/TradeSectionHeading'

/**
 * VORTEX TRADE — customized procurement.
 *
 * The structured route into the business, so the page is built like a document
 * rather than a brochure: a specification sheet laid out in four labelled
 * groups, the groups numbered and divided like a form, and the whole thing
 * presented on charcoal so it reads as a document to be filled in.
 *
 * Opens on the dark head — the one interior Trade page that does — because it
 * is the page a buyer arrives at with a requirement already in hand, and the
 * register should say so before they read a word.
 */
export function TradeProcurementPage() {
  const { locale } = useLocale()
  const copy = TRADE_PROCUREMENT
  usePageTitle(copy.hero.title[locale])

  return (
    <>
      <TradePageHero
        eyebrow={copy.hero.eyebrow[locale]}
        title={copy.hero.title[locale]}
        lede={copy.hero.lede[locale]}
        crumbs={tradeCrumbs(
          TRADE_CHROME.breadcrumbHome[locale],
          TRADE_CHROME.breadcrumbTrade[locale],
          copy.hero.eyebrow[locale],
        )}
        onDark
      />

      {/* --- Why structure ---------------------------------------------- */}
      <section className="bg-white">
        <Container size="wide" className="py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <TradeSectionHeading
                eyebrow={copy.purpose.eyebrow[locale]}
                title={copy.purpose.title[locale]}
              />
            </div>

            <div className="lg:col-span-7">
              <p className="trade-lede font-editorial text-[1.375rem] leading-[1.6] text-gray">
                {copy.purpose.body[locale]}
              </p>
            </div>
          </div>
        </Container>
      </section>

      {/* --- Specification sheet ----------------------------------------
           The core of the page. Four groups, each a bordered cell on the
           charcoal ground, laid out as a form rather than a list of
           paragraphs. Ruled dividers between groups, no boxes inside the
           cells — a specification sheet, not a set of cards. */}
      <section className="bg-navy text-white">
        <Container size="wide" className="py-20 lg:py-24">
          <TradeSectionHeading
            eyebrow={copy.fields.eyebrow[locale]}
            title={copy.fields.title[locale]}
            lede={copy.fields.lede[locale]}
            tone="light"
          />

          <dl className="mt-14 grid gap-px border border-white/15 bg-white/15 md:grid-cols-2">
            {copy.fields.groups.map((group, index) => (
              <div key={group.title.en} className="bg-navy p-8">
                <dt className="flex items-baseline gap-4">
                  <span className="font-editorial text-lg text-gold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[0.6875rem] font-medium tracking-[0.16em] uppercase">
                    {group.title[locale]}
                  </span>
                </dt>

                <dd className="mt-6 flex flex-col">
                  {group.items.map((item) => (
                    <span
                      key={item.en}
                      className="flex items-start gap-3 border-t border-white/10 py-3 text-sm text-white/70 first:border-t-0 first:pt-0"
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
        </Container>
      </section>

      {/* --- Who this is for -------------------------------------------- */}
      <section className="bg-white">
        <Container size="wide" className="py-20 lg:py-24">
          <TradeSectionHeading
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
                  <span className="font-editorial text-gold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="title text-[1.25rem] text-navy">
                    {item.title[locale]}
                  </span>
                </dt>
                <dd className="text-gray md:col-span-8">{item.body[locale]}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* --- How a specification is reviewed ----------------------------- */}
      <section className="bg-off-white">
        <Container size="wide" className="py-20 lg:py-24">
          <TradeSectionHeading
            eyebrow={copy.process.eyebrow[locale]}
            title={copy.process.title[locale]}
          />

          <ol className="mt-12 grid gap-px border border-line bg-line lg:grid-cols-3">
            {copy.process.steps.map((step, index) => (
              <li key={step.title.en} className="flex flex-col gap-4 bg-white p-8">
                <span className="font-editorial text-3xl text-gold">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <h3 className="title text-[1.25rem] text-navy">
                  {step.title[locale]}
                </h3>
                <p className="text-sm leading-relaxed text-gray">
                  {step.body[locale]}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <TradeParentLink
        label={TRADE_CHROME.backToParentLabel[locale]}
        description={TRADE_CHROME.backToParentBody[locale]}
      />

      <TradeInquiryCTA
        eyebrow={copy.cta.eyebrow[locale]}
        title={copy.cta.title[locale]}
        description={copy.cta.description[locale]}
        actionLabel={copy.cta.actionLabel[locale]}
        actionHref="/businesses/trade/contact"
        secondaryActionLabel={copy.cta.secondaryActionLabel[locale]}
        secondaryActionHref={copy.cta.secondaryActionHref}
        context={copy.fields.groups[0].items.map((item) => item[locale])}
        contextLabel={copy.fields.title[locale]}
      />
    </>
  )
}