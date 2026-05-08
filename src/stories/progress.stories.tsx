import type { Meta, StoryObj } from "@storybook/react-vite";
import { Progress } from "@/components/ui/progress";

const meta: Meta<typeof Progress> = {
  title: "UI/Progress",
  component: Progress,
  tags: ["autodocs"],
};
export default meta;
type Story = StoryObj<typeof Progress>;

export const Empty: Story = { args: { value: 0 }, render: (a) => <Progress {...a} className="w-[300px]" /> };
export const Half: Story = { args: { value: 50 }, render: (a) => <Progress {...a} className="w-[300px]" /> };
export const Full: Story = { args: { value: 100 }, render: (a) => <Progress {...a} className="w-[300px]" /> };
