import type { ThemeScriptConfig } from './types';

import { useThemeController } from './use-theme-controller';

export function ThemeProvider(props: Partial<ThemeScriptConfig>) {
  useThemeController(props);

  return null; // no UI
}
