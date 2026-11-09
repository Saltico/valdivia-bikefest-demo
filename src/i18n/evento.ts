// src/i18n/evento.ts
// Copy de /evento en ES/EN. Fuente: evento.html + pageCopy.evento de script.js.

import type { Locale } from './config';

export interface EventoCopy {
  meta: { title: string; description: string };
  hero: {
    kicker: string;
    headingHtml: string;
    intro: string;
    bgAlt: string;
  };
  organizers: Array<{ role: string; name: string; detail: string }>;
  queEs: {
    kicker: string;
    headingHtml: string;
    leadHtml: string;
    items: Array<{ n: string; title: string; text: string }>;
  };
  proposito: {
    kicker: string;
    headingHtml: string;
    items: Array<{ title: string; text: string }>;
  };
  internacional: {
    kicker: string;
    headingHtml: string;
    leadHtml: string;
    linkLabel: string;
    dataItems: Array<{ label: string; value: string }>;
  };
  comunidad: {
    kicker: string;
    headingHtml: string;
    copy: string;
    features: Array<{ title: string; text: string }>;
  };
}

const es: EventoCopy = {
  meta: {
    title: 'El evento | Valdivia Bike Fest',
    description:
      'Conoce Valdivia Bike Fest: una competencia internacional de mountain bike UCI en Valdivia, Chile. Identidad, propósito, comunidad y la historia de un evento que crece cada año.',
  },
  hero: {
    kicker: 'Valdivia Bike Fest / El evento',
    headingHtml: 'La carrera<br>empieza <em>antes</em>',
    intro: 'Más que una competencia: un punto de encuentro entre el mountain bike continental y la comunidad ciclista del sur de Chile.',
    bgAlt: 'Paisaje natural del sur de Chile, bosques y ríos de Valdivia',
  },
  organizers: [
    { role: 'Organiza', name: 'MVK Sports', detail: 'Club Ciclismo Ríos Cruces, Valdivia' },
    { role: 'Fiscaliza', name: 'Fedenacich', detail: 'Federación de Ciclismo de Chile' },
    { role: 'Respaldo internacional', name: 'COPACI', detail: 'Confederación Panamericana de Ciclismo' },
  ],
  queEs: {
    kicker: '¿Qué es?',
    headingHtml: 'Un evento<br><em>internacional</em> de mountain bike',
    leadHtml:
      'Valdivia Bike Fest es una competencia internacional de mountain bike que se realiza en Valdivia, Región de Los Ríos, Chile. Organizada como fecha del <strong>American Continental Series MTB</strong>, el evento reúne a referentes del cross-country continental y ofrece una experiencia competitiva de alto nivel en uno de los entornos naturales más distintivos del sur de Chile.',
    items: [
      { n: '01', title: 'Calendario UCI', text: 'Fecha del American Continental Series MTB con puntaje para el ranking mundial.' },
      { n: '02', title: 'Dos formatos', text: 'Cross-Country Olímpico (XCO) y Short Track (XCC) en una misma sede.' },
      { n: '03', title: 'Seleccionadores nacionales', text: 'Primera fecha selectiva para la Selección Nacional de Chile.' },
    ],
  },
  proposito: {
    kicker: 'Propósito',
    headingHtml: 'Por qué<br><em>existe</em> este evento',
    items: [
      {
        title: 'Desarrollar el mountain bike en Chile',
        text: 'Generar competencias de nivel internacional que posicionen al país en el calendario continental y ofrezcan a los atletas chilenos la oportunidad de sumar puntos UCI sin salir de su territorio.',
      },
      {
        title: 'Oportunidades para atletas de distintos niveles',
        text: 'Desde categorías Elite y Sub23 hasta Master, menores y promocional. El evento abre la puerta tanto a corredores consagrados como a quienes recién comienzan su camino competitivo.',
      },
      {
        title: 'Competencia y comunidad en un mismo lugar',
        text: 'Combinar el alto rendimiento con un ambiente familiar e inclusivo, donde cada participante —sin importar su nivel— es parte fundamental del evento.',
      },
      {
        title: 'Posicionar a Valdivia como destino deportivo',
        text: 'Que los riders internacionales conozcan el sur de Chile: sus bosques, sus ríos y la cultura de una ciudad que se vive mejor sin apuro.',
      },
    ],
  },
  internacional: {
    kicker: 'Carácter internacional',
    headingHtml: 'Del continente<br><em>para el mundo</em>',
    leadHtml:
      'Valdivia Bike Fest forma parte del calendario <strong>American Continental Series MTB</strong>, lo que significa que cada edición atrae a referentes del cross-country sudamericano y panamericano, incluyendo campeones continentales, medallistas olímpicos y equipos nacionales de todo el continente.',
    linkLabel: 'Explora la ruta y el horario',
    dataItems: [
      { label: 'Calendario', value: 'American Continental Series MTB' },
      { label: 'Puntaje', value: 'Ranking mundial UCI' },
      { label: 'Selectivo', value: '1ª fecha Selección Nacional Chile' },
      { label: 'Fiscaliza', value: 'Fedenacich + COPACI' },
    ],
  },
  comunidad: {
    kicker: 'Comunidad',
    headingHtml: 'Un evento<br><em>para todos</em>',
    copy: 'Valdivia Bike Fest no es solo para atletas de élite. Es un evento familiar e inclusivo donde la comunidad de riders, familias y seguidores del mountain bike se encuentra en torno a la competencia y la naturaleza.',
    features: [
      {
        title: 'Categorías abiertas',
        text: 'Short Track Open y Promocional para quienes quieren vivir la experiencia de competencia sin necesidad de licencia UCI.',
      },
      {
        title: 'Menores y cadetes',
        text: 'Categorías desde pre-juvenil hasta juvenil, para que las nuevas generaciones crezcan en el deporte.',
      },
      {
        title: 'Master A, B, C y D',
        text: 'Desde los 30 hasta los 60 y más. La competencia no tiene límite de edad.',
      },
    ],
  },
};

