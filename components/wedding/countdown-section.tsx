"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { WEDDING_CONFIG } from "@/lib/constants"
import { MOTION_CONFIG } from "@/lib/constants"


interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function calculateTimeLeft(): TimeLeft {
  const difference = +WEDDING_CONFIG.dateTime - +new Date()

  if (difference > 0) {
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }

  return { days: 0, hours: 0, minutes: 0, seconds: 0 }
}

export function CountdownSection() {
  return (
    <section className="bg-secondary pt-12 pb-5 sm:pt-18 sm:pb-8 lg:pt-24 lg:pb-12">
      <div className="container mx-auto container-mobile">
        <CountdownDisplay />
      </div>
    </section>
  )
}

export function CountdownDisplay({ overlay = false, showLabel = true }: { overlay?: boolean; showLabel?: boolean }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [mounted, setMounted] = useState(false)
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    setMounted(true)
    setTimeLeft(calculateTimeLeft())
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])


  const timeUnits = [
    { value: timeLeft.days, label: "Días" },
    { value: timeLeft.hours, label: "Horas" },
    { value: timeLeft.minutes, label: "Minutos" },
    { value: timeLeft.seconds, label: "Segundos" },
  ]

  return (
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: MOTION_CONFIG.duration.section, ease: MOTION_CONFIG.easing.premium }}
          className="text-center"
        >
          {showLabel && (
            <p className={`font-sans text-[10px] sm:text-[12px] uppercase tracking-[0.2em] sm:tracking-[0.28em] mb-7 sm:mb-10 ${overlay ? "text-white/75" : "text-muted-foreground"}`}>
              Cuenta atrás
            </p>
          )}

          <div className={`${overlay ? "max-w-xl" : "max-w-4xl"} grid grid-cols-4 gap-3 sm:gap-8 lg:gap-14 mx-auto [font-variant-numeric:tabular-nums]`}>
            {timeUnits.map((unit, index) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 14 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
                transition={{ duration: MOTION_CONFIG.duration.reveal, delay: index * MOTION_CONFIG.stagger.tight, ease: MOTION_CONFIG.easing.premium }}
                className="text-center"
              >
                <span className={`font-serif ${overlay ? "text-[clamp(2.1rem,7.5vw,5.8rem)]" : "text-[clamp(1.8rem,6.8vw,5.2rem)]"} font-light block mb-2 sm:mb-3 leading-[1.02] md:leading-[1.04] lg:leading-[1.06] ${overlay ? "text-white" : "text-foreground"}`}>
                  {mounted ? unit.value.toString().padStart(2, "0") : "--"}
                </span>
                <span className={`font-sans text-[9px] sm:text-[11px] uppercase tracking-[0.12em] sm:tracking-[0.24em] ${overlay ? "text-white/70" : "text-muted-foreground"}`}>
                  {unit.label}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
  )
}
