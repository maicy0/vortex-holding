import { Info } from 'lucide-react'

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
 * Retail.
 *
 * The journey is a single question from one person, so this page is the
 * quietest of the five: no strip, no hero facts, description first and the
 * customer types as a short list rather than a grid.
 *
 * Its distinguishing section is the honesty notice. Retail is the service where
 * a visitor is most likely to expect a shop, so what this site is and is not —
 * no basket, no checkout, no transmission — is stated before anything else
 * rather than discovered at the point of paying.
 *
 * Detail: `capabilities`, no values sheet. Nothing here is quoted per inquiry.
 */
export function RetailLayout({
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
      {/* Hero — white, no facts strip: this service has no at-a-glance ---- */}
      <section className="bg-white">
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

          <div className="reveal mt-10 flex max-w-3xl flex-col gap-6">
            <Icon aria-hidden className="size-8 text-navy-primary" />

            <h1 className="display text-navy">{copy.hero.title[locale]}</h1>

            <p className="max-w-2xl text-lg text-gray">{copy.hero.lede[locale]}</p>
          </div>
        </Container>
      </section>

      {/* Description and the honesty notice, side by side. The notice is
          first in the DOM so it is read first. */}
      <section className="border-y border-line bg-off-white">
        <Container className="py-16 md:py-20">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-7">
              <ServiceDescription
                label={copy.descriptionLabel[locale]}
                body={copy.description[locale]}
              />
            </div>

            <aside className="lg:col-span-5">
              <div className="border border-line bg-white p-8">
                <Info
                  aria-hidden
                  className="size-6 text-navy-primary"
                />

                <h2 className="mt-5 text-lg font-semibold text-navy">
                  {NOTICE[locale].title}
                </h2>

                <ul className="mt-5 flex flex-col gap-3">
                  {NOTICE[locale].points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-3 text-sm text-gray"
                    >
                      <span
                        aria-hidden="true"
                        className="mt-2 h-px w-3 shrink-0 bg-gold"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </Container>
      </section>

      {/* Who this is for — a hairline list, not a grid of four boxes. */}
      <section className="bg-white">
        <Container className="py-20 md:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <SectionHeading
                eyebrow={copy.audience.eyebrow[locale]}
                title={copy.audience.title[locale]}
              />
            </div>

            <div className="lg:col-span-8">
              <p className="text-lg text-gray">{copy.audience.lede[locale]}</p>

              <dl className="mt-8 divide-y divide-line border-y border-line">
                {copy.audience.items.map((item) => (
                  <div
                    key={item.title.en}
                    className="grid gap-1 py-6 sm:grid-cols-12 sm:gap-6"
                  >
                    <dt className="text-base font-semibold text-navy sm:col-span-4">
                      {item.title[locale]}
                    </dt>
                    <dd className="text-base text-gray sm:col-span-8">
                      {item.body[locale]}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </Container>
      </section>

      {/* The questions themselves, rendered as the questions people send. */}
      <UseCasesSection
        eyebrow={copy.useCases.eyebrow[locale]}
        title={copy.useCases.title[locale]}
        items={copy.useCases.items.map((item) => ({
          title: item.title[locale],
          body: item.body[locale],
        }))}
        className="border-t border-line py-20 md:py-24"
      />

      <DetailSection
        label={copy.detailLabel[locale]}
        title={copy.detailTitle[locale]}
        lede={copy.detailLede[locale]}
        items={copy.detail.items.map((item) => ({
          title: item.title[locale],
          body: item.body[locale],
          meta: item.meta?.[locale],
        }))}
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

/**
 * What this page is not, stated up front.
 *
 * Retail is the service where a visitor is most likely to arrive expecting a
 * shop and to be disappointed there is no checkout, so the absence is stated
 * on the page rather than left to be discovered at the point of paying. It
 * sits next to the description, which is where a reader looking for that
 * assurance will look.
 */
const NOTICE = {
  en: {
    title: 'Before you buy',
    points: [
      'There is no basket and no online checkout on this website.',
      'Every purchase begins as a message and is completed with us directly.',
      'The contact form is a front-end demonstration and transmits nothing.',
    ],
  },
  fa: {
    title: 'پیش از خرید',
    points: [
      'در این وب‌سایت سبد خرید و پرداخت آنلاینی وجود ندارد.',
      'هر خرید با یک پیام آغاز می‌شود و مستقیماً با ما نهایی می‌گردد.',
      'فرم تماس یک نسخه نمایشی است و چیزی ارسال نمی‌کند.',
    ],
  },
} as const