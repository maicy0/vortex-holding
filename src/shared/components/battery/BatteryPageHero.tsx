import { cn } from '../../lib/cn'
import { Breadcrumbs, type Crumb } from '../Breadcrumbs'
import { Container } from '../Container'

/**
 * Page head for VORTEX BATTERY.
 *
 * The shared head every interior Battery page opens with: breadcrumbs, an
 * indexed eyebrow, a title and a lede. It opens on the dark ground because the
 * brand's header is a dark rail and a light head directly beneath it would read
 * as two unrelated designs; the products page and the wholesale page both want
 * that continuity anyway, since they are the two a visitor arrives at already
 * thinking in technical terms.
 *
 * `onDark` is therefore the default here rather than an opt-in — kept as a prop
 * only so a future light-ground page has it, and inverted if a caller passes it
 * the head inverts rather than silently rendering dark type on dark.
 *
 * The trail is passed as `Crumb`s rather than as bare labels so a page states
 * its own ancestors explicitly; `batteryCrumbs` below is the usual way to build
 * one, and it never links the last crumb because the caller cannot pass a href
 * for a crumb it is still on.
 */
export function BatteryPageHero({
  eyebrow,
  title,
  lede,
  crumbs,
  className,
}: {
  eyebrow: string
  title: string
  lede?: string
  /** Home > VORTEX BATTERY > this page. Built by `batteryCrumbs`. */
  crumbs: Crumb[]
  className?: string
}) {
  return (
    <section className={cn('bg-navy text-white', className)}>
      <Container size="wide" className="py-14 lg:py-20">
        <Breadcrumbs items={crumbs} tone="light" onDark />

        <div className="reveal mt-10 flex max-w-3xl flex-col gap-5">
          <p className="battery-mono flex items-center gap-3 text-[0.6875rem] font-medium tracking-[0.16em] text-gold uppercase">
            <span aria-hidden="true" className="block h-px w-8 bg-gold" />
            {eyebrow}
          </p>

          <h1 className="display text-white">{title}</h1>

          {lede && (
            <p className="max-w-2xl text-lg leading-[1.65] text-white/70">
              {lede}
            </p>
          )}
        </div>
      </Container>
    </section>
  )
}