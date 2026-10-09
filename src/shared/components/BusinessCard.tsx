import { cn } from '../lib/cn'

/**
 * Card for one operating company within a service line.
 *
 * More compact than ServiceCard and not a link by default: these describe
 * entities rather than routes. When `href` is present the whole card becomes
 * one link.
 */
export function BusinessCard({
  name,
  description,
  href,
  meta,
  className,
}: {
  name: string
  description?: string
  href?: string
  /** Short qualifier line, e.g. a sector or location. */
  meta?: string
  className?: string
}) {
  const content = (
    <>
      <div className="flex items-start justify-between gap-4">
        <h3 className="text-base font-semibold text-navy">{name}</h3>
        {href && (
          <span
            aria-hidden="true"
            className="mt-1 size-1.5 shrink-0 rounded-full bg-gold opacity-0 transition-opacity duration-150 group-hover:opacity-100"
          />
        )}
      </div>

      {meta && (
        <p className="text-xs font-medium tracking-[0.12em] text-blue-muted uppercase">
          {meta}
        </p>
      )}

      {description && <p className="text-sm text-gray">{description}</p>}
    </>
  )

  const shell = cn(
    'group flex flex-col gap-2 border border-line bg-white p-6',
    href &&
      'transition-colors duration-150 hover:border-navy-primary focus-visible:border-navy-primary',
    className,
  )

  if (href) {
    return (
      <a href={href} className={shell}>
        {content}
      </a>
    )
  }

  return <div className={shell}>{content}</div>
}