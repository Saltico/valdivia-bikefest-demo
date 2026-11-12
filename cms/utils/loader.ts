// cms/utils/loader.ts
// Helper de glob loader (astro/loaders) reutilizado por todas las colecciones
// locales de Keystatic. Patrón del skill keystatic-astro: cada colección Astro
// declara un `loader`; para contenido en disco se usa glob() vía este helper.
// El patrón excluye archivos con prefijo `_` (parciales/borradores).
//
// `locale` desde el nombre del archivo: las colecciones de páginas usan
// `locale` como slugField de Keystatic, y Keystatic guarda el slug SOLO en el
// nombre del archivo (es.json / en.json), quitándolo del JSON al guardar. Los
// schemas Astro exigen `locale`, así que aquí se inyecta a partir del id de la
// entrada (el nombre del archivo) cuando el JSON no lo trae. Sin esto, cualquier
// guardado desde el panel rompía el build (InvalidContentEntryDataError).

import { glob } from 'astro/loaders';
import type { Loader } from 'astro/loaders';

export const loader = (contentBase: string, format: 'mdx' | 'json' | 'yaml'): Loader => {
  const base = contentBase.startsWith('/') ? `.${contentBase}` : contentBase;
  const inner = glob({ base, pattern: `**/[^_]*.${format}` });
  return {
    ...inner,
    name: 'vbk-locale-glob-loader',
    load: (context) =>
      inner.load({
        ...context,
        parseData: (props) =>
          context.parseData({
            ...props,
            data: { locale: props.id, ...props.data },
          }),
      }),
  };
};
