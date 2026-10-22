/**
 * Configuración centralizada del evento de boda
 */

export const WEDDING_CONFIG = {
  // Información general
  date: "2027-04-17",
  dateLong: "Sábado, 17 de abril de 2027",
  dateShort: "17.04.2027",
  dateTime: new Date("2027-04-17T12:00:00"),
  
  // Ubicaciones
  ceremony: {
    name: "Parroquia Santa María la Mayor",
    type: "Ceremonia",
    time: "12:00",
    addressLine1: "C. Libreros, 25",
    addressLine2: "28801 Alcalá de Henares, Madrid, España",
    lat: 40.4955,
    lng: -3.3617,
    mapUrl: "https://www.google.com/maps/place/Parroquia+Santa+Mar%C3%ADa+la+Mayor/@40.4846415,-3.3649968,17z/data=!3m1!4b1!4m6!3m5!1s0xd42496ad81531f1:0x8309f7a054ebec9!8m2!3d40.4846374!4d-3.3624219!16s%2Fg%2F11cs6k1_v4?entry=ttu&g_ep=EgoyMDI2MTAxOS4wIKXMDSoASAFQAw%3D%3D",
    image: "/images/iglesia.jpg",
    description: "La Parroquia Santa María la Mayor es un edificio histórico situado en el corazón de Alcalá de Henares. Su arquitectura y su ambiente acogedor la convierten en el lugar perfecto para nuestra ceremonia.",
  },
  reception: {
    name: "Jardines del Negralejo",
    shortLabel: "Jardines del Negralejo, Madrid",
    type: "Celebración",
    time: "14:30",
    city: "Madrid",
    country: "España",
    addressLine1: "Carr. de Mejorada, km 2,5",
    addressLine2: "28522 Rivas-Vaciamadrid, Madrid, España",
    lat: 40.3089,
    lng: -3.5276,
    mapUrl: "https://www.google.com/maps/place/Jardines+del+Negralejo/@40.4085747,-3.5188537,17z/data=!3m1!4b1!4m6!3m5!1s0xd423b214854bab3:0x664516d941116999!8m2!3d40.4085706!4d-3.5162788!16s%2Fg%2F11thnjv_ym?entry=tts&g_ep=EgoyMDI2MDUwNi4wIPu8ASoASAFQAw%3D%3D&skid=2be0418b-9e9c-4236-8eb4-8c3cbb2313c6",
    image: "/images/jardines.jpg",
    description: "Los Jardines del Negralejo son una finca situada en un bonito enclave rural en la Vega del Henares.",
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
    invitationLead: "os invitamos a nuestra boda",
    introTapHint: "Toca para abrir",
    introSkipLabel: "Saltar introducción",
    busDescription:
      "Estamos coordinando autobuses para facilitar el traslado entre ceremonia y celebración. Próximamente compartiremos horarios, paradas y detalles finales.",
  },

  timelineEvents: [
    {
      time: "12:00",
      title: "Ceremonia",
      description: "Intercambio de votos en la iglesia",
    },
    {
      time: "14:30",
      title: "Banquete",
      description: "Celebración en los jardines",
    },
    {
      time: "18:00",
      title: "Baile",
      description: "Comienza la fiesta",
    },
    {
      time: "00:00",
      title: "Nos despedimos",
      description: "Hasta la próxima aventura",
    },
  ],

  storyMilestones: [
    {
      year: "2021",
      title: "El comienzo",
      description:
        "Todo empezó en Accenture, cuando Elena se incorporó al equipo donde trabajaba Fran. Lo que entonces eran reuniones, cafés y jornadas interminables, acabó siendo el inicio de algo mucho más importante.",
      images: [],
    },
    {
      year: "2022",
      title: "De compañeros a algo más",
      description:
        "Entre proyectos, muchas horas compartidas y para qué negarlo, la insistencia de Fran, la amistad fue dejando paso al cariño empezando nuestra historia juntos.",
      images: ["/images/story/2022-companeros-a-algo-mas.jpeg"],
    },
    {
      year: "2023",
      title: "Primeras aventuras",
      description:
        "Llegaron los primeros viajes, las primeras escapadas y un montón de recuerdos compartidos. Menorca fue uno de esos lugares que siempre recordaremos con especial cariño.",
      images: ["/images/story/2023-primeras-aventuras.jpeg"],
    },
    {
      title: "Una experiencia única",
      year: "2024",
      description:
        "Tuvimos la oportunidad de vivir y trabajar juntos durante seis meses en México. Fue una aventura increíble que nos hizo crecer, descubrir nuevos lugares y confirmar que éramos un gran equipo dentro y fuera de la oficina.",
      images: [
        "/images/story/2024-experiencia-mexico.jpeg",
        "/images/story/2024-experiencia-mexico-2.jpeg",
      ],
    },
    {
      year: "2025",
      title: "Nuestro hogar",
      description:
        "Después de muchas ilusiones y algún que otro quebradero de cabeza, compramos nuestra casa. Nuestro primer hogar y el lugar donde empezamos a construir muchos de nuestros planes de futuro.",
      images: ["/images/story/2025-nuestro-hogar.jpeg"],
    },
    {
      year: "Por el camino...",
      title: "Recuerdos alrededor del mundo",
      description:
        "Hemos tenido la suerte de recorrer juntos medio mundo: México, Costa Rica, Bahamas, Miami, Japón y muchos otros rincones que nos han regalado recuerdos inolvidables.",
      images: [
        "/images/story/por-el-camino-recuerdos.jpeg",
        "/images/story/por-el-camino-2.jpeg",
        "/images/story/por-el-camino-3.jpeg",
        "/images/story/por-el-camino-4.jpeg",
      ],
    },
    {
      year: "2026",
      title: "El \"sí\" más importante",
      description:
        "Fran le pidió matrimonio a Elena y, afortunadamente para él, la respuesta fue un sí.",
      images: [],
    },
    {
      year: "2027",
      title: "Un nuevo capítulo",
      description:
        "Y aquí estamos. Rodeados de las personas que más queremos, celebrando el comienzo de nuestra mayor aventura: nuestra vida juntos.",
      images: ["/images/story/2027-nuevo-capitulo.jpeg"],
    },
  ],

  faqItems: [
    {
      question: "¿Cuál es el código de vestimenta?",
      answer:
        "El código de vestimenta es etiqueta opcional. Se recomienda traje oscuro o esmoquin para los hombres y vestido de cóctel o noche para las mujeres. Como la ceremonia es en iglesia y la celebración en finca, os sugerimos un calzado cómodo para ambos entornos.",
    },
    {
      question: "¿A qué hora debo llegar?",
      answer:
        "La ceremonia comienza a las 12:00. Os recomendamos llegar con al menos 20 minutos de antelación para poder aparcar y acceder con tranquilidad.",
    },
    {
      question: "¿Habrá transporte?",
      answer:
        "Sí. Estamos organizando transporte para facilitar los desplazamientos durante el día. Compartiremos rutas, horarios y puntos de salida en cuanto estén cerrados.",
    },
    {
      question: "¿Hay aparcamiento disponible?",
      answer:
        "La iglesia no cuenta con aparcamiento propio, aunque se puede aparcar en las calles cercanas. Aun así, tened en cuenta que está situada en el centro histórico de Alcalá de Henares y puede llevar un poco de tiempo encontrar aparcamiento. En la finca sí hay aparcamiento disponible.",
    },
    {
      question: "¿Dónde podemos alojarnos?",
      answer:
        "Si venís de fuera, os recomendamos alojaros en Madrid o en Alcalá de Henares para tener mejor acceso tanto a la ceremonia como a la celebración. Si lo necesitáis, os ayudaremos encantados con sugerencias según vuestra zona de salida.",
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
} as const;

const DISPLAY_DATE_FORMATTER = new Intl.DateTimeFormat("es-ES", {
  day: "numeric",
  month: "long",
  year: "numeric",
});

export const formatWeddingDisplayDate = () => DISPLAY_DATE_FORMATTER.format(WEDDING_CONFIG.dateTime);

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
