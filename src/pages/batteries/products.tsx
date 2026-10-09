import { useId, useMemo, useState } from 'react'

import { batteryCrumbs } from '../../app/battery-crumbs'
import {
  BATTERY_CATEGORIES,
  BATTERY_PRODUCTS,
  CATALOGUE_STATUS,
  findBatteryCategory,
} from '../../app/battery-catalogue'
import {
  BATTERY_CHROME,
  BATTERY_PRODUCTS_PAGE,
  batteryInquiryChecklist,
} from '../../app/battery-copy'
import { batteryDetailIcon } from '../../app/battery-icons'
import { useLocale } from '../../app/locale-context'
import { usePageTitle } from '../../app/use-page-title'
import { Container } from '../../shared/components/Container'
import { BatteryButtonLink } from '../../shared/components/battery/BatteryButtonLink'
import { BatteryDemoNotice } from '../../shared/components/battery/BatteryDemoNotice'
import { BatteryInquiryCTA, BatteryParentLink } from '../../shared/components/battery/BatteryInquiryCTA'
import { BatteryPageHero } from '../../shared/components/battery/BatteryPageHero'
import { BatteryProductCard } from '../../shared/components/battery/BatteryProductCard'
import { BatteryProductDetail } from '../../shared/components/battery/BatteryProductDetail'
import { BatteryProductFilters } from '../../shared/components/battery/BatteryProductFilters'
import { BatterySectionHeading } from '../../shared/components/battery/BatterySectionHeading'

/**
 * VORTEX BATTERY — the product catalogue.
 *
 * THE PAGE'S STRUCTURE IS ONE COMPONENT, USED TWICE, ON PURPOSE.
 *
 * Browsing mode is a grid of cards with the category and text filters above it.
 * Detail mode is the same entries rendered as the full product-detail pattern,
 * one per section, anchored by product id.
 *
 * Both read the same filter state and the same data, so a visitor can narrow to
 * a format and then read it properly — and a card link lands on the detail
 * pattern for that exact entry, which is what makes the anchor links from the
 * homepage and the category grid resolve to the right place instead of to the
 * top of a page.
 *
 * The filter lives in component state and not in the URL, so nothing in this
 * brand knows what route it is mounted at. That is a deliberate trade: a
 * filtered view cannot be linked, and in exchange no file in VORTEX BATTERY
 * contains a route-string conditional.
 */
