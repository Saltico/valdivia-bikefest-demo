// src/i18n/contacto.ts
// Copy de /contacto en ES/EN. Fuente: contacto.html + pageCopy.contacto.

import type { Locale } from './config';

export interface ContactoCopy {
  meta: { title: string; description: string };
  hero: {
    kicker: string;
    headingHtml: string;
    intro: string;
    bgAlt: string;
  };
  form: {
    titleHtml: string;
    nameLabel: string;
    emailLabel: string;
    messageLabel: string;
    submitLabel: string;
    successTitle: string;
    successText: string;
    toast: string;
  };
  channelsLabel: string;
  mapTitle: string;
}

const es: ContactoCopy = {
  meta: {
    title: 'Contacto | Valdivia Bike Fest',
    description: 'Contacta al equipo de Valdivia Bike Fest.',
  },
  hero: {
    kicker: 'Valdivia Bike Fest / Contacto',
    headingHtml: 'Hablemos de la <em>ruta</em>',
    intro: '¿Tienes una pregunta sobre el evento, la inscripción o la información que falta? Escríbenos y te responderemos desde Valdivia.',
    bgAlt: 'Competidor saltando en Valdivia Bike Fest',
  },
  form: {
    titleHtml: 'Escríbenos <em>un mensaje</em>',
    nameLabel: 'Nombre',
    emailLabel: 'Email',
    messageLabel: 'Mensaje',
    submitLabel: 'Enviar mensaje',
    successTitle: '¡Mensaje enviado!',
    successText: 'Gracias por contactarnos. Te responderemos a la brevedad.',
    toast: 'Mensaje enviado. Se abrió tu aplicación de correo con el mensaje listo para enviar.',
  },
  channelsLabel: 'Canales directos',
  mapTitle: 'Ubicación Complejo Asenav, Valdivia',
};

const en: ContactoCopy = {
  meta: {
    title: 'Contact Valdivia Bike Fest | Registration, venue & schedule',
    description:
      'Contact the Valdivia Bike Fest team: ask about registration, categories, schedule, the ASENAV venue, or your trip to Valdivia before race day.',
  },
  hero: {
    kicker: 'Valdivia Bike Fest / Contact',
    headingHtml: "Let's talk<br>about the <em>route</em>",
    intro: 'Have a question about the event, registration, or missing information? Write to us and we will answer from Valdivia.',
    bgAlt: 'Competitor jumping at Valdivia Bike Fest',
  },
  form: {
    titleHtml: 'Send us <em>a message</em>',
    nameLabel: 'Name',
    emailLabel: 'Email',
    messageLabel: 'Message',
    submitLabel: 'Send message',
    successTitle: 'Message sent!',
    successText: 'Thanks for reaching out. We will get back to you shortly.',
    toast: 'Message sent. Your email app opened with the message ready to send.',
  },
  channelsLabel: 'Direct channels',
  mapTitle: 'ASENAV Sports Complex location, Valdivia',
};

export const contactoCopy: Record<Locale, ContactoCopy> = { es, en };
