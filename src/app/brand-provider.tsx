import { useEffect } from 'react'

import type { BrandId } from './brands'
import { BrandContext } from './brand-context'

/**
 * Scopes a subtree to one of the ecosystem's brands. Design tokens live in
 * src/styles/global.css; this only sets the hook the CSS keys off.
 *
 * The brand is also mirrored onto <html>. The base styles set `background-color`
 * and `color` on <body>, and <body> is an ancestor of every brand wrapper — so
 * without this a Trade page would render its sections in the trade palette on
 * a holding-navy-on-white page ground, and overscroll past the end of the page
 * would flash white instead of the brand's own surface. Exactly one brand is
 * active at a time, so mirroring cannot conflict with itself.
 */
export function BrandProvider({
  brand,
  children,
}: {
  brand: BrandId
  children: React.ReactNode
}) {
  useDocumentBrand(brand)

  return (
    <BrandContext.Provider value={brand}>
      <div data-brand={brand} className="flex min-h-dvh flex-col">
        {children}
      </div>
    </BrandContext.Provider>
  )
}

/**
 * Keeps <html data-brand> in sync with the mounted brand.
 *
 * Nothing is restored on unmount, deliberately. A route change unmounts one
 * brand and mounts another in the same commit, and React runs the outgoing
 * cleanup after the incoming effect — so restoring the previous value here
 * would leave <html> pointing at the old brand after every navigation between
 * brands. The next brand to mount overwrites it, so there is no intermediate
 * state worth preserving. `SiteLayout` does not mirror at all (its wrapper
 * already supplies the ground and the wrapper is <main>'s ancestor), so
 * navigating from Trade back to the holding clears the attribute rather than
 * writing a new one.
 */
function useDocumentBrand(brand: BrandId) {
  useEffect(() => {
    document.documentElement.dataset.brand = brand
  }, [brand])
}