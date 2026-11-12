// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import fs from 'node:fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { loadEnv } from 'vite';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Selector de target de build (ver README):
//   DEPLOY_TARGET=static (default) → GitHub Pages: sitio estático puro, SIN adapter
//                                    y SIN Keystatic. Respeta PUBLIC_BASE_PATH.
//   DEPLOY_TARGET=node             → Hostinger (Node.js): adapter @astrojs/node
//                                    standalone + Keystatic (storage cloud). base '/'.
//                                    Las páginas públicas siguen prerenderizadas;
//                                    solo /keystatic y /api/keystatic son on-demand.
//   `astro dev` con ASTRO_ENABLE_KEYSTATIC=true → Keystatic local en desarrollo.
const VALID_TARGETS = ['static', 'node'];

// Astro NO admite defineConfig como función: se exporta un objeto (top-level await).
// .env no se carga solo en astro.config.mjs: process.env (CI / panel de Hostinger)
// tiene prioridad y .env es el fallback local.
const fileEnv = loadEnv(process.env.NODE_ENV ?? 'production', process.cwd(), '');
const env = (/** @type {string} */ key) => process.env[key] ?? fileEnv[key];

const target = env('DEPLOY_TARGET') ?? 'static';
if (!VALID_TARGETS.includes(target)) {
  throw new Error(`DEPLOY_TARGET inválido: "${target}". Usa "static" o "node".`);
}
const isNode = target === 'node';
// Locales con prefijo (el default 'es' no lo tiene): ver integración abajo.
const i18nLocales = ['en'];
const isDev = process.argv.includes('dev');

// Keystatic: siempre en el target node; en dev solo si se pide; nunca en static.
const enableKeystatic = isNode || (isDev && env('ASTRO_ENABLE_KEYSTATIC') === 'true');

// Dominio canónico (sitemap, canonicals, OG). Override con PUBLIC_SITE_URL.
const site = env('PUBLIC_SITE_URL') ?? 'https://valdiviabikefest.cl';
// GitHub Pages sirve bajo un subpath (PUBLIC_BASE_PATH=/valdivia-bikefest-demo).
// Hostinger (node) sirve en la raíz del dominio/subdominio.
const base = isNode ? '/' : (env('PUBLIC_BASE_PATH') ?? '/');

export default defineConfig({
  site,
  base,
  // Siempre 'static': todas las páginas públicas se prerenderizan. Con el
  // adapter node, solo las rutas inyectadas por Keystatic son on-demand.
  output: 'static',
  adapter: isNode
    ? (await import('@astrojs/node')).default({ mode: 'standalone' })
    : undefined,
  // CSS: 'auto' deja una única hoja externa con hash (/_astro/*.css, 1 año de
  // caché inmutable) en vez de repetir ~57 kB inline en cada HTML.
  // format: con trailingSlash 'never' los canonicals son /ruta (sin barra).
  //  - static (GitHub Pages): 'file' emite ruta.html; Pages lo sirve en /ruta con
  //    200 directo (con 'directory' respondía 301 a /ruta/).
  //  - node: el handler estático de @astrojs/node NO resuelve ruta.html (500
  //    FailedToFindPageMapSSR); 'directory' (ruta/index.html) sí y, con
  //    trailingSlash 'never', sirve /ruta con 200 y redirige /ruta/ → /ruta.
  build: { inlineStylesheets: 'auto', format: isNode ? 'directory' : 'file' },
  // Prefetch entre páginas: al pasar el cursor / tocar el enlace (hover) se
  // precarga el HTML destino; respeta base y Save-Data.
  prefetch: { prefetchAll: true, defaultStrategy: 'hover' },
  trailingSlash: 'never',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    // 'manual': las URLs ya siguen el esquema "es sin prefijo, /en" porque las
    // páginas viven en src/pages y src/pages/en (todas prerenderizadas). Con
    // `{ prefixDefaultLocale: false }`, el middleware i18n de Astro 7 responde
    // 404 a cualquier ruta on-demand que tenga un segmento "es" en cualquier
    // posición, lo que rompía /keystatic/collection/<col>/item/es.
    routing: 'manual',
  },
  integrations: [
    mdx(),
    // format 'file' + carpeta en/: genera en.html y en/ruta.html, pero GitHub
    // Pages podría resolver /en como directorio (301 → /en/ → 404). Se copia
    // en.html → en/index.html para que /en y /en/ sirvan siempre contenido.
    // Astro conserva en dist/_astro el ORIGINAL de cada imagen importada (aunque
    // solo se sirvan las variantes optimizadas de getImage). Se borran los
    // originales que ningún HTML/CSS/JS referencia, para no publicar fotos de
    // varios MB sin usar.
    {
      name: 'vbk-prune-unreferenced-originals',
      hooks: {
        'astro:build:done': async ({ dir }) => {
          const root = fileURLToPath(dir);
          const assetsDir = path.join(root, '_astro');
          if (!fs.existsSync(assetsDir)) return;
          const textExt = /\.(html|css|js|mjs|json|xml|txt|webmanifest|svg)$/i;
          let haystack = '';
          const walk = (d) => {
            for (const entry of fs.readdirSync(d, { withFileTypes: true })) {
              const full = path.join(d, entry.name);
              if (entry.isDirectory()) walk(full);
              else if (textExt.test(entry.name)) haystack += fs.readFileSync(full, 'utf8');
            }
          };
          walk(root);
          for (const name of fs.readdirSync(assetsDir)) {
            if (/\.(avif|webp|jpe?g|png)$/i.test(name) && !haystack.includes(name)) {
              fs.rmSync(path.join(assetsDir, name));
            }
          }
        },
      },
    },
    ...(isNode
      ? []
      : [
          {
            name: 'vbk-locale-index-fallback',
            hooks: {
              'astro:build:done': async ({ dir }) => {
                const root = fileURLToPath(dir);
                for (const locale of i18nLocales) {
                  const file = path.join(root, `${locale}.html`);
                  if (fs.existsSync(file)) {
                    fs.mkdirSync(path.join(root, locale), { recursive: true });
                    fs.copyFileSync(file, path.join(root, locale, 'index.html'));
                  }
                }
              },
            },
          },
        ]),
    sitemap({
      // trailingSlash 'never': la raíz sale como '<base>/' y no coincide con el
      // canonical ('<base>'). Se normaliza para que sitemap y canonicals coincidan.
      serialize: (item) => ({ ...item, url: item.url.replace(/\/$/, '') }),
      filter: (page) =>
        !['/thank-you', '/404', '/500', '/legal', '/privacy', '/cookies', '/keystatic']
          .some((p) => page.includes(p)),
    }),
    ...(enableKeystatic
      ? [
          // Keystatic exige la integración de React para su UI de admin.
          (await import('@astrojs/react')).default(),
          (await import('@keystatic/astro')).default(),
        ]
      : []),
  ],
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: { '@': path.resolve(__dirname, './src') },
    },
  },
});
