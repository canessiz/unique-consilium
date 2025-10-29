import type { Preview, Decorator } from '@storybook/react';
import '../app/globals.scss';
import CarbonLayout from './decorators/CarbonLayout';

type CarbonTheme = 'g10' | 'g90' | 'g100';

// Read stored theme once (SSR-safe)
const storedTheme: CarbonTheme | null =
  typeof window !== 'undefined'
    ? ((localStorage.getItem('sb-carbon-theme') as CarbonTheme | null) ?? null)
    : null;

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Carbon theme',
    defaultValue: (storedTheme ?? 'g10') as CarbonTheme,
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: 'g10', title: 'g10 (light)' },
        { value: 'g90', title: 'g90 (dark)' },
        { value: 'g100', title: 'g100 (gray)' },
      ],
      dynamicTitle: true,
    },
  },
};

const withCarbonTheme: Decorator = (Story, context) => {
  const theme = (context.globals.theme ?? 'g10') as CarbonTheme;
  if (typeof document !== 'undefined') {
    const root = document.documentElement;
    root.setAttribute('data-carbon-theme', theme);
  }
  if (typeof window !== 'undefined') {
    try {
      localStorage.setItem('sb-carbon-theme', theme);
    } catch {
      /* ignore */
    }
  }
  return Story();
};

const preview: Preview = {
  decorators: [CarbonLayout, withCarbonTheme],
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    viewport: {
      viewports: {
        sm:  { name: 'sm — 320',  styles: { width: '320px',  height: '100%' } },
        md:  { name: 'md — 672',  styles: { width: '672px',  height: '100%' } },
        lg:  { name: 'lg — 1056', styles: { width: '1056px', height: '100%' } },
        xlg: { name: 'xlg — 1312',styles: { width: '1312px', height: '100%' } },
      },
    },
  },
};

export default preview;
 
