"use client"

import { motion, useInView } from "framer-motion"
import { useRef, useState, useEffect } from "react"
import { useForm, ValidationError } from "@formspree/react"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useGuests, findGuestByCode, findGuestByName } from "@/hooks/use-guests"
import { WEDDING_CONFIG, MESSAGES, MOTION_CONFIG } from "@/lib/constants"


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
    <section id="rsvp" className="scroll-mt-24 sm:scroll-mt-28 section-mobile bg-foreground text-background invitation-texture">
      <div className="container mx-auto container-mobile">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-22">
          {/* Left column - Header */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: MOTION_CONFIG.duration.reveal, ease: MOTION_CONFIG.easing.premium }}
          >
            <p className="font-sans text-[10px] sm:text-[12px] uppercase tracking-[0.2em] sm:tracking-[0.28em] text-background/75 mb-6">
              Confirmación
            </p>
            <h2 className="font-serif text-[clamp(2rem,9vw,4.2rem)] font-light leading-[1.07] tracking-wide mb-6 text-balance">
              Esperamos contar contigo
            </h2>
            <p className="font-sans text-[15px] sm:text-base text-background/82 leading-relaxed mb-8 max-w-[58ch]">
              Queremos saber si podrás celebrar con nosotros.
              {` ${MESSAGES.rsvp.deadline}`}
            </p>
            <div className="hidden lg:block">
              <p className="font-serif text-2xl sm:text-3xl italic text-background/65">
                {WEDDING_CONFIG.couple.weddingName}
              </p>
            </div>
          </motion.div>

          {/* Right column - Form */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: MOTION_CONFIG.duration.reveal, delay: MOTION_CONFIG.stagger.medium, ease: MOTION_CONFIG.easing.premium }}
          >
            {state.succeeded ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex items-center justify-center text-center py-20"
              >
                <div>
                  <p className="font-serif text-3xl sm:text-4xl font-light mb-5">{MESSAGES.rsvp.successTitle}</p>
                  <p className="font-sans text-sm text-background/80 leading-relaxed">
                    {MESSAGES.rsvp.successMessage.split("\n").map((line, i) => (
                      <span key={i}>
                        {line}
                        {i === 0 && <br />}
                      </span>
                    ))}
                  </p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6 sm:space-y-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label
                      htmlFor="firstName"
                      className="font-sans text-[10px] uppercase tracking-[0.2em] text-background/75"
                    >
                      Nombre
                    </Label>
                    <Input
                      id="firstName"
                      name="firstName"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                      className="bg-transparent border-background/25 focus:border-background text-background placeholder:text-background/30 h-12 sm:h-14 text-base transition-colors duration-300 ease-out"
                    />
                    <ValidationError field="firstName" errors={state.errors} />
                  </div>
                  <div className="space-y-3">
                    <Label
                      htmlFor="lastName"
                      className="font-sans text-[10px] uppercase tracking-[0.2em] text-background/75"
                    >
                      Apellidos
                    </Label>
                    <Input
                      id="lastName"
                      name="lastName"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                      className="bg-transparent border-background/25 focus:border-background text-background placeholder:text-background/30 h-12 sm:h-14 text-base transition-colors duration-300 ease-out"
                    />
                    <ValidationError field="lastName" errors={state.errors} />
                  </div>
                </div>

                <div className="space-y-3">
                  <Label
                    htmlFor="email"
                    className="font-sans text-[10px] uppercase tracking-[0.2em] text-background/75"
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
                    className="bg-transparent border-background/25 focus:border-background text-background placeholder:text-background/30 h-12 sm:h-14 text-base transition-colors duration-300 ease-out"
                  />
                  <ValidationError field="email" errors={state.errors} />
                </div>

                <div className="space-y-4">
                  <Label className="font-sans text-[10px] uppercase tracking-[0.2em] text-background/75 block">
                    ¿Asistirás?
                  </Label>
                  <RadioGroup
                    value={attendance}
                    onValueChange={setAttendance}
                    className="flex flex-col sm:flex-row gap-5 sm:gap-10"
                  >
                    <div className="tap-target flex items-center gap-4">
                      <RadioGroupItem value="yes" id="yes" className="w-5 h-5 border-background/30 text-background" />
                      <Label htmlFor="yes" className="font-serif text-lg cursor-pointer touch-manipulation text-background leading-none">
                        Sí, encantado
                      </Label>
                    </div>
                    <div className="tap-target flex items-center gap-4">
                      <RadioGroupItem value="no" id="no" className="w-5 h-5 border-background/30 text-background" />
                      <Label htmlFor="no" className="font-serif text-lg cursor-pointer touch-manipulation text-background leading-none">
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
                    className="space-y-5 sm:space-y-6"
                  >
                    <div className="space-y-3">
                      <Label
                        htmlFor="guests"
                        className="font-sans text-[10px] uppercase tracking-[0.2em] text-background/75"
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
                        className="bg-transparent border-background/25 focus:border-background text-background h-12 sm:h-14 text-base w-full sm:max-w-32 transition-colors duration-300 ease-out"
                      />
                      <ValidationError field="guests" errors={state.errors} />
                    </div>

                    <div className="space-y-3">
                      <Label
                        htmlFor="dietary"
                        className="font-sans text-[10px] uppercase tracking-[0.2em] text-background/75"
                      >
                        Requisitos alimentarios
                      </Label>
                      <Textarea
                        id="dietary"
                        name="dietary"
                        placeholder="Indícanos alergias o restricciones alimentarias..."
                        className="bg-transparent border-background/25 focus:border-background text-background placeholder:text-background/30 min-h-24 sm:min-h-28 text-base transition-colors duration-300 ease-out"
                      />
                      <ValidationError field="dietary" errors={state.errors} />
                    </div>
                  </motion.div>
                )}

                <div className="space-y-3">
                  <Label
                    htmlFor="message"
                    className="font-sans text-[10px] uppercase tracking-[0.2em] text-background/75"
                  >
                    Mensaje (opcional)
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    placeholder="Comparte tus buenos deseos..."
                    className="bg-transparent border-background/25 focus:border-background text-background placeholder:text-background/30 min-h-28 sm:min-h-32 text-base transition-colors duration-300 ease-out"
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
                  className="tap-target w-full py-4 sm:py-5 border border-background text-background hover:bg-background hover:text-foreground transition-all duration-300 ease-out font-sans text-[10px] sm:text-[11px] uppercase tracking-[0.12em] sm:tracking-[0.2em] touch-manipulation disabled:opacity-50 disabled:cursor-not-allowed"
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
