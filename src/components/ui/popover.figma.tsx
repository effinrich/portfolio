// Figma Code Connect — generated from the Portfolio Design System library.
// Publish with: bunx figma connect publish  (requires @figma/code-connect + a supporting Figma plan)
import figma from "@figma/code-connect"
import { Popover, PopoverContent, PopoverTrigger } from "./popover"
import { Button } from "./button"

figma.connect(Popover, "https://www.figma.com/design/rerk57DjD30s7oz4zHXwhD?node-id=72-25", {
  example: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open</Button>
      </PopoverTrigger>
      <PopoverContent>
        <p className="font-semibold">Dimensions</p>
        <p className="text-muted-foreground text-sm">Set the width and height for the layer.</p>
      </PopoverContent>
    </Popover>
  ),
})
