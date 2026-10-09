import {
  BatteryCharging,
  Boxes,
  ClipboardList,
  Container,
  Search,
  Store,
  Truck,
  type LucideIcon,
} from 'lucide-react'

import type { Service } from './services'

/**
 * Icon lookup, resolved from the keys stored in the data modules.
 *
 * Keeping the mapping here rather than in `services.ts` means the data file
 * stays free of React, and the icon set changes in exactly one place.
 */
const SERVICE_ICONS: Record<Service['icon'], LucideIcon> = {
  container: Container,
  warehouse: Boxes,
  store: Store,
  battery: BatteryCharging,
  sourcing: Search,
}

/**
 * Position-matched to HOME_COPY.process.steps. Guarded so a future fourth or
 * reordered step fails loudly in development rather than rendering nothing.
 */
const PROCESS_ICONS: readonly LucideIcon[] = [Search, ClipboardList, Truck]

export function serviceIcon(key: Service['icon']): LucideIcon {
  return SERVICE_ICONS[key]
}

export function processIcon(index: number): LucideIcon | undefined {
  return PROCESS_ICONS[index]
}
