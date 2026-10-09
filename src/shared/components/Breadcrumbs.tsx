import { ChevronLeft } from 'lucide-react'
import { Link } from 'react-router-dom'

import { useLocale } from '../../app/locale-context'
import { A11Y_LABELS } from '../../app/copy'
import { cn } from '../lib/cn'

export interface Crumb {
  label: string
  href?: string
}

/**
 * Hierarchical trail. The final crumb is the current page and is not a link.
 *
 * Two tones, because the crumbs are read against whatever ground the page
 * opens on: `dark` on the white and off-white page heads, `light` on navy.
 *
 * Renders a nav > ol per the WAI-ARIA breadcrumb pattern. Direction-aware:
 * the separator chevron flips in RTL via CSS rather than a second icon.
 */
export function Breadcrumbs({
  items,
  tone = 'dark',
  onDark = false,
  className,
}: {
  items: Crumb[]
  tone?: 'dark' | 'light'
  /**
   * The crumbs sit directly on a navy ground rather than on a pale one, with
   * no container edge to guide them back. The current-page crumb moves to full
   * white — it is the point of the trail, and gray-on-navy is too close to the
   * breadcrumb grey elsewhere in the site to read as emphasis.
   */
  onDark?: boolean
  className?: string
}) {
  const isLight = tone === 'light'
  const { locale } = useLocale()

  return (
    <nav aria-label={A11Y_LABELS.breadcrumb[locale]} className={cn(className)}>
      <ol
        className={cn(
          'flex flex-wrap items-center gap-2 text-sm',
          isLight ? 'text-white/60' : 'text-gray',
        )}
      >
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={`${item.label}-${index}`} className="flex items-center gap-2">
              {index > 0 && (
                <ChevronLeft
                  aria-hidden
                  className="size-3.5 shrink-0 rtl:rotate-180"
                />
              )}

              {item.href && !isLast ? (
                <Link
                  to={item.href}
                  className={cn(
                    'transition-colors hover:underline',
                    isLight ? 'hover:text-white' : 'hover:text-navy',
                  )}
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current={isLast ? 'page' : undefined}
                  className={cn(
                    onDark && isLast && 'text-white',
                    isLast && !onDark && (isLight ? 'text-white' : 'text-navy'),
                  )}
                >
                  {item.label}
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}