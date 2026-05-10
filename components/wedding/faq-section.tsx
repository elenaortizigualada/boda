"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Plus } from "lucide-react"

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
    <section id="faq" className="scroll-mt-24 sm:scroll-mt-28 py-20 sm:py-32 lg:py-40 bg-secondary">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
          className="mb-20 sm:mb-28 lg:mb-36 text-center"
        >
          <p className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-8">
            Preguntas
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-wide">
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
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="border-b border-border"
    >
      <button
        onClick={onToggle}
        className="w-full py-8 sm:py-10 flex items-start justify-between gap-6 text-left touch-manipulation group"
      >
        <span className="font-serif text-xl sm:text-2xl font-light group-hover:translate-x-2 transition-transform duration-500">
          {faq.question}
        </span>
        <span className={`flex-shrink-0 mt-1 transition-transform duration-500 ${isOpen ? "rotate-45" : ""}`}>
          <Plus className="w-5 h-5 text-muted-foreground" />
        </span>
      </button>
      <motion.div
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
        className="overflow-hidden"
      >
        <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed pb-8 sm:pb-10 pr-2 sm:pr-12">
          {faq.answer}
        </p>
      </motion.div>
    </motion.div>
  )
}
