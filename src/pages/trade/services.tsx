import { useLocale } from '../../app/locale-context'
import { usePageTitle } from '../../app/use-page-title'
import {
  TRADE_CHROME,
  TRADE_SERVICES_INDEX,
  tradeChecklist,
} from '../../app/trade-copy'
import { tradeServiceIcon } from '../../app/trade-icons'
import { TRADE_SERVICES } from '../../app/trade-services'
import { Container } from '../../shared/components/Container'
import { TradeInquiryCTA, TradeParentLink } from '../../shared/components/trade/TradeInquiryCTA'
import { TradePageHero } from '../../shared/components/trade/TradePageHero'
import { tradeCrumbs } from '../../app/trade-crumbs'

/**
 * VORTEX TRADE services.
 *
 * Four full-width sections, one per line, each built from the same entry in
 * TRADE_SERVICES the homepage grid renders. The page alternates ground by
 * section so a long read gets a change of pace: paper, warm paper, paper.
 *
 * Every service block carries the same four parts — what it is, what an
 * inquiry on it should contain, and the commercial values that would normally
 * be published. That last part is a values sheet with the *labels* filled in
 * and the values deliberately absent, under a note saying so. A commercial
 * services page that cannot state a minimum quantity or a lead time would
 * normally be a weak page; printing invented ones would be a dishonest one.
 */
export function TradeServicesPage() {
  const { locale } = useLocale()
  const copy = TRADE_SERVICES_INDEX
  usePageTitle(copy.hero.title[locale])

  const checklist = tradeChecklist(locale)

  return (
    <>
      <TradePageHero
        eyebrow={copy.hero.eyebrow[locale]}
        title={copy.hero.title[locale]}
        lede={copy.hero.lede[locale]}
        crumbs={tradeCrumbs(
          TRADE_CHROME.breadcrumbHome[locale],
          TRADE_CHROME.breadcrumbTrade[locale],
          copy.hero.title[locale],
        )}
      />

      <div className="border-b border-line bg-off-white">
        <Container size="wide" className="py-4">
          <nav aria-label="Services on this page">
            <ul className="flex flex-wrap items-center gap-x-6 gap-y-2">
              {TRADE_SERVICES.map((service) => (
                <li key={service.slug}>
                  <a
                    href={`#${service.anchor}`}
                    className="flex items-center gap-2 text-sm text-gray transition-colors hover:text-navy"
                  >
                    <span className="font-editorial text-gold">
                      {service.number}
                    </span>
                    {service.title[locale]}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </Container>
      </div>

      {TRADE_SERVICES.map((service, index) => {
        const Icon = tradeServiceIcon(service.icon)
        const isPaper = index % 2 === 0

        return (
          <section
            key={service.slug}
            id={service.anchor}
            className={
              isPaper
                ? 'scroll-mt-24 bg-white'
                : 'scroll-mt-24 border-y border-line bg-off-white'
            }
          >
            <Container size="wide" className="py-20 lg:py-24">
              <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
                {/* What it is ---------------------------------------- */}
                <div className="lg:col-span-7">
                  <div className="flex items-center gap-4">
                    <Icon aria-hidden className="size-6 text-gold" />
                    <span className="font-editorial text-lg text-gold">
                      {service.number}
                    </span>
                  </div>

                  <h2 className="title mt-5 text-navy">{service.title[locale]}</h2>

                  <p className="trade-lede font-editorial mt-6 text-xl leading-relaxed text-gray">
                    {service.summary[locale]}
                  </p>
                </div>

                {/* What an inquiry should carry ----------------------- */}
                <aside className="lg:col-span-5">
                  <div className="border border-line bg-white p-8">
                    <h3 className="text-[0.6875rem] font-medium tracking-[0.16em] text-navy uppercase">
                      {copy.includesLabel[locale]}
                    </h3>

                    <ul className="mt-6 flex flex-col">
                      {service.includes.map((item) => (
                        <li
                          key={item.en}
                          className="flex items-start gap-3 border-t border-line py-3 text-sm text-gray first:border-t-0 first:pt-0"
                        >
                          <span
                            aria-hidden="true"
                            className="mt-2 block size-1.5 shrink-0 bg-gold"
                          />
                          {item[locale]}
                        </li>
                      ))}
                    </ul>
                  </div>
                </aside>
              </div>

              {/* The values sheet ------------------------------------- */}
              <div className="mt-14 border-t border-line pt-10">
                <div className="flex flex-col gap-2 lg:flex-row lg:items-baseline lg:justify-between">
                  <h3 className="text-[0.6875rem] font-medium tracking-[0.16em] text-navy uppercase">
                    {copy.valuesLabel[locale]}
                  </h3>
                  <p className="text-xs text-blue-muted">
                    {TRADE_CHROME.setPerInquiry[locale]}
                  </p>
                </div>

                {/*
                  The honest empty state: the fields a buyer needs are named,
                  the values are absent, and the note above says why. A hairline
                  rather than a dash, because "not stated" is not the same
                  claim as "none".
                */}
                <dl className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
                  {service.includes.map((item) => (
                    <div key={item.en} className="flex flex-col gap-2">
                      <dt className="text-sm font-medium text-navy">
                        {item[locale]}
                      </dt>
                      <dd aria-hidden="true" className="h-px w-full bg-line" />
                    </div>
                  ))}
                </dl>

                <p className="mt-6 max-w-2xl text-sm text-gray">
                  {copy.valuesNote[locale]}
                </p>
              </div>
            </Container>
          </section>
        )
      })}

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
        context={checklist}
        contextLabel={TRADE_CHROME.includeLabel[locale]}
      />
    </>
  )
}