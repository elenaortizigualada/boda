export function GiftSection() {
  return (
    <section className="section-mobile-relaxed bg-background">
      <div className="container mx-auto container-mobile max-w-3xl text-center">
        <p className="font-serif text-[clamp(1.8rem,6vw,3rem)] font-light italic leading-tight text-foreground text-balance">
          ¡El mejor regalo es compartir este día con vosotros!
        </p>
        <div className="mt-7 space-y-4 font-sans text-[15px] sm:text-base leading-relaxed text-muted-foreground text-balance">
          <p>
            Para nosotros, lo más importante es que nos acompañéis y disfrutemos juntos de un día tan especial. ❤️
          </p>
          <p>
            Si además queréis tener un detalle con nosotros, os lo agradecemos de corazón. Os dejamos nuestro número de cuenta para quienes prefiráis esta opción.
          </p>
          <p className="font-sans text-base sm:text-lg tracking-[0.08em] text-foreground break-words">
            ES53 1583 0001 1891 3248 6461
          </p>
          <p>
            ¡Gracias por formar parte de nuestra historia!
          </p>
        </div>
      </div>
    </section>
  )
}
