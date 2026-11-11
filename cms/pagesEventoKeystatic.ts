// cms/pagesEventoKeystatic.ts
// Schema Keystatic de la colección `pagesEvento` (página /evento) — patrón
// dual-file. Una entrada por idioma (es.json / en.json).

import { fields } from '@keystatic/core';
import { localeField } from './utils/localeField';

export const basePath = 'src/content/pages/evento';

export const keystaticPagesEventoConfig = {
  label: 'El evento',
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
        bgAlt: fields.text({
          label: 'Alt de la foto de fondo',
          description: 'Texto alternativo (accesibilidad) de la imagen del hero.',
          validation: { isRequired: true },
        }),
      },
      { label: 'Hero' },
    ),
    organizers: fields.array(
      fields.object(
        {
          role: fields.text({ label: 'Rol', validation: { isRequired: true } }),
          name: fields.text({ label: 'Nombre', validation: { isRequired: true } }),
          detail: fields.text({ label: 'Detalle', validation: { isRequired: true } }),
        },
        { label: 'Organizador' },
      ),
      { label: 'Franja de organizadores', itemLabel: (props) => props.fields.name.value || 'Organizador' },
    ),
    queEs: fields.object(
      {
        kicker: fields.text({ label: 'Kicker', validation: { isRequired: true } }),
        headingHtml: fields.text({
          label: 'Encabezado (HTML)',
          description: 'Admite <br> y <em>.',
          validation: { isRequired: true },
        }),
        leadHtml: fields.text({
          label: 'Lead (HTML)',
          description: 'Admite <strong>.',
          multiline: true,
          validation: { isRequired: true },
        }),
        items: fields.array(
          fields.object(
            {
              n: fields.text({ label: 'Número', validation: { isRequired: true } }),
              title: fields.text({ label: 'Título', validation: { isRequired: true } }),
              text: fields.text({ label: 'Texto', validation: { isRequired: true } }),
            },
            { label: 'Item' },
          ),
          { label: 'Detalle', itemLabel: (props) => props.fields.title.value || 'Item' },
        ),
      },
      { label: 'Sección — ¿Qué es?' },
    ),
    proposito: fields.object(
      {
        kicker: fields.text({ label: 'Kicker', validation: { isRequired: true } }),
        headingHtml: fields.text({
          label: 'Encabezado (HTML)',
          description: 'Admite <br> y <em>.',
          validation: { isRequired: true },
        }),
        items: fields.array(
          fields.object(
            {
              title: fields.text({ label: 'Título', validation: { isRequired: true } }),
              text: fields.text({ label: 'Texto', multiline: true, validation: { isRequired: true } }),
            },
            { label: 'Item' },
          ),
          { label: 'Motivos', itemLabel: (props) => props.fields.title.value || 'Item' },
        ),
      },
      { label: 'Sección — Propósito' },
    ),
    internacional: fields.object(
      {
        kicker: fields.text({ label: 'Kicker', validation: { isRequired: true } }),
        headingHtml: fields.text({
          label: 'Encabezado (HTML)',
          description: 'Admite <br> y <em>.',
          validation: { isRequired: true },
        }),
        leadHtml: fields.text({
          label: 'Lead (HTML)',
          description: 'Admite <strong>.',
          multiline: true,
          validation: { isRequired: true },
        }),
        linkLabel: fields.text({ label: 'Etiqueta del link a /ruta', validation: { isRequired: true } }),
        dataItems: fields.array(
          fields.object(
            {
              label: fields.text({ label: 'Etiqueta', validation: { isRequired: true } }),
              value: fields.text({ label: 'Valor', validation: { isRequired: true } }),
            },
            { label: 'Dato' },
          ),
          { label: 'Datos clave', itemLabel: (props) => props.fields.label.value || 'Dato' },
        ),
      },
      { label: 'Sección — Carácter internacional' },
    ),
    comunidad: fields.object(
      {
        kicker: fields.text({ label: 'Kicker', validation: { isRequired: true } }),
        headingHtml: fields.text({
          label: 'Encabezado (HTML)',
          description: 'Admite <br> y <em>.',
          validation: { isRequired: true },
        }),
        copy: fields.text({ label: 'Copy', multiline: true, validation: { isRequired: true } }),
        features: fields.array(
          fields.object(
            {
              title: fields.text({ label: 'Título', validation: { isRequired: true } }),
              text: fields.text({ label: 'Texto', multiline: true, validation: { isRequired: true } }),
            },
            { label: 'Feature' },
          ),
          { label: 'Features', itemLabel: (props) => props.fields.title.value || 'Feature' },
        ),
      },
      { label: 'Sección — Comunidad' },
    ),
  },
};
