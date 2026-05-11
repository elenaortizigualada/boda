"use client"

import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"
import { MOTION_CONFIG } from "@/lib/constants"

const galleryImages = [
  { id: 1, image: "/images/gallery/atardecer.jpeg" },
  { id: 2, image: "/images/gallery/toris.jpeg" },
  { id: 3, image: "/images/gallery/bambu.jpeg" },
  { id: 4, image: "/images/gallery/boda.JPG" },
  { id: 5, image: "/images/gallery/cascada.jpeg" },
  { id: 6, image: "/images/gallery/palmera.jpg" },
  { id: 7, image: "/images/gallery/playa.jpeg" },
  { id: 8, image: "/images/gallery/sombrilla.jpeg" },
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
          className="mb-16 sm:mb-20 lg:mb-32"
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

        {/* Clean, uniform gallery grid - professional and simple */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6">
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

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
      transition={{ duration: MOTION_CONFIG.duration.reveal, delay: index * MOTION_CONFIG.stagger.tight, ease: MOTION_CONFIG.easing.premium }}
      className="relative z-30 overflow-hidden bg-secondary group aspect-square"
    >
      {/* Background Image with refined hover */}
      <Image
        src={image.image} 
        alt={`Gallery item ${index + 1}`}
        fill
        sizes="(max-width: 640px) 92vw, (max-width: 1024px) 48vw, 24vw"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.02]"
        quality={90}
      />

      {/* Subtle border frame */}
      <div className="absolute inset-0 border border-foreground/8 pointer-events-none" />

      {/* Refined overlay on active */}
      <div className="absolute inset-0 bg-foreground/0 group-active:bg-foreground/5 transition-colors duration-300 ease-out" />
    </motion.div>
  )
}
