import type { Meta, StoryObj } from "@storybook/react-vite"
import { expect, userEvent, within, screen, waitFor } from "storybook/test"
import { toast } from "sonner"
import { Toaster } from "@/components/ui/sonner"
import { Button } from "@/components/ui/button"

const meta: Meta<typeof Toaster> = {
  title: "UI/Sonner",
  component: Toaster,
  tags: ["autodocs"],
  parameters: { layout: "padded" },
}
export default meta
type Story = StoryObj<typeof Toaster>

export const Success: Story = {
  render: () => (
    <>
      <Toaster duration={Infinity} />
      <Button
        variant="outline"
        onClick={() =>
          toast("Message sent", {
            description: "Your message has been delivered.",
          })
        }
      >
        Show success toast
      </Button>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: /show success toast/i }))
    await waitFor(() => expect(screen.getByText("Message sent")).toBeInTheDocument())
  },
}

export const Error: Story = {
  render: () => (
    <>
      <Toaster duration={Infinity} />
      <Button
        variant="outline"
        onClick={() =>
          toast.error("Submission failed", {
            description: "Something went wrong. Please try again.",
          })
        }
      >
        Show error toast
      </Button>
    </>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)
    await userEvent.click(canvas.getByRole("button", { name: /show error toast/i }))
    await waitFor(() => expect(screen.getByText("Submission failed")).toBeInTheDocument())
  },
}
