import {
  BatteryCharging,
  BatteryMedium,
  Boxes,
  CircuitBoard,
  Gauge,
  Layers,
  Microscope,
  Package,
  Recycle,
  Truck,
  type LucideIcon,
} from 'lucide-react'

import type { BatteryCategory } from './battery-catalogue'

/**
 * Icon lookup for VORTEX BATTERY.
 *
 * Mirrors src/app/service-icons.ts and src/app/trade-icons.ts for the same
 * reason: the data module stays free of React and the icon set changes in one
 * place.
 *
 * Three lookups rather than one, because a category is not a single kind of
 * thing: `batteryCategoryIcon` marks a category in the navigation strip (a
 * cell *shape*), `batteryDetailIcon` marks the same category in a table of
 * contents (a *use*), and `batteryProcessIcon` is positional. Forcing all
 * three through one map would have meant picking marks that mean one thing in
 * one register and something else in another.
 */
const CATEGORY_ICONS: Record<BatteryCategory['icon'], LucideIcon> = {
  cylindrical: BatteryMedium,
  pouch: Layers,
  prismatic: Package,
  module: Boxes,
}

const DETAIL_ICONS: Record<BatteryCategory['icon'], LucideIcon> = {
  cylindrical: CircuitBoard,
  pouch: Layers,
  prismatic: Gauge,
  module: BatteryCharging,
}

const PROCESS_ICONS: readonly LucideIcon[] = [Microscope, Truck, Recycle]

/** Cell shape — used in the category navigation strip. */
export function batteryCategoryIcon(key: BatteryCategory['icon']): LucideIcon {
  return CATEGORY_ICONS[key]
}

/** Application emphasis — used in the products page table of contents. */
export function batteryDetailIcon(key: BatteryCategory['icon']): LucideIcon {
  return DETAIL_ICONS[key]
}

export function batteryProcessIcon(index: number): LucideIcon | undefined {
  return PROCESS_ICONS[index]
}