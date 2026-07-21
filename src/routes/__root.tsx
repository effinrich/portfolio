import { useEffect } from "react"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router"

import appCss from "../styles.css?url"
import { DEFAULT_DESCRIPTION, DEFAULT_TITLE, SITE_NAME, ogImageUrl } from "@/lib/seo"

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  )
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            type="button"
            onClick={() => {
              router.invalidate()
              reset()
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  )
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => {
    const image = ogImageUrl()
    return {
      meta: [
        { charSet: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { title: DEFAULT_TITLE },
        { name: "description", content: DEFAULT_DESCRIPTION },
        { name: "author", content: SITE_NAME },
        { name: "theme-color", content: "#1a1b22" },
        { name: "color-scheme", content: "dark" },
        {
          name: "google-site-verification",
          content: "0QrQ6qf8RzeNY4c8FnIZ1K9o7kPfbXRr39oQ3nNoPSw",
        },
        { property: "og:site_name", content: SITE_NAME },
        { property: "og:locale", content: "en_US" },
        { property: "og:type", content: "website" },
        { property: "og:title", content: DEFAULT_TITLE },
        { property: "og:description", content: DEFAULT_DESCRIPTION },
        { property: "og:image", content: image },
        { property: "og:image:alt", content: `${SITE_NAME} — Principal Frontend Engineer` },
        { property: "og:image:width", content: "1200" },
        { property: "og:image:height", content: "630" },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: DEFAULT_TITLE },
        { name: "twitter:description", content: DEFAULT_DESCRIPTION },
        { name: "twitter:image", content: image },
        {
          name: "twitter:image:alt",
          content: `${SITE_NAME} — Principal Frontend Engineer`,
        },
      ],
      links: [
        { rel: "stylesheet", href: appCss },
        { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
        { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
        { rel: "sitemap", href: "/sitemap.xml", type: "application/xml" },
      ],
    }
  },
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
})

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  )
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext()

  return (
    <QueryClientProvider client={queryClient}>
      <Outlet />
    </QueryClientProvider>
  )
}
