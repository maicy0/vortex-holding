import { createContext, useContext } from 'react'

import { DEFAULT_BRAND, type BrandId } from './brands'

export const BrandContext = createContext<BrandId>(DEFAULT_BRAND)

export function useBrand(): BrandId {
  return useContext(BrandContext)
}