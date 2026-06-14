import { PageSection } from "./page-section"

export function Testimonial() {
  return (
    <PageSection id="testimonial" aria-labelledby="testimonial-quote" className="py-16 md:py-24">
      <div className="container-x">
        <figure className="card-elevated relative mx-auto max-w-3xl overflow-hidden p-8 md:p-12">
          <div
            className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/15 blur-3xl"
            aria-hidden
          />
          <div
            className="absolute -left-20 -bottom-20 h-56 w-56 rounded-full bg-accent/10 blur-3xl"
            aria-hidden
          />

          <span
            aria-hidden
            className="absolute left-6 top-3 font-serif text-7xl leading-none text-primary/30 md:left-8 md:top-4 md:text-8xl"
          >
            &ldquo;
          </span>

          <blockquote
            id="testimonial-quote"
            className="relative text-balance text-xl font-medium leading-snug tracking-tight text-foreground md:text-2xl"
          >
            Rich can &ldquo;speak design&rdquo; in a way that few engineers can — he can explain the
            engineering to design and the design to engineering. We have hardcore data engineers
            working productively on intricate styling problems, all on the rails Rich laid down.
            This is a winning strategy, and we have it thanks to Rich&apos;s conviction.
          </blockquote>

          <figcaption className="relative mt-6 flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-xs uppercase tracking-wider text-muted-foreground">
            <span className="text-primary/90">— Matt Stephenson</span>
            <span aria-hidden>·</span>
            <span>Director of Engineering, Redesign Health</span>
            <span aria-hidden>·</span>
            <span>2023 EOY review</span>
          </figcaption>
        </figure>
      </div>
    </PageSection>
  )
}
