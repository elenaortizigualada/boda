"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const navItems = [
  { label: "Historia", href: "#story" },
  { label: "Detalles", href: "#details" },
  { label: "Lugar", href: "#venue" },
  { label: "Horario", href: "#timeline" },
  { label: "Galería", href: "#gallery" },
  { label: "Preguntas", href: "#faq" },
]

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? "bg-background/95 backdrop-blur-sm"
            : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto px-6 sm:px-8 lg:px-12 py-5 sm:py-6">
          <div className="flex items-center justify-between">
            <a
              href="#"
              className="font-serif text-2xl sm:text-3xl font-light tracking-[0.1em] text-foreground touch-manipulation"
            >
              E&F
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
                    <span className="absolute -bottom-1 left-0 w-0 h-px bg-foreground transition-all duration-500 group-hover:w-full" />
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
              className="lg:hidden p-2 -mr-2 text-foreground touch-manipulation"
              aria-label="Abrir menú"
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
            transition={{ duration: 0.5 }}
            className="fixed inset-0 z-50 bg-background lg:hidden"
          >
            <div className="flex flex-col h-full">
              <div className="flex items-center justify-between px-6 sm:px-8 py-5 sm:py-6">
                <span className="font-serif text-2xl sm:text-3xl font-light tracking-[0.1em]">
                  E&F
                </span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 -mr-2 text-foreground touch-manipulation"
                  aria-label="Cerrar menú"
                >
                  <div className="w-6 h-6 relative">
                    <span className="absolute top-1/2 left-0 w-full h-px bg-foreground rotate-45" />
                    <span className="absolute top-1/2 left-0 w-full h-px bg-foreground -rotate-45" />
                  </div>
                </button>
              </div>
              <nav className="flex-1 flex items-center justify-center px-6">
                <ul className="flex flex-col items-center gap-7 sm:gap-8">
                  {navItems.map((item, index) => (
                    <motion.li
                      key={item.href}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.5 }}
                    >
                      <a
                        href={item.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="font-serif text-[2rem] sm:text-4xl leading-none font-light text-foreground hover:opacity-50 transition-opacity duration-500 touch-manipulation block"
                      >
                        {item.label}
                      </a>
                    </motion.li>
                  ))}
                  <motion.li
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: navItems.length * 0.1, duration: 0.5 }}
                    className="pt-8"
                  >
                    <a
                      href="#rsvp"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="inline-flex items-center justify-center px-8 sm:px-12 py-3.5 sm:py-4 border border-foreground text-foreground font-sans text-xs sm:text-sm uppercase tracking-[0.16em] sm:tracking-[0.2em] touch-manipulation"
                    >
                      Confirmar asistencia
                    </a>
                  </motion.li>
                </ul>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
