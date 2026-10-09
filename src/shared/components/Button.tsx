import { Link } from 'react-router-dom'

import { cn } from '../lib/cn'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

const BASE =
  'inline-flex items-center justify-center gap-2 font-medium ' +
  'transition-colors duration-150 whitespace-nowrap ' +
  'disabled:pointer-events-none disabled:opacity-50'

const VARIANTS: Record<Variant, string> = {
  primary:
    'bg-navy text-white hover:bg-navy-primary active:bg-navy-primary',
  secondary:
    'border border-navy text-navy bg-transparent hover:bg-navy hover:text-white',
  ghost: 'text-navy hover:bg-off-white',
}

const SIZES: Record<Size, string> = {
  // Square-ish hit areas, not pill-shaped: this is a corporate register.
  sm: 'h-9 px-4 text-sm',
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-base',
}

function classes(
  variant: Variant,
  size: Size,
  className: string | undefined,
  extra?: string,
) {
  return cn(BASE, VARIANTS[variant], SIZES[size], extra, className)
}

type ButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  variant?: Variant
  size?: Size
}

/** For actions that are not navigation. */
export function Button({
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={classes(variant, size, className)}
      {...props}
    />
  )
}

type ButtonLinkProps = React.ComponentPropsWithoutRef<typeof Link> & {
  variant?: Variant
  size?: Size
}

/**
 * A button that navigates. Deliberately a Link and not a router-wrapped
 * <button>: middle-click, open-in-new-tab and keyboard activation all come
 * from the anchor element for free.
 */
export function ButtonLink({
  variant = 'primary',
  size = 'md',
  className,
  ...props
}: ButtonLinkProps) {
  return <Link className={classes(variant, size, className)} {...props} />
}