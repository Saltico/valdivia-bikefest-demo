// cms/pagesResultadosAstro.ts
// Definición Astro de la colección `pagesResultados` — patrón dual-file.
// Referenciado por src/content.config.ts.

import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { basePath, categorySlugs } from './pagesResultadosKeystatic';
import { LOCALES } from './utils/locales';
import { loader } from './utils/loader';

const resultRowSchema = z.object({
  pos: z.number().int().min(1),
  dorsal: z.number().int().min(1),
  name: z.string().min(1),
  club: z.string().min(1),
  cat: z.enum(categorySlugs),
  catLabel: z.string().min(1),
  time: z.string().min(1),
  dif: z.string().min(1),
});

export const resultadosSchema = z.object({
  locale: z.enum(LOCALES),
  metaTitle: z.string().min(1),
  metaDescription: z.string().min(1),
  hero: z.object({
    kicker: z.string().min(1),
    headingHtml: z.string().min(1),
    intro: z.string().min(1),
  }),
  demoBadge: z.string().min(1),
  demoNote: z.string().min(1),
  boardHeadLeft: z.string().min(1),
  boardHeadRight: z.string().min(1),
  tabsLabel: z.string().min(1),
  chipsLabel: z.string().min(1),
  chipAll: z.string().min(1),
  categories: z.array(
    z.object({
      slug: z.enum(categorySlugs),
      label: z.string().min(1),
    }),
  ),
  columns: z.array(z.string().min(1)),
  boardFoot: z.array(z.string().min(1)),
  xcoRows: z.array(resultRowSchema),
  xccRows: z.array(resultRowSchema),
});

export const astroPagesResultadosDefinition = defineCollection({
  loader: loader(basePath, 'json'),
  schema: resultadosSchema,
});

export type ResultadosData = z.infer<typeof resultadosSchema>;
export type ResultRow = z.infer<typeof resultRowSchema>;
