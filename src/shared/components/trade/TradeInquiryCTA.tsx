import { Link } from 'react-router-dom'

import { cn } from '../../lib/cn'
import { TradeButtonLink } from './TradeButtonLink'

/**
 * Closing business-inquiry band for VORTEX TRADE.
 *
 * Charcoal ground with the copper rule as the only ornament. Structured like a
 * commercial footer block rather than a marketing banner: the eyebrow names
 * the destination, the heading states the action, and a checklist of what an
 * inquiry should carry runs beneath it — so a visitor leaves knowing what to
 * write, not just where to click.
 */
export function TradeInquiryCTA({
  eyebrow,
  title,
  description,
  actionLabel,
  actionHref = '/businesses/trade/contact',
  secondaryActionLabel,
  secondaryActionHref,
  context,
  contextLabel,
  className,
}: {
  eyebrow?: string
  title: string
  description?: string
  actionLabel: string
  actionHref?: string
  secondaryActionLabel?: string
  secondaryActionHref?: string
  /** Items the inquiry should carry, listed beneath the band. */
  context?: string[]
  /** Heading for `context`. Callers resolve it, so the component stays
   *  locale-agnostic like the rest of the design system. */
  contextLabel?: string
  className?: string
}) {
  const showContext = Boolean(context?.length && contextLabel)

  return (
    <section className={cn('bg-navy text-white', className)}>
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-16 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:py-20">
        <div className="flex max-w-2xl flex-col gap-4">
          {eyebrow && (
            <p className="flex items-center gap-3 text-[0.6875rem] font-medium tracking-[0.16em] text-gold uppercase">
              <span aria-hidden="true" className="block h-px w-8 bg-gold" />
              {eyebrow}
            </p>
          )}

          <h2 className="title text-white">{title}</h2>

          {description && <p className="max-w-xl text-white/70">{description}</p>}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {secondaryActionLabel && secondaryActionHref && (
            <TradeButtonLink
              to={secondaryActionHref}
              variant="secondary"
              size="lg"
              className="border-white/40 text-white hover:bg-white hover:text-navy"
            >
              {secondaryActionLabel}
            </TradeButtonLink>
          )}
          <TradeButtonLink
            to={actionHref}
            size="lg"
            className="bg-gold text-white hover:bg-white hover:text-navy"
          >
            {actionLabel}
          </TradeButtonLink>
        </div>
      </div>

      {showContext && (
        <div className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
            <p className="text-[0.6875rem] font-medium tracking-[0.16em] text-white/50 uppercase">
              {contextLabel}
            </p>

            <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
              {context!.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-white/70"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 block size-1.5 shrink-0 bg-gold"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </section>
  )
}

/**
 * The way back to the parent company, placed directly above the footer on every
 * Trade page. A quiet, full-width band — enough presence to be findable,
 * little enough that it reads as navigation rather than as a section.
 */
export function TradeParentLink({
  label,
  description,
  href = '/',
  className,
}: {
  label: string
  description?: string
  href?: string
  className?: string
}) {
  return (
    <section className={cn('border-t border-line bg-off-white', className)}>
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <Link
          to={href}
          className="group flex flex-wrap items-baseline justify-between gap-4"
        >
          <span className="flex flex-col gap-1.5">
            <span className="text-[0.6875rem] font-medium tracking-[0.16em] text-gold uppercase">
              {label}
            </span>
            {description && (
              <span className="text-sm text-gray">{description}</span>
            )}
          </span>

          <span
            aria-hidden="true"
            className="text-navy transition-transform duration-200 group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
          >
            →
          </span>
        </Link>
      </div>
    </section>
  )
}