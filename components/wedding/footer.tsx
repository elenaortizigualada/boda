"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { WEDDING_CONFIG } from "@/lib/constants"

export function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const brideInitial = WEDDING_CONFIG.couple.bride.charAt(0).toUpperCase()
  const groomInitial = WEDDING_CONFIG.couple.groom.charAt(0).toUpperCase()

  return (
    <footer className="py-20 sm:py-28 lg:py-32 bg-background border-t border-border/60">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        className="container mx-auto px-6 sm:px-8 lg:px-12 text-center"
      >
        <p className="typo-eyebrow text-muted-foreground mb-8 sm:mb-10">
          Con amor y gratitud
        </p>
        
        <h2 className="typo-display tracking-[0.06em] mb-8 sm:mb-10">
          {`${brideInitial}&${groomInitial}`}
        </h2>
        
        <div className="flex items-center justify-center gap-4 sm:gap-6 mb-8 sm:mb-10">
          <span className="w-10 sm:w-16 h-px bg-border" />
          <p className="typo-subtitle italic text-muted-foreground/90">
            10.04.2027
          </p>
          <span className="w-10 sm:w-16 h-px bg-border" />
        </div>

        <p className="typo-meta text-muted-foreground/75">
          Jardines del Negralejo, Madrid
        </p>
      </motion.div>
    </footer>
  )
}
