import type { Meta, StoryObj } from "@storybook/react-vite";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const meta: Meta<typeof Avatar> = { title: "UI/Avatar", component: Avatar, tags: ["autodocs"] };
export default meta;

export const Default: StoryObj<typeof Avatar> = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  ),
};
export const FallbackOnly: StoryObj<typeof Avatar> = {
  render: () => (
    <Avatar>
      <AvatarFallback>RT</AvatarFallback>
    </Avatar>
  ),
};
