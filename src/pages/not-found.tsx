import { useLocale } from '../app/locale-context'
import { NOT_FOUND_COPY } from '../app/copy'
import { usePageTitle } from '../app/use-page-title'
import { Breadcrumbs, ButtonLink, Container } from '../shared/components'

/**
 * Catch-all 404.
 *
 * Reached both from a genuinely unknown URL and from an unrecognised service
 * slug, so it offers the two destinations a lost visitor most likely wants.
 */
export function NotFoundPage() {
  const { locale } = useLocale()
  usePageTitle(NOT_FOUND_COPY.title[locale])

  return (
    <Container size="narrow" className="py-24 md:py-32">
      <Breadcrumbs items={[{ label: NOT_FOUND_COPY.breadcrumb[locale] }]} />

      <p className="mt-10 text-xs font-medium tracking-[0.18em] text-gold uppercase">
        404
      </p>

      <h1 className="display mt-4 text-navy">{NOT_FOUND_COPY.title[locale]}</h1>

      <p className="mt-6 text-lg text-gray">{NOT_FOUND_COPY.body[locale]}</p>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <ButtonLink to="/">{NOT_FOUND_COPY.action[locale]}</ButtonLink>
        <ButtonLink to="/services" variant="secondary">
          {NOT_FOUND_COPY.servicesAction[locale]}
        </ButtonLink>
      </div>
    </Container>
  )
}
