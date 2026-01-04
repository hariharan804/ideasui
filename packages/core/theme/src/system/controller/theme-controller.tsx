import type {ThemeScriptConfig} from "./types";

import {useThemeController} from "./use-theme-controller";

export function ThemeController(props: Partial<ThemeScriptConfig>) {
  useThemeController(props);

  return null; // no UI
}
