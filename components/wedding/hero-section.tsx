"use client"

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { formatWeddingDisplayDate, MOTION_CONFIG, WEDDING_CONFIG } from "@/lib/constants"
import { useIsMobile } from "@/hooks/use-mobile"
import { CountdownDisplay } from "./countdown-section"

export function HeroSection() {
  const reduceMotion = useReducedMotion()
  const isMobile = useIsMobile()
  const heroRef = useRef<HTMLElement | null>(null)
  const { scrollY } = useScroll()
  const backgroundY = useTransform(scrollY, [0, 900], [0, reduceMotion ? 0 : 90])
  // En móvil dejamos más aire alrededor de la pareja; en escritorio mantenemos el encuadre actual.
  const baseScale = isMobile ? 1.04 : 1.34
  const backgroundScale = useTransform(scrollY, [0, 900], [baseScale, reduceMotion ? baseScale : baseScale + 0.06])

  return (
    <section ref={heroRef} className="relative min-h-[100svh] sm:min-h-[100dvh] pt-20 sm:pt-20 lg:pt-0 flex items-center justify-center overflow-hidden border-0 bg-black">
      <motion.div
        initial={reduceMotion ? false : { scale: 1.04, opacity: 0.88 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: reduceMotion ? 0.2 : MOTION_CONFIG.duration.hero, ease: MOTION_CONFIG.easing.premium }}
        className="absolute inset-0 will-change-transform"
        style={{
          y: backgroundY,
          scale: backgroundScale,
        }}
      >
        <picture className="block h-full w-full border-0">
          <source media="(min-width: 1024px)" srcSet="/images/hero-bg-desktop.png" />
          <img
            src="/images/hero-bg.jpeg"
            alt="Elena y Fran"
            className="block h-full w-full border-0 object-cover object-[50%_68%]"
          />
        </picture>
      </motion.div>

      {/* Contrast layers to preserve readability on any photo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/12 to-black/45"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.16)_100%)]"
      />

      <div className="container mx-auto container-mobile relative z-10 flex flex-col justify-between min-h-[100svh] sm:min-h-[100dvh] pt-28 sm:pt-32 pb-12 sm:pb-16">
          {/* Etiqueta superior */}
          <motion.p
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0.2 : MOTION_CONFIG.duration.section, delay: reduceMotion ? 0 : 0.22, ease: MOTION_CONFIG.easing.smooth }}
            className="w-full text-center font-sans text-[16px] sm:text-[21px] font-semibold uppercase tracking-[0.2em] text-white/90"
          >
            {formatWeddingDisplayDate()}
          </motion.p>

          {/* Nombres */}
          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0.2 : MOTION_CONFIG.duration.hero, delay: reduceMotion ? 0 : 0.38, ease: MOTION_CONFIG.easing.premium }}
            className="relative -top-[7vh] sm:-top-[9vh] font-serif text-[clamp(3.8rem,19vw,12rem)] font-light tracking-[0.01em] leading-[0.86] text-white"
          >
            {WEDDING_CONFIG.couple.bride}<br />&amp; {WEDDING_CONFIG.couple.groom}
          </motion.h1>

          {/* Fila inferior */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0.2 : MOTION_CONFIG.duration.section, delay: reduceMotion ? 0 : 0.72, ease: MOTION_CONFIG.easing.smooth }}
            className="absolute inset-x-0 bottom-32 flex items-end justify-between gap-8"
          >
            <span aria-hidden="true" />
            <a
              href="#story"
              className="tap-target group inline-flex flex-col items-center justify-center gap-2 touch-manipulation"
              aria-label="Ir al contenido"
            >
              <motion.span
                animate={reduceMotion ? { opacity: 1 } : { y: [0, 6, 0] }}
                transition={reduceMotion ? { duration: 0 } : { duration: 2.8, repeat: Infinity, ease: MOTION_CONFIG.easing.subtle }}
                className="w-px h-8 bg-white/60 group-hover:bg-white transition-colors duration-500"
              />
            </a>
              </motion.div>

          <div className="absolute inset-x-0 top-[19%] sm:top-[18%] px-5 sm:px-8">
            <CountdownDisplay overlay showLabel={false} />
          </div>

          </div>
            </section>
  )
}
