import { hero } from "@/data/career"

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="absolute inset-0 grid-bg pointer-events-none" aria-hidden />
      <div className="container-x relative">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {hero.chips.map((chip, i) => (
            <span key={`${i}-${chip}`} className={i === 0 ? "chip" : "chip font-mono"}>
              {i === 0 ? <span className="pill-dot animate-float-glow" /> : null}
              {chip}
            </span>
          ))}
        </div>

        <h1 className="mt-6 text-balance text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
          Building the bridge between <span className="text-gradient">design systems</span> and{" "}
          <span className="text-gradient">AI-native</span> developer tooling.
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          I&apos;m <span className="text-foreground font-medium">Rich Tillman</span> — Principal
          Frontend Engineer. I architect{" "}
          <span className="text-foreground font-medium">enterprise-scale</span> React platforms, Nx
          monorepos, and 0→1 SaaS products — and the design systems (Storybook + React + Figma) that
          keep design, product, and engineering shipping in lockstep.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--glow-primary)] transition-transform hover:-translate-y-0.5"
          >
            See selected work
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="transition-transform group-hover:translate-x-0.5"
            >
              <path
                d="M5 12h14M13 5l7 7-7 7"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-lg border border-border bg-surface px-5 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-surface-2"
          >
            Get in touch
          </a>
          <a
            href="https://forgekit.cloud"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-3 py-3 text-sm text-muted-foreground transition-colors hover:text-foreground link-underline"
          >
            forgekit.cloud ↗
          </a>
        </div>

        {/* Quick stats */}
        <dl className="mt-16 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-4">
          {hero.stats.map((s) => (
            <div key={`${s.value}-${s.label}`} className="bg-background p-5">
              <dt className="font-mono text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                {s.value}
              </dt>
              <dd className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
