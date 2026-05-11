"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

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
    <section id="story" className="scroll-mt-24 sm:scroll-mt-28 py-20 sm:py-32 lg:py-40 bg-secondary">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <motion.div
          ref={ref}
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 1 }}
          className="mb-20 sm:mb-28 lg:mb-36"
        >
          <div className="flex items-center gap-6 mb-8">
            <span className="w-12 sm:w-20 h-px bg-foreground/20" />
            <p className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.3em] text-muted-foreground">
              Nuestra historia
            </p>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-wide max-w-3xl">
            Una historia de amor escrita en las estrellas
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-x-20 lg:gap-y-24">
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
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay: index * 0.15 }}
      className="group"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden mb-6 sm:mb-8">
        <img 
          src={milestone.image} 
          alt={milestone.title}
          className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
      </div>

      {/* Content */}
      <div className="flex items-start gap-6 sm:gap-8">
        <span className="font-serif text-6xl sm:text-7xl lg:text-8xl font-light text-muted-foreground/30 leading-none">
          {milestone.year.slice(-2)}
        </span>
        <div className="flex-1 pt-2 sm:pt-4">
          <p className="font-sans text-[10px] uppercase tracking-[0.3em] text-muted-foreground mb-3">
            {milestone.year}
          </p>
          <h3 className="font-serif text-2xl sm:text-3xl font-light mb-4 group-hover:translate-x-2 transition-transform duration-500">
            {milestone.title}
          </h3>
          <p className="font-sans text-sm sm:text-base text-muted-foreground leading-relaxed max-w-md">
            {milestone.description}
          </p>
        </div>
      </div>
    </motion.article>
  )
}
