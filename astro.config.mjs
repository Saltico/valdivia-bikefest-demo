// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import mdx from '@astrojs/mdx';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Canonical production domain — override per project via PUBLIC_SITE_URL
const SITE_URL = process.env.PUBLIC_SITE_URL ?? 'https://valdiviabikefest.cl';

// Base path — override for GitHub Pages via PUBLIC_BASE_PATH (e.g. '/valdivia-bikefest-demo')
const BASE_PATH = process.env.PUBLIC_BASE_PATH ?? '/';

// Keystatic CMS — enabled via env var (dev mode only)
const enableKeystatic = process.env.ASTRO_ENABLE_KEYSTATIC === 'true';

export default defineConfig({
  site: SITE_URL,
  base: BASE_PATH,
  output: 'static',
  trailingSlash: 'never',
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: { prefixDefaultLocale: false },
  },
  integrations: [
    mdx(),
    sitemap({
      filter: (page) =>
        !['/thank-you', '/404', '/500', '/legal', '/privacy', '/cookies', '/keystatic']
          .some((p) => page.includes(p)),
    }),
    // Keystatic integration — only when ASTRO_ENABLE_KEYSTATIC=true
    ...(enableKeystatic
      ? [
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
