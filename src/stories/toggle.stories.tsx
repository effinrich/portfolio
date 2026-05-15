import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { Toggle } from "@/components/ui/toggle"
import { Bold } from "lucide-react"

const meta: Meta<typeof Toggle> = {
  title: "UI/Toggle",
  component: Toggle,
  tags: ["autodocs"],
  args: { variant: "default", size: "default", disabled: false, onPressedChange: fn() },
  argTypes: {
    variant: { control: "radio", options: ["default", "outline"] },
    size: { control: "radio", options: ["default", "sm", "lg"] },
    disabled: { control: "boolean" },
    onPressedChange: { action: "pressed" },
  },
}
export default meta
type Story = StoryObj<typeof Toggle>

export const Default: Story = {
  render: (args) => (
    <Toggle aria-label="Toggle bold" {...args}>
      <Bold />
    </Toggle>
  ),
}

export const PressInteraction: Story = {
  render: Default.render,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const btn = canvas.getByRole("button", { name: /toggle bold/i })
    await userEvent.click(btn)
    await expect(btn).toHaveAttribute("data-state", "on")
    await expect(args.onPressedChange).toHaveBeenCalledWith(true)
  },
}
