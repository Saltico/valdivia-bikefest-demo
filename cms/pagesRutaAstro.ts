// cms/pagesRutaAstro.ts
// Definición Astro de la colección `pagesRuta` — patrón dual-file.
// Referenciado por src/content.config.ts.

import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { basePath, keyDataIcons, programStatuses } from './pagesRutaKeystatic';
import { LOCALES } from './utils/locales';
import { loader } from './utils/loader';

export const rutaSchema = z.object({
  locale: z.enum(LOCALES),
  metaTitle: z.string().min(1),
  metaDescription: z.string().min(1),
  hero: z.object({
    kicker: z.string().min(1),
    headingHtml: z.string().min(1),
    intro: z.string().min(1),
  }),
  keyData: z.array(
    z.object({
      icon: z.enum(keyDataIcons),
      label: z.string().min(1),
      value: z.string().min(1),
    }),
  ),
  formatos: z.object({
    kicker: z.string().min(1),
    headingHtml: z.string().min(1),
    cards: z.array(
      z.object({
        label: z.string().min(1),
        name: z.string().min(1),
        fullName: z.string().min(1),
        metrics: z.array(
          z.object({
            value: z.string().min(1),
            unit: z.string().min(1),
            label: z.string().min(1),
          }),
        ),
        details: z.string().min(1),
        statusLabel: z.string().min(1),
        statusValue: z.string().min(1),
      }),
    ),
    note: z.string().min(1),
  }),
  programa: z.object({
    kicker: z.string().min(1),
    headingHtml: z.string().min(1),
    rows: z.array(
      z.object({
        n: z.string().min(1),
        day: z.string().min(1),
        activity: z.string().min(1),
        status: z.enum(programStatuses),
        statusLabel: z.string().min(1),
      }),
    ),
  }),
  categorias: z.object({
    kicker: z.string().min(1),
    headingHtml: z.string().min(1),
    groups: z.array(
      z.object({
        title: z.string().min(1),
        items: z.array(z.string().min(1)),
      }),
    ),
    note: z.string().min(1),
  }),
  galeriaLabel: z.string().min(1),
  lightboxLabel: z.string().min(1),
  lightboxClose: z.string().min(1),
  galeria: z.array(
    z.object({
      src: z.string().min(1),
      alt: z.string().min(1),
    }),
  ),
});

export const astroPagesRutaDefinition = defineCollection({
  loader: loader(basePath, 'json'),
  schema: rutaSchema,
});

export type RutaData = z.infer<typeof rutaSchema>;
export type RutaCircuitCard = RutaData['formatos']['cards'][number];
