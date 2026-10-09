import { useEffect, useRef, useState } from 'react'

import { useLocale } from '../app/locale-context'
import { SERVICES } from '../app/services'
import { CONTACT_COPY, type Bilingual } from '../app/copy'
import {
  collectFieldErrors,
  fieldErrorId,
  FORM_VALIDATION_COPY,
  type FieldErrors,
} from '../app/form-validation'
import { usePageTitle } from '../app/use-page-title'
import {
  Breadcrumbs,
  Button,
  Container,
  SectionHeading,
} from '../shared/components'
import { cn } from '../shared/lib/cn'

/**
 * Contact and inquiry page.
 *
 * The form is front-end only by design: there is no backend, no endpoint and
 * no storage. Submitting replaces the form with the draft confirmation copy,
 * which says in as many words that nothing was sent. The
 * `CONTACT_COPY.notice` line sits above the form so nobody can mistake it for
 * a live channel before they type anything.
 *
 * Validation is client-side and locale-aware: the form runs `noValidate` so
 * the browser's own (browser-language) bubbles never appear, and the messages
 * from form-validation.ts are rendered inline against each field, wired with
 * `aria-invalid`/`aria-describedby`, summarised above the form, and focused on
 * the first invalid field.
 *
 * Contact details are deliberately absent — none have been supplied, and
 * inventing a phone number or address would be worse than showing none.
 */
export function ContactPage() {
  const { locale } = useLocale()
  usePageTitle(CONTACT_COPY.title[locale])

  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors] = useState<FieldErrors>({})
  const statusRef = useRef<HTMLDivElement>(null)

  const homeLabel = { en: 'Home', fa: 'خانه' }[locale]
  const { form } = CONTACT_COPY
  const hasErrors = Object.keys(errors).length > 0

  /* Labels for the error summary, keyed by control id. Referenced from the
     same copy objects the fields render, so the two cannot drift. Only the
     controls that carry constraints are listed. */
  const summaryLabels: Record<string, Bilingual> = {
    name: form.name,
    email: form.email,
    message: form.message,
  }

  /* Moving focus to the confirmation gives keyboard and screen-reader users
     the outcome of their submit directly, instead of leaving focus on the
     button that just disappeared with the form. */
  useEffect(() => {
    if (submitted) statusRef.current?.focus()
  }, [submitted])

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
      <section className="border-b border-line bg-off-white">
        <Container className="py-20 md:py-24">
          <Breadcrumbs
            items={[
              { label: homeLabel, href: '/' },
              { label: CONTACT_COPY.title[locale] },
            ]}
          />

          <div className="reveal mt-10 flex max-w-3xl flex-col gap-6">
            <SectionHeading
              eyebrow={CONTACT_COPY.eyebrow[locale]}
              title={CONTACT_COPY.title[locale]}
              as="h1"
              lede={CONTACT_COPY.lede[locale]}
            />
          </div>
        </Container>
      </section>

      <section className="bg-white">
        <Container className="py-20 md:py-24">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            {/* Sidebar ------------------------------------------------ */}
            <aside className="lg:col-span-4">
              <div className="flex flex-col gap-6 lg:sticky lg:top-28">
                <span
                  aria-hidden="true"
                  className="block h-px w-8 bg-gold"
                />

                <h2 className="text-xl font-semibold text-navy">
                  {CONTACT_COPY.detailsTitle[locale]}
                </h2>

                <p className="text-sm text-gray">
                  {CONTACT_COPY.detailsBody[locale]}
                </p>

                {/*
                  Honest about what this is, stated before the visitor types
                  anything rather than after they submit.
                */}
                <p className="border-s-2 border-gold ps-4 text-sm text-blue-muted">
                  {CONTACT_COPY.notice[locale]}
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
                  <span
                    aria-hidden="true"
                    className="block h-px w-8 bg-gold"
                  />

                  <h2 className="title mt-6 text-navy">
                    {CONTACT_COPY.title[locale]}
                  </h2>

                  <p className="mt-4 text-gray">
                    {CONTACT_COPY.success[locale]}
                  </p>

                  <Button
                    variant="secondary"
                    className="mt-8"
                    onClick={() => setSubmitted(false)}
                  >
                    {form.rewrite[locale]}
                  </Button>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  noValidate
                  className="flex flex-col gap-8"
                >
                  {hasErrors && (
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
                      label={form.name[locale]}
                      autoComplete="name"
                      required
                      error={errors.name}
                      onInput={() => clearError('name')}
                    />
                    <Field
                      id="email"
                      name="email"
                      type="email"
                      label={form.email[locale]}
                      autoComplete="email"
                      required
                      error={errors.email}
                      onInput={() => clearError('email')}
                    />
                    <Field
                      id="phone"
                      name="phone"
                      type="tel"
                      label={form.phone[locale]}
                      autoComplete="tel"
                    />
                    <Field
                      id="company"
                      name="company"
                      label={form.company[locale]}
                      autoComplete="organization"
                    />
                  </div>

                  {/* Services come from the same data as the service pages,
                      so the two can never drift apart. */}
                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="service"
                      className="text-sm font-medium text-navy"
                    >
                      {form.service[locale]}
                    </label>
                    <select
                      id="service"
                      name="service"
                      defaultValue=""
                      className="h-12 border border-line bg-white px-4 text-base text-navy transition-colors hover:border-navy-primary focus-visible:border-navy-primary"
                    >
                      <option value="" disabled>
                        {form.servicePlaceholder[locale]}
                      </option>
                      {SERVICES.map((service) => (
                        <option key={service.slug} value={service.slug}>
                          {service.title[locale]}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-2">
                    <label
                      htmlFor="message"
                      className="text-sm font-medium text-navy"
                    >
                      {form.message[locale]}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      placeholder={form.messagePlaceholder[locale]}
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
                    <Button type="submit" size="lg">
                      {form.submit[locale]}
                    </Button>

                    <p className="text-sm text-blue-muted">
                      {CONTACT_COPY.notice[locale]}
                    </p>
                  </div>
                </form>
              )}
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}

/**
 * A labelled text input with an inline validation slot.
 *
 * Square corners and a hairline border, matching Button and the rest of the
 * form controls. When `error` is set the message renders directly beneath the
 * input, is referenced by `aria-describedby`, and the input is marked
 * `aria-invalid`; the error clears as soon as the field is edited again.
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
