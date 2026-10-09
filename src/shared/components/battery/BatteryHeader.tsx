import { useEffect, useState } from 'react'

import { cn } from '../../lib/cn'
import { LanguageSwitcher } from '../LanguageSwitcher'
import { Container } from '../Container'
import { BatteryMark } from './BatteryMark'
import { BatteryMobileNavigation, BatteryNavigation } from './BatteryNavigation'

/**
 * Header for VORTEX BATTERY.
 *
 * The one structural difference that makes this brand distinguishable from a
 * recoloured Trade: the bar is a fixed dark rail rather than a paper header
 * that the page scrolls under. It is deliberate, not decorative — a catalogue
 * navigation stays put while a visitor filters through it, which is exactly
 * what a paper header cannot do.
 *
 * Because the bar is dark, the wordmark is on the dark ground and the desktop
 * links are white on navy. White on the battery navy is 17.3:1; the accent
 * cyan is reserved for the active-page rule and never carries text here, for
 * the reason documented in global.css.
 */
export function BatteryHeader() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={cn(
        'sticky top-0 z-30 bg-navy text-white transition-shadow duration-200',
        scrolled
          ? 'shadow-[0_1px_0_0_rgb(255_255_255/0.12)]'
          : 'border-b border-white/10',
      )}
    >
      <Container size="wide">
        <div className="flex h-16 items-center justify-between gap-4 lg:h-20">
          <BatteryMark tone="light" />

          <div className="flex items-center gap-2 lg:gap-6">
            <BatteryNavigation />
            {/* tone="light": the header ground is navy, so the dark-tone
                active state (bg-navy) and its navy hover would be invisible. */}
            <LanguageSwitcher tone="light" className="hidden lg:inline-flex" />
            <BatteryMobileNavigation />
          </div>
        </div>
      </Container>
    </header>
  )
}