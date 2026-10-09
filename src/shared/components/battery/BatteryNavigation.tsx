import { useEffect, useId, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'

import { useLocale } from '../../../app/locale-context'
import { BATTERY_CHROME } from '../../../app/battery-copy'
import { BATTERY_NAV, BATTERY_PARENT_LINK } from '../../../app/battery-navigation'
import { cn } from '../../lib/cn'

/**
 * Desktop navigation for VORTEX BATTERY.
 *
 * Structured rather than prose: links are set in the mono register with a wide
 * letter-space, and the current page is marked with a cyan rule rather than by
 * a colour change alone — a colour change alone would be the only thing
 * distinguishing the active page, and it is the one thing a user with a colour
 * vision deficiency cannot rely on.
 */
export function BatteryNavigation({ className }: { className?: string }) {
  const { locale } = useLocale()

  return (
    <nav
      aria-label="Battery"
      className={cn('hidden items-center gap-7 lg:flex', className)}
    >
      {BATTERY_NAV.map((item) => (
        <NavLink
          key={item.href}
          to={item.href}
          end={item.href === '/businesses/batteries'}
          className={({ isActive }) =>
            cn(
              'battery-mono relative py-2 text-[0.75rem] font-medium tracking-[0.12em] uppercase transition-colors duration-150',
              isActive ? 'text-white' : 'text-white/60 hover:text-white',
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
 * Mobile drawer for VORTEX BATTERY.
 *
 * Carries the parent-company link as well, since the mark is on the dark bar
 * above it and the way back out of the brand must not depend on spotting it.
 */
export function BatteryMobileNavigation({ className }: { className?: string }) {
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
        aria-label={open ? 'Close menu' : 'Open menu'}
        className="flex size-10 items-center justify-center text-white transition-colors hover:bg-white/10"
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
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 top-16 z-40 bg-navy/60"
          />

          <div
            id={panelId}
            className="fixed inset-x-0 top-16 z-50 border-b border-white/10 bg-navy-primary"
          >
            <nav aria-label="Battery" className="flex flex-col">
              {BATTERY_NAV.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end={item.href === '/businesses/batteries'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'battery-mono border-b border-white/10 px-5 py-4 text-xs font-medium tracking-[0.12em] uppercase transition-colors',
                      isActive ? 'text-gold' : 'text-white/70',
                    )
                  }
                >
                  {item.label[locale]}
                </NavLink>
              ))}

              <Link
                to={BATTERY_PARENT_LINK.href}
                onClick={() => setOpen(false)}
                className="battery-mono px-5 py-4 text-[0.6875rem] tracking-[0.12em] text-white/50 uppercase transition-colors hover:text-white"
              >
                {BATTERY_CHROME.drawerParentLabel[locale]}
              </Link>
            </nav>
          </div>
        </>
      )}
    </div>
  )
}