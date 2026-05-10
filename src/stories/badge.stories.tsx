import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, within } from "storybook/test";
import { Badge } from "@/components/ui/badge";

const meta: Meta<typeof Badge> = {
  title: "UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: { children: "Badge", variant: "default" },
  argTypes: {
    variant: { control: "select", options: ["default", "secondary", "destructive", "outline"] },
    children: { control: "text" },
  },
};
export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Badge")).toBeInTheDocument();
  },
};
export const Secondary: Story = { args: { variant: "secondary", children: "Secondary" } };
export const Destructive: Story = { args: { variant: "destructive", children: "Destructive" } };
export const Outline: Story = { args: { variant: "outline", children: "Outline" } };
