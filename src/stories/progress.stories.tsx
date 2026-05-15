import type { Meta, StoryObj } from "@storybook/react-vite"
import { Progress } from "@/components/ui/progress"

const meta: Meta<typeof Progress> = {
  title: "UI/Progress",
  component: Progress,
  tags: ["autodocs"],
  args: { value: 50 },
  argTypes: {
    value: { control: { type: "range", min: 0, max: 100, step: 1 } },
  },
  render: (args) => <Progress {...args} className="w-[300px]" />,
}
export default meta
type Story = StoryObj<typeof Progress>

export const Empty: Story = { args: { value: 0 } }
export const Half: Story = { args: { value: 50 } }
export const Full: Story = { args: { value: 100 } }
