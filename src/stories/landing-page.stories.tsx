import type { Meta, StoryObj } from "@storybook/react-vite"
import { Nav } from "@/components/portfolio/nav"
import { Hero } from "@/components/portfolio/hero"
import { Marquee } from "@/components/portfolio/marquee"
import { Testimonial } from "@/components/portfolio/testimonial"
import { Experience } from "@/components/portfolio/experience"
import { Projects } from "@/components/portfolio/projects"
import { Stack } from "@/components/portfolio/stack"
import { Contact } from "@/components/portfolio/contact"

const meta: Meta = {
  title: "Portfolio/Pages",
  parameters: {
    layout: "fullscreen",
  },
}

export default meta

export const FullLandingPage: StoryObj = {
  render: () => (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Testimonial />
        <Experience />
        <Projects />
        <Stack />
        <Contact />
      </main>
    </div>
  ),
}
