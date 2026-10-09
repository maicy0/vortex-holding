import { useSearchParams } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'

import { batteryCrumbs } from '../../app/battery-crumbs'
import {
  BATTERY_CATEGORIES,
  CATALOGUE_STATUS,
  batteryIsDemonstration,
  findBatteryCategory,
} from '../../app/battery-catalogue'
import {
  BATTERY_CHROME,
  BATTERY_CONTACT,
  batteryInquiryChecklist,
} from '../../app/battery-copy'
import { type Bilingual } from '../../app/copy'
import {
  collectFieldErrors,
  fieldErrorId,
  FORM_VALIDATION_COPY,
  type FieldErrors,
} from '../../app/form-validation'
import { useLocale } from '../../app/locale-context'
import { usePageTitle } from '../../app/use-page-title'
import { Container } from '../../shared/components/Container'
import { BatteryButtonLink } from '../../shared/components/battery/BatteryButtonLink'
import { BatteryDemoNotice } from '../../shared/components/battery/BatteryDemoNotice'
import { BatteryInquiryCTA, BatteryParentLink } from '../../shared/components/battery/BatteryInquiryCTA'
import { BatteryPageHero } from '../../shared/components/battery/BatteryPageHero'
import { cn } from '../../shared/lib/cn'

/**
 * VORTEX BATTERY — product inquiries.
 *
 * The form is front-end only by design: there is no backend, no endpoint and no
 * storage. Submitting replaces it with a confirmation that says in as many words
 * that nothing was sent, and the same notice sits above the form so nobody can
 * mistake it for a live channel before they start typing.
 *
 * Fields go beyond a generic contact form — application, format, chemistry,
 * voltage, quantity, timeline — because the page's job is to collect a
 * requirement, not an address book entry. Only the name, the email and the
 * requirement are required: a requirement that is still being decided is still
 * a requirement, and a form that refuses to submit without a chemistry turns
 * the first conversation into an obstacle.
 *
 * Validation is client-side and locale-aware: the form runs `noValidate` so
 * the browser's own (browser-language) bubbles never appear, and the messages
 * from form-validation.ts are rendered inline against each field, wired with
 * `aria-invalid`/`aria-describedby`, summarised above the form, and focused on
 * the first invalid field.
 *
 * Contact details are deliberately absent. None have been supplied, and
 * inventing a phone number or address would be worse than showing none.
 */
