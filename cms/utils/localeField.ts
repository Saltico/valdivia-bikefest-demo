// cms/utils/localeField.ts
// Campo Keystatic `locale` (text con validación es|en) usado como slugField de
// las colecciones de páginas: el valor del campo define el nombre del archivo
// (es.json / en.json). Solo lo importan los archivos cms/*Keystatic.ts — los
// schemas Astro usan las constantes puras de cms/utils/locales.ts.

import { fields } from '@keystatic/core';

export const localeField = () =>
  fields.text({
    label: 'Idioma',
    description:
      'Código de idioma de esta entrada: "es" o "en". Define el nombre del archivo (es.json / en.json) y debe coincidir con el idioma del contenido.',
    validation: {
      isRequired: true,
      length: { min: 2, max: 2 },
      pattern: { regex: /^(es|en)$/, message: 'Escribe exactamente "es" o "en".' },
    },
  });
