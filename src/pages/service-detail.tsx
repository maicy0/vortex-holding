import { useParams } from 'react-router-dom'

import { NotFoundPage } from './not-found'
import { useLocale } from '../app/locale-context'
import { SERVICES, findService, type Service } from '../app/services'
import { findServicePage } from '../app/service-pages'
import { usePageTitle } from '../app/use-page-title'
import { BatteriesLayout } from './service-layouts/batteries'
import { ImportExportLayout } from './service-layouts/import-export'
import { ProcurementLayout } from './service-layouts/procurement'
import { RetailLayout } from './service-layouts/retail'
import { WholesaleLayout } from './service-layouts/wholesale'

/**
 * One service page, resolved from the slug in the URL.
 *
 * The route table keeps a single `/services/:slug` entry, because the five
 * routes are the same kind of page — they share the sections and the journey,
 * and what differs between them is copy. What is *not* shared is composition:
 * each service has its own layout module, so the five read as five pages rather
 * than one page filled in five times. See src/pages/service-layouts/.
 *
 * Adding a sixth line of business is a data change (src/app/services.ts and
 * src/app/service-pages.ts) plus one layout, rather than a new page from
 * scratch — which is the part worth keeping.
 *
 * An unknown slug renders the 404 page rather than redirecting, so a mistyped
 * URL reports the truth instead of silently landing on the homepage.
 */
export function ServiceDetailPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const service = findService(slug)

  if (!service) return <NotFoundPage />

  return <ServicePage service={service} />
}

/**
 * Title must be set by the page that resolved the service, so this is a
 * separate component rather than a conditional hook in the one above.
 */
function ServicePage({ service }: { service: Service }) {
  const { locale } = useLocale()

  usePageTitle(service.title[locale])

  const copy = findServicePage(service)

  // The other four, so a service page always offers a way onward.
  const siblings = SERVICES.filter((item) => item.slug !== service.slug)

  const props = { service, copy, locale, services: siblings }

  switch (service.slug) {
    case 'import-export':
      return <ImportExportLayout {...props} />
    case 'wholesale':
      return <WholesaleLayout {...props} />
    case 'retail':
      return <RetailLayout {...props} />
    case 'batteries':
      return <BatteriesLayout {...props} />
    case 'procurement':
      return <ProcurementLayout {...props} />
    default:
      // Every slug in SERVICES is handled above; reaching this means a service
      // was added without a layout, which should fail loudly rather than
      // rendering an empty page in production.
      throw new Error(`No service layout for slug "${service.slug}"`)
  }
}