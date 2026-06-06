"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import type { KeyboardEvent as ReactKeyboardEvent } from "react"
import { Plus } from "lucide-react"
import { MOTION_CONFIG, WEDDING_CONFIG } from "@/lib/constants"

export function FAQSection() {
  const ref = useRef(null)
  const questionButtonRefs = useRef<Array<HTMLButtonElement | null>>([])
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const handleQuestionKeyDown = (index: number, event: ReactKeyboardEvent<HTMLButtonElement>) => {
    const total = WEDDING_CONFIG.faqItems.length

    if (event.key === "ArrowDown") {
      event.preventDefault()
      const nextIndex = (index + 1) % total
      questionButtonRefs.current[nextIndex]?.focus()
    }

    if (event.key === "ArrowUp") {
      event.preventDefault()
      const previousIndex = (index - 1 + total) % total
      questionButtonRefs.current[previousIndex]?.focus()
    }

    if (event.key === "Home") {
      event.preventDefault()
      questionButtonRefs.current[0]?.focus()
    }

    if (event.key === "End") {
      event.preventDefault()
      questionButtonRefs.current[total - 1]?.focus()
    }
  }

  return (
    <section id="faq" className="scroll-mt-24 sm:scroll-mt-28 section-mobile-relaxed section-divider-top bg-secondary">
      <div className="container mx-auto container-mobile">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: MOTION_CONFIG.duration.section, ease: MOTION_CONFIG.easing.premium }}
          className="mb-12 sm:mb-18 lg:mb-28"
        >
          <div className="flex items-center gap-5 mb-6">
            <span className="w-12 sm:w-20 h-px line-gold-bg" />
            <p className="font-sans text-[10px] sm:text-[12px] uppercase tracking-[0.2em] sm:tracking-[0.28em] text-muted-foreground">
              Preguntas
            </p>
          </div>
          <h2 className="font-serif text-[clamp(2rem,9vw,4.4rem)] font-light leading-[1.06] tracking-wide max-w-3xl text-balance">
            Preguntas frecuentes
          </h2>
        </motion.div>

        <div className="max-w-3xl mx-auto">
          {WEDDING_CONFIG.faqItems.map((faq, index) => (
            <FAQItem
              key={faq.question}
              faq={faq}
              index={index}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
              onKeyDown={(event) => handleQuestionKeyDown(index, event)}
              buttonRef={(element) => {
                questionButtonRefs.current[index] = element
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
  onKeyDown,
  buttonRef,
}: {
  faq: (typeof WEDDING_CONFIG.faqItems)[number]
  index: number
  isOpen: boolean
  onToggle: () => void
  onKeyDown: (event: ReactKeyboardEvent<HTMLButtonElement>) => void
  buttonRef: (element: HTMLButtonElement | null) => void
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-50px" })
  const contentId = `faq-answer-${index}`
  const buttonId = `faq-question-${index}`

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
      transition={{ duration: MOTION_CONFIG.duration.reveal, delay: index * MOTION_CONFIG.stagger.tight, ease: MOTION_CONFIG.easing.premium }}
      className="border-b line-gold-border"
    >
      <h3 className="font-serif">
        <button
          onClick={onToggle}
          id={buttonId}
          aria-expanded={isOpen}
          aria-controls={contentId}
          onKeyDown={onKeyDown}
          ref={buttonRef}
          className="tap-target w-full py-7 sm:py-9 flex items-start justify-between gap-6 text-left touch-manipulation group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-foreground/40 focus-visible:ring-offset-2 focus-visible:ring-offset-secondary"
        >
          <span className="text-[clamp(1.25rem,5vw,1.8rem)] leading-[1.15] md:leading-[1.24] lg:leading-[1.33] font-light group-hover:translate-x-1 transition-transform duration-300 ease-out text-balance">
            {faq.question}
          </span>
          <span className={`flex-shrink-0 mt-1 transition-transform duration-300 ease-out ${isOpen ? "rotate-45" : ""}`}>
            <Plus className="w-5 h-5 text-muted-foreground" />
          </span>
        </button>
      </h3>
      <motion.div
        id={contentId}
        role="region"
        aria-labelledby={buttonId}
        initial={false}
        animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
        transition={{ duration: MOTION_CONFIG.duration.reveal, ease: MOTION_CONFIG.easing.premium }}
        className="overflow-hidden"
      >
        <p className="font-sans text-[15px] sm:text-base text-muted-foreground leading-relaxed pb-8 sm:pb-10 pr-2 sm:pr-12 max-w-[60ch]">
          {faq.answer}
        </p>
      </motion.div>
    </motion.div>
  )
}
