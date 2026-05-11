import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within, screen, waitFor } from "storybook/test";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";

const meta: Meta<typeof Tooltip> = {
  title: "UI/Tooltip",
  component: Tooltip,
  tags: ["autodocs"],
  args: { delayDuration: 0 },
  argTypes: {
    delayDuration: { control: { type: "number", min: 0, max: 1000, step: 50 } },
  },
};
export default meta;
type Story = StoryObj<typeof Tooltip>;

export const Default: Story = {
  render: (args) => (
    <TooltipProvider>
      <Tooltip {...args}>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover me</Button>
        </TooltipTrigger>
        <TooltipContent>Add to library</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  ),
};

export const ShowsOnHover: Story = {
  render: Default.render,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await userEvent.hover(canvas.getByRole("button", { name: /hover me/i }));
    await waitFor(() => expect(screen.getAllByText("Add to library").length).toBeGreaterThan(0));
  },
};
