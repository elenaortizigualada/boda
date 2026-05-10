"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export function RSVPSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [attendance, setAttendance] = useState("yes")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
  }

  return (
    <section id="rsvp" className="scroll-mt-24 sm:scroll-mt-28 py-20 sm:py-32 lg:py-40 bg-foreground text-background">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Left column - Header */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8 }}
          >
            <p className="font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.22em] sm:tracking-[0.3em] text-background/50 mb-8">
              Confirmación
            </p>
            <h2 className="font-serif text-[2rem] sm:text-5xl md:text-6xl font-light tracking-wide mb-8">
              Esperamos contar contigo
            </h2>
            <p className="font-sans text-sm sm:text-base text-background/60 leading-relaxed mb-8">
              Queremos saber si podrás celebrar con nosotros.
              Por favor, responde antes del 1 de agosto de 2025.
            </p>
            <div className="hidden lg:block">
              <p className="font-serif text-2xl sm:text-3xl italic text-background/40">
                Elena & Fran
              </p>
            </div>
          </motion.div>

          {/* Right column - Form */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex items-center justify-center text-center py-20"
              >
                <div>
                  <p className="font-serif text-3xl sm:text-4xl font-light mb-6">Gracias</p>
                  <p className="font-sans text-sm text-background/60">
                    Hemos recibido tu respuesta.<br />
                    Nos encantará celebrarlo contigo.
                  </p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label
                      htmlFor="firstName"
                      className="font-sans text-[10px] uppercase tracking-[0.2em] text-background/50"
                    >
                      Nombre
                    </Label>
                    <Input
                      id="firstName"
                      required
                      className="bg-transparent border-background/20 focus:border-background text-background placeholder:text-background/30 h-14 text-base"
                    />
                  </div>
                  <div className="space-y-3">
                    <Label
                      htmlFor="lastName"
                      className="font-sans text-[10px] uppercase tracking-[0.2em] text-background/50"
                    >
                      Apellidos
                    </Label>
                    <Input
                      id="lastName"
                      required
                      className="bg-transparent border-background/20 focus:border-background text-background placeholder:text-background/30 h-14 text-base"
                    />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="email"
                    className="font-sans text-[10px] uppercase tracking-[0.2em] text-background/50"
                  >
                    Correo electrónico
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    className="bg-transparent border-background/20 focus:border-background text-background placeholder:text-background/30 h-14 text-base"
                  />
                </div>

                <div className="space-y-4">
                  <Label className="font-sans text-[10px] uppercase tracking-[0.2em] text-background/50 block">
                    ¿Asistirás?
                  </Label>
                  <RadioGroup
                    value={attendance}
                    onValueChange={setAttendance}
                    className="flex flex-col sm:flex-row gap-6 sm:gap-12"
                  >
                    <div className="flex items-center gap-4">
                      <RadioGroupItem value="yes" id="yes" className="w-5 h-5 border-background/30 text-background" />
                      <Label htmlFor="yes" className="font-serif text-lg cursor-pointer touch-manipulation text-background">
                        Sí, encantado
                      </Label>
                    </div>
                    <div className="flex items-center gap-4">
                      <RadioGroupItem value="no" id="no" className="w-5 h-5 border-background/30 text-background" />
                      <Label htmlFor="no" className="font-serif text-lg cursor-pointer touch-manipulation text-background">
                        No podré asistir
                      </Label>
                    </div>
                  </RadioGroup>
                </div>

                {attendance === "yes" && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="space-y-6"
                  >
                    <div className="space-y-3">
                      <Label
                        htmlFor="guests"
                        className="font-sans text-[10px] uppercase tracking-[0.2em] text-background/50"
                      >
                        Número de invitados
                      </Label>
                      <Input
                        id="guests"
                        type="number"
                        min="1"
                        max="5"
                        defaultValue="1"
                        className="bg-transparent border-background/20 focus:border-background text-background h-14 text-base w-full sm:max-w-32"
                      />
                    </div>

                    <div className="space-y-3">
                      <Label
                        htmlFor="dietary"
                        className="font-sans text-[10px] uppercase tracking-[0.2em] text-background/50"
                      >
                        Requisitos alimentarios
                      </Label>
                      <Textarea
                        id="dietary"
                        placeholder="Indícanos alergias o restricciones alimentarias..."
                        className="bg-transparent border-background/20 focus:border-background text-background placeholder:text-background/30 min-h-28 text-base"
                      />
                    </div>
                  </motion.div>
                )}

                <div className="space-y-3">
                  <Label
                    htmlFor="message"
                    className="font-sans text-[10px] uppercase tracking-[0.2em] text-background/50"
                  >
                    Mensaje (opcional)
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Comparte tus buenos deseos..."
                    className="bg-transparent border-background/20 focus:border-background text-background placeholder:text-background/30 min-h-32 text-base"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-5 border border-background text-background hover:bg-background hover:text-foreground transition-all duration-500 font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.12em] sm:tracking-[0.2em] touch-manipulation"
                >
                  Enviar respuesta
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
