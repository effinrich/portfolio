import { PageSection } from "./page-section"
import { SectionHeading } from "./section-heading"
import figmaMcpImg from "@/assets/project-figma-mcp.jpg"
import storybookMcpImg from "@/assets/project-storybook-mcp.jpg"
import forgekitCliImg from "@/assets/project-forgekit-cli.jpg"
import tidyAppImg from "@/assets/project-tidy-app.jpg"

type Accent = "primary" | "accent"

type Project = {
  title: string
  tag: string
  desc: string
  metric: string
  href: string
  cta: string
  accent: Accent
  image: string
  imageAlt: string
  badge?: string
}

const projects: Project[] = [
  {
    title: "ForgeKit Figma MCP",
    tag: "MCP · Open Source",
    desc: "MCP server that extracts Figma variables and design tokens, generating typed theme configs for Chakra, Tailwind, and shadcn — bridging design and AI-driven codegen.",
    metric: "5,703+ installs",
    href: "https://www.npmjs.com/package/forgekit-figma-mcp",
    cta: "View on npm",
    accent: "primary",
    image: figmaMcpImg,
    imageAlt: "Figma MCP server extracting design tokens into a typed TypeScript theme file.",
    badge: "Featured",
  },
  {
    title: "ForgeKit Storybook MCP",
    tag: "MCP · Open Source",
    desc: "Exposes Storybook metadata and argTypes to AI coding agents — automating story generation, docs scaffolding, and component testing across design systems.",
    metric: "Active production use",
    href: "https://www.npmjs.com/package/forgekit-storybook-mcp",
    cta: "View on npm",
    accent: "accent",
    image: storybookMcpImg,
    imageAlt: "Storybook MCP scaffolding component stories from metadata.",
  },
  {
    title: "ForgeKit Core CLI",
    tag: "Developer Tooling",
    desc: "Scaffolds production-ready Nx monorepos with React, Storybook, Vitest, Playwright, and CI/CD — Figma token sync baked in from day one.",
    metric: "Chakra · shadcn · Tamagui",
    href: "https://forgekit.cloud",
    cta: "forgekit.cloud",
    accent: "primary",
    image: forgekitCliImg,
    imageAlt: "ForgeKit interactive CLI scaffolding a new monorepo project.",
  },
  {
    title: "Tidy App",
    tag: "React Native · Expo",
    desc: "Offline-first, ADHD-friendly home management app. Resilient data layer (Zustand + TanStack Query), Supabase, and full Figma Code Connect mappings.",
    metric: "TestFlight beta",
    href: "#",
    cta: "Case study soon",
    accent: "accent",
    image: tidyAppImg,
    imageAlt: "Tidy iOS app showing task list and calendar views on two iPhones.",
  },
]

function ArrowIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      className="transition-transform group-hover:translate-x-0.5"
      aria-hidden
    >
      <path
        d="M5 12h14M13 5l7 7-7 7"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function ProjectMedia({
  src,
  alt,
  accent,
  priority = false,
}: {
  src: string
  alt: string
  accent: Accent
  priority?: boolean
}) {
  return (
    <div className="relative aspect-[16/10] w-full overflow-hidden rounded-lg border border-border bg-muted/30">
      <img
        src={src}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-tr from-background/80 via-background/20 to-transparent" />
      <div
        className={`pointer-events-none absolute -bottom-16 -right-16 h-40 w-40 rounded-full opacity-40 blur-3xl transition-opacity group-hover:opacity-70 ${
          accent === "primary" ? "bg-primary" : "bg-accent"
        }`}
        aria-hidden
      />
    </div>
  )
}

export function Projects() {
  return (
    <PageSection id="projects">
      <div className="container-x">
        <SectionHeading
          eyebrow="Selected Projects"
          title="Tools I've shipped that other developers actually install."
          description="Open source MCP servers, CLIs, and product work — built around the workflows I want for myself."
        />

        <div className="grid gap-5 md:grid-cols-2">
          {projects.map((p, i) => (
            <a
              key={p.title}
              href={p.href}
              target={p.href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="card-elevated group relative flex flex-col overflow-hidden p-5 transition-all hover:-translate-y-1 hover:border-primary/30"
            >
              <div
                className={`pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full opacity-20 blur-3xl transition-opacity group-hover:opacity-50 ${
                  p.accent === "primary" ? "bg-primary" : "bg-accent"
                }`}
                aria-hidden
              />
              <div className="relative">
                <ProjectMedia src={p.image} alt={p.imageAlt} accent={p.accent} priority={i === 0} />
              </div>
              <div className="relative flex flex-1 flex-col px-2 pb-2 pt-6">
                <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-wider text-muted-foreground">
                  {p.badge && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-primary">
                      {p.badge}
                    </span>
                  )}
                  <span>{p.tag}</span>
                </div>
                <h3 className="mt-3 text-2xl font-semibold tracking-tight">{p.title}</h3>
                <p className="mt-3 text-pretty text-muted-foreground">{p.desc}</p>

                <div className="mt-auto flex items-center justify-between border-t border-border pt-5">
                  <span className="font-mono text-sm text-foreground">{p.metric}</span>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-primary">
                    {p.cta}
                    <ArrowIcon />
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </PageSection>
  )
}
