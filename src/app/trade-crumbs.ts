import type { Crumb } from '../shared/components/Breadcrumbs'

/**
 * The standard Trade breadcrumb trail: Home > VORTEX TRADE > current page.
 *
 * Lives here rather than beside the hero component so that component module
 * exports only components — a file mixing a component and a helper defeats
 * React Fast Refresh for everything in it.
 *
 * `home` and `trade` are passed rather than imported so the caller resolves
 * them from its own copy module, and the current page is appended without a
 * href: Breadcrumbs never links the last crumb, and not giving it one keeps
 * the intent obvious at the call site.
 */
export function tradeCrumbs(
  home: string,
  trade: string,
  current: string,
): Crumb[] {
  return [
    { label: home, href: '/' },
    { label: trade, href: '/businesses/trade' },
    { label: current },
  ]
}