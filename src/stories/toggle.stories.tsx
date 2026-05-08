import type { Meta, StoryObj } from "@storybook/react-vite";
import { Toggle } from "@/components/ui/toggle";
import { Bold } from "lucide-react";

const meta: Meta<typeof Toggle> = { title: "UI/Toggle", component: Toggle, tags: ["autodocs"] };
export default meta;

export const Default: StoryObj<typeof Toggle> = {
  render: () => (
    <Toggle aria-label="Toggle bold">
      <Bold />
    </Toggle>
  ),
};
