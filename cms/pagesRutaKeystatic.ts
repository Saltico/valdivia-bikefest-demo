// cms/pagesRutaKeystatic.ts
// Schema Keystatic de la colección `pagesRuta` (página /ruta) — patrón
// dual-file. Una entrada por idioma (es.json / en.json).
// Nota: la sección "Congreso técnico" sigue omitida hasta confirmación
// oficial (warning del site-spec) y se conserva como comentario en
// RutaPage.astro, por lo que no forma parte del schema editable.

import { fields } from '@keystatic/core';
import { localeField } from './utils/localeField';

export const basePath = 'src/content/pages/ruta';

/** Íconos disponibles para los datos clave (los SVG viven en RutaPage.astro). */
export const keyDataIcons = ['calendar', 'people', 'clock', 'flag', 'uci'] as const;

/** Estados de fila del programa (clases CSS confirmado/pendiente). */
export const programStatuses = ['confirmed', 'pending'] as const;

export const keystaticPagesRutaConfig = {
  label: 'Ruta y horario',
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
      },
      { label: 'Hero' },
    ),
    keyData: fields.array(
      fields.object(
        {
          icon: fields.select({
            label: 'Ícono',
            options: [
              { label: 'Calendario', value: 'calendar' },
              { label: 'Grupo de personas', value: 'people' },
              { label: 'Reloj', value: 'clock' },
              { label: 'Bandera / cuadrícula', value: 'flag' },
              { label: 'Bandera UCI', value: 'uci' },
            ],
            defaultValue: 'calendar',
          }),
          label: fields.text({ label: 'Etiqueta', validation: { isRequired: true } }),
          value: fields.text({ label: 'Valor', validation: { isRequired: true } }),
        },
        { label: 'Dato' },
      ),
      { label: 'Datos clave', itemLabel: (props) => props.fields.label.value || 'Dato' },
    ),
    formatos: fields.object(
      {
        kicker: fields.text({ label: 'Kicker', validation: { isRequired: true } }),
        headingHtml: fields.text({
          label: 'Encabezado (HTML)',
          description: 'Admite <br> y <em>.',
          validation: { isRequired: true },
        }),
        cards: fields.array(
          fields.object(
            {
              label: fields.text({ label: 'Etiqueta', validation: { isRequired: true } }),
              name: fields.text({ label: 'Nombre corto', validation: { isRequired: true } }),
              fullName: fields.text({ label: 'Nombre completo', validation: { isRequired: true } }),
              metrics: fields.array(
                fields.object(
                  {
                    value: fields.text({ label: 'Valor', validation: { isRequired: true } }),
                    unit: fields.text({ label: 'Unidad', validation: { isRequired: true } }),
                    label: fields.text({ label: 'Etiqueta', validation: { isRequired: true } }),
                  },
                  { label: 'Métrica' },
                ),
                { label: 'Métricas', itemLabel: (props) => props.fields.label.value || 'Métrica' },
              ),
              details: fields.text({ label: 'Detalle', multiline: true, validation: { isRequired: true } }),
              statusLabel: fields.text({ label: 'Etiqueta de estado', validation: { isRequired: true } }),
              statusValue: fields.text({ label: 'Valor de estado', validation: { isRequired: true } }),
            },
            { label: 'Tarjeta de circuito' },
          ),
          { label: 'Tarjetas XCO/XCC', itemLabel: (props) => props.fields.name.value || 'Circuito' },
        ),
        note: fields.text({ label: 'Nota', validation: { isRequired: true } }),
      },
      { label: 'Sección — Formatos' },
    ),
    programa: fields.object(
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
              day: fields.text({ label: 'Día', validation: { isRequired: true } }),
              activity: fields.text({ label: 'Actividad', validation: { isRequired: true } }),
              status: fields.select({
                label: 'Estado',
                options: [
                  { label: 'Confirmado', value: 'confirmed' },
                  { label: 'Pendiente', value: 'pending' },
                ],
                defaultValue: 'pending',
              }),
              statusLabel: fields.text({ label: 'Etiqueta de estado', validation: { isRequired: true } }),
            },
            { label: 'Fila' },
          ),
          { label: 'Programa por día', itemLabel: (props) => props.fields.day.value || 'Día' },
        ),
      },
      { label: 'Sección — Programa' },
    ),
    categorias: fields.object(
      {
        kicker: fields.text({ label: 'Kicker', validation: { isRequired: true } }),
        headingHtml: fields.text({
          label: 'Encabezado (HTML)',
          description: 'Admite <br> y <em>.',
          validation: { isRequired: true },
        }),
        groups: fields.array(
          fields.object(
            {
              title: fields.text({ label: 'Título del grupo', validation: { isRequired: true } }),
              items: fields.array(fields.text({ label: 'Categoría', validation: { isRequired: true } }), {
                label: 'Categorías',
                itemLabel: (props) => props.value || 'Categoría',
              }),
            },
            { label: 'Grupo' },
          ),
          { label: 'Grupos de categorías', itemLabel: (props) => props.fields.title.value || 'Grupo' },
        ),
        note: fields.text({ label: 'Nota', validation: { isRequired: true } }),
      },
      { label: 'Sección — Categorías' },
    ),
    galeriaLabel: fields.text({ label: 'Etiqueta aria de la galería', validation: { isRequired: true } }),
    lightboxLabel: fields.text({ label: 'Etiqueta aria del lightbox', validation: { isRequired: true } }),
    lightboxClose: fields.text({ label: 'Etiqueta de cerrar lightbox', validation: { isRequired: true } }),
    galeria: fields.array(
      fields.object(
        {
          src: fields.text({
            label: 'Ruta de imagen',
            description: 'Ruta pública, p. ej. /img/carrera.avif (los archivos viven en public/img).',
            validation: { isRequired: true },
          }),
          alt: fields.text({ label: 'Alt', validation: { isRequired: true } }),
        },
        { label: 'Imagen' },
      ),
      { label: 'Galería', itemLabel: (props) => props.fields.alt.value || 'Imagen' },
    ),
  },
};
