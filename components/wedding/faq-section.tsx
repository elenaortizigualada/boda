"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Plus } from "lucide-react"
import { MOTION_CONFIG } from "@/lib/constants"

const faqs = [
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
]

export function FAQSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section id="faq" className="scroll-mt-24 sm:scroll-mt-28 section-mobile bg-secondary">
      <div className="container mx-auto container-mobile">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: MOTION_CONFIG.duration.section, ease: MOTION_CONFIG.easing.premium }}
          className="mb-12 sm:mb-18 lg:mb-28"
        >
          <p className="font-sans text-[10px] sm:text-[12px] uppercase tracking-[0.2em] sm:tracking-[0.28em] text-muted-foreground mb-6">
            Preguntas
          </p>
          <h2 className="font-serif text-[clamp(2rem,9vw,4.4rem)] font-light leading-[1.06] tracking-wide max-w-3xl text-balance">
            Preguntas frecuentes
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: (typeof faqs)[0]
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: MOTION_CONFIG.duration.reveal, delay: index * MOTION_CONFIG.stagger.tight, ease: MOTION_CONFIG.easing.premium }}
      className="border-b border-border/80"
    >
      <button
        onClick={onToggle}
        className="tap-target w-full py-7 sm:py-9 flex items-start justify-between gap-6 text-left touch-manipulation group"
      >
        <span className="font-serif text-[clamp(1.25rem,5vw,1.8rem)] leading-[1.15] font-light group-hover:translate-x-1 transition-transform duration-300 ease-out text-balance">
          {faq.question}
        </span>
        <span className={`flex-shrink-0 mt-1 transition-transform duration-300 ease-out ${isOpen ? "rotate-45" : ""}`}>
          <Plus className="w-5 h-5 text-muted-foreground" />
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: MOTION_CONFIG.duration.reveal, ease: MOTION_CONFIG.easing.premium }}
        className="overflow-hidden"
      >
        <p className="font-sans text-[15px] sm:text-base text-muted-foreground leading-relaxed pb-8 sm:pb-10 pr-2 sm:pr-12 max-w-[60ch]">
          {faq.answer}
        </p>
      </motion.div>
    </motion.div>
  )
}
