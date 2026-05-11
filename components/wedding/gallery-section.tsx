"use client"

import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"
import { MOTION_CONFIG } from "@/lib/constants"

const galleryImages = [
  { id: 1, title: "París, 2019", image: "/images/gallery/paris-2019.jpeg" },
  { id: 2, title: "Costa Amalfitana", image: "/images/gallery/amalfi-coast.jpeg" },
  { id: 3, title: "Londres", image: "/images/gallery/london.jpeg" },
  { id: 4, title: "Venecia", image: "/images/gallery/venice.jpeg" },
  { id: 5, title: "Santorini", image: "/images/gallery/santorini.jpeg" },
  { id: 6, title: "La pedida", image: "/images/gallery/proposal.jpeg" },
]

export function GallerySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="gallery" className="scroll-mt-24 sm:scroll-mt-28 section-mobile bg-background">
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
              Galería
            </p>
          </div>
          <h2 className="font-serif text-[clamp(2rem,9vw,4.4rem)] font-light leading-[1.06] tracking-wide max-w-3xl text-balance">
            Momentos que atesoramos
          </h2>
        </motion.div>

        {/* Editorial grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6">
          {galleryImages.map((image, index) => (
            <GalleryImage key={image.id} image={image} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

function GalleryImage({
  image,
  index,
}: {
  image: (typeof galleryImages)[0]
  index: number
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })

  // Create varied heights for editorial feel
  const heightClass = index % 3 === 1 ? "aspect-square" : "aspect-[4/5]"

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 18 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: MOTION_CONFIG.duration.reveal, delay: index * MOTION_CONFIG.stagger.tight, ease: MOTION_CONFIG.easing.premium }}
      className={`relative overflow-hidden bg-secondary group ${heightClass}`}
    >
      {/* Background Image */}
      <Image
        src={image.image} 
        alt={image.title}
        fill
        sizes="(max-width: 768px) 92vw, (max-width: 1200px) 48vw, 32vw"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />

      {/* Gradient overlay for text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

      {/* Text Overlay */}
      <div className="absolute inset-0 flex items-end p-6 sm:p-8">
        <div className="w-full">
          <p className="font-serif text-[clamp(1.1rem,4.6vw,1.45rem)] leading-[1.2] font-light text-white">
            {image.title}
          </p>
        </div>
      </div>

      <div className="absolute inset-0 bg-foreground/0 group-active:bg-foreground/10 transition-colors duration-300 ease-out" />
    </motion.div>
  )
}
