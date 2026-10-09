import {
  BATTERY_CATEGORIES,
  BATTERY_PRODUCTS,
  CATALOGUE_STATUS,
} from '../../app/battery-catalogue'
import {
  BATTERY_CHROME,
  BATTERY_HOME,
  BATTERY_POSITION,
  BATTERY_PROCESS,
  BATTERY_TECHNICAL_TERMS,
  batteryInquiryChecklist,
} from '../../app/battery-copy'
import { batteryProcessIcon } from '../../app/battery-icons'
import { useLocale } from '../../app/locale-context'
import { usePageTitle } from '../../app/use-page-title'
import { Container } from '../../shared/components/Container'
import { BatteryButtonLink } from '../../shared/components/battery/BatteryButtonLink'
import { BatteryCategoryGrid } from '../../shared/components/battery/BatteryCategoryGrid'
import { BatteryDemoNotice } from '../../shared/components/battery/BatteryDemoNotice'
import { BatteryInquiryCTA, BatteryParentLink } from '../../shared/components/battery/BatteryInquiryCTA'
import { BatteryProductCard } from '../../shared/components/battery/BatteryProductCard'
import { BatterySectionHeading } from '../../shared/components/battery/BatterySectionHeading'

/**
 * VORTEX BATTERY homepage.
 *
 * A product site's homepage is not a summary of the company — it is the front
 * of a catalogue. So this opens on the categories rather than on a pitch, and
 * everything after the featured section is reference material a buyer actually
 * needs: the vocabulary, the process, and a plain statement of what the site is.
 *
 * The hero is the one place photography appears, and it is the only cleared
 * battery image in the project. It sits behind a desaturated navy wash on the
 * trailing half of the frame — a photograph of loose cells is a texture that
 * says "this is a cell business" without pretending to be a product shot.
 *
 * All Battery chrome is shared; only the composition is this page's.
 */
