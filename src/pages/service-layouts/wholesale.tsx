import { SERVICE_PAGE_COPY } from '../../app/copy'
import type { Locale } from '../../app/locale'
import type { Service } from '../../app/services'
import { serviceIcon } from '../../app/service-icons'
import type { ServicePageCopy } from '../../app/service-pages'
import {
  Breadcrumbs,
  Container,
  CrossLinks,
  DetailSection,
  InquiryCTA,
  InquirySection,
  ServiceDescription,
  UseCasesSection,
} from '../../shared/components'
import { RelatedServices } from './shared'

/**
 * Wholesale.
 *
 * The journey is commercial and repeats, so this page is built to be reused:
 * the hero is navy, the commercial terms come before the inquiry section
 * rather than after it, and that terms section carries the values sheet — the
 * one place on this page a figure would normally sit, and the one place this
 * holding has none to print yet.
 *
 * Detail: `capabilities` plus the values sheet.
 */
export function WholesaleLayout({
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
      {/* Hero — navy, so the page opens differently from its siblings ---- */}
      <section className="bg-navy text-white">
        <Container className="py-16 md:py-20">
          <Breadcrumbs
            tone="light"
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
              <Icon aria-hidden className="size-8 text-gold" />

              <h1 className="display text-white">{copy.hero.title[locale]}</h1>

              <p className="max-w-2xl text-lg text-white/75">
                {copy.hero.lede[locale]}
              </p>
            </div>

            {/* Facts sit on their own panel, hairline-ruled on navy. */}
            <ul className="flex flex-col gap-4 self-start border border-white/15 p-7 lg:col-span-5">
              <li className="text-xs font-medium tracking-[0.18em] text-white/50 uppercase">
                {SERVICE_PAGE_COPY.atAGlance[locale]}
              </li>
              {copy.hero.facts.map((fact) => (
                <li key={fact} className="text-sm text-white/80">
                  {fact}
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      {/* Description sits on its own full-width band, below the fold edge. */}
      <section className="bg-white">
        <Container className="py-16 md:py-20">
          <ServiceDescription
            label={copy.descriptionLabel[locale]}
            body={copy.description[locale]}
          />
        </Container>
      </section>

      {/* The four buyer types, as a full-width row of four. */}
      <section className="border-t border-line bg-off-white">
        <Container className="py-20 md:py-24">
          <div className="flex flex-col gap-4">
            <p className="flex items-center gap-3 text-xs font-medium tracking-[0.18em] text-gold uppercase">
              <span aria-hidden="true" className="block h-px w-8 bg-gold" />
              {copy.audience.eyebrow[locale]}
            </p>
            <h2 className="title text-navy">{copy.audience.title[locale]}</h2>
            <p className="max-w-2xl text-lg text-gray">
              {copy.audience.lede[locale]}
            </p>
          </div>

          <ul className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {copy.audience.items.map((item) => (
              <li key={item.title.en} className="flex flex-col gap-2 bg-off-white p-7">
                <h3 className="text-base font-semibold text-navy">
                  {item.title[locale]}
                </h3>
                <p className="text-sm text-gray">{item.body[locale]}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Use cases on navy — the third context on the page, in sequence. */}
      <UseCasesSection
        eyebrow={copy.useCases.eyebrow[locale]}
        title={copy.useCases.title[locale]}
        items={copy.useCases.items.map((item) => ({
          title: item.title[locale],
          body: item.body[locale],
        }))}
        onDark
        className="py-20 md:py-24"
      />

      {/* Commercial terms first: this is what a wholesale buyer came for. */}
      <DetailSection
        label={copy.detailLabel[locale]}
        title={copy.detailTitle[locale]}
        lede={copy.detailLede[locale]}
        items={copy.detail.items.map((item) => ({
          title: item.title[locale],
          body: item.body[locale],
          meta: item.meta?.[locale],
        }))}
        detailedLabel={copy.detail.detailedLabel?.[locale]}
        detailedNote={SERVICE_PAGE_COPY.sheetNote[locale]}
        detailedList={copy.detail.detailedList?.map((item) => item[locale])}
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

      <RelatedServices
        services={services}
        leadSlug={copy.leadRelated}
        locale={locale}
      />

      <CrossLinks
        label={SERVICE_PAGE_COPY.crossLinksLabel[locale]}
        links={[
          { label: SERVICE_PAGE_COPY.crossLinksRoot[locale], href: '/about' },
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