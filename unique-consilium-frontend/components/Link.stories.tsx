import type { Meta, StoryObj } from '@storybook/react';
import { Link } from '@carbon/react';

const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  args: { href: '#', children: 'Example link' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {};
export const Inline: Story = { args: { inline: true, children: 'Inline link' } };
export const Visited: Story = { args: { visited: true, children: 'Visited link' } };
