import type { Meta, StoryObj } from '@storybook/react';
import { Tile, Button } from '@carbon/react';
import './Tile.stories.scss';

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

export const WithActions: StoryObj<{ title: string; content: string; buttonLabel?: string }> = {
  args: {
    // keep args lightweight; render uses these
    title: 'Card title',
    content: 'This is a short description inside the tile used for the demo.',
    buttonLabel: 'Delete',
  },
  render: (args) => (
    <Tile>
      <h3 className="tile-title">{(args as any).title}</h3>
      <p className="tile-desc">{(args as any).content}</p>
      <Button kind="danger" size="sm">{(args as any).buttonLabel || 'Delete'}</Button>
    </Tile>
  ),
};
