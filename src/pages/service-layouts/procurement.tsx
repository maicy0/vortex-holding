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
  SectionHeading,
  ServiceDescription,
  UseCasesSection,
} from '../../shared/components'
import { RelatedServices } from './shared'

/**
 * Procurement.
 *
 * This service is its own specification, so the page is organised like one:
 * the hero is two columns, the six-point specification comes before anything
 * else because it is the thing the page is actually for, and the values sheet
 * is the page's centre of gravity — minimum order quantity, price, lead time
 * and packaging are exactly the four figures a procurement buyer wants, and
 * exactly the four this holding has not stated.
 *
 * The inquiry section comes last of the body sections, so a reader who has
 * just read the specification arrives at "what to send" already knowing what
 * they are sending.
 *
 * Detail: `questions` plus the values sheet.
 */
export function ProcurementLayout({
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
      {/* Hero — navy, two columns, facts as a numbered strip ------------ */}
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

          <div className="reveal mt-10 flex max-w-3xl flex-col gap-6">
            <Icon aria-hidden className="size-8 text-gold" />

            <h1 className="display text-white">{copy.hero.title[locale]}</h1>

            <p className="max-w-2xl text-lg text-white/75">
              {copy.hero.lede[locale]}
            </p>
          </div>

          <ol className="mt-14 grid gap-px border border-white/15 bg-white/15 sm:grid-cols-3">
            {copy.hero.facts.map((fact, index) => (
              <li key={fact} className="flex flex-col gap-2 bg-navy px-7 py-6">
                <span className="text-xs font-medium tracking-[0.18em] text-gold tabular-nums">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <span className="text-sm text-white/80">{fact}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-16 md:py-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <ServiceDescription
                label={copy.descriptionLabel[locale]}
                body={copy.description[locale]}
              />
            </div>

            <div className="lg:col-span-5">
              <SectionHeading
                eyebrow={copy.audience.eyebrow[locale]}
                title={copy.audience.title[locale]}
              />

              <p className="mt-5 text-base text-gray">
                {copy.audience.lede[locale]}
              </p>

              <ul className="mt-8 flex flex-col gap-4 border-t border-line pt-8">
                {copy.audience.items.map((item) => (
                  <li key={item.title.en} className="flex gap-4">
                    <span
                      aria-hidden="true"
                      className="mt-2 h-px w-4 shrink-0 bg-gold"
                    />
                    <span className="text-sm text-gray">
                      <strong className="font-semibold text-navy">
                        {item.title[locale]}
                      </strong>{' '}
                      {item.body[locale]}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </section>

      {/* The specification, first among the body sections. */}
      <DetailSection
        label={copy.detailLabel[locale]}
        title={copy.detailTitle[locale]}
        lede={copy.detailLede[locale]}
        items={copy.detail.items.map((item) => ({
          title: item.title[locale],
          body: item.body[locale],
          meta: item.meta?.[locale],
        }))}
        kind="questions"
        detailedLabel={copy.detail.detailedLabel?.[locale]}
        detailedNote={SERVICE_PAGE_COPY.sheetNote[locale]}
        detailedList={copy.detail.detailedList?.map((item) => item[locale])}
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