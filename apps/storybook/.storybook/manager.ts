import { addons } from 'storybook/manager-api';
import { themes } from './styles/theme';

// Apply IdeasUI branding immediately on load
addons.setConfig({
  theme: themes.light, // Default to light, addon handles dynamic switching
});

import './addons/theming-engine/manager';
