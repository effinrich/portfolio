import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within, screen, waitFor } from "storybook/test"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"

const meta: Meta<typeof Popover> = {
  title: "UI/Popover",
  component: Popover,
  tags: ["autodocs"],
  argTypes: {
    defaultOpen: { control: "boolean" },
    modal: { control: "boolean" },
  },
}
export default meta
type Story = StoryObj<typeof Popover>

export const Default: Story = {
  render: (args) => (
    <Popover {...args}>
      <PopoverTrigger asChild>
        <Button variant="outline">Open</Button>
      </PopoverTrigger>
      <PopoverContent>Place content here.</PopoverContent>
    </Popover>
  ),
}

export const OpensOnClick: Story = {
  render: Default.render,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: /open/i }))
    await waitFor(() => expect(screen.getByText("Place content here.")).toBeVisible())
  },
}
