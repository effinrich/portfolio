// Figma Code Connect — generated from the Portfolio Design System library.
// Publish with: bunx figma connect publish  (requires @figma/code-connect + a supporting Figma plan)
import figma from "@figma/code-connect"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./tabs"

figma.connect(Tabs, "https://www.figma.com/design/rerk57DjD30s7oz4zHXwhD?node-id=70-5", {
  example: () => (
    <Tabs defaultValue="account">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
        <TabsTrigger value="team">Team</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account settings</TabsContent>
    </Tabs>
  ),
})
