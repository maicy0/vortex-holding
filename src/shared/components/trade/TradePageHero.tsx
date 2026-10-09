import { Container } from '../Container'
import { Breadcrumbs, type Crumb } from '../Breadcrumbs'
import { cn } from '../../lib/cn'

/**
 * Page head for VORTEX TRADE.
 *
 * The shared head every interior Trade page opens with: breadcrumbs, an
 * eyebrow, a serif title and a lede, on warm paper. The homepage's hero is
 * bespoke and does not use this — a commercial hero and a page head are
 * different things, and reusing one for both would flatten both.
 *
 * `onDark` opens on the charcoal ground instead, for the procurement page,
 * whose head sits above a dark band.
 *
 * The trail is passed as `Crumb`s rather than as bare labels so a page states
 * its own ancestors explicitly; `tradeCrumbs` below is the usual way to build
 * one, and it never links the last crumb because the caller cannot pass a href
 * for a crumb it is still on.
 */
export function TradePageHero({
  eyebrow,
  title,
  lede,
  crumbs,
  onDark = false,
  className,
}: {
  eyebrow: string
  title: string
  lede?: string
  /** Home > VORTEX TRADE > this page. Built by `tradeCrumbs`. */
  crumbs: Crumb[]
  onDark?: boolean
  className?: string
}) {
  return (
    <section
      className={cn(
        'border-b border-line',
        onDark ? 'bg-navy-primary text-white' : 'bg-white',
        className,
      )}
    >
      <Container size="wide" className="py-16 lg:py-20">
        <Breadcrumbs
          items={crumbs}
          tone={onDark ? 'light' : 'dark'}
          onDark={onDark}
        />

        <div className="reveal mt-10 flex max-w-3xl flex-col gap-5">
          <p className="flex items-center gap-3 text-[0.6875rem] font-medium tracking-[0.16em] text-gold uppercase">
            <span aria-hidden="true" className="block h-px w-8 bg-gold" />
            {eyebrow}
          </p>

          <h1 className="display text-navy">{title}</h1>

          {lede && (
            <p className="trade-lede font-editorial max-w-2xl text-[1.3125rem] leading-[1.55] text-gray">
              {lede}
            </p>
          )}
        </div>
      </Container>
    </section>
  )
}