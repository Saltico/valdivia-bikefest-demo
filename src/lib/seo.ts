// src/lib/seo.ts
// Schema.org builders + getSiteUrl() + localBusinessSchema

import type { SiteConfig } from '@/types/seo';
import { withBase } from '@/utils/url';

const DEFAULT_CONFIG: SiteConfig = {
  siteUrl: import.meta.env.PUBLIC_SITE_URL ?? 'https://valdiviabikefest.cl',
  siteName: 'Valdivia Bike Fest',
  defaultLocale: import.meta.env.PUBLIC_SITE_LANG ?? 'es',
  phone: import.meta.env.PUBLIC_CONTACT_PHONE ?? '',
  email: import.meta.env.PUBLIC_CONTACT_EMAIL ?? '',
  logoPath: '/img/logo.png',
};

export function getSiteConfig(): SiteConfig {
  return DEFAULT_CONFIG;
}

export function getSiteUrl(path = ''): string {
  const config = getSiteConfig();
  // Incluye BASE_URL (idempotente): site + base + path
  return new URL(withBase(path), config.siteUrl).toString();
}

/**
 * URL de la versión en el idioma por defecto (x-default). Usa hreflang[defaultLocale]
 * (ya incluye site + base); si no existe, quita el prefijo de locale del canonical.
 * Default sin prefijo (prefixDefaultLocale = false).
 */
export function getDefaultLocaleUrl(canonical: string, hreflang?: Record<string, string>): string {
  const defaultLocale = getSiteConfig().defaultLocale;
  if (hreflang?.[defaultLocale]) return hreflang[defaultLocale];
  return canonical;
}

export function organizationSchema(): Record<string, unknown> {
  const config = getSiteConfig();
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: config.siteName,
    url: getSiteUrl('/'),
    logo: getSiteUrl(config.logoPath),
    // ContactPoint solo si hay canal real configurado (env vars)
    ...(config.email || config.phone
      ? {
          contactPoint: {
            '@type': 'ContactPoint',
            ...(config.phone ? { telephone: config.phone } : {}),
            contactType: 'customer service',
            ...(config.email ? { email: config.email } : {}),
            availableLanguage: ['English', 'Spanish'],
          },
        }
      : {}),
  };
}

export function websiteSchema(searchUrl?: string): Record<string, unknown> {
  const config = getSiteConfig();
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: config.siteName,
    url: getSiteUrl('/'),
    ...(searchUrl && {
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${searchUrl}?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    }),
  };
}

export function localBusinessSchema(options?: {
  name?: string;
  address?: string;
  openingHours?: string;
  mapsEmbedUrl?: string;
}): Record<string, unknown> {
  const config = getSiteConfig();
  const name = options?.name ?? config.siteName;
  const address = options?.address ?? '123 Main Street, City';
  const openingHours = options?.openingHours ?? 'Mo-Fr 09:00-18:00';

  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name,
    url: getSiteUrl('/'),
    logo: getSiteUrl(config.logoPath),
    image: getSiteUrl('/og-default.jpg'),
    telephone: config.phone,
    email: config.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: address,
    },
    openingHours,
    priceRange: '$$',
    geo: {
      '@type': 'GeoCoordinates',
    },
    ...(options?.mapsEmbedUrl && {
      hasMap: options.mapsEmbedUrl,
    }),
  };
}

export function breadcrumbSchema(items: { label: string; url?: string }[]): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: item.url ? getSiteUrl(item.url) : undefined,
    })),
  };
}

export function articleSchema(
  headline: string,
  description: string,
  url: string,
  datePublished: string,
  image?: string
): Record<string, unknown> {
  const config = getSiteConfig();
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline,
    description,
    url,
    datePublished,
    image: image ?? getSiteUrl('/og-default.jpg'),
    author: {
      '@type': 'Organization',
      name: config.siteName,
    },
    publisher: organizationSchema(),
  };
}

export function blogPostingSchema(
  headline: string,
  description: string,
  url: string,
  datePublished: string,
  image?: string
): Record<string, unknown> {
  const config = getSiteConfig();
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline,
    description,
    url,
    datePublished,
    image: image ?? getSiteUrl('/og-default.jpg'),
    author: {
      '@type': 'Organization',
      name: config.siteName,
    },
    publisher: organizationSchema(),
  };
}

export function combineSchemas(...schemas: Record<string, unknown>[]): Record<string, unknown>[] {
  return schemas;
}
