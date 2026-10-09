import {
  CATALOGUE_STATUS,
  PRODUCT_SPEC_FIELDS,
  type BatteryProduct,
} from '../../../app/battery-catalogue'
import { useLocale } from '../../../app/locale-context'
import { cn } from '../../lib/cn'

/**
 * The specification table.
 *
 * Every row comes from PRODUCT_SPEC_FIELDS whether or not the product has a
 * value for it, and an absent field renders an explicit not-supplied state
 * rather than being dropped. That is the whole point of this component: a
 * catalogue that silently shortens its table when a field is missing looks
 * complete, and a catalogue that prints "Not supplied" looks like what it is —
 * a catalogue that has not yet been loaded. Hiding the row would make an
 * incomplete entry indistinguishable from a sparse one.
 *
 * `mono` on a field puts the value in the technical face at tabular figures, so
 * the voltage column and the capacity column line up down the table. Field
 * labels keep the surrounding UI face; only values are typeset as data.
 *
 * Labels and values both resolve through the active locale. Reading `.en` here
 * would be the shortest possible way to render a table and the wrong one: this
 * component sits on a page that is Persian by default, and a spec sheet is the
 * part of a catalogue a reader scans fastest — an English-only table in a
 * Persian page is the single most visible way to break that.
 */
export function BatterySpecTable({
  product,
  className,
}: {
  product: BatteryProduct
  className?: string
}) {
  const { locale } = useLocale()

  const rows = PRODUCT_SPEC_FIELDS.map((field) => {
    const value = product[field.key]

    return {
      key: field.key,
      label: field.label,
      mono: field.mono,
      // Every field on the product is localised or a string; `image` and
      // `datasheetUrl` are the only non-localised ones and neither appears in
      // PRODUCT_SPEC_FIELDS, so a missing value here means "not supplied".
      value: value as { en: string; fa: string } | undefined,
    }
  })

  return (
    <dl className={cn('flex flex-col', className)}>
      {rows.map((row, index) => {
        const isSet = row.value !== undefined

        return (
          <div
            key={row.key}
            className={cn(
              'grid gap-1 py-3 sm:grid-cols-[minmax(0,10rem)_minmax(0,1fr)] sm:gap-6',
              index > 0 && 'border-t border-line',
            )}
          >
            <dt className="text-sm text-gray">{row.label[locale]}</dt>

            <dd
              className={cn(
                'text-sm',
                isSet ? 'text-navy' : 'text-blue-muted',
                row.mono && isSet && 'battery-mono',
              )}
            >
              {isSet ? (
                row.value![locale]
              ) : (
                // Not italic, not struck through: this is a field awaiting a
                // value, not a field that has been deprecated.
                <span className="tracking-[0.04em]">
                  {CATALOGUE_STATUS.notSupplied[locale]}
                </span>
              )}
            </dd>
          </div>
        )
      })}
    </dl>
  )
}