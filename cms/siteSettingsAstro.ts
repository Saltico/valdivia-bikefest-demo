// cms/siteSettingsAstro.ts
// Definición Astro del singleton `siteSettings` — patrón dual-file.
// Referenciado por src/content.config.ts. El singleton vive en
// src/content/settings/index.json → entry id 'index' (getEntry('siteSettings', 'index')).

import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { basePath } from './siteSettingsKeystatic';
import { loader } from './utils/loader';

export const siteSettingsSchema = z.object({
  registrationUrl: z.string().url(),
  eventTargetDate: z.string().regex(
    /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?[+-]\d{2}:\d{2}$/,
    'Formato esperado: 2027-03-14T14:10:00-03:00',
  ),
});

export const astroSiteSettingsDefinition = defineCollection({
  loader: loader(basePath, 'json'),
  schema: siteSettingsSchema,
});

export type SiteSettingsData = z.infer<typeof siteSettingsSchema>;
