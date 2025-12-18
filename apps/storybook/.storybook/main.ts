// .storybook/main.ts
import type {StorybookConfig} from "@storybook/react-vite";
import remarkGfm from "remark-gfm";

const config: StorybookConfig = {
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  stories: [
    "../**/*.mdx",
    "../**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../../../packages/components/**/src/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../../../packages/primitives/**/src/**/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../../../packages/themes/**/src/**/*.stories.@(js|jsx|ts|tsx|mdx)",
  ],

  staticDirs: ["../public"],

  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-links",
    "@storybook/addon-a11y",
    {
      name: "@storybook/addon-docs",
      options: {
        mdxPluginOptions: {
          mdxCompileOptions: {
            remarkPlugins: [remarkGfm],
          },
        },
      },
    },
  ],

  core: {disableTelemetry: true},

  typescript: {
    reactDocgen: false,
  },
};

export default config;
