import type { Meta, StoryObj } from "@storybook/react-vite"

const Architecture = () => {
  const steps = [
    {
      title: "01 // Figma Source",
      desc: "Design variables are defined in Figma using variables and tokens. This is the source of truth for all brand and structural values.",
      tech: "Figma Variables",
    },
    {
      title: "02 // ForgeKit Extraction",
      desc: "Our custom MCP server extracts Figma data and generates typed TypeScript theme files, ensuring type-safety from design to code.",
      tech: "ForgeKit MCP",
    },
    {
      title: "03 // Tailwind v4 Runtime",
      desc: "The generated theme is consumed by Tailwind v4 as semantic CSS variables, powering our utility-first styling system.",
      tech: "oklch variables",
    },
    {
      title: "04 // Component Isolation",
      desc: "UI primitives (shadcn) are built using these tokens and tested in isolation within Storybook.",
      tech: "React 19 + Storybook",
    },
    {
      title: "05 // Visual Regression",
      desc: "Every commit is verified by Chromatic to ensure that changes to tokens or components don't break our high-fidelity screens.",
      tech: "Chromatic CI",
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-50" aria-hidden />

      <div className="container-x relative py-16 space-y-16">
        <header className="max-w-2xl">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">
            <span className="h-px w-8 bg-primary/60" />
            System Architecture
          </div>
          <h1 className="mt-4 text-5xl font-semibold tracking-tight">
            The <span className="text-gradient">Design-to-Code</span> Loop
          </h1>
          <p className="mt-3 text-pretty text-muted-foreground leading-relaxed">
            Automating the bridge between architectural design and engineering excellence.
          </p>
        </header>

        <div className="relative space-y-12">
          {/* Connecting line */}
          <div className="absolute left-6 top-8 bottom-8 w-px bg-border hidden md:block" />

          {steps.map((step, i) => (
            <div key={step.title} className="relative flex flex-col md:flex-row gap-8 items-start">
              <div className="flex items-center justify-center h-12 w-12 rounded-full border border-border bg-surface font-mono text-xs font-bold text-primary z-10 shrink-0">
                0{i + 1}
              </div>
              <div className="card-elevated p-6 flex-1 hover:border-primary/30 transition-all">
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                  <h2 className="text-xl font-semibold tracking-tight">{step.title}</h2>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-primary/70">
                    {step.tech}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

const meta: Meta = {
  title: "DesignSystem/Architecture",
  component: Architecture,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof Architecture>

export const Default: Story = {}
