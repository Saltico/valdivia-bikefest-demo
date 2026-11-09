// src/i18n/home.ts
// Copy de la home en ES/EN. Fuente: index.html + pageCopy.index de script.js.

import type { Locale } from './config';

export interface HomeRouteTab {
  id: 'xco' | 'xcc';
  index: string;
  label: string;
  sublabel: string;
  state: string;
  title: string;
  description: string;
  distance: string;
  elevation: string;
  time: string;
}

export interface HomeCopy {
  meta: { title: string; description: string };
  signal: string;
  signalBrand: string;
  headingHtml: string;
  intro: string;
  exploreRoute: string;
  status: string;
  statusAriaLabel: string;
  countdown: { days: string; hours: string; minutes: string; seconds: string };
  statusMessage: string;
  endMessage: string;
  evento: {
    kicker: string;
    headingHtml: string;
    lead: string;
    linkLabel: string;
    gridLabel: string;
    items: Array<{ n: string; titleHtml: string; text: string }>;
  };
  ruta: {
    kicker: string;
    headingHtml: string;
    tabs: [HomeRouteTab, HomeRouteTab];
    dataLabels: { distance: string; elevation: string; time: string };
    footerNote: string;
    linkLabel: string;
  };
  schedule: {
    kicker: string;
    headingHtml: string;
    rows: Array<{ n: string; title: string; when: string; note: string }>;
  };
  resultados: {
    kicker: string;
    headingHtml: string;
    copy: string;
    ctaLabel: string;
    imageAlt: string;
  };
  valdivia: {
    kicker: string;
    headingHtml: string;
    copy: string;
    linkLabel: string;
    overlayPhraseHtml: string;
  };
}

const es: HomeCopy = {
  meta: {
    title: 'Valdivia Bike Fest | Competencia mountain bike en Valdivia',
    description:
      'Valdivia Bike Fest: competencia mountain bike en Valdivia, Chile. Conoce el evento, explora la ruta, revisa los horarios y prepárate para inscribirte.',
  },
  signal: 'Valdivia / Chile',
  signalBrand: 'VBF / PRÓXIMA EDICIÓN',
  headingHtml: 'La ruta<br><em>está esperando</em>',
  intro: 'Una competencia de mountain bike entre bosque, agua y ciudad. Guarda tu lugar en la línea de partida y conoce el terreno antes de llegar.',
  exploreRoute: 'Explora la ruta',
  status: 'Próxima edición',
  statusAriaLabel: 'Estado del evento',
  countdown: { days: 'días', hours: 'horas', minutes: 'min', seconds: 'seg' },
  statusMessage: '10–14 marzo 2027',
  endMessage: 'La carrera está en marcha',
  evento: {
    kicker: 'El evento',
    headingHtml: 'Cinco días<br><em>Dos formatos</em>',
    lead: 'Valdivia Bike Fest reúne a quienes llegan por el desafío y se quedan por el paisaje. Todo lo que necesitas para preparar tu carrera, en un solo lugar.',
    linkLabel: 'Conoce el evento',
    gridLabel: 'LO QUE ENCONTRARÁS',
    items: [
      { n: '01', titleHtml: 'Dos formatos<br>de carrera', text: 'Circuitos XCO y XCC en Valdivia.' },
      { n: '02', titleHtml: 'Información<br>sin sorpresas', text: 'Ruta, horarios y recomendaciones claras.' },
      { n: '03', titleHtml: 'La energía<br>del pelotón', text: 'Una comunidad que empieza antes de pedalear.' },
    ],
  },
  ruta: {
    kicker: 'Ruta y horario',
    headingHtml: 'Lee el terreno<br>antes de <em>vivirlo</em>',
    tabs: [
      {
        id: 'xco',
        index: '01',
        label: 'XCO',
        sublabel: 'Cross-Country Olímpico · ~3,6 km por vuelta',
        state: 'OFICIAL',
        title: 'XCO',
        description:
          'Cross-Country Olímpico con largada y llegada en el Complejo Deportivo ASENAV. Circuito de ~3,6 km y ~170 m de desnivel por vuelta, con un punto de abastecimiento y sectores para público.',
        distance: '~3,6 km / vuelta',
        elevation: '~170 m / vuelta',
        time: 'por confirmar',
      },
      {
        id: 'xcc',
        index: '02',
        label: 'XCC',
        sublabel: 'Short Track · ~0,81 km por vuelta',
        state: 'OFICIAL',
        title: 'XCC',
        description:
          'Short Track en el Complejo Deportivo ASENAV: ~0,81 km y ~18 m de desnivel por vuelta, con ~20 minutos de duración. Referencia 2026: ~10 vueltas Elite Masculino y ~9 Elite Femenino.',
        distance: '~0,81 km / vuelta',
        elevation: '~18 m / vuelta',
        time: 'Por confirmar',
      },
    ],
    dataLabels: { distance: 'distancia', elevation: 'desnivel', time: 'horario' },
    footerNote: 'Horarios y vueltas por categoría se definen en el congreso técnico.',
    linkLabel: 'Ver ruta completa',
  },
  schedule: {
    kicker: 'Día de carrera',
    headingHtml: 'Todo en<br><em>su momento</em>',
    rows: [
      { n: '01', title: 'Retiro de kit', when: 'Miércoles 10 de marzo, 9:00 hrs', note: 'Inicio de actividades' },
      { n: '02', title: 'Reunión de corredores', when: 'Domingo 14 de marzo, por confirmar', note: 'Atención a todas las categorías' },
      { n: '03', title: 'Largada principal', when: 'Domingo 14 de marzo, 14:10 hrs', note: 'El reloj empieza aquí' },
      { n: '04', title: 'Resultados', when: 'Después de cada llegada', note: 'Consulta online' },
    ],
  },
  resultados: {
    kicker: 'Resultados',
    headingHtml: 'La marca<br>queda <em>aquí</em>',
    copy: 'Cuando la carrera termine, busca tu tiempo, tu categoría y el lugar que ocupaste en el pelotón. El tablero oficial te espera en una sola pantalla.',
    ctaLabel: 'Ver resultados completos',
    imageAlt: 'Meta de la competencia',
  },
  valdivia: {
    kicker: 'Valdivia',
    headingHtml: 'Ven a competir<br><em>Conoce la ciudad</em>',
    copy: 'Una ciudad de ríos, lluvia y verde profundo. Haz de tu carrera una escapada y conoce el lugar que le da su carácter a esta experiencia.',
    linkLabel: 'Descubre Valdivia',
    overlayPhraseHtml: 'DONDE EL AGUA<br>ENCUENTRA EL BOSQUE',
  },
};

