import { useEffect, useRef, useState } from 'react'

import { useLocale } from '../../app/locale-context'
import { usePageTitle } from '../../app/use-page-title'
import { TRADE_CHROME, TRADE_CONTACT, tradeChecklist } from '../../app/trade-copy'
import { TRADE_SERVICES } from '../../app/trade-services'
import { type Bilingual } from '../../app/copy'
import {
  collectFieldErrors,
  fieldErrorId,
  FORM_VALIDATION_COPY,
  type FieldErrors,
} from '../../app/form-validation'
import { Container } from '../../shared/components/Container'
import { TradeButtonLink } from '../../shared/components/trade/TradeButtonLink'
import { TradeInquiryCTA, TradeParentLink } from '../../shared/components/trade/TradeInquiryCTA'
import { TradePageHero } from '../../shared/components/trade/TradePageHero'
import { tradeCrumbs } from '../../app/trade-crumbs'
import { TradeSectionHeading } from '../../shared/components/trade/TradeSectionHeading'
import { cn } from '../../shared/lib/cn'

/**
 * VORTEX TRADE — business inquiries.
 *
 * The form is front-end only by design: there is no backend, no endpoint and no
 * storage. Submitting replaces it with a confirmation that says in as many
 * words that nothing was sent, and the same notice sits above the form so
 * nobody can mistake it for a live channel before they start typing.
 *
 * Fields go beyond a generic contact form — quantity, destination and a product
 * message — because the page's job is to collect a requirement, not an address
 * book entry. No field is marked required except the ones a message genuinely
 * cannot be written without.
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
export function TradeContactPage() {
  const { locale } = useLocale()
  const copy = TRADE_CONTACT
  usePageTitle(copy.hero.title[locale])

  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})
  const statusRef = useRef<HTMLDivElement>(null)

  /* Moving focus to the confirmation gives keyboard and screen-reader users
     the outcome of their submit directly, instead of leaving focus on the
     button that just disappeared with the form. */
  useEffect(() => {
    if (submitted) statusRef.current?.focus()
  }, [submitted])

  const summaryLabels: Record<string, Bilingual> = {
    name: copy.form.name,
    email: copy.form.email,
    service: copy.form.service,
    message: copy.form.message,
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
      <TradePageHero
        eyebrow={copy.hero.eyebrow[locale]}
        title={copy.hero.title[locale]}
        lede={copy.hero.lede[locale]}
        crumbs={tradeCrumbs(
          TRADE_CHROME.breadcrumbHome[locale],
          TRADE_CHROME.breadcrumbTrade[locale],
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
                  {TRADE_CHROME.demonstrationNotice[locale]}
                </p>

                {/* No address, phone or email has been supplied, so none is
                    shown. Said here rather than left as an empty gap. */}
                <p className="text-sm text-blue-muted">
                  {locale === 'fa'
                    ? 'هیچ نشانی، شماره تماس یا ایمیلی ارائه نشده است؛ بنابراین اینجا درج نمی‌شود.'
                    : 'No address, phone number or email has been supplied, so none is shown here.'}
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
                    {copy.hero.title[locale]}
                  </h2>

                  <p className="mt-4 max-w-xl text-gray">
                    {TRADE_CHROME.demonstrationSuccess[locale]}
                  </p>

                  {/* The link points at this very route, so without resetting
                      the submitted state here it would do nothing — a Link to
                      the route you are already on does not remount the page. */}
                  <TradeButtonLink
                    to="/businesses/trade/contact"
                    variant="secondary"
                    className="mt-8"
                    onClick={() => setSubmitted(false)}
                  >
                    {copy.form.rewrite[locale]}
                  </TradeButtonLink>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex flex-col gap-8"
                >
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
                      id="name"
                      name="name"
                      label={copy.form.name[locale]}
                      autoComplete="name"
                      required
                      error={errors.name}
                      onInput={() => clearError('name')}
                    />
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      label={copy.form.email[locale]}
                      autoComplete="email"
                      required
                      error={errors.email}
                      onInput={() => clearError('email')}
                    />
                    <Field
                      id="company"
                      name="company"
                      label={copy.form.company[locale]}
                      autoComplete="organization"
                    />
                    <Field
                      id="phone"
                      name="phone"
                      type="tel"
                      label={copy.form.phone[locale]}
                      autoComplete="tel"
                    />
                  </div>

                  <div className="grid gap-6 sm:grid-cols-3">
                    {/* Services come from the same data as the services page,
                        so the two can never drift apart. */}
                    <div className="flex flex-col gap-2">
                      <label
                        htmlFor="service"
                        className="text-sm font-medium text-navy"
                      >
                        {copy.form.service[locale]}
                      </label>
                      <select
                        id="service"
                        name="service"
                        defaultValue=""
                        required
                        aria-invalid={errors.service ? true : undefined}
                        aria-describedby={
                          errors.service ? fieldErrorId('service') : undefined
                        }
                        onChange={() => clearError('service')}
                        className={cn(
                          'h-12 border bg-white px-4 text-base text-navy transition-colors focus-visible:border-navy-primary',
                          errors.service
                            ? 'border-danger hover:border-danger'
                            : 'border-line hover:border-navy-primary',
                        )}
                      >
                        <option value="" disabled>
                          {copy.form.servicePlaceholder[locale]}
                        </option>
                        {TRADE_SERVICES.map((service) => (
                          <option key={service.slug} value={service.slug}>
                            {service.title[locale]}
                          </option>
                        ))}
                      </select>
                      {errors.service && (
                        <p
                          id={fieldErrorId('service')}
                          className="text-sm text-danger"
                        >
                          {errors.service}
                        </p>
                      )}
                    </div>

                    <Field
                      id="quantity"
                      name="quantity"
                      label={copy.form.quantity[locale]}
                    />
                    <Field
                      id="destination"
                      name="destination"
                      label={copy.form.destination[locale]}
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium text-navy"
                    >
                      {copy.form.message[locale]}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={8}
                      required
                      placeholder={copy.form.messagePlaceholder[locale]}
                      aria-invalid={errors.message ? true : undefined}
                      aria-describedby={
                        errors.message ? fieldErrorId('message') : undefined
                      }
                      onInput={() => clearError('message')}
                      className={cn(
                        'border bg-white p-4 text-base text-navy transition-colors placeholder:text-blue-muted focus-visible:border-navy-primary',
                        errors.message
                          ? 'border-danger hover:border-danger'
                          : 'border-line hover:border-navy-primary',
                      )}
                    />
                    {errors.message && (
                      <p
                        id={fieldErrorId('message')}
                        className="text-sm text-danger"
                      >
                        {errors.message}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-wrap items-center gap-4">
                    <TradeButtonLink to="/businesses/trade/procurement" variant="ghost">
                      {locale === 'fa'
                        ? 'تأمین اختصاصی'
                        : 'Structured procurement inquiry'}
                    </TradeButtonLink>

                    <button
                      type="submit"
                      className="inline-flex h-12 items-center justify-center gap-2 bg-navy px-6 text-sm font-medium tracking-[0.1em] text-white uppercase transition-colors duration-150 hover:bg-navy-primary"
                    >
                      {copy.form.submit[locale]}
                    </button>

                    <p className="text-sm text-blue-muted">
                      {TRADE_CHROME.demonstrationNotice[locale]}
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </Container>
      </section>

      {/* --- What an inquiry needs -------------------------------------- */}
      <section className="border-t border-line bg-off-white">
        <Container size="wide" className="py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-5">
              <TradeSectionHeading
                eyebrow={copy.cta.eyebrow[locale]}
                title={copy.cta.title[locale]}
                lede={copy.cta.description[locale]}
              />
            </div>

            <div className="lg:col-span-7">
              <ol className="flex flex-col">
                {TRADE_SERVICES.map((service) => (
                  <li
                    key={service.slug}
                    className="flex items-baseline gap-4 border-t border-line py-4 text-sm text-gray"
                  >
                    <span className="font-editorial text-gold">
                      {service.number}
                    </span>
                    <a
                      href={`/businesses/trade/services#${service.anchor}`}
                      className="text-navy transition-colors hover:text-gold"
                    >
                      {service.title[locale]}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </section>

      <TradeParentLink
        label={TRADE_CHROME.backToParentLabel[locale]}
        description={TRADE_CHROME.backToParentBody[locale]}
      />

      <TradeInquiryCTA
        eyebrow={copy.cta.eyebrow[locale]}
        title={copy.cta.title[locale]}
        description={copy.cta.description[locale]}
        actionLabel={copy.cta.actionLabel[locale]}
        actionHref={copy.cta.actionHref}
        secondaryActionLabel={TRADE_CHROME.servicesLabel[locale]}
        secondaryActionHref="/businesses/trade/services"
        context={tradeChecklist(locale)}
        contextLabel={TRADE_CHROME.includeLabel[locale]}
      />
    </>
  )
}

/**
 * A labelled text input with an inline validation slot.
 *
 * Square corners and a hairline border, matching the trade button register.
 * When `error` is set the message renders directly beneath the input, is
 * referenced by `aria-describedby`, and the input is marked `aria-invalid`;
 * the error clears as soon as the field is edited again.
 */
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
          'h-12 border bg-white px-4 text-base text-navy transition-colors focus-visible:border-navy-primary',
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