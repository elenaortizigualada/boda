"use client"

import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"
import { MOTION_CONFIG } from "@/lib/constants"

const storyMilestones = [
  {
    year: "2019",
    title: "Nuestro Primer Encuentro",
    description:
      "Nos conocimos en la inauguración de una galería en París. Fran derramó champán sobre el vestido favorito de Elena, y el resto es historia.",
    image: "/images/story/2019.jpeg",
  },
  {
    year: "2020",
    title: "Primer viaje juntos",
    description:
      "Nuestra primera aventura nos llevó a la Costa Amalfitana. Entre limoneros y cenas al atardecer, supimos que era algo especial.",
    image: "/images/story/2020.jpeg",
  },
  {
    year: "2022",
    title: "Nos Fuimos a Vivir Juntos",
    description:
      "Encontramos el piso de nuestros sueños en Londres, con un pequeño jardín y espacio para los libros de Elena y los vinilos de Fran.",
    image: "/images/story/2022.jpeg",
  },
  {
    year: "2024",
    title: "La pedida",
    description:
      "En una tarde tranquila en Santorini, frente a la caldera al atardecer, Fran se arrodilló. Entre lágrimas de felicidad, Elena dijo que sí.",
    image: "/images/story/2024.jpeg",
  },
]

export function StorySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="story" className="scroll-mt-24 sm:scroll-mt-28 section-mobile bg-secondary">
      <div className="container mx-auto container-mobile">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: MOTION_CONFIG.duration.section, ease: MOTION_CONFIG.easing.premium }}
          className="mb-12 sm:mb-18 lg:mb-28"
        >
          <div className="flex items-center gap-5 mb-6">
            <span className="w-12 sm:w-20 h-px bg-foreground/20" />
            <p className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Nuestra historia
            </p>
          </div>
          <h2 className="font-serif text-[clamp(2rem,9vw,4.4rem)] font-light leading-[1.06] md:leading-[1.08] lg:leading-[1.1] tracking-wide max-w-3xl text-balance">
            Los momentos que nos trajeron hasta aquí
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-12 lg:gap-x-16 lg:gap-y-20">
          {storyMilestones.map((milestone, index) => (
            <StoryMilestone
              key={milestone.year}
              milestone={milestone}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function StoryMilestone({
  milestone,
  index,
}: {
  milestone: (typeof storyMilestones)[0]
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: MOTION_CONFIG.duration.reveal, delay: index * MOTION_CONFIG.stagger.tight, ease: MOTION_CONFIG.easing.premium }}
      className="group"
    >
      {/* Image */}
      <div className="relative aspect-[4/5] overflow-hidden mb-6 sm:mb-8">
        <Image
          src={milestone.image} 
          alt={milestone.title}
          fill
          sizes="(max-width: 768px) 90vw, (max-width: 1200px) 42vw, 34vw"
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
        />
      </div>

      {/* Content */}
      <div className="flex items-start gap-6 sm:gap-8">
        <span className="font-serif text-5xl sm:text-6xl lg:text-7xl font-light text-muted-foreground/30 leading-none">
          {milestone.year.slice(-2)}
        </span>
        <div className="flex-1 pt-2 sm:pt-4">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-muted-foreground mb-3">
            {milestone.year}
          </p>
          <h3 className="font-serif text-[clamp(1.6rem,5.6vw,2.2rem)] font-light mb-3 leading-[1.12] md:leading-[1.15] lg:leading-[1.2] group-hover:translate-x-[3px] transition-transform duration-300 ease-out">
            {milestone.title}
          </h3>
          <p className="font-sans text-[15px] sm:text-base text-muted-foreground leading-[1.6] md:leading-[1.65] lg:leading-relaxed max-w-[58ch]">
            {milestone.description}
          </p>
        </div>
      </div>
    </motion.article>
  )
}
