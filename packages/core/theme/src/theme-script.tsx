import {memo, useMemo} from "react";
import type {ThemeConfig} from "./types";

import {createScript} from "./utils/script";
import {defaultConfig} from "./utils/themes.config";

export interface ThemeScriptProps extends Partial<ThemeConfig> {
  nonce?: string;
  scriptProps?: Omit<
    React.ScriptHTMLAttributes<HTMLScriptElement>,
    "id" | "nonce" | "dangerouslySetInnerHTML" | "suppressHydrationWarning"
  >;
  id?: string;
}

const validateThemeConfig = (config: ThemeConfig): ThemeConfig => {
  const isValidString = (str: unknown): str is string =>
    typeof str === "string" && /^[\w.:-]+$/.test(str) && str.length < 50;

  const validThemes = Array.isArray(config.themes)
    ? config.themes.filter(isValidString)
    : ["light", "dark"];

  return {
    ...config,
    themes: validThemes.length > 0 ? validThemes : ["light", "dark"],
    defaultTheme: isValidString(config.defaultTheme) ? config.defaultTheme : "light",
    storageKey: isValidString(config.storageKey) ? config.storageKey : "theme",
    systemThemes: {
      light: isValidString(config.systemThemes?.light) ? config.systemThemes.light : "light",
      dark: isValidString(config.systemThemes?.dark) ? config.systemThemes.dark : "dark",
    },
  };
};

export const ThemeScript = memo<ThemeScriptProps>((props) => {
  const {nonce, scriptProps, id = "theme-script", ...themeProps} = props;

  const script = useMemo(() => {
    const merged: ThemeConfig = {
      ...defaultConfig,
      ...themeProps,
      themes: Array.from(new Set([...(defaultConfig.themes || []), ...(themeProps.themes || [])])),
    };
    const validated = validateThemeConfig(merged);

    return createScript(validated);
  }, [themeProps]);

  return (
    <script
      id={id}
      {...scriptProps}
      dangerouslySetInnerHTML={{__html: script}}
      suppressHydrationWarning
      nonce={nonce}
    />
  );
});

ThemeScript.displayName = "ThemeScript";
