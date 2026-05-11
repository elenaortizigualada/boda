"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const details = [
  {
    number: "01",
    title: "Fecha",
    content: "Sábado, 10 de abril de 2027",
  },
  {
    number: "02",
    title: "Hora",
    content: "La ceremonia comienza a las 12:00",
  },
  {
    number: "03",
    title: "Lugar",
    content: "Jardines del Negralejo, Madrid",
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
    <section id="details" className="scroll-mt-24 sm:scroll-mt-28 section-rhythm bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
          className="mb-16 sm:mb-24 lg:mb-28"
        >
          <p className="typo-eyebrow mb-6">
            Detalles
          </p>
          <h2 className="typo-title max-w-3xl">
            Todo lo que necesitas saber
          </h2>
        </motion.div>

        <div className="max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 lg:gap-x-24">
          {details.map((detail, index) => (
            <DetailCard key={detail.title} detail={detail} index={index} />
          ))}
          </div>
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
      className="py-8 sm:py-10 border-b border-border/70"
    >
      <span className="typo-meta text-muted-foreground block mb-3">
        {detail.number}
      </span>
      <h3 className="typo-meta text-muted-foreground mb-4">
        {detail.title}
      </h3>
      <p className="typo-subtitle text-foreground max-w-md">
        {detail.content}
      </p>
    </motion.div>
  )
}
