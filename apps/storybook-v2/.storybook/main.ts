import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';
import remarkGfm from 'remark-gfm';

const config: StorybookConfig = {
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },

  stories: [
    './welcome.mdx',
    '../../../packages/components/*/stories/*.stories.@(js|jsx|ts|tsx|mdx)',
    '../../../packages/core/theme/stories/*.stories.@(js|jsx|ts|tsx|mdx)',
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

  managerHead: (head) => `
    ${head}
    <style>
      /* Hide default Storybook SVG branding specifically */
      [data-testid="brand-logo"] > svg,
      .sidebar-header a > svg,
      a[title="Storybook"] > svg { 
        display: none !important; 
      }

      /* Style the brand logo container and the image rendered via brandImage */
      [data-testid="brand-logo"],
      .sidebar-header a[href="./"],
      a[title="Storybook"] {
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        background-color: transparent !important;
        min-height: 48px !important;
        width: 100% !important;
        margin-bottom: 8px !important;
        text-decoration: none !important;
      }

      [data-testid="brand-logo"] img,
      .sidebar-header a img,
      a[title="Storybook"] img {
        max-height: 32px !important;
        width: auto !important;
        max-width: 160px !important;
        object-fit: contain !important;
        display: block !important;
      }
    </style>
  `,
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
