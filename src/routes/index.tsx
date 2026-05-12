import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/portfolio/nav";
import { Hero } from "@/components/portfolio/hero";
import { Marquee } from "@/components/portfolio/marquee";
import { Testimonial } from "@/components/portfolio/testimonial";
import { Experience } from "@/components/portfolio/experience";
import { Projects } from "@/components/portfolio/projects";
import { Stack } from "@/components/portfolio/stack";
import { Contact } from "@/components/portfolio/contact";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Rich Tillman — Principal Frontend Engineer & Design Systems Architect" },
      {
        name: "description",
        content:
          "Rich Tillman is a Principal Frontend Engineer building React design systems, MCP-driven developer tooling, and AI-native workflows. Creator of ForgeKit.",
      },
      { property: "og:title", content: "Rich Tillman — Principal Frontend Engineer" },
      {
        property: "og:description",
        content:
          "Shipping React UI platforms, design systems, and AI developer tooling. Creator of ForgeKit MCP servers (5,703+ installs).",
      },
    ],
  }),
});

function Index() {
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
        <Contact />
      </main>
    </div>
  );
}
