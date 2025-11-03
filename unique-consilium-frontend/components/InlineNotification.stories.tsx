import type { Meta, StoryObj } from '@storybook/react';
import { InlineNotification } from '@carbon/react';

const meta: Meta<typeof InlineNotification> = {
  title: 'Components/InlineNotification',
  component: InlineNotification,
  args: {
    title: 'Notification title',
    subtitle: 'Short helper text goes here.',
    hideCloseButton: false,
  },
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof InlineNotification>;

export const Info: Story = { args: { kind: 'info' } };
export const Success: Story = { args: { kind: 'success' } };
export const Warning: Story = { args: { kind: 'warning' } };
export const ErrorLowContrast: Story = { args: { kind: 'error', lowContrast: true } };
