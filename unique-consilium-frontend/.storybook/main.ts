import type { StorybookConfig } from '@storybook/nextjs';

const config: StorybookConfig = {
  framework: '@storybook/nextjs',
  stories: [
    '../stories/**/*.mdx',
    '../stories/**/*.stories.@(js|jsx|ts|tsx)',
    '../components/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],
  addons: [
    '@storybook/addon-a11y',
    '@storybook/addon-measure',
    '@storybook/addon-outline',
  ],
  webpackFinal: async (config) => {
    // Enable quieter Sass warnings from dependencies
    const rules = (config.module?.rules ?? []) as any[];
    const visit = (rule: any) => {
      if (Array.isArray(rule)) rule.forEach(visit);
      if (rule && Array.isArray(rule.oneOf)) rule.oneOf.forEach(visit);
      if (rule && Array.isArray(rule.use)) rule.use.forEach(visit);
      if (rule && rule.loader && /sass-loader/.test(rule.loader)) {
        rule.options = rule.options || {};
        const current = rule.options.sassOptions || {};
        rule.options.sassOptions = { ...current, quietDeps: true };
      }
    };
    rules.forEach(visit);
    return config;
  },
};

export default config;
