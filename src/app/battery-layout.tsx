import { Outlet } from 'react-router-dom'

import { BatteryFooter } from '../shared/components/battery/BatteryFooter'
import { BatteryHeader } from '../shared/components/battery/BatteryHeader'
import { BrandProvider } from './brand-provider'
import { LocaleProvider } from './locale-provider'

/**
 * The VORTEX BATTERY site chrome.
 *
 * A third sibling of SiteLayout and TradeLayout, and the reason it is a sibling
 * rather than another value of a shared component: this brand's header is a
 * fixed dark bar rather than a paper one, its mark is a technical lockup rather
 * than a monogram with a qualifier, its navigation carries a search affordance
 * and its footer is a compact spec panel rather than link columns. Every part
 * of the chrome differs in structure, not only in colour.
 *
 * Mounting the brand scope here means the palette, the display typeface and the
 * catalogue's demonstration labelling all key off one `data-brand="battery"`
 * element on this route's own subtree. Nothing in the Battery site checks its
 * own pathname, so there are no route-string conditionals anywhere in the
 * brand — including in the catalogue, whose filtering is driven by component
 * state and its data rather than by the URL.
 *
 * LocaleProvider is nested inside so a Battery page can never disagree with the
 * surrounding document about direction.
 */
export function BatteryLayout() {
  return (
    <LocaleProvider>
      <BrandProvider brand="battery">
        {/*
          An opaque ground on this layout's own wrapper. The base styles leave
          <body> transparent so one brand's colour cannot bleed onto the page
          ground from outside its scope; something inside the scope has to
          paint it, and here that is this div — so overscroll past the footer
          shows the brand's own surface.
        */}
        <div className="flex min-h-dvh flex-col bg-white">
          <a
            href="#main"
            className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:bg-navy focus:px-4 focus:py-2 focus:text-sm focus:text-white"
          >
            Skip to content
          </a>

          <BatteryHeader />

          <main id="main" className="flex-1">
            <Outlet />
          </main>

          <BatteryFooter />
        </div>
      </BrandProvider>
    </LocaleProvider>
  )
}