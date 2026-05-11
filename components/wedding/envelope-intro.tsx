"use client"

import { useState, useCallback, useEffect, useRef } from "react"
import { motion, AnimatePresence, animate, useMotionValue, useTransform, useReducedMotion } from "framer-motion"
import { useGuests, findGuestByCode, findGuestByName } from "@/hooks/use-guests"
import { WEDDING_CONFIG } from "@/lib/constants"



interface EnvelopeIntroProps {
  onComplete: () => void
}

type EnvelopePhase = "idle" | "unsealing" | "opening" | "revealing" | "exiting"

export function EnvelopeIntro({ onComplete }: EnvelopeIntroProps) {
  const { guests } = useGuests()
  const [guestName, setGuestName] = useState("Nombre del invitado")

  const formatGuestNameForEnvelope = useCallback((name: string) => {
    const normalized = name.trim().replace(/\s+/g, " ")

    if (normalized.length <= 22) {
      return [normalized]
    }

    const words = normalized.split(" ")
    if (words.length === 1) {
      return [normalized]
    }

    const maxPerLine = 22
    const lines: string[] = []
    let currentLine: string[] = []

    for (const word of words) {
      const candidate = [...currentLine, word].join(" ")
      if (candidate.length <= maxPerLine || currentLine.length === 0) {
        currentLine.push(word)
      } else {
        lines.push(currentLine.join(" "))
        currentLine = [word]
      }
    }
    if (currentLine.length > 0) lines.push(currentLine.join(" "))

    // Limitar visualmente a 3 líneas sin cortar palabras ni apellidos
    if (lines.length > 3) {
      const mergedLast = lines.slice(2).join(" ")
      return [lines[0], lines[1], mergedLast]
    }

    return lines
  }, [])

  const guestNameLines = formatGuestNameForEnvelope(guestName)
  const lineCount = guestNameLines.length
  const longestLineLength = guestNameLines.reduce((max, line) => Math.max(max, line.length), 0)
  const guestNameFontClass =
    lineCount >= 3 || longestLineLength > 24
      ? "text-[clamp(0.85rem,3.7vw,1.1rem)]"
      : lineCount === 2 || longestLineLength > 18
      ? "text-[clamp(0.95rem,4.2vw,1.3rem)]"
      : "text-[clamp(1.05rem,5vw,1.625rem)]"

  // Cargar nombre del invitado desde URL parámetros
  useEffect(() => {
    if (typeof window === "undefined" || guests.length === 0) return

    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get("code")
    const guestParam = urlParams.get("guest")

    if (code) {
      const guest = findGuestByCode(guests, code)
      if (guest) {
        setGuestName(guest.name)
        return
      }
    }

    if (guestParam) {
      const guest = findGuestByName(guests, guestParam.replace(/\+/g, " "))
      if (guest) {
        setGuestName(guest.name)
      } else {
        setGuestName(guestParam.replace(/\+/g, " "))
      }
    }
  }, [guests])
  const prefersReducedMotion = useReducedMotion()
  
  const [phase, setPhase] = useState<EnvelopePhase>("idle")
  const phaseRef = useRef<EnvelopePhase>("idle")
  const hasCompletedRef = useRef(false)
  const transitionTimerRef = useRef<number | null>(null)
  const cardProgress = useMotionValue(0)
  
  // For subtle parallax on mobile tilt
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useTransform(mouseY, [-200, 200], [2, -2])
  const rotateY = useTransform(mouseX, [-200, 200], [-2, 2])
  const cardY = useTransform(
    cardProgress,
    [0,      0.12,    0.38,    0.65,    1],
    ["-40%", "-41%",  "-52%",  "-74%",  "-90%"],
  )
  const cardOpacity = useTransform(cardProgress, [0, 0.14, 0.38, 0.65, 1], [0, 0, 0.55, 1, 0.92])
  const cardScale   = useTransform(cardProgress, [0, 0.38, 1],             [1, 0.988, 0.964])
  const cardRotateX = useTransform(cardProgress, [0, 0.42, 0.65, 1],       [0, -0.3, -2.6, -3.8])
  const cardBoxShadow = useTransform(cardProgress, [0, 0.35, 0.65, 1], [
    "0 2px 4px rgba(0,0,0,0.02), 0 1px 2px rgba(0,0,0,0.01)",
    "0 8px 22px rgba(0,0,0,0.07), 0 3px 8px rgba(0,0,0,0.04)",
    "0 18px 44px rgba(0,0,0,0.13), 0 7px 18px rgba(0,0,0,0.09)",
    "0 24px 56px rgba(0,0,0,0.15), 0 9px 24px rgba(0,0,0,0.10)",
  ])
  const cinematicEase = [0.22, 1, 0.36, 1] as const
  const cinematicEaseOut = [0.19, 1, 0.22, 1] as const
  const isIdleAnimated = phase === "idle" && !prefersReducedMotion
  const flapOpen = phase === "opening" || phase === "revealing" || phase === "exiting"
  const sealInitials = `${WEDDING_CONFIG.couple.bride.charAt(0)}&${WEDDING_CONFIG.couple.groom.charAt(0)}`

  const completeOnce = useCallback(() => {
    if (hasCompletedRef.current) return
    hasCompletedRef.current = true
    onComplete()
  }, [onComplete])

  const startExit = useCallback(() => {
    setPhase((current) => (current === "exiting" ? current : "exiting"))
  }, [])

  const handleInteraction = useCallback(() => {
    if (phase !== "idle") return

    if (prefersReducedMotion) {
      startExit()
      return
    }

    // Un único animate de 0→1 que corre sin interrupciones, independiente de las fases
    animate(cardProgress, 1, {
      type: "tween",
      duration: 2.8,
      ease: [0.12, 1, 0.28, 1],
    })

    setPhase("unsealing")
  }, [phase, prefersReducedMotion, startExit, cardProgress])

  const handleSkip = useCallback(() => {
    if (phase === "exiting") return
    startExit()
  }, [phase, startExit])

  useEffect(() => {
    phaseRef.current = phase
  }, [phase])

  useEffect(() => {
    const queuePhaseTransition = (expected: EnvelopePhase, next: EnvelopePhase, delay: number) => {
      transitionTimerRef.current = window.setTimeout(() => {
        setPhase((current) => (current === expected ? next : current))
      }, delay)
    }

    if (transitionTimerRef.current) {
      window.clearTimeout(transitionTimerRef.current)
      transitionTimerRef.current = null
    }

    if (phase === "unsealing") {
      queuePhaseTransition("unsealing", "opening", 300)
    }

    if (phase === "opening") {
      queuePhaseTransition("opening", "revealing", 1400)
    }

    if (phase === "revealing") {
      queuePhaseTransition("revealing", "exiting", 600)
    }

    if (phase === "exiting") {
      transitionTimerRef.current = window.setTimeout(() => {
        if (phaseRef.current === "exiting") {
          completeOnce()
        }
      }, prefersReducedMotion ? 220 : 1100)
    }

    return () => {
      if (transitionTimerRef.current) {
        window.clearTimeout(transitionTimerRef.current)
        transitionTimerRef.current = null
      }
    }
  }, [phase, completeOnce, prefersReducedMotion])

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleSkip()
      }
    }

    window.addEventListener("keydown", handleEscape)
    return () => window.removeEventListener("keydown", handleEscape)
  }, [handleSkip])

  const handleMove = useCallback((e: React.MouseEvent | React.TouchEvent) => {
    if (phase !== "idle" || prefersReducedMotion) return
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const clientX = "touches" in e ? e.touches[0].clientX : e.clientX
    const clientY = "touches" in e ? e.touches[0].clientY : e.clientY
    const x = clientX - rect.left - rect.width / 2
    const y = clientY - rect.top - rect.height / 2
    mouseX.set(x)
    mouseY.set(y)
  }, [phase, mouseX, mouseY, prefersReducedMotion])

  const handleLeave = useCallback(() => {
    mouseX.set(0)
    mouseY.set(0)
  }, [mouseX, mouseY])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center overflow-visible"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "exiting" ? 0 : 1 }}
      transition={{ duration: prefersReducedMotion ? 0.2 : 0.75, ease: cinematicEaseOut }}
      style={{
        background: "#F6F3EE",
      }}
    >
      {/* Ambient light gradient - subtle top-down lighting */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,255,255,0.4) 0%, transparent 60%)",
        }}
      />

      {/* Envelope assembly */}
      <motion.button
        type="button"
        aria-label="Abrir invitación"
        className="relative cursor-pointer select-none bg-transparent border-0 p-0 touch-manipulation focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5A4D3E] focus-visible:ring-2 focus-visible:ring-[#5A4D3E]/30"
        onClick={handleInteraction}
        onMouseMove={handleMove}
        onMouseLeave={handleLeave}
        onTouchMove={handleMove}
        onTouchEnd={handleLeave}
        style={{
          perspective: 1200,
          rotateX: phase === "idle" && !prefersReducedMotion ? rotateX : 0,
          rotateY: phase === "idle" && !prefersReducedMotion ? rotateY : 0,
        }}
        animate={{
          scale: isIdleAnimated ? [1, 1.005, 1] : 1,
          y: isIdleAnimated ? [0, -1, 0] : 0,
        }}
        transition={
          isIdleAnimated
            ? { duration: 3.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
            : { duration: prefersReducedMotion ? 0.2 : 0.35, ease: cinematicEase }
        }
        whileTap={prefersReducedMotion ? undefined : { scale: 0.992 }}
      >
        {/* Ground shadow - realistic diffuse shadow */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2 pointer-events-none"
          style={{
            width: "120%",
            height: "40px",
            bottom: "-25px",
            background: "radial-gradient(ellipse at center, rgba(60,50,40,0.12) 0%, rgba(60,50,40,0.04) 40%, transparent 70%)",
            filter: "blur(8px)",
          }}
          animate={{
            scaleX: phase === "exiting" ? 1.12 : isIdleAnimated ? [1, 1.02, 1] : 1,
            opacity: phase === "exiting" ? 0 : isIdleAnimated ? [1, 0.9, 1] : 1,
          }}
          transition={
            isIdleAnimated
              ? { duration: 3.8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
              : { duration: prefersReducedMotion ? 0.2 : 0.6, ease: cinematicEase }
          }
        />

        {/* Main envelope container */}
        <div 
          className="relative w-[90vw] max-w-[420px] aspect-[1.45/1] sm:w-[82vw] sm:max-w-[380px] md:w-[420px]"
          style={{ transformStyle: "preserve-3d" }}
        >
          {/* === ENVELOPE BODY === */}
          <div 
            className="absolute inset-0"
            style={{
              background: "linear-gradient(175deg, #F9F6F1 0%, #F3EDE4 40%, #EDE5D9 100%)",
              boxShadow: `
                0 1px 1px rgba(0,0,0,0.02),
                0 2px 4px rgba(0,0,0,0.02),
                0 4px 8px rgba(0,0,0,0.03),
                0 8px 16px rgba(0,0,0,0.03),
                0 16px 32px rgba(0,0,0,0.04),
                inset 0 1px 0 rgba(255,255,255,0.8)
              `,
            }}
          >
            {/* Cotton paper texture - subtle fiber pattern */}
            {!prefersReducedMotion && (
              <div 
                className="absolute inset-0 opacity-[0.35] mix-blend-multiply pointer-events-none"
                style={{
                  backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='cotton'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.03' numOctaves='4' seed='1' result='noise'/%3E%3CfeDiffuseLighting in='noise' lighting-color='%23F5F0E8' surfaceScale='1.5'%3E%3CfeDistantLight azimuth='135' elevation='55'/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23cotton)'/%3E%3C/svg%3E")`,
                  backgroundSize: "200px 200px",
                }}
              />
            )}

            {!prefersReducedMotion && phase === "idle" && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                style={{
                  background:
                    "linear-gradient(105deg, transparent 28%, rgba(255,255,255,0.22) 48%, transparent 68%)",
                }}
                initial={{ x: "-120%", opacity: 0 }}
                animate={{ x: ["-120%", "120%"], opacity: [0, 0.12, 0] }}
                transition={{
                  duration: 5,
                  delay: 1.8,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            )}
            
            {/* Edge highlight - simulates paper thickness catching light */}
            <div 
              className="absolute inset-0 pointer-events-none"
              style={{
                boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.03)",
              }}
            />

            {/* Dark interior liner — the inside of the envelope, revealed when the flap opens */}
            <motion.div
              className="absolute inset-x-0 top-0 pointer-events-none"
              style={{
                height: "52%",
                zIndex: 23,
                background: "linear-gradient(180deg, #1B1308 0%, #2D1F10 45%, #3A2B18 70%, transparent 100%)",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: flapOpen ? 1 : 0 }}
              transition={{ duration: 0.55, delay: flapOpen ? 0.08 : 0, ease: "easeOut" }}
            />

            {/* Fold crease — subtle shadow line at the hinge of the flap */}
            <div
              className="absolute inset-x-0 pointer-events-none"
              style={{
                top: "49.5%",
                height: "2px",
                zIndex: 24,
                background: "linear-gradient(90deg, transparent 0%, rgba(0,0,0,0.07) 18%, rgba(0,0,0,0.13) 50%, rgba(0,0,0,0.07) 82%, transparent 100%)",
              }}
            />

            <motion.div
              className="absolute left-1/2 -translate-x-1/2 top-[8.5%] sm:top-[10%] text-center pointer-events-none w-[84%] sm:w-[78%]"
              initial={false}
              animate={{ opacity: phase === "idle" || phase === "unsealing" ? 1 : 0 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              style={{ zIndex: 26 }}
            >
              <p
                className={`leading-[1.15] break-words whitespace-pre-line ${guestNameFontClass}`}
                style={{
                  fontFamily: '"Cormorant Garamond", "Times New Roman", serif',
                  fontStyle: "normal",
                  color: "#4C3F31",
                  fontWeight: 500,
                  letterSpacing: "0.02em",
                  textShadow: "0 1px 0 rgba(255,255,255,0.35), 0 0.5px 0.8px rgba(76,63,49,0.16)",
                }}
              >
                {guestNameLines.join("\n")}
              </p>
            </motion.div>
          </div>

          {/* === INNER ENVELOPE FLAPS (left & right diamond) === */}
          <div 
            className="absolute top-0 left-0 w-1/2 h-full pointer-events-none"
            style={{
              clipPath: "polygon(0 0, 100% 50%, 0 100%)",
              background: "linear-gradient(120deg, #EFE9DF 0%, #E8E0D4 100%)",
            }}
          />
          <div 
            className="absolute top-0 right-0 w-1/2 h-full pointer-events-none"
            style={{
              clipPath: "polygon(100% 0, 0 50%, 100% 100%)",
              background: "linear-gradient(240deg, #EFE9DF 0%, #E8E0D4 100%)",
            }}
          />

          {/* === BOTTOM FLAP (V-shape tuck) === */}
          <div 
            className="absolute bottom-0 left-0 right-0 h-[45%] pointer-events-none"
            style={{
              clipPath: "polygon(0 100%, 50% 10%, 100% 100%)",
              background: "linear-gradient(0deg, #F5EFE6 0%, #EDE6DB 100%)",
            }}
          >
            {/* Fold shadow at bottom */}
            <div 
              className="absolute inset-0"
              style={{
                background: "linear-gradient(180deg, rgba(0,0,0,0.02) 0%, transparent 30%)",
              }}
            />
          </div>

          {/* === TOP FLAP (animated) === */}
          <motion.div
            className="absolute top-0 left-0 right-0 h-[52%] origin-top"
            style={{
              transformStyle: "preserve-3d",
              zIndex:
                phase === "unsealing" || phase === "opening" || phase === "revealing" || phase === "exiting"
                  ? 5
                  : 20,
            }}
            initial={{ rotateX: 0 }}
            animate={{
              rotateX:
                phase === "unsealing"
                  ? -8
                  : phase === "opening" || phase === "revealing" || phase === "exiting"
                  ? -190
                  : 0,
            }}
            transition={{ 
              duration: prefersReducedMotion 
                ? 0.35 
                : phase === "unsealing" 
                ? 0.26 
                : phase === "opening"
                ? 1.28
                : 0.3,
              ease: phase === "opening" ? [0.14, 1, 0.32, 1] : cinematicEaseOut,
            }}
          >
            {/* Front of flap */}
            <div 
              className="absolute inset-0"
              style={{
                clipPath: "polygon(0 0, 50% 95%, 100% 0)",
                background: "linear-gradient(180deg, #F7F3EC 0%, #F0E9DE 60%, #E8E0D4 100%)",
                backfaceVisibility: "hidden",
                boxShadow: phase === "opening" || phase === "revealing" || phase === "exiting"
                  ? "0 -8px 24px rgba(0,0,0,0.12) inset"
                  : "none",
              }}
            >
              {/* Paper texture on flap */}
              {!prefersReducedMotion && (
                <div 
                  className="absolute inset-0 opacity-30 mix-blend-multiply pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='flap'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.03' numOctaves='4' seed='2' result='noise'/%3E%3CfeDiffuseLighting in='noise' lighting-color='%23F0EBE3' surfaceScale='1.2'%3E%3CfeDistantLight azimuth='135' elevation='50'/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23flap)'/%3E%3C/svg%3E")`,
                    backgroundSize: "180px 180px",
                  }}
                />
              )}
              
              {/* Fold crease at top */}
              <div 
                className="absolute top-0 left-0 right-0 h-[3px]"
                style={{
                  background: "linear-gradient(180deg, rgba(0,0,0,0.04) 0%, transparent 100%)",
                }}
              />
              
              {/* Edge highlight */}
              <div 
                className="absolute inset-0 pointer-events-none"
                style={{
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.6)",
                }}
              />
            </div>

            {/* Back of flap (visible when open) */}
            <div 
              className="absolute inset-0"
              style={{
                clipPath: "polygon(0 0, 50% 95%, 100% 0)",
                background: "linear-gradient(180deg, #DDD4C6 0%, #D5CCC0 100%)",
                transform: "rotateX(180deg)",
                backfaceVisibility: "hidden",
                boxShadow: phase === "opening" || phase === "revealing" || phase === "exiting"
                  ? "0 8px 20px rgba(0,0,0,0.08)"
                  : "none",
              }}
            >
              {!prefersReducedMotion && (
                <div 
                  className="absolute inset-0 opacity-25 pointer-events-none"
                  style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='inner'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.025' numOctaves='3' seed='3'/%3E%3CfeDiffuseLighting in='SourceGraphic' lighting-color='%23DDD' surfaceScale='0.8'%3E%3CfeDistantLight azimuth='225' elevation='45'/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23inner)'/%3E%3C/svg%3E")`,
                  }}
                />
              )}
            </div>
          </motion.div>

          {/* === WAX SEAL === */}
          <AnimatePresence>
            {phase === "idle" && (
              <motion.div
                className="absolute top-[48%] left-1/2 -translate-x-1/2 -translate-y-1/2 z-30"
                initial={{ scale: 0.72, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{
                  scale: 1.28,
                  opacity: 0,
                  rotate: -8,
                  y: -8,
                  transition: { duration: 0.26, ease: [0.4, 0, 0.88, 1] },
                }}
                transition={{ duration: 0.52, ease: [0.34, 1.48, 0.64, 1] }}
              >
                <div 
                  className="relative w-12 h-12 sm:w-14 sm:h-14"
                  style={{
                    background: "radial-gradient(circle at 35% 35%, #D4A574 0%, #B8956A 40%, #8B7355 100%)",
                    borderRadius: "50%",
                    boxShadow: `
                      0 2px 4px rgba(0,0,0,0.15),
                      0 4px 8px rgba(0,0,0,0.1),
                      inset 0 1px 2px rgba(255,255,255,0.25),
                      inset 0 -2px 4px rgba(0,0,0,0.15)
                    `,
                  }}
                >
                  {/* Wax texture */}
                  {!prefersReducedMotion && (
                    <div 
                      className="absolute inset-0 rounded-full opacity-40"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='wax'%3E%3CfeTurbulence type='turbulence' baseFrequency='0.08' numOctaves='3' seed='7'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23wax)' opacity='0.3'/%3E%3C/svg%3E")`,
                      }}
                    />
                  )}
                  
                  {/* Seal initials */}
                  <span 
                    className="absolute inset-0 flex items-center justify-center font-serif text-sm sm:text-base"
                    style={{ 
                      color: "rgba(255,252,248,0.9)",
                      fontWeight: 300,
                      letterSpacing: "0.05em",
                      textShadow: "0 1px 2px rgba(0,0,0,0.2)",
                    }}
                  >
                    {sealInitials}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* === INVITATION CARD (overlay layer) === */}
        <motion.div
          className="absolute left-1/2 top-1/2 -translate-x-1/2 w-[82vw] max-w-[300px] aspect-[1.5/1] sm:w-[74vw] sm:max-w-[330px] md:max-w-[370px] pointer-events-none"
          style={{
            y: cardY,
            opacity: cardOpacity,
            scale: cardScale,
            rotateX: cardRotateX,
            boxShadow: cardBoxShadow,
            background: "linear-gradient(165deg, #FFFEFB 0%, #FAF7F3 60%, #F5F1EB 100%)",
            transformStyle: "preserve-3d",
            zIndex: 32,
          }}
          initial={false}
        >
          {!prefersReducedMotion && (
            <div
              className="absolute inset-0 opacity-20"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 300 300' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='card'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.02' numOctaves='3' seed='5'/%3E%3CfeDiffuseLighting in='SourceGraphic' lighting-color='%23FFF' surfaceScale='1'%3E%3CfeDistantLight azimuth='45' elevation='60'/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23card)'/%3E%3C/svg%3E")`,
              }}
            />
          )}

          <div className="relative h-full flex flex-col items-center justify-center p-5 sm:p-7">
            <p
              className="font-sans text-[8px] sm:text-[9px] uppercase tracking-[0.3em] sm:tracking-[0.38em] mb-4 sm:mb-5"
              style={{ color: "#B09F84" }}
            >
              os invitamos a nuestra boda
            </p>
            <h2
              className="font-serif text-[clamp(1.05rem,4.8vw,1.6rem)] text-center leading-[1.2] sm:leading-[1.18]"
              style={{ color: "#3D352A", fontWeight: 300, letterSpacing: "0.01em" }}
            >
              {WEDDING_CONFIG.couple.weddingName}
            </h2>
            <div className="w-10 sm:w-14 h-px bg-[#C9B896]/70 my-3 sm:my-4" />
            <p
              className="font-serif text-[11px] sm:text-[13px] italic text-center leading-[1.55]"
              style={{ color: "#6B5D4D", fontWeight: 300, letterSpacing: "0.02em" }}
            >
              10 de abril de 2027
            </p>
            <p
              className="font-sans text-[8px] sm:text-[9px] uppercase tracking-[0.18em] mt-1"
              style={{ color: "#9A8B75" }}
            >
              {WEDDING_CONFIG.location.name}
            </p>
          </div>

          {/* Double border frame — premium invitation signature */}
          <div
            className="absolute pointer-events-none"
            style={{ inset: "8px", border: "1px solid rgba(201,184,150,0.22)" }}
          />
          <div
            className="absolute pointer-events-none"
            style={{ inset: "12px", border: "0.5px solid rgba(201,184,150,0.12)" }}
          />
        </motion.div>

        {/* Minimal tap indicator */}
        <AnimatePresence>
          {phase === "idle" && (
            <motion.div
              className="absolute left-1/2 top-[calc(100%+0.35rem)] sm:top-[calc(100%+0.75rem)] -translate-x-1/2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1.2, duration: 0.6 }}
            >
              <motion.p
                className="font-sans text-[9px] sm:text-[10px] uppercase tracking-[0.2em] sm:tracking-[0.28em] text-center mb-3"
                style={{ color: "#8F7F6B" }}
                animate={prefersReducedMotion ? undefined : { opacity: [0.76, 1, 0.76] }}
                transition={
                  prefersReducedMotion
                    ? undefined
                    : { duration: 3.4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
                }
              >
                Pulsa para abrir
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  )
}
