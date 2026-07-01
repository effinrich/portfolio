import figmaMcpImg from "@/assets/project-figma-mcp.jpg"
import storybookMcpImg from "@/assets/project-storybook-mcp.jpg"
import forgekitCliImg from "@/assets/project-forgekit-cli.jpg"
import tidyAppImg from "@/assets/project-tidy-app.jpg"

type Accent = "primary" | "accent"

export type Project = {
  title: string
  tag: string
  desc: string
  metric: string
  href: string
  cta: string
  accent: Accent
  image: string
  imageAlt: string
  badge?: string
}

export const projects: Project[] = [
  {
    title: "ForgeKit Figma MCP",
    tag: "MCP · Open Source",
    desc: "MCP server that extracts Figma variables and design tokens, generating typed theme configs for Chakra, Tailwind, and shadcn — bridging design and AI-driven codegen.",
    metric: "5,703+ installs",
    href: "https://www.npmjs.com/package/forgekit-figma-mcp",
    cta: "View on npm",
    accent: "primary",
    image: figmaMcpImg,
    imageAlt: "Figma MCP server extracting design tokens into a typed TypeScript theme file.",
    badge: "Featured",
  },
  {
    title: "ForgeKit Storybook MCP",
    tag: "MCP · Open Source",
    desc: "Exposes Storybook metadata and argTypes to AI coding agents — automating story generation, docs scaffolding, and component testing across design systems.",
    metric: "Active production use",
    href: "https://www.npmjs.com/package/forgekit-storybook-mcp",
    cta: "View on npm",
    accent: "accent",
    image: storybookMcpImg,
    imageAlt: "Storybook MCP scaffolding component stories from metadata.",
  },
  {
    title: "ForgeKit Core CLI",
    tag: "Developer Tooling",
    desc: "Scaffolds production-ready Nx monorepos with React, Storybook, Vitest, Playwright, and CI/CD — Figma token sync baked in from day one.",
    metric: "Chakra · shadcn · Tamagui",
    href: "https://forgekit.cloud",
    cta: "forgekit.cloud",
    accent: "primary",
    image: forgekitCliImg,
    imageAlt: "ForgeKit interactive CLI scaffolding a new monorepo project.",
  },
  {
    title: "Tidy App",
    tag: "React Native · Expo",
    desc: "Offline-first, ADHD-friendly home management app. Resilient data layer (Zustand + TanStack Query), Supabase, and full Figma Code Connect mappings.",
    metric: "TestFlight beta",
    href: "#",
    cta: "Case study soon",
    accent: "accent",
    image: tidyAppImg,
    imageAlt: "Tidy iOS app showing task list and calendar views on two iPhones.",
  },
]
