import { useLocale } from '../app/locale-context'
import { serviceIcon } from '../app/service-icons'
import { SERVICES } from '../app/services'
import { SERVICES_INDEX_COPY } from '../app/copy'
import { usePageTitle } from '../app/use-page-title'
import {
  Breadcrumbs,
  Container,
  InquiryCTA,
  SectionHeading,
  ServiceCard,
} from '../shared/components'

/**
 * Services overview: all five lines, each card linking to its own page.
 */
export function ServicesIndexPage() {
  const { locale } = useLocale()
  usePageTitle(SERVICES_INDEX_COPY.title[locale])

  const homeLabel = { en: 'Home', fa: 'خانه' }[locale]

  return (
    <>
      <section className="border-b border-line bg-off-white">
        <Container className="py-20 md:py-24">
          <Breadcrumbs
            items={[
              { label: homeLabel, href: '/' },
              { label: SERVICES_INDEX_COPY.title[locale] },
            ]}
          />

          <div className="reveal mt-10 flex max-w-3xl flex-col gap-6">
            <SectionHeading
              eyebrow={SERVICES_INDEX_COPY.eyebrow[locale]}
              title={SERVICES_INDEX_COPY.title[locale]}
              as="h1"
              lede={SERVICES_INDEX_COPY.lede[locale]}
            />
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-20 md:py-24">
          {/*
            3/2 split again, for the same reason as the homepage: five cards
            laid out as 3 + 2 read as a considered grid rather than an
            incomplete row.
          */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
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

      <InquiryCTA
        title={SERVICES_INDEX_COPY.cta.title[locale]}
        description={SERVICES_INDEX_COPY.cta.description[locale]}
        actionLabel={SERVICES_INDEX_COPY.cta.actionLabel[locale]}
      />
    </>
  )
}
