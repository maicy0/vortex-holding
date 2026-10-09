import { useLocale } from '../../app/locale-context'
import { usePageTitle } from '../../app/use-page-title'
import {
  TRADE_CHROME,
  TRADE_HOME,
  tradeChecklist,
} from '../../app/trade-copy'
import { tradeProcessIcon } from '../../app/trade-icons'
import { TRADE_SERVICES } from '../../app/trade-services'
import { Container } from '../../shared/components/Container'
import { TradeButtonLink } from '../../shared/components/trade/TradeButtonLink'
import { TradeInquiryCTA, TradeParentLink } from '../../shared/components/trade/TradeInquiryCTA'
import { TradeSectionHeading } from '../../shared/components/trade/TradeSectionHeading'
import { TradeServiceGrid } from '../../shared/components/trade/TradeServiceGrid'

/**
 * VORTEX TRADE homepage.
 *
 * Composed rather than templated: the hero is a bespoke commercial head with a
 * masthead rule and a logistics image, the service overview is a numbered grid,
 * the process is an open three-step ledger on charcoal, and the closing section
 * states plainly what the site does not promise.
 *
 * All Trade chrome is shared; only the composition is this page's.
 */
export function TradeHomePage() {
  const { locale } = useLocale()
  usePageTitle(TRADE_HOME.hero.title[locale])

  const checklist = tradeChecklist(locale)

  return (
    <>
      {/* --- Hero ---------------------------------------------------------
          The one place the site uses a photograph. Grayscale behind a
          charcoal wash so the image reads as texture in the layout rather
          than as a picture of somebody's warehouse, and the type sits on a
          flat panel to its left where nothing competes with it. */}
      <section className="relative isolate overflow-hidden bg-navy text-white">
        <div className="absolute inset-0 -z-10 opacity-30">
          <picture>
            <source srcSet="/images/port-terminal.webp" type="image/webp" />
            <img
              src="/images/port-terminal.jpg"
              alt=""
              aria-hidden="true"
              className="size-full object-cover grayscale"
            />
          </picture>
        </div>

        <Container size="wide" className="py-20 lg:py-28">
          <div className="reveal max-w-3xl border-s-2 border-gold ps-8">
            <p className="text-[0.6875rem] font-medium tracking-[0.16em] text-gold uppercase">
              {TRADE_HOME.hero.eyebrow[locale]}
            </p>

            <h1 className="display mt-6 text-white">
              {TRADE_HOME.hero.title[locale]}
            </h1>

            <p className="trade-lede mt-7 max-w-2xl text-white/70">
              {TRADE_HOME.hero.lede[locale]}
            </p>

            <div className="mt-10 flex flex-wrap gap-3">
              <TradeButtonLink
                to={TRADE_HOME.hero.primaryCtaHref}
                size="lg"
                className="bg-gold text-white hover:bg-white hover:text-navy"
              >
                {TRADE_HOME.hero.primaryCta[locale]}
              </TradeButtonLink>
              <TradeButtonLink
                to={TRADE_HOME.hero.secondaryCtaHref}
                variant="secondary"
                size="lg"
                className="border-white/40 text-white hover:bg-white hover:text-navy"
              >
                {TRADE_HOME.hero.secondaryCta[locale]}
              </TradeButtonLink>
            </div>
          </div>
        </Container>

        {/* Three lines naming what the business is. A masthead strip: ruled
            above, ruled between, no boxes. */}
        <div className="border-t border-white/10">
          <Container size="wide" className="py-6">
            <ul className="grid gap-6 sm:grid-cols-3">
              {TRADE_HOME.hero.facts.map((fact, index) => (
                <li
                  key={fact.en}
                  className="flex items-baseline gap-3 text-sm text-white/60"
                >
                  <span className="font-editorial text-gold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {fact[locale]}
                </li>
              ))}
            </ul>
          </Container>
        </div>
      </section>

      {/* --- Service overview ------------------------------------------- */}
      <section className="bg-white">
        <Container size="wide" className="py-20 lg:py-24">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <TradeSectionHeading
              eyebrow={TRADE_HOME.overview.eyebrow[locale]}
              title={TRADE_HOME.overview.title[locale]}
              lede={TRADE_HOME.overview.lede[locale]}
              className="lg:max-w-2xl"
            />

            <TradeButtonLink to={TRADE_HOME.overview.ctaHref} variant="secondary">
              {TRADE_HOME.overview.ctaLabel[locale]}
            </TradeButtonLink>
          </div>

          <TradeServiceGrid services={TRADE_SERVICES} className="mt-12" />
        </Container>
      </section>

      {/* --- Process ------------------------------------------------------
          Charcoal, and the steps numbered openly down the leading edge
          rather than boxed. Different register from the grid above it on
          purpose — this is the narrative part of the page. */}
      <section className="bg-navy text-white">
        <Container size="wide" className="py-20 lg:py-24">
          <TradeSectionHeading
            eyebrow={TRADE_HOME.process.eyebrow[locale]}
            title={TRADE_HOME.process.title[locale]}
            lede={TRADE_HOME.process.lede[locale]}
            tone="light"
          />

          <ol className="mt-14 border-t border-white/10">
            {TRADE_HOME.process.steps.map((step, index) => {
              const Icon = tradeProcessIcon(index)

              return (
                <li
                  key={step.title.en}
                  className="grid gap-4 border-b border-white/10 py-9 md:grid-cols-12 md:gap-8"
                >
                  <div className="flex items-baseline gap-4 md:col-span-3">
                    <span className="font-editorial text-2xl text-gold">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    {Icon && (
                      <Icon aria-hidden className="size-5 text-white/40" />
                    )}
                  </div>

                  <h3 className="title text-white md:col-span-4">
                    {step.title[locale]}
                  </h3>

                  <p className="text-white/70 md:col-span-5">
                    {step.body[locale]}
                  </p>
                </li>
              )
            })}
          </ol>
        </Container>
      </section>

      {/* --- What this site does not promise ------------------------------
          Placed before the call to action on purpose: the honest note is
          read before the visitor commits, not tucked under the button. */}
      <section className="bg-off-white">
        <Container size="wide" className="py-20 lg:py-24">
          <TradeSectionHeading
            eyebrow={TRADE_HOME.position.eyebrow[locale]}
            title={TRADE_HOME.position.title[locale]}
          />

          <dl className="mt-12 grid gap-px border border-line bg-line md:grid-cols-3">
            {TRADE_HOME.position.points.map((point) => (
              <div key={point.title.en} className="bg-white p-8">
                <dt className="text-base font-semibold tracking-[0.04em] text-navy uppercase">
                  {point.title[locale]}
                </dt>
                <dd className="mt-4 text-sm leading-relaxed text-gray">
                  {point.body[locale]}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <TradeParentLink
        label={TRADE_CHROME.backToParentLabel[locale]}
        description={TRADE_CHROME.backToParentBody[locale]}
      />

      <TradeInquiryCTA
        eyebrow={TRADE_HOME.cta.eyebrow[locale]}
        title={TRADE_HOME.cta.title[locale]}
        description={TRADE_HOME.cta.description[locale]}
        actionLabel={TRADE_HOME.cta.actionLabel[locale]}
        actionHref="/businesses/trade/contact"
        secondaryActionLabel={TRADE_HOME.cta.secondaryActionLabel[locale]}
        secondaryActionHref={TRADE_HOME.cta.secondaryActionHref}
        context={checklist}
        contextLabel={TRADE_CHROME.includeLabel[locale]}
      />
    </>
  )
}