import { Navigate, Route, Routes } from 'react-router-dom'

import { AboutPage } from '../pages/about'
import { BatteryContactPage } from '../pages/batteries/contact'
import { BatteryHomePage } from '../pages/batteries/index'
import { BatteryProductsPage } from '../pages/batteries/products'
import { BatteryWholesalePage } from '../pages/batteries/wholesale'
import { ContactPage } from '../pages/contact'
import { HomePage } from '../pages/home'
import { NotFoundPage } from '../pages/not-found'
import { ServiceDetailPage } from '../pages/service-detail'
import { ServicesIndexPage } from '../pages/services'
import { TradeContactPage } from '../pages/trade/contact'
import { TradeHomePage } from '../pages/trade/index'
import { TradeProcurementPage } from '../pages/trade/procurement'
import { TradeServicesPage } from '../pages/trade/services'
import type { BrandId } from './brands'
import { BatteryLayout } from './battery-layout'
import { SiteLayout } from './site-layout'
import { TradeLayout } from './trade-layout'

/**
 * Route map for the whole ecosystem.
 *
 * The parent brand mounts SiteLayout. Trade and Battery each mount their own
 * layout, carrying their own header, footer, palette and display typeface,
 * entirely self-contained and entirely sibling to each other.
 *
 * Each brand's chrome comes from its own layout route rather than from a
 * conditional on the pathname, so no component anywhere has to ask what route
 * it is rendered under.
 *
 * `<Routes>` only accepts `<Route>`/`<Fragment>` children, so providers are
 * applied through layout routes rather than inline.
 *
 * The five holding service routes collapse into one `/services/:slug` entry:
 * the content is data (src/app/services.ts), so there is nothing to gain from
 * five separate route elements. The four Battery routes do NOT collapse, for
 * the opposite reason — a catalogue, a wholesale sheet and a form are different
 * documents, not one document with different data.
 *
 * Neither brand declares a `*` route. An unknown path under /businesses/… falls
 * through to the holding site's 404 rather than to a branded one, which is the
 * honest outcome for a URL that is not part of any site's navigation.
 *
 * `*` must stay last — React Router ranks splats lowest, but relying on that
 * silently breaks the moment a real route is appended below it.
 */
export function AppRoutes() {
  return (
    <Routes>
      <Route element={<SiteLayout brand="holding" />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/services" element={<ServicesIndexPage />} />
        <Route path="/services/:slug" element={<ServiceDetailPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/*
          Unknown holding-site paths render the holding 404 rather than the
          Trade one, so a bad link inside a brand stays in that brand.
        */}
        <Route path="*" element={<NotFoundPage />} />
      </Route>

      <Route path="/businesses/trade" element={<TradeLayout />}>
        <Route index element={<TradeHomePage />} />
        <Route path="services" element={<TradeServicesPage />} />
        <Route path="procurement" element={<TradeProcurementPage />} />
        <Route path="contact" element={<TradeContactPage />} />
      </Route>

      <Route path="/businesses/batteries" element={<BatteryLayout />}>
        <Route index element={<BatteryHomePage />} />
        <Route path="products" element={<BatteryProductsPage />} />
        <Route path="wholesale" element={<BatteryWholesalePage />} />
        <Route path="contact" element={<BatteryContactPage />} />
      </Route>

      {/* The old /trade and /battery paths were each brand's pre-design home.
          They are now real sites under /businesses, so the old URLs redirect
          rather than 404-ing for anyone who has them. */}
      <Route path="/trade/*" element={<Navigate to="/businesses/trade" replace />} />
      <Route
        path="/battery/*"
        element={<Navigate to="/businesses/batteries" replace />}
      />

      {/* Legacy/incorrect spelling guard: "Vertex" is not this company. */}
      <Route path="/vertex/*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export type { BrandId }