export function BatteryProductsPage() {
  const { locale } = useLocale()
  const copy = BATTERY_PRODUCTS_PAGE
  usePageTitle(copy.hero.title[locale])

  const [activeCategory, setActiveCategory] = useState('all')
  const [query, setQuery] = useState('')

  /* A stable id per section anchor, so the "back to top" link and the section
     headings can share one reference without repeating the string. */
  const catalogueId = useId()

  const results = useMemo(() => {
    const needle = query.trim().toLowerCase()

    return BATTERY_PRODUCTS.filter((product) => {
      if (activeCategory !== 'all' && product.category !== activeCategory) {
        return false
      }
      if (!needle) return true

      const category = findBatteryCategory(product.category)

      /* Search across every field a buyer might reasonably type: the name, the
         chemistry, the applications, and the category name. Deliberately not
         across the numbers — a visitor typing "3.6" wants a voltage match, and
         getting a capacity match for the same three characters is noise. */
      const haystack = [
        product.name.en,
        product.name.fa,
        product.chemistry.en,
        product.chemistry.fa,
        category?.label.en ?? '',
        category?.label.fa ?? '',
        ...(product.applications ?? []).flatMap((item) => [item.en, item.fa]),
      ]
        .join(' ')
        .toLowerCase()

      return haystack.includes(needle)
    })
  }, [activeCategory, query])

  const resultsId = `${catalogueId}-results`

  return (
    <>
      <BatteryPageHero
        eyebrow={copy.hero.eyebrow[locale]}
        title={copy.hero.title[locale]}
        lede={copy.hero.lede[locale]}
        crumbs={batteryCrumbs(
          BATTERY_CHROME.breadcrumbHome[locale],
          BATTERY_CHROME.breadcrumbBattery[locale],
          copy.hero.title[locale],
        )}
      />

      {/* --- Filters and catalogue ---------------------------------------
          id="catalogue" is the target of every link into this page: the
          homepage's featured cards, the category grid, and the catalogue's own
          back-to-top link. All three resolve to the top of the catalogue rather
          than to the top of the document. */}
      <section id="catalogue" className="scroll-mt-28 bg-white">
        <Container size="wide" className="py-16 lg:py-20">
          <BatteryDemoNotice
            title={CATALOGUE_STATUS.bannerTitle[locale]}
            body={CATALOGUE_STATUS.bannerBody[locale]}
          />

          <BatteryProductFilters
            className="mt-8"
            categories={BATTERY_CATEGORIES}
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
            query={query}
            onQueryChange={setQuery}
            resultCount={results.length}
            resultLabel={BATTERY_CHROME.entriesLabel[locale]}
            labels={{
              filters: BATTERY_CHROME.filtersLabel[locale],
              search: copy.filters.searchLabel[locale],
              searchPlaceholder: copy.filters.searchPlaceholder[locale],
              searchHint: copy.filters.searchHint[locale],
              category: copy.filters.categoryLabel[locale],
              all: copy.filters.allLabel[locale],
              clear: BATTERY_CHROME.clearFilters[locale],
            }}
          />

          {/* aria-live on the count is what makes filtering usable without
              sight: the number changes, and it is announced. The visual count
              is already printed in the filter panel — this repeats it into the
              results region for assistive technology. */}
          <div id={resultsId} aria-live="polite" className="sr-only">
            {results.length} {BATTERY_CHROME.entriesLabel[locale]}
          </div>

          {results.length === 0 ? (
            <div className="mt-12 border border-line bg-off-white p-10 lg:p-16">
              <h2 className="title text-navy">{copy.emptyState.title[locale]}</h2>
              <p className="mt-4 max-w-xl text-gray">{copy.emptyState.body[locale]}</p>

              <div className="mt-8 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setActiveCategory('all')
                    setQuery('')
                  }}
                  className="battery-mono inline-flex h-9 items-center justify-center border border-navy bg-transparent px-4 text-xs tracking-[0.12em] text-navy uppercase transition-colors hover:bg-navy hover:text-white"
                >
                  {BATTERY_CHROME.clearFilters[locale]}
                </button>
                <BatteryButtonLink
                  to="/businesses/batteries/contact"
                  size="sm"
                >
                  {copy.detail.inquiryLabel[locale]}
                </BatteryButtonLink>
              </div>
            </div>
          ) : (
            <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {results.map((product) => (
                <li key={product.id} className="flex">
                  <BatteryProductCard
                    product={product}
                    href={`#${product.id}`}
                    className="w-full"
                  />
                </li>
              ))}
            </ul>
          )}
        </Container>
      </section>

      {/* --- Detail pattern ----------------------------------------------
          Every entry in the catalogue, in full. On a real catalogue this is
          where a product's own page would be; rendering it inline under the
          grid means one route serves both jobs and each entry still has a real
          anchor to be linked to.

          Rendered from the full catalogue rather than from `results`: narrowing
          the grid should not make the reference section underneath it silently
          shorter, or an entry would appear to have been deleted. */}
      <section className="border-t border-line bg-off-white">
        <Container size="wide" className="py-20 lg:py-24">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <BatterySectionHeading
              eyebrow={copy.contents.eyebrow[locale]}
              title={copy.contents.title[locale]}
              lede={copy.contents.lede[locale]}
              className="lg:max-w-2xl"
            />

            <a
              href="#catalogue"
              className="battery-mono text-[0.6875rem] tracking-[0.14em] text-blue-muted uppercase transition-colors hover:text-navy"
            >
              {copy.detail.backToTop[locale]}
            </a>
          </div>

          {/* A contents list rather than a jump-nav of anchors: it names each
              category, shows how many entries it holds, and gives the section
              a structure a screen-reader user can skip past. */}
          <ul className="mt-12 grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {BATTERY_CATEGORIES.map((category) => {
              const Icon = batteryDetailIcon(category.icon)
              const count = BATTERY_PRODUCTS.filter(
                (product) => product.category === category.id,
              ).length

              return (
                <li key={category.id} className="bg-white">
                  <a
                    href={`#${category.anchor}`}
                    className="group flex h-full flex-col gap-3 p-6 transition-colors hover:bg-white"
                  >
                    <Icon aria-hidden className="size-5 text-gold" />
                    <span className="title text-[1.125rem] text-navy">
                      {category.label[locale]}
                    </span>
                    <span className="battery-mono text-[0.6875rem] tracking-[0.12em] text-blue-muted uppercase">
                      {count} {BATTERY_CHROME.entriesLabel[locale]}
                    </span>
                    <span
                      aria-hidden="true"
                      className="mt-auto block h-px w-8 bg-line transition-colors group-hover:bg-gold"
                    />
                  </a>
                </li>
              )
            })}
          </ul>

          {BATTERY_CATEGORIES.map((category) => {
            const entries = BATTERY_PRODUCTS.filter(
              (product) => product.category === category.id,
            )

            return (
              <div
                key={category.id}
                id={category.anchor}
                className="mt-16 scroll-mt-28 first:mt-0"
              >
                <BatterySectionHeading
                  as="h2"
                  eyebrow={category.label[locale]}
                  title={category.summary[locale]}
                />

                <div className="mt-8 flex flex-col gap-6">
                  {entries.map((product) => (
                    <BatteryProductDetail key={product.id} product={product} />
                  ))}
                </div>
              </div>
            )
          })}
        </Container>
      </section>

      <BatteryParentLink
        label={BATTERY_CHROME.backToParentLabel[locale]}
        description={BATTERY_CHROME.backToParentBody[locale]}
      />

      <BatteryInquiryCTA
        eyebrow={copy.cta.eyebrow[locale]}
        title={copy.cta.title[locale]}
        description={copy.cta.description[locale]}
        actionLabel={copy.cta.actionLabel[locale]}
        actionHref="/businesses/batteries/contact"
        context={batteryInquiryChecklist(locale)}
        contextLabel={BATTERY_CHROME.includeLabel[locale]}
      />
    </>
  )
}