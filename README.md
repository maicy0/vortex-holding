# Vortex Holding

Bilingual (Persian / English) corporate website ecosystem for a diversified
business holding company. Static front-end demo: no backend, database,
authentication, or real form submission.

**The brand name is VORTEX — never "Vertex."**

Founded by Mr. Ma'dani (آقای معدنی) and Mr. Stiri (آقای استیری).

## Stack

React 19 · TypeScript · Vite · React Router · Tailwind CSS v4 · Lucide

## Scripts

```bash
npm run dev      # dev server
npm run build    # typecheck + production build to dist/
npm run preview  # serve the production build
npm run lint     # oxlint
```

## Design tokens

All tokens live in `src/styles/global.css`.

| Token | Value | Use |
| ----- | ----- | ---- |
| `--brand-navy` | `#0B1F33` | Headings, footer/CTA grounds, primary text |
| `--brand-navy-primary` | `#123653` | Buttons, icons, hover borders |
| `--brand-blue-muted` | `#52718A` | Secondary accents, meta labels |
| `--brand-off-white` | `#F6F8FA` | Subtle section grounds |
| `--brand-white` | `#FFFFFF` | Page and card surfaces |
| `--brand-gray` | `#657586` | Body copy, muted text |
| `--brand-border` | `#E2E8EF` | Hairline rules and card borders |
| `--brand-gold` | `#C7A66B` | Accent, used sparingly |

Navy and white carry the brand; gold appears only as rules, markers and one
button treatment.

The same eight properties, redefined under `[data-brand="trade"]`:

| Token | Value | Use |
| ----- | ----- | ---- |
| `--brand-navy` | `#1F2328` | Graphite — display and body type |
| `--brand-navy-primary` | `#2F353C` | Charcoal — buttons, hover borders |
| `--brand-blue-muted` | `#6D6A63` | Warm neutral for meta copy |
| `--brand-off-white` | `#F1EDE6` | Warm paper |
| `--brand-white` | `#FBF9F5` | Lightest surface |
| `--brand-gray` | `#565B62` | Body copy, muted text |
| `--brand-border` | `#DED7CB` | Hairline rules, warm not blue-grey |
| `--brand-gold` | `#B06F38` | Muted copper |

Trade reuses the holding's token *names* on purpose: the two brands differ only
in the values behind them, so every shared component renders correctly in both
without knowing which one it is in. Battery reuses them a second time, the same
way — three palettes, one set of names:

| Token | Value | Use |
| ----- | ----- | ---- |
| `--brand-navy` | `#0D1520` | Deep graphite-navy — display type, header, spec sheets |
| `--brand-navy-primary` | `#16212F` | Raised navy — drawer, footer, CTA band |
| `--brand-blue-muted` | `#5A6B7C` | Secondary accents, meta labels |
| `--brand-off-white` | `#F2F5F8` | Catalogue panel grounds |
| `--brand-white` | `#FFFFFF` | Page and card surfaces |
| `--brand-gray` | `#55636F` | Body copy, muted text |
| `--brand-border` | `#DCE3EA` | Hairline rules, technical look |
| `--brand-gold` | `#16C8E0` | Electric cyan, drawn only — see below |

**Cyan is drawn, never written.** `#16C8E0` on white is 2.0:1, and white text
on it is the same by symmetry — both fail WCAG AA, and a brand accent is exactly
where that is easiest to do by accident. So cyan appears as rules, markers, tag
grounds, icon strokes and fills, never as a text colour on a light ground. The
primary button is the exception that proves the rule: cyan ground with **navy**
text, which is 9:1. Every text element on the Battery pages is checked against
AA in the verification sweep; see `BatteryButtonLink`.

**Typography.** Inter (variable) for English, Vazirmatn (variable) for
Persian — both self-hosted via Fontsource, subsetted by unicode-range. The font
stack switches on `<html dir>`. Trade adds Source Serif 4 (display) and
Archivo (UI), also self-hosted. Battery uses Archivo for Latin display and adds
a third face for specification values: `battery-mono`, a monospace at tabular
figures for voltages, capacities and dimensions, so the columns of a
specification table line up. It resolves through the same
`--font-display-latin` / `--font-display` split described below, so a Persian
spec table still sets in the Persian face.

