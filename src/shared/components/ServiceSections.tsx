import { Plus } from 'lucide-react'
import { Link } from 'react-router-dom'

import { ButtonLink } from './Button'
import { Container } from './Container'
import { SectionHeading } from './SectionHeading'
import { cn } from '../lib/cn'

/**
 * Section blocks shared by the five service pages.
 *
 * Each service picks its own composition from these (src/pages/service-layouts/),
 * so the five pages read as five pages while staying inside one design system:
 * same hairline borders, same square corners, same gold rule, same navy.
 *
 * They are separate blocks rather than one component with a mode enum because
 * the supporting material genuinely differs in kind between services — a
 * titled list, a numbered questionnaire, a two-column sheet — and forcing those
 * into one parameterised component would flatten them into the same section.
 *
 * Locale-agnostic like the rest of the design system: every string arrives as a
 * prop, already resolved by the caller.
 */

export interface DetailRow {
  title: string
  body: string
  /** Short qualifier: a subject line, or an ordinal on a numbered list. */
  meta?: string
}

/** Shared vertical rhythm for a section block. */
const RHYTHM = 'py-20 md:py-24'

/* --------------------------------------------------------------------------
   Description

   One considered paragraph in a narrow measure, directly beneath the hero — the
   page explaining itself. The gold rule on the inline start edge is the
   brand's one recurring accent, used here rather than as a heading decoration
   because there is no heading to decorate.
   -------------------------------------------------------------------------- */

export function ServiceDescription({
  label,
  body,
  className,
}: {
  label: string
  body: string
  className?: string
}) {
  return (
    <div className={cn('border-s-2 border-gold ps-6', className)}>
      <p className="text-xs font-medium tracking-[0.18em] text-blue-muted uppercase">
        {label}
      </p>
      <p className="mt-4 max-w-2xl text-lg text-gray">{body}</p>
    </div>
  )
}

/* --------------------------------------------------------------------------
   Audience — who this is for

   A hairline table rather than a card grid: this is a reference the reader
   checks themselves against, and a grid of boxes would read as a feature list.
   -------------------------------------------------------------------------- */

