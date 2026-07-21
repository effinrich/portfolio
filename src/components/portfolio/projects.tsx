import { SectionHeading } from "./section-heading"
import { projects as careerProjects } from "@/data/career"
import figmaMcpImg from "@/assets/project-figma-mcp.jpg"
import storybookMcpImg from "@/assets/project-storybook-mcp.jpg"
import forgekitCliImg from "@/assets/project-forgekit-cli.jpg"
import tidyAppImg from "@/assets/project-tidy-app.jpg"

type Accent = "primary" | "accent"

// Presentation for each project — images (build-time asset imports), accent
// color, CTA label, and badge. Facts (tag, description, metric, url) come from
// the shared career source of truth and are merged in by project name below.
type Presentation = {
  accent: Accent
  image: string
  imageAlt: string
  cta: string
  badge?: string
}

const presentation: Record<string, Presentation> = {
  "ForgeKit Figma MCP": {
    accent: "primary",
    image: figmaMcpImg,
    imageAlt: "Figma MCP server extracting design tokens into a typed TypeScript theme file.",
    cta: "View on npm",
    badge: "Featured",
  },
  "ForgeKit Storybook MCP": {
    accent: "accent",
    image: storybookMcpImg,
    imageAlt: "Storybook MCP scaffolding component stories from metadata.",
    cta: "View on npm",
  },
  "ForgeKit Core CLI": {
    accent: "primary",
    image: forgekitCliImg,
    imageAlt: "ForgeKit interactive CLI scaffolding a new monorepo project.",
    cta: "forgekit.cloud",
  },
  "Tidy App": {
    accent: "accent",
    image: tidyAppImg,
    imageAlt: "Tidy iOS app showing task list and calendar views on two iPhones.",
    cta: "Case study soon",
  },
}

const projects = careerProjects.map((p) => {
  const pres = presentation[p.name]
  return {
    title: p.name,
    tag: p.tag,
    desc: p.description,
    metric: p.metric,
    href: p.url,
    accent: pres.accent,
    image: pres.image,
    imageAlt: pres.imageAlt,
    cta: pres.cta,
    badge: pres.badge,
  }
})

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
    <section id="projects" className="relative py-24 md:py-32">
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
    </section>
  )
}
