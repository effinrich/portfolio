/** Site-wide SEO constants and head helpers for TanStack Router. */

export const SITE_URL = (import.meta.env.VITE_SITE_URL ?? "https://richtillman.xyz").replace(
  /\/$/,
  "",
)

export const SITE_NAME = "Rich Tillman"

export const DEFAULT_TITLE = "Rich Tillman — Principal Frontend Engineer & Design Systems Architect"

export const DEFAULT_DESCRIPTION =
  "Rich Tillman is a Principal Frontend Engineer building React design systems, MCP-driven developer tooling, and AI-native workflows. Creator of ForgeKit."

export const OG_IMAGE_PATH = "/og-image.jpg"

export const OG_IMAGE_ALT = "Rich Tillman — Principal Frontend Engineer"

export function absoluteUrl(path = "/"): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path
  const normalized = path.startsWith("/") ? path : `/${path}`
  return `${SITE_URL}${normalized}`
}

export function ogImageUrl(): string {
  return absoluteUrl(OG_IMAGE_PATH)
}

type MetaEntry =
  | { title: string }
  | { charSet: string }
  | { name: string; content: string }
  | { property: string; content: string }

type LinkEntry = { rel: string; href: string; type?: string; sizes?: string }

type ScriptEntry = { type: string; children: string }

export function buildPageHead(options: {
  title?: string
  description?: string
  path?: string
  image?: string
  imageAlt?: string
  noIndex?: boolean
  jsonLd?: Record<string, unknown> | ReadonlyArray<Record<string, unknown>>
}): {
  meta: MetaEntry[]
  links: LinkEntry[]
  scripts?: ScriptEntry[]
} {
  const title = options.title ?? DEFAULT_TITLE
  const description = options.description ?? DEFAULT_DESCRIPTION
  const path = options.path ?? "/"
  const url = absoluteUrl(path)
  const image = options.image ?? ogImageUrl()
  const imageAlt = options.imageAlt ?? OG_IMAGE_ALT

  const meta: MetaEntry[] = [
    { title },
    { name: "description", content: description },
    { name: "author", content: SITE_NAME },
    {
      name: "robots",
      content: options.noIndex ? "noindex, nofollow" : "index, follow",
    },
    { property: "og:site_name", content: SITE_NAME },
    { property: "og:locale", content: "en_US" },
    { property: "og:type", content: "website" },
    { property: "og:url", content: url },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: image },
    { property: "og:image:alt", content: imageAlt },
    { property: "og:image:width", content: "1200" },
    { property: "og:image:height", content: "630" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: image },
    { name: "twitter:image:alt", content: imageAlt },
  ]

  const links: LinkEntry[] = [{ rel: "canonical", href: url }]

  const scripts: ScriptEntry[] | undefined = options.jsonLd
    ? [
        {
          type: "application/ld+json",
          children: JSON.stringify(options.jsonLd),
        },
      ]
    : undefined

  return scripts ? { meta, links, scripts } : { meta, links }
}

export const personJsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: SITE_NAME,
  url: SITE_URL,
  jobTitle: "Principal Frontend Engineer",
  description: DEFAULT_DESCRIPTION,
  email: "mailto:richtillman@pm.me",
  sameAs: [
    "https://www.linkedin.com/in/effinrich",
    "https://www.npmjs.com/~effinrich",
    "https://forgekit.cloud",
  ],
  knowsAbout: [
    "React",
    "TypeScript",
    "Design Systems",
    "Storybook",
    "Model Context Protocol",
    "AI developer tooling",
    "Nx monorepos",
  ],
}

export const websiteJsonLd: Record<string, unknown> = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: `${SITE_NAME} Portfolio`,
  url: SITE_URL,
  description: DEFAULT_DESCRIPTION,
  author: { "@type": "Person", name: SITE_NAME },
}
