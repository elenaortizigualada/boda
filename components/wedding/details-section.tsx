"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { MOTION_CONFIG, WEDDING_CONFIG } from "@/lib/constants"

const schedule: Array<{ title: string; time: string; iconPosition: string; description: string; mapUrl?: string }> = [
  { title: "Ceremonia", time: "12:00", iconPosition: "0% 0%", description: "Parroquia Santa María la Mayor", mapUrl: WEDDING_CONFIG.ceremony.mapUrl },
  { title: "Banquete", time: "14:30", iconPosition: "100% 0%", description: "Jardines del Negralejo", mapUrl: WEDDING_CONFIG.reception.mapUrl },
  { title: "Baile", time: "18:00", iconPosition: "0% 100%", description: "Comienza la fiesta" },
  { title: "Nos despedimos", time: "00:00", iconPosition: "100% 100%", description: "Hasta la próxima aventura" },
]

export function DetailsSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="details" className="scroll-mt-24 sm:scroll-mt-28 section-mobile-relaxed bg-background">
      <div className="container mx-auto container-mobile">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: MOTION_CONFIG.duration.section, ease: MOTION_CONFIG.easing.premium }}
          className="mb-14 sm:mb-20 lg:mb-24"
        >
          <div className="flex items-center gap-5 mb-6">
            <span className="w-12 sm:w-20 h-px line-gold-bg" />
            <p className="font-sans text-[10px] sm:text-[12px] uppercase tracking-[0.2em] sm:tracking-[0.28em] text-muted-foreground">
              El gran día
            </p>
          </div>
          <h2 className="font-serif text-[clamp(2rem,9vw,4.4rem)] font-light leading-[1.06] tracking-wide max-w-3xl text-balance">
            17.04.2027
          </h2>
        </motion.div>

        <div className="relative mx-auto max-w-4xl py-2 sm:py-4">
          <div className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 bg-foreground/20" aria-hidden="true" />
          <div className="space-y-12 sm:space-y-16">
            {schedule.map((event, index) => (
              <ScheduleEvent key={event.title} event={event} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

function ScheduleEvent({
  event,
  index,
}: {
  event: (typeof schedule)[number]
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const isRight = index % 2 === 1

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 14 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
      transition={{ duration: MOTION_CONFIG.duration.reveal, delay: index * MOTION_CONFIG.stagger.tight, ease: MOTION_CONFIG.easing.premium }}
      className="relative grid grid-cols-[1fr_3.25rem_1fr] gap-3 sm:gap-8"
    >
      <div className={`relative z-10 flex items-center ${isRight ? "col-start-3 text-left" : "col-start-1 row-start-1 text-right"}`}>
        <div className="w-full">
        <p className="font-serif text-[clamp(1.8rem,6vw,3rem)] font-light leading-none text-foreground">{event.time}</p>
        <h3 className="mt-2 font-serif text-[clamp(1.45rem,4vw,2rem)] font-light leading-tight">{event.title}</h3>
        <p className="mt-2 font-sans text-sm text-muted-foreground">{event.description}</p>
        {event.mapUrl && (
          <a
            href={event.mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex min-h-11 items-center font-sans text-[10px] uppercase tracking-[0.16em] text-foreground underline decoration-foreground/35 underline-offset-4 transition-opacity hover:opacity-60"
          >
            Ver ubicación
          </a>
        )}
        </div>
      </div>
      <div
        className="relative z-10 col-start-2 row-start-1 flex h-14 w-14 self-center items-center justify-center justify-self-center sm:h-20 sm:w-20"
        aria-hidden="true"
        style={{
          backgroundImage: "url(/images/wedding-timeline-watercolor.png)",
          backgroundSize: "200% 200%",
          backgroundPosition: event.iconPosition,
          backgroundRepeat: "no-repeat",
        }}
      />
    </motion.article>
  )
}
