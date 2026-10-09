import { Link } from 'react-router-dom'

import { useLocale } from '../../../app/locale-context'
import { BATTERY_CHROME } from '../../../app/battery-copy'
import { BATTERY_NAV, BATTERY_PARENT_LINK } from '../../../app/battery-navigation'
import { Container } from '../Container'
import { LanguageSwitcher } from '../LanguageSwitcher'
import { BatteryMark } from './BatteryMark'

const CURRENT_YEAR = new Date().getFullYear()

/**
 * Footer for VORTEX BATTERY.
 *
 * Laid out as a specification panel rather than as link columns, because that is
 * what the rest of this brand looks like: the parent link sits beside a short
 * data block, and the column of destinations is a single quiet row. A three
 * column link farm would be the holding's footer with new colours, which is
 * precisely what this brand is not supposed to be.
 *
 * Holds no invented contact details: no phone numbers, emails or addresses are
 * rendered, because none have been supplied. Those slots are added when real
 * data is provided.
 */
export function BatteryFooter() {
  const { locale } = useLocale()
  const year = CURRENT_YEAR

  const columns = [
    {
      heading: { en: 'Catalogue', fa: 'کاتالوگ' },
      links: BATTERY_NAV.filter(
        (item) => item.href !== '/businesses/batteries',
      ),
    },
    {
      heading: { en: 'The group', fa: 'گروه' },
      links: [
        BATTERY_PARENT_LINK,
        { href: '/about', label: { en: 'About the holding', fa: 'درباره هلدینگ' } },
        {
          href: '/services',
          label: { en: 'All holding services', fa: 'همه خدمات هلدینگ' },
        },
      ],
    },
  ]

  return (
    <footer className="bg-navy text-white">
      <Container size="wide" className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr] md:gap-8">
          <div className="flex flex-col gap-5">
            <BatteryMark tone="light" />

            {/*
              A small data block rather than a description sentence: this is a
              technical brand, so it signs off with the facts a reader of a
              datasheet would want, not with a marketing paragraph.
            */}
            <dl className="grid grid-cols-2 gap-x-6 gap-y-3 border-t border-white/10 pt-5">
              <div>
                <dt className="battery-mono text-[0.625rem] tracking-[0.14em] text-white/40 uppercase">
                  {BATTERY_CHROME.footerFacts.siteLabel[locale]}
                </dt>
                <dd className="mt-1.5 text-sm text-white/70">
                  {BATTERY_CHROME.footerFacts.siteValue[locale]}
                </dd>
              </div>
              <div>
                <dt className="battery-mono text-[0.625rem] tracking-[0.14em] text-white/40 uppercase">
                  {BATTERY_CHROME.footerFacts.catalogueLabel[locale]}
                </dt>
                <dd className="mt-1.5 text-sm text-white/70">
                  {BATTERY_CHROME.footerFacts.catalogueValue[locale]}
                </dd>
              </div>
            </dl>
          </div>

          {columns.map((column) => (
            <nav key={column.heading.en} aria-label={column.heading.en}>
              <h2 className="battery-mono text-[0.625rem] font-medium tracking-[0.14em] text-white/40 uppercase">
                {column.heading[locale]}
              </h2>
              <ul className="mt-4 flex flex-col gap-2.5">
                {column.links.map((item) => (
                  <li key={item.href}>
                    <Link
                      to={item.href}
                      className="text-sm text-white/70 transition-colors hover:text-white"
                    >
                      {item.label[locale]}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col-reverse items-start justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
          <p className="battery-mono text-xs text-white/40">
            © {year} VORTEX BATTERY
          </p>
          <LanguageSwitcher />
        </div>
      </Container>
    </footer>
  )
}