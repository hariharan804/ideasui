import type { Config } from 'tailwindcss';

import { ideasUIPlugin } from '@ideasui/theme/plugin';

const config: Config = {
  content: [
    './.storybook/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/components/**/src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/components/**/stories/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/core/theme/src/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/core/theme/stories/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    ideasUIPlugin({}) as any,
  ],
};

export default config;
