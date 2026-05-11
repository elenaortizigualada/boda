/**
 * Configuración centralizada del evento de boda
 */

export const WEDDING_CONFIG = {
  // Información general
  date: "2027-04-10",
  time: "12:00",
  dateLong: "Sábado, 10 de abril de 2027",
  dateShort: "10.04.2027",
  dateTime: new Date("2027-04-10T12:00:00"),
  
  // Ubicación
  location: {
    name: "Jardines del Negralejo",
    shortLabel: "Jardines del Negralejo, Madrid",
    city: "Madrid",
    country: "España",
    addressLine1: "Carr. de Mejorada, km 2,5",
    addressLine2: "28522 Rivas-Vaciamadrid, Madrid, España",
    lat: 40.3089,
    lng: -3.5276,
    mapUrl: "https://maps.app.goo.gl/aywsjxhHfkAXqHAz8",
  },

  // Pareja
  couple: {
    bride: "Elena",
    groom: "Fran",
    weddingName: "Elena & Fran",
  },

  // Formulario Formspree
  formspree: {
    id: process.env.NEXT_PUBLIC_FORMSPREE_ID || "xzdokovr",
    replyTo: process.env.NEXT_PUBLIC_REPLY_EMAIL || "tu-email@example.com",
    subject: "Nueva Respuesta - Boda Elena & Fran",
  },

  // Límites de invitados
  maxGuestsPerInvitation: 5,

  // Fechas importantes
  rsvpDeadline: "2026-12-01",
  eventStartTime: "12:00",
  eventEndTime: "23:00",
} as const;

/**
 * Colores y estilos
 */
export const COLOR_CONFIG = {
  primary: "#5A4D3E",      // Color marrón
  accent: "#C9B896",       // Color beige
  background: "#F6F3EE",   // Crema
} as const;

/**
 * Textos y mensajes comunes
 */
export const MESSAGES = {
  rsvp: {
    title: "Esperamos contar contigo",
    subtitle: "Queremos saber si podrás celebrar con nosotros.",
    deadline: `Por favor, responde antes del 1 de diciembre de 2026.`,
    successTitle: "Gracias",
    successMessage: "Hemos recibido tu respuesta.\nNos encantará celebrarlo contigo.",
  },
  errors: {
    loadingGuests: "Error cargando datos de invitados",
    formSubmission: "Error al enviar el formulario",
    invalidGuest: "Invitado no encontrado",
  },
} as const;

/**
 * Timeouts y delays (en ms)
 */
export const ANIMATION_TIMINGS = {
  envelopeExitDuration: 500,
  pageTransitionDuration: 800,
  countdownUpdateInterval: 1000,
  formSubmitDelay: 300,
} as const;

/**
 * Motion system editorial
 */
export const MOTION_CONFIG = {
  easing: {
    premium: [0.16, 1, 0.3, 1],
    smooth: [0.22, 1, 0.36, 1],
    rise: [0.19, 1, 0.22, 1],
    subtle: [0.25, 0.1, 0.25, 1],
  },
  duration: {
    page: 1.15,
    hero: 1.25,
    section: 0.8,
    reveal: 0.7,
    micro: 0.25,
    slow: 1.5,
  },
  stagger: {
    tight: 0.04,
    medium: 0.08,
    relaxed: 0.12,
  },
  distance: {
    small: 12,
    medium: 20,
    large: 32,
  },
} as const;
