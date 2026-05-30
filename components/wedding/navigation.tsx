"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useReducedMotion } from "framer-motion"
import { WEDDING_CONFIG, MOTION_CONFIG } from "@/lib/constants"

const navItems = [
  { label: "Nuestra historia", href: "#story" },
  { label: "Detalles del día", href: "#details" },
  { label: "El lugar", href: "#venue" },
  { label: "Cronograma", href: "#timeline" },
  { label: "Galería", href: "#gallery" },
  { label: "Preguntas frecuentes", href: "#faq" },
]

export function Navigation({ isVisible }: { isVisible: boolean }) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [activeSection, setActiveSection] = useState<string>(navItems[0].href)
  const [isDesktop, setIsDesktop] = useState(
    () => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches
  )
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const mobileDialogRef = useRef<HTMLDivElement | null>(null)
  const lastFocusedElementRef = useRef<HTMLElement | null>(null)
  const reduceMotion = useReducedMotion()
  const activeSectionLabel = navItems.find((item) => item.href === activeSection)?.label ?? "Inicio"

  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)")
    const update = () => setIsDesktop(mql.matches)
    mql.addEventListener("change", update)
    return () => mql.removeEventListener("change", update)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentY = window.scrollY
      setIsScrolled(currentY > 50)
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
    if (!isMobileMenuOpen) return

    lastFocusedElementRef.current = document.activeElement as HTMLElement | null

    const dialog = mobileDialogRef.current
    if (!dialog) return

    const focusableSelector =
      'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'

    const focusableElements = Array.from(
      dialog.querySelectorAll<HTMLElement>(focusableSelector)
    )

    focusableElements[0]?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsMobileMenuOpen(false)
        return
      }

      if (event.key !== "Tab") return

      const currentFocusable = Array.from(
        dialog.querySelectorAll<HTMLElement>(focusableSelector)
      )

      if (currentFocusable.length === 0) return

      const first = currentFocusable[0]
      const last = currentFocusable[currentFocusable.length - 1]

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
      lastFocusedElementRef.current?.focus()
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.replace("#", ""))
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section))

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visibleEntries.length > 0) {
          setActiveSection(`#${visibleEntries[0].target.id}`)
        }
      },
      {
        root: null,
        rootMargin: "-35% 0px -45% 0px",
        threshold: [0.2, 0.4, 0.65],
      }
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{
          y: isDesktop && !isScrolled ? -100 : 0,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: reduceMotion ? 0.2 : MOTION_CONFIG.duration.reveal, ease: MOTION_CONFIG.easing.premium }}
        style={{ pointerEvents: isVisible ? "auto" : "none" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ${
          isScrolled
            ? "bg-background/92 backdrop-blur-md border-b border-border/70"
            : "bg-transparent"
        }`}
      >
        <nav className="container mx-auto container-mobile py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <a
              href="#main-content"
              className="tap-target inline-flex items-center justify-center text-foreground touch-manipulation w-12 h-12 sm:w-14 sm:h-14"
            >
              <img src="/logo2.png" alt="Logo" className="w-full h-full object-contain" />
            </a>

            {/* Desktop Navigation */}
            <ul className="hidden lg:flex items-center gap-10 xl:gap-14">
              {navItems.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className={`font-sans text-[11px] uppercase tracking-[0.2em] transition-colors duration-500 relative group ${
                      activeSection === item.href
                        ? "text-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                    aria-current={activeSection === item.href ? "location" : undefined}
                  >
                    {item.label}
                    <span
                      className={`absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-300 ${
                        activeSection === item.href ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
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
            ref={mobileDialogRef}
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
                <img src="/logo2.png" alt="Logo" className="w-14 h-14 sm:w-16 sm:h-16 object-contain drop-shadow-[0_4px_18px_rgba(0,0,0,0.5)]" />
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
                  <li className="mb-2 inline-flex items-center gap-2 border border-white/20 rounded-full px-3 py-1.5 text-[10px] uppercase tracking-[0.16em] text-white/75">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#E8D8BF]" aria-hidden="true" />
                    <span>Ahora viendo</span>
                    <span className="text-white">{activeSectionLabel}</span>
                  </li>
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
                        className={`tap-target font-serif text-[1.45rem] sm:text-[1.9rem] leading-none font-light transition-colors duration-300 touch-manipulation flex items-center justify-center py-2 ${
                          activeSection === item.href ? "text-[#E8D8BF]" : "text-white hover:text-white/70"
                        }`}
                        aria-current={activeSection === item.href ? "location" : undefined}
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
