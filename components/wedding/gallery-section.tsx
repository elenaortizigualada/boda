"use client"

import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const galleryImages = [
  { id: 1, title: "París, 2019" },
  { id: 2, title: "Costa Amalfitana" },
  { id: 3, title: "Londres" },
  { id: 4, title: "Venecia" },
  { id: 5, title: "Santorini" },
  { id: 6, title: "La pedida" },
]

export function GallerySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="gallery" className="scroll-mt-24 sm:scroll-mt-28 py-20 sm:py-32 lg:py-40 bg-background">
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
              Galería
            </p>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-light tracking-wide max-w-3xl">
            Momentos que atesoramos
          </h2>
        </motion.div>

        {/* Editorial grid layout */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
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
  const heightClass = index % 3 === 0 
    ? "aspect-[3/4]" 
    : index % 3 === 1 
    ? "aspect-square" 
    : "aspect-[4/5]"

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className={`relative overflow-hidden bg-secondary group cursor-pointer ${heightClass}`}
    >
      {/* Placeholder Content */}
      <div className="absolute inset-0 flex items-end p-6 sm:p-8">
        <div className="w-full">
          <p className="font-serif text-lg sm:text-xl font-light text-foreground/80 group-hover:text-foreground transition-colors duration-500">
            {image.title}
          </p>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/5 transition-colors duration-700" />
      
      {/* Corner accent on hover */}
      <div className="absolute top-6 right-6 w-8 h-8 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
        <span className="absolute top-0 right-0 w-full h-px bg-foreground/50" />
        <span className="absolute top-0 right-0 w-px h-full bg-foreground/50" />
      </div>
    </motion.div>
  )
}
