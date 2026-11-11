// cms/pagesHomeAstro.ts
// Definición Astro de la colección `pagesHome` — patrón dual-file.
// Referenciado por src/content.config.ts. El schema Zod espeja el schema
// Keystatic (cms/pagesHomeKeystatic.ts): una entrada por locale (es/en).

import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { basePath } from './pagesHomeKeystatic';
import { LOCALES } from './utils/locales';
import { loader } from './utils/loader';

export const homeSchema = z.object({
  locale: z.enum(LOCALES),
  metaTitle: z.string().min(1),
  metaDescription: z.string().min(1),
  signal: z.string().min(1),
  signalBrand: z.string().min(1),
  headingHtml: z.string().min(1),
  intro: z.string().min(1),
  exploreRoute: z.string().min(1),
  status: z.string().min(1),
  statusAriaLabel: z.string().min(1),
  countdown: z.object({
    days: z.string().min(1),
    hours: z.string().min(1),
    minutes: z.string().min(1),
    seconds: z.string().min(1),
  }),
  statusMessage: z.string().min(1),
  endMessage: z.string().min(1),
  evento: z.object({
    kicker: z.string().min(1),
    headingHtml: z.string().min(1),
    lead: z.string().min(1),
    linkLabel: z.string().min(1),
    gridLabel: z.string().min(1),
    items: z.array(
      z.object({
        n: z.string().min(1),
        titleHtml: z.string().min(1),
        text: z.string().min(1),
      }),
    ),
  }),
  ruta: z.object({
    kicker: z.string().min(1),
    headingHtml: z.string().min(1),
    tabs: z.array(
      z.object({
        id: z.enum(['xco', 'xcc']),
        index: z.string().min(1),
        label: z.string().min(1),
        sublabel: z.string().min(1),
        state: z.string().min(1),
        title: z.string().min(1),
        description: z.string().min(1),
        distance: z.string().min(1),
        elevation: z.string().min(1),
        time: z.string().min(1),
      }),
    ),
    dataLabels: z.object({
      distance: z.string().min(1),
      elevation: z.string().min(1),
      time: z.string().min(1),
    }),
    footerNote: z.string().min(1),
    linkLabel: z.string().min(1),
  }),
  schedule: z.object({
    kicker: z.string().min(1),
    headingHtml: z.string().min(1),
    rows: z.array(
      z.object({
        n: z.string().min(1),
        title: z.string().min(1),
        when: z.string().min(1),
        note: z.string().min(1),
      }),
    ),
  }),
  resultados: z.object({
    kicker: z.string().min(1),
    headingHtml: z.string().min(1),
    copy: z.string().min(1),
    ctaLabel: z.string().min(1),
    imageAlt: z.string().min(1),
  }),
  valdivia: z.object({
    kicker: z.string().min(1),
    headingHtml: z.string().min(1),
    copy: z.string().min(1),
    linkLabel: z.string().min(1),
    overlayPhraseHtml: z.string().min(1),
  }),
});

export const astroPagesHomeDefinition = defineCollection({
  loader: loader(basePath, 'json'),
  schema: homeSchema,
});

export type HomeData = z.infer<typeof homeSchema>;
