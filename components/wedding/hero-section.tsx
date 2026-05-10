"use client"

import { motion } from "framer-motion"

export function HeroSection() {
  return (
    <section className="relative min-h-[100dvh] pt-24 sm:pt-20 lg:pt-0 flex items-center justify-center overflow-hidden">
      {/* Minimal geometric accent */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-8 sm:left-16 lg:left-24 top-0 w-px h-full bg-border origin-top"
        />
        <motion.div
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.5, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="absolute right-8 sm:right-16 lg:right-24 top-0 w-px h-full bg-border origin-top"
        />
      </div>

      <div className="container mx-auto px-6 sm:px-8 lg:px-12 text-center relative z-10">
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.22em] sm:tracking-[0.4em] text-muted-foreground mb-8 sm:mb-16"
        >
          Nos casamos
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] font-light tracking-[0.02em] leading-[0.85] mb-4"
        >
          Elena
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
          className="flex items-center justify-center gap-6 sm:gap-10 my-6 sm:my-8"
        >
          <span className="w-16 sm:w-24 lg:w-32 h-px bg-foreground/20" />
          <span className="font-serif text-xl sm:text-2xl text-muted-foreground">&</span>
          <span className="w-16 sm:w-24 lg:w-32 h-px bg-foreground/20" />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.85, ease: [0.22, 1, 0.36, 1] }}
          className="font-serif text-[15vw] sm:text-[12vw] md:text-[10vw] lg:text-[8vw] font-light tracking-[0.02em] leading-[0.85] mb-16 sm:mb-20"
        >
          Fran
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
          className="space-y-6"
        >
          <p className="font-serif text-2xl sm:text-3xl md:text-4xl font-light tracking-wide">
            21.09.2025
          </p>
          <p className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.22em] sm:tracking-[0.3em] text-muted-foreground">
            Villa Balbiano, Lago de Como
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2 }}
          className="mt-14 sm:mt-24"
        >
          <a
            href="#story"
            className="group inline-flex flex-col items-center gap-3 font-sans text-[10px] uppercase tracking-[0.22em] sm:tracking-[0.3em] text-muted-foreground hover:text-foreground transition-colors duration-500 touch-manipulation"
          >
            <span>Desliza</span>
            <motion.span
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-px h-8 bg-current"
            />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
