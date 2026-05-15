import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, fn, userEvent, within } from "storybook/test"
import { Switch } from "@/components/ui/switch"

const meta: Meta<typeof Switch> = {
  title: "UI/Switch",
  component: Switch,
  tags: ["autodocs"],
  args: { disabled: false, onCheckedChange: fn() },
  argTypes: {
    disabled: { control: "boolean" },
    defaultChecked: { control: "boolean" },
    onCheckedChange: { action: "changed" },
  },
}
export default meta
type Story = StoryObj<typeof Switch>

export const Default: Story = {}
export const Checked: Story = { args: { defaultChecked: true } }
export const Disabled: Story = { args: { disabled: true } }

export const TogglesOnClick: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement)
    const sw = canvas.getByRole("switch")
    await userEvent.click(sw)
    await expect(sw).toHaveAttribute("data-state", "checked")
    await expect(args.onCheckedChange).toHaveBeenCalledWith(true)
  },
}
