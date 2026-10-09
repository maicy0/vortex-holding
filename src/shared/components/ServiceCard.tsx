import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

import { cn } from '../lib/cn'

/**
 * Card for one of the five holding's service lines.
 *
 * Square corners with a hairline border and a top rule that fills on hover —
 * the restrained alternative to a shadowed, heavily-rounded card. The entire
 * card is one link; the arrow is decorative.
 */
export function ServiceCard({
  title,
  description,
  href,
  icon: Icon,
  className,
}: {
  title: string
  description: string
  href: string
  icon?: React.ComponentType<{ className?: string; 'aria-hidden'?: boolean }>
  className?: string
}) {
  return (
    <Link
      to={href}
      className={cn(
        'group relative flex flex-col gap-4 border border-line bg-white p-7',
        'transition-colors duration-150 hover:border-navy-primary',
        className,
      )}
    >
      {/* Accent rule, flush to the top edge. */}
      <span
        aria-hidden="true"
        className="absolute inset-x-0 -top-px h-0.5 origin-left scale-x-0 bg-gold transition-transform duration-200 group-hover:scale-x-100 rtl:origin-right"
      />

      {Icon && (
        <Icon aria-hidden className="size-6 text-navy-primary" />
      )}

      <h3 className="flex items-center gap-2 text-lg font-semibold text-navy">
        {title}
        <ArrowUpRight
          aria-hidden
          className="size-4 text-gray transition-transform duration-150 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 rtl:group-hover:-translate-x-0.5"
        />
      </h3>

      <p className="text-sm text-gray">{description}</p>
    </Link>
  )
}