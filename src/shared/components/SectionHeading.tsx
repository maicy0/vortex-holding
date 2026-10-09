import { cn } from '../lib/cn'

/**
 * Section title block: optional eyebrow, heading, optional lede.
 *
 * The gold rule is the brand's recurring accent and always leads the eyebrow
 * — it is the one place a decorative element is allowed.
 */
export function SectionHeading({
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
  /** Light type for navy backgrounds. */
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
        <p className="flex items-center gap-3 text-xs font-medium tracking-[0.18em] text-gold uppercase">
          {/* Mirrored by flex order in RTL; the rule stays on the leading edge. */}
          <span aria-hidden="true" className="block h-px w-8 bg-gold" />
          {eyebrow}
        </p>
      )}

      <Tag className={cn('title', isLight ? 'text-white' : 'text-navy')}>
        {title}
      </Tag>

      {lede && (
        <p
          className={cn(
            'max-w-2xl text-lg',
            isLight ? 'text-white/70' : 'text-gray',
          )}
        >
          {lede}
        </p>
      )}
    </div>
  )
}