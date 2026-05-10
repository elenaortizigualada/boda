"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const details = [
  {
    number: "01",
    title: "Fecha",
    content: "Domingo, 21 de septiembre de 2025",
  },
  {
    number: "02",
    title: "Hora",
    content: "La ceremonia comienza a las 16:00",
  },
  {
    number: "03",
    title: "Lugar",
    content: "Villa Balbiano, Lago de Como, Italia",
  },
  {
    number: "04",
    title: "Código de vestimenta",
    content: "Etiqueta opcional",
  },
]

export function DetailsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="details" className="scroll-mt-24 sm:scroll-mt-28 py-20 sm:py-32 lg:py-40 bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
          className="mb-20 sm:mb-28 lg:mb-36 text-center"
        >
          <p className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-8">
            Detalles
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-wide">
            Todo lo que necesitas saber
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-border max-w-6xl mx-auto">
          {details.map((detail, index) => (
            <DetailCard key={detail.title} detail={detail} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function DetailCard({
  detail,
  index,
}: {
  detail: (typeof details)[0]
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="bg-background p-8 sm:p-10 lg:p-12 text-center group hover:bg-secondary transition-colors duration-700"
    >
      <span className="font-sans text-[10px] tracking-[0.2em] text-muted-foreground/50 block mb-8">
        {detail.number}
      </span>
      <h3 className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-4">
        {detail.title}
      </h3>
      <p className="font-serif text-lg sm:text-xl lg:text-2xl font-light text-foreground leading-snug">
        {detail.content}
      </p>
    </motion.div>
  )
}
