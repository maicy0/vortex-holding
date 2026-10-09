import { cn } from '../../lib/cn'

/**
 * Section heading for VORTEX TRADE.
 *
 * Trade's own rather than the holding's SectionHeading: same three-part
 * structure (eyebrow, heading, lede), different type. The eyebrow is a copper
 * rule rather than a gold one and is not letter-spaced as tightly, the heading
 * is the editorial serif, and the lede is set in the serif at reading size —
 * Trade's ledes are editorial passages, not sans-serif summaries.
 *
 * Colour comes from tokens, so `tone="light"` is the only thing that changes
 * for a charcoal ground.
 */
export function TradeSectionHeading({
  eyebrow,
  title,
  lede,
  align = 'start',
  tone = 'dark',
  className,
  as: Tag = 'h2',
}: {
  eyebrow?: string
  title: string
  lede?: string
  align?: 'start' | 'center'
  /** Light type for charcoal grounds. */
  tone?: 'dark' | 'light'
  className?: string
  as?: 'h1' | 'h2' | 'h3'
}) {
  const isLight = tone === 'light'

  return (
    <div
      className={cn(
        'flex flex-col gap-4',
        align === 'center' && 'items-center text-center',
        className,
      )}
    >
      {eyebrow && (
        <p className="flex items-center gap-3 text-[0.6875rem] font-medium tracking-[0.16em] text-gold uppercase">
          {/* Mirrored by flex order in RTL; the rule stays on the leading edge. */}
          <span aria-hidden="true" className="block h-px w-8 bg-gold" />
          {eyebrow}
        </p>
      )}

      <Tag className={cn('title', isLight && 'text-white')}>
        {title}
      </Tag>

      {lede && (
        <p
          className={cn(
            'trade-lede font-editorial max-w-2xl text-[1.3125rem] leading-[1.55]',
            isLight ? 'text-white/70' : 'text-gray',
          )}
        >
          {lede}
        </p>
      )}
    </div>
  )
}