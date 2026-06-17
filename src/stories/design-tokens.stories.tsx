import type { Meta, StoryObj } from "@storybook/react-vite"

const Tokens = () => {
  const tokenMappings = [
    {
      group: "Primary Color",
      figma: "Architectural / Primary",
      code: "--primary",
      value: "oklch(0.86 0.17 95)",
      mapping: "ForgeKit Theme -> semantic.colors.primary",
    },
    {
      group: "Accent Color",
      figma: "Architectural / Accent",
      code: "--accent",
      value: "oklch(0.78 0.16 200)",
      mapping: "ForgeKit Theme -> semantic.colors.accent",
    },
    {
      group: "Background",
      figma: "Architectural / BG / Page",
      code: "--background",
      value: "oklch(0.16 0.01 260)",
      mapping: "ForgeKit Theme -> semantic.colors.bg.page",
    },
    {
      group: "Surface",
      figma: "Architectural / BG / Surface",
      code: "--surface",
      value: "oklch(0.2 0.012 260)",
      mapping: "ForgeKit Theme -> semantic.colors.bg.surface",
    },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-50" aria-hidden />

      <div className="container-x relative py-16 space-y-16">
        <header className="max-w-2xl">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">
            <span className="h-px w-8 bg-primary/60" />
            04 // Design Tokens
          </div>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight">ForgeKit Mapping</h1>
          <p className="mt-3 text-pretty text-muted-foreground leading-relaxed">
            Visualizing the automated bridge between Figma variables and TypeScript design tokens.
          </p>
        </header>

        <div className="overflow-x-auto rounded-xl border border-border bg-card-elevated shadow-soft">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-border bg-surface/50">
                <th className="p-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  Category
                </th>
                <th className="p-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  Figma Variable
                </th>
                <th className="p-4 text-center font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  Mapping
                </th>
                <th className="p-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  CSS Token
                </th>
                <th className="p-4 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  Resolved Value
                </th>
              </tr>
            </thead>
            <tbody>
              {tokenMappings.map((token) => (
                <tr
                  key={token.code}
                  className="border-b border-border last:border-0 hover:bg-surface/30 transition-colors"
                >
                  <td className="p-4 font-medium text-sm">{token.group}</td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <div
                        className="h-4 w-4 rounded-sm border"
                        style={{ backgroundColor: token.value }}
                      />
                      <span className="text-xs font-mono">{token.figma}</span>
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    <span className="text-primary">→</span>
                  </td>
                  <td className="p-4">
                    <code className="text-xs text-accent">{token.code}</code>
                  </td>
                  <td className="p-4">
                    <code className="text-[10px] text-muted-foreground">{token.mapping}</code>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

const meta: Meta = {
  title: "DesignSystem/Tokens",
  component: Tokens,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof Tokens>

export const Default: Story = {}
