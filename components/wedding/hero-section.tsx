"use client"

import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] pt-24 sm:pt-20 lg:pt-0 flex items-center justify-center overflow-hidden bg-black">
      <motion.div
        initial={{ scale: 1.04, opacity: 0.9 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
        style={{
          backgroundImage: "url(/images/hero-bg.jpeg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      {/* Contrast layers to preserve readability on any photo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-b from-black/72 via-black/42 to-black/78"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_30%,rgba(0,0,0,0.4)_100%)]"
      />

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10">
        <div className="mx-auto max-w-3xl px-2 sm:px-0 py-10 sm:py-14">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="typo-eyebrow text-white/82 mb-8 sm:mb-12"
          >
            Nos casamos
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="typo-display text-white drop-shadow-[0_8px_20px_rgba(0,0,0,0.45)]"
          >
            Elena & Fran
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="space-y-5 mt-8 sm:mt-10"
          >
            <div className="mx-auto w-16 h-px bg-white/45" />
            <p className="typo-subtitle tracking-[0.06em] text-white drop-shadow-[0_6px_16px_rgba(0,0,0,0.45)]">
              10.04.2027
            </p>
            <p className="typo-meta text-white/82">
              Jardines del Negralejo, Madrid
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, delay: 1.1 }}
            className="mt-14 sm:mt-18"
          >
            <a
              href="#story"
              className="group inline-flex flex-col items-center gap-3 typo-meta text-white/78 hover:text-white transition-colors duration-500 touch-manipulation"
            >
              <span>Desliza</span>
              <motion.span
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 2.3, repeat: Infinity, ease: "easeInOut" }}
                className="w-px h-7 bg-current"
              />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