const en: HomeCopy = {
  meta: {
    title: 'Valdivia Bike Fest | Mountain bike race in Valdivia',
    description:
      'Valdivia Bike Fest: a mountain bike race in Valdivia, Chile. Learn about the event, explore the route, check the schedule, and get ready to register.',
  },
  signal: 'Valdivia / Chile',
  signalBrand: 'VBF / NEXT EDITION',
  headingHtml: 'The route<br><em>is waiting</em>',
  intro: 'A mountain bike competition between forest, water, and city. Save your place at the start line and know the terrain before you arrive.',
  exploreRoute: 'Explore the route',
  status: 'Next edition',
  statusAriaLabel: 'Event status',
  countdown: { days: 'days', hours: 'hours', minutes: 'min', seconds: 'sec' },
  statusMessage: '10–14 March 2027',
  endMessage: 'Race day is live',
  evento: {
    kicker: 'The event',
    headingHtml: 'Five days<br><em>Two formats</em>',
    lead: 'Valdivia Bike Fest brings together those who come for the challenge and stay for the landscape. Everything you need to prepare for your race, in one place.',
    linkLabel: 'Discover the event',
    gridLabel: "WHAT YOU'LL FIND",
    items: [
      { n: '01', titleHtml: 'Two race<br>formats', text: 'XCO and XCC circuits in Valdivia.' },
      { n: '02', titleHtml: 'Information<br>without surprises', text: 'Route, schedule, and clear recommendations.' },
      { n: '03', titleHtml: 'The energy<br>of the pack', text: 'A community that starts before pedaling.' },
    ],
  },
  ruta: {
    kicker: 'Route & schedule',
    headingHtml: 'Read the terrain<br>before you <em>ride it</em>',
    tabs: [
      {
        id: 'xco',
        index: '01',
        label: 'XCO',
        sublabel: 'Cross-Country Olympic · ~3.6 km per lap',
        state: 'OFFICIAL',
        title: 'XCO',
        description:
          'Cross-Country Olympic with start and finish at the ASENAV Sports Complex. A ~3.6 km circuit with ~170 m of climbing per lap, one feed zone and spectator sectors.',
        distance: '~3.6 km / lap',
        elevation: '~170 m / lap',
        time: 'TBC',
      },
      {
        id: 'xcc',
        index: '02',
        label: 'XCC',
        sublabel: 'Short Track · ~0.81 km per lap',
        state: 'OFFICIAL',
        title: 'XCC',
        description:
          'Short Track at the ASENAV Sports Complex: ~0.81 km and ~18 m of elevation per lap, lasting ~20 minutes. 2026 reference: ~10 laps Elite Men and ~9 Elite Women.',
        distance: '~0.81 km / lap',
        elevation: '~18 m / lap',
        time: 'TBC',
      },
    ],
    dataLabels: { distance: 'distance', elevation: 'elevation', time: 'schedule' },
    footerNote: 'Schedule and lap counts per category are defined at the technical meeting.',
    linkLabel: 'View full route',
  },
  schedule: {
    kicker: 'Race day',
    headingHtml: 'Everything<br>in its <em>time</em>',
    rows: [
      { n: '01', title: 'Kit pickup', when: 'Wednesday, March 10, 9:00 AM', note: 'Activities begin' },
      { n: '02', title: 'Technical meeting', when: 'Sunday, March 14, TBC', note: 'All categories' },
      { n: '03', title: 'Main start', when: 'Sunday, March 14, 2:10 PM', note: 'The clock starts here' },
      { n: '04', title: 'Results', when: 'After each finish', note: 'Online query' },
    ],
  },
  resultados: {
    kicker: 'Results',
    headingHtml: 'Your mark<br>stays <em>here</em>',
    copy: 'When the race ends, find your time, your category, and where you placed in the pack. The official board awaits you on a single screen.',
    ctaLabel: 'View full results',
    imageAlt: 'Race finish line',
  },
  valdivia: {
    kicker: 'Valdivia',
    headingHtml: 'Come to compete<br><em>Discover the city</em>',
    copy: 'A city of rivers, rain, and deep green. Turn your race into a getaway and discover the place that gives this experience its character.',
    linkLabel: 'Discover Valdivia',
    overlayPhraseHtml: 'WHERE WATER<br>MEETS THE FOREST',
  },
};

export const homeCopy: Record<Locale, HomeCopy> = { es, en };
