/**
 * @portfolio/career — the single source of truth for career facts.
 *
 * career.json feeds the portfolio app, the résumé generator, and LinkedIn copy,
 * so they can't drift. Presentation that isn't a fact (project images, accent
 * colors, CTA labels, badges) stays in the consuming app, keyed by project name.
 */
import data from "./career.json"

export interface Role {
  company: string
  role: string
  period: string
  location: string
  blurb: string
  tags: string[]
}

export interface ProjectFacts {
  name: string
  tag: string
  description: string
  metric: string
  url: string
}

export interface HeroStat {
  value: string
  label: string
}

export interface Identity {
  name: string
  title: string
  email: string
  location: string
  links: Record<string, string>
}

export interface CareerData {
  identity: Identity
  hero: { chips: string[]; stats: HeroStat[] }
  roles: Role[]
  projects: ProjectFacts[]
}

// `satisfies` validates career.json against CareerData without widening the
// binding to the interface. (Note: TS JSON-module imports widen string literals,
// so project-name exhaustiveness is enforced at runtime in projects.tsx, not here.)
const career = data satisfies CareerData

export const identity = career.identity
export const hero = career.hero
export const roles = career.roles
export const projects = career.projects

/** Look up a project's facts by name (for merging with app-local presentation). */
export function projectByName(name: string): ProjectFacts | undefined {
  return career.projects.find((p) => p.name === name)
}

export default career
