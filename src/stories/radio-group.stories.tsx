import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const meta: Meta<typeof RadioGroup> = {
  title: "UI/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
  args: { defaultValue: "comfortable", disabled: false, onValueChange: fn() },
  argTypes: {
    disabled: { control: "boolean" },
    defaultValue: { control: "radio", options: ["default", "comfortable", "compact"] },
    onValueChange: { action: "changed" },
  },
};
export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Default: Story = {
  render: (args) => (
    <RadioGroup {...args}>
      {["default", "comfortable", "compact"].map((v) => (
        <div key={v} className="flex items-center gap-2">
          <RadioGroupItem value={v} id={v} />
          <Label htmlFor={v} className="capitalize">
            {v}
          </Label>
        </div>
      ))}
    </RadioGroup>
  ),
};

export const SelectInteraction: Story = {
  render: Default.render,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByLabelText("Compact"));
    await expect(args.onValueChange).toHaveBeenCalledWith("compact");
  },
};
