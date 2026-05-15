import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within, screen, waitFor } from "storybook/test"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"
import { Button } from "@/components/ui/button"

const meta: Meta<typeof HoverCard> = {
  title: "UI/HoverCard",
  component: HoverCard,
  tags: ["autodocs"],
  args: { openDelay: 0, closeDelay: 0 },
  argTypes: {
    openDelay: { control: { type: "number", min: 0, max: 1000, step: 50 } },
    closeDelay: { control: { type: "number", min: 0, max: 1000, step: 50 } },
  },
}
export default meta
type Story = StoryObj<typeof HoverCard>

export const Default: Story = {
  render: (args) => (
    <HoverCard {...args}>
      <HoverCardTrigger asChild>
        <Button variant="link">@richtillman</Button>
      </HoverCardTrigger>
      <HoverCardContent>Designer & engineer.</HoverCardContent>
    </HoverCard>
  ),
}

export const OpensOnHover: Story = {
  render: Default.render,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.hover(canvas.getByRole("button", { name: /@richtillman/i }))
    await waitFor(() => expect(screen.getByText("Designer & engineer.")).toBeVisible())
  },
}
