import { SectionHeading } from "./section-heading"

const groups = [
  {
    label: "Frontend",
    items: ["React 19", "TypeScript (strict)", "Next.js", "TanStack Start", "React Native", "Expo"]
  },
  {
    label: "Design Systems",
    items: ["Radix UI", "shadcn/ui", "Storybook 10", "Chromatic", "Chakra UI", "Ark UI", "Tamagui"]
  },
  {
    label: "AI & MCP",
    items: ["Model Context Protocol", "Claude Code", "Cursor", "v0", "Lovable", "Figma MCP"]
  },
  {
    label: "Monorepo & DX",
    items: ["Nx + Nx Agents", "Turborepo", "pnpm workspaces", "Module Federation", "GitHub Actions"]
  },
  {
    label: "Data & State",
    items: ["TanStack Query", "Zustand", "Redux", "tRPC", "Supabase", "PostgreSQL", "gRPC"]
  },
  {
    label: "Testing & a11y",
    items: ["Vitest", "Jest", "Playwright", "RTL", "ARIA patterns", "Storybook a11y", "WCAG 2.1 AA"]
  }
]

export function Stack() {
  return (
    <section id="stack" className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Stack"
          title="Tools I reach for to ship production frontend at scale."
        />
        <div className="grid gap-px overflow-hidden rounded-2xl border border-border bg-border md:grid-cols-2 lg:grid-cols-3">
          {groups.map((g) => (
            <div key={g.label} className="bg-background p-6">
              <div className="font-mono text-xs uppercase tracking-[0.18em] text-primary">
                {g.label}
              </div>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {g.items.map((it) => (
                  <li
                    key={it}
                    className="rounded-md border border-border bg-surface px-2.5 py-1 text-sm text-muted-foreground transition-colors hover:border-primary/30 hover:text-foreground"
                  >
                    {it}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
