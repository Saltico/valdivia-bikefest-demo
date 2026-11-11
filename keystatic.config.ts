// keystatic.config.ts
// Configuración de Keystatic CMS — Valdivia Bike Fest (Fase 2).
//
// Storage `local`: el CMS edita archivos del repo (src/content/**) y los
// cambios se versionan con Git. En la demo estática (GitHub Pages) el CMS NO
// corre en el host: la edición se hace en local (`npm run keystatic`) y el
// resultado se publica con el build estático.
//
// Colecciones: una por página (6) + textos compartidos, con una entrada por
// idioma (es/en). Keystatic gestiona el contenido localizado; el routing i18n
// (es sin prefijo, /en) sigue siendo responsabilidad de Astro.
//
// Schemas en cms/*Keystatic.ts (patrón dual-file del skill keystatic-astro).

import { config, collection, singleton } from '@keystatic/core';
import { keystaticPagesHomeConfig } from './cms/pagesHomeKeystatic';
import { keystaticPagesEventoConfig } from './cms/pagesEventoKeystatic';
import { keystaticPagesRutaConfig } from './cms/pagesRutaKeystatic';
import { keystaticPagesResultadosConfig } from './cms/pagesResultadosKeystatic';
import { keystaticPagesValdiviaConfig } from './cms/pagesValdiviaKeystatic';
import { keystaticPagesContactoConfig } from './cms/pagesContactoKeystatic';
import { keystaticSiteCommonConfig } from './cms/siteCommonKeystatic';
import { keystaticSiteSettingsConfig } from './cms/siteSettingsKeystatic';

export default config({
  storage: {
    kind: 'local',
  },
  ui: {
    locale: 'es-ES',
    brand: {
      name: 'Valdivia Bike Fest',
    },
    navigation: {
      Páginas: [
        'pagesHome',
        'pagesEvento',
        'pagesRuta',
        'pagesResultados',
        'pagesValdivia',
        'pagesContacto',
      ],
      'Contenido compartido': ['siteCommon', 'siteSettings'],
    },
  },
  collections: {
    pagesHome: collection(keystaticPagesHomeConfig),
    pagesEvento: collection(keystaticPagesEventoConfig),
    pagesRuta: collection(keystaticPagesRutaConfig),
    pagesResultados: collection(keystaticPagesResultadosConfig),
    pagesValdivia: collection(keystaticPagesValdiviaConfig),
    pagesContacto: collection(keystaticPagesContactoConfig),
    siteCommon: collection(keystaticSiteCommonConfig),
  },
  singletons: {
    siteSettings: singleton(keystaticSiteSettingsConfig),
  },
});
