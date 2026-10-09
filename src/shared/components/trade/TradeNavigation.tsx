import { useEffect, useId, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { useLocale } from '../../../app/locale-context'
import { A11Y_LABELS } from '../../../app/copy'
import { TRADE_NAV } from '../../../app/trade-navigation'
import { cn } from '../../lib/cn'

/**
 * Desktop navigation for VORTEX TRADE.
 *
 * Structured rather than prose: links are set in the editorial UI face with a
 * wide letter-space, and the current page is marked with a copper rule rather
 * than a colour change alone.
 */
export function TradeNavigation({ className }: { className?: string }) {
  const { locale } = useLocale()

  return (
    <nav
      aria-label="Trade"
      className={cn('hidden items-center gap-8 lg:flex', className)}
    >
      {TRADE_NAV.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          end={item.href === '/businesses/trade'}
          className={({ isActive }) =>
            cn(
              'relative py-2 text-[0.8125rem] font-medium tracking-[0.1em] uppercase transition-colors duration-150',
              isActive
                ? 'text-navy'
                : 'text-gray hover:text-navy',
            )
          }
        >
          {({ isActive }) => (
            <>
              {item.label[locale]}
              <span
                aria-hidden="true"
                className={cn(
                  'absolute inset-x-0 -bottom-0.5 h-px origin-left bg-gold transition-transform duration-200 rtl:origin-right',
                  isActive ? 'scale-x-100' : 'scale-x-0',
                )}
              />
            </>
          )}
        </NavLink>
      ))}
    </nav>
  )
}

/**
 * Mobile drawer for VORTEX TRADE.
 *
 * Carries the parent-company link as well, since the TradeMark is hidden below
 * the header height at this breakpoint and the way back out must not be.
 */
export function TradeMobileNavigation({ className }: { className?: string }) {
  const { locale } = useLocale()
  const [open, setOpen] = useState(false)
  const panelId = useId()

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKeyDown)
    return () => document.removeEventListener('keydown', onKeyDown)
  }, [open])

  return (
    <div className={cn('lg:hidden', className)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? A11Y_LABELS.closeMenu[locale] : A11Y_LABELS.openMenu[locale]}
        className="flex size-10 items-center justify-center text-navy transition-colors hover:bg-off-white"
      >
        <svg
          viewBox="0 0 20 20"
          aria-hidden="true"
          className="size-5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        >
          {open ? (
            <>
              <path d="M5 5l10 10" />
              <path d="M15 5L5 15" />
            </>
          ) : (
            <>
              <path d="M3 6h14" />
              <path d="M3 10h14" />
              <path d="M3 14h14" />
            </>
          )}
        </svg>
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label={A11Y_LABELS.closeMenu[locale]}
            onClick={() => setOpen(false)}
            className="fixed inset-0 top-16 z-40 bg-navy/40"
          />

          <div
            id={panelId}
            className="fixed inset-x-0 top-16 z-50 border-b border-line bg-white"
          >
            <nav aria-label="Trade" className="flex flex-col">
              {TRADE_NAV.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end={item.href === '/businesses/trade'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'border-b border-line px-5 py-4 text-sm font-medium tracking-[0.08em] uppercase transition-colors',
                      isActive ? 'text-navy' : 'text-gray',
                    )
                  }
                >
                  {item.label[locale]}
                </NavLink>
              ))}

              <Link
                to="/"
                onClick={() => setOpen(false)}
                className="px-5 py-4 text-xs tracking-[0.08em] text-gray uppercase transition-colors hover:text-navy"
              >
                {locale === 'fa' ? 'بازگشت به هلدینگ ورتکس' : 'Back to Vortex Holding'}
              </Link>
            </nav>
          </div>
        </>
      )}
    </div>
  )
}