export function AudienceSection({
  eyebrow,
  title,
  lede,
  items,
}: {
  eyebrow: string
  title: string
  lede?: string
  items: DetailRow[]
}) {
  return (
    <section className={cn('bg-white', RHYTHM)}>
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} lede={lede} />

        <dl className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2">
          {items.map((item) => (
            <div key={item.title} className="flex flex-col gap-2 bg-white p-8">
              <dt className="text-base font-semibold text-navy">{item.title}</dt>
              <dd className="text-sm text-gray">{item.body}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  )
}

/* --------------------------------------------------------------------------
   Use cases — the situations behind the inquiry

   A numbered editorial list. `onDark` inverts it for pages that place use cases
   on navy.
   -------------------------------------------------------------------------- */

export function UseCasesSection({
  eyebrow,
  title,
  items,
  onDark = false,
  className,
}: {
  eyebrow: string
  title: string
  items: DetailRow[]
  onDark?: boolean
  className?: string
}) {
  return (
    <section className={cn(onDark && 'bg-navy text-white', className)}>
      <Container>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          tone={onDark ? 'light' : 'dark'}
        />

        <ol
          className={cn(
            'mt-14 divide-y',
            onDark ? 'divide-white/10' : 'divide-line border-y border-line',
          )}
        >
          {items.map((item, index) => (
            <li
              key={item.title}
              className="grid gap-2 py-7 sm:grid-cols-12 sm:gap-8"
            >
              <span
                aria-hidden="true"
                className={cn(
                  'text-xs font-medium tracking-[0.18em] tabular-nums sm:col-span-1',
                  onDark ? 'text-gold' : 'text-blue-muted',
                )}
              >
                {String(index + 1).padStart(2, '0')}
              </span>

              <h3
                className={cn(
                  'text-base font-semibold sm:col-span-4',
                  onDark ? 'text-white' : 'text-navy',
                )}
              >
                {item.title}
              </h3>

              <p
                className={cn(
                  'text-sm sm:col-span-7',
                  onDark ? 'text-white/70' : 'text-gray',
                )}
              >
                {item.body}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}

/* --------------------------------------------------------------------------
   Inquiry — what to send, and what happens next

   Two lists side by side. They are numbered independently and deliberately
   so: they are parallel answers to one question, not consecutive steps of one
   process, and running the numbers on would imply that step four follows from
   step one.
   -------------------------------------------------------------------------- */

export function InquirySection({
  eyebrow,
  title,
  lede,
  includeHeading,
  include,
  nextHeading,
  next,
  action,
  onDark = false,
  className,
}: {
  eyebrow: string
  title: string
  lede?: string
  includeHeading: string
  include: DetailRow[]
  nextHeading: string
  next: DetailRow[]
  action?: { label: string; href: string }
  onDark?: boolean
  className?: string
}) {
  return (
    <section
      className={cn(
        onDark ? 'bg-navy text-white' : 'border-t border-line bg-off-white',
        className,
      )}
    >
      <Container>
        <SectionHeading
          eyebrow={eyebrow}
          title={title}
          lede={lede}
          tone={onDark ? 'light' : 'dark'}
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:gap-16">
          <StepList
            heading={includeHeading}
            items={include}
            onDark={onDark}
          />
          <StepList heading={nextHeading} items={next} onDark={onDark} />
        </div>

        {action && (
          <div className="mt-14">
            <ButtonLink to={action.href} size="lg">
              {action.label}
            </ButtonLink>
          </div>
        )}
      </Container>
    </section>
  )
}

function StepList({
  heading,
  items,
  onDark,
}: {
  heading: string
  items: DetailRow[]
  onDark: boolean
}) {
  return (
    <div>
      <h3
        className={cn(
          'text-xs font-medium tracking-[0.18em] uppercase',
          onDark ? 'text-white/60' : 'text-blue-muted',
        )}
      >
        {heading}
      </h3>

      <ol className="mt-6 flex flex-col gap-6">
        {items.map((item, index) => (
          <li key={item.title} className="flex gap-5">
            <span
              aria-hidden="true"
              className={cn(
                'shrink-0 pt-1 text-xs font-medium tracking-[0.18em] tabular-nums',
                onDark ? 'text-gold' : 'text-blue-muted',
              )}
            >
              {String(index + 1).padStart(2, '0')}
            </span>

            <div className="flex flex-col gap-1">
              <h4
                className={cn(
                  'text-base font-semibold',
                  onDark ? 'text-white' : 'text-navy',
                )}
              >
                {item.title}
              </h4>
              <p
                className={cn(
                  'text-sm',
                  onDark ? 'text-white/70' : 'text-gray',
                )}
              >
                {item.body}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </div>
  )
}

/* --------------------------------------------------------------------------
   Detail — the supporting section

   `kind` picks between titled rows and a numbered questionnaire, because the
   supporting material differs in kind between services: batteries and
   procurement are answered as questions to work through, the other three as
   topics to read.
   -------------------------------------------------------------------------- */

export function DetailSection({
  label,
  title,
  lede,
  items,
  kind = 'capabilities',
  detailedLabel,
  detailedNote,
  detailedList,
  onDark = false,
  className,
}: {
  label: string
  title: string
  lede?: string
  items: DetailRow[]
  kind?: 'capabilities' | 'questions'
  detailedLabel?: string
  /** Short note beside the sheet heading, e.g. "Set per inquiry". */
  detailedNote?: string
  detailedList?: string[]
  onDark?: boolean
  className?: string
}) {
  return (
    <section
      className={cn(
        onDark ? 'bg-navy text-white' : 'bg-off-white',
        className,
      )}
    >
      <Container>
        <SectionHeading
          eyebrow={label}
          title={title}
          lede={lede}
          tone={onDark ? 'light' : 'dark'}
        />

        {kind === 'questions' ? (
          <QuestionGrid items={items} />
        ) : (
          <dl className="mt-14 divide-y divide-line border-y border-line">
            {items.map((item) => (
              <div
                key={item.title}
                className="grid gap-2 py-8 sm:grid-cols-12 sm:gap-8"
              >
                <dt className="flex flex-col gap-2 sm:col-span-5">
                  {item.meta && (
                    <span className="text-xs font-medium tracking-[0.18em] text-gold uppercase">
                      {item.meta}
                    </span>
                  )}
                  <span className="text-lg font-semibold text-navy">
                    {item.title}
                  </span>
                </dt>

                <dd className="text-base text-gray sm:col-span-7">
                  {item.body}
                </dd>
              </div>
            ))}
          </dl>
        )}

        {detailedLabel && detailedList && (
          <DetailedSheet
            label={detailedLabel}
            note={detailedNote}
            items={detailedList}
          />
        )}
      </Container>
    </section>
  )
}

function QuestionGrid({ items }: { items: DetailRow[] }) {
  return (
    <ol className="mt-14 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <li key={item.title} className="flex flex-col gap-3 bg-white p-8">
          {item.meta && (
            <span className="text-xs font-medium tracking-[0.18em] text-blue-muted tabular-nums">
              {item.meta}
            </span>
          )}

          <h3 className="text-base font-semibold text-navy">{item.title}</h3>
          <p className="text-sm text-gray">{item.body}</p>
        </li>
      ))}
    </ol>
  )
}

/**
 * The values a service would normally quote, laid out as a sheet with no
 * figures in it.
 *
 * The empty state is deliberate, not unfinished. Every entry here is something
 * the holding establishes with a specific inquiry — minimum order quantity,
 * price, lead time — so printing a plausible number would be inventing one.
 * What is shown is the shape the filled sheet would take; what belongs in it
 * is decided per inquiry, and the enclosing section's lede says exactly that.
 */
function DetailedSheet({
  label,
  note,
  items,
}: {
  label: string
  note?: string
  items: string[]
}) {
  return (
    <div className="mt-20">
      <div className="flex flex-col gap-3 border-b border-line pb-6 sm:flex-row sm:items-end sm:justify-between">
        <h3 className="text-xl font-semibold text-navy">{label}</h3>

        {note && (
          <p className="text-xs font-medium tracking-[0.18em] text-blue-muted uppercase">
            {note}
          </p>
        )}
      </div>

      <dl className="grid gap-px bg-line sm:grid-cols-2">
        {items.map((item) => (
          <div
            key={item}
            className="flex items-center justify-between gap-6 bg-off-white px-6 py-5"
          >
            <dt className="text-sm font-medium text-navy">{item}</dt>

            {/*
              A hairline rule, not a dash: the value is genuinely absent, and a
              dash would read as "none" where the truth is "not yet stated".
            */}
            <dd aria-hidden="true" className="h-px min-w-16 flex-1 bg-line" />
          </div>
        ))}
      </dl>
    </div>
  )
}

/* --------------------------------------------------------------------------
   Cross-links

   The way back to the holding and onward to the services index. Placed to close
   the page, so a visitor who lands on a service page deep in the ecosystem has
 * a route back to the holding and a route forward, both equally weighted.
   -------------------------------------------------------------------------- */

export function CrossLinks({
  label,
  links,
  className,
}: {
  label: string
  links: { label: string; href: string }[]
  className?: string
}) {
  return (
    <section className={cn('border-t border-line bg-white', RHYTHM, className)}>
      <Container>
        <p className="text-xs font-medium tracking-[0.18em] text-blue-muted uppercase">
          {label}
        </p>

        <ul className="mt-6 grid gap-px bg-line sm:grid-cols-2">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                to={link.href}
                className="group flex h-full items-center justify-between gap-6 bg-white px-8 py-9 transition-colors hover:bg-off-white"
              >
                <span className="flex flex-col gap-1">
                  <span className="text-lg font-semibold text-navy">
                    {link.label}
                  </span>
                </span>

                <Plus
                  aria-hidden
                  className="size-5 shrink-0 text-gold transition-transform duration-150 group-hover:rotate-90"
                />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}