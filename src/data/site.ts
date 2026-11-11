// src/data/site.ts
// Single source of truth for all shared site data (VBK).
// Contact data reads from env vars (PUBLIC_CONTACT_*) — never hardcoded.

import { withBase } from '@/utils/url';

export const siteBrand = {
  name: 'Valdivia Bike Fest',
  tagline: 'La ruta está esperando',
  description:
    'Valdivia Bike Fest: competencia mountain bike en Valdivia, Chile. Conoce el evento, explora la ruta, revisa los horarios y prepárate para inscribirte.',
  logoUrl: '/img/logo.png',
  logoWidth: 217,
  logoHeight: 179,
  siteUrl: import.meta.env.PUBLIC_SITE_URL ?? 'https://valdiviabikefest.cl',
};

// ─── Language ────────────────────────────────────────────────────────
export const siteLanguage = import.meta.env.PUBLIC_SITE_LANG ?? 'es';

// ─── Contact (from env vars — no hardcoded client data) ──────────────
export const siteContact = {
  email: import.meta.env.PUBLIC_CONTACT_EMAIL ?? '',
  phone: import.meta.env.PUBLIC_CONTACT_PHONE ?? '',
  address: import.meta.env.PUBLIC_CONTACT_ADDRESS ?? '',
  mapsEmbedUrl: import.meta.env.PUBLIC_MAPS_EMBED_URL ?? '',
};

// ─── Social ──────────────────────────────────────────────────────────
export const siteSocial = {
  instagram: import.meta.env.PUBLIC_SOCIAL_INSTAGRAM ?? '',
  instagramHandle: import.meta.env.PUBLIC_SOCIAL_INSTAGRAM_HANDLE ?? '',
};

// ─── Registration (Eventrid — URL oficial confirmada por el cliente) ─
// Nota: el slug dice "2026" aunque la edición es 2027; es la URL oficial.
export const REGISTRATION_URL =
  'https://www.eventrid.cl/eventos/mvk/valdivia-bikefest-2026';

// ─── Evento (JSON-LD SportsEvent + cuenta regresiva) ─────────────────
export const EVENT_TARGET_DATE = '2027-03-14T14:10:00-03:00'; // largada principal, America/Santiago

export const sportsEventSchema: Record<string, unknown> = {
  '@context': 'https://schema.org',
  '@type': 'SportsEvent',
  name: 'Valdivia Bike Fest',
  description: 'Competencia de mountain bike en Valdivia, Chile.',
  sport: 'Mountain biking',
  startDate: '2027-03-10T09:00:00-03:00',
  endDate: '2027-03-14T18:00:00-03:00',
  location: {
    '@type': 'Place',
    name: 'Complejo deportivo Asenav',
    // Dirección desde PUBLIC_CONTACT_ADDRESS (env), nunca hardcodeada.
    ...(siteContact.address
      ? {
          address: {
            '@type': 'PostalAddress',
            streetAddress: siteContact.address,
            addressLocality: 'Valdivia',
            addressCountry: 'CL',
          },
        }
      : {}),
  },
  url: new URL(withBase('/'), siteBrand.siteUrl).toString(),
};
