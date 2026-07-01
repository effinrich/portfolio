// Figma Code Connect — generated from the Portfolio Design System library.
// Publish with: bunx figma connect publish  (requires @figma/code-connect + a supporting Figma plan)
import figma from "@figma/code-connect"
import { Switch } from "./switch"

figma.connect(Switch, "https://www.figma.com/design/rerk57DjD30s7oz4zHXwhD?node-id=51-9", {
  props: {
    checked: figma.enum("State", { On: true, Off: false }),
  },
  example: ({ checked }) => <Switch checked={checked} aria-label="Enable setting" />,
})
