import { SectionHeading } from "./section-heading"
import { roles } from "@/data/career"

export function Experience() {
  return (
    <section id="work" className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Experience"
          title="Frontend, design systems, and AI-native tooling."
          description="Each role traded velocity, scale, and depth in different combinations — from 0→1 design systems to shipping MCP servers used in production by external teams."
        />

        <ol className="relative space-y-4">
          {roles.map((r) => (
            <li
              key={r.company + r.period}
              className="card-elevated group relative grid gap-4 p-6 transition-colors hover:border-primary/30 md:grid-cols-[200px_1fr] md:gap-8 md:p-7"
            >
              <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                <div className="text-primary/90">{r.period}</div>
                <div className="mt-1">{r.location}</div>
              </div>
              <div>
                <div className="flex flex-wrap items-baseline gap-x-3">
                  <h3 className="text-xl font-semibold tracking-tight">{r.role}</h3>
                  <span className="text-muted-foreground">@ {r.company}</span>
                </div>
                <p className="mt-2 text-pretty text-muted-foreground">{r.blurb}</p>
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {r.tags.map((t) => (
                    <li
                      key={t}
                      className="rounded-md border border-border bg-surface px-2 py-0.5 font-mono text-[11px] text-muted-foreground"
                    >
                      {t}
                    </li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
