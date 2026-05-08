import type { Meta, StoryObj } from "@storybook/react-vite";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";

const meta: Meta<typeof Popover> = { title: "UI/Popover", component: Popover, tags: ["autodocs"] };
export default meta;

export const Default: StoryObj<typeof Popover> = {
  render: () => (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline">Open</Button>
      </PopoverTrigger>
      <PopoverContent>Place content here.</PopoverContent>
    </Popover>
  ),
};
