// cms/utils/loader.ts
// Helper de glob loader (astro/loaders) reutilizado por todas las colecciones
// locales de Keystatic. Patrón del skill keystatic-astro: cada colección Astro
// declara un `loader`; para contenido en disco se usa glob() vía este helper.
// El patrón excluye archivos con prefijo `_` (parciales/borradores).

import { glob } from 'astro/loaders';

export const loader = (contentBase: string, format: 'mdx' | 'json' | 'yaml') => {
  const base = contentBase.startsWith('/') ? `.${contentBase}` : contentBase;
  return glob({ base, pattern: `**/[^_]*.${format}` });
};
