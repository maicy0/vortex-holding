import { Outlet } from 'react-router-dom'

import { TradeFooter } from '../shared/components/trade/TradeFooter'
import { TradeHeader } from '../shared/components/trade/TradeHeader'
import { BrandProvider } from './brand-provider'
import { LocaleProvider } from './locale-provider'

/**
 * The VORTEX TRADE site chrome.
 *
 * A sibling of SiteLayout, not a variant of it: the two brands differ in
 * typography, mark, navigation register, colour and the set of components that
 * make up the header and footer, and there is no meaningful subset of
 * SiteLayout's props left once those differ. Sharing the structure — a locale
 * provider, a brand scope, a skip link, header / main / footer — keeps the
 * parallel visible without forcing the differences through a props bag.
 *
 * Mounting the brand scope here rather than in a separate BrandLayout means
 * the palette, the display typeface and the RTL behaviour all key off one
 * `data-brand="trade"` element on the route's own subtree. Nothing in the Trade
 * site has to know its pathname, so there are no route-string conditionals
 * anywhere in the brand.
 *
 * LocaleProvider is nested inside so that a Trade page can never disagree with
 * the surrounding document about direction — the whole document shares one
 * `lang`/`dir`, whatever brand is mounted.
 */
export function TradeLayout() {
  return (
    <LocaleProvider>
      <BrandProvider brand="trade">
        {/*
          An opaque ground on this layout's own wrapper. The base styles leave
          <body> transparent so a brand's colour cannot bleed onto the page
          ground from outside its scope; something inside the scope has to
          paint it, and here that is this div — so overscroll past the footer
          shows warm white rather than the browser's default white.
        */}
        <div className="flex min-h-dvh flex-col bg-white">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:text-white"
          >
            Skip to content
          </a>

        <TradeHeader />

          <main id="main" className="flex-1">
            <Outlet />
          </main>

          <TradeFooter />
        </div>
      </BrandProvider>
    </LocaleProvider>
  )
}