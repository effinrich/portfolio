import type { Meta, StoryObj } from "@storybook/react-vite";
import { Separator } from "@/components/ui/separator";

const meta: Meta<typeof Separator> = {
  title: "UI/Separator",
  component: Separator,
  tags: ["autodocs"],
};
export default meta;

export const Horizontal: StoryObj<typeof Separator> = {
  render: () => (
    <div className="w-[300px] space-y-2">
      <div>Above</div>
      <Separator />
      <div>Below</div>
    </div>
  ),
};
export const Vertical: StoryObj<typeof Separator> = {
  render: () => (
    <div className="flex h-10 items-center gap-2">
      <span>Left</span>
      <Separator orientation="vertical" />
      <span>Right</span>
    </div>
  ),
};
