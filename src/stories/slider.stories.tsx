import type { Meta, StoryObj } from "@storybook/react-vite"
import { Slider } from "@/components/ui/slider"

const meta: Meta<typeof Slider> = {
  title: "UI/Slider",
  component: Slider,
  tags: ["autodocs"],
  args: { defaultValue: [50], max: 100, step: 1, disabled: false },
  argTypes: {
    max: { control: { type: "number", min: 1, max: 1000 } },
    step: { control: { type: "number", min: 1, max: 50 } },
    disabled: { control: "boolean" },
  },
  render: (args) => <Slider {...args} className="w-[300px]" />,
}
export default meta
type Story = StoryObj<typeof Slider>

export const Default: Story = {}
export const Stepped: Story = { args: { defaultValue: [25], step: 25 } }
