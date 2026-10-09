import { useEffect } from 'react'

import { useLocale } from './locale-context'
import { SITE_NAMES } from './site-names'
import { useBrand } from './brand-context'

/**
 * Sets the document title and optional meta description for the lifetime of
 * the calling page.
 *
 * The site is static, so there is no server to render a <title> or <meta name="description">;
 * every route sets its own on mount. Restoring on unmount keeps the title/description
 * from sticking to a page you have navigated away from.
 *
 * The brand comes from context rather than being passed in, so a page inside
 * VORTEX TRADE is titled "… — VORTEX TRADE" without knowing which brand it is
 * in. One implementation covers every branded site in the ecosystem.
 *
 * If a description is provided, the document's <meta name="description"> tag
 * (the static one in index.html, or one a previous page created) is updated in
 * place, and its previous content is restored on unmount. Deleting the tag
 * instead would strip index.html's own description from the document for every
 * page visited after the first one that set its own.
 */
export function usePageTitle(title?: string, description?: string) {
  const { locale } = useLocale()
  const brand = useBrand()

  useEffect(() => {
    // --- title ---
    const previousTitle = document.title
    document.title = title ? `${title} — ${SITE_NAMES[brand]}` : SITE_NAMES[brand]

    // --- description meta tag ---
    const existingMeta = document.querySelector<HTMLMetaElement>(
      'meta[name="description"]',
    )
    let createdMeta: HTMLMetaElement | null = null
    let previousDescription: string | null = null

    if (description) {
      if (existingMeta) {
        previousDescription = existingMeta.content
        existingMeta.setAttribute('content', description)
      } else {
        createdMeta = document.createElement('meta')
        createdMeta.name = 'description'
        createdMeta.content = description
        document.head.appendChild(createdMeta)
      }
    }

    return () => {
      document.title = previousTitle
      if (createdMeta) {
        document.head.removeChild(createdMeta)
      } else if (existingMeta && previousDescription !== null) {
        existingMeta.setAttribute('content', previousDescription)
      }
    }
  }, [title, description, locale, brand])
}