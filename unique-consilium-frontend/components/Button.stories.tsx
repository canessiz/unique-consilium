import type { Meta, StoryObj } from '@storybook/react';
import Button from './Button'; // ← default export'u kullan

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: { children: 'Primary' },
};
export default meta;

type Story = StoryObj<typeof Button>;

export const Primary: Story = {};

export const Disabled: Story = {
  args: { disabled: true, children: 'Disabled' },
};
