import type { Meta, StoryObj } from "@storybook/react-vite";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const meta: Meta<typeof RadioGroup> = {
  title: "UI/RadioGroup",
  component: RadioGroup,
  tags: ["autodocs"],
};
export default meta;

export const Default: StoryObj<typeof RadioGroup> = {
  render: () => (
    <RadioGroup defaultValue="comfortable">
      {["default", "comfortable", "compact"].map((v) => (
        <div key={v} className="flex items-center gap-2">
          <RadioGroupItem value={v} id={v} />
          <Label htmlFor={v} className="capitalize">
            {v}
          </Label>
        </div>
      ))}
    </RadioGroup>
  ),
};
