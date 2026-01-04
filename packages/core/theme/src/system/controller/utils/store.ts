import {defaultConfig} from "./themes.config";

// Module-scoped store for theme state (shared across hooks)
export type ThemeState = {
  theme: string; // 'light' | 'dark' | 'system' | custom
  resolved: string; // actual applied: 'light' | 'dark' | custom
  themes: string[]; // available themes
  systemThemes: {light: string; dark: string};
};

type Listener = () => void;

let state: ThemeState = {
  theme: defaultConfig.defaultTheme,
  resolved: "light",
  themes: defaultConfig.themes,
  systemThemes: defaultConfig.systemThemes,
};

const listeners = new Set<Listener>();

export const themeStore = {
  get: () => state,
  set: (patch: Partial<ThemeState>) => {
    state = {...state, ...patch};
    listeners.forEach((l) => l());
  },
  subscribe: (fn: Listener) => {
    listeners.add(fn);

    return () => {
      listeners.delete(fn);
    };
  },
};
