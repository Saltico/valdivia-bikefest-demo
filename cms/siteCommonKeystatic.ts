// cms/siteCommonKeystatic.ts
// Schema Keystatic de la colección `siteCommon` — textos compartidos por
// todas las páginas (header, footer, CTA final, a11y). Patrón dual-file.
// Una entrada por idioma (es.json / en.json).

import { fields } from '@keystatic/core';
import { localeField } from './utils/localeField';

export const basePath = 'src/content/common';

export const keystaticSiteCommonConfig = {
  label: 'Textos compartidos (menú, pie, CTA final)',
  slugField: 'locale' as const,
  path: `${basePath}/*`,
  format: { data: 'json' } as const,
  entryLayout: 'form' as const,
  schema: {
    locale: localeField(),
    skipToContent: fields.text({ label: 'Link "saltar al contenido"', validation: { isRequired: true } }),
    nav: fields.array(
      fields.object(
        {
          label: fields.text({ label: 'Etiqueta', validation: { isRequired: true } }),
          href: fields.text({
            label: 'Ruta',
            description: 'Ruta sin prefijo de idioma (p. ej. /evento). El prefijo /en se agrega automáticamente.',
            validation: { isRequired: true, pattern: { regex: /^\//, message: 'Debe empezar con "/".' } },
          }),
        },
        { label: 'Ítem' },
      ),
      { label: 'Navegación principal', itemLabel: (props) => props.fields.label.value || 'Ítem' },
    ),
    register: fields.text({ label: 'CTA — Inscríbete', validation: { isRequired: true } }),
    changeLanguage: fields.text({ label: 'Etiqueta aria — cambiar idioma', validation: { isRequired: true } }),
    openMenu: fields.text({ label: 'Etiqueta aria — abrir menú', validation: { isRequired: true } }),
    closeMenu: fields.text({ label: 'Etiqueta aria — cerrar menú', validation: { isRequired: true } }),
    mobileNavLabel: fields.text({ label: 'Etiqueta aria — nav móvil', validation: { isRequired: true } }),
    mainNavLabel: fields.text({ label: 'Etiqueta aria — nav principal', validation: { isRequired: true } }),
    homeLabel: fields.text({ label: 'Etiqueta aria — logo (inicio)', validation: { isRequired: true } }),
    footerMeta: fields.text({ label: 'Meta del pie', validation: { isRequired: true } }),
    finalCta: fields.object(
      {
        coordinate: fields.text({ label: 'Coordenada', validation: { isRequired: true } }),
        kicker: fields.text({ label: 'Kicker', validation: { isRequired: true } }),
        headingHtml: fields.text({
          label: 'Encabezado (HTML)',
          description: 'Admite <br> y <em>.',
          validation: { isRequired: true },
        }),
        primaryLabel: fields.text({ label: 'CTA principal — etiqueta', validation: { isRequired: true } }),
        secondaryLabel: fields.text({ label: 'Link secundario — etiqueta', validation: { isRequired: true } }),
        secondaryHref: fields.text({
          label: 'Link secundario — ruta',
          description: 'Ruta sin prefijo de idioma (p. ej. /contacto).',
          validation: { isRequired: true, pattern: { regex: /^\//, message: 'Debe empezar con "/".' } },
        }),
      },
      { label: 'CTA final' },
    ),
  },
};
