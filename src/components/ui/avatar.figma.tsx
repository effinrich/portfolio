// Figma Code Connect — generated from the Portfolio Design System library.
// Publish with: bunx figma connect publish  (requires @figma/code-connect + a supporting Figma plan)
import figma from "@figma/code-connect"
import { Avatar, AvatarFallback, AvatarImage } from "./avatar"

figma.connect(Avatar, "https://www.figma.com/design/rerk57DjD30s7oz4zHXwhD?node-id=47-5", {
  props: {
    initials: figma.string("Initials"),
  },
  example: ({ initials }) => (
    <Avatar>
      <AvatarImage src="https://placehold.co/64x64/png" alt={initials} />
      <AvatarFallback>{initials}</AvatarFallback>
    </Avatar>
  ),
})
