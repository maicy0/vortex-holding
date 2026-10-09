import { Link } from 'react-router-dom'

import { useLocale } from '../../../app/locale-context'
import { TRADE_NAV, TRADE_PARENT_LINK } from '../../../app/trade-navigation'
import { LanguageSwitcher } from '../LanguageSwitcher'
import { Container } from '../Container'
import { TradeMark } from './TradeMark'

const CURRENT_YEAR = new Date().getFullYear()

/**
 * Footer for VORTEX TRADE.
 *
 * Holds no invented contact details: no phone numbers, emails or addresses
 * are rendered, because none have been supplied. Those slots are added when
 * real data is provided.
 *
 * Carries the parent-company link prominently — this is a business inside a
 * holding, and the way back to the group should be obvious from every page,
 * not only from the mark in the header.
 */
export function TradeFooter() {
  const { locale } = useLocale()
  const year = CURRENT_YEAR

  const columns = [
    {
      heading: { en: 'Services', fa: 'خدمات' },
      links: TRADE_NAV.filter((item) => item.href !== '/businesses/trade'),
    },
    {
      heading: { en: 'The group', fa: 'گروه' },
      links: [
        TRADE_PARENT_LINK,
        { href: '/about', label: { en: 'About the holding', fa: 'درباره هلدینگ' } },
        { href: '/services', label: { en: 'All holding services', fa: 'همه خدمات هلدینگ' } },
      ],
    },
  ]

  return (
    <footer className="border-t border-line bg-off-white">
      <Container size="wide" className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.5fr_1fr_1fr] md:gap-8">
          <div className="flex flex-col gap-4">
            <TradeMark />
            <p className="max-w-sm text-sm text-gray">
              {locale === 'fa'
                ? 'بازرگانی، تأمین کالا و واردات و صادرات.'
                : 'Trade, goods supply, import and export.'}
            </p>
          </div>

          {columns.map((column) => (
            <nav key={column.heading.en} aria-label={column.heading.en}>
              <h2 className="text-[0.6875rem] font-medium tracking-[0.14em] text-navy uppercase">
                {column.heading[locale]}
              </h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {column.links.map((item) => (
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
          ))}
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-4 border-t border-line pt-6 sm:flex-row sm:items-center">
          <p className="text-xs text-gray">
            © {year} VORTEX TRADE
          </p>
          <LanguageSwitcher />
        </div>
      </Container>
    </footer>
  )
}