import { NavLink } from 'react-router-dom'

import { useLocale } from '../../app/locale-context'
import { A11Y_LABELS } from '../../app/copy'
import { NAV_ITEMS, type NavItem } from '../../app/navigation'
import { cn } from '../lib/cn'

/** Underline that fills in from the leading edge on hover / current page. */
function navLinkClasses(isActive: boolean) {
  return cn(
    'relative py-2 text-sm font-medium transition-colors duration-150',
    'text-gray hover:text-navy',
    isActive && 'text-navy',
  )
}

function NavRow({ item }: { item: NavItem }) {
  const { locale } = useLocale()

  return (
    <NavLink
      to={item.href}
      end={item.href === '/'}
      className={({ isActive }) => navLinkClasses(isActive)}
    >
      {({ isActive }) => (
        <>
          {item.label[locale]}
          <span
            aria-hidden="true"
            className={cn(
              'absolute inset-x-0 -bottom-0.5 h-px origin-left bg-navy transition-transform duration-200 rtl:origin-right',
              isActive ? 'scale-x-100' : 'scale-x-0',
            )}
          />
        </>
      )}
    </NavLink>
  )
}

/**
 * Desktop navigation. Hidden below the mobile breakpoint, where
 * MobileNavigation takes over — one navigation landmark either way.
 */
export function MainNavigation({ className }: { className?: string }) {
  const { locale } = useLocale()

  return (
    <nav
      aria-label={A11Y_LABELS.mainNav[locale]}
      className={cn('hidden items-center gap-8 md:flex', className)}
    >
      {NAV_ITEMS.map((item) => (
        <NavRow key={item.href} item={item} />
      ))}
    </nav>
  )
}