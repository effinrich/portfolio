import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within, screen, waitFor } from "storybook/test";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const meta: Meta<typeof Select> = {
  title: "UI/Select",
  component: Select,
  tags: ["autodocs"],
  args: { disabled: false, onValueChange: fn() },
  argTypes: {
    disabled: { control: "boolean" },
    defaultValue: { control: "select", options: [undefined, "apple", "banana", "orange"] },
    onValueChange: { action: "changed" },
  },
};
export default meta;
type Story = StoryObj<typeof Select>;

export const Default: Story = {
  render: (args) => (
    <Select {...args}>
      <SelectTrigger className="w-[200px]">
        <SelectValue placeholder="Select a fruit" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="apple">Apple</SelectItem>
        <SelectItem value="banana">Banana</SelectItem>
        <SelectItem value="orange">Orange</SelectItem>
      </SelectContent>
    </Select>
  ),
};

export const SelectsOption: Story = {
  render: Default.render,
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    await userEvent.click(canvas.getByRole("combobox"));
    const option = await waitFor(() => screen.getByRole("option", { name: "Banana" }));
    await userEvent.click(option);
    await expect(args.onValueChange).toHaveBeenCalledWith("banana");
  },
};
