// .storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import remarkGfm from 'remark-gfm';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  stories: [
    //welcome story
    './welcome.mdx',
    '../../../packages/components/*/stories/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../../../packages/core/theme/stories/*.stories.@(js|jsx|ts|tsx|mdx)',
    // "../../../packages/primitives/*/stories/*.stories.@(js|jsx|ts|tsx|mdx)",
    '!**/node_modules/**',
    '!**/.pnpm/**',
    '!**/dist/**',
    '!**/build/**',
  ],

  staticDirs: ['../public'],
  refs: {},
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    {
      name: '@storybook/addon-docs',
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
    '@storybook/addon-vitest',
  ],

  core: { disableTelemetry: true },

  typescript: {
    reactDocgen: false,
  },

  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
      },
    });
  },
};

export default config;
