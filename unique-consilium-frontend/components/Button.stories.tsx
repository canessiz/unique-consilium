import type { Meta, StoryObj } from '@storybook/react';
import { InlineLoading } from '@carbon/react';
import Button, { ButtonProps } from './Button';

type Kind = 'primary' | 'secondary' | 'danger' | 'tertiary' | 'ghost';
type Size = 'sm' | 'md' | 'lg';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  args: {
    children: 'Button',
    kind: 'primary' as Kind,
    size: 'md' as Size,
  },
  argTypes: {
    kind: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'danger', 'tertiary', 'ghost'],
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Primary',
    disabled: false,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled',
    disabled: true,
  },
};

export const Loading: Story = {
  render: (args) => (
    <Button {...args} disabled>
      <InlineLoading status="active" />
      <span style={{ paddingInlineStart: 'var(--cds-spacing-03)' }}>{args.children ?? 'Loading'}</span>
    </Button>
  ),
  args: {
    children: 'Loading',
  },
};
 
