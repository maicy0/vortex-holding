import type { Bilingual } from './copy'
import type { Locale } from './locale'

/**
 * Locale-aware client-side validation for the three demonstration inquiry
 * forms.
 *
 * The forms run with `noValidate`: the browser's own validation bubbles render
 * in the browser's UI language, which can disagree with the page's locale
 * (a Persian page producing German bubbles), and their content is not
 * styleable or consistent across browsers. The same constraints are checked
 * here — `required` and `type="email"` — but the messages come from this
 * module in the active locale, and each is wired to its field with
 * `aria-invalid` and `aria-describedby` so assistive technology announces it.
 */
export const FORM_VALIDATION_COPY = {
  /** Inline message for an empty required control. */
  required: {
    en: 'This field is required.',
    fa: 'تکمیل این بخش الزامی است.',
  },
  /** Inline message for a malformed email address. */
  email: {
    en: 'Please enter a valid email address.',
    fa: 'لطفاً یک نشانی ایمیل معتبر بنویسید.',
  },
  /**
   * Heading of the summary printed above a form whose submit was blocked.
   * The list beneath it names each field and its message.
   */
  summary: {
    en: 'Please correct the fields below:',
    fa: 'لطفاً موارد زیر را اصلاح کنید:',
  },
} as const satisfies Record<string, Bilingual>

/** The id of a control's inline error message. */
export function fieldErrorId(id: string): string {
  return `${id}-error`
}

/** A map of control id to its validation message, for the fields in error. */
export type FieldErrors = Record<string, string>

/**
 * Validate a form's controls against their HTML constraints and return the
 * fields in error, plus the first invalid control so the submit handler can
 * move focus to it.
 *
 * Only elements that actually participate in constraint validation are
 * examined — inputs, textareas and selects; buttons and fieldsets are skipped.
 */
export function collectFieldErrors(
  form: HTMLFormElement,
  locale: Locale,
): { errors: FieldErrors; firstInvalid: HTMLElement | null } {
  const errors: FieldErrors = {}
  let firstInvalid: HTMLElement | null = null

  for (const element of Array.from(form.elements)) {
    const control =
      element instanceof HTMLInputElement ||
      element instanceof HTMLTextAreaElement ||
      element instanceof HTMLSelectElement
        ? element
        : null
    if (!control || !control.willValidate) continue

    let message: string | null = null
    if (control.validity.valueMissing) {
      message = FORM_VALIDATION_COPY.required[locale]
    } else if (control.validity.typeMismatch) {
      message = FORM_VALIDATION_COPY.email[locale]
    }

    if (message) {
      errors[control.id] = message
      firstInvalid ??= control
    }
  }

  return { errors, firstInvalid }
}