Headings take their face from `--font-display`, which is resolved in two steps
so that a brand and a direction can disagree without either winning by
accident — brands declare `--font-display-latin` (the Latin face) on their
wrapper, and `:root[dir]` declares the result. A wrapper declaration always
beats inheritance from an ancestor, so setting the resolved value inside the
brand palette would make the Trade serif beat the Persian face on every RTL
heading in the ecosystem. The reasoning is written out at length in
`global.css`; it is the one piece of this stylesheet that must not be tidied
up.

## Components

`src/shared/components/` — all exported from `index.ts`:

`BrandLogo` · `Breadcrumbs` · `Button` / `ButtonLink` · `BusinessCard` ·
`Container` · `Footer` · `InquiryCTA` · `LanguageSwitcher` ·
`MainNavigation` · `MobileNavigation` · `SectionHeading` · `ServiceCard` ·
`SiteHeader`

`ServiceSections` holds the section blocks the five service detail pages are
built from — `ServiceDescription` · `AudienceSection` · `UseCasesSection` ·
`InquirySection` · `DetailSection` · `CrossLinks`. They are primitives, not a
template: each service page composes them in its own order and supplies its own
markup where the composition needs to differ.

Conventions: square corners with hairline borders (no shadows, no gradients),
gold as the single accent, `Container` for alignment, and `flex`/logical
properties throughout so RTL needs no per-component special-casing.

### Trade components

`src/shared/components/trade/` — `TradeHeader` · `TradeNavigation` ·
`TradeMobileNavigation` · `TradeMark` · `TradeFooter` · `TradePageHero` ·
`TradeSectionHeading` · `TradeServiceGrid` · `TradeInquiryCTA` ·
`TradeButtonLink` · `TradeParentLink`

These compose the same primitives (`Container`, `LanguageSwitcher`, `useLocale`,
`cn`) but are separate components, not variants of the holding ones. Trade has
its own navigation, its own wordmark lockup and its own editorial layouts, and
threading brand conditionals through the shared header would put a route check
into every shared component. Duplicating four small components is cheaper than
that trade — and it is duplication of *presentation*, not of logic: the locale
provider, the brand context and every primitive still resolve from one place.

### Battery components

`src/shared/components/battery/` — `BatteryHeader` · `BatteryNavigation` ·
`BatteryMark` · `BatteryFooter` · `BatteryPageHero` · `BatterySectionHeading` ·
`BatteryCategoryGrid` · `BatteryProductCard` · `BatteryProductDetail` ·
`BatteryProductFilters` · `BatterySpecTable` · `BatteryDemoNotice` ·
`BatteryInquiryCTA` · `BatteryButtonLink`

The argument for these being separate from the Trade ones is the same, and the
divergence is structural rather than tonal: the Battery header is a dark navy bar
where Trade's is a paper one, the footer is a specification panel rather than
link columns, and the pages are built around a catalogue instead of a set of
services. Recolouring would have produced neither.

Three of them carry most of the design intent:

- **`BatterySpecTable`** renders every row in `PRODUCT_SPEC_FIELDS` whether or
  not the entry has a value for it. An absent field prints "Not supplied" rather
  than being dropped — a catalogue that silently shortens its table looks
  complete, and one that prints the absence looks like what it is. Values that
  are numbers set in `battery-mono` at tabular figures so columns align.
- **`BatteryProductCard`** is a spec sheet rather than a photograph: a hairline
  media panel with the cell format set large in the technical face, the four
  scanned-for fields below it in a fixed order, and a two-row application list
  capped in height so a row of cards is square whatever the labels happen to
  measure in either language.
- **`BatteryDemoNotice`** renders in three scopes — `banner`, `tag`, `caption`
  — so a cropped screenshot of a card or a table still carries its label.

`BatteryProductCard` and `BatteryProductDetail` are the reusable pair: the first
is for browsing, the second for reading, and they are driven by the same data so
a card's anchor lands on its own detail section.

