import type { Meta, StoryObj } from '@storybook/react';
import { Tile, Button } from '@carbon/react';

const meta: Meta<typeof Tile> = {
  title: 'Components/Tile',
  component: Tile,
  args: {
    children: 'Simple tile content',
  },
};

export default meta;
type Story = StoryObj<typeof Tile>;

export const Default: Story = {};

export const WithActions: Story = {
  args: {
    // keep args lightweight; render uses these
    title: 'Card title',
    content: 'This is a short description inside the tile used for the demo.',
    buttonLabel: 'Delete',
  },
  render: (args) => (
    <Tile>
      <h3 style={{ margin: '0 0 8px 0' }}>{(args as any).title}</h3>
      <p style={{ margin: '0 0 12px 0' }}>{(args as any).content}</p>
      <Button kind="danger" size="sm">{(args as any).buttonLabel || 'Delete'}</Button>
    </Tile>
  ),
};
