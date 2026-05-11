"use client"

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { useRef } from "react"
import { MOTION_CONFIG } from "@/lib/constants"

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
        className="absolute inset-0 bg-gradient-to-b from-black/72 via-black/45 to-black/80"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.42)_100%)]"
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

      <div className="container mx-auto container-mobile text-center relative z-10">
        <div className="mx-auto max-w-3xl rounded-xl border border-white/15 bg-black/26 backdrop-blur-[2px] px-4 sm:px-8 py-7 sm:py-12">
          <motion.p
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0.2 : MOTION_CONFIG.duration.section, delay: reduceMotion ? 0 : 0.22, ease: MOTION_CONFIG.easing.smooth }}
            className="font-sans text-[10px] sm:text-[12px] uppercase tracking-[0.2em] sm:tracking-[0.34em] text-white/85 mb-5 sm:mb-12"
          >
            Nos casamos
          </motion.p>

          <motion.h1
            initial={reduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0.2 : MOTION_CONFIG.duration.hero, delay: reduceMotion ? 0 : 0.38, ease: MOTION_CONFIG.easing.premium }}
            className="font-serif text-[clamp(2.7rem,14vw,8rem)] font-light tracking-[0.015em] leading-[0.9] mb-10 sm:mb-16 text-white drop-shadow-[0_10px_24px_rgba(0,0,0,0.45)]"
          >
            Elena & Fran
          </motion.h1>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0.2 : MOTION_CONFIG.duration.section, delay: reduceMotion ? 0 : 0.62, ease: MOTION_CONFIG.easing.smooth }}
            className="space-y-4"
          >
            <p className="font-serif text-[clamp(1.5rem,7vw,2.6rem)] font-light tracking-[0.06em] text-white drop-shadow-[0_6px_16px_rgba(0,0,0,0.45)]">
              10.04.2027
            </p>
            <p className="font-sans text-[10px] sm:text-[12px] uppercase tracking-[0.18em] sm:tracking-[0.24em] text-white/85">
              Jardines del Negralejo, Madrid
            </p>
          </motion.div>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduceMotion ? 0.2 : MOTION_CONFIG.duration.section, delay: reduceMotion ? 0 : 0.92, ease: MOTION_CONFIG.easing.smooth }}
            className="mt-10 sm:mt-20"
          >
            <a
              href="#story"
              className="tap-target group inline-flex flex-col items-center justify-center gap-2 font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.2em] sm:tracking-[0.26em] text-white/85 hover:text-white transition-colors duration-500 touch-manipulation"
            >
              <span>Desliza</span>
              <motion.span
                animate={reduceMotion ? { opacity: 1 } : { y: [0, 6, 0] }}
                transition={reduceMotion ? { duration: 0 } : { duration: 2.8, repeat: Infinity, ease: MOTION_CONFIG.easing.subtle }}
                className="w-px h-7 bg-current"
              />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
