"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { useForm, ValidationError } from "@formspree/react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useGuests, findGuestByCode, findGuestByName } from "@/hooks/use-guests"
import { WEDDING_CONFIG, MESSAGES } from "@/lib/constants"


export function RSVPSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const { guests } = useGuests()
  const [state, handleSubmit] = useForm(WEDDING_CONFIG.formspree.id)
  const [attendance, setAttendance] = useState("yes")
  const [guestIdentifier, setGuestIdentifier] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")
  const [email, setEmail] = useState("")

  // Pre-llenar datos del invitado
  useEffect(() => {
    if (typeof window === "undefined" || guests.length === 0) return

    const urlParams = new URLSearchParams(window.location.search)
    const code = urlParams.get("code")
    const guestParam = urlParams.get("guest")

    if (code) {
      setGuestIdentifier(`Code: ${code}`)
      const guest = findGuestByCode(guests, code)
      if (guest) {
        const [fName, ...lName] = guest.name.split(" ")
        setFirstName(fName)
        setLastName(lName.join(" "))
        setEmail(guest.email)
      }
    } else if (guestParam) {
      const guestName = guestParam.replace(/\+/g, " ")
      setGuestIdentifier(guestName)
      const guest = findGuestByName(guests, guestName)
      if (guest) {
        const [fName, ...lName] = guest.name.split(" ")
        setFirstName(fName)
        setLastName(lName.join(" "))
        setEmail(guest.email)
      }
    }
  }, [guests])

  return (
    <section id="rsvp" className="scroll-mt-24 sm:scroll-mt-28 section-rhythm bg-secondary text-foreground">
      <div className="container mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20">
          {/* Left column - Header */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.8 }}
          >
            <p className="typo-eyebrow mb-6">
              Confirmación
            </p>
            <h2 className="typo-title mb-6 max-w-2xl">
              Esperamos contar contigo
            </h2>
            <p className="typo-body text-muted-foreground mb-8 max-w-[58ch]">
              Queremos saber si podrás celebrar con nosotros.
              Por favor, responde antes del 1 de diciembre de 2026.
            </p>
            <div className="hidden lg:block">
              <p className="font-serif text-[clamp(1.35rem,1.1rem+0.9vw,2rem)] italic text-muted-foreground">
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
            {state.succeeded ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex items-center justify-center text-center py-20"
              >
                <div>
                    <p className="font-serif text-3xl sm:text-4xl font-light mb-6">{MESSAGES.rsvp.successTitle}</p>
                  <p className="font-sans text-sm text-background/80">
                      {MESSAGES.rsvp.successMessage.split('\n').map((line, i) => (
                        <span key={i}>
                          {line}
                          {i === 0 && <br />}
                        </span>
                      ))}
                  </p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 border border-border/70 bg-background/80 p-6 sm:p-8 lg:p-10">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label
                      htmlFor="firstName"
                      className="typo-meta text-muted-foreground"
                    >
                      Nombre
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="bg-transparent border-border focus:border-foreground text-foreground placeholder:text-muted-foreground/50 h-14 text-base"
                    />
                    <ValidationError field="firstName" errors={state.errors} />
                  </div>
                  <div className="space-y-3">
                    <Label
                      htmlFor="lastName"
                      className="typo-meta text-muted-foreground"
                    >
                      Apellidos
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="bg-transparent border-border focus:border-foreground text-foreground placeholder:text-muted-foreground/50 h-14 text-base"
                    />
                    <ValidationError field="lastName" errors={state.errors} />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="email"
                    className="typo-meta text-muted-foreground"
                  >
                    Correo electrónico
                  </Label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="bg-transparent border-border focus:border-foreground text-foreground placeholder:text-muted-foreground/50 h-14 text-base"
                  />
                  <ValidationError field="email" errors={state.errors} />
                </div>

                <div className="space-y-4">
                  <Label className="typo-meta text-muted-foreground block">
                    ¿Asistirás?
                  </Label>
                  <RadioGroup
                    value={attendance}
                    onValueChange={setAttendance}
                    className="flex flex-col sm:flex-row gap-6 sm:gap-12"
                  >
                    <div className="flex items-center gap-4">
                      <RadioGroupItem value="yes" id="yes" className="w-5 h-5 border-foreground/40 text-foreground" />
                      <Label htmlFor="yes" className="font-serif text-[clamp(1.1rem,1rem+0.4vw,1.35rem)] cursor-pointer touch-manipulation text-foreground">
                        Sí, encantado
                      </Label>
                    </div>
                    <div className="flex items-center gap-4">
                      <RadioGroupItem value="no" id="no" className="w-5 h-5 border-foreground/40 text-foreground" />
                      <Label htmlFor="no" className="font-serif text-[clamp(1.1rem,1rem+0.4vw,1.35rem)] cursor-pointer touch-manipulation text-foreground">
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
                        className="typo-meta text-muted-foreground"
                      >
                        Número de invitados
                      </Label>
                      <Input
                        id="guests"
                        name="guests"
                        type="number"
                        min="1"
                        max="5"
                        defaultValue="1"
                        className="bg-transparent border-border focus:border-foreground text-foreground h-14 text-base w-full sm:max-w-32"
                      />
                      <ValidationError field="guests" errors={state.errors} />
                    </div>

                    <div className="space-y-3">
                      <Label
                        htmlFor="dietary"
                        className="typo-meta text-muted-foreground"
                      >
                        Requisitos alimentarios
                      </Label>
                      <Textarea
                        id="dietary"
                        name="dietary"
                        placeholder="Indícanos alergias o restricciones alimentarias..."
                        className="bg-transparent border-border focus:border-foreground text-foreground placeholder:text-muted-foreground/50 min-h-28 text-base"
                      />
                      <ValidationError field="dietary" errors={state.errors} />
                    </div>
                  </motion.div>
                )}

                <div className="space-y-3">
                  <Label
                    htmlFor="message"
                    className="typo-meta text-muted-foreground"
                  >
                    Mensaje (opcional)
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Comparte tus buenos deseos..."
                    className="bg-transparent border-border focus:border-foreground text-foreground placeholder:text-muted-foreground/50 min-h-32 text-base"
                  />
                  <ValidationError field="message" errors={state.errors} />
                </div>

                {/* Formspree hidden fields */}
                <input type="hidden" name="_subject" value={WEDDING_CONFIG.formspree.subject} />
                <input type="hidden" name="_replyto" value={WEDDING_CONFIG.formspree.replyTo} />
                <input type="hidden" name="attendance" value={attendance} />
                {guestIdentifier && <input type="hidden" name="guestIdentifier" value={guestIdentifier} />}

                <button
                  type="submit"
                  disabled={state.submitting}
                  className="w-full py-5 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-colors duration-400 font-sans text-[11px] uppercase tracking-[0.16em] touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {state.submitting ? "Enviando..." : "Enviar respuesta"}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
