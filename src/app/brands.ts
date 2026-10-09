/** Identifiers for the independently branded sites in the ecosystem. */
export const BRAND_IDS = ['holding', 'trade', 'battery'] as const

export type BrandId = (typeof BRAND_IDS)[number]

export const DEFAULT_BRAND: BrandId = 'holding'

export function isBrandId(value: string): value is BrandId {
  return (BRAND_IDS as readonly string[]).includes(value)
}