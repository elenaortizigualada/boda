"use client"

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { MOTION_CONFIG, WEDDING_CONFIG } from "@/lib/constants"

export function HeroSection() {
  const reduceMotion = useReducedMotion()
  const heroRef = useRef<HTMLElement | null>(null)
  const { scrollY } = useScroll()
  const backgroundY = useTransform(scrollY, [0, 900], [0, reduceMotion ? 0 : 90])
  const backgroundScale = useTransform(scrollY, [0, 900], [1, reduceMotion ? 1 : 1.08])

  return (
    <section ref={heroRef} className="relative min-h-[100svh] sm:min-h-[100dvh] pt-20 sm:pt-20 lg:pt-0 flex items-center justify-center overflow-hidden bg-black">
      <motion.div
        initial={reduceMotion ? false : { scale: 1.04, opacity: 0.88 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: reduceMotion ? 0.2 : MOTION_CONFIG.duration.hero, ease: MOTION_CONFIG.easing.premium }}
        className="absolute inset-0 will-change-transform"
        style={{
          backgroundImage: "url(/images/hero-bg.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "50% 42%",
          y: backgroundY,
          scale: backgroundScale,
        }}
      />

      {/* Contrast layers to preserve readability on any photo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/28 to-black/65"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_35%,rgba(0,0,0,0.28)_100%)]"
      />

      {/* Minimal geometric accent */}
      <div className="absolute inset-0 pointer-events-none hidden lg:block">
        <motion.div
          initial={reduceMotion ? false : { scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: reduceMotion ? 0.2 : MOTION_CONFIG.duration.slow, ease: MOTION_CONFIG.easing.premium }}
          className="absolute left-8 sm:left-16 lg:left-24 top-0 w-px h-full bg-white/25 origin-top"
        />
        <motion.div
          initial={reduceMotion ? false : { scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: reduceMotion ? 0.2 : MOTION_CONFIG.duration.slow, delay: reduceMotion ? 0 : 0.08, ease: MOTION_CONFIG.easing.premium }}
          className="absolute right-8 sm:right-16 lg:right-24 top-0 w-px h-full bg-white/25 origin-top"
        />
      </div>

      <div className="container mx-auto container-mobile relative z-10 flex flex-col justify-between min-h-[100svh] sm:min-h-[100dvh] pt-28 sm:pt-32 pb-12 sm:pb-16">
          {/* Etiqueta superior */}
          <motion.p
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0.2 : MOTION_CONFIG.duration.section, delay: reduceMotion ? 0 : 0.22, ease: MOTION_CONFIG.easing.smooth }}
            className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.28em] text-white/70"
          >
            {WEDDING_CONFIG.texts.displayDate}
          </motion.p>

          {/* Nombres */}
          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0.2 : MOTION_CONFIG.duration.hero, delay: reduceMotion ? 0 : 0.38, ease: MOTION_CONFIG.easing.premium }}
            className="font-serif text-[clamp(3.8rem,19vw,12rem)] font-light tracking-[0.01em] leading-[0.86] text-white"
          >
            {WEDDING_CONFIG.couple.bride}<br />&amp; {WEDDING_CONFIG.couple.groom}
          </motion.h1>

          {/* Fila inferior */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0.2 : MOTION_CONFIG.duration.section, delay: reduceMotion ? 0 : 0.72, ease: MOTION_CONFIG.easing.smooth }}
            className="flex items-end justify-between gap-8"
          >
            <p className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-white/70">
              {WEDDING_CONFIG.texts.heroLocation}
            </p>
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
          </div>
            </section>
  )
}
