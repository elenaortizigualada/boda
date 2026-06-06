"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { WEDDING_CONFIG, MOTION_CONFIG } from "@/lib/constants"

export function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <footer className="section-mobile bg-background">
      <motion.div
        ref={ref}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: MOTION_CONFIG.stagger.tight,
              delayChildren: 0.04,
            },
          },
        }}
        className="container mx-auto container-mobile text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: MOTION_CONFIG.duration.reveal, ease: MOTION_CONFIG.easing.premium }}
          className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.24em] sm:tracking-[0.3em] text-muted-foreground/75 mb-6 sm:mb-8"
        >
          Gracias por estar con nosotros
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: MOTION_CONFIG.duration.reveal, delay: MOTION_CONFIG.stagger.tight, ease: MOTION_CONFIG.easing.premium }}
          className="mb-6 sm:mb-8 flex justify-center"
        >
          <img src="/logo2.png" alt="Logo" loading="lazy" decoding="async" className="w-56 sm:w-72 h-auto" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: MOTION_CONFIG.duration.reveal, delay: MOTION_CONFIG.stagger.medium, ease: MOTION_CONFIG.easing.premium }}
          className="flex items-center justify-center gap-3 sm:gap-6 mb-6 sm:mb-8"
        >
          <span className="w-10 sm:w-20 h-px bg-border/80" />
          <p className="font-serif text-[clamp(1.15rem,4.6vw,1.7rem)] italic text-muted-foreground/85 tracking-[0.01em] leading-[1.15] md:leading-[1.2] lg:leading-[1.28]">
            {WEDDING_CONFIG.dateShort}
          </p>
          <span className="w-10 sm:w-20 h-px bg-border/80" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
          transition={{ duration: MOTION_CONFIG.duration.reveal, delay: MOTION_CONFIG.stagger.medium + 0.04, ease: MOTION_CONFIG.easing.smooth }}
          className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.22em] sm:tracking-[0.26em] text-muted-foreground/70 text-balance"
        >
          {WEDDING_CONFIG.reception.shortLabel}
        </motion.p>
      </motion.div>
    </footer>
  )
}
