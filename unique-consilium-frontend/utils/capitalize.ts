/**
 * Capitalizes the first character of a string, leaving the rest unchanged.
 * - ASCII/English-safe capitalization (no locale-specific rules).
 * - Empty strings return an empty string.
 * - Optionally trims leading/trailing whitespace before capitalization.
 *
 * @param s - Input string to transform.
 * @param options - Optional settings (e.g., { trim: true }).
 * @returns Capitalized string or empty string when input is empty after optional trim.
 * @example
 *   capitalize('hello') // 'Hello'
 *   capitalize(' hello', { trim: true }) // 'Hello'
 */
export const capitalize = (s: string, options?: { trim?: boolean }): string => {
  const value = options?.trim ? s.trim() : s;
  if (!value) return '';
  const first = value.charAt(0).toUpperCase();
  return first + value.slice(1);
};
