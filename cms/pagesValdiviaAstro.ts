// cms/pagesValdiviaAstro.ts
// Definición Astro de la colección `pagesValdivia` — patrón dual-file.
// Referenciado por src/content.config.ts.

import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { basePath, destinationNavIcons } from './pagesValdiviaKeystatic';
import { LOCALES } from './utils/locales';
import { loader } from './utils/loader';

export const valdiviaSchema = z.object({
  locale: z.enum(LOCALES),
  metaTitle: z.string().min(1),
  metaDescription: z.string().min(1),
  hero: z.object({
    kicker: z.string().min(1),
    headingHtml: z.string().min(1),
    hiddenH1: z.string().min(1),
  }),
  navLabel: z.string().min(1),
  destinations: z.array(
    z.object({
      id: z.string().regex(/^[a-z0-9-]+$/),
      navLabel: z.string().min(1),
      navIcon: z.enum(destinationNavIcons),
      kicker: z.string().min(1),
      titleHtml: z.string().min(1),
      description: z.string().min(1),
      bgAlt: z.string().min(1),
      image: z.string().min(1),
      infoLabel: z.string().min(1),
      infoHref: z.string().url(),
      mapLabel: z.string().min(1),
      mapHref: z.string().url(),
    }),
  ),
});

export const astroPagesValdiviaDefinition = defineCollection({
  loader: loader(basePath, 'json'),
  schema: valdiviaSchema,
});

export type ValdiviaData = z.infer<typeof valdiviaSchema>;
export type ValdiviaDestination = ValdiviaData['destinations'][number];
