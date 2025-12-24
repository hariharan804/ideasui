export interface ThemeConfig {
  /** Theme configurations */
  themes?: Record<string, {colors?: Record<string, any>; layout?: Record<string, any>}>;
  /** Default theme name */
  defaultTheme?: "light" | "dark" | string;
  /** CSS variable prefix */
  prefix?: string;
  /** Global layout configuration */
  layout?: Record<string, any>;
  /** Disable all animations globally */
  disableAnimations?: boolean;
  /** Custom spacing overrides */
  spacing?: Record<string, string>;
  /** Custom border radius overrides */
  borderRadius?: Record<string, string>;
  /** Custom font size overrides */
  fontSize?: Record<string, string | [string, {lineHeight: string}]>;
  /** Custom animation overrides */
  animation?: Record<string, string>;
  /** Custom keyframes */
  keyframes?: Record<string, Record<string, any>>;
}

export interface ColorScale {
  50: string;
  100: string;
  200: string;
  300: string;
  400: string;
  500: string;
  600: string;
  700: string;
  800: string;
  900: string;
  950: string;
}

export interface ColorTokens {
  primary: ColorScale;
  secondary: ColorScale;
  success: ColorScale;
  warning: ColorScale;
  danger: ColorScale;
  info: ColorScale;
  neutral: ColorScale;
}

export interface SemanticColors {
  background: string;
  foreground: string;
  muted: string;
  "muted-foreground": string;
  card: string;
  "card-foreground": string;
  border: string;
  input: string;
  ring: string;
  primary: string;
  "primary-foreground": string;
  secondary: string;
  "secondary-foreground": string;
  success: string;
  "success-foreground": string;
  warning: string;
  "warning-foreground": string;
  danger: string;
  "danger-foreground": string;
  info: string;
  "info-foreground": string;
}

export interface IdeasUITheme {
  colors: ColorTokens & {gray: ColorScale};
  semanticColors: SemanticColors;
  spacing: Record<string, string>;
  borderRadius: Record<string, string>;
  fontSize: Record<string, string | [string, {lineHeight: string}]>;
  boxShadow: Record<string, string>;
  animation: Record<string, string>;
  keyframes: Record<string, Record<string, any>>;
  transitionDuration: Record<string, string>;
  transitionTimingFunction: Record<string, string>;
}

export type ThemeMode = "light" | "dark" | "system";

// import type {storageAdapters} from "./utils/storage";

// /** How themes are applied to DOM elements */
// export type ThemeMode =
//   | "class" // Uses CSS classes: html.dark { ... } (Tailwind CSS standard)
//   | "attribute"; // Uses data attributes: html[data-theme="dark"] { ... }

// /** Complete theme configuration interface */
// export interface ThemeConfig {
//   /** Available theme names */
//   themes: string[];
//   /** Default theme when none is stored */
//   defaultTheme: string;
//   /** localStorage key for persistence */
//   storageKey: string;

//   /** How to apply theme to DOM
//    * - 'class': Adds theme as CSS class (Tailwind CSS standard)
//    * - 'attribute': Sets theme as data attribute value
//    */
//   mode: ThemeMode;

//   /** Mapping of system preferences to theme names */
//   systemThemes: {light: string; dark: string};

//   storage?: keyof typeof storageAdapters;
// }

// /** Storage interface for theme persistence */
// export interface StorageAdapter {
//   /** Get stored value by key */
//   getItem(key: string): string | null;
//   /** Store value by key */
//   setItem(key: string, value: string): void;
//   /** Remove stored value by key */
//   removeItem(key: string): void;
// }
