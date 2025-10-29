/* Wrap stories in a Carbon grid container so Canvas reflects app layout */
import type { Decorator } from '@storybook/react';

const CarbonLayout: Decorator = (Story) => {
  return (
    <div className="cds--grid" style={{ padding: 'var(--cds-spacing-07)' }}>
      <div className="cds--row">
        <div className="cds--col-sm-4 cds--col-md-8 cds--col-lg-12">
          <Story />
        </div>
      </div>
    </div>
  );
};

export default CarbonLayout;
