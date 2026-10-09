import { cn } from '../../lib/cn'

/**
 * Section heading for VORTEX BATTERY.
 *
 * The eyebrow is a numbered technical label rather than a word — a catalogue
 * section is indexed, not introduced — and it is set in the mono register. The
 * heading itself stays in the brand's display face, which for this brand is the
 * grotesque, so a page full of headings reads as a document rather than as a
 * set of announcements.
 *
 * Colour comes from tokens, so `tone="light"` is the only thing that changes
 * for a dark ground.
 */
export function BatterySectionHeading({
  eyebrow,
  index,
  title,
  lede,
  align = 'start',
  tone = 'dark',
  className,
  as: Tag = 'h2',
}: {
  /** Optional short label shown before the index. */
  eyebrow?: string
  /** Section number, printed in the eyebrow row. */
  index?: number
  title: string
  lede?: string
  align?: 'start' | 'center'
  /** Light type for dark grounds. */
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
      {(eyebrow || index !== undefined) && (
        <p
          className={cn(
            'battery-mono flex items-center gap-3 text-[0.6875rem] font-medium tracking-[0.16em] uppercase',
            isLight ? 'text-gold' : 'text-blue-muted',
          )}
        >
          {/* Mirrored by flex order in RTL; the rule stays on the leading edge. */}
          <span
            aria-hidden="true"
            className={cn('block h-px w-8', isLight ? 'bg-gold' : 'bg-line')}
          />
          {index !== undefined && (
            <span className="text-gold">{String(index).padStart(2, '0')}</span>
          )}
          {eyebrow}
        </p>
      )}

      <Tag className={cn('title', isLight && 'text-white')}>{title}</Tag>

      {lede && (
        <p
          className={cn(
            'max-w-2xl text-lg leading-[1.65]',
            isLight ? 'text-white/70' : 'text-gray',
          )}
        >
          {lede}
        </p>
      )}
    </div>
  )
}