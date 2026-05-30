"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { MOTION_CONFIG, WEDDING_CONFIG } from "@/lib/constants"

export function TimelineSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="timeline" className="scroll-mt-24 sm:scroll-mt-28 section-mobile-relaxed section-divider-top bg-background">
      <div className="container mx-auto container-mobile">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: MOTION_CONFIG.duration.section, ease: MOTION_CONFIG.easing.premium }}
          className="mb-12 sm:mb-18 lg:mb-28"
        >
          <p className="font-sans text-[10px] sm:text-[12px] uppercase tracking-[0.2em] sm:tracking-[0.28em] text-muted-foreground mb-6">
            Horario
          </p>
          <h2 className="font-serif text-[clamp(2rem,9vw,4.4rem)] font-light leading-[1.06] tracking-wide max-w-3xl text-balance">
            Orden del día
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {WEDDING_CONFIG.timelineEvents.map((event, index) => (
            <TimelineEvent key={event.time} event={event} index={index} isLast={index === WEDDING_CONFIG.timelineEvents.length - 1} />
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
  event: (typeof WEDDING_CONFIG.timelineEvents)[number]
  index: number
  isLast: boolean
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: MOTION_CONFIG.duration.reveal, delay: index * MOTION_CONFIG.stagger.tight, ease: MOTION_CONFIG.easing.premium }}
      className={`relative grid grid-cols-1 sm:grid-cols-[120px_1fr] md:grid-cols-[180px_1fr] gap-4 sm:gap-8 md:gap-12 ${
        !isLast ? "pb-14 sm:pb-16 border-b border-border mb-14 sm:mb-16" : ""
      }`}
    >
      <div className="text-left sm:text-right">
        <span className="font-serif text-[clamp(1.7rem,6vw,2.8rem)] font-light text-foreground leading-[1.05]">
          {event.time}
        </span>
      </div>
      <div>
        <h3 className="font-serif text-[clamp(1.35rem,5vw,2rem)] font-light mb-2 sm:mb-3 leading-[1.12]">
          {event.title}
        </h3>
        <p className="font-sans text-[15px] sm:text-base text-muted-foreground leading-relaxed max-w-[56ch]">
          {event.description}
        </p>
      </div>
    </motion.div>
  )
}
