"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { WEDDING_CONFIG } from "@/lib/constants"
import { MOTION_CONFIG } from "@/lib/constants"

const navItems = [
  { label: "Nuestra historia", href: "#story" },
  { label: "Detalles del día", href: "#details" },
  { label: "El lugar", href: "#venue" },
  { label: "Cronograma", href: "#timeline" },
  { label: "Galería", href: "#gallery" },
  { label: "Preguntas frecuentes", href: "#faq" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const reduceMotion = useReducedMotion()
  const brideInitial = WEDDING_CONFIG.couple.bride.charAt(0).toUpperCase()
  const groomInitial = WEDDING_CONFIG.couple.groom.charAt(0).toUpperCase()
  const initials = `${brideInitial}&${groomInitial}`

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false)
      }
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [])

  return (
    <>
      <motion.header
        initial={reduceMotion ? false : { y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: reduceMotion ? 0.2 : MOTION_CONFIG.duration.reveal, ease: MOTION_CONFIG.easing.premium }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? "bg-background/92 backdrop-blur-md border-b border-border/70"
            : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto container-mobile py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <a
              href="#"
              className="tap-target inline-flex items-center font-serif text-[1.65rem] sm:text-3xl font-light tracking-[0.08em] text-foreground touch-manipulation"
            >
              {initials}
            </a>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-10 xl:gap-14">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="font-sans text-[11px] uppercase tracking-[0.2em] text-muted-foreground hover:text-foreground transition-colors duration-500 relative group"
                  >
                    {item.label}
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover:w-full" />
                  </a>
                </li>
              ))}
            </ul>

            {/* Botón de confirmación - escritorio */}
            <a
              href="#rsvp"
              className="hidden lg:inline-flex items-center justify-center px-8 py-3 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-500 font-sans text-[11px] uppercase tracking-[0.2em]"
            >
              Confirmar asistencia
            </a>

            {/* Botón del menú móvil */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="lg:hidden tap-target p-2 -mr-2 text-foreground touch-manipulation"
              aria-label="Abrir menú"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-menu"
            >
              <div className="w-6 flex flex-col gap-1.5">
                <span className="w-full h-px bg-foreground" />
                <span className="w-full h-px bg-foreground" />
              </div>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Menú móvil a pantalla completa */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0.15 : MOTION_CONFIG.duration.micro }}
            id="mobile-navigation-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación móvil"
            className="fixed inset-0 z-50 overflow-hidden lg:hidden"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url(/images/hero-bg.jpeg)" }}
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/55 to-black/75"
            />
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(201,184,150,0.18),transparent_42%)]"
            />
            <div className="flex flex-col h-full">
              <div className="relative z-10 flex items-center justify-between container-mobile py-4 sm:py-6">
                <span className="font-serif text-2xl sm:text-3xl font-light tracking-[0.1em] text-white drop-shadow-[0_4px_18px_rgba(0,0,0,0.5)]">
                  {initials}
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="tap-target p-2 -mr-2 text-white/95 touch-manipulation"
                  aria-label="Cerrar menú de navegación"
                >
                  <div className="w-6 h-6 relative">
                    <span className="absolute top-1/2 left-0 w-full h-px bg-current rotate-45" />
                    <span className="absolute top-1/2 left-0 w-full h-px bg-current -rotate-45" />
                  </div>
                </button>
              </div>
              <nav className="relative z-10 flex-1 flex items-end justify-center container-mobile pb-[max(1.5rem,env(safe-area-inset-bottom))]">
                <div
                  aria-hidden="true"
                  className="absolute inset-0"
                />
                <motion.ul
                  initial={reduceMotion ? false : { opacity: 0, y: 14, scale: 0.99 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: 10, scale: 0.99 }}
                  transition={{ duration: reduceMotion ? 0.15 : MOTION_CONFIG.duration.micro, ease: MOTION_CONFIG.easing.premium }}
                  className="relative z-10 w-full max-w-md rounded-2xl border border-white/20 bg-black/40 backdrop-blur-md px-5 py-6 sm:px-8 sm:py-10 flex flex-col items-center gap-1 shadow-[0_24px_80px_rgba(0,0,0,0.45)]"
                >
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.href}
                      initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: reduceMotion ? 0 : index * MOTION_CONFIG.stagger.tight, duration: reduceMotion ? 0.1 : MOTION_CONFIG.duration.micro }}
                      className="w-full text-center"
                    >
                      <a
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="tap-target font-serif text-[1.45rem] sm:text-[1.9rem] leading-none font-light text-white hover:text-white/70 transition-colors duration-300 touch-manipulation flex items-center justify-center py-2"
                      >
                        {item.label}
                      </a>
                    </motion.li>
                  ))}
                  <motion.li
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navItems.length * 0.1, duration: 0.5 }}
                    className="pt-5"
                  >
                    <a
                      href="#rsvp"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="tap-target inline-flex items-center justify-center px-8 sm:px-12 py-3 border border-white/80 text-white hover:bg-white hover:text-black transition-colors duration-300 font-sans text-[11px] sm:text-sm uppercase tracking-[0.16em] sm:tracking-[0.2em] touch-manipulation"
                    >
                      Confirmar asistencia
                    </a>
                  </motion.li>
                </motion.ul>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
