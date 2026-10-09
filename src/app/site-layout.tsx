import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

import { Footer } from '../shared/components/Footer'
import { SiteHeader } from '../shared/components/SiteHeader'
import { BrandProvider } from './brand-provider'
import { LocaleProvider } from './locale-provider'
import type { BrandId } from './brands'

/**
 * The parent-brand site chrome: header, main landmark, footer.
 *
 * Mounted once, outside the brand scope, because the header and footer belong
 * to the Holding brand itself — the Trade and Battery sites bring their own.
 * The brand still flows in here so a page can read it via useBrand().
 *
 * This layout does not mirror its brand onto <html>; TradeLayout does, and it
 * is the outermost element that covers the viewport. Clearing the attribute
 * here means navigating back from Trade lands on the holding's palette rather
 * than on whatever the previous brand left behind.
 */
export function SiteLayout({ brand }: { brand: BrandId }) {
  useEffect(() => {
    delete document.documentElement.dataset.brand
  }, [])

  return (
    <LocaleProvider>
      <BrandProvider brand={brand}>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:text-white"
        >
          Skip to content
        </a>

        <SiteHeader />

        <main id="main" className="flex-1">
          <Outlet />
        </main>

        <Footer />
      </BrandProvider>
    </LocaleProvider>
  )
}