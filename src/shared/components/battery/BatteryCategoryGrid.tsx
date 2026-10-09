import { Link } from 'react-router-dom'

import { batteryCategoryIcon } from '../../../app/battery-icons'
import { useLocale } from '../../../app/locale-context'
import { cn } from '../../lib/cn'
import type { BatteryCategory } from '../../../app/battery-catalogue'

/**
 * Product categories as a structured grid.
 *
 * Used twice, and deliberately the same both times: on the homepage, where each
 * category is one cell linking to the catalogue, and on the products page, where
 * each is the header of its own section. One component driven by one array, so
 * the category list cannot drift between the two pages.
 *
 * `numbered` is on for both registers. The count is not decoration — it is the
 * number of demonstration entries in that category, and printing it means the
 * catalogue's own size is visible from the homepage without opening it.
 */
export function BatteryCategoryGrid({
  categories,
  entryCount,
  entriesLabel,
  numbered = true,
  className,
}: {
  categories: BatteryCategory[]
  /** Entries per category id, used for the printed count. */
  entryCount?: Record<string, number>
  /** Resolved by the caller so the component stays locale-agnostic. */
  entriesLabel?: string
  numbered?: boolean
  className?: string
}) {
  const { locale } = useLocale()

  return (
    <ul
      className={cn(
        'grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4',
        className,
      )}
    >
      {categories.map((category, index) => {
        const Icon = batteryCategoryIcon(category.icon)
        const count = entryCount?.[category.id]

        return (
          <li key={category.id} className="bg-white">
            <Link
              to={`/businesses/batteries/products#${category.anchor}`}
              className="group flex h-full flex-col gap-4 p-7 transition-colors hover:bg-off-white"
            >
              <div className="flex items-start justify-between gap-4">
                <Icon aria-hidden className="size-6 text-gold" />
                {numbered && (
                  <span className="battery-mono text-sm text-blue-muted">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                )}
              </div>

              <h3 className="title text-[1.375rem] text-navy">
                {category.label[locale]}
              </h3>

              <p className="text-sm leading-relaxed text-gray">
                {category.summary[locale]}
              </p>

              {count !== undefined && entriesLabel && (
                <p className="battery-mono text-[0.6875rem] tracking-[0.12em] text-blue-muted uppercase">
                  {count} {entriesLabel}
                </p>
              )}

              <span
                aria-hidden="true"
                className="mt-auto block h-px w-8 bg-line transition-colors group-hover:bg-gold"
              />
            </Link>
          </li>
        )
      })}
    </ul>
  )
}