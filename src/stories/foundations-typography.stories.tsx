import type { Meta, StoryObj } from "@storybook/react-vite"

const Typography = () => {
  const typeSamples = [
    {
      label: "Heading 1",
      className: "text-7xl font-semibold tracking-tight leading-[1.05]",
      description: "Inter · 72px / 4.5rem · Semibold · -0.03em",
      usage: "Main page titles and high-impact hero sections.",
    },
    {
      label: "Heading 2",
      className: "text-4xl font-semibold tracking-tight",
      description: "Inter · 36px / 2.25rem · Semibold · -0.02em",
      usage: "Section headings and large content titles.",
    },
    {
      label: "Heading 3",
      className: "text-2xl font-semibold tracking-tight",
      description: "Inter · 24px / 1.5rem · Semibold",
      usage: "Card titles and subsection headers.",
    },
    {
      label: "Body Large",
      className: "text-lg leading-relaxed",
      description: "Inter · 18px / 1.125rem · Regular · 1.625",
      usage: "Featured paragraphs and introductory text.",
    },
    {
      label: "Body Standard",
      className: "text-base leading-relaxed",
      description: "Inter · 16px / 1rem · Regular · 1.625",
      usage: "Standard body copy and general content.",
    },
    {
      label: "Technical Label",
      className: "font-mono text-xs uppercase tracking-widest",
      description: "Space Mono · 12px / 0.75rem · Regular · 0.2em",
      usage: "Eyebrows, metadata, and system status indicators.",
    },
    {
      label: "Code / Metadata",
      className: "font-mono text-[10px] uppercase",
      description: "Space Mono · 10px / 0.625rem · Regular",
      usage: "Tags, small labels, and raw data display.",
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-50" aria-hidden />

      <div className="container-x relative py-16 space-y-16">
        <header className="max-w-2xl">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">
            <span className="h-px w-8 bg-primary/60" />
            02 // Foundations
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">Typography</h1>
          <p className="mt-3 text-pretty text-muted-foreground leading-relaxed">
            A contrast between high-impact sans-serif headlines and monospaced technical labels.
          </p>
        </header>

        <div className="space-y-16">
          {typeSamples.map((sample) => (
            <section
              key={sample.label}
              className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-8 pb-12 border-b border-border last:border-0"
            >
              <div className="space-y-2">
                <h2 className="font-mono text-xs uppercase tracking-widest text-primary">
                  {sample.label}
                </h2>
                <div className="text-[10px] font-mono text-muted-foreground uppercase">
                  {sample.description}
                </div>
                <p className="text-xs text-muted-foreground/80 italic">{sample.usage}</p>
              </div>
              <div className={sample.className}>
                {sample.label === "Heading 1" ? (
                  <>
                    Building the bridge between{" "}
                    <span className="text-gradient">design systems</span> and AI.
                  </>
                ) : (
                  "The quick brown fox jumps over the lazy dog."
                )}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

const meta: Meta = {
  title: "Foundations/Typography",
  component: Typography,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof Typography>

export const Default: Story = {}
