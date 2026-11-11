// src/content.config.ts
// Registro de colecciones del Content Layer de Astro — patrón dual-file del
// skill keystatic-astro: cada colección Keystatic (cms/*Keystatic.ts) tiene su
// definición Astro (cms/*Astro.ts) con loader + schema Zod.
//
// Colecciones de páginas: una entrada por idioma (es.json / en.json); el
// routing i18n (es sin prefijo, /en) es responsabilidad de Astro
// (astro.config.mjs + src/i18n/config.ts), no del contenido.

import { astroPagesHomeDefinition } from '../cms/pagesHomeAstro';
import { astroPagesEventoDefinition } from '../cms/pagesEventoAstro';
import { astroPagesRutaDefinition } from '../cms/pagesRutaAstro';
import { astroPagesResultadosDefinition } from '../cms/pagesResultadosAstro';
import { astroPagesValdiviaDefinition } from '../cms/pagesValdiviaAstro';
import { astroPagesContactoDefinition } from '../cms/pagesContactoAstro';
import { astroSiteCommonDefinition } from '../cms/siteCommonAstro';
import { astroSiteSettingsDefinition } from '../cms/siteSettingsAstro';

export const collections = {
  pagesHome: astroPagesHomeDefinition,
  pagesEvento: astroPagesEventoDefinition,
  pagesRuta: astroPagesRutaDefinition,
  pagesResultados: astroPagesResultadosDefinition,
  pagesValdivia: astroPagesValdiviaDefinition,
  pagesContacto: astroPagesContactoDefinition,
  siteCommon: astroSiteCommonDefinition,
  siteSettings: astroSiteSettingsDefinition,
};
