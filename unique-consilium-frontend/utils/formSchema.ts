import { z } from 'zod';

// Short, consistent messages (UI can override)
const MSG = {
  name: 'Please enter your name.',
  company: 'Please enter your company name.',
  email: 'Please enter a valid email.',
  phone: 'Please enter a valid phone number.',
  message: 'Message should be at least 10 characters.',
} as const;

/**
 * Contact form schema: trims inputs and applies basic validation.
 * Phone uses a relaxed pattern: digits with optional +, spaces, hyphens, parentheses (no catastrophic regex).
 */
export const contactSchema = z.object({
  name: z.string().trim().min(2, MSG.name).max(100, MSG.name),
  company: z.string().trim().min(2, MSG.company).max(120, MSG.company).optional().or(z.literal('').transform(() => undefined)),
  email: z.string().trim().toLowerCase().email(MSG.email).max(254, MSG.email),
  phone: z
    .string()
    .trim()
    .optional()
    .refine((v) => v === undefined || v === '' || /^[+]?[(]?[0-9]{1,4}[)]?[-\s0-9]{5,}$/.test(v), { message: MSG.phone })
    .transform((v) => (v === '' ? undefined : v)),
  message: z.string().trim().min(10, MSG.message).max(5000, MSG.message),
});

export type ContactFormInput = z.infer<typeof contactSchema>;
