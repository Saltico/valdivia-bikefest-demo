// cms/siteCommonAstro.ts
// Definición Astro de la colección `siteCommon` — patrón dual-file.
// Referenciado por src/content.config.ts.

import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { basePath } from './siteCommonKeystatic';
import { LOCALES } from './utils/locales';
import { loader } from './utils/loader';

export const siteCommonSchema = z.object({
  locale: z.enum(LOCALES),
  skipToContent: z.string().min(1),
  nav: z.array(
    z.object({
      label: z.string().min(1),
      href: z.string().regex(/^\//),
    }),
  ),
  register: z.string().min(1),
  changeLanguage: z.string().min(1),
  openMenu: z.string().min(1),
  closeMenu: z.string().min(1),
  mobileNavLabel: z.string().min(1),
  mainNavLabel: z.string().min(1),
  homeLabel: z.string().min(1),
  footerMeta: z.string().min(1),
  consent: z.object({
    title: z.string().min(1),
    message: z.string().min(1),
    accept: z.string().min(1),
    decline: z.string().min(1),
    statusAccepted: z.string().min(1),
    statusDeclined: z.string().min(1),
    closeLabel: z.string().min(1),
    preferencesLabel: z.string().min(1),
  }),
  finalCta: z.object({
    coordinate: z.string().min(1),
    kicker: z.string().min(1),
    headingHtml: z.string().min(1),
    primaryLabel: z.string().min(1),
    secondaryLabel: z.string().min(1),
    secondaryHref: z.string().regex(/^\//),
  }),
});

export const astroSiteCommonDefinition = defineCollection({
  loader: loader(basePath, 'json'),
  schema: siteCommonSchema,
});

export type SiteCommonData = z.infer<typeof siteCommonSchema>;
