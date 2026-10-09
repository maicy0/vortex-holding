import { Outlet } from 'react-router-dom'

import type { BrandId } from './brands'
import { BrandProvider } from './brand-provider'

/**
 * Pathless layout route that applies one brand's scope to everything nested
 * under it. Design tokens live in src/styles/global.css; this only sets the
 * hook the CSS keys off.
 */
export function BrandLayout({ brand }: { brand: BrandId }) {
  return (
    <BrandProvider brand={brand}>
      <Outlet />
    </BrandProvider>
  )
}