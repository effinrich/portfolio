// Figma Code Connect — generated from the Portfolio Design System library.
// Publish with: bunx figma connect publish  (requires @figma/code-connect + a supporting Figma plan)
import figma from "@figma/code-connect"
import { Textarea } from "./textarea"

figma.connect(Textarea, "https://www.figma.com/design/rerk57DjD30s7oz4zHXwhD?node-id=64-5", {
  props: {
    placeholder: figma.string("Placeholder"),
  },
  example: ({ placeholder }) => <Textarea placeholder={placeholder} />,
})
