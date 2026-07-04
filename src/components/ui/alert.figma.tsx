// Figma Code Connect — generated from the Portfolio Design System library.
// Publish with: bunx figma connect publish  (requires @figma/code-connect + a supporting Figma plan)
import figma from "@figma/code-connect"
import { Alert, AlertDescription, AlertTitle } from "./alert"

figma.connect(Alert, "https://www.figma.com/design/rerk57DjD30s7oz4zHXwhD?node-id=67-19", {
  props: {
    variant: figma.enum("Variant", { Default: "default", Destructive: "destructive" }),
  },
  example: ({ variant }) => (
    <Alert variant={variant}>
      <AlertTitle>Heads up</AlertTitle>
      <AlertDescription>You can add components to your app using the CLI.</AlertDescription>
    </Alert>
  ),
})
