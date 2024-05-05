import type { StoryObj, Meta } from '@storybook/html';
import { createRenderer } from './ASCII3DRenderer';
import './renderer.css';

const meta = {
  title: 'Example/ASCII3DRenderer',
  tags: ['autodocs'],
  render: (args) => {
    return createRenderer();
  },
} satisfies Meta;

export default meta;
type Story = StoryObj;

export const Default: Story = {
  args: {},
};
