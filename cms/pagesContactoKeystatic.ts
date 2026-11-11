// cms/pagesContactoKeystatic.ts
// Schema Keystatic de la colección `pagesContacto` (página /contacto) — patrón
// dual-file. Una entrada por idioma (es.json / en.json).
// El email/Instagram/mapa NO viven aquí: provienen de variables de entorno
// (PUBLIC_CONTACT_EMAIL, PUBLIC_MAPS_EMBED_URL) y src/data/site.ts.

import { fields } from '@keystatic/core';
import { localeField } from './utils/localeField';

export const basePath = 'src/content/pages/contacto';

export const keystaticPagesContactoConfig = {
  label: 'Contacto',
  slugField: 'locale' as const,
  path: `${basePath}/*`,
  format: { data: 'json' } as const,
  entryLayout: 'form' as const,
  schema: {
    locale: localeField(),
    metaTitle: fields.text({
      label: 'Meta título (SEO)',
      validation: { isRequired: true, length: { max: 70 } },
    }),
    metaDescription: fields.text({
      label: 'Meta descripción (SEO)',
      validation: { isRequired: true, length: { max: 165 } },
    }),
    hero: fields.object(
      {
        kicker: fields.text({ label: 'Kicker', validation: { isRequired: true } }),
        headingHtml: fields.text({
          label: 'Encabezado H1 (HTML)',
          description: 'Admite <br> y <em>.',
          validation: { isRequired: true },
        }),
        intro: fields.text({ label: 'Intro', multiline: true, validation: { isRequired: true } }),
        bgAlt: fields.text({ label: 'Alt de la foto de fondo', validation: { isRequired: true } }),
      },
      { label: 'Hero' },
    ),
    form: fields.object(
      {
        titleHtml: fields.text({
          label: 'Título del formulario (HTML)',
          description: 'Admite <em>.',
          validation: { isRequired: true },
        }),
        nameLabel: fields.text({ label: 'Etiqueta — Nombre', validation: { isRequired: true } }),
        emailLabel: fields.text({ label: 'Etiqueta — Email', validation: { isRequired: true } }),
        messageLabel: fields.text({ label: 'Etiqueta — Mensaje', validation: { isRequired: true } }),
        submitLabel: fields.text({ label: 'Etiqueta — Enviar', validation: { isRequired: true } }),
        successTitle: fields.text({ label: 'Éxito — título', validation: { isRequired: true } }),
        successText: fields.text({ label: 'Éxito — texto', multiline: true, validation: { isRequired: true } }),
        toast: fields.text({
          label: 'Toast de confirmación',
          description: 'Mensaje breve que se muestra al enviar (fallback mailto).',
          multiline: true,
          validation: { isRequired: true },
        }),
      },
      { label: 'Formulario' },
    ),
    mapTitle: fields.text({ label: 'Título del mapa', validation: { isRequired: true } }),
  },
};
