import { Link } from 'react-router-dom'

import { SERVICE_PAGE_COPY } from '../../app/copy'
import type { Service } from '../../app/services'
import { serviceIcon } from '../../app/service-icons'
import { ServiceCard } from '../../shared/components'

/**
 * The other four services.
 *
 * The lead service — the one each page is most often confused with, or the
 * natural next step from it — is stated per service in service-pages.ts and
 * comes first, so the related grid makes a recommendation rather than just
 * enumerating whatever is left over. The remaining three follow in the order
 * they appear on the services index.
 */
export function RelatedServices({
  services,
  leadSlug,
  locale,
}: {
  services: Service[]
  leadSlug: string
  locale: 'en' | 'fa'
}) {
  const lead = services.find((service) => service.slug === leadSlug)
  const rest = services.filter((service) => service.slug !== leadSlug)
  const ordered = lead ? [lead, ...rest] : rest

  return (
    <section className="border-t border-line bg-off-white">
      <div className="mx-auto w-full max-w-6xl px-5 py-20 sm:px-8 md:py-24">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-4">
            <p className="flex items-center gap-3 text-xs font-medium tracking-[0.18em] text-gold uppercase">
              <span aria-hidden="true" className="block h-px w-8 bg-gold" />
              {SERVICE_PAGE_COPY.relatedEyebrow[locale]}
            </p>
            <h2 className="title text-navy">
              {SERVICE_PAGE_COPY.relatedTitle[locale]}
            </h2>
          </div>

          <Link
            to="/services"
            className="text-sm text-navy underline underline-offset-4 transition-colors hover:text-navy-primary"
          >
            {SERVICE_PAGE_COPY.servicesIndexLabel[locale]}
          </Link>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {ordered.map((service) => (
            <ServiceCard
              key={service.slug}
              href={service.path}
              title={service.title[locale]}
              description={service.summary[locale]}
              icon={serviceIcon(service.icon)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}