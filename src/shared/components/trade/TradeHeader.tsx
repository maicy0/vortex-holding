import { useEffect, useState } from 'react'

import { LanguageSwitcher } from '../LanguageSwitcher'
import { Container } from '../Container'
import { cn } from '../../lib/cn'
import { TradeMark } from './TradeMark'
import { TradeMobileNavigation, TradeNavigation } from './TradeNavigation'

/**
 * Header for VORTEX TRADE.
 *
 * Structurally the same idea as the holding site's SiteHeader — sticky, with a
 * hairline that appears once the page scrolls — but built from Trade's own
 * parts and set inside a Container. It is a separate component rather than a
 * themed SiteHeader because the two headers differ in type, mark, navigation
 * register and breakpoint, and pretending otherwise would mean a props bag of
 * conditionals on one component.
 *
 * Every page in the brand is inside the brand scope, so the colours here come
 * from the trade palette with no `data-brand` branch.
 */
export function TradeHeader() {
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
        'sticky top-0 z-30 bg-white/95 backdrop-blur-sm transition-shadow duration-200',
        scrolled ? 'border-b border-line' : 'border-b border-transparent',
      )}
    >
      <Container size="wide">
        <div className="flex h-16 items-center justify-between gap-4 lg:h-20">
          <TradeMark />

          <div className="flex items-center gap-2 lg:gap-8">
            <TradeNavigation />
            <LanguageSwitcher className="hidden lg:inline-flex" />
            <TradeMobileNavigation />
          </div>
        </div>
      </Container>
    </header>
  )
}