import { z } from "zod";

export const intentOptions = [
  "Freelance / project work",
  "Consulting / advisory",
  "Full-time role",
  "Startup collaboration",
  "Something else",
] as const;

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(80),
  email: z.string().trim().email("Please enter a valid email address."),
  company: z.string().trim().max(120).optional().or(z.literal("")),
  intent: z.enum(intentOptions, {
    errorMap: () => ({ message: "Please choose what this is about." }),
  }),
  message: z
    .string()
    .trim()
    .min(10, "A little more detail helps - at least 10 characters.")
    .max(4000),
  // Honeypot: bots fill it. Not validated client-side (so a stray browser
  // autofill never blocks a real user) - it's checked + dropped server-side.
  company_url: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;
