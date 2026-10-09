import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { useLocale } from '../../app/locale-context'
import { A11Y_LABELS } from '../../app/copy'
import { BrandLogo } from './BrandLogo'
import { Container } from './Container'
import { LanguageSwitcher } from './LanguageSwitcher'
import { MainNavigation } from './MainNavigation'
import { MobileNavigation } from './MobileNavigation'
import { cn } from '../lib/cn'

/**
 * Site header: sticky, with a hairline bottom rule that appears once the page
 * scrolls. At the top of the page the rule would only add noise.
 */
export function SiteHeader() {
  const { locale } = useLocale()
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
        <div className="flex h-16 items-center justify-between gap-4 md:h-20">
          <Link to="/" aria-label={A11Y_LABELS.home[locale]}>
            <BrandLogo />
          </Link>

          <div className="flex items-center gap-2 md:gap-6">
            <MainNavigation />
            <LanguageSwitcher className="hidden md:inline-flex" />
            <MobileNavigation />
          </div>
        </div>
      </Container>
    </header>
  )
}