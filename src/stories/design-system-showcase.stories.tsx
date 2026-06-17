import type { Meta, StoryObj } from "@storybook/react-vite"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Github, ExternalLink } from "lucide-react"

const Showcase = () => {
  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary/30">
      <div className="absolute inset-0 grid-bg pointer-events-none opacity-50" aria-hidden />

      <div className="container-x relative py-16 space-y-24">
        {/* Header */}
        <header className="max-w-3xl">
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-primary">
            <span className="h-px w-8 bg-primary/60" />
            03 // Design System
          </div>
          <h1 className="mt-4 text-6xl font-semibold tracking-tight leading-[1.05]">
            Architectural <span className="text-gradient">Component Showcase</span>.
          </h1>
          <p className="mt-6 text-xl text-pretty text-muted-foreground leading-relaxed">
            A comprehensive look at the primitive building blocks of the portfolio. Engineered for
            precision, performance, and cross-theme consistency.
          </p>
        </header>

        {/* Buttons */}
        <section className="space-y-8">
          <header>
            <h2 className="font-mono text-xs uppercase tracking-widest text-primary">
              03.1 // Buttons
            </h2>
            <div className="h-px w-full bg-border mt-2" />
          </header>
          <div className="flex flex-wrap gap-4">
            <Button size="lg" className="shadow-glow">
              Primary Action <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="secondary" size="lg">
              Secondary Action
            </Button>
            <Button variant="outline" size="lg">
              Outline View
            </Button>
            <Button variant="ghost" size="lg">
              Ghost Link
            </Button>
            <Button variant="link" size="lg">
              Standard Link
            </Button>
          </div>
        </section>

        {/* Inputs & Forms */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div className="space-y-8">
            <header>
              <h2 className="font-mono text-xs uppercase tracking-widest text-primary">
                03.2 // Form Fields
              </h2>
              <div className="h-px w-full bg-border mt-2" />
            </header>
            <div className="space-y-6">
              <div className="space-y-2">
                <label
                  className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                  htmlFor="name"
                >
                  Full Name
                </label>
                <Input id="name" placeholder="Rich Tillman" />
              </div>
              <div className="space-y-2">
                <label
                  className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground"
                  htmlFor="email"
                >
                  Email Address
                  <Input id="email" type="email" placeholder="rich@forgekit.cloud" />
                </label>
              </div>
              <Button className="w-full">Submit Component</Button>
            </div>
          </div>

          <div className="space-y-8">
            <header>
              <h2 className="font-mono text-xs uppercase tracking-widest text-primary">
                03.3 // Badges & Tags
              </h2>
              <div className="h-px w-full bg-border mt-2" />
            </header>
            <div className="flex flex-wrap gap-2">
              <Badge>React 19</Badge>
              <Badge variant="secondary">TypeScript</Badge>
              <Badge variant="outline">Storybook</Badge>
              <Badge className="bg-accent text-accent-foreground hover:bg-accent/90">
                ForgeKit MCP
              </Badge>
              <div className="chip">
                <span className="pill-dot animate-float-glow" />
                Live Status
              </div>
            </div>
          </div>
        </section>

        {/* Cards */}
        <section className="space-y-8">
          <header>
            <h2 className="font-mono text-xs uppercase tracking-widest text-primary">
              03.4 // Cards & Elevation
            </h2>
            <div className="h-px w-full bg-border mt-2" />
          </header>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="card-elevated">
              <CardHeader>
                <div className="font-mono text-[10px] uppercase tracking-widest text-primary">
                  Project // 01
                </div>
                <CardTitle className="mt-2">ForgeKit Figma MCP</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Extract Figma variables into typed TypeScript themes. Bridging the gap between
                  design and AI.
                </p>
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex gap-2">
                    <Github className="h-4 w-4 text-muted-foreground" />
                    <span className="text-xs font-mono text-muted-foreground">5.7k stars</span>
                  </div>
                  <ExternalLink className="h-4 w-4 text-primary" />
                </div>
              </CardContent>
            </Card>

            <div className="card-elevated p-6 flex flex-col justify-between aspect-square lg:aspect-auto">
              <div className="space-y-4">
                <div className="h-1 w-12 bg-primary rounded-full" />
                <h3 className="text-2xl font-semibold tracking-tight italic text-gradient">
                  "Technical Excellence."
                </h3>
              </div>
              <div className="space-y-1">
                <div className="font-semibold">Principal Engineer</div>
                <div className="font-mono text-[10px] uppercase text-muted-foreground">
                  @ ForgeKit // 2026
                </div>
              </div>
            </div>

            <Card className="border-dashed border-2 bg-transparent">
              <CardContent className="flex flex-col items-center justify-center h-full min-h-[200px] text-center space-y-4">
                <div className="h-10 w-10 rounded-full border border-dashed flex items-center justify-center text-muted-foreground">
                  +
                </div>
                <div>
                  <div className="text-sm font-medium">Add Component</div>
                  <p className="text-xs text-muted-foreground">Compose from primitives</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  )
}

const meta: Meta = {
  title: "DesignSystem/Showcase",
  component: Showcase,
  parameters: {
    layout: "fullscreen",
  },
}

export default meta
type Story = StoryObj<typeof Showcase>

export const Default: Story = {}
