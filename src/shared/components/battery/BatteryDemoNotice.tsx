import { TriangleAlert } from 'lucide-react'

import { CATALOGUE_STATUS, batteryIsDemonstration } from '../../../app/battery-catalogue'
import { cn } from '../../lib/cn'

/**
 * The demonstration notice, in its three registers.
 *
 * The constraint this brand has to satisfy is that no fictional product may ever
 * read as verified inventory. A single notice at the top of a page does not
 * achieve that, because catalogue pages get screenshotted, printed, linked to
 * and cropped — and a crop of a card or a table travels without the banner above
 * it. So the same warning is rendered three ways, at three scopes:
 *
 *   `variant="banner"`   a band above a whole section
 *   `variant="tag"`      on a single product card
 *   `variant="caption"`  under a specification table
 *
 * All three read from the same strings in battery-catalogue.ts and from the same
 * `batteryIsDemonstration` flag, so they cannot disagree with each other, and
 * the flag is a single edit: loading the first real product part removes all
 * three at once.
 *
 * `variant="tag"` renders nothing when the flag is false rather than leaving an
 * empty slot, so a real catalogue has no orphan padding.
 */
export function BatteryDemoNotice({
  variant = 'banner',
  title,
  body,
  tag,
  caption,
  className,
}: {
  variant?: 'banner' | 'tag' | 'caption'
  /** Resolved by the caller so the component stays locale-agnostic. */
  title?: string
  body?: string
  tag?: string
  caption?: string
  className?: string
}) {
  if (!batteryIsDemonstration) return null

  if (variant === 'tag') {
    return (
      <span
        className={cn(
          'battery-mono inline-flex items-center gap-1.5 border border-gold/50 px-2 py-1 text-[0.625rem] font-medium tracking-[0.14em] text-blue-muted uppercase',
          className,
        )}
      >
        <span aria-hidden="true" className="block size-1.5 bg-gold" />
        {tag}
      </span>
    )
  }

  if (variant === 'caption') {
    return (
      <p
        className={cn(
          'flex items-start gap-2 text-xs leading-relaxed text-gray',
          className,
        )}
      >
        <TriangleAlert aria-hidden className="mt-0.5 size-3.5 shrink-0 text-gold" />
        <span>{caption ?? CATALOGUE_STATUS.tableCaption.en}</span>
      </p>
    )
  }

  return (
    <div
      role="note"
      className={cn(
        'flex items-start gap-4 border-s-2 border-gold bg-off-white px-5 py-5',
        className,
      )}
    >
      <TriangleAlert aria-hidden className="mt-0.5 size-5 shrink-0 text-gold" />

      <div className="flex flex-col gap-1.5">
        {title && (
          <p className="battery-mono text-[0.6875rem] font-medium tracking-[0.16em] text-navy uppercase">
            {title}
          </p>
        )}
        <p className="text-sm leading-relaxed text-gray">
          {body ?? CATALOGUE_STATUS.bannerBody.en}
        </p>
      </div>
    </div>
  )
}