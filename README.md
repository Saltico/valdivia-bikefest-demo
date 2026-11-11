# Valdivia Bike Fest

Sitio web de Valdivia Bike Fest (Astro 5 + Tailwind v4 + Keystatic CMS). Español por defecto, inglés bajo `/en`.
El sitio público es **siempre estático (prerenderizado)**; solo el panel `/keystatic` y `/api/keystatic` se sirven bajo demanda en el target Node.

## Targets de build

| Target | Comando | Salida | Uso |
| --- | --- | --- | --- |
| `static` (default) | `npm run build` | `dist/` (HTML estático) | GitHub Pages: vista pública **sin admin**. Sin adapter, sin Keystatic. Respeta `PUBLIC_BASE_PATH`. |
| `node` | `npm run build:node` | `dist/client` + `dist/server` | Hostinger (app Node.js): sitio prerenderizado + admin Keystatic Cloud. `base` = `/`. |

El selector vive en `astro.config.mjs` (`DEPLOY_TARGET=static|node`).

## Desarrollo local

Requiere Node `>=22.12`.

```bash
npm install
cp .env.example .env
npm run dev          # sitio en http://localhost:4321 (sin admin)
npm run keystatic    # sitio + admin local en http://localhost:4321/keystatic
```

En local, Keystatic usa storage `local`: edita directamente `src/content/**` y los cambios los versionas con Git.

## Cómo funciona Keystatic Cloud

- En el target `node` el CMS usa `storage: { kind: 'cloud' }`. El cliente entra a `<sitio>/keystatic` e inicia sesión **con su email** (login de Keystatic Cloud; no hay usuarios en el servidor).
- Cada guardado en el admin es un **commit al repositorio GitHub** `Saltico/valdivia-bikefest-demo` (el repo vinculado al proyecto en keystatic.cloud).
- Ese commit **no actualiza el sitio por sí solo**: hay que **redesplegar / reconstruir** en Hostinger (`npm run build:node` y reiniciar), porque el contenido se incrusta como HTML estático en build time.
- GitHub Pages sigue publicando la vista estática con cada push a `main` (workflow `.github/workflows/deploy.yml`).
- Contenido editable: una colección por página (Inicio, El evento, Ruta, Resultados, Valdivia, Contacto), textos compartidos (header/footer/CTA) y ajustes (URL de inscripción, fecha de la cuenta regresiva), con una entrada `es` y otra `en` cada una.

### Configuración inicial (una sola vez, manual)

1. Crear cuenta/team en <https://keystatic.cloud> y un proyecto nuevo.
2. Vincular el repo GitHub `Saltico/valdivia-bikefest-demo` al proyecto.
3. Invitar al cliente por email desde el team.
4. El identificador del proyecto es `valdivia-bike-fest/valdivia-bikefest` (default en `keystatic.config.ts`; se puede sobreescribir con `PUBLIC_KEYSTATIC_CLOUD_PROJECT` en Hostinger, antes de construir).

## Variables de entorno

Ver `.env.example` (comentado). Resumen:

| Variable | Cuándo | Descripción |
| --- | --- | --- |
| `DEPLOY_TARGET` | build | `static` (default) o `node`. Ya fijado por los scripts. |
| `PUBLIC_SITE_URL` | build | URL canónica. Producción: `https://valdiviabikefest.cl`. |
| `PUBLIC_BASE_PATH` | build static | Subruta de GitHub Pages (`/valdivia-bikefest-demo`). Ignorada en `node`. |
| `PUBLIC_KEYSTATIC_CLOUD_PROJECT` | build node | `<team>/<project>` de Keystatic Cloud (default: `valdivia-bike-fest/valdivia-bikefest`). Se incrusta en build time. |
| `PUBLIC_KEYSTATIC_STORAGE` | build | Opcional: fuerza `local` o `cloud`. Por defecto `local` en dev y `cloud` en build. |
| `ASTRO_ENABLE_KEYSTATIC` | dev | `true` habilita el admin local en `astro dev`. |
| `PUBLIC_GTM_ID`, `PUBLIC_GA4_ID` | build | Analítica (vacío = omitida). GTM tiene prioridad: GA4 directo solo si hay `PUBLIC_GA4_ID` y NO hay `PUBLIC_GTM_ID`. Con cualquiera se activa el banner de consentimiento (Consent Mode v2: 4 señales `denied` por defecto; aceptar concede solo `analytics_storage`) y el botón «Preferencias de cookies» del footer (`[data-consent-open]`). Textos editables en Keystatic → Textos compartidos → Banner de cookies. |
| `PUBLIC_CONTACT_EMAIL`, `PUBLIC_CONTACT_PHONE`, `PUBLIC_CONTACT_ADDRESS`, `PUBLIC_MAPS_EMBED_URL`, `PUBLIC_SOCIAL_INSTAGRAM`, `PUBLIC_SOCIAL_INSTAGRAM_HANDLE`, `PUBLIC_FORM_ACTION` | build | Contacto y formulario. |
| `HOST`, `PORT` | runtime node | Opcionales; el servidor standalone los lee al iniciar. |

Las variables `PUBLIC_*` se incrustan al construir: cambiarlas exige un nuevo build. No hay secretos en este proyecto (Keystatic Cloud autentica en el navegador).

## Despliegue en Hostinger (app Node.js)

1. Crear la aplicación Node.js (Business/Cloud) y conectar el repo GitHub (o subir el código).
2. **Versión de Node: `>=22.12`** (22 LTS recomendado).
3. Variables de entorno en el panel: `PUBLIC_SITE_URL`, `PUBLIC_KEYSTATIC_CLOUD_PROJECT`, `PUBLIC_GTM_ID`/`PUBLIC_GA4_ID`, contacto, etc.
4. **Comando de instalación**: `npm install` (o `npm ci`).
5. **Comando de build**: `npm run build:node`
6. **Comando de inicio**: `npm start` (equivale a `node ./dist/server/entry.mjs`). El servidor lee `HOST`/`PORT` que provee Hostinger.
7. Tras cada edición del CMS (commit al repo) hay que **volver a desplegar/reconstruir** en Hostinger para que el sitio público refleje el cambio.

## Estructura relevante

```
astro.config.mjs        # selector DEPLOY_TARGET (static | node)
keystatic.config.ts     # storage local/cloud, navegación, colecciones
cms/*Keystatic.ts       # schema Keystatic por colección (patrón dual-file)
cms/*Astro.ts           # schema Zod + loader por colección
src/content.config.ts   # registro de colecciones Astro
src/content/            # contenido JSON editable (pages/*, common, settings)
```

Tras cambiar schemas: `npx astro sync`.

## Verificación rápida

```bash
npm run build        # estático; no debe existir dist/**/keystatic*
npm run build:node   # dist/server/entry.mjs + páginas prerenderizadas en dist/client
npm start            # / → 200, /keystatic → 200
```

## Licencia

MIT
