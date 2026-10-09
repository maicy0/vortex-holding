import { cn } from '../lib/cn'

/**
 * Centred max-width wrapper for page content. `size="wide"` is for full-bleed
 * grids that still need to align with surrounding text.
 *
 * Renders a <div>; nothing in the design system currently needs another
 * element, so there is no polymorphic escape hatch to maintain.
 */
export function Container({
  size = 'default',
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<'div'> & {
  size?: 'default' | 'wide' | 'narrow'
}) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-5 sm:px-8',
        size === 'narrow' && 'max-w-3xl',
        size === 'default' && 'max-w-6xl',
        size === 'wide' && 'max-w-[85rem]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}