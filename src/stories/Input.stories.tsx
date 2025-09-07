import type { Meta, StoryObj } from "@storybook/react";
import Input from "../components/ui/Input";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    value: "",
    placeholder: "Enter text",
    onChange: () => {},
  },
};

export const Error: Story = {
  args: {
    value: "",
    placeholder: "Enter text",
    onChange: () => {},
    error: "This field is required",
  },
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex flex-col gap-2">
      <Input {...args} size="sm" placeholder="Small Input" />
      <Input {...args} size="md" placeholder="Medium Input" />
      <Input {...args} size="lg" placeholder="Large Input" />
    </div>
  ),
};