export function BatteryHomePage() {
  const { locale } = useLocale()
  const copy = BATTERY_HOME
  usePageTitle(copy.hero.title[locale])

  /* The featured section takes four entries from across the catalogue rather
     than the first four, so the homepage shows the range of formats instead of
     only the cylindrical ones. Every card still links to the same detail
     pattern on the products page, so nothing here is a one-off. */
  const featured = [
    BATTERY_PRODUCTS.find((product) => product.id === '18650-nmc'),
    BATTERY_PRODUCTS.find((product) => product.id === 'pouch-nmc'),
    BATTERY_PRODUCTS.find((product) => product.id === 'prismatic-lfp-280'),
    BATTERY_PRODUCTS.find((product) => product.id === 'module-21700-10s'),
  ].filter((product): product is NonNullable<typeof product> => Boolean(product))

  /* Category sizes for the grid, computed from the catalogue rather than typed
     into the data — so a fixture added to the catalogue is counted here too. */
  const entryCount = BATTERY_CATEGORIES.reduce<Record<string, number>>(
    (counts, category) => {
      counts[category.id] = BATTERY_PRODUCTS.filter(
        (product) => product.category === category.id,
      ).length
      return counts
    },
    {},
  )

  return (
    <>
      {/* --- Hero ---------------------------------------------------------
          Split rather than overlaid: the type block is solid navy and the
          image occupies the trailing half, so the photograph never sits under
          the headline. */}
      <section className="relative isolate overflow-hidden bg-navy text-white">
        <Container size="wide" className="py-20 lg:py-28">
          <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
            <div className="reveal flex flex-col lg:col-span-7">
              <p className="battery-mono flex items-center gap-3 text-[0.6875rem] font-medium tracking-[0.16em] text-gold uppercase">
                <span aria-hidden="true" className="block h-px w-8 bg-gold" />
                {copy.hero.eyebrow[locale]}
              </p>

              <h1 className="display mt-6 text-white">{copy.hero.title[locale]}</h1>

              <p className="mt-7 max-w-2xl text-lg leading-[1.65] text-white/70">
                {copy.hero.lede[locale]}
              </p>

              <div className="mt-10 flex flex-wrap gap-3">
                <BatteryButtonLink
                  to={copy.hero.primaryCtaHref}
                  size="lg"
                  className="bg-gold text-navy hover:bg-white hover:text-navy"
                >
                  {copy.hero.primaryCta[locale]}
                </BatteryButtonLink>
                <BatteryButtonLink
                  to={copy.hero.secondaryCtaHref}
                  variant="secondary"
                  size="lg"
                  className="border-white/40 text-white hover:bg-white hover:text-navy"
                >
                  {copy.hero.secondaryCta[locale]}
                </BatteryButtonLink>
              </div>
            </div>

            {/* The image is decorative here — the cells it shows are not the
                catalogue's cells — so it is hidden from assistive technology
                rather than given a caption that would imply otherwise. */}
            <div className="relative lg:col-span-5">
              <div className="relative aspect-4/3 overflow-hidden border border-white/10">
                <img
                  src="/images/battery-cells.webp"
                  alt=""
                  aria-hidden="true"
                  loading="eager"
                  className="size-full object-cover grayscale-[0.55] contrast-125"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-navy/45 mix-blend-multiply"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-linear-to-t from-navy via-transparent to-transparent"
                />
              </div>

              {/* Credit for the photograph, on the element that uses it —
                  this image is CC BY 4.0 and the licence requires it. */}
              <p className="mt-3 text-[0.6875rem] leading-relaxed text-white/45">
                {copy.hero.imageCredit[locale]}
              </p>
            </div>
          </div>
        </Container>

        {/* Three lines naming what the business is. A spec strip: ruled above,
            ruled between, no boxes. */}
        <div className="border-t border-white/10">
          <Container size="wide" className="py-6">
            <ul className="grid gap-6 sm:grid-cols-3">
              {copy.heroFacts.map((fact, index) => (
                <li
                  key={fact.en}
                  className="flex items-baseline gap-3 text-sm text-white/60"
                >
                  <span className="battery-mono text-gold">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  {fact[locale]}
                </li>
              ))}
            </ul>
          </Container>
        </div>
      </section>

      {/* --- Category navigation ----------------------------------------
          The catalogue's front door. First thing after the hero and before the
          featured products, because a visitor who already knows the format they
          want should reach it in one click. */}
      <section className="bg-white">
        <Container size="wide" className="py-20 lg:py-24">
          <BatterySectionHeading
            index={1}
            eyebrow={copy.categories.eyebrow[locale]}
            title={copy.categories.title[locale]}
            lede={copy.categories.lede[locale]}
          />

          <BatteryCategoryGrid
            categories={BATTERY_CATEGORIES}
            entryCount={entryCount}
            entriesLabel={BATTERY_CHROME.entriesLabel[locale]}
            className="mt-12"
          />
        </Container>
      </section>

      {/* --- Featured catalogue -----------------------------------------
          Real card instances, not a picture of cards, so the homepage and the
          products page cannot present the same entry differently. */}
      <section className="bg-off-white">
        <Container size="wide" className="py-20 lg:py-24">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <BatterySectionHeading
              index={2}
              eyebrow={copy.featured.eyebrow[locale]}
              title={copy.featured.title[locale]}
              lede={copy.featured.lede[locale]}
              className="lg:max-w-2xl"
            />

            <BatteryButtonLink
                to="/businesses/batteries/products"
                variant="secondary"
              >
                {copy.featured.allProductsLabel[locale]}
              </BatteryButtonLink>
          </div>

          <BatteryDemoNotice
            className="mt-10"
            title={CATALOGUE_STATUS.bannerTitle[locale]}
            body={CATALOGUE_STATUS.bannerBody[locale]}
          />

          <ul className="mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {featured.map((product) => (
              <li key={product.id} className="flex">
                <BatteryProductCard
                  product={product}
                  href={`/businesses/batteries/products#${product.id}`}
                  className="w-full"
                />
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* --- Technical information ---------------------------------------
          Definitions, not figures. A buyer who cannot read a datasheet cannot
          check a supplier, so the vocabulary is the reference material — and
          the register is the vocabulary, not the numbers. */}
      <section className="bg-navy text-white">
        <Container size="wide" className="py-20 lg:py-24">
          <BatterySectionHeading
            index={3}
            eyebrow={copy.technical.eyebrow[locale]}
            title={copy.technical.title[locale]}
            lede={copy.technical.lede[locale]}
            tone="light"
          />

          <dl className="mt-14 grid gap-px border border-white/10 bg-white/10 md:grid-cols-2">
            {BATTERY_TECHNICAL_TERMS.map((term) => (
              <div key={term.key} className="bg-navy p-8">
                <dt className="battery-mono flex items-center gap-3 text-[0.6875rem] font-medium tracking-[0.16em] text-gold uppercase">
                  <span aria-hidden="true" className="block h-px w-6 bg-gold" />
                  {term.title[locale]}
                </dt>
                <dd className="mt-5 text-sm leading-relaxed text-white/70">
                  {term.body[locale]}
                </dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* --- Wholesale ---------------------------------------------------- */}
      <section className="bg-white">
        <Container size="wide" className="py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <BatterySectionHeading
                index={4}
                eyebrow={copy.wholesale.eyebrow[locale]}
                title={copy.wholesale.title[locale]}
                lede={copy.wholesale.lede[locale]}
              />

              <BatteryButtonLink
                to="/businesses/batteries/wholesale"
                variant="secondary"
                className="mt-8"
              >
                {copy.wholesale.actionLabel[locale]}
              </BatteryButtonLink>
            </div>

            <div className="lg:col-span-7">
              <BatterySectionHeading
                title={BATTERY_PROCESS.title[locale]}
                eyebrow={BATTERY_PROCESS.eyebrow[locale]}
                lede={BATTERY_PROCESS.lede[locale]}
              />

              <ol className="mt-10 border-t border-line">
                {BATTERY_PROCESS.steps.map((step, index) => {
                  const Icon = batteryProcessIcon(index)

                  return (
                    <li
                      key={step.title.en}
                      className="grid gap-3 border-b border-line py-7 md:grid-cols-12 md:gap-8"
                    >
                      <div className="flex items-baseline gap-4 md:col-span-3">
                        <span className="battery-mono text-lg text-gold">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        {Icon && (
                          <Icon aria-hidden className="size-5 text-blue-muted" />
                        )}
                      </div>

                      <h3 className="title text-[1.25rem] text-navy md:col-span-3">
                        {step.title[locale]}
                      </h3>

                      <p className="text-sm leading-relaxed text-gray md:col-span-6">
                        {step.body[locale]}
                      </p>
                    </li>
                  )
                })}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      {/* --- What this site is --------------------------------------------
          Placed before the call to action on purpose: the honest note is read
          before the visitor commits, not tucked under the button. */}
      <section className="border-y border-line bg-off-white">
        <Container size="wide" className="py-20 lg:py-24">
          <BatterySectionHeading
            index={5}
            eyebrow={BATTERY_POSITION.eyebrow[locale]}
            title={BATTERY_POSITION.title[locale]}
          />

          <dl className="mt-12 grid gap-px border border-line bg-line md:grid-cols-3">
            {BATTERY_POSITION.points.map((point) => (
              <div key={point.title.en} className="bg-white p-8">
                <dt className="battery-mono text-sm font-semibold tracking-[0.08em] text-navy uppercase">
                  {point.title[locale]}
                </dt>
                <dd className="mt-4 text-sm leading-relaxed text-gray">
                  {point.body[locale]}
                </dd>
              </div>
            ))}
          </dl>
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
        secondaryActionLabel={copy.cta.secondaryActionLabel[locale]}
        secondaryActionHref={copy.cta.secondaryActionHref}
        context={batteryInquiryChecklist(locale)}
        contextLabel={BATTERY_CHROME.includeLabel[locale]}
      />
    </>
  )
}