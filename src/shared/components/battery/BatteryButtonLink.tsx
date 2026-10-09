import { Link } from 'react-router-dom'

import { cn } from '../../lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const BASE =
  'inline-flex items-center justify-center gap-2 font-medium ' +
  'transition-colors duration-150 whitespace-nowrap ' +
  'disabled:pointer-events-none disabled:opacity-50'

/**
 * The Battery brand's button register.
 *
 * Same square-cornered, hairline vocabulary as the other two brands, but set in
 * mono letterspaced small caps rather than the holding's plain sans — a
 * technical product catalogue labels its actions like equipment panels, not like
 * a corporate site.
 *
 * THE PRIMARY VARIANT INVERTS THE USUAL WAY ROUND, and that is deliberate.
 * Cyan on white is 2.0:1 and white on cyan is the same by symmetry — both fail
 * WCAG AA for text. So the primary button is a cyan ground carrying *navy* text
 * (9:1), rather than the navy-ground-white-text that passes on the other two
 * brands. It is the one place the accent is allowed to be a fill, and the type
 * on it is the accent's contrast partner, not the other way round.
 */
const VARIANTS: Record<Variant, string> = {
  primary: 'bg-gold text-navy hover:bg-navy hover:text-white',
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
    'battery-mono tracking-[0.12em] uppercase',
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
export function BatteryButtonLink({
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