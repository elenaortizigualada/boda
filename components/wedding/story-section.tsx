"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { MOTION_CONFIG } from "@/lib/constants"

export function StorySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="story" className="scroll-mt-24 sm:scroll-mt-28 section-mobile-relaxed bg-secondary">
      <div className="container mx-auto container-mobile">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: MOTION_CONFIG.duration.section, ease: MOTION_CONFIG.easing.premium }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.24em] text-muted-foreground mb-6">
            Una nueva aventura
          </p>
          <h2 className="font-serif text-[clamp(2.5rem,10vw,5.6rem)] font-light leading-[0.98] tracking-wide text-balance">
            ¡Nos casamos!
          </h2>
          <p className="mt-7 font-serif text-[clamp(1.35rem,4vw,2rem)] font-light italic leading-[1.35] text-foreground/75 text-balance">
            Y nos encantaría compartir este día tan especial con vosotros.
          </p>
          <a
            href="/rsvp"
            className="tap-target mt-9 inline-flex items-center justify-center border border-foreground/60 px-7 py-3 font-sans text-[10px] uppercase tracking-[0.2em] text-foreground transition-colors duration-300 hover:bg-foreground hover:text-background"
          >
            Confirmar asistencia
          </a>
        </motion.div>
      </div>
    </section>
  )
}
