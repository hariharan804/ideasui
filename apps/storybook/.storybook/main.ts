// .storybook/main.ts
import type { StorybookConfig } from '@storybook/react-vite'
import remarkGfm from 'remark-gfm'

const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  stories: [
    '../**/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../**/*.mdx',
    '../../../packages/**/src/**/*.stories.@(js|jsx|ts|tsx|mdx)',
  ],

  staticDirs: ['../public'],

  addons: [
    '@storybook/addon-essentials',
    '@storybook/addon-links',
    '@storybook/addon-a11y',
    '@storybook/addon-viewport',
    '@storybook/addon-backgrounds',
    '@storybook/addon-design-tokens',
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
}

export default config