## Structure

```
src/
├── app/                 # routing, providers, brand + locale config
│   ├── brands.ts            # brand ids
│   ├── brand-context.ts     # brand context + useBrand
│   ├── brand-provider.tsx   # data-brand scope
│   ├── site-layout.tsx      # parent-brand chrome (header/main/footer)
│   ├── trade-layout.tsx     # Trade chrome — a sibling of site-layout
│   ├── battery-layout.tsx   # Battery chrome — a third sibling
│   ├── locale.ts            # locale ids, direction map
│   ├── locale-context.ts    # locale context + useLocale
│   ├── locale-provider.tsx  # locale state; syncs <html lang>/<html dir>
│   ├── navigation.ts        # holding nav items, both locales
│   ├── routes.tsx           # route table
│   ├── services.ts          # the five lines of business
│   ├── service-pages.ts     # per-service detail copy (the five pages' words)
│   ├── founders.ts          # founder names and name formatting
│   ├── copy.ts              # site-wide bilingual copy
│   ├── service-icons.ts     # data -> lucide icon lookups
│   ├── site-names.ts        # wordmarks
│   ├── trade-copy.ts        # every word on the four Trade pages
│   ├── trade-services.ts    # the four trade lines, as data
│   ├── trade-navigation.ts  # Trade nav + the link back to the holding
│   ├── trade-crumbs.ts      # Trade breadcrumb trails
│   ├── trade-icons.ts       # data -> lucide icon lookups
│   ├── battery-catalogue.ts # categories + the nine demonstration entries
│   ├── battery-copy.ts      # every word on the four Battery pages
│   ├── battery-navigation.ts # Battery nav + the link back to the holding
│   ├── battery-crumbs.ts    # Battery breadcrumb trails
│   └── battery-icons.ts     # data -> lucide icon lookups
├── pages/               # one module per route
│   ├── service-layouts/     # one composition per service detail page
│   ├── trade/               # the four Trade pages: index/services/procurement/contact
│   └── batteries/           # the four Battery pages: index/products/wholesale/contact
├── shared/
│   ├── components/      # the design system
│   │   ├── trade/            # Trade's own chrome (see above)
│   │   └── battery/          # Battery's own chrome (see above)
│   └── lib/             # cn()
└── styles/global.css    # tokens, base styles, RTL typography
```

### Service detail pages

One route, `/services/:slug`, dispatches on the slug to a layout module in
`src/pages/service-layouts/`. Copy and composition are deliberately separate:

- `src/app/service-pages.ts` holds every word on all five pages. Adding a sixth
  service means adding an entry here.
- `src/pages/service-layouts/*.tsx` holds the arrangement. Each service gets
  its own section order, grid and section grounds, so the five read as
  different pages rather than one template filled five times. A layout may also
  ignore the section primitives entirely where the composition calls for
  something bespoke — the import/export "scope" list is a plain `<dl>` written
  in place.

`shared.tsx` holds the two things every page genuinely has in common: the
related-services strip (lead service first) and the cross-links back to the
parent holding site.

**Nothing is invented on these pages.** No minimum order quantity, price, lead
time, licence, stock level, product brand or country of operation appears
anywhere in `service-pages.ts`. Where a page would normally print figures —
the commercial terms on wholesale, the technical values on batteries — it
prints the *labels* of those values and leaves the values blank, and the
section says so in as many words. That is a deliberate empty state, not an
oversight.

### Trade site

Four routes under `/businesses/trade`, mounted by `TradeLayout` — a sibling of
`SiteLayout`, not a variant of it:

| Route                    | Page                                                |
| ------------------------ | --------------------------------------------------- |
| `/businesses/trade`      | Hero, four service areas, trade & sourcing process, inquiry CTA |
| `/businesses/trade/services`    | The four lines as commercial blocks            |
| `/businesses/trade/procurement` | Specification sheet + three-step sourcing process |
| `/businesses/trade/contact`     | Inquiry form + what a complete inquiry contains |

