import { SectionHeading } from "./section-heading";

const roles = [
  {
    company: "ForgeKit",
    role: "Founder & Principal Engineer",
    period: "Jan 2026 — Present",
    location: "Remote",
    blurb:
      "Published the first MCP servers purpose-built for Figma → React design system workflows. 5,703+ external npm installs and active production adoption.",
    tags: ["MCP", "Nx", "Storybook", "Figma Code Connect"],
  },
  {
    company: "micro1",
    role: "Senior Frontend & AI Expert",
    period: "Nov 2025 — Jan 2026",
    location: "Remote · Contract",
    blurb:
      "Designed evaluation prompts and UI for AI coding agents. Advised eng teams on Claude Code & Cursor adoption in production.",
    tags: ["TanStack Start", "Chakra UI", "Prompt Eng"],
  },
  {
    company: "Verizon",
    role: "Principal Engineer",
    period: "Sep 2024 — Apr 2025",
    location: "Remote · Contract",
    blurb:
      "Enterprise greenfield build for Boston College on an Nx monorepo with Ark UI MCP, Storybook a11y enforced in CI, and a typed PostgreSQL data layer shared across apps.",
    tags: ["Enterprise", "Nx", "Ark UI MCP", "PostgreSQL", "a11y"],
  },
  {
    company: "Redesign Health",
    role: "Engineering Director (0→1)",
    period: "Jul 2022 — May 2024",
    location: "Remote",
    blurb:
      "Double-promoted to ED. Led 3 cross-functional teams (15+) launching multiple greenfield healthcare SaaS products. Built a 50+ component design system in Storybook + Chromatic that cut dev time 30% across a 10–15 dev org and unified Figma → React handoff.",
    tags: ["0→1 SaaS", "Design System", "Storybook", "Chromatic", "Zustand"],
  },
  {
    company: "Pineapple Corporation",
    role: "Sr. Frontend & Tech Lead",
    period: "Jan 2022 — Jul 2022",
    location: "Remote · Contract",
    blurb:
      "Stood up an Nx monorepo hosting 8+ apps; cross-platform Expo/RN serving 100K+ users with 60+ Storybook-driven components shared across web and native.",
    tags: ["Nx Monorepo", "Expo", "NativeBase", "Storybook"],
  },
  {
    company: "PHC Global",
    role: "Founding Frontend Engineer",
    period: "Jul 2021 — Jan 2022",
    location: "Remote",
    blurb:
      "0→1 enterprise B2B fintech SaaS. Architected an Nx monorepo with 30+ shared libs, gRPC middleware, and a Chakra-based design system — cut infra cost 30% and shipped 8 weeks early.",
    tags: ["Enterprise SaaS", "Nx Monorepo", "Chakra UI", "gRPC", "GCP"],
  },
  {
    company: "Freebird",
    role: "Lead Frontend Engineer (0→1)",
    period: "Sep 2016 — Jan 2021",
    location: "Santa Monica, CA",
    blurb:
      "Built one of the earliest production React design systems on Storybook (2016) — a 200-component library spanning B2B, B2C, and React Native. Pioneered Storybook + React + Figma as a shared source of truth for design, product, and engineering well before Code Connect existed.",
    tags: ["Design System (2016)", "Storybook", "React Native", "Figma"],
  },
  {
    company: "FaceCake Marketing Tech",
    role: "Lead Web Developer",
    period: "Oct 2010 — Sep 2016",
    location: "Los Angeles, CA",
    blurb:
      "Pioneered browser-based AR with computer vision in JavaScript. NARS try-on app drove $400K/mo revenue lift across enterprise beauty partners.",
    tags: ["WebAR", "JavaScript", "Enterprise"],
  },
];

export function Experience() {
  return (
    <section id="work" className="relative py-24 md:py-32">
      <div className="container-x">
        <SectionHeading
          eyebrow="Experience"
          title="A 15-year arc through frontend, design systems, and AI tooling."
          description="From early WebAR experiments to leading orgs and shipping MCP servers — each role traded velocity, scale, and depth in different combinations."
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
                  <h3 className="text-xl font-semibold tracking-tight">
                    {r.role}
                  </h3>
                  <span className="text-muted-foreground">@ {r.company}</span>
                </div>
                <p className="mt-2 text-pretty text-muted-foreground">
                  {r.blurb}
                </p>
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
  );
}
