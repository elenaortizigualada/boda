"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

export function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <footer className="py-20 sm:py-32 lg:py-40 bg-background">
      <motion.div
        ref={ref}
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 1 }}
        className="container mx-auto px-6 sm:px-8 lg:px-12 text-center"
      >
        <p className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.22em] sm:tracking-[0.3em] text-muted-foreground mb-10 sm:mb-12">
          Con amor y gratitud
        </p>
        
        <h2 className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-light tracking-wide mb-10 sm:mb-12">
          E&F
        </h2>
        
        <div className="flex items-center justify-center gap-5 sm:gap-8 mb-10 sm:mb-12">
          <span className="w-16 sm:w-24 h-px bg-border" />
          <p className="font-serif text-xl sm:text-2xl italic text-muted-foreground">
            21.09.2025
          </p>
          <span className="w-16 sm:w-24 h-px bg-border" />
        </div>

        <p className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.22em] sm:tracking-[0.3em] text-muted-foreground/50">
          Villa Balbiano, Lago de Como
        </p>
      </motion.div>
    </footer>
  )
}
