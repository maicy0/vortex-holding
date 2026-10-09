import { Link } from 'react-router-dom'

import { useLocale } from '../../app/locale-context'
import { A11Y_LABELS } from '../../app/copy'
import { ECOSYSTEM_ITEMS, NAV_ITEMS } from '../../app/navigation'
import { BrandLogo } from './BrandLogo'
import { Container } from './Container'
import { LanguageSwitcher } from './LanguageSwitcher'

const CURRENT_YEAR = new Date().getFullYear()

/**
 * Site footer.
 *
 * Holds no invented contact details: no phone numbers, emails or addresses are
 * rendered, because none have been supplied. Those slots are added when real
 * data is provided.
 */
export function Footer({ className }: { className?: string }) {
  const { locale } = useLocale()
  // Read once at module load: a copyright year that cannot change mid-session,
  // and calling Date() during render is not stable.
  const year = CURRENT_YEAR

  return (
    <footer className={className}>
      <Container className="border-t border-line py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr] md:gap-8">
          <div className="flex flex-col gap-4">
            <BrandLogo withRule />
            <p className="max-w-sm text-sm text-gray">
              {locale === 'fa'
                ? 'یک شرکت هلدینگ چندشاخه.'
                : 'A diversified business holding company.'}
            </p>
          </div>

          <nav aria-label={A11Y_LABELS.footerNav[locale]}>
            <h2 className="text-xs font-medium tracking-[0.12em] text-navy uppercase">
              {locale === 'fa' ? 'ناوبری' : 'Navigation'}
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-gray transition-colors hover:text-navy"
                  >
                    {item.label[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label={A11Y_LABELS.ecosystem[locale]}>
            <h2 className="text-xs font-medium tracking-[0.12em] text-navy uppercase">
              {locale === 'fa' ? 'برندها' : 'Ecosystem'}
            </h2>
            <ul className="mt-4 flex flex-col gap-2.5">
              {ECOSYSTEM_ITEMS.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-gray transition-colors hover:text-navy"
                  >
                    {item.label[locale]}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-gray">
            © {year} VORTEX Holding
          </p>
          <LanguageSwitcher />
        </div>
      </Container>
    </footer>
  )
}