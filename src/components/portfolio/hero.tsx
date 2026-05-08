export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-32 pb-24 md:pt-40 md:pb-32">
      <div className="absolute inset-0 grid-bg pointer-events-none" aria-hidden />
      <div className="container-x relative">
        <div className="flex flex-wrap items-center gap-2 text-xs">
          <span className="chip">
            <span className="pill-dot animate-float-glow" />
            Atlanta, GA · Remote
          </span>
          <span className="chip font-mono">15+ yrs frontend</span>
          <span className="chip font-mono">5,703+ npm installs</span>
        </div>

        <h1 className="mt-6 text-balance text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
          Building the bridge between{" "}
          <span className="text-gradient">design systems</span> and{" "}
          <span className="text-gradient">AI-native</span> developer tooling.
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
          I&apos;m <span className="text-foreground font-medium">Rich Tillman</span> — Principal
          Frontend Engineer &amp; Engineering Director. I architect React UI platforms,
          design systems, and MCP-driven tooling that ships faster, scales cleaner, and
          plays nicely with Claude, Cursor, Figma, and Storybook.
        </p>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground shadow-[var(--glow-primary)] transition-transform hover:-translate-y-0.5"
          >
            See selected work
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-0.5">
              <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
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
          {[
            ["5,703+", "npm installs · ForgeKit MCP"],
            ["200+", "component design system"],
            ["500K+", "users on shipped RN apps"],
            ["$400K/mo", "revenue uplift · NARS AR"],
          ].map(([k, v]) => (
            <div key={k} className="bg-background p-5">
              <dt className="font-mono text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                {k}
              </dt>
              <dd className="mt-1 text-xs leading-relaxed text-muted-foreground">{v}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
