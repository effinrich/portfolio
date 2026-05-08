import { SectionHeading } from "./section-heading";

const projects = [
  {
    title: "ForgeKit Figma MCP",
    tag: "MCP · Open Source",
    desc: "MCP server that extracts Figma variables and design tokens, generating typed theme configs for Chakra, Tailwind, and shadcn — bridging design and AI-driven codegen.",
    metric: "5,703+ installs",
    href: "https://www.npmjs.com/package/forgekit-figma-mcp",
    cta: "View on npm",
    accent: "primary" as const,
  },
  {
    title: "ForgeKit Storybook MCP",
    tag: "MCP · Open Source",
    desc: "Exposes Storybook metadata and argTypes to AI coding agents — automating story generation, docs scaffolding, and component testing across design systems.",
    metric: "Active production use",
    href: "https://www.npmjs.com/package/forgekit-storybook-mcp",
    cta: "View on npm",
    accent: "accent" as const,
  },
  {
    title: "ForgeKit Core CLI",
    tag: "Developer Tooling",
    desc: "Scaffolds production-ready Nx monorepos with React, Storybook, Vitest, Playwright, and CI/CD — Figma token sync baked in from day one.",
    metric: "Chakra · shadcn · Tamagui",
    href: "https://forgekit.cloud",
    cta: "forgekit.cloud",
    accent: "primary" as const,
  },
  {
    title: "Tidy App",
    tag: "React Native · Expo",
    desc: "Offline-first, ADHD-friendly home management app. Resilient data layer (Zustand + TanStack Query), Supabase, and full Figma Code Connect mappings.",
    metric: "TestFlight beta",
    href: "#",
    cta: "Case study soon",
    accent: "accent" as const,
  },
];

export function Projects() {
  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Selected Projects"
          title="Tools I&apos;ve shipped that other developers actually install."
          description="Open source MCP servers, CLIs, and product work — built around the workflows I want for myself."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((p) => (
            <a
              key={p.title}
              href={p.href}
              target={p.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="card-elevated group relative flex flex-col overflow-hidden p-7 transition-all hover:-translate-y-1 hover:border-primary/30"
            >
              <div
                className={`absolute -right-20 -top-20 h-48 w-48 rounded-full opacity-30 blur-3xl transition-opacity group-hover:opacity-60 ${
                  p.accent === "primary" ? "bg-primary" : "bg-accent"
                }`}
                aria-hidden
              />
              <div className="relative">
                <div className="font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {p.tag}
                </div>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-3 text-pretty text-muted-foreground">{p.desc}</p>

                <div className="mt-8 flex items-center justify-between border-t border-border pt-5">
                  <span className="font-mono text-sm text-foreground">
                    {p.metric}
                  </span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    {p.cta}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="transition-transform group-hover:translate-x-0.5">
                      <path d="M5 12h14M13 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
