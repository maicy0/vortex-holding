import { Link } from 'react-router-dom'

import { cn } from '../../lib/cn'
import { BatteryButtonLink } from './BatteryButtonLink'

/**
 * Closing product-inquiry band for VORTEX BATTERY.
 *
 * A catalogue's whole purpose is to end in a conversation, so this is the one
 * component the brand repeats on every page rather than only on the homepage.
 * Its ground is the cyan, not the navy — the single loudest moment in the site,
 * placed once per page.
 *
 * AND THE TYPE ON IT IS NAVY, NOT WHITE. Cyan carries no white text anywhere in
 * this brand, because white on cyan is 2.0:1 and fails WCAG AA by a factor of
 * four. Navy on cyan is 9:1. The accent is therefore the loudest element on the
 * page without becoming the least legible one — which is the constraint that
 * makes this band work rather than a compromise it tolerates.
 */
export function BatteryInquiryCTA({
  eyebrow,
  title,
  description,
  actionLabel,
  actionHref = '/businesses/batteries/contact',
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
    <section className={cn('bg-gold text-navy', className)}>
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-16 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:py-20">
        <div className="flex max-w-2xl flex-col gap-4">
          {eyebrow && (
            <p className="battery-mono flex items-center gap-3 text-[0.6875rem] font-semibold tracking-[0.16em] uppercase">
              <span aria-hidden="true" className="block h-px w-8 bg-navy" />
              {eyebrow}
            </p>
          )}

          <h2 className="title text-navy">{title}</h2>

          {description && <p className="max-w-xl text-navy/75">{description}</p>}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {secondaryActionLabel && secondaryActionHref && (
            <BatteryButtonLink
              to={secondaryActionHref}
              variant="secondary"
              size="lg"
              className="border-navy/40 text-navy hover:bg-navy hover:text-white"
            >
              {secondaryActionLabel}
            </BatteryButtonLink>
          )}
          <BatteryButtonLink
            to={actionHref}
            size="lg"
            className="bg-navy text-white hover:bg-navy-primary"
          >
            {actionLabel}
          </BatteryButtonLink>
        </div>
      </div>

      {showContext && (
        <div className="border-t border-navy/20">
          <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
            <p className="battery-mono text-[0.6875rem] font-semibold tracking-[0.16em] text-navy/60 uppercase">
              {contextLabel}
            </p>

            <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
              {context!.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-navy/80"
                >
                  <span
                    aria-hidden="true"
                    className="mt-2 block size-1.5 shrink-0 bg-navy"
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
 * Battery page. A quiet, full-width band — enough presence to be findable, little
 * enough to read as navigation rather than as a section.
 */
export function BatteryParentLink({
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
    <section className={cn('border-t border-line bg-white', className)}>
      <div className="mx-auto max-w-6xl px-5 py-10 sm:px-8">
        <Link
          to={href}
          className="group flex flex-wrap items-baseline justify-between gap-4"
        >
          <span className="flex flex-col gap-1.5">
            <span className="battery-mono text-[0.6875rem] font-medium tracking-[0.16em] text-blue-muted uppercase">
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