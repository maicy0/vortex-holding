import { Link } from 'react-router-dom'

import { useLocale } from '../../../app/locale-context'
import { BATTERY_CHROME } from '../../../app/battery-copy'
import { BATTERY_PARENT_LINK } from '../../../app/battery-navigation'
import { cn } from '../../lib/cn'

/**
 * The Battery wordmark.
 *
 * Its own mark, for the same reason Trade has its own: carrying the holding's
 * monogram would say this is a department of the parent rather than a company
 * in the group. What it does share is the V — the same monogram, rendered as a
 * terminal and a cell body rather than as a letterform.
 *
 * The label beneath is the parent company's name and is a link back to it. That
 * is the required way out of this brand, so it lives on the mark itself — the
 * one element in the header of every Battery page — rather than being left to
 * the footer.
 *
 * `tone="light"` is the header's setting: the mark sits on the dark bar, and
 * there is no page ground behind it to inherit from.
 */
export function BatteryMark({
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
      to={BATTERY_PARENT_LINK.href}
      className={cn('group inline-flex flex-col gap-1.5', className)}
    >
      <span className="flex items-center gap-3">
        {/* A cell seen end-on, with its terminal cap offset — the one shape
            every battery in the catalogue shares. */}
        <svg
          viewBox="0 0 32 32"
          aria-hidden="true"
          className="size-7 shrink-0"
          fill="none"
        >
          <rect
            x="8.5"
            y="6"
            width="15"
            height="22"
            rx="2"
            className={isLight ? 'fill-white/15' : 'fill-navy'}
          />
          <rect
            x="12.5"
            y="2.5"
            width="7"
            height="4"
            rx="1"
            className="fill-gold"
          />
          <path
            d="M16 12.5 10.5 19h4l-1 5.5L21 17.5h-4.2l1.2-5H16Z"
            className={isLight ? 'fill-white' : 'fill-white'}
          />
        </svg>

        <span
          className={cn(
            'text-base leading-none font-semibold tracking-[0.2em]',
            isLight ? 'text-white' : 'text-navy',
          )}
        >
          VORTEX BATTERY
        </span>
      </span>

      {/* A Vortex Holding company. The rule is the group's mark, not the brand's
          accent — it stays neutral so it reads as a qualifier. */}
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
        {BATTERY_CHROME.parentQualifier[locale]}
      </span>
    </Link>
  )
}