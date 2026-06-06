"use client"

import { motion, useInView } from "framer-motion"
import Image from "next/image"
import { useRef } from "react"
import { MOTION_CONFIG, WEDDING_CONFIG } from "@/lib/constants"

export function StorySection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="story" className="scroll-mt-24 sm:scroll-mt-28 section-mobile-relaxed bg-secondary">
      <div className="container mx-auto container-mobile">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: MOTION_CONFIG.duration.section, ease: MOTION_CONFIG.easing.premium }}
          className="mb-16 sm:mb-20 lg:mb-24"
        >
          <div className="flex items-center gap-5 mb-6">
            <span className="w-12 sm:w-20 h-px bg-foreground/20" />
            <p className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Nuestra historia
            </p>
          </div>
          <h2 className="font-serif text-[clamp(2rem,9vw,4.4rem)] font-light leading-[1.06] md:leading-[1.08] lg:leading-[1.1] tracking-wide max-w-3xl text-balance">
            De accenture al altar
          </h2>
        </motion.div>

        <div className="space-y-14 sm:space-y-16 lg:space-y-20">
          {WEDDING_CONFIG.storyMilestones.map((milestone, index) => (
            <StoryMilestone
              key={milestone.year + milestone.title}
              milestone={milestone}
              index={index}
              isLast={index === WEDDING_CONFIG.storyMilestones.length - 1}
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
  isLast,
}: {
  milestone: (typeof WEDDING_CONFIG.storyMilestones)[number]
  index: number
  isLast: boolean
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-60px" })
  const shortYear = /^\d{4}$/.test(milestone.year) ? milestone.year.slice(-2) : ".."
  const hasImages = milestone.images.length > 0

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: MOTION_CONFIG.duration.reveal, delay: index * 0.04, ease: MOTION_CONFIG.easing.premium }}
      className="relative"
    >
      <div className="space-y-6 sm:space-y-8">
          <div className="rounded-2xl border border-foreground/12 bg-background/90 backdrop-blur-[1px] p-5 sm:p-7 lg:p-8 shadow-[0_12px_30px_-22px_rgba(0,0,0,0.38)]">
          <div className="flex items-start gap-4 sm:gap-6">
            <span className="font-serif text-[clamp(2.2rem,7.6vw,4.6rem)] font-light text-foreground/12 leading-none select-none shrink-0 mt-1">
              {shortYear}
            </span>
            <div className="flex-1">
                <p className="font-sans text-[10px] max-[390px]:text-[11px] uppercase tracking-[0.22em] text-foreground/65 mb-2">
                {milestone.year}
              </p>
                <h3 className="font-serif text-[clamp(1.45rem,5.2vw,2rem)] font-light mb-3 leading-[1.12] text-foreground text-balance">
                {milestone.title}
              </h3>
                <p className="font-sans text-[15px] max-[390px]:text-[16px] sm:text-base text-foreground/80 leading-relaxed text-balance">
                {milestone.description}
              </p>
            </div>
          </div>
        </div>

        {hasImages && <StoryGallery images={milestone.images} title={milestone.title} className="mt-0" />}
      </div>

      {!isLast && <div className="mt-12 sm:mt-14 h-px bg-foreground/10" />}
    </motion.article>
  )
}

function StoryGallery({
  images,
  title,
  className,
}: {
  images: readonly string[]
  title: string
  className?: string
}) {
  if (images.length === 0) return null

  const spacing = className ?? "mt-7 sm:mt-8"

  if (images.length === 1) {
    return (
      <div className={`relative z-[21] ${spacing} rounded-xl border border-foreground/10 bg-secondary/30 p-2 sm:p-3`}>
        <StoryImage
          src={images[0]}
          alt={title}
          sizes="(max-width: 768px) 92vw, (max-width: 1200px) 56vw, 760px"
          className="aspect-[3/4] sm:aspect-[5/6]"
        />
      </div>
    )
  }

  if (images.length === 2) {
    return (
      <div className={`relative z-[21] ${spacing} flex gap-3 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-1 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible`}>
        {images.map((src, i) => (
          <StoryImage
            key={src}
            src={src}
            alt={`${title} - foto ${i + 1}`}
            sizes="(max-width: 768px) 92vw, (max-width: 1200px) 27vw, 360px"
            className="min-w-[72vw] snap-center aspect-[4/5] sm:min-w-0"
          />
        ))}
      </div>
    )
  }

  return (
    <div className={`relative z-[21] ${spacing} flex gap-3 overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-1 sm:grid sm:grid-cols-2 sm:gap-4 sm:overflow-visible`}>
      {images.map((src, i) => (
        <StoryImage
          key={src}
          src={src}
          alt={`${title} - foto ${i + 1}`}
          sizes="(max-width: 640px) 74vw, (max-width: 1200px) 24vw, 280px"
          className="min-w-[66vw] snap-center aspect-[4/5] sm:min-w-0"
        />
      ))}
    </div>
  )
}

function StoryImage({
  src,
  alt,
  sizes,
  className,
}: {
  src: string
  alt: string
  sizes: string
  className: string
}) {
  return (
    <div className={`relative overflow-hidden rounded-lg border border-foreground/10 bg-secondary/35 ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        className="object-cover"
      />
    </div>
  )
}
