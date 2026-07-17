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
import { buildPageHead, personJsonLd, websiteJsonLd } from "@/lib/seo"

const searchSchema = z.object({
  contact: z.enum(["ok", "error", "invalid"]).optional(),
})

export const Route = createFileRoute("/")({
  validateSearch: searchSchema,
  component: Index,
  head: () =>
    buildPageHead({
      path: "/",
      jsonLd: [websiteJsonLd, personJsonLd],
    }),
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
