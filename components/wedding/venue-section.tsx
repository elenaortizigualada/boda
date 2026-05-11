"use client"

import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"
import { ArrowUpRight } from "lucide-react"
import { MOTION_CONFIG, WEDDING_CONFIG } from "@/lib/constants"

export function VenueSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="venue" ref={ref} className="scroll-mt-24 sm:scroll-mt-28 section-mobile bg-foreground text-background">
      <div className="container mx-auto container-mobile">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-14 lg:gap-24 items-center">
          {/* Venue Image Placeholder */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -24 }}
            transition={{ duration: MOTION_CONFIG.duration.section, ease: MOTION_CONFIG.easing.premium }}
            className="relative aspect-[3/4] overflow-hidden order-2 lg:order-1"
          >
            <Image
              src="/images/venue.jpeg" 
              alt="Jardines del Negralejo"
              fill
              sizes="(max-width: 1024px) 92vw, 46vw"
              className="absolute inset-0 w-full h-full object-cover"
            />
            {/* Decorative frame */}
            <div className="absolute inset-4 sm:inset-6 border border-background/20 pointer-events-none" />
          </motion.div>

          {/* Venue Details */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 24 }}
            transition={{ duration: MOTION_CONFIG.duration.section, delay: MOTION_CONFIG.stagger.medium, ease: MOTION_CONFIG.easing.premium }}
            className="order-1 lg:order-2"
          >
            <p className="font-sans text-[10px] sm:text-[12px] uppercase tracking-[0.2em] sm:tracking-[0.28em] text-background/60 mb-6">
              El lugar
            </p>
            <h2 className="font-serif text-[clamp(2rem,9vw,4.2rem)] font-light leading-[1.06] tracking-wide mb-5 text-balance">
              {WEDDING_CONFIG.location.name}
            </h2>
            <div className="space-y-6 mb-10">
              <p className="font-sans text-[15px] sm:text-base text-background/80 leading-relaxed max-w-[58ch]">
                Jardines del Negralejo es una finca en las afueras de Madrid rodeada de jardines exuberantes, diseñada para celebraciones al aire libre con capacidad para grandes fiestas.
              </p>
              <p className="font-sans text-[15px] sm:text-base text-background/80 leading-relaxed max-w-[58ch]">
                Sus espacios exteriores, arbolado centenario y luz natural en cualquier estación lo convierten en el escenario que siempre tuvimos en mente.
              </p>
            </div>

            <div className="space-y-4 mb-10 pt-8 border-t border-background/20">
              <div>
                <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-background/55 mb-2">
                  Dirección
                </p>
                <p className="font-sans text-[15px] sm:text-base text-background/92 leading-relaxed">
                  {WEDDING_CONFIG.location.addressLine1}<br />
                  {WEDDING_CONFIG.location.addressLine2}
                </p>
              </div>
            </div>

            <a
              href={WEDDING_CONFIG.location.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="tap-target group inline-flex items-center gap-3 font-sans text-[11px] uppercase tracking-[0.16em] text-background hover:opacity-70 transition-opacity duration-300 ease-out touch-manipulation"
            >
              <span>Ver en el mapa</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 ease-out" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
