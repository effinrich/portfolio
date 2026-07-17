// Figma Code Connect — generated from the Portfolio Design System library.
// Publish with: bunx figma connect publish  (requires @figma/code-connect + a supporting Figma plan)
import figma from "@figma/code-connect"
import { Badge } from "./badge"

figma.connect(Badge, "https://www.figma.com/design/rerk57DjD30s7oz4zHXwhD?node-id=42-13", {
  props: {
    children: figma.string("Label"),
    variant: figma.enum("Variant", {
      Default: "default",
      Secondary: "secondary",
      Destructive: "destructive",
      Outline: "outline",
    }),
  },
  example: ({ children, variant }) => <Badge variant={variant}>{children}</Badge>,
})
