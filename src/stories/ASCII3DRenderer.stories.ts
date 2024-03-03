import type { StoryObj, Meta } from "@storybook/html";
import type { ASCII3DRendererProps } from "./ASCII3DRenderer";
import { createRenderer } from "./ASCII3DRenderer";

const meta = {
  title: "Example/ASCII3DRenderer",
  tags: ["autodocs"],
  render: (args) => {
    return createRenderer(args);
  },
  argTypes: {},
} satisfies Meta<ASCII3DRendererProps>;

export default meta;
type Story = StoryObj<ASCII3DRendererProps>;

export const Default: Story = {
  args: {},
};
