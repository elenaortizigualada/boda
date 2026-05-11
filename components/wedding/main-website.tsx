"use client"

import { motion } from "framer-motion"
import { MOTION_CONFIG } from "@/lib/constants"
import { Navigation } from "./navigation"
import { HeroSection } from "./hero-section"
import { StorySection } from "./story-section"
import { DetailsSection } from "./details-section"
import { VenueSection } from "./venue-section"
import { TimelineSection } from "./timeline-section"
import { CountdownSection } from "./countdown-section"
import { GallerySection } from "./gallery-section"
import { RSVPSection } from "./rsvp-section"
import { FAQSection } from "./faq-section"
import { Footer } from "./footer"

interface MainWebsiteProps {
  isVisible: boolean
}

export function MainWebsite({ isVisible }: MainWebsiteProps) {
  if (!isVisible) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: MOTION_CONFIG.duration.page, ease: MOTION_CONFIG.easing.premium }}
    >
      <main id="main-content" className="min-h-screen" tabIndex={-1}>
        <Navigation />
        <HeroSection />
        <StorySection />
        <DetailsSection />
        <VenueSection />
        <TimelineSection />
        <CountdownSection />
        <GallerySection />
        <RSVPSection />
        <FAQSection />
        <Footer />
      </main>
    </motion.div>
  )
}
