import { Link } from 'react-router-dom'

import { useLocale } from '../app/locale-context'
import { FOUNDERS, founderName } from '../app/founders'
import { serviceIcon } from '../app/service-icons'
import { SERVICES } from '../app/services'
import { ABOUT_COPY } from '../app/copy'
import { usePageTitle } from '../app/use-page-title'
import {
  Breadcrumbs,
  ButtonLink,
  Container,
  InquiryCTA,
  SectionHeading,
} from '../shared/components'

/**
 * About the holding and its founders.
 *
 * Founders appear by name and role only. No biography, portrait, founding
 * date, achievement or company statistic is shown, because none has been
 * supplied and none is invented.
 */
export function AboutPage() {
  const { locale } = useLocale()
  usePageTitle(ABOUT_COPY.title[locale])

  const homeLabel = { en: 'Home', fa: 'خانه' }[locale]

  return (
    <>
      <section className="border-b border-line bg-off-white">
        <Container className="py-20 md:py-24">
          <Breadcrumbs
            items={[
              { label: homeLabel, href: '/' },
              { label: ABOUT_COPY.title[locale] },
            ]}
          />

          <div className="reveal mt-10 flex max-w-3xl flex-col gap-6">
            <SectionHeading
              eyebrow={ABOUT_COPY.eyebrow[locale]}
              title={ABOUT_COPY.title[locale]}
              as="h1"
              lede={ABOUT_COPY.lede[locale]}
            />
          </div>
        </Container>
      </section>

      {/* Narrative ---------------------------------------------------- */}
      <section className="bg-white">
        <Container className="py-20 md:py-24">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-7 lg:col-start-6">
              <div className="flex flex-col gap-6">
                {ABOUT_COPY.body.map((paragraph) => (
                  <p key={paragraph.en} className="text-lg text-gray">
                    {paragraph[locale]}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* The five lines of business ----------------------------------- */}
      <section className="border-y border-line bg-off-white">
        <Container className="py-20 md:py-24">
          <SectionHeading
            eyebrow={ABOUT_COPY.servicesEyebrow[locale]}
            title={ABOUT_COPY.servicesTitle[locale]}
          />

          <ul className="mt-12 divide-y divide-line border-y border-line">
            {SERVICES.map((service) => {
              const Icon = serviceIcon(service.icon)

              return (
                <li key={service.slug}>
                  <Link
                    to={service.path}
                    className="group flex flex-col gap-2 py-6 transition-colors hover:text-navy sm:flex-row sm:items-center sm:gap-8"
                  >
                    {Icon && (
                      <Icon
                        aria-hidden
                        className="size-5 shrink-0 text-navy-primary"
                      />
                    )}

                    <h3 className="text-base font-semibold text-navy sm:w-56 sm:shrink-0">
                      {service.title[locale]}
                    </h3>

                    <p className="flex-1 text-sm text-gray">
                      {service.summary[locale]}
                    </p>

                    <span
                      aria-hidden="true"
                      className="hidden shrink-0 text-xs font-medium tracking-[0.18em] text-blue-muted uppercase group-hover:text-navy sm:block rtl:rotate-180"
                    >
                      &rarr;
                    </span>
                  </Link>
                </li>
              )
            })}
          </ul>

          <ButtonLink to="/services" variant="secondary" className="mt-10">
            {ABOUT_COPY.servicesTitle[locale]}
          </ButtonLink>
        </Container>
      </section>

      {/* The two operating companies ---------------------------------- */}
      <section className="bg-white">
        <Container className="py-20 md:py-24">
          <SectionHeading
            eyebrow={ABOUT_COPY.companiesEyebrow[locale]}
            title={ABOUT_COPY.companiesTitle[locale]}
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {COMPANIES.map((company) => (
              <Link
                key={company.name}
                to={company.href}
                className="group flex flex-col gap-3 border border-line p-8 transition-colors hover:border-navy-primary"
              >
                <h3 className="text-xl font-semibold text-navy">
                  {company.name}
                </h3>
                <p className="text-sm text-gray">{company.body[locale]}</p>

                <span className="mt-2 text-sm font-medium text-navy-primary">
                  {company.visit[locale]}
                </span>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Founders ----------------------------------------------------- */}
      <section className="border-t border-line bg-off-white">
        <Container className="py-20 md:py-24">
          <SectionHeading
            eyebrow={ABOUT_COPY.foundersEyebrow[locale]}
            title={ABOUT_COPY.foundersTitle[locale]}
            lede={ABOUT_COPY.foundersLede[locale]}
          />

          <ul className="mt-12 grid gap-5 sm:grid-cols-2">
            {FOUNDERS.map((founder) => (
              <li
                key={founder.family.en}
                className="flex items-center gap-5 border border-line bg-white p-8"
              >
                {/*
                  Typographic placeholder, not a portrait. No photograph of
                  either founder has been supplied, and inventing one is not
                  an option — the site introduces them by name only.
                */}
                <span
                  aria-hidden="true"
                  className="flex size-14 shrink-0 items-center justify-center border border-line bg-off-white text-xl font-semibold text-navy-primary"
                >
                  {founder.family.fa.charAt(0)}
                </span>

                <div className="flex flex-col gap-1">
                  <h3 className="text-xl font-semibold text-navy">
                    {founderName(founder, locale)}
                  </h3>
                  <p className="text-sm text-blue-muted">
                    {ABOUT_COPY.role[locale]}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <InquiryCTA
        title={ABOUT_COPY.cta.title[locale]}
        description={ABOUT_COPY.cta.description[locale]}
        actionLabel={ABOUT_COPY.cta.actionLabel[locale]}
      />
    </>
  )
}

/**
 * Company names render as Latin wordmarks in every locale — a brand name is
 * not translated. Only the surrounding description is localised.
 */
const COMPANIES = [
  {
    name: 'VORTEX TRADE',
    href: '/trade',
    body: {
      en: 'Import, export and the supply of goods, with its own identity and focus.',
      fa: 'واردات، صادرات و تأمین کالا، با هویت و تمرکز مستقل خود.',
    },
    visit: { en: 'Visit the trade site', fa: 'ورود به سایت تجارت' },
  },
  {
    name: 'VORTEX BATTERY',
    href: '/battery',
    body: {
      en: 'Battery products and energy storage, with its own identity and focus.',
      fa: 'محصولات باتری و ذخیره‌سازی انرژی، با هویت و تمرکز مستقل خود.',
    },
    visit: { en: 'Visit the battery site', fa: 'ورود به سایت باتری' },
  },
] as const
