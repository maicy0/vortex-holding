import { Link } from 'react-router-dom'

import { TRADE_PARENT_LINK } from '../../../app/trade-navigation'
import { useLocale } from '../../../app/locale-context'
import { cn } from '../../lib/cn'

/**
 * The Trade wordmark.
 *
 * Its own mark rather than the holding's gold monogram: VORTEX TRADE is an
 * independently branded business, and carrying the parent's mark would say it
 * is a department of the parent rather than a company in the same group. What
 * it does share is the name — the V is the same monogram, rendered in copper
 * and graphite.
 *
 * The label beneath the wordmark is the parent company's name, and is a link
 * back to it. That is the required way out of this brand, so it lives on the
 * mark itself — the one element present in the header of every Trade page —
 * rather than being left to the footer.
 */
export function TradeMark({
  tone = 'dark',
  className,
}: {
  tone?: 'dark' | 'light'
  className?: string
}) {
  const { locale } = useLocale()
  const isLight = tone === 'light'

  return (
    <Link
      to={TRADE_PARENT_LINK.href}
      className={cn(
        'group inline-flex flex-col gap-1.5',
        className,
      )}
    >
      <span className="flex items-center gap-3">
        <svg
          viewBox="0 0 32 32"
          aria-hidden="true"
          className="size-7 shrink-0"
          fill="none"
        >
          <path
            d="M5 6h5.6L16 19.6 21.4 6H27L18.6 27h-5.2L5 6Z"
            className="fill-gold"
          />
          <path
            d="M22.4 6H27l-3.6 9.2-2.2-3.6L22.4 6Z"
            className={isLight ? 'fill-white/25' : 'fill-navy'}
          />
        </svg>

        <span
          className={cn(
            'text-base leading-none font-medium tracking-[0.22em]',
            isLight ? 'text-white' : 'text-navy',
          )}
        >
          VORTEX TRADE
        </span>
      </span>

      {/* A Vortex Holding company. The rule is the group's mark, not Trade's
          accent — it stays neutral grey so it reads as a qualifier. */}
      <span
        className={cn(
          'flex items-center gap-2 text-[0.6875rem] leading-none tracking-[0.08em]',
          isLight ? 'text-white/50' : 'text-gray',
        )}
      >
        <span
          aria-hidden="true"
          className={cn('block h-px w-4', isLight ? 'bg-white/25' : 'bg-line')}
        />
        {locale === 'fa' ? 'یک شرکت از هلدینگ ورتکس' : 'A Vortex Holding company'}
      </span>
    </Link>
  )
}