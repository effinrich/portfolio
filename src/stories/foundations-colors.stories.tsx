import type { Meta, StoryObj } from "@storybook/react-vite"

const Colors = () => {
  const colorGroups = [
    {
      name: "Core Primitives",
      colors: [
        {
          name: "Primary",
          variable: "--primary",
          description: "Architectural Amber - High visibility actions",
        },
        {
          name: "Accent",
          variable: "--accent",
          description: "Technical Cyan - System highlights & feedback",
        },
      ],
    },
    {
      name: "Structural Surfaces",
      colors: [
        { name: "Background", variable: "--background", description: "Base page color" },
        { name: "Surface", variable: "--surface", description: "Elevated component containers" },
        {
          name: "Surface 2",
          variable: "--surface-2",
          description: "Deep contrast or hover states",
        },
        { name: "Card", variable: "--card", description: "Content block surface" },
      ],
    },
    {
      name: "System Feedback",
      colors: [
        { name: "Border", variable: "--border", description: "1px structural definitions" },
        { name: "Input", variable: "--input", description: "Form field background" },
        { name: "Ring", variable: "--ring", description: "Focus indicator" },
        { name: "Destructive", variable: "--destructive", description: "Critical error states" },
      ],
    },
    {
      name: "Typography",
      colors: [
        { name: "Foreground", variable: "--foreground", description: "High-contrast text" },
        { name: "Muted", variable: "--muted-foreground", description: "Subtle metadata & labels" },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-50" aria-hidden />

      <div className="container-x relative py-16 space-y-16">
        <header className="max-w-2xl">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">
            <span className="h-px w-8 bg-primary/60" />
            01 // Foundations
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">Colors</h1>
          <p className="mt-3 text-pretty text-muted-foreground leading-relaxed">
            The Architectural palette is built on strict Zinc neutrals, balanced with vibrant
            technical accents for focus and hierarchy.
          </p>
        </header>

        <div className="grid gap-16">
          {colorGroups.map((group) => (
            <section key={group.name} className="space-y-6">
              <h2 className="font-mono text-sm uppercase tracking-wider text-primary/80 border-b border-border pb-2 inline-block">
                {group.name}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {group.colors.map((color) => (
                  <div
                    key={color.variable}
                    className="group flex flex-col gap-3 p-4 rounded-xl border border-border bg-card-elevated hover:border-primary/30 transition-all shadow-soft"
                  >
                    <div
                      className="h-24 w-full rounded-lg border border-white/10 shadow-inner"
                      style={{ backgroundColor: `var(${color.variable})` }}
                    />
                    <div className="space-y-1">
                      <div className="text-sm font-semibold tracking-tight">{color.name}</div>
                      <code className="text-[10px] font-mono text-muted-foreground uppercase tracking-wider">
                        {color.variable}
                      </code>
                      <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                        {color.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}

const meta: Meta = {
  title: "Foundations/Colors",
  component: Colors,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof Colors>

export const Default: Story = {}
