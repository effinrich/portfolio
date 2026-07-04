// Figma Code Connect — generated from the Portfolio Design System library.
// Publish with: bunx figma connect publish  (requires @figma/code-connect + a supporting Figma plan)
import figma from "@figma/code-connect"
import { Label } from "./label"

figma.connect(Label, "https://www.figma.com/design/rerk57DjD30s7oz4zHXwhD?node-id=48-5", {
  props: {
    children: figma.string("Text"),
  },
  example: ({ children }) => <Label>{children}</Label>,
})