Split the same way the holding site splits: `trade-copy.ts` holds every word,
`trade-services.ts` holds the four lines as data with their route and anchor,
and `src/pages/trade/*.tsx` holds only the arrangement. Adding a fifth line of
business means adding an entry to `trade-services.ts` and one anchor to the
copy — no new page, no new route.

**TradeLayout is not a second application.** It shares the locale provider, the
brand context, `Container`, `useLocale` and `cn` with the holding site. What it
does not share is chrome: its own header, navigation, wordmark and footer,
because those differ in structure and not merely in colour.

### Battery site

Four routes under `/businesses/batteries`, mounted by `BatteryLayout` — the
third sibling layout:

| Route                          | Page                                                |
| ------------------------------ | --------------------------------------------------- |
| `/businesses/batteries`        | Hero, category navigation, featured catalogue, technical definitions, wholesale inquiry, CTA |
| `/businesses/batteries/products` | Catalogue: filters, search, card grid, and every entry as a full specification sheet |
| `/businesses/batteries/wholesale` | Specification groups + commercial terms as labels with blank rules |
| `/businesses/batteries/contact`   | Inquiry form + what a complete inquiry contains |

Split the same way the other two sites split: `battery-copy.ts` holds every word,
`battery-catalogue.ts` holds the four categories and the nine entries as data,
and `src/pages/batteries/*.tsx` holds only the arrangement.

**The catalogue is a demonstration fixture and says so.** Every entry in
`battery-catalogue.ts` is written to demonstrate the catalogue, the filters and
the specification tables — none of it is stock, none of it is quoted, and no
product listed is held or available. A single `batteryIsDemonstration` flag
drives all of it, so loading the first real part removes every notice at once.
`brand`, `datasheetUrl` and `image` are modelled as genuinely optional and left
unset on all nine entries: no manufacturer has been appointed, so any of the
three would be a fabricated claim. Cell formats and chemistries are treated as
real — they are classifications — while voltages, capacities and dimensions are
demonstration values.

`PRODUCT_SPEC_FIELDS` is the ordered specification list the sheet renders from.
Every row appears whether or not the entry has a value, and an absent one reads
"Not supplied". Dropping the row would make an incomplete entry
indistinguishable from a sparse one.

**Front-end only, by requirement.** Category filters and search are component
state, not URL state — so no file in the brand knows what route it is mounted
at, and a filtered view cannot be linked. That is a deliberate trade; the
entries are a demonstration catalogue, so linkable filtered views buy nothing.
There is no cart, no checkout and no payment path, and no page says anything
implying otherwise.

## Brands

Three independently branded sites share one app, scoped by route:

| Route                | Brand          | Scope       | Layout          |
| -------------------- | -------------- | ----------- | --------------- |
| `/`                  | VORTEX Holding | `holding`   | `SiteLayout`    |
| `/businesses/trade`  | VORTEX TRADE   | `trade`     | `TradeLayout`   |
| `/businesses/batteries` | VORTEX BATTERY | `battery` | `BatteryLayout` |

A brand's palette is a set of `--brand-*` custom properties selected by
`[data-brand="…"]`. To add one, define its tokens in `global.css` and register
its id in `src/app/brands.ts`.

A brand is applied by setting `data-brand` on a wrapper and changing nothing
else. Because all three brands reuse the same token names, every shared
component renders correctly in any of them without knowing which — and **no
component anywhere checks the pathname**. Trade's and Battery's independent
identities come from their own palettes, display typefaces and layout routes,
not from conditional styling. Battery's catalogue filters are component state
for the same reason: the moment the category lived in a query string, a file in
the brand would have had to know its route.

`/trade/*` redirects to `/businesses/trade`, which was Trade's pre-design
home. `/battery/*` redirects to `/businesses/batteries`. `/vertex/*` redirects
to `/`, since "Vertex" is not this company.

## Status

The parent-brand site is complete: homepage, about, services index, five service
detail pages, contact, and a 404 — all rendering from the bilingual data modules
in `src/app/`. The Trade and Battery sites are likewise complete on all four of
their routes.

