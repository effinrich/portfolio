import { SectionHeading } from "./section-heading"
import { ContactForm } from "./contact-form"

const links = [
  {
    label: "Email",
    value: "richtillman@pm.me",
    href: "mailto:richtillman@pm.me"
  },
  { label: "Phone", value: "843-834-0041", href: "tel:+18438340041" },
  {
    label: "LinkedIn",
    value: "in/effinrich",
    href: "https://linkedin.com/in/effinrich"
  },
  { label: "npm", value: "~effinrich", href: "https://npmjs.com/~effinrich" },
  { label: "Web", value: "forgekit.cloud", href: "https://forgekit.cloud" }
]

export function Contact({ submissionStatus }: { submissionStatus?: "ok" | "error" | "invalid" }) {
  return (
    <section id="contact" className="relative py-24 md:py-32">
      <div className="container-x">
        <div className="card-elevated relative overflow-hidden p-8 md:p-14">
          <div
            className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-primary/20 blur-3xl"
            aria-hidden
          />
          <div
            className="absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
            aria-hidden
          />

          <div className="relative grid gap-10 md:grid-cols-[1.2fr_1fr] md:items-end">
            <div>
              <SectionHeading
                eyebrow="Let's build"
                title="Open to Staff and Principal roles in AI developer tooling, design systems, or platform frontend."
                description="Fully remote. Happiest where engineering excellence and design rigor meet — and where the team treats AI tooling as leverage, not a gimmick."
              />
              <a
                href="mailto:richtillman@pm.me"
                className="inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--glow-primary)] transition-transform hover:-translate-y-0.5"
              >
                Start a conversation →
              </a>

              <ul className="mt-10 grid gap-px overflow-hidden rounded-xl border border-border bg-border">
                {links.map((l) => (
                  <li key={l.label}>
                    <a
                      href={l.href}
                      target={l.href.startsWith("http") ? "_blank" : undefined}
                      rel="noreferrer"
                      className="flex items-center justify-between bg-background px-5 py-4 transition-colors hover:bg-surface"
                    >
                      <span className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                        {l.label}
                      </span>
                      <span className="text-sm font-medium text-foreground">{l.value} ↗</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <ContactForm initialStatus={submissionStatus} />
          </div>
        </div>

        <footer className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-border pt-8 text-xs text-muted-foreground md:flex-row">
          <div>© {new Date().getFullYear()} Rich Tillman.</div>
          <div className="font-mono">Built with TanStack Start · Tailwind · ☕</div>
        </footer>
      </div>
    </section>
  )
}
