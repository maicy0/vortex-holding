import { Link } from 'react-router-dom'

import { SITE_NAMES } from '../../app/site-names'
import { SERVICE_PAGE_COPY } from '../../app/copy'
import type { Locale } from '../../app/locale'
import type { Service } from '../../app/services'
import { serviceIcon } from '../../app/service-icons'
import type { ServicePageCopy } from '../../app/service-pages'
import {
  AudienceSection,
  Breadcrumbs,
  Container,
  CrossLinks,
  DetailSection,
  InquiryCTA,
  InquirySection,
  SectionHeading,
  ServiceDescription,
} from '../../shared/components'
import { RelatedServices } from './shared'

/**
 * Batteries.
 *
 * The only product line rather than a service, so it is the only page that
 * points somewhere else entirely: the holding-level page introduces the
 * category, but the questions go to the dedicated battery business at /battery.
 * That link sits in the hero, because arriving here and being sent to /battery
 * is the likeliest outcome of arriving here at all.
 *
 * The photo is the batteries themselves. On every other service page an image
 * would compete with the copy; here it is the category.
 *
 * Detail: `questions` plus the values sheet — a parameter grid to work through,
 * not a list to read.
 */
export function BatteriesLayout({
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
      {/* Hero — photograph left, type right ----------------------------- */}
      <section className="border-b border-line bg-white">
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

          <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="flex flex-col gap-6 lg:col-span-7">
              <Icon aria-hidden className="size-8 text-navy-primary" />

              <h1 className="display text-navy">{copy.hero.title[locale]}</h1>

              <p className="max-w-2xl text-lg text-gray">{copy.hero.lede[locale]}</p>

              {/* The dedicated business: this page introduces the category,
                  that site is where the questions are answered. */}
              <p className="mt-2 border-s-2 border-gold ps-4 text-sm text-blue-muted">
                {BATTERY_SITE_NOTE[locale]}{' '}
                <Link
                  to="/battery"
                  className="text-navy underline underline-offset-4 transition-colors hover:text-navy-primary"
                >
                  {SITE_NAMES.battery}
                </Link>
              </p>
            </div>

            {/* The category itself. Decorative: it illustrates batteries and
                the copy beside it carries the meaning. */}
            <div className="lg:col-span-5">
              <picture>
                <source srcSet="/images/battery-cells.webp" type="image/webp" />
                <img
                  src="/images/battery-cells.jpg"
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="aspect-[4/3] w-full border border-line object-cover"
                />
              </picture>

              <ul className="mt-5 flex flex-col gap-3">
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
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-16 md:py-20">
          <ServiceDescription
            label={copy.descriptionLabel[locale]}
            body={copy.description[locale]}
          />
        </Container>
      </section>

      {/* Five customer types — the only page with five, because a cell buyer
          and a storage buyer arrive with different problems. */}
      <AudienceSection
        eyebrow={copy.audience.eyebrow[locale]}
        title={copy.audience.title[locale]}
        lede={copy.audience.lede[locale]}
        items={copy.audience.items.map((item) => ({
          title: item.title[locale],
          body: item.body[locale],
        }))}
      />

      {/* The technical questions, set as questions rather than numbered. */}
      <section className="border-t border-line bg-off-white">
        <Container className="py-20 md:py-24">
          <SectionHeading
            eyebrow={copy.useCases.eyebrow[locale]}
            title={copy.useCases.title[locale]}
          />

          <ul className="mt-14 grid gap-8 md:grid-cols-2">
            {copy.useCases.items.map((item) => (
              <li key={item.title.en} className="border-t border-line pt-6">
                <h3 className="text-lg font-semibold text-navy">
                  {item.title[locale]}
                </h3>
                <p className="mt-2 text-base text-gray">{item.body[locale]}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

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
          {
            label: SITE_NAMES.battery,
            href: '/battery',
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
        secondaryActionHref="/battery"
        context={copy.inquiry.include.map((item) => item.title[locale])}
        contextLabel={SERVICE_PAGE_COPY.ctaContextLabel[locale]}
      />
    </>
  )
}

const BATTERY_SITE_NOTE = {
  en: 'Technical questions are answered by',
  fa: 'پرسش‌های فنی پاسخ داده می‌شود توسط',
} as const