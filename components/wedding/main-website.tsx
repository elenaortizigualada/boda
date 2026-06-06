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
import { RSVPSection } from "./rsvp-section"
import { FAQSection } from "./faq-section"
import { Footer } from "./footer"

interface MainWebsiteProps {
  isVisible: boolean
}

export function MainWebsite({ isVisible }: MainWebsiteProps) {
  return (
    <>
      <Navigation isVisible={isVisible} />
      <motion.div
        initial={false}
        animate={
          isVisible
            ? { opacity: 1, y: 0, scale: 1, filter: "blur(0px) saturate(1)" }
            : { opacity: 0, y: 12, scale: 0.992, filter: "blur(6px) saturate(0.96)" }
        }
        transition={{ duration: isVisible ? 1.02 : 0.32, ease: MOTION_CONFIG.easing.premium }}
        style={{ pointerEvents: isVisible ? "auto" : "none" }}
        aria-hidden={!isVisible}
      >
        <motion.div
          aria-hidden="true"
          className="page-grain"
          initial={false}
          animate={{ opacity: isVisible ? 1 : 0 }}
          transition={{ duration: isVisible ? 1.1 : 0.2, ease: MOTION_CONFIG.easing.smooth }}
        />
        <main id="main-content" className="min-h-screen" tabIndex={-1}>
          <HeroSection />
          <CountdownSection />
          <StorySection />
          <DetailsSection />
          <TimelineSection />
          <VenueSection />
          <RSVPSection />
          <FAQSection />
          <Footer />
        </main>
      </motion.div>
    </>
  )
}
