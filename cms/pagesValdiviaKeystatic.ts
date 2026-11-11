// cms/pagesValdiviaKeystatic.ts
// Schema Keystatic de la colección `pagesValdivia` (página /valdivia) — patrón
// dual-file. Una entrada por idioma (es.json / en.json).
// Nota: los íconos SVG de la nav lateral viven en ValdiviaPage.astro; el
// schema referencia sus claves (navIcon).

import { fields } from '@keystatic/core';
import { localeField } from './utils/localeField';

export const basePath = 'src/content/pages/valdivia';

/** Íconos disponibles para la nav lateral de destinos (SVG en ValdiviaPage.astro). */
export const destinationNavIcons = ['forest', 'volcano', 'waves', 'beer', 'fortress'] as const;

export const keystaticPagesValdiviaConfig = {
  label: 'Valdivia',
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
        hiddenH1: fields.text({
          label: 'H1 oculto (SEO)',
          description: 'El h1 visual es decorativo; este texto se anuncia a lectores de pantalla y buscadores.',
          validation: { isRequired: true },
        }),
      },
      { label: 'Hero' },
    ),
    navLabel: fields.text({ label: 'Etiqueta aria de la nav de destinos', validation: { isRequired: true } }),
    destinations: fields.array(
      fields.object(
        {
          id: fields.text({
            label: 'ID (ancla)',
            description: 'Slug del destino — se usa como ancla (#id) y NO debe repetirse entre destinos.',
            validation: { isRequired: true, pattern: { regex: /^[a-z0-9-]+$/, message: 'Solo minúsculas, números y guiones.' } },
          }),
          navLabel: fields.text({ label: 'Etiqueta en la nav lateral', validation: { isRequired: true } }),
          navIcon: fields.select({
            label: 'Ícono de la nav',
            options: [
              { label: 'Bosque', value: 'forest' },
              { label: 'Volcán', value: 'volcano' },
              { label: 'Olas / sol', value: 'waves' },
              { label: 'Jarra de cerveza', value: 'beer' },
              { label: 'Fortaleza', value: 'fortress' },
            ],
            defaultValue: 'forest',
          }),
          kicker: fields.text({ label: 'Kicker', validation: { isRequired: true } }),
          titleHtml: fields.text({
            label: 'Título (HTML)',
            description: 'Admite <span class="destination-title-accent"> para el acento turquoise.',
            validation: { isRequired: true },
          }),
          description: fields.text({ label: 'Descripción', multiline: true, validation: { isRequired: true } }),
          bgAlt: fields.text({ label: 'Alt de la foto de fondo', validation: { isRequired: true } }),
          image: fields.text({
            label: 'Ruta de imagen',
            description: 'Ruta pública, p. ej. /img/valdivia_hero.avif (archivos en public/img).',
            validation: { isRequired: true },
          }),
          infoLabel: fields.text({ label: 'Botón — Información (etiqueta)', validation: { isRequired: true } }),
          infoHref: fields.text({
            label: 'Botón — Información (URL)',
            validation: { isRequired: true, pattern: { regex: /^https?:\/\//, message: 'Debe ser una URL http(s).' } },
          }),
          mapLabel: fields.text({ label: 'Botón — Mapa (etiqueta)', validation: { isRequired: true } }),
          mapHref: fields.text({
            label: 'Botón — Mapa (URL)',
            validation: { isRequired: true, pattern: { regex: /^https?:\/\//, message: 'Debe ser una URL http(s).' } },
          }),
        },
        { label: 'Destino' },
      ),
      { label: 'Destinos', itemLabel: (props) => props.fields.navLabel.value || 'Destino' },
    ),
  },
};
