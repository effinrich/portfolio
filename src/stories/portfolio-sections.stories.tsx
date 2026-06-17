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
  title: "Portfolio/Sections",
  parameters: {
    layout: "fullscreen",
  },
  decorators: [
    (Story) => (
      <div className="min-h-screen bg-background text-foreground selection:bg-primary/30">
        <Story />
      </div>
    ),
  ],
}

export default meta

export const Navigation: StoryObj = {
  render: () => <Nav />,
}

export const HeroSection: StoryObj = {
  render: () => (
    <div className="relative pt-16">
      <Hero />
    </div>
  ),
}

export const MarqueeSection: StoryObj = {
  render: () => <Marquee />,
}

export const TestimonialSection: StoryObj = {
  render: () => <Testimonial />,
}

export const ExperienceSection: StoryObj = {
  render: () => <Experience />,
}

export const ProjectsSection: StoryObj = {
  render: () => <Projects />,
}

export const StackSection: StoryObj = {
  render: () => <Stack />,
}

export const ContactSection: StoryObj = {
  render: () => <Contact />,
}

export const ContactSuccess: StoryObj = {
  render: () => <Contact submissionStatus="ok" />,
}
