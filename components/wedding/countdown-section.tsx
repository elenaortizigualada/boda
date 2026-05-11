"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { WEDDING_CONFIG } from "@/lib/constants"


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
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
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
    <section className="py-20 sm:py-32 lg:py-40 bg-secondary">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
          className="text-center"
        >
          <p className="font-sans text-[11px] sm:text-[12px] uppercase tracking-[0.22em] sm:tracking-[0.3em] text-muted-foreground mb-16 sm:mb-20">
            Cuenta atrás
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 lg:gap-16 max-w-4xl mx-auto mb-16 sm:mb-20">
            {timeUnits.map((unit, index) => (
              <motion.div
                key={unit.label}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center"
              >
                <span className="font-serif text-3xl sm:text-6xl md:text-7xl lg:text-8xl font-light text-foreground block mb-4">
                  {unit.value.toString().padStart(2, "0")}
                </span>
                <span className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.22em] sm:tracking-[0.3em] text-muted-foreground">
                  {unit.label}
                </span>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="font-serif text-xl sm:text-3xl md:text-4xl font-light italic text-muted-foreground"
          >
            Hasta que empiece nuestro para siempre
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
