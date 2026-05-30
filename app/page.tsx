"use client"

import { useState, useEffect, Suspense } from "react"
import { EnvelopeIntro } from "@/components/wedding/envelope-intro"
import { MainWebsite } from "@/components/wedding/main-website"

function WeddingContent() {
  const [showMainSite, setShowMainSite] = useState(false)
  const [showIntro, setShowIntro] = useState(true)

  // Desactivar scroll restoration del navegador para que la página
  // siempre empiece desde arriba, independientemente del scroll al refrescar
  useEffect(() => {
    if (typeof window !== "undefined" && "scrollRestoration" in history) {
      history.scrollRestoration = "manual"
    }
    window.scrollTo(0, 0)
  }, [])

  const handleRevealMain = () => {
    window.scrollTo(0, 0)
    setShowMainSite(true)
  }

  return (
    <>
      {showIntro && (
        <EnvelopeIntro
          onRevealMain={handleRevealMain}
          onComplete={() => setShowIntro(false)}
        />
      )}
      <MainWebsite isVisible={showMainSite} />
    </>
  )
}

export default function WeddingPage() {
  return (
    <Suspense fallback={
      <div 
        className="fixed inset-0 flex items-center justify-center"
        style={{ background: "#F6F3EE" }}
      >
        <div 
          className="w-1 h-1 rounded-full animate-pulse"
          style={{ background: "#C9B896" }}
        />
      </div>
    }>
      <WeddingContent />
    </Suspense>
  )
}
