import { Check } from 'lucide-react'

import { ButtonLink } from './Button'
import { cn } from '../lib/cn'

/**
 * Closing call-to-action band.
 *
 * Navy ground with the gold rule as the only ornament — the brand's one
 * recurring accent. Used at the foot of marketing pages.
 *
 * `eyebrow` and `context` give the band the detail it needs to be specific to
 * the page it closes, which a service CTA needs and a site-wide CTA does not:
 * the eyebrow names the line of business in words rather than by icon, and
 * `context` is a checklist of the things the inquiry should carry. Rendered
 * with logical properties so it reverses correctly under `[dir=rtl]` without a
 * second markup.
 */
export function InquiryCTA({
  title,
  description,
  eyebrow,
  actionLabel,
  actionHref = '/contact',
  context,
  contextLabel,
  secondaryActionLabel,
  secondaryActionHref,
  className,
}: {
  title: string
  description?: string
  eyebrow?: string
  actionLabel: string
  actionHref?: string
  /** Items the inquiry should carry, listed beneath the band. */
  context?: string[]
  /** Heading for `context`. Callers resolve it, so the component stays
   *  locale-agnostic like the rest of the design system. */
  contextLabel?: string
  secondaryActionLabel?: string
  secondaryActionHref?: string
  className?: string
}) {
  const showContext = Boolean(context?.length && contextLabel)

  return (
    <section className={cn('bg-navy text-white', className)}>
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-16 sm:px-8 md:flex-row md:items-end md:justify-between md:py-20">
        <div className="flex max-w-2xl flex-col gap-4">
          {eyebrow && (
            <p className="flex items-center gap-3 text-xs font-medium tracking-[0.18em] text-gold uppercase">
              <span aria-hidden="true" className="block h-px w-8 bg-gold" />
              {eyebrow}
            </p>
          )}

          <h2 className="title text-white">{title}</h2>

          {description && <p className="text-white/70">{description}</p>}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {secondaryActionLabel && secondaryActionHref && (
            <ButtonLink
              to={secondaryActionHref}
              variant="secondary"
              size="lg"
              className="border-white/40 text-white hover:bg-white hover:text-navy"
            >
              {secondaryActionLabel}
            </ButtonLink>
          )}
          <ButtonLink
            to={actionHref}
            size="lg"
            className="bg-gold text-navy hover:bg-white"
          >
            {actionLabel}
          </ButtonLink>
        </div>
      </div>

      {showContext && (
        <div className="border-t border-white/10">
          <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
            <p className="text-xs font-medium tracking-[0.18em] text-white/50 uppercase">
              {contextLabel}
            </p>

            <ul className="mt-6 grid gap-x-8 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
              {context!.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-white/70"
                >
                  <Check
                    aria-hidden
                    className="mt-0.5 size-4 shrink-0 text-gold"
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