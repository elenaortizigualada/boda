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
  const [usesBus, setUsesBus] = useState("")
  const [busPassengers, setBusPassengers] = useState("")
  const [guestIdentifier, setGuestIdentifier] = useState("")
  const [firstName, setFirstName] = useState("")
  const [lastName, setLastName] = useState("")

  const formatIcsDate = (date: Date) =>
    date
      .toISOString()
      .replace(/[-:]/g, "")
      .replace(/\.\d{3}/, "")

  const handleAddToCalendar = () => {
    const start = new Date(WEDDING_CONFIG.dateTime)
    const end = new Date(start)
    end.setHours(end.getHours() + 10)

    const lines = [
      "BEGIN:VCALENDAR",
      "VERSION:2.0",
      "PRODID:-//Elena y Fran//Invitacion//ES",
      "CALSCALE:GREGORIAN",
      "BEGIN:VEVENT",
      `UID:wedding-${start.getTime()}@elenayfran`,
      `DTSTAMP:${formatIcsDate(new Date())}`,
      `DTSTART:${formatIcsDate(start)}`,
      `DTEND:${formatIcsDate(end)}`,
      `SUMMARY:Boda ${WEDDING_CONFIG.couple.weddingName}`,
      `DESCRIPTION:${WEDDING_CONFIG.texts.invitationLead}`,
      `LOCATION:${WEDDING_CONFIG.reception.name}, ${WEDDING_CONFIG.reception.city}`,
      "END:VEVENT",
      "END:VCALENDAR",
    ]

    const blob = new Blob([lines.join("\r\n")], { type: "text/calendar;charset=utf-8" })
    const url = URL.createObjectURL(blob)
    const link = document.createElement("a")
    link.href = url
    link.download = "boda-elena-fran.ics"
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

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
      }
    } else if (guestParam) {
      const guestName = guestParam.replace(/\+/g, " ")
      setGuestIdentifier(guestName)
      const guest = findGuestByName(guests, guestName)
      if (guest) {
        const [fName, ...lName] = guest.name.split(" ")
        setFirstName(fName)
        setLastName(lName.join(" "))
      }
    }
  }, [guests])

  return (
    <section id="rsvp" className="rsvp-light scroll-mt-24 sm:scroll-mt-28 section-mobile-relaxed section-divider-top bg-background text-foreground relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-16 sm:h-20"
        style={{ background: "transparent" }}
      />
      <div className="container mx-auto container-mobile">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-22">
          {/* Left column - Header */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: MOTION_CONFIG.duration.reveal, ease: MOTION_CONFIG.easing.premium }}
          >
            <div className="flex items-center gap-5 mb-6">
              <span className="w-12 sm:w-20 h-px line-gold-bg" />
              <p className="font-sans text-[10px] sm:text-[12px] uppercase tracking-[0.2em] sm:tracking-[0.28em] text-foreground/75">
                Confirmación
              </p>
            </div>
            <h2 className="font-serif text-[clamp(2rem,9vw,4.2rem)] font-light leading-[1.07] tracking-wide mb-6 text-balance">
              Nos encantaría contar contigo
            </h2>
            <div className="hidden lg:block">
                  <p className="font-serif text-2xl sm:text-3xl italic text-foreground/65">
                {WEDDING_CONFIG.couple.weddingName}
              </p>
            </div>
          </motion.div>

          {/* Right column - Form */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: MOTION_CONFIG.duration.reveal, delay: MOTION_CONFIG.stagger.medium, ease: MOTION_CONFIG.easing.premium }}
            className="border border-foreground/20 bg-background/60 p-5 sm:p-7 lg:p-8"
          >
            {state.succeeded ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full flex items-center justify-center text-center py-20"
              >
                <div className="max-w-md">
                  <p className="font-serif text-3xl sm:text-4xl font-light mb-5">{MESSAGES.rsvp.successTitle}</p>
                  <p className="font-sans text-sm text-foreground/80 leading-relaxed mb-7">
                    {MESSAGES.rsvp.successMessage.split("\n").map((line, i) => (
                      <span key={i}>
                        {line}
                        {i === 0 && <br />}
                      </span>
                    ))}
                  </p>

                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full">
                    <button
                      type="button"
                      onClick={handleAddToCalendar}
                      className="tap-target w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-foreground text-foreground hover:bg-foreground hover:text-background transition-all duration-300 font-sans text-[10px] uppercase tracking-[0.16em]"
                    >
                      {MESSAGES.rsvp.successCalendarCta}
                    </button>
                    <a
                      href={WEDDING_CONFIG.reception.mapUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="tap-target w-full sm:w-auto inline-flex items-center justify-center px-6 py-3 border border-foreground/45 text-foreground/90 hover:border-foreground hover:text-foreground transition-all duration-300 font-sans text-[10px] uppercase tracking-[0.16em]"
                    >
                      {MESSAGES.rsvp.successMapsCta}
                    </a>
                  </div>
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
                        Sí
                      </Label>
                    </div>
                    <div className="tap-target flex items-center gap-4">
                      <RadioGroupItem value="no" id="no" className="w-5 h-5 border-background/30 text-background" />
                      <Label htmlFor="no" className="font-serif text-lg cursor-pointer touch-manipulation text-background leading-none">
                        No
                      </Label>
                    </div>
                    <div className="tap-target flex items-center gap-4">
                      <RadioGroupItem value="maybe" id="maybe" className="w-5 h-5 border-background/30 text-background" />
                      <Label htmlFor="maybe" className="font-serif text-lg cursor-pointer touch-manipulation text-background leading-none">
                        No lo sé aún
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
                        htmlFor="companions"
                        className="font-sans text-[10px] uppercase tracking-[0.2em] text-background/75"
                      >
                        Nombres de tus acompañantes
                      </Label>
                      <Input
                        id="companions"
                        name="companions"
                        className="bg-transparent border-background/25 focus:border-background text-background h-12 sm:h-14 text-base transition-colors duration-300 ease-out"
                      />
                      <ValidationError field="companions" errors={state.errors} />
                    </div>

                    <div className="space-y-3">
                      <Label
                        htmlFor="dietary"
                        className="font-sans text-[10px] uppercase tracking-[0.2em] text-background/75"
                      >
                        ¿Tienes alguna restricción alimentaria?
                      </Label>
                      <Textarea
                        id="dietary"
                        name="dietary"
                        placeholder="Indícanos alergias o restricciones alimentarias..."
                        className="bg-transparent border-background/25 focus:border-background text-background placeholder:text-background/30 min-h-24 sm:min-h-28 text-base transition-colors duration-300 ease-out"
                      />
                      <ValidationError field="dietary" errors={state.errors} />
                    </div>

                    <div className="space-y-4">
                      <Label className="font-sans text-[10px] uppercase tracking-[0.2em] text-background/75 block">
                        ¿Harás uso del autocar de la iglesia a la finca?
                      </Label>
                      <RadioGroup
                        value={usesBus}
                        onValueChange={(value) => {
                          setUsesBus(value)
                          if (value === "no") setBusPassengers("")
                        }}
                        className="flex flex-col sm:flex-row gap-5 sm:gap-10"
                      >
                        <div className="tap-target flex items-center gap-4">
                          <RadioGroupItem value="yes" id="bus-yes" className="w-5 h-5 border-background/30 text-background" />
                          <Label htmlFor="bus-yes" className="font-serif text-lg cursor-pointer touch-manipulation text-background leading-none">
                            Sí
                          </Label>
                        </div>
                        <div className="tap-target flex items-center gap-4">
                          <RadioGroupItem value="no" id="bus-no" className="w-5 h-5 border-background/30 text-background" />
                          <Label htmlFor="bus-no" className="font-serif text-lg cursor-pointer touch-manipulation text-background leading-none">
                            No
                          </Label>
                        </div>
                      </RadioGroup>

                      {usesBus === "yes" && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="space-y-3 pt-1"
                        >
                          <Label
                            htmlFor="busPassengers"
                            className="font-sans text-[10px] uppercase tracking-[0.2em] text-background/75"
                          >
                            ¿Cuántas personas utilizarán el autocar?
                          </Label>
                          <Input
                            id="busPassengers"
                            name="busPassengers"
                            type="number"
                            min="1"
                            value={busPassengers}
                            onChange={(e) => setBusPassengers(e.target.value)}
                            required
                            className="bg-transparent border-background/25 focus:border-background text-background placeholder:text-background/30 h-12 sm:h-14 text-base transition-colors duration-300 ease-out"
                          />
                          <ValidationError field="busPassengers" errors={state.errors} />
                        </motion.div>
                      )}
                    </div>

                  </motion.div>
                )}

                <div className="space-y-3">
                  <Label
                    htmlFor="message"
                    className="font-sans text-[10px] uppercase tracking-[0.2em] text-background/75"
                  >
                    Preguntas o comentarios
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    className="bg-transparent border-background/25 focus:border-background text-background placeholder:text-background/30 min-h-28 sm:min-h-32 text-base transition-colors duration-300 ease-out"
                  />
                  <ValidationError field="message" errors={state.errors} />
                </div>

                {/* Formspree hidden fields */}
                <input type="hidden" name="_subject" value={WEDDING_CONFIG.formspree.subject} />
                <input type="hidden" name="_replyto" value={WEDDING_CONFIG.formspree.replyTo} />
                <input type="hidden" name="attendance" value={attendance} />
                <input type="hidden" name="usesBus" value={usesBus} />
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
