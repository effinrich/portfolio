// Figma Code Connect — generated from the Portfolio Design System library.
// Publish with: bunx figma connect publish  (requires @figma/code-connect + a supporting Figma plan)
import figma from "@figma/code-connect"
import { Checkbox } from "./checkbox"

figma.connect(Checkbox, "https://www.figma.com/design/rerk57DjD30s7oz4zHXwhD?node-id=58-9", {
  props: {
  example: ({ checked }) => (
    <Checkbox checked={checked} onCheckedChange={() => {}} aria-label="Accept terms" />
  ),
})
