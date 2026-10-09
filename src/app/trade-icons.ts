import {
  Boxes,
  ClipboardCheck,
  Container,
  Search,
  type LucideIcon,
} from 'lucide-react'

import type { TradeService } from './trade-services'

/**
 * Icon lookup for the Trade service set.
 *
 * Mirrors src/app/service-icons.ts for the holding site, for the same reason:
 * the data module stays free of React and the icon set changes in one place.
 */
const TRADE_ICONS: Record<TradeService['icon'], LucideIcon> = {
  import: Container,
  wholesale: Boxes,
  sourcing: Search,
  procurement: ClipboardCheck,
}

/**
 * Position-matched to TRADE_COPY.process.steps. Guarded so a fourth or
 * reordered step fails loudly in development rather than rendering nothing.
 */
const PROCESS_ICONS: readonly LucideIcon[] = [Search, ClipboardCheck, Container]

export function tradeServiceIcon(key: TradeService['icon']): LucideIcon {
  return TRADE_ICONS[key]
}

export function tradeProcessIcon(index: number): LucideIcon | undefined {
  return PROCESS_ICONS[index]
}