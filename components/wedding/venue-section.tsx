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
      className="space-y-5 border border-border/70 bg-secondary/55 p-5 sm:p-6 rounded-2xl shadow-[0_10px_26px_-22px_rgba(0,0,0,0.28)]"
    >
      {/* Imagen del lugar */}
      <div className="relative z-30 overflow-hidden aspect-[16/10] w-full mb-6 rounded-xl">
        <img
          src={venue.image}
          alt={venue.name}
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
        />
      </div>

      <div className="space-y-2">
        <p className="font-sans text-[9px] uppercase tracking-[0.24em] text-muted-foreground mb-3">
          {venue.type}
        </p>
        <h3 className="font-serif text-[clamp(1.65rem,7vw,2.5rem)] font-light leading-[1.05] text-balance">
          {venue.name}
        </h3>
      </div>

      {/* Hora */}
      <div className="flex items-center gap-3 pt-2">
        <Clock className="w-5 h-5 text-muted-foreground/80" />
        <p className="font-sans text-base text-foreground/85">
          {venue.time}
        </p>
      </div>

      {/* Descripción */}
      <p className="font-sans text-[14px] sm:text-[15px] text-muted-foreground leading-relaxed max-w-[62ch]">
        {venue.description}
      </p>

      {/* Dirección */}
      <div className="pt-5 border-t line-gold-border">
        <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-muted-foreground mb-2">
          Dirección
        </p>
        <p className="font-sans text-[14px] sm:text-base text-foreground/85 leading-relaxed">
          {venue.addressLine1}<br />
          {venue.addressLine2}
        </p>
      </div>

      {/* Enlace a mapa */}
      <a
        href={venue.mapUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="tap-target group inline-flex items-center gap-2 font-sans text-[10px] uppercase tracking-[0.14em] text-foreground hover:opacity-70 transition-opacity duration-300 ease-out touch-manipulation mt-2"
      >
        <span>Ver en mapa</span>
        <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300 ease-out" />
      </a>
    </motion.div>
  )

  return (
    <section id="venue" ref={ref} className="scroll-mt-24 sm:scroll-mt-28 section-mobile section-divider-top bg-background text-foreground">
      <div className="container mx-auto container-mobile">
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
          className="md:hidden mt-12 pt-12 border-t line-gold-border text-center"
        >
          <p className="font-sans text-[12px] uppercase tracking-[0.2em] text-muted-foreground">
            Nos vemos en la celebración
          </p>
        </motion.div>
      </div>
    </section>
  )
}
