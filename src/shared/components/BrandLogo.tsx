import type { BrandId } from '../../app/brands'
import { SITE_NAMES } from '../../app/site-names'
import { cn } from '../lib/cn'

/**
 * The Vortex wordmark.
 *
 * Drawn rather than set as display type: a gold monogram plus the Latin
 * wordmark, so the mark holds at favicon size and does not depend on a webfont
 * having loaded. The gold rule is the brand's one recurring decorative
 * element — it appears here and in section headings, nowhere else.
 *
 * The wordmark itself is Latin in both locales; a brand name is not translated.
 */
export function BrandLogo({
  brand = 'holding',
  className,
  markOnly = false,
  /** Gold sub-rule beneath the wordmark. Omit in tight spaces. */
  withRule = false,
  tone = 'dark',
}: {
  brand?: BrandId
  className?: string
  markOnly?: boolean
  withRule?: boolean
  /** Light wordmark for use on navy backgrounds. */
  tone?: 'dark' | 'light'
}) {
  const wordmark = SITE_NAMES[brand]
  const isLight = tone === 'light'

  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <svg
        viewBox="0 0 32 32"
        aria-hidden="true"
        className="size-8 shrink-0"
        fill="none"
      >
        {/* Monogram V: a stroke meeting at a point, with a darker inner
            facet for depth. Two flat shapes, no gradient. */}
        <path
          d="M5 6h5.6L16 19.6 21.4 6H27L18.6 27h-5.2L5 6Z"
          className="fill-gold"
        />
        <path
          d="M22.4 6H27l-3.6 9.2-2.2-3.6L22.4 6Z"
          className={isLight ? 'fill-navy-primary' : 'fill-navy'}
        />
      </svg>

      {!markOnly && (
        <span className="flex flex-col">
          <span
            className={cn(
              'text-lg leading-none font-semibold tracking-[0.18em]',
              isLight ? 'text-white' : 'text-navy',
            )}
          >
            {wordmark}
          </span>
          {withRule && (
            <span aria-hidden="true" className="mt-1.5 block h-px w-full bg-gold" />
          )}
        </span>
      )}
    </span>
  )
}