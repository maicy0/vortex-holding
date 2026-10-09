import { Menu, X } from 'lucide-react'
import { useEffect, useId, useState } from 'react'
import { NavLink } from 'react-router-dom'

import { useLocale } from '../../app/locale-context'
import { A11Y_LABELS } from '../../app/copy'
import { NAV_ITEMS } from '../../app/navigation'
import { cn } from '../lib/cn'

/**
 * Mobile navigation drawer.
 *
 * The trigger carries aria-expanded and aria-controls; Escape and a tap on the
 * scrim both close the panel, as does activating a link. Background scrolling
 * is locked while open so the page behind does not move under the overlay.
 */
export function MobileNavigation({ className }: { className?: string }) {
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
    <div className={cn('md:hidden', className)}>
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        aria-expanded={open}
        aria-controls={panelId}
        aria-label={open ? A11Y_LABELS.closeMenu[locale] : A11Y_LABELS.openMenu[locale]}
        className="flex size-10 items-center justify-center text-navy transition-colors hover:bg-off-white"
      >
        {open ? (
          <X aria-hidden className="size-5" />
        ) : (
          <Menu aria-hidden className="size-5" />
        )}
      </button>

      {open && (
        <>
          <button
            type="button"
            aria-label={A11Y_LABELS.closeMenu[locale]}
            onClick={() => setOpen(false)}
            className="fixed inset-0 top-[var(--mobile-nav-offset,4rem)] z-40 bg-navy/40"
          />

          <div
            id={panelId}
            className="fixed inset-x-0 top-[var(--mobile-nav-offset,4rem)] z-50 border-b border-line bg-white"
          >
            <nav aria-label={A11Y_LABELS.mobileNav[locale]} className="flex flex-col">
              {NAV_ITEMS.map((item) => (
                <NavLink
                  key={item.href}
                  to={item.href}
                  end={item.href === '/'}
                  onClick={() => setOpen(false)}
                  className={({ isActive }) =>
                    cn(
                      'border-b border-line px-5 py-4 text-base font-medium transition-colors last:border-b-0',
                      isActive ? 'text-navy' : 'text-gray',
                    )
                  }
                >
                  {item.label[locale]}
                </NavLink>
              ))}
            </nav>
          </div>
        </>
      )}
    </div>
  )
}