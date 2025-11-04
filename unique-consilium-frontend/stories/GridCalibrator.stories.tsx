import type { Meta, StoryObj } from '@storybook/react';

const GridDemo = () => (
  <div className="cds--grid" style={{ padding: '1rem' }}>
    <div className="cds--row">
      {Array.from({ length: 16 }).map((_, i) => (
        <div key={i} className="cds--col">
          <div
            style={{
              height: 64,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'var(--cds-layer-01)',
              border: '1px dashed var(--cds-border-subtle-01)',
              font: '12px/1 var(--cds-code-01, monospace)',
            }}
          >
            {i + 1}
          </div>
        </div>
      ))}
    </div>
  </div>
);

const meta: Meta<typeof GridDemo> = {
  title: 'Dev/GridCalibrator',
  component: GridDemo,
  parameters: { layout: 'fullscreen' },
};
export default meta;

type Story = StoryObj<typeof GridDemo>;
export const SixteenColumns: Story = {};
