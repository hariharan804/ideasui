// import { scan } from 'react-scan';

// if (typeof window !== 'undefined') {
//   scan({
//     enabled: true,
//     showToolbar: true,
//     log: false,
//   });
// }

import type { Preview } from '@storybook/react-vite';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';

import './globals.css';

// Import Addon Global Types
import { i18nGlobalType } from './addons/localization-extension/preview';
import { themeGlobalType } from './addons/theming-engine/preview';
import { reduceMotionGlobalType } from './addons/motion-controller/preview';
import { strictModeGlobalType } from './addons/integrity-validator/preview';
import { reactScanGlobalType } from './addons/performance-profiler/preview';

// Import Addon Decorators
import { withInternationalization } from './addons/localization-extension/extension';
import { withReduceMotion } from './addons/motion-controller/extension';
import { withReactStrictMode } from './addons/integrity-validator/extension';
import { withReactScan } from './addons/performance-profiler/extension';
import { withTheme } from './addons/theming-engine/extension';

const decorators: Preview['decorators'] = [
  withReactStrictMode,
  withReactScan,
  withReduceMotion,
  withInternationalization,
  withTheme,
];

const parameters: Preview['parameters'] = {
  layout: 'fullscreen',
  options: {
    storySort: {
      method: 'alphabetical',
      order: ['Welcome', 'Color System', 'Foundations', 'Components', 'Demos'],
    },
  },

  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },

  docs: {
    // theme: "light",
  },

  a11y: {
    test: 'todo',
  },
};

const globalTypes: Preview['globalTypes'] = {
  ...i18nGlobalType,
  ...themeGlobalType,
  ...reduceMotionGlobalType,
  ...strictModeGlobalType,
  ...reactScanGlobalType,
} as any;

const preview: Preview = {
  decorators,
  parameters,
  globalTypes,
  tags: ['autodocs'],
};

export default preview;
