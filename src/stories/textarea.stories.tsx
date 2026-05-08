import type { Meta, StoryObj } from "@storybook/react-vite";
import { Textarea } from "@/components/ui/textarea";

const meta: Meta<typeof Textarea> = {
  title: "UI/Textarea",
  component: Textarea,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Textarea>;

export const Default: Story = { args: { placeholder: "Type your message…" } };
export const Disabled: Story = { args: { placeholder: "Disabled", disabled: true } };
