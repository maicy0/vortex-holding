import { useLocale } from '../app/locale-context'
import { FOUNDERS, founderName } from '../app/founders'
import { processIcon, serviceIcon } from '../app/service-icons'
import { SERVICES } from '../app/services'
import { HOME_COPY } from '../app/copy'
import { usePageTitle } from '../app/use-page-title'
import {
  BusinessCard,
  ButtonLink,
  Container,
  InquiryCTA,
  SectionHeading,
  ServiceCard,
} from '../shared/components'

/**
 * The homepage. Header and footer come from SiteLayout, so the sections below
 * are the eight that live between them.
 *
 * All copy comes from HOME_COPY and all service text from SERVICES, so this
 * file holds layout only and the Persian/English surface stays auditable in
 * src/app.
 */
export function HomePage() {
  usePageTitle(undefined, 'Vortex Holding operates in trade, import and export, goods supply and product sales, offering a range of services to corporate clients and consumers.')
  const { locale } = useLocale()

  const { hero, intro, services, businesses, process, founders, cta } = HOME_COPY

  return (
    <>
      {/* Hero ------------------------------------------------------- */}
      <section className="relative isolate overflow-hidden border-b border-line bg-navy">
        {/*
          Photograph sits under a navy wash rather than beside the type: the
          image gives the hero depth and industrial context while the overlay
          holds the contrast needed for WCAG AA text over it.

          Decorative, so alt is empty and the element is hidden from assistive
          technology — the hero's meaning is carried entirely by the headline
          and lede below it. The JPEG is the fallback; every current browser
          takes the WebP, which is roughly a third of the size at this size.
        */}
        <picture>
          <source srcSet="/images/port-terminal.webp" type="image/webp" />
          <img
            src="/images/port-terminal.jpg"
            alt=""
            aria-hidden="true"
            fetchPriority="high"
            className="absolute inset-0 -z-10 size-full object-cover opacity-45"
          />
        </picture>
        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 bg-gradient-to-l from-navy via-navy/90 to-navy/60"
        />

        <Container className="py-28 md:py-40">
          <div className="reveal flex max-w-3xl flex-col gap-7">
            <p className="flex items-center gap-3 text-xs font-medium tracking-[0.18em] text-gold uppercase">
              <span aria-hidden="true" className="block h-px w-8 bg-gold" />
              {hero.eyebrow[locale]}
            </p>

            <h1 className="display text-white">{hero.title[locale]}</h1>

            <p className="max-w-2xl text-lg text-white/75">
              {hero.lede[locale]}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-3">
              <ButtonLink
                to="/services"
                size="lg"
                className="bg-gold text-navy hover:bg-white"
              >
                {hero.primaryCta[locale]}
              </ButtonLink>
              <ButtonLink
                to="/contact"
                variant="secondary"
                size="lg"
                className="border-white/40 text-white hover:bg-white hover:text-navy"
              >
                {hero.secondaryCta[locale]}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </section>

      {/* Introduction ----------------------------------------------- */}
      <section className="bg-white">
        <Container className="py-24 md:py-28">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-6">
              <SectionHeading
                eyebrow={intro.eyebrow[locale]}
                title={intro.title[locale]}
              />
            </div>

            <div className="flex flex-col gap-6 lg:col-span-6">
              <p className="text-lg text-gray">{intro.body[locale]}</p>

              <dl className="mt-2 divide-y divide-line border-t border-line">
                {intro.points.map((point) => (
                  <div
                    key={point.title.en}
                    className="flex flex-col gap-1 py-5 sm:flex-row sm:gap-6"
                  >
                    <dt className="shrink-0 text-sm font-semibold text-navy sm:w-28">
                      {point.title[locale]}
                    </dt>
                    <dd className="text-sm text-gray sm:flex-1">
                      {point.body[locale]}
                    </dd>
                  </div>
                ))}
              </dl>

              <div>
                <ButtonLink
                  to="/about"
                  variant="secondary"
                  className="mt-2"
                >
                  {intro.ctaLabel[locale]}
                </ButtonLink>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Services --------------------------------------------------- */}
      <section className="border-y border-line bg-off-white">
        <Container className="py-24 md:py-28">
          <SectionHeading
            eyebrow={services.eyebrow[locale]}
            title={services.title[locale]}
            lede={services.lede[locale]}
          />

          {/*
            Five cards in a 3/2 split: the asymmetry reads as deliberate
            rather than as a card that fell off the end of the row.
          */}
          <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {SERVICES.map((service, index) => (
              <ServiceCard
                key={service.slug}
                href={service.path}
                title={service.title[locale]}
                description={service.summary[locale]}
                icon={serviceIcon(service.icon)}
                className={index < 3 ? 'lg:col-span-2' : 'lg:col-span-3'}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Trade and battery businesses -------------------------------- */}
      <section className="bg-white">
        <Container className="py-24 md:py-28">
          <SectionHeading
            eyebrow={businesses.eyebrow[locale]}
            title={businesses.title[locale]}
            lede={businesses.lede[locale]}
          />

          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {/* Wordmarks render as Latin in every locale — see site-names.ts. */}
            <BusinessCard
              name="VORTEX TRADE"
              description={businesses.trade.body[locale]}
              meta={businesses.trade.visit[locale]}
              href="/trade"
            />
            <BusinessCard
              name="VORTEX BATTERY"
              description={businesses.battery.body[locale]}
              meta={businesses.battery.visit[locale]}
              href="/battery"
            />
          </div>
        </Container>
      </section>

      {/* Inquiry process --------------------------------------------- */}
      <section className="border-y border-line bg-off-white">
        <Container className="py-24 md:py-28">
          <SectionHeading
            eyebrow={process.eyebrow[locale]}
            title={process.title[locale]}
            lede={process.lede[locale]}
          />

          <ol className="mt-14 grid gap-5 md:grid-cols-3">
            {process.steps.map((step, index) => {
              const Icon = processIcon(index)

              return (
                <li
                  key={step.title.en}
                  className="relative flex flex-col gap-4 border border-line bg-white p-7"
                >
                  {/*
                    The step number sits in the trailing corner as a quiet
                    ordinal; the rule above it is the gold accent repeated.
                  */}
                  <span
                    aria-hidden="true"
                    className="block h-px w-8 bg-gold"
                  />

                  <div className="flex items-center justify-between gap-4">
                    {Icon && (
                      <Icon aria-hidden className="size-6 text-navy-primary" />
                    )}
                    <span className="text-xs font-medium tracking-[0.18em] text-blue-muted tabular-nums">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold text-navy">
                    {step.title[locale]}
                  </h3>
                  <p className="text-sm text-gray">{step.body[locale]}</p>
                </li>
              )
            })}
          </ol>
        </Container>
      </section>

      {/* Founders --------------------------------------------------- */}
      {/*
        Names and roles only. No portraits, dates or achievements have been
        supplied, and none are invented here — the section introduces the two
        founders and links to the full story.
      */}
      <section className="bg-white">
        <Container className="py-24 md:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow={founders.eyebrow[locale]}
                title={founders.title[locale]}
                lede={founders.lede[locale]}
              />
            </div>

            <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-7">
              {FOUNDERS.map((founder) => (
                <li
                  key={founder.family.en}
                  className="flex flex-col gap-3 border border-line bg-off-white p-8"
                >
                  {/*
                    Typographic placeholder, not a portrait. No photograph of
                    either founder exists, and none is invented — the site
                    introduces them by name only.
                  */}
                  <span
                    aria-hidden="true"
                    className="flex size-14 items-center justify-center border border-line bg-white text-xl font-semibold text-navy-primary"
                  >
                    {founder.family.fa.charAt(0)}
                  </span>

                  <h3 className="text-xl font-semibold text-navy">
                    {founderName(founder, locale)}
                  </h3>
                  <p className="text-sm text-blue-muted">
                    {founders.role[locale]}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Inquiry CTA ------------------------------------------------ */}
      <InquiryCTA
        title={cta.title[locale]}
        description={cta.description[locale]}
        actionLabel={cta.actionLabel[locale]}
        actionHref="/contact"
        secondaryActionLabel={cta.secondaryActionLabel[locale]}
        secondaryActionHref={cta.secondaryActionHref}
      />
    </>
  )
}
