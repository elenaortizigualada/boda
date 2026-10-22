"use client"

import { RSVPSection } from "@/components/wedding/rsvp-section"
import { X } from "lucide-react"
import { useRouter } from "next/navigation"

export default function RSVPPage() {
  const router = useRouter()

  return (
    <main className="relative min-h-screen bg-background">
      <button
        type="button"
        onClick={() => router.back()}
        aria-label="Volver a la página principal"
        className="tap-target fixed right-5 top-5 z-50 inline-flex items-center justify-center text-foreground/70 transition-colors hover:text-foreground"
      >
        <X className="h-7 w-7" strokeWidth={1.4} />
      </button>
      <RSVPSection />
    </main>
  )
}
