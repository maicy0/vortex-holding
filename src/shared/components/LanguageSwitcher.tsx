import { useLocale } from '../../app/locale-context'
import { A11Y_LABELS } from '../../app/copy'
import type { Locale } from '../../app/locale'
import { cn } from '../lib/cn'

const LABELS: Record<Locale, string> = {
  en: 'English',
  fa: 'فارسی',
}

/**
 * Segmented EN / فارسی control.
 *
 * Switches the document locale, flipping <html lang> and <html dir> so the
 * whole page re-flows. Language names are given in both scripts deliberately:
 * "فارسی" reads as Persian to a Persian reader, where "Farsi" might not.
 *
 * Current path is preserved across the switch, so toggling language mid-page
 * does not bounce the visitor back to the homepage.
 */
export function LanguageSwitcher({
  tone = 'dark',
  className,
}: {
  tone?: 'dark' | 'light'
  className?: string
}) {
  const { locale, setLocale } = useLocale()
  const isLight = tone === 'light'

  return (
    <div
      role="group"
      aria-label={A11Y_LABELS.language[locale]}
      className={cn(
        'inline-flex items-center border text-sm',
        isLight ? 'border-white/25' : 'border-line',
        className,
      )}
    >
      {(Object.keys(LABELS) as Locale[]).map((code) => {
        const active = locale === code

        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            lang={code}
            className={cn(
              'px-3 py-1.5 font-medium transition-colors duration-150',
              isLight ? 'hover:text-white' : 'hover:text-navy',
              active && (isLight ? 'bg-white text-navy' : 'bg-navy text-white'),
            )}
          >
            {LABELS[code]}
          </button>
        )
      })}
    </div>
  )
}