const en: EventoCopy = {
  meta: {
    title: 'The Event | Valdivia Bike Fest - international UCI MTB race',
    description:
      'Learn about Valdivia Bike Fest: an international UCI mountain bike race in Valdivia, Chile. Identity, purpose, community, and a story that grows every year.',
  },
  hero: {
    kicker: 'Valdivia Bike Fest / The event',
    headingHtml: 'The race<br>starts <em>earlier</em>',
    intro: 'More than a competition: a meeting point between continental mountain biking and the cycling community of southern Chile.',
    bgAlt: 'Natural landscape of southern Chile, forests and rivers of Valdivia',
  },
  organizers: [
    { role: 'Organizer', name: 'MVK Sports', detail: 'Club Ciclismo Ríos Cruces, Valdivia' },
    { role: 'Overseen by', name: 'Fedenacich', detail: 'Cycling Federation of Chile' },
    { role: 'International backing', name: 'COPACI', detail: 'Pan American Cycling Confederation' },
  ],
  queEs: {
    kicker: 'What is it?',
    headingHtml: 'An <em>international</em><br>mountain bike event',
    leadHtml:
      'Valdivia Bike Fest is an international mountain bike competition held in Valdivia, Los Ríos Region, Chile. Organized as a round of the <strong>American Continental Series MTB</strong>, the event brings together top cross-country riders from the continent and offers a world-class competitive experience in one of the most distinctive natural settings in southern Chile.',
    items: [
      { n: '01', title: 'UCI Calendar', text: 'A round of the American Continental Series MTB with points toward the world ranking.' },
      { n: '02', title: 'Two formats', text: 'Cross-Country Olympic (XCO) and Short Track (XCC) at a single venue.' },
      { n: '03', title: 'National selection', text: 'First selection round for the Chilean National Team.' },
    ],
  },
  proposito: {
    kicker: 'Purpose',
    headingHtml: 'Why this<br>event <em>exists</em>',
    items: [
      {
        title: 'Develop mountain biking in Chile',
        text: 'Create international-level competitions that place the country on the continental calendar and give Chilean athletes the chance to earn UCI points without leaving home.',
      },
      {
        title: 'Opportunities for riders of all levels',
        text: 'From Elite and Sub23 categories to Master, youth, and promotional. The event opens the door to established riders and those just starting their competitive journey.',
      },
      {
        title: 'Competition and community in one place',
        text: 'Combining high performance with a family-friendly, inclusive atmosphere where every participant — regardless of level — is a key part of the event.',
      },
      {
        title: 'Position Valdivia as a sports destination',
        text: 'Let international riders discover southern Chile: its forests, rivers, and the culture of a city best explored without rushing.',
      },
    ],
  },
  internacional: {
    kicker: 'International character',
    headingHtml: 'From the continent<br><em>to the world</em>',
    leadHtml:
      'Valdivia Bike Fest is part of the <strong>American Continental Series MTB</strong> calendar, which means each edition attracts top cross-country riders from South America and across the Pan-American region, including continental champions, Olympic medalists, and national teams from across the continent.',
    linkLabel: 'Explore the route and schedule',
    dataItems: [
      { label: 'Calendar', value: 'American Continental Series MTB' },
      { label: 'Points', value: 'UCI World Ranking' },
      { label: 'Selection', value: '1st round Chile National Team' },
      { label: 'Overseen by', value: 'Fedenacich + COPACI' },
    ],
  },
  comunidad: {
    kicker: 'Community',
    headingHtml: 'An event<br><em>for everyone</em>',
    copy: 'Valdivia Bike Fest is not just for elite athletes. It is a family-friendly, inclusive event where the community of riders, families, and mountain bike fans comes together around competition and nature.',
    features: [
      {
        title: 'Open categories',
        text: 'Short Track Open and Promotional for those who want the race experience without a UCI license.',
      },
      {
        title: 'Youth and cadets',
        text: 'Categories from pre-youth to youth, so the next generation can grow in the sport.',
      },
      {
        title: 'Master A, B, C and D',
        text: 'From 30 to 60 and beyond. Competition has no age limit.',
      },
    ],
  },
};

export const eventoCopy: Record<Locale, EventoCopy> = { es, en };
