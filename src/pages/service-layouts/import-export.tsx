import { SERVICE_PAGE_COPY } from '../../app/copy'
import type { Locale } from '../../app/locale'
import type { Service } from '../../app/services'
import { serviceIcon } from '../../app/service-icons'
import type { ServicePageCopy } from '../../app/service-pages'
import {
  AudienceSection,
  Container,
  InquirySection,
  InquiryCTA,
  ServiceDescription,
  UseCasesSection,
  CrossLinks,
} from '../../shared/components'
import { Breadcrumbs } from '../../shared/components'
import { RelatedServices } from './shared'

/**
 * Import & export.
 *
 * The journey is a transaction with parties on both sides of a border, so the
 * page is built on a ledger: the description as a ruled aside, who the trade
 * is with in a hairline table, what actually arrives in a numbered list, and
 * the scope split into its three strands. The at-a-glance strip lists those
 * same three strands in the hero, because on this service they are also the
 * things an inquiry has to name.
 *
 * Detail: `capabilities` — the three strands are topics to read about.
 */
export function ImportExportLayout({
  service,
  copy,
  locale,
  services,
}: {
  service: Service
  copy: ServicePageCopy
  locale: Locale
  services: Service[]
}) {
  const Icon = serviceIcon(service.icon)

  return (
    <>
      {/* Hero — off-white head, description ruled beneath it ------------ */}
      <section className="border-b border-line bg-off-white">
        <Container className="py-16 md:py-20">
          <Breadcrumbs
            items={[
              { label: SERVICE_PAGE_COPY.breadcrumbRoot[locale], href: '/' },
              {
                label: SERVICE_PAGE_COPY.breadcrumbServices[locale],
                href: '/services',
              },
              { label: copy.breadcrumb[locale] },
            ]}
          />

          <div className="reveal mt-10 grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="flex flex-col gap-6 lg:col-span-7">
              <Icon aria-hidden className="size-8 text-navy-primary" />

              <h1 className="display text-navy">{copy.hero.title[locale]}</h1>

              <p className="max-w-2xl text-lg text-gray">{copy.hero.lede[locale]}</p>
            </div>

            {/* At a glance: the three strands this service is built on. */}
            <ul className="flex flex-col gap-4 border-t border-line pt-8 lg:col-span-5 lg:border-t-0 lg:border-s lg:border-line lg:ps-10 lg:pt-0">
              <li className="text-xs font-medium tracking-[0.18em] text-blue-muted uppercase">
                {SERVICE_PAGE_COPY.atAGlance[locale]}
              </li>
              {copy.hero.facts.map((fact) => (
                <li
                  key={fact}
                  className="flex items-center gap-3 text-sm text-navy"
                >
                  <span aria-hidden="true" className="h-px w-4 bg-gold" />
                  {fact}
                </li>
              ))}
            </ul>
          </div>

          <ServiceDescription
            label={copy.descriptionLabel[locale]}
            body={copy.description[locale]}
            className="mt-14"
          />
        </Container>
      </section>

      <AudienceSection
        eyebrow={copy.audience.eyebrow[locale]}
        title={copy.audience.title[locale]}
        lede={copy.audience.lede[locale]}
        items={copy.audience.items.map((item) => ({
          title: item.title[locale],
          body: item.body[locale],
        }))}
      />

      <UseCasesSection
        eyebrow={copy.useCases.eyebrow[locale]}
        title={copy.useCases.title[locale]}
        items={copy.useCases.items.map((item) => ({
          title: item.title[locale],
          body: item.body[locale],
        }))}
        className="border-t border-line py-20 md:py-24"
      />

      <InquirySection
        eyebrow={copy.inquiry.eyebrow[locale]}
        title={copy.inquiry.title[locale]}
        lede={copy.inquiry.lede[locale]}
        includeHeading={SERVICE_PAGE_COPY.inquiryIncludeHeading[locale]}
        include={copy.inquiry.include.map((item) => ({
          title: item.title[locale],
          body: item.body[locale],
        }))}
        nextHeading={SERVICE_PAGE_COPY.inquiryNextHeading[locale]}
        next={copy.inquiry.next.map((item) => ({
          title: item.title[locale],
          body: item.body[locale],
        }))}
        action={{ label: copy.primary.label[locale], href: copy.primary.href }}
      />

      {/* Scope: the three strands, as rows rather than a set of cards. */}
      <section className="border-t border-line bg-white">
        <Container className="py-20 md:py-24">
          <div className="flex flex-col gap-4">
            <p className="flex items-center gap-3 text-xs font-medium tracking-[0.18em] text-gold uppercase">
              <span aria-hidden="true" className="block h-px w-8 bg-gold" />
              {copy.detailLabel[locale]}
            </p>
            <h2 className="title text-navy">{copy.detailTitle[locale]}</h2>
            <p className="max-w-2xl text-lg text-gray">
              {copy.detailLede[locale]}
            </p>
          </div>

          <dl className="mt-12 divide-y divide-line border-y border-line">
            {copy.detail.items.map((item) => (
              <div
                key={item.title.en}
                className="grid gap-2 py-8 sm:grid-cols-12 sm:gap-8"
              >
                <dt className="flex flex-col gap-2 sm:col-span-5">
                  <span className="text-xs font-medium tracking-[0.18em] text-gold uppercase">
                    {item.meta?.[locale]}
                  </span>
                  <span className="text-lg font-semibold text-navy">
                    {item.title[locale]}
                  </span>
                </dt>
                <dd className="text-base text-gray sm:col-span-7">
                  {item.body[locale]}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      <RelatedServices
        services={services}
        leadSlug={copy.leadRelated}
        locale={locale}
      />

      <CrossLinks
        label={SERVICE_PAGE_COPY.crossLinksLabel[locale]}
        links={[
          {
            label: SERVICE_PAGE_COPY.crossLinksRoot[locale],
            href: '/about',
          },
          {
            label: SERVICE_PAGE_COPY.crossLinksServices[locale],
            href: '/services',
          },
        ]}
      />

      <InquiryCTA
        eyebrow={copy.cta.eyebrow[locale]}
        title={copy.cta.title[locale]}
        description={copy.cta.description[locale]}
        actionLabel={copy.cta.actionLabel[locale]}
        actionHref={copy.cta.actionHref}
        secondaryActionLabel={copy.cta.secondaryActionLabel[locale]}
        secondaryActionHref="/services"
        context={copy.inquiry.include.map((item) => item.title[locale])}
        contextLabel={SERVICE_PAGE_COPY.ctaContextLabel[locale]}
      />
    </>
  )
}