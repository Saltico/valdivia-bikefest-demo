// cms/utils/locales.ts
// Constantes de locale compartidas entre los schemas Keystatic (cms/*Keystatic.ts)
// y los schemas Astro (cms/*Astro.ts). Única fuente de verdad para los códigos
// de idioma del contenido (features.i18n del spec: es default + en).
//
// El ROUTING i18n (prefijos, switcher, hreflang) sigue siendo responsabilidad
// de Astro (src/i18n/config.ts); este archivo solo describe el contenido.

export const LOCALES = ['es', 'en'] as const;
export type ContentLocale = (typeof LOCALES)[number];

/** Opciones para `fields.select` de Keystatic (UI del CMS). */
export const LOCALE_OPTIONS = [
  { label: 'Español (es)', value: 'es' },
  { label: 'English (en)', value: 'en' },
] as const;
