import type { Meta, StoryObj } from "@storybook/react-vite";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { Button } from "@/components/ui/button";

const meta: Meta<typeof HoverCard> = {
  title: "UI/HoverCard",
  component: HoverCard,
  tags: ["autodocs"],
};
export default meta;

export const Default: StoryObj<typeof HoverCard> = {
  render: () => (
    <HoverCard>
      <HoverCardTrigger asChild>
        <Button variant="link">@richtillman</Button>
      </HoverCardTrigger>
      <HoverCardContent>Designer & engineer.</HoverCardContent>
    </HoverCard>
  ),
};
