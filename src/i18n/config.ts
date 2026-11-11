// src/i18n/config.ts
// Configuración i18n del sitio (features.i18n del spec: es default + en).
// ES se sirve sin prefijo; EN bajo /en. El switcher del header enlaza a la
// misma página en el otro locale.

import { withBase } from '@/utils/url';

export const locales = ['es', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'es';

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Ruta con prefijo de locale según el routing de Astro (es sin prefijo), incluyendo BASE_URL. */
export function localePath(locale: Locale, path: string): string {
  const clean = path === '/' ? '' : path;
  return withBase(locale === defaultLocale ? clean || '/' : `/${locale}${clean}`);
}

/** Ruta de la misma página en el locale alternativo (para el switcher). */
export function alternateLocalePath(current: Locale, path: string): string {
  const target: Locale = current === 'es' ? 'en' : 'es';
  return localePath(target, path);
}
