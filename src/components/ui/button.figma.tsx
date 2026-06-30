// Figma Code Connect — generated from the Portfolio Design System library.
// Publish with: bunx figma connect publish  (requires @figma/code-connect + a supporting Figma plan)
import figma from "@figma/code-connect"
import { Button } from "./button"

figma.connect(Button, "https://www.figma.com/design/rerk57DjD30s7oz4zHXwhD?node-id=40-41", {
  props: {
    children: figma.string("Label"),
    variant: figma.enum("Style", {
      Default: "default",
      Secondary: "secondary",
      Destructive: "destructive",
      Outline: "outline",
      Ghost: "ghost",
      Link: "link",
    }),
    size: figma.enum("Size", { sm: "sm", default: "default", lg: "lg" }),
  },
  example: ({ children, variant, size }) => (
    <Button variant={variant} size={size}>
      {children}
    </Button>
  ),
})
