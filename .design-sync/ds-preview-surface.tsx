import * as React from "react"

/**
 * Preview surface for the dark-only portfolio design system.
 *
 * The system's tokens live on `:root` and the app renders on a near-black
 * background (`--background`) with off-white text (`--foreground`). Design-sync
 * preview cards default to a white page, which makes transparent / ghost /
 * outline variants (and any `text-foreground` content) render on the wrong
 * surface. Wrapping every preview in this dark surface restores the background
 * the components were built for, matching the repo's own Storybook render.
 *
 * This is a preview-only helper — it is not part of the shipped component API.
 */
export function DesignSurface({ children }: { children?: React.ReactNode }) {
  return React.createElement(
    "div",
    {
      style: {
        background: "var(--background)",
        color: "var(--foreground)",
        fontFamily: "var(--font-sans, ui-sans-serif, system-ui, sans-serif)",
        padding: "24px",
        borderRadius: "8px",
      },
    },
    children,
  )
}
