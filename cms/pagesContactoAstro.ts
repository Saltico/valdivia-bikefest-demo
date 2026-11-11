// cms/pagesContactoAstro.ts
// Definición Astro de la colección `pagesContacto` — patrón dual-file.
// Referenciado por src/content.config.ts.

import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { basePath } from './pagesContactoKeystatic';
import { LOCALES } from './utils/locales';
import { loader } from './utils/loader';

export const contactoSchema = z.object({
  locale: z.enum(LOCALES),
  metaTitle: z.string().min(1),
  metaDescription: z.string().min(1),
  hero: z.object({
    kicker: z.string().min(1),
    headingHtml: z.string().min(1),
    intro: z.string().min(1),
    bgAlt: z.string().min(1),
  }),
  form: z.object({
    titleHtml: z.string().min(1),
    nameLabel: z.string().min(1),
    emailLabel: z.string().min(1),
    messageLabel: z.string().min(1),
    submitLabel: z.string().min(1),
    successTitle: z.string().min(1),
    successText: z.string().min(1),
    toast: z.string().min(1),
  }),
  mapTitle: z.string().min(1),
});

export const astroPagesContactoDefinition = defineCollection({
  loader: loader(basePath, 'json'),
  schema: contactoSchema,
});

export type ContactoData = z.infer<typeof contactoSchema>;
