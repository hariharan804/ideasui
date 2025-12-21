// .storybook/main.ts
import type {StorybookConfig} from "@storybook/react-vite";
import remarkGfm from "remark-gfm";

const config: StorybookConfig = {
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },

  stories: [
    "../../../packages/components/button/stories/*.stories.@(js|jsx|ts|tsx|mdx)",
    "../../../packages/components/ripple/stories/*.stories.@(js|jsx|ts|tsx|mdx)",

    // safety exclusions (pnpm + build artifacts)
    "!**/node_modules/**",
    "!**/node_modules",
    "!**/.pnpm/**",
    "!**/dist/**",
    "!**/build/**",
  ],

  staticDirs: ["../public"],
  refs: {},
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
