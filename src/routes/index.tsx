import { createFileRoute } from "@tanstack/react-router"
import { z } from "zod"
import { Nav } from "@/components/portfolio/nav"
import { Hero } from "@/components/portfolio/hero"
import { Marquee } from "@/components/portfolio/marquee"
import { Testimonial } from "@/components/portfolio/testimonial"
import { Experience } from "@/components/portfolio/experience"
import { Projects } from "@/components/portfolio/projects"
import { Stack } from "@/components/portfolio/stack"
import { Contact } from "@/components/portfolio/contact"

const searchSchema = z.object({
  contact: z.enum(["ok", "error", "invalid"]).optional()
})

export const Route = createFileRoute("/")({
  validateSearch: searchSchema,
  component: Index,
  head: () => ({
    meta: [
      {
        title: "Rich Tillman — Senior Frontend Engineer · Design Systems & Accessibility"
      },
      {
        name: "description",
        content:
          "Rich Tillman is a Senior/Staff Frontend Engineer building accessible React interfaces on Radix, design systems, and design-to-code tooling. Creator of ForgeKit."
      },
      {
        property: "og:title",
        content: "Rich Tillman — Senior Frontend Engineer"
      },
      {
        property: "og:description",
        content:
          "Accessible React interfaces on Radix, design systems, and design-to-code tooling. Creator of ForgeKit MCP servers (5,703+ npm downloads)."
      }
    ]
  })
})

function Index() {
  const { contact } = Route.useSearch()
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Testimonial />
        <Experience />
        <Projects />
        <Stack />
        <Contact submissionStatus={contact} />
      </main>
    </div>
  )
}
