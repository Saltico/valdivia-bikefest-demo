// cms/pagesEventoAstro.ts
// Definición Astro de la colección `pagesEvento` — patrón dual-file.
// Referenciado por src/content.config.ts.

import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { basePath } from './pagesEventoKeystatic';
import { LOCALES } from './utils/locales';
import { loader } from './utils/loader';

export const eventoSchema = z.object({
  locale: z.enum(LOCALES),
  metaTitle: z.string().min(1),
  metaDescription: z.string().min(1),
  hero: z.object({
    kicker: z.string().min(1),
    headingHtml: z.string().min(1),
    intro: z.string().min(1),
    bgAlt: z.string().min(1),
  }),
  organizers: z.array(
    z.object({
      role: z.string().min(1),
      name: z.string().min(1),
      detail: z.string().min(1),
    }),
  ),
  queEs: z.object({
    kicker: z.string().min(1),
    headingHtml: z.string().min(1),
    leadHtml: z.string().min(1),
    items: z.array(
      z.object({
        n: z.string().min(1),
        title: z.string().min(1),
        text: z.string().min(1),
      }),
    ),
  }),
  proposito: z.object({
    kicker: z.string().min(1),
    headingHtml: z.string().min(1),
    items: z.array(
      z.object({
        title: z.string().min(1),
        text: z.string().min(1),
      }),
    ),
  }),
  internacional: z.object({
    kicker: z.string().min(1),
    headingHtml: z.string().min(1),
    leadHtml: z.string().min(1),
    linkLabel: z.string().min(1),
    dataItems: z.array(
      z.object({
        label: z.string().min(1),
        value: z.string().min(1),
      }),
    ),
  }),
  comunidad: z.object({
    kicker: z.string().min(1),
    headingHtml: z.string().min(1),
    copy: z.string().min(1),
    features: z.array(
      z.object({
        title: z.string().min(1),
        text: z.string().min(1),
      }),
    ),
  }),
});

export const astroPagesEventoDefinition = defineCollection({
  loader: loader(basePath, 'json'),
  schema: eventoSchema,
});

export type EventoData = z.infer<typeof eventoSchema>;
