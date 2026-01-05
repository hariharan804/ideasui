/** Layout token configuration */
export interface LayoutTokens {
  /** Border radius - small (default: 0.25rem) */
  radiusSmall?: string;
  /** Border radius - medium (default: 0.5rem) */
  radiusMedium?: string;
  /** Border radius - large (default: 0.75rem) */
  radiusLarge?: string;
  /** Border width - small (default: 1px) */
  borderWidthSmall?: string;
  /** Border width - medium (default: 2px) */
  borderWidthMedium?: string;
  /** Border width - large (default: 3px) */
  borderWidthLarge?: string;
  /** Box shadow - small */
  boxShadowSmall?: string;
  /** Box shadow - medium */
  boxShadowMedium?: string;
  /** Box shadow - large */
  boxShadowLarge?: string;
  /** Opacity for hover states (default: 0.8) */
  hoverOpacity?: string;
  /** Opacity for disabled states (default: 0.5) */
  disabledOpacity?: string;
  /** Divider weight (default: 1px) */
  dividerWeight?: string;
  /** Focus ring width (default: 2px) */
  focusRingWidth?: string;
  /** Focus ring offset (default: 2px) */
  focusRingOffset?: string;
  /** Allow additional custom properties */
  [key: string]: string | number | undefined;
}

export interface ThemeConfig {
  /** Theme configurations */
  themes?: Record<
    string,
    {
      colors?: Partial<ColorTokens>;
      layout?: Partial<LayoutTokens>;
    }
  >;
  /** Default theme name */
  defaultTheme?: "light" | "dark" | string;
  /** CSS variable prefix */
  prefix?: string;
  /** Global layout configuration */
  layout?: Partial<LayoutTokens>;
  /** Disable all animations globally */
  disableAnimations?: boolean;
  // /** Custom spacing overrides */
  // spacing?: Record<string, string>;
  // /** Custom border radius overrides */
  // borderRadius?: Record<string, string>;
  // /** Custom font size overrides */
  // fontSize?: Record<string, string | [string, {lineHeight: string}]>;
  // /** Custom animation overrides */
  // animation?: Record<string, string>;
  // /** Custom keyframes */
  // keyframes?: Record<string, Record<string, any>>;
}

export interface ColorScale {
  50?: string;
  100?: string;
  200?: string;
  300?: string;
  400?: string;
  500?: string;
  600?: string;
  700?: string;
  800?: string;
  900?: string;
  950?: string;
}

export interface ColorTokens {
  primary?: ColorScale;
  secondary?: ColorScale;
  success?: ColorScale;
  warning?: ColorScale;
  danger?: ColorScale;
  info?: ColorScale;
  neutral?: ColorScale;
  /** Common flat colors */
  white?: string;
  black?: string;
  [key: string]: ColorScale | string | undefined;
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

/** All colors are stored and output as OKLCH */
export type ColorFn = "oklch";

export type ConfigTheme = {
  extend?: "light" | "dark";
  layout?: Partial<LayoutTokens>;
  colors?: Partial<ColorTokens>;
};

export type ConfigThemes = Record<string, ConfigTheme>;

export type ResolvedConfig = {
  variants: {name: string; definition: string[]}[];
  utilities: Record<string, Record<string, string>>;
  colors: Record<string, string>;
  baseStyles: Record<string, Record<string, string>>;
};

export type ParsedColor = {
  cssFn: ColorFn;
  components: (string | number)[];
};
