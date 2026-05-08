import type { Meta, StoryObj } from "@storybook/react-vite";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

const meta: Meta<typeof Label> = { title: "UI/Label", component: Label, tags: ["autodocs"] };
export default meta;

export const Default: StoryObj<typeof Label> = {
  render: () => (
    <div className="flex items-center gap-2">
      <Checkbox id="terms" />
      <Label htmlFor="terms">Accept terms and conditions</Label>
    </div>
  ),
};
