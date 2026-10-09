import { Link } from 'react-router-dom'

import { cn } from '../../lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const BASE =
  'inline-flex items-center justify-center gap-2 font-medium ' +
  'transition-colors duration-150 whitespace-nowrap ' +
  'disabled:pointer-events-none disabled:opacity-50'

/**
 * Trade's button register.
 *
 * Square corners, as in the holding brand, but letterspaced and set in small
 * caps — the difference between a consumer action and a commercial one.
 * Colours come from the trade palette, so no variant names a brand explicitly.
 */
const VARIANTS: Record<Variant, string> = {
  primary: 'bg-navy text-white hover:bg-navy-primary',
  secondary:
    'border border-navy text-navy bg-transparent hover:bg-navy hover:text-white',
  ghost: 'text-navy hover:bg-off-white',
}

const SIZES: Record<Size, string> = {
  sm: 'h-9 px-4 text-xs',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-sm',
}

function classes(variant: Variant, size: Size, className?: string) {
  return cn(
    BASE,
    'tracking-[0.1em] uppercase',
    VARIANTS[variant],
    SIZES[size],
    className,
  )
}

/**
 * A button that navigates. Deliberately a Link and not a router-wrapped
 * <button>: middle-click, open-in-new-tab and keyboard activation all come
 * from the anchor element for free.
 */
export function TradeButtonLink({
  to,
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Link> & {
  variant?: Variant
  size?: Size
}) {
  return <Link to={to} className={classes(variant, size, className)} {...props} />
}