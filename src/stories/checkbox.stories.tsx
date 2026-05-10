import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Checkbox } from "@/components/ui/checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "UI/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  args: { disabled: false, onCheckedChange: fn() },
  argTypes: {
    disabled: { control: "boolean" },
    defaultChecked: { control: "boolean" },
    onCheckedChange: { action: "changed" },
  },
};
export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Default: Story = {};
export const Checked: Story = { args: { defaultChecked: true } };
export const Disabled: Story = { args: { disabled: true } };

export const TogglesOnClick: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const checkbox = canvas.getByRole("checkbox");
    await expect(checkbox).toHaveAttribute("data-state", "unchecked");
    await userEvent.click(checkbox);
    await expect(checkbox).toHaveAttribute("data-state", "checked");
    await expect(args.onCheckedChange).toHaveBeenCalledWith(true);
  },
};
