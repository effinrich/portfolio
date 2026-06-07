import type { Meta, StoryObj } from "@storybook/react-vite"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

const meta: Meta<typeof Label> = {
  title: "UI/Label",
  component: Label,
  tags: ["autodocs"],
  args: { children: "Accept terms and conditions" },
  argTypes: { children: { control: "text" } }
}
export default meta
type Story = StoryObj<typeof Label>

export const Default: Story = {
  render: (args) => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms" {...args} />
    </div>
  )
}
