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
    "../../../packages/components/**/stories/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../../../packages/primitives/**/stories/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../../../packages/themes/**/stories/*.stories.@(js|jsx|ts|tsx|mdx)",
  ],

  staticDirs: ["../public"],

  addons: [
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
