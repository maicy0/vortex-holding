import { Link } from 'react-router-dom'

import { useLocale } from '../../../app/locale-context'
import { tradeServiceIcon } from '../../../app/trade-icons'
import type { TradeService } from '../../../app/trade-services'
import { cn } from '../../lib/cn'

/**
 * The four commercial lines, as a structured grid.
 *
 * Used on the Trade homepage, where each service is one cell of a numbered
 * grid, and again on the services page, where each is a full-width section —
 * so the two render from one entry in TRADE_SERVICES and cannot drift apart.
 *
 * `numbered` is on for both registers: a number in the corner is the clearest
 * possible way to signal "this is a set of four things", and it is the same
 * device the holding site uses on its service pages.
 */
export function TradeServiceGrid({
  services,
  numbered = true,
  className,
}: {
  services: TradeService[]
  numbered?: boolean
  className?: string
}) {
  const { locale } = useLocale()

  return (
    <ul className={cn('grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4', className)}>
      {services.map((service) => {
        const Icon = tradeServiceIcon(service.icon)

        return (
          <li key={service.slug} className="bg-white">
            <Link
              to={`${service.href}#${service.anchor}`}
              className="group flex h-full flex-col gap-4 p-7 transition-colors hover:bg-off-white"
            >
              <div className="flex items-start justify-between gap-4">
                <Icon aria-hidden className="size-6 text-gold" />
                {numbered && (
                  <span className="font-editorial text-sm text-blue-muted">
                    {service.number}
                  </span>
                )}
              </div>

              <h3 className="title text-[1.375rem] text-navy">
                {service.title[locale]}
              </h3>

              <p className="text-sm leading-relaxed text-gray">
                {service.summary[locale]}
              </p>

              <span
                aria-hidden="true"
                className="mt-auto block h-px w-8 bg-line transition-colors group-hover:bg-gold"
              />
            </Link>
          </li>
        )
      })}
    </ul>
  )
}