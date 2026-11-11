// keystatic.config.ts
// Configuración de Keystatic CMS — Valdivia Bike Fest (Fase 2).
//
// Storage (dos modos, elegidos en build; ver README):
//  - `local` → desarrollo (`npm run keystatic`): edita src/content/** en disco.
//  - `cloud` → Keystatic Cloud (build `node` para Hostinger): el cliente entra
//    a <sitio>/keystatic con su email y cada guardado es un commit al repo
//    GitHub vinculado al proyecto en keystatic.cloud.
// Por defecto: `local` en dev, `cloud` en cualquier build. Se puede forzar con
// PUBLIC_KEYSTATIC_STORAGE=local|cloud (p. ej. para probar cloud en dev).
// Las variables PUBLIC_* se incrustan en build time (Vite las reemplaza).
//
// GitHub Pages (target `static`) NO incluye Keystatic: este archivo ni se carga.
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

const storageKind: 'local' | 'cloud' =
  (import.meta.env.PUBLIC_KEYSTATIC_STORAGE as 'local' | 'cloud' | undefined) ||
  (import.meta.env.DEV ? 'local' : 'cloud');

// TODO: definir PUBLIC_KEYSTATIC_CLOUD_PROJECT con el "<team>/<project>" real de
// keystatic.cloud (no es un secreto). Mientras tanto se usa un placeholder.
const cloudProject: string =
  import.meta.env.PUBLIC_KEYSTATIC_CLOUD_PROJECT || 'TODO-team/TODO-project';

export default config({
  storage: storageKind === 'cloud' ? { kind: 'cloud' } : { kind: 'local' },
  cloud: { project: cloudProject },
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
