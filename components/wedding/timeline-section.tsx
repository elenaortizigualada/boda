"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const timelineEvents = [
  {
    time: "12:00",
    title: "Ceremonia",
    description: "Intercambio de votos en la iglesia",
  },
  {
    time: "13:30",
    title: "Cóctel",
    description: "Cerveza y aperitivos en el jardín",
  },
  {
    time: "15:00",
    title: "Banquete",
    description: "Menú en el gran salón",
  },
  {
    time: "17:00",
    title: "Primer baile",
    description: "Intento de primer baile sin pisarnos y comienzo de la fiesta",
  },
  {
    time: "00:00",
    title: "Despedida",
    description: "Salida de la fiesta y despedida de los invitados",
  },
]

export function TimelineSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="timeline" className="scroll-mt-24 sm:scroll-mt-28 py-20 sm:py-32 lg:py-40 bg-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
          className="mb-20 sm:mb-28 lg:mb-36 text-center"
        >
          <p className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-8">
            Horario
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-wide">
            Orden del día
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {timelineEvents.map((event, index) => (
            <TimelineEvent key={event.time} event={event} index={index} isLast={index === timelineEvents.length - 1} />
          ))}
        </div>
      </div>
    </section>
  )
}

function TimelineEvent({
  event,
  index,
  isLast,
}: {
  event: (typeof timelineEvents)[0]
  index: number
  isLast: boolean
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className={`relative grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[180px_1fr] gap-3 sm:gap-8 md:gap-12 ${
        !isLast ? "pb-12 sm:pb-16 border-b border-border mb-12 sm:mb-16" : ""
      }`}
    >
      <div className="text-left sm:text-right">
        <span className="font-serif text-2xl sm:text-3xl md:text-4xl font-light text-foreground">
          {event.time}
        </span>
      </div>
      <div>
        <h3 className="font-serif text-xl sm:text-2xl md:text-3xl font-light mb-2 sm:mb-3">
          {event.title}
        </h3>
        <p className="font-sans text-sm sm:text-base text-muted-foreground">
          {event.description}
        </p>
      </div>
    </motion.div>
  )
}
