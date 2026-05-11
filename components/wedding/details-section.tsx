"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { MOTION_CONFIG, WEDDING_CONFIG } from "@/lib/constants"

const details = [
  {
    title: "Fecha",
    content: WEDDING_CONFIG.dateLong,
  },
  {
    title: "Hora",
    content: "La ceremonia comienza a las 12:00",
  },
  {
    title: "Lugar",
    content: WEDDING_CONFIG.location.shortLabel,
  },
  {
    title: "Código de vestimenta",
    content: "Etiqueta opcional",
  },
]

export function DetailsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="details" className="scroll-mt-24 sm:scroll-mt-28 section-mobile bg-background">
      <div className="container mx-auto container-mobile">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: MOTION_CONFIG.duration.section, ease: MOTION_CONFIG.easing.premium }}
          className="mb-12 sm:mb-18 lg:mb-28"
        >
          <p className="font-sans text-[10px] sm:text-[12px] uppercase tracking-[0.2em] sm:tracking-[0.28em] text-muted-foreground mb-6">
            Detalles
          </p>
          <h2 className="font-serif text-[clamp(2rem,9vw,4.4rem)] font-light leading-[1.06] tracking-wide max-w-3xl text-balance">
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
      initial={{ opacity: 0, y: 18 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: MOTION_CONFIG.duration.reveal, delay: index * MOTION_CONFIG.stagger.tight, ease: MOTION_CONFIG.easing.premium }}
      className="bg-background p-7 sm:p-9 lg:p-11 text-center group hover:bg-secondary transition-colors duration-300 ease-out"
    >
      <h3 className="font-sans text-[10px] sm:text-[12px] uppercase tracking-[0.18em] sm:tracking-[0.24em] text-muted-foreground mb-3">
        {detail.title}
      </h3>
      <p className="font-serif text-[clamp(1.25rem,5vw,1.8rem)] font-light text-foreground leading-[1.2] text-balance">
        {detail.content}
      </p>
    </motion.div>
  )
}
