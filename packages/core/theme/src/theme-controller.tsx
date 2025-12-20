import type {ThemeConfig} from "./types";

import {useThemeController} from "./use-theme-controller";

export function ThemeController(props: Partial<ThemeConfig>) {
  useThemeController(props);

  return null; // no UI
}
