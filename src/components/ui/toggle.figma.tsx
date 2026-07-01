// Figma Code Connect — generated from the Portfolio Design System library.
// Publish with: bunx figma connect publish  (requires @figma/code-connect + a supporting Figma plan)
import figma from "@figma/code-connect"
import { Toggle } from "./toggle"

figma.connect(Toggle, "https://www.figma.com/design/rerk57DjD30s7oz4zHXwhD?node-id=65-13", {
  props: {
    variant: figma.enum("Variant", { Default: "default", Outline: "outline" }),
    size: figma.enum("Size", { sm: "sm", default: "default", lg: "lg" }),
    pressed: figma.enum("State", { On: true, Off: false }),
  },
  example: ({ variant, size, pressed }) => (
    <Toggle variant={variant} size={size} pressed={pressed} aria-label="Toggle bold">
      B
    </Toggle>
  ),
})
