/**
 * Configuración centralizada del evento de boda
 */

export const WEDDING_CONFIG = {
  // Información general
  date: "2027-04-10",
  time: "12:00",
  dateTime: new Date("2027-04-10T12:00:00"),
  
  // Ubicación
  location: {
    name: "Jardines del Negralejo",
    city: "Madrid",
    country: "España",
    lat: 40.4168,
    lng: -3.7038,
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
