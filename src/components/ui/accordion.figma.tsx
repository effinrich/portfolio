// Figma Code Connect — generated from the Portfolio Design System library.
// Publish with: bunx figma connect publish  (requires @figma/code-connect + a supporting Figma plan)
import figma from "@figma/code-connect"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "./accordion"

figma.connect(Accordion, "https://www.figma.com/design/rerk57DjD30s7oz4zHXwhD?node-id=72-5", {
  example: () => (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>Is it accessible?</AccordionTrigger>
        <AccordionContent>Yes. It adheres to the WAI-ARIA design pattern.</AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Is it styled?</AccordionTrigger>
        <AccordionContent>Yes. It comes with default styles.</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
})
