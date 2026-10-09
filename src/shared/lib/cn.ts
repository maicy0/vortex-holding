/** Joins class names, dropping falsy entries. Keeps component props readable. */
export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}