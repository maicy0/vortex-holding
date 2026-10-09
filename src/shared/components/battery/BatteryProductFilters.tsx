import { Search, X } from 'lucide-react'
import { useId } from 'react'

import { useLocale } from '../../../app/locale-context'
import { cn } from '../../lib/cn'
import type { BatteryCategory } from '../../../app/battery-catalogue'

/**
 * Front-end catalogue filters: a category selection and a text search.
 *
 * NO URL STATE, ON PURPOSE. The pathname never enters this component and no
 * component anywhere in the brand checks its route, so the filter cannot be the
 * thing that couples the catalogue to the address bar — which is what would
 * have happened had the category lived in a query string. The cost is that a
 * filtered view is not linkable; the benefit is that the brand keeps the
 * property the other two brands have, that no file in it knows what route it is
 * mounted at. The entries are a demonstration catalogue, so linkable filtered
 * views buy nothing.
 *
 * The category control is a real radiogroup, not a row of buttons: only one
 * category can be active, so arrow-key navigation is what a screen-reader user
 * expects and what tabbing through four buttons does not give them.
 *
 * The search is a labelled text input rather than a submit button — it filters
 * as you type and there is nothing to submit.
 */
export function BatteryProductFilters({
  categories,
  activeCategory,
  onCategoryChange,
  query,
  onQueryChange,
  resultCount,
  resultLabel,
  labels,
  className,
}: {
  categories: BatteryCategory[]
  /** `'all'` or a category id. */
  activeCategory: string
  onCategoryChange: (id: string) => void
  query: string
  onQueryChange: (value: string) => void
  resultCount: number
  /** e.g. "entries shown" — resolved by the caller. */
  resultLabel: string
  labels: {
    filters: string
    search: string
    searchPlaceholder: string
    searchHint: string
    category: string
    all: string
    clear: string
  }
  className?: string
}) {
  const { locale } = useLocale()
  const searchId = useId()
  const groupName = useId()

  const isFiltered = activeCategory !== 'all' || query.trim().length > 0

  return (
    <div className={cn('flex flex-col gap-6 border border-line bg-off-white p-6', className)}>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="battery-mono text-[0.6875rem] font-medium tracking-[0.16em] text-navy uppercase">
          {labels.filters}
        </p>

        <p className="battery-mono text-[0.6875rem] tracking-[0.12em] text-blue-muted uppercase">
          {resultCount} {resultLabel}
        </p>
      </div>

      {/* --- Category --------------------------------------------------- */}
      <fieldset>
        <legend className="text-sm text-gray">{labels.category}</legend>

        <div
          role="radiogroup"
          aria-label={labels.category}
          className="mt-3 flex flex-wrap gap-2"
        >
          <CategoryChip
            name={groupName}
            value="all"
            checked={activeCategory === 'all'}
            onSelect={() => onCategoryChange('all')}
          >
            {labels.all}
          </CategoryChip>

          {categories.map((category) => (
            <CategoryChip
              key={category.id}
              name={groupName}
              value={category.id}
              checked={activeCategory === category.id}
              onSelect={() => onCategoryChange(category.id)}
            >
              {category.label[locale]}
            </CategoryChip>
          ))}
        </div>
      </fieldset>

      {/* --- Search ----------------------------------------------------- */}
      <div className="flex flex-col gap-2">
        <label htmlFor={searchId} className="text-sm text-gray">
          {labels.search}
        </label>

        <div className="relative">
          <Search
            aria-hidden
            className="pointer-events-none absolute top-1/2 start-4 size-4 -translate-y-1/2 text-blue-muted"
          />

          <input
            id={searchId}
            type="search"
            value={query}
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder={labels.searchPlaceholder}
            aria-describedby={`${searchId}-hint`}
            className="h-12 w-full border border-line bg-white pe-4 ps-11 text-sm text-navy transition-colors placeholder:text-blue-muted hover:border-navy-primary focus-visible:border-navy-primary [&::-webkit-search-cancel-button]:appearance-none"
          />

          {query && (
            <button
              type="button"
              onClick={() => onQueryChange('')}
              aria-label={labels.clear}
              className="absolute top-1/2 end-3 flex size-7 -translate-y-1/2 items-center justify-center text-blue-muted transition-colors hover:text-navy"
            >
              <X aria-hidden className="size-4" />
            </button>
          )}
        </div>

        <p id={`${searchId}-hint`} className="text-xs text-blue-muted">
          {labels.searchHint}
        </p>
      </div>

      {/* Clearing is a single action and always available while a filter is
          active — a visitor who has narrowed to nothing needs to get out of it
          without reloading the page. */}
      {isFiltered && (
        <button
          type="button"
          onClick={() => {
            onCategoryChange('all')
            onQueryChange('')
          }}
          className="battery-mono inline-flex w-fit items-center gap-2 border border-line bg-white px-3 py-2 text-[0.6875rem] tracking-[0.12em] text-navy uppercase transition-colors hover:border-gold"
        >
          <X aria-hidden className="size-3.5" />
          {labels.clear}
        </button>
      )}
    </div>
  )
}

/**
 * One option in the category radiogroup.
 *
 * A radio input, visually replaced but not removed: the control is still a
 * native radio, so arrow keys, form semantics and the announced role all come
 * for free, and `checked` drives the styling from the component's own state
 * rather than from a `:checked` sibling selector.
 *
 * The `value` matters and is not decoration — a radio with no value submits and
 * identifies as an empty string, so every chip is indistinguishable to anything
 * reading the control by value.
 */
function CategoryChip({
  name,
  value,
  checked,
  onSelect,
  children,
}: {
  name: string
  value: string
  checked: boolean
  onSelect: () => void
  children: React.ReactNode
}) {
  return (
    <label
      className={cn(
        'cursor-pointer border px-3 py-2 text-sm transition-colors',
        'has-focus-visible:outline has-focus-visible:outline-2 has-focus-visible:outline-offset-2 has-focus-visible:outline-navy-primary',
        checked
          ? 'border-navy bg-navy text-white'
          : 'border-line bg-white text-gray hover:border-navy-primary hover:text-navy',
      )}
    >
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        onChange={onSelect}
        className="sr-only"
      />
      {children}
    </label>
  )
}