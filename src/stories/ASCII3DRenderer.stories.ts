import type { StoryObj, Meta } from '@storybook/html';
import type { ASCII3DRendererProps } from './ASCII3DRenderer';
import { createRenderer } from './ASCII3DRenderer';
import './renderer.css';

const meta = {
  title: 'Example/ASCII3DRenderer',
  tags: ['autodocs'],
  render: (args) => {
    return createRenderer(args);
  },
  argTypes: {
    width: {
      control: {
        type: 'range',
        value: 200,
        min: 100,
        max: 500,
        step: 50,
      },
    },
    height: {
      control: {
        type: 'range',
        value: 100,
        min: 50,
        max: 500,
        step: 50,
      },
    },
  },
} satisfies Meta<ASCII3DRendererProps>;

export default meta;
type Story = StoryObj<ASCII3DRendererProps>;

export const Default: Story = {
  args: {},
};
