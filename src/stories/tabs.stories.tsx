import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect, userEvent, within } from "storybook/test";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const meta: Meta<typeof Tabs> = {
  title: "UI/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  args: { defaultValue: "account" },
  argTypes: {
    defaultValue: { control: "radio", options: ["account", "password"] },
    orientation: { control: "radio", options: ["horizontal", "vertical"] },
  },
};
export default meta;
type Story = StoryObj<typeof Tabs>;

export const Default: Story = {
  render: (args) => (
    <Tabs {...args} className="w-[360px]">
      <TabsList>
        <TabsTrigger value="account">Account</TabsTrigger>
        <TabsTrigger value="password">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="account">Account settings here.</TabsContent>
      <TabsContent value="password">Change your password here.</TabsContent>
    </Tabs>
  ),
};

export const SwitchTab: Story = {
  render: Default.render,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    await expect(canvas.getByText("Account settings here.")).toBeVisible();
    await userEvent.click(canvas.getByRole("tab", { name: /password/i }));
    await expect(canvas.getByText("Change your password here.")).toBeVisible();
  },
};
