// Figma Code Connect — generated from the Portfolio Design System library.
// Publish with: bunx figma connect publish  (requires @figma/code-connect + a supporting Figma plan)
import figma from "@figma/code-connect"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select"

figma.connect(Select, "https://www.figma.com/design/rerk57DjD30s7oz4zHXwhD?node-id=74-5", {
  example: () => (
    <Select defaultValue="apple">
      <SelectTrigger className="w-[260px]" aria-label="Select a fruit">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="blueberry">Blueberry</SelectItem>
      </SelectContent>
    </Select>
  ),
})
