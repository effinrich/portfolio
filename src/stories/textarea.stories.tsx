import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, fn, userEvent, within } from "storybook/test";
import { Textarea } from "@/components/ui/textarea";

const meta: Meta<typeof Textarea> = {
  title: "UI/Textarea",
  component: Textarea,
  tags: ["autodocs"],
  args: { placeholder: "Type your message…", disabled: false, onChange: fn() },
  argTypes: {
    disabled: { control: "boolean" },
    placeholder: { control: "text" },
    rows: { control: { type: "number", min: 1, max: 20 } },
    onChange: { action: "changed" },
  },
};
export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = {};
export const Disabled: Story = { args: { placeholder: "Disabled", disabled: true } };

export const TypingInteraction: Story = {
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const ta = canvas.getByPlaceholderText("Type your message…") as HTMLTextAreaElement;
    await userEvent.type(ta, "hi there");
    await expect(ta).toHaveValue("hi there");
    await expect(args.onChange).toHaveBeenCalled();
  },
};
