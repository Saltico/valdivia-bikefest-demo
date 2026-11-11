// cms/siteSettingsKeystatic.ts
// Schema Keystatic del singleton `siteSettings` — ajustes globales del sitio
// gestionados por el CMS (URL de inscripción y fecha objetivo de la cuenta
// regresiva). Patrón dual-file. Un único archivo (index.json).
// El resto de los ajustes (marca, contacto, analytics) sigue en .env /
// src/data/site.ts porque provienen de variables de entorno.

import { fields } from '@keystatic/core';

export const basePath = 'src/content/settings';

export const keystaticSiteSettingsConfig = {
  label: 'Ajustes del sitio',
  path: `${basePath}/index` as const,
  format: { data: 'json' } as const,
  entryLayout: 'form' as const,
  schema: {
    registrationUrl: fields.text({
      label: 'URL de inscripción (Eventrid)',
      description:
        'Destino del botón "Inscríbete" del header, hero y CTA final. URL externa que cambia con cada edición.',
      validation: { isRequired: true, pattern: { regex: /^https?:\/\//, message: 'Debe ser una URL http(s).' } },
    }),
    eventTargetDate: fields.text({
      label: 'Fecha objetivo de la cuenta regresiva',
      description:
        'ISO 8601 con offset, p. ej. 2027-03-14T14:10:00-03:00 (largada principal, America/Santiago).',
      validation: {
        isRequired: true,
        pattern: {
          regex: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}(:\d{2})?[+-]\d{2}:\d{2}$/,
          message: 'Formato esperado: 2027-03-14T14:10:00-03:00',
        },
      },
    }),
  },
};