| Route                                          | State                          |
| ---------------------------------------------- | ------------------------------ |
| `/`                                            | Homepage, eight sections       |
| `/about`                                       | Holding, structure, founders   |
| `/services`                                    | Services index                 |
| `/services/:slug` (five slugs)                 | Detail pages, one layout each   |
| `/contact`                                     | Demonstration form             |
| `/businesses/trade`                            | Trade overview, four service areas, process, CTA |
| `/businesses/trade/services`                   | Import/export, wholesale supply, sourcing, custom procurement |
| `/businesses/trade/procurement`                | Specification sheet + sourcing process |
| `/businesses/trade/contact`                    | Demonstration inquiry form + checklist |
| `/businesses/batteries`                        | Battery overview, categories, featured catalogue, technical definitions, wholesale, CTA |
| `/businesses/batteries/products`               | Catalogue: filters, search, 9 cards, 9 full specification sheets |
| `/businesses/batteries/wholesale`              | Specification groups + commercial terms as labels |
| `/businesses/batteries/contact`                | Demonstration inquiry form + checklist |
| anything else                                  | 404 (rendered in the brand the URL sits under) |

Verified against the production build: all four Battery routes render in the
battery palette with the dark header and the brand-suffixed title; every internal
link and in-page anchor resolves; filters, combined search, the empty state,
the announced result count and clear all behave; the inquiry form is inert with
nine labelled controls and a `?format=` preselect; responsive at 390 / 768 /
1280 / 1920 with no overflow and a working mobile drawer; `dir=rtl` with
Persian headings on the Persian face and no English left in `<main>` beyond
chemistries and cell formats; every text element at WCAG AA; holding and Trade
unaffected.

Still to do:

- **English localisation.** Every string is already stored as `{ en, fa }` and
  resolved per render, so English switches on today — it is draft translation
  awaiting review, not final copy.
- **Contact details.** No address, phone or email has been supplied and none
  has been invented. All three forms are front-end only: `preventDefault()` and
  a `role="status"` confirmation, with a visible notice that nothing is sent or
  stored.
- **Founder portraits.** Founders are shown by name and role only, with a
  typographic monogram standing in for a portrait.
- **Real catalogue.** The nine Battery entries are demonstration fixtures.
  Manufacturer, datasheet and photograph are modelled and unset, ready for the
  first real part.
- **Photography.** Current images are Wikimedia Commons placeholders chosen for
  subject matter, not brand imagery. See `public/images/ATTRIBUTION.md`.

### Nothing is invented

This holds for all three sites, and is the rule that shaped the Trade and
Battery pages most.

No minimum order quantity, price, lead time, licence, stock level, product
brand, port of origin or country of operation appears anywhere in
`trade-services.ts`, `trade-copy.ts`, `battery-catalogue.ts` or
`battery-copy.ts`. Where a commercial page would normally print figures, it
prints the *labels* of the figures a buyer needs and leaves a blank hairline
rule where the value belongs, labelled "Set per inquiry" / 'در هر درخواست تعیین
می‌شود'. The Trade homepage carries a panel saying so outright; the contact
pages state that no address, telephone number or email address has been supplied
for the demonstration. That is a deliberate empty state, not an oversight.

On the Battery catalogue the constraint is sharper, because a battery catalogue
is where invented figures would be most dangerous and least obviously wrong — a
voltage nobody checked looks exactly like a voltage somebody did. So:

- The nine entries are labelled a demonstration catalogue at **three
  independent scopes**: a banner at the top of the page, a tag on every card,
  and a caption under every specification sheet. A screenshot cropped to one
  card still carries its label.
- No product photograph is rendered. Not a placeholder `<img>`, not a stock
  photo of another manufacturer's cell — the media panel states the absence
  where the photograph would have been.
- `brand`, `datasheetUrl` and `image` are optional in the type and unset on
  every entry, and their absence renders as "Not supplied" / "No datasheet"
  rather than being hidden.
- The one photograph on the Battery site — 18650 and 21700 cells, CC BY 4.0 —
  is used in the hero only, with its credit inline, and `aria-hidden`,
  because the cells it shows are not the catalogue's cells.