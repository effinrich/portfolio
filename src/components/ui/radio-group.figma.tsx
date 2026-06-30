// Figma Code Connect — generated from the Portfolio Design System library.
// Publish with: bunx figma connect publish  (requires @figma/code-connect + a supporting Figma plan)
import figma from "@figma/code-connect"
import { RadioGroup, RadioGroupItem } from "./radio-group"
import { Label } from "./label"

figma.connect(RadioGroup, "https://www.figma.com/design/rerk57DjD30s7oz4zHXwhD?node-id=66-5", {
  example: () => (
    <RadioGroup defaultValue="starter">
      <div className="flex items-center gap-2">
        <RadioGroupItem value="starter" id="r1" />
        <Label htmlFor="r1">Starter</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="pro" id="r2" />
        <Label htmlFor="r2">Pro</Label>
      </div>
      <div className="flex items-center gap-2">
        <RadioGroupItem value="enterprise" id="r3" />
        <Label htmlFor="r3">Enterprise</Label>
      </div>
    </RadioGroup>
  ),
})
