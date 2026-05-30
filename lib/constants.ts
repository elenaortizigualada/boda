/**
 * Configuración centralizada del evento de boda
 */

export const WEDDING_CONFIG = {
  // Información general
  date: "2027-04-17",
  time: "13:00",
  dateLong: "Sábado, 17 de abril de 2027",
  dateShort: "17.04.2027",
  dateTime: new Date("2027-04-17T13:00:00"),
  
  // Ubicaciones
  ceremony: {
    name: "Convento de las Bernardas",
    type: "Ceremonia",
    time: "13:00",
    addressLine1: "Plaza de las Bernardas",
    addressLine2: "28801 Alcalá de Henares, Madrid, España",
    lat: 40.4955,
    lng: -3.3617,
    mapUrl: "https://maps.app.goo.gl/6i6ks8caQzSjJZkt5",
    image: "/images/venue.jpeg",
    description: "El convento cisterciense de San Bernardo de Alcalá de Henares fue fundado en 1613 por el cardenal Bernardo de Sandoval y Rojas. Es un edificio barroco, declarado monumento arquitectónico-artístico en 1924.",
  },
  reception: {
    name: "Jardines del Negralejo",
    type: "Celebración",
    time: "15:00",
    addressLine1: "Carr. de Mejorada, km 2,5",
    addressLine2: "28522 Rivas-Vaciamadrid, Madrid, España",
    lat: 40.3089,
    lng: -3.5276,
    mapUrl: "https://maps.app.goo.gl/aywsjxhHfkAXqHAz8",
    image: "/images/jardines.jpg",
    description: "Los Jardines del Negralejo es una finca situada en un bonito enclave rural en la Vega del Henares. Ofrecen la combinación perfecta de espacios y naturaleza para vivir una experiencia única.",
  },
  // Ubicación (legacy - mantener para compatibilidad)
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

  seo: {
    title: "Elena & Fran | Invitación de Boda",
    description: "Estás cordialmente invitado a celebrar la boda de Elena y Fran",
  },

  texts: {
    displayDate: "17 de abril de 2027",
    heroLocation: "Jardines del Negralejo · Madrid",
    invitationLead: "os invitamos a nuestra boda",
    introTapHint: "Toca para abrir",
    introSkipLabel: "Saltar introducción",
    busDescription:
      "Habrá un autobús que nos lleve de la iglesia a la finca. También habrá un autobús desde la finca a Boadilla del Monte, con parada en Vallecas.",
  },

  timelineEvents: [
    {
      time: "13:00",
      title: "Ceremonia",
      description: "Intercambio de votos en la iglesia",
    },
    {
      time: "15:00",
      title: "Cóctel",
      description: "Cerveza y aperitivos en el jardín",
    },
    {
      time: "16:30",
      title: "Banquete",
      description: "Menú en el gran salón",
    },
    {
      time: "18:30",
      title: "Primer baile",
      description: "Intento de primer baile sin pisarnos y comienzo de la fiesta",
    },
    {
      time: "00:00",
      title: "Despedida",
      description: "Salida de la fiesta y despedida de los invitados",
    },
  ],

  storyMilestones: [
    {
      year: "2019",
      title: "Nuestro Primer Encuentro",
      description:
        "Nos conocimos en la inauguración de una galería en París. Fran derramó champán sobre el vestido favorito de Elena, y el resto es historia.",
      image: "/images/story/2019.jpeg",
    },
    {
      year: "2020",
      title: "Primer viaje juntos",
      description:
        "Nuestra primera aventura nos llevó a la Costa Amalfitana. Entre limoneros y cenas al atardecer, supimos que era algo especial.",
      image: "/images/story/2020.jpeg",
    },
    {
      year: "2022",
      title: "Nos Fuimos a Vivir Juntos",
      description:
        "Encontramos el piso de nuestros sueños en Londres, con un pequeño jardín y espacio para los libros de Elena y los vinilos de Fran.",
      image: "/images/story/2022.jpeg",
    },
    {
      year: "2024",
      title: "La pedida",
      description:
        "En una tarde tranquila en Santorini, frente a la caldera al atardecer, Fran se arrodilló. Entre lágrimas de felicidad, Elena dijo que sí.",
      image: "/images/story/2024.jpeg",
    },
  ],

  faqItems: [
    {
      question: "¿Cuál es el código de vestimenta?",
      answer:
        "El código de vestimenta es etiqueta opcional. Se recomienda que los hombres lleven esmoquin o traje oscuro, y que las mujeres vistan traje de noche o cóctel. La ceremonia será al aire libre sobre césped, por lo que aconsejamos calzado adecuado.",
    },
    {
      question: "¿Están invitados los niños?",
      answer:
        "Aunque adoramos a los peques, hemos decidido que nuestra boda sea una celebración solo para adultos. Esperamos que así podáis disfrutar de una noche para relajaros y celebrarlo con nosotros.",
    },
    {
      question: "¿A qué hora debo llegar?",
      answer:
        "Os pedimos llegar hacia las 15:30 para disfrutar de las bebidas de bienvenida antes de la ceremonia de las 16:00. Así tendréis tiempo para ubicaros con calma.",
    },
    {
      question: "¿Habrá transporte?",
      answer:
        "Sí. Habrá autobuses lanzadera entre los hoteles recomendados y Villa Balbiano durante la noche. La última salida desde el lugar será a las 00:30.",
    },
    {
      question: "¿Dónde podemos alojarnos?",
      answer:
        "Hemos reservado bloques de habitaciones en Grand Hotel Tremezzo y Hotel Bellagio. Ambos tienen vistas espectaculares al Lago de Como y están a 15 minutos en coche del lugar. Indicad nuestros nombres al reservar para acceder a la tarifa especial.",
    },
    {
      question: "¿Puedo hacer fotos durante la ceremonia?",
      answer:
        "Os pedimos una ceremonia sin móviles. Guardad teléfonos y cámaras durante los votos para vivir el momento plenamente. Nuestro fotógrafo capturará todo y compartiremos las fotos después de la boda.",
    },
  ],

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
  eventStartTime: "13:00",
  eventEndTime: "00:00",
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
    successCalendarCta: "Añadir al calendario",
    successMapsCta: "Cómo llegar al lugar",
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
