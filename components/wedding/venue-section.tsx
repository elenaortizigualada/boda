"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowUpRight } from "lucide-react"

export function VenueSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="venue" ref={ref} className="scroll-mt-24 sm:scroll-mt-28 py-20 sm:py-32 lg:py-40 bg-foreground text-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 lg:gap-24 items-center">
          {/* Venue Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="relative aspect-[3/4] bg-background/10 order-2 lg:order-1"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center px-8">
                <p className="font-serif text-3xl sm:text-4xl italic text-background/50">
                  Villa Balbiano
                </p>
                <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-background/30 mt-4">
                  Lago de Como, Italia
                </p>
              </div>
            </div>
            {/* Decorative frame */}
            <div className="absolute inset-4 sm:inset-6 border border-background/20 pointer-events-none" />
          </motion.div>

          {/* Venue Details */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="order-1 lg:order-2"
          >
            <p className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-background/50 mb-8">
              El lugar
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light tracking-wide mb-8">
              Villa Balbiano
            </h2>
            <div className="space-y-6 mb-12">
              <p className="font-sans text-sm sm:text-base text-background/70 leading-relaxed">
                En la orilla del Lago de Como, Villa Balbiano es una
                magnífica villa del siglo XVI que ha sido testigo de siglos de
                elegancia italiana.
              </p>
              <p className="font-sans text-sm sm:text-base text-background/70 leading-relaxed">
                Con sus interiores con frescos, jardines exuberantes y vistas
                impresionantes al lago, es el escenario perfecto para nuestra
                celebración de amor.
              </p>
            </div>

            <div className="space-y-4 mb-12 pt-8 border-t border-background/20">
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-background/40 mb-2">
                  Dirección
                </p>
                <p className="font-sans text-sm text-background/90">
                  Via Guglielmo Marconi, 23<br />
                  22021 Ossuccio CO, Italia
                </p>
              </div>
            </div>

            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 font-sans text-[11px] uppercase tracking-[0.2em] text-background hover:opacity-70 transition-opacity duration-500 touch-manipulation"
            >
              <span>Ver en el mapa</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
