import type { Meta, StoryObj } from '@storybook/react';
import { Tag } from '@carbon/react';

const meta: Meta<typeof Tag> = {
  title: 'Components/Tag',
  component: Tag,
  args: { children: 'Label', type: 'gray' },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Tag>;

export const Default: Story = {};
export const Success: Story = { args: { type: 'green', children: 'Success' } };
export const Filterable: Story = { args: { filter: true, children: 'Filterable' } };
