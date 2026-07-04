import { create } from "storybook/theming"

/**
 * Branded dark theme for the portfolio design system's Storybook docs site.
 * Mirrors the dark-only app palette (near-black indigo surfaces, warm gold
 * primary, cyan secondary) so the docs chrome matches the components it shows.
 * Hex values are sRGB approximations of the oklch tokens in src/styles.css.
 */
export default create({
  base: "dark",

  brandTitle: "Portfolio Design System",
  brandUrl: "/",
  brandTarget: "_self",

  colorPrimary: "#e6b84a", // --primary  (warm gold)
  colorSecondary: "#22c3d6", // --accent  (cyan — selection/links)

  appBg: "#15161d", // --background
  appContentBg: "#1b1c24", // --surface-ish content panel
  appPreviewBg: "#15161d", // story canvas = app background
  appBorderColor: "#34363f", // --border
  appBorderRadius: 10, // --radius 0.625rem

  textColor: "#f4f5f8", // --foreground
  textInverseColor: "#15161d",
  textMutedColor: "#a3a6b3", // --muted-foreground

  barTextColor: "#a3a6b3",
  barSelectedColor: "#e6b84a",
  barHoverColor: "#22c3d6",
  barBg: "#1b1c24",

  inputBg: "#1f2029",
  inputBorder: "#34363f",
  inputTextColor: "#f4f5f8",
  inputBorderRadius: 8,

  fontBase: '"Inter", ui-sans-serif, system-ui, sans-serif',
  fontCode: '"JetBrains Mono", ui-monospace, "SF Mono", Menlo, monospace',
})