export function BatteryContactPage() {
  const { locale } = useLocale()
  const copy = BATTERY_CONTACT
  usePageTitle(copy.hero.title[locale])

  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})
  const statusRef = useRef<HTMLDivElement>(null)

  /* A product-detail link passes `?format=<id>` so a visitor who has just read
     a specification table does not have to go back and choose the category
     again. Resolved against the category list and treated as a hint: an
     unrecognised value falls through to "not decided" rather than silently
     selecting nothing, which is what would happen if the option list and the
     query string disagreed. */
  const [searchParams] = useSearchParams()
  const requested = searchParams.get('format')
  const product = requested ? findBatteryCategory(requested) : undefined
  const preselected = product?.id ?? ''

  /* The select is genuinely controlled: it starts from the query-string hint
     and then belongs to the visitor. The effect keeps the hint authoritative
     if the visitor arrives with a different ?format= while this page is
     already mounted. */
  const [format, setFormat] = useState(preselected)
  useEffect(() => {
    setFormat(preselected)
  }, [preselected])

  /* Moving focus to the confirmation gives keyboard and screen-reader users
     the outcome of their submit directly, instead of leaving focus on the
     button that just disappeared with the form. */
  useEffect(() => {
    if (submitted) statusRef.current?.focus()
  }, [submitted])

  const summaryLabels: Record<string, Bilingual> = {
    'battery-name': copy.form.name,
    'battery-email': copy.form.email,
    'battery-application': copy.form.application,
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // Nothing is transmitted. Preventing the default is what keeps this a
    // demonstration: without it the browser would navigate and reload.
    event.preventDefault()

    const { errors: nextErrors, firstInvalid } = collectFieldErrors(
      event.currentTarget,
      locale,
    )

    if (firstInvalid) {
      setErrors(nextErrors)
      firstInvalid.focus()
      return
    }

    setErrors({})
    setSubmitted(true)
  }

  function clearError(id: string) {
    setErrors((current) => {
      if (!(id in current)) return current
      const next = { ...current }
      delete next[id]
      return next
    })
  }

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

      <section className="bg-white">
        <Container size="wide" className="py-20 lg:py-24">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
            {/* Sidebar ------------------------------------------------ */}
            <aside className="lg:col-span-4">
              <div className="flex flex-col gap-6 lg:sticky lg:top-28">
                <span aria-hidden="true" className="block h-px w-8 bg-gold" />

                <h2 className="title text-[1.5rem] text-navy">
                  {copy.sidebar.title[locale]}
                </h2>

                <p className="text-sm leading-relaxed text-gray">
                  {copy.sidebar.body[locale]}
                </p>

                {/*
                  Honest about what this is, stated before the visitor types
                  anything rather than after they submit.
                */}
                <p className="border-s-2 border-gold ps-4 text-sm text-blue-muted">
                  {BATTERY_CHROME.demonstrationNotice[locale]}
                </p>

                {/* No address, phone or email has been supplied, so none is
                    shown. Said here rather than left as an empty gap. */}
                <p className="text-sm text-blue-muted">
                  {copy.sidebar.noContactDetails[locale]}
                </p>

                {/*
                  The format arrives in the query string from the catalogue's
                  product-detail pattern, and only the *category* is carried —
                  a category is what a buyer actually specifies against, and
                  passing a product id here would imply the entry was chosen when
                  all that is known is its shape.
                */}
                <p className="border-t border-line pt-6 text-sm leading-relaxed text-gray">
                  {product
                    ? locale === 'fa'
                      ? copy.form.preselectedFa(product.label.fa)
                      : copy.form.preselected(product.label.en)
                    : copy.form.notPreselected[locale]}
                </p>
              </div>
            </aside>

            {/* Form --------------------------------------------------- */}
            <div className="lg:col-span-8">
              {submitted ? (
                <div
                  ref={statusRef}
                  role="status"
                  tabIndex={-1}
                  className="border border-line bg-off-white p-8 md:p-12 focus:outline-none"
                >
                  <span aria-hidden="true" className="block h-px w-8 bg-gold" />

                  <h2 className="title mt-6 text-navy">
                    {copy.submitted[locale]}
                  </h2>

                  <p className="mt-4 max-w-xl text-gray">
                    {BATTERY_CHROME.demonstrationSuccess[locale]}
                  </p>

                  {/* The link points at this very route, so without resetting
                      the submitted state here it would do nothing — a Link to
                      the route you are already on does not remount the page. */}
                  <BatteryButtonLink
                    to="/businesses/batteries/contact"
                    variant="secondary"
                    className="mt-8"
                    onClick={() => setSubmitted(false)}
                  >
                    {copy.form.rewrite[locale]}
                  </BatteryButtonLink>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex flex-col gap-8"
                >
                  {batteryIsDemonstration && (
                    <BatteryDemoNotice
                      variant="banner"
                      title={CATALOGUE_STATUS.bannerTitle[locale]}
                      body={CATALOGUE_STATUS.bannerBody[locale]}
                    />
                  )}

                  {Object.keys(errors).length > 0 && (
                    <div
                      role="alert"
                      className="border-s-2 border-danger bg-off-white p-4"
                    >
                      <p className="text-sm font-medium text-danger">
                        {FORM_VALIDATION_COPY.summary[locale]}
                      </p>
                      <ul className="mt-2 flex list-inside list-disc flex-col gap-1 text-sm text-danger">
                        {Object.entries(errors).map(([id, message]) => (
                          <li key={id}>
                            {summaryLabels[id]?.[locale]} — {message}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="grid gap-6 sm:grid-cols-2">
                    <Field
                      id="battery-name"
                      label={copy.form.name[locale]}
                      name="name"
                      autoComplete="name"
                      required
                      error={errors['battery-name']}
                      onInput={() => clearError('battery-name')}
                    />
                    <Field
                      id="battery-organisation"
                      label={copy.form.organisation[locale]}
                      name="organisation"
                      autoComplete="organization"
                    />
                    <Field
                      id="battery-email"
                      label={copy.form.email[locale]}
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      error={errors['battery-email']}
                      onInput={() => clearError('battery-email')}
                    />
                    <Field
                      id="battery-quantity"
                      label={copy.form.quantity[locale]}
                      name="quantity"
                    />
                  </div>

                  <TextArea
                    id="battery-application"
                    label={copy.form.application[locale]}
                    hint={copy.form.applicationHint[locale]}
                    name="application"
                    required
                    error={errors['battery-application']}
                    onInput={() => clearError('battery-application')}
                  />

                  <div className="grid gap-6 sm:grid-cols-3">
                    {/* A select of the real categories, so the option list and
                        the catalogue cannot disagree about what categories
                        exist. */}
                    <Select
                      id="battery-format"
                      label={copy.form.format[locale]}
                      name="format"
                      options={[
                        {
                          value: '',
                          label: copy.form.undecided[locale],
                        },
                        ...BATTERY_CATEGORIES.map((category) => ({
                          value: category.id,
                          label: category.label[locale],
                        })),
                      ]}
                      value={format}
                      onChange={setFormat}
                    />
                    <Field
                      id="battery-chemistry"
                      label={copy.form.chemistry[locale]}
                      name="chemistry"
                    />
                    <Field
                      id="battery-voltage"
                      label={copy.form.voltage[locale]}
                      name="voltage"
                    />
                  </div>

                  <TextArea
                    id="battery-notes"
                    label={copy.form.notes[locale]}
                    hint={copy.form.notesHint[locale]}
                    name="notes"
                  />

                  <div className="flex flex-wrap items-center gap-6 border-t border-line pt-8">
                    <button
                      type="submit"
                      className="battery-mono inline-flex h-12 items-center justify-center bg-gold px-6 text-sm font-medium tracking-[0.12em] text-navy uppercase transition-colors hover:bg-navy hover:text-white"
                    >
                      {copy.form.submit[locale]}
                    </button>

                    <p className="text-xs text-gray">
                      {copy.form.requiredNote[locale]}
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
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
        actionHref="/businesses/batteries/products"
        secondaryActionLabel={copy.cta.secondaryActionLabel[locale]}
        secondaryActionHref={copy.cta.secondaryActionHref}
        context={batteryInquiryChecklist(locale)}
        contextLabel={BATTERY_CHROME.includeLabel[locale]}
      />
    </>
  )
}

/* --------------------------------------------------------------------------
   Form controls

   Local to this page rather than promoted to the design system: they exist to
   collect a requirement for one form, and the two other forms in the ecosystem
   have their own. Promoting them would be a shared abstraction built from a
   single use.
   -------------------------------------------------------------------------- */

function Field({
  id,
  label,
  type = 'text',
  error,
  onInput,
  ...props
}: {
  id: string
  label: string
  type?: string
  name: string
  autoComplete?: string
  required?: boolean
  error?: string
  onInput?: () => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-navy">
        {label}
      </label>
      <input
        id={id}
        type={type}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? fieldErrorId(id) : undefined}
        onInput={onInput}
        className={cn(
          'h-12 border bg-white px-4 text-base text-navy transition-colors placeholder:text-blue-muted focus-visible:border-navy-primary',
          error
            ? 'border-danger hover:border-danger'
            : 'border-line hover:border-navy-primary',
        )}
        {...props}
      />
      {error && (
        <p id={fieldErrorId(id)} className="text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  )
}

function TextArea({
  id,
  label,
  hint,
  name,
  required,
  error,
  onInput,
}: {
  id: string
  label: string
  hint: string
  name: string
  required?: boolean
  error?: string
  onInput?: () => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-navy">
        {label}
      </label>
      <textarea
        id={id}
        name={name}
        rows={5}
        required={required}
        aria-invalid={error ? true : undefined}
        aria-describedby={
          error ? `${id}-hint ${fieldErrorId(id)}` : `${id}-hint`
        }
        onInput={onInput}
        className={cn(
          'border bg-white px-4 py-3 text-base text-navy transition-colors focus-visible:border-navy-primary',
          error
            ? 'border-danger hover:border-danger'
            : 'border-line hover:border-navy-primary',
        )}
      />
      <p id={`${id}-hint`} className="text-xs text-blue-muted">
        {hint}
      </p>
      {error && (
        <p id={fieldErrorId(id)} className="text-sm text-danger">
          {error}
        </p>
      )}
    </div>
  )
}

function Select({
  id,
  label,
  name,
  options,
  value,
  onChange,
}: {
  id: string
  label: string
  name: string
  options: { value: string; label: string }[]
  value: string
  onChange: (value: string) => void
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-navy">
        {label}
      </label>
      <select
        id={id}
        name={name}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 border border-line bg-white px-3 text-base text-navy transition-colors hover:border-navy-primary focus-visible:border-navy-primary"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}