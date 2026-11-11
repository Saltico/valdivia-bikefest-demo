// cms/pagesResultadosKeystatic.ts
// Schema Keystatic de la colección `pagesResultados` (página /resultados) —
// patrón dual-file. Una entrada por idioma (es.json / en.json).
// Incluye las filas del tablero (datos de prueba hasta que exista la fuente
// oficial de cronometraje — warning del site-spec).

import { fields } from '@keystatic/core';
import { localeField } from './utils/localeField';

export const basePath = 'src/content/pages/resultados';

/** Slugs de categoría del tablero — usados por los chips y por cada fila. */
export const categorySlugs = [
  'elite-m',
  'elite-f',
  'sub23-m',
  'sub23-f',
  'junior-m',
  'junior-f',
  'master-a',
  'master-b',
  'master-c',
  'master-d',
  'open',
] as const;

const categorySlugOptions = categorySlugs.map((slug) => ({ label: slug, value: slug }));

export const keystaticPagesResultadosConfig = {
  label: 'Resultados',
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
    demoBadge: fields.text({ label: 'Badge del aviso (datos de prueba)', validation: { isRequired: true } }),
    demoNote: fields.text({ label: 'Nota del aviso', multiline: true, validation: { isRequired: true } }),
    boardHeadLeft: fields.text({ label: 'Cabecera del tablero — izquierda', validation: { isRequired: true } }),
    boardHeadRight: fields.text({ label: 'Cabecera del tablero — derecha', validation: { isRequired: true } }),
    tabsLabel: fields.text({ label: 'Etiqueta aria de los tabs', validation: { isRequired: true } }),
    chipsLabel: fields.text({ label: 'Etiqueta aria de los chips', validation: { isRequired: true } }),
    chipAll: fields.text({ label: 'Chip — Todas', validation: { isRequired: true } }),
    categories: fields.array(
      fields.object(
        {
          slug: fields.select({
            label: 'Slug',
            description: 'Identifica la categoría en el filtro y en las filas del tablero.',
            options: categorySlugOptions,
            defaultValue: 'elite-m',
          }),
          label: fields.text({ label: 'Etiqueta visible', validation: { isRequired: true } }),
        },
        { label: 'Categoría' },
      ),
      { label: 'Categorías (chips)', itemLabel: (props) => props.fields.label.value || 'Categoría' },
    ),
    columns: fields.array(fields.text({ label: 'Columna', validation: { isRequired: true } }), {
      label: 'Columnas de la tabla',
      itemLabel: (props) => props.value || 'Columna',
    }),
    boardFoot: fields.array(fields.text({ label: 'Ítem', validation: { isRequired: true } }), {
      label: 'Pie del tablero',
      itemLabel: (props) => props.value || 'Ítem',
    }),
    xcoRows: fields.array(
      fields.object(
        {
          pos: fields.integer({ label: 'Posición', validation: { isRequired: true, min: 1 } }),
          dorsal: fields.integer({ label: 'Dorsal', validation: { isRequired: true, min: 1 } }),
          name: fields.text({ label: 'Corredor/a', validation: { isRequired: true } }),
          club: fields.text({ label: 'Club', validation: { isRequired: true } }),
          cat: fields.select({
            label: 'Categoría (slug)',
            options: categorySlugOptions,
            defaultValue: 'elite-m',
          }),
          catLabel: fields.text({ label: 'Categoría (etiqueta)', validation: { isRequired: true } }),
          time: fields.text({ label: 'Tiempo', validation: { isRequired: true } }),
          dif: fields.text({ label: 'Diferencia', validation: { isRequired: true } }),
        },
        { label: 'Fila XCO' },
      ),
      { label: 'Filas XCO', itemLabel: (props) => props.fields.name.value || 'Corredor/a' },
    ),
    xccRows: fields.array(
      fields.object(
        {
          pos: fields.integer({ label: 'Posición', validation: { isRequired: true, min: 1 } }),
          dorsal: fields.integer({ label: 'Dorsal', validation: { isRequired: true, min: 1 } }),
          name: fields.text({ label: 'Corredor/a', validation: { isRequired: true } }),
          club: fields.text({ label: 'Club', validation: { isRequired: true } }),
          cat: fields.select({
            label: 'Categoría (slug)',
            options: categorySlugOptions,
            defaultValue: 'elite-m',
          }),
          catLabel: fields.text({ label: 'Categoría (etiqueta)', validation: { isRequired: true } }),
          time: fields.text({ label: 'Tiempo', validation: { isRequired: true } }),
          dif: fields.text({ label: 'Diferencia', validation: { isRequired: true } }),
        },
        { label: 'Fila XCC' },
      ),
      { label: 'Filas XCC', itemLabel: (props) => props.fields.name.value || 'Corredor/a' },
    ),
  },
};
