// src/i18n/valdivia.ts
// Copy de /valdivia en ES/EN. Fuente: valdivia.html + pageCopy.valdivia.
// Bug fix del original: los atributos rel="noopener"" malformados (comilla
// duplicada) en los botones de destinos se corrigen aquí al migrar.

import type { Locale } from './config';

export interface Destination {
  id: string;
  navLabel: string;
  navIcon: 'forest' | 'volcano' | 'waves' | 'beer' | 'fortress';
  kicker: string;
  titleHtml: string;
  description: string;
  bgAlt: string;
  image: string;
  infoLabel: string;
  infoHref: string;
  mapLabel: string;
  mapHref: string;
}

export interface ValdiviaCopy {
  meta: { title: string; description: string };
  hero: {
    kicker: string;
    headingHtml: string;
    hiddenH1: string;
  };
  navLabel: string;
  destinations: Destination[];
  // Etiquetas de acciones (compartidas por los 5 destinos)
  infoAction: string;
  mapAction: string;
}

const es: ValdiviaCopy = {
  meta: {
    title: 'Descubre Valdivia y sus alrededores | Valdivia Bike Fest',
    description:
      'Explora los paisajes, bosques, humedales, volcanes y patrimonio de Valdivia y la Región de Los Ríos antes o después de disfrutar el Valdivia Bike Fest.',
  },
  hero: {
    kicker: 'Valdivia Bike Fest / Valdivia',
    headingHtml: 'Corre en la<br><em>ciudad del agua</em>',
    hiddenH1: 'Descubre Valdivia y sus alrededores',
  },
  navLabel: 'Navegación de destinos',
  infoAction: 'Información oficial',
  mapAction: 'Ver en mapa',
  destinations: [
    {
      id: 'alerce-costero',
      navLabel: 'Parques naturales',
      navIcon: 'forest',
      kicker: '01 / 05 — Parque Nacional',
      titleHtml: 'Alerce Costero: <span class="destination-title-accent">bosques milenarios</span> junto al Pacífico',
      description:
        'Adéntrate en uno de los bosques templados más biodiversos del planeta. El Parque Nacional Alerce Costero alberga árboles milenarios, senderos entre arrayanes y coigües, y paisajes costeros únicos en la Región de Los Ríos.',
      bgAlt: 'Bosque milenario de alerces en el Parque Nacional Alerce Costero, con árboles centenarios cubiertos de musgo',
      image: '/img/valdivia_parque_nacional_alerce_costero.avif',
      infoLabel: 'Información oficial',
      infoHref: 'https://www.conaf.cl/regiones/los-rios/',
      mapLabel: 'Ver en mapa',
      mapHref: 'https://www.google.com/maps/search/?api=1&query=Parque+Nacional+Alerce+Costero+Chile',
    },
    {
      id: 'mocho-choshuenco',
      navLabel: 'Volcanes',
      navIcon: 'volcano',
      kicker: '02 / 05 — Volcán y Reserva',
      titleHtml: 'Mocho Choshuenco: montañas, <span class="destination-title-accent">nieve y aventura</span>',
      description:
        'Ascende hasta el cráter de este volcán activo y descubre una laguna turquesa en su cumbre. La Reserva Nacional Mocho Choshuenco ofrece trekking, deportes de invierno y vistas panorámicas de la cordillera y el océano Pacífico.',
      bgAlt: 'Volcán Mocho Choshuenco con su cumbre nevada y laguna en el cráter, rodeado de bosque nativo',
      image: '/img/valdivia_volcan_mocho_choshuenco.avif',
      infoLabel: 'Información oficial',
      infoHref: 'https://www.conaf.cl/parque_nacionales/reserva-nacional-mocho-choshuenco/',
      mapLabel: 'Ver en mapa',
      mapHref: 'https://www.google.com/maps/search/?api=1&query=Reserva+Nacional+Mocho+Choshuenco+Chile',
    },
    {
      id: 'punucapa',
      navLabel: 'Lagunas costeras',
      navIcon: 'waves',
      kicker: '03 / 05 — Humedal y Ríos',
      titleHtml: 'Punucapa: <span class="destination-title-accent">humedales</span>, ríos y naturaleza',
      description:
        'Navega por los humedales de Punucapa, un ecosistema único donde los ríos se encuentran con el bosque. Observa aves nativas, explora senderos entre vegetación acuática y descubre la biodiversidad de los humedales valdivianos.',
      bgAlt: 'Humedales de Punucapa con aguas tranquilas reflejando el cielo y la vegetación nativa',
      image: '/img/valdivia_humedal_punucapa.avif',
      infoLabel: 'Información oficial',
      infoHref: 'https://www.cehum.org/',
      mapLabel: 'Ver en mapa',
      mapHref: 'https://www.google.com/maps/search/?api=1&query=Punucapa+Valdivia+Chile',
    },
    {
      id: 'cervezas',
      navLabel: 'Cervezas artesanales',
      navIcon: 'beer',
      kicker: '04 / 05 — Gastronomía Local',
      titleHtml: 'La <span class="destination-title-accent">tradición cervecera</span> de Valdivia',
      description:
        'Valdivia es la cuna de la cerveza artesanal en Chile. Descubre la herencia cervecera alemana-valdiviana, visita cervecerías históricas como Kunstmann y Schopfloch, y degusta cervezas únicas elaboradas con ingredientes locales.',
      bgAlt: 'Cervecería artesanal valdiviana con barriles de madera y ambiente tradicional',
      image: '/img/valdivia_vida_nocturna.avif',
      infoLabel: 'Información oficial',
      infoHref: 'https://www.sernatur.cl/region/los-rios/',
      mapLabel: 'Ver en mapa',
      mapHref: 'https://www.google.com/maps/search/?api=1&query=Cerveceria+Kunstmann+Valdivia+Chile',
    },
    {
      id: 'fuerte-niebla',
      navLabel: 'Historia',
      navIcon: 'fortress',
      kicker: '05 / 05 — Patrimonio Histórico',
      titleHtml: 'Fuerte Niebla: <span class="destination-title-accent">historia</span> frente al mar',
      description:
        'Visita el Castillo de Niebla, una de las fortalezas coloniales españolas más importantes de Sudamérica. Explora sus murallas, museos y cañones mientras disfrutas de vistas panorámicas de la bahía de Valdivia y el río Calle-Calle.',
      bgAlt: 'Castillo de Niebla, fortaleza histórica española frente a la bahía de Valdivia',
      image: '/img/valdivia_fuerte_niebla.avif',
      infoLabel: 'Información oficial',
      infoHref: 'https://www.monumentos.gob.cl/monumentos/monumentos-historicos/castillo-de-niebla',
      mapLabel: 'Ver en mapa',
      mapHref: 'https://www.google.com/maps/search/?api=1&query=Castillo+de+Niebla+Valdivia+Chile',
    },
  ],
};

