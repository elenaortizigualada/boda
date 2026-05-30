"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { ArrowUpRight, Clock } from "lucide-react"
import { MOTION_CONFIG, WEDDING_CONFIG } from "@/lib/constants"

export function VenueSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  type Venue = typeof WEDDING_CONFIG.ceremony | typeof WEDDING_CONFIG.reception

  const VenueCard = ({ venue, index }: { venue: Venue, index: number }) => (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
      transition={{
        duration: MOTION_CONFIG.duration.section,
        delay: MOTION_CONFIG.stagger.medium * index,
        ease: MOTION_CONFIG.easing.premium,
      }}
      className="space-y-5"
    >
      {/* Imagen del lugar */}
      <div className="overflow-hidden aspect-[16/10] w-full mb-6">
        <img
          src={venue.image}
          alt={venue.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
        />
      </div>

      <div className="space-y-2">
        <p className="font-sans text-[9px] uppercase tracking-[0.24em] text-background/50 mb-3">
          {venue.type}
        </p>
        <h3 className="font-serif text-[clamp(1.65rem,7vw,2.5rem)] font-light leading-[1.05] text-balance">
          {venue.name}
        </h3>
      </div>

      {/* Hora */}
      <div className="flex items-center gap-3 pt-2">
        <Clock className="w-5 h-5 text-background/60" />
        <p className="font-sans text-base text-background/85">
          {venue.time}
        </p>
      </div>

      {/* Descripción */}
      <p className="font-sans text-[13px] sm:text-[14px] text-background/70 leading-relaxed">
        {venue.description}
      </p>

      {/* Dirección */}
      <div className="pt-4 border-t border-background/20">
        <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-background/55 mb-2">
          Dirección
        </p>
        <p className="font-sans text-[14px] sm:text-base text-background/85 leading-relaxed">
          {venue.addressLine1}<br />
          {venue.addressLine2}
        </p>
      </div>

      {/* Enlace a mapa */}
      <a
        href={venue.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="tap-target group inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.14em] text-background hover:opacity-70 transition-opacity duration-300 ease-out touch-manipulation mt-2"
      >
        <span>Ver en mapa</span>
        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 ease-out" />
      </a>
    </motion.div>
  )

  return (
    <section id="venue" ref={ref} className="scroll-mt-24 sm:scroll-mt-28 section-mobile bg-foreground text-background">
      <div className="container mx-auto container-mobile">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
          transition={{ duration: MOTION_CONFIG.duration.reveal, ease: MOTION_CONFIG.easing.premium }}
          className="mb-16 sm:mb-20"
        >
          <p className="font-sans text-[10px] sm:text-[12px] uppercase tracking-[0.2em] sm:tracking-[0.28em] text-background/60 mb-6">
            El gran día
          </p>
          <h2 className="font-serif text-[clamp(2.5rem,11vw,4.5rem)] font-light leading-[1.05] tracking-wide text-balance">
            Dos lugares especiales
          </h2>
        </motion.div>

        {/* Venues Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-20">
          {/* Ceremonia */}
          <div>
            <VenueCard venue={WEDDING_CONFIG.ceremony} index={0} />
          </div>

          {/* Celebración */}
          <div>
            <VenueCard venue={WEDDING_CONFIG.reception} index={1} />
          </div>
        </div>

        {/* Timeline divider on mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{
            duration: MOTION_CONFIG.duration.reveal,
            delay: MOTION_CONFIG.stagger.medium * 2,
          }}
          className="md:hidden mt-12 pt-12 border-t border-background/20 text-center"
        >
          <p className="font-sans text-[12px] uppercase tracking-[0.2em] text-background/50">
            Nos vemos en la celebración
          </p>
        </motion.div>
      </div>
    </section>
  )
}
