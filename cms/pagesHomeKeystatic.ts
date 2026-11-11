// cms/pagesHomeKeystatic.ts
// Schema Keystatic de la colección `pagesHome` (página /) — patrón dual-file.
// Una entrada por idioma (es.json / en.json). Keystatic gestiona el contenido
// localizado; el routing i18n (es sin prefijo, /en) es responsabilidad de Astro.
// Referenciado por keystatic.config.ts.

import { fields } from '@keystatic/core';
import { localeField } from './utils/localeField';

export const basePath = 'src/content/pages/home';

export const keystaticPagesHomeConfig = {
  label: 'Inicio',
  slugField: 'locale' as const,
  path: `${basePath}/*`,
  format: { data: 'json' } as const,
  entryLayout: 'form' as const,
  schema: {
    locale: localeField(),
    metaTitle: fields.text({
      label: 'Meta título (SEO)',
      description: 'Título de la pestaña / resultado de búsqueda de la home.',
      validation: { isRequired: true, length: { max: 70 } },
    }),
    metaDescription: fields.text({
      label: 'Meta descripción (SEO)',
      description: 'Resumen que muestra Google bajo el título (máx. ~160 caracteres).',
      validation: { isRequired: true, length: { max: 165 } },
    }),
    signal: fields.text({ label: 'Señal — lugar', validation: { isRequired: true } }),
    signalBrand: fields.text({ label: 'Señal — marca', validation: { isRequired: true } }),
    headingHtml: fields.text({
      label: 'Encabezado H1 (HTML)',
      description: 'Admite <br> y <em> (énfasis en turquoise). Ej: La ruta<br><em>está esperando</em>',
      validation: { isRequired: true },
    }),
    intro: fields.text({
      label: 'Intro del hero',
      validation: { isRequired: true },
      multiline: true,
    }),
    exploreRoute: fields.text({ label: 'CTA secundario — Explora la ruta', validation: { isRequired: true } }),
    status: fields.text({ label: 'Estado (etiqueta junto al punto pulsante)', validation: { isRequired: true } }),
    statusAriaLabel: fields.text({ label: 'Estado — etiqueta aria', validation: { isRequired: true } }),
    countdown: fields.object(
      {
        days: fields.text({ label: 'Unidad: días', validation: { isRequired: true } }),
        hours: fields.text({ label: 'Unidad: horas', validation: { isRequired: true } }),
        minutes: fields.text({ label: 'Unidad: minutos', validation: { isRequired: true } }),
        seconds: fields.text({ label: 'Unidad: segundos', validation: { isRequired: true } }),
      },
      { label: 'Cuenta regresiva — unidades' },
    ),
    statusMessage: fields.text({ label: 'Mensaje de estado (fechas)', validation: { isRequired: true } }),
    endMessage: fields.text({
      label: 'Mensaje al terminar la cuenta',
      validation: { isRequired: true },
    }),
    evento: fields.object(
      {
        kicker: fields.text({ label: 'Kicker', validation: { isRequired: true } }),
        headingHtml: fields.text({
          label: 'Encabezado (HTML)',
          description: 'Admite <br> y <em>.',
          validation: { isRequired: true },
        }),
        lead: fields.text({ label: 'Lead', multiline: true, validation: { isRequired: true } }),
        linkLabel: fields.text({ label: 'Etiqueta del link a /evento', validation: { isRequired: true } }),
        gridLabel: fields.text({ label: 'Etiqueta de la grilla', validation: { isRequired: true } }),
        items: fields.array(
          fields.object(
            {
              n: fields.text({ label: 'Número', validation: { isRequired: true } }),
              titleHtml: fields.text({
                label: 'Título (HTML)',
                description: 'Admite <br>.',
                validation: { isRequired: true },
              }),
              text: fields.text({ label: 'Texto', validation: { isRequired: true } }),
            },
            { label: 'Item' },
          ),
          {
            label: 'Items de la grilla',
            itemLabel: (props) => props.fields.n.value || 'Item',
          },
        ),
      },
      { label: 'Sección — El evento' },
    ),
    ruta: fields.object(
      {
        kicker: fields.text({ label: 'Kicker', validation: { isRequired: true } }),
        headingHtml: fields.text({
          label: 'Encabezado (HTML)',
          description: 'Admite <br> y <em>.',
          validation: { isRequired: true },
        }),
        tabs: fields.array(
          fields.object(
            {
              id: fields.select({
                label: 'Formato',
                options: [
                  { label: 'XCO', value: 'xco' },
                  { label: 'XCC', value: 'xcc' },
                ],
                defaultValue: 'xco',
              }),
              index: fields.text({ label: 'Índice', validation: { isRequired: true } }),
              label: fields.text({ label: 'Etiqueta del tab', validation: { isRequired: true } }),
              sublabel: fields.text({ label: 'Subetiqueta del tab', validation: { isRequired: true } }),
              state: fields.text({ label: 'Estado del circuito', validation: { isRequired: true } }),
              title: fields.text({ label: 'Título del panel', validation: { isRequired: true } }),
              description: fields.text({ label: 'Descripción', multiline: true, validation: { isRequired: true } }),
              distance: fields.text({ label: 'Distancia', validation: { isRequired: true } }),
              elevation: fields.text({ label: 'Desnivel', validation: { isRequired: true } }),
              time: fields.text({ label: 'Horario', validation: { isRequired: true } }),
            },
            { label: 'Tab de circuito' },
          ),
          { label: 'Tabs XCO/XCC', itemLabel: (props) => props.fields.label.value || 'Tab' },
        ),
        dataLabels: fields.object(
          {
            distance: fields.text({ label: 'Etiqueta: distancia', validation: { isRequired: true } }),
            elevation: fields.text({ label: 'Etiqueta: desnivel', validation: { isRequired: true } }),
            time: fields.text({ label: 'Etiqueta: horario', validation: { isRequired: true } }),
          },
          { label: 'Etiquetas de datos' },
        ),
        footerNote: fields.text({ label: 'Nota al pie del panel', validation: { isRequired: true } }),
        linkLabel: fields.text({ label: 'Etiqueta del link a /ruta', validation: { isRequired: true } }),
      },
      { label: 'Sección — Ruta interactiva' },
    ),
    schedule: fields.object(
      {
        kicker: fields.text({ label: 'Kicker', validation: { isRequired: true } }),
        headingHtml: fields.text({
          label: 'Encabezado (HTML)',
          description: 'Admite <br> y <em>.',
          validation: { isRequired: true },
        }),
        rows: fields.array(
          fields.object(
            {
              n: fields.text({ label: 'Número', validation: { isRequired: true } }),
              title: fields.text({ label: 'Título', validation: { isRequired: true } }),
              when: fields.text({ label: 'Cuándo', validation: { isRequired: true } }),
              note: fields.text({ label: 'Nota', validation: { isRequired: true } }),
            },
            { label: 'Fila' },
          ),
          { label: 'Filas del día de carrera', itemLabel: (props) => props.fields.title.value || 'Fila' },
        ),
      },
      { label: 'Sección — Día de carrera' },
    ),
    resultados: fields.object(
      {
        kicker: fields.text({ label: 'Kicker', validation: { isRequired: true } }),
        headingHtml: fields.text({
          label: 'Encabezado (HTML)',
          description: 'Admite <br> y <em>.',
          validation: { isRequired: true },
        }),
        copy: fields.text({ label: 'Copy', multiline: true, validation: { isRequired: true } }),
        ctaLabel: fields.text({ label: 'Etiqueta del CTA a /resultados', validation: { isRequired: true } }),
        imageAlt: fields.text({ label: 'Alt de la imagen', validation: { isRequired: true } }),
      },
      { label: 'Sección — Resultados (teaser)' },
    ),
    valdivia: fields.object(
      {
        kicker: fields.text({ label: 'Kicker', validation: { isRequired: true } }),
        headingHtml: fields.text({
          label: 'Encabezado (HTML)',
          description: 'Admite <br> y <em>.',
          validation: { isRequired: true },
        }),
        copy: fields.text({ label: 'Copy', multiline: true, validation: { isRequired: true } }),
        linkLabel: fields.text({ label: 'Etiqueta del link a /valdivia', validation: { isRequired: true } }),
        overlayPhraseHtml: fields.text({
          label: 'Frase del carrusel (HTML)',
          description: 'Superpuesta a las fotos. Admite <br>.',
          validation: { isRequired: true },
        }),
      },
      { label: 'Sección — Valdivia (teaser)' },
    ),
  },
};