const en: ValdiviaCopy = {
  meta: {
    title: 'Discover Valdivia and its surroundings | Valdivia Bike Fest',
    description:
      'Explore the landscapes, forests, wetlands, volcanoes, and heritage of Valdivia and the Los Ríos Region before or after enjoying Valdivia Bike Fest.',
  },
  hero: {
    kicker: 'Valdivia Bike Fest / Valdivia',
    headingHtml: 'Race in the<br><em>city of water</em>',
    hiddenH1: 'Discover Valdivia and its surroundings',
  },
  navLabel: 'Destinations navigation',
  infoAction: 'Official information',
  mapAction: 'View on map',
  destinations: [
    {
      id: 'alerce-costero',
      navLabel: 'Forests',
      navIcon: 'forest',
      kicker: '01 / 05 — National Park',
      titleHtml: 'Alerce Costero: <span class="destination-title-accent">ancient forests</span> by the Pacific',
      description:
        'Enter one of the most biodiverse temperate forests on the planet. Alerce Costero National Park is home to millenary trees, trails among myrtles and coigües, and unique coastal landscapes in the Los Ríos Region.',
      bgAlt: 'Millenary alerce forest in Alerce Costero National Park, with centuries-old moss-covered trees',
      image: '/img/valdivia_parque_nacional_alerce_costero.avif',
      infoLabel: 'Official information',
      infoHref: 'https://www.conaf.cl/regiones/los-rios/',
      mapLabel: 'View on map',
      mapHref: 'https://www.google.com/maps/search/?api=1&query=Parque+Nacional+Alerce+Costero+Chile',
    },
    {
      id: 'mocho-choshuenco',
      navLabel: 'Volcano',
      navIcon: 'volcano',
      kicker: '02 / 05 — Volcano and Reserve',
      titleHtml: 'Mocho Choshuenco: mountains, <span class="destination-title-accent">snow and adventure</span>',
      description:
        'Climb to the crater of this active volcano and discover a turquoise lagoon at its summit. Mocho Choshuenco National Reserve offers trekking, winter sports, and panoramic views of the Andes and the Pacific Ocean.',
      bgAlt: 'Mocho Choshuenco volcano with its snow-capped summit and crater lagoon, surrounded by native forest',
      image: '/img/valdivia_volcan_mocho_choshuenco.avif',
      infoLabel: 'Official information',
      infoHref: 'https://www.conaf.cl/parque_nacionales/reserva-nacional-mocho-choshuenco/',
      mapLabel: 'View on map',
      mapHref: 'https://www.google.com/maps/search/?api=1&query=Reserva+Nacional+Mocho+Choshuenco+Chile',
    },
    {
      id: 'punucapa',
      navLabel: 'Wetlands',
      navIcon: 'waves',
      kicker: '03 / 05 — Wetlands and Rivers',
      titleHtml: 'Punucapa: <span class="destination-title-accent">wetlands</span>, rivers and nature',
      description:
        'Navigate the Punucapa wetlands, a unique ecosystem where rivers meet the forest. Observe native birds, explore trails among aquatic vegetation, and discover the biodiversity of Valdivian wetlands.',
      bgAlt: 'Punucapa wetlands with calm waters reflecting the sky and native vegetation',
      image: '/img/valdivia_humedal_punucapa.avif',
      infoLabel: 'Official information',
      infoHref: 'https://www.cehum.org/',
      mapLabel: 'View on map',
      mapHref: 'https://www.google.com/maps/search/?api=1&query=Punucapa+Valdivia+Chile',
    },
    {
      id: 'cervezas',
      navLabel: 'Breweries',
      navIcon: 'beer',
      kicker: '04 / 05 — Local Gastronomy',
      titleHtml: 'The <span class="destination-title-accent">brewing tradition</span> of Valdivia',
      description:
        'Valdivia is the birthplace of craft beer in Chile. Discover the German-Valdivian brewing heritage, visit historic breweries like Kunstmann and Schopfloch, and taste unique beers made with local ingredients.',
      bgAlt: 'Valdivian craft brewery with wooden barrels and a traditional atmosphere',
      image: '/img/valdivia_vida_nocturna.avif',
      infoLabel: 'Official information',
      infoHref: 'https://www.sernatur.cl/region/los-rios/',
      mapLabel: 'View on map',
      mapHref: 'https://www.google.com/maps/search/?api=1&query=Cerveceria+Kunstmann+Valdivia+Chile',
    },
    {
      id: 'fuerte-niebla',
      navLabel: 'History',
      navIcon: 'fortress',
      kicker: '05 / 05 — Historical Heritage',
      titleHtml: 'Fuerte Niebla: <span class="destination-title-accent">history</span> by the sea',
      description:
        'Visit the Castillo de Niebla, one of the most important Spanish colonial fortresses in South America. Explore its walls, museums, and cannons while enjoying panoramic views of Valdivia Bay and the Calle-Calle River.',
      bgAlt: 'Castillo de Niebla, a historic Spanish fortress overlooking Valdivia Bay',
      image: '/img/valdivia_fuerte_niebla.avif',
      infoLabel: 'Official information',
      infoHref: 'https://www.monumentos.gob.cl/monumentos/monumentos-historicos/castillo-de-niebla',
      mapLabel: 'View on map',
      mapHref: 'https://www.google.com/maps/search/?api=1&query=Castillo+de+Niebla+Valdivia+Chile',
    },
  ],
};

export const valdiviaCopy: Record<Locale, ValdiviaCopy> = { es, en };
