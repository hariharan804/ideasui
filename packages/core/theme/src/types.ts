import type {
  SpacingProps,
  BorderRadiusProps,
  FontSizeProps,
  LetterSpacingProps,
  FontFamilyProps,
  FontWeightProps,
  BoxShadowProps,
  ZIndexProps,
  OpacityProps,
  BlurProps,
  BorderWidthProps,
  SurfaceProps,
  ContentProps,
  DurationProps,
  EasingProps,
  AnimationProps,
} from './tokens';

export type ThemeToken<K extends string | number | symbol, V> = Partial<Record<K, V>> &
  Record<string, V>;

/** Override any design token family */
export interface TokenOverrides {
  /** Spacing scale (4px grid) */
  readonly spacing?: ThemeToken<SpacingProps, string>;
  /** Border radius tokens */
  readonly borderRadius?: ThemeToken<BorderRadiusProps, string>;
  /** Border width tokens */
  readonly borderWidth?: ThemeToken<BorderWidthProps, string>;
  /** Border color tokens */
  readonly borderColor?: Partial<Record<string, string>>;
  /** Font size tokens (value or [size, { lineHeight }] tuple) */
  readonly fontSize?: ThemeToken<FontSizeProps, string | [string, { lineHeight: string }]>;
  /** Letter spacing tokens */
  readonly letterSpacing?: ThemeToken<LetterSpacingProps, string>;
  /** Font family tokens */
  readonly fontFamily?: ThemeToken<FontFamilyProps, string>;
  /** Font weight tokens */
  readonly fontWeight?: ThemeToken<FontWeightProps, string>;
  /** Box shadow tokens */
  readonly boxShadow?: ThemeToken<BoxShadowProps, string>;
  /** Z-index tokens */
  readonly zIndex?: ThemeToken<ZIndexProps, string | number>;
  /** Opacity tokens */
  readonly opacity?: ThemeToken<OpacityProps, string | number>;
  /** Blur tokens */
  readonly blur?: ThemeToken<BlurProps, string>;
  /** Transition duration tokens */
  readonly duration?: ThemeToken<DurationProps, string>;
  /** Transition easing tokens */
  readonly easing?: ThemeToken<EasingProps, string>;
  /** Animation presets */
  readonly animation?: ThemeToken<AnimationProps, string>;
  /** Keyframe definitions */
  readonly keyframes?: Partial<Record<string, Record<string, Record<string, string>>>>;
}

/** Override semantic token usage */
export interface SemanticTokenOverrides {
  readonly surface?: ThemeToken<SurfaceProps, string>;
  /** Content overrides */
  readonly content?: ThemeToken<ContentProps, string>;
  /** Border color overrides */
  readonly border?: Partial<Record<string, string>>;
}

export interface ThemeOptions {
  readonly colors?: Partial<ColorTokens>;
  readonly designTokens?: Partial<TokenOverrides>;
  readonly semanticTokens?: Partial<SemanticTokenOverrides>;
  readonly components?: Record<string, unknown>;
}

export interface ThemeConfig {
  /** Theme configurations */
  readonly themes?: {
    light?: ThemeOptions;
    dark?: ThemeOptions;
    [themeName: string]: ThemeOptions | undefined;
  };
  /** Default theme name */
  readonly defaultTheme?: 'light' | 'dark' | string;
  /** CSS variable prefix */
  // readonly prefix?: string;
  /** Disable all animations globally */
  readonly disableAnimations?: boolean;
  /** Override any design token family */
  readonly designTokens?: Partial<TokenOverrides>;
  /** Override semantic tokens globally */
  readonly semanticTokens?: Partial<SemanticTokenOverrides>;
  /** Global component style overrides */
  readonly components?: Record<string, unknown>;
}

export interface ColorScale {
  readonly 50?: string;
  readonly 100?: string;
  readonly 200?: string;
  readonly 300?: string;
  readonly 400?: string;
  readonly 500?: string;
  readonly 600?: string;
  readonly 700?: string;
  readonly 800?: string;
  readonly 900?: string;
  readonly 950?: string;
  readonly [key: string]: string | undefined;
}

export interface ColorTokens {
  readonly primary?: ColorScale;
  readonly secondary?: ColorScale;
  readonly success?: ColorScale;
  readonly warning?: ColorScale;
  readonly danger?: ColorScale;
  readonly info?: ColorScale;
  readonly neutral?: ColorScale;
  /** Common flat colors */
  readonly white?: string;
  readonly black?: string;
  readonly [key: string]: ColorScale | string | undefined;
}

export type ThemeMode = 'light' | 'dark' | 'system';

/** All colors are stored and output as OKLCH */
export type ColorFn = 'oklch' | 'var';

export type ConfigTheme = {
  readonly extend?: 'light' | 'dark';
  readonly colors?: Partial<ColorTokens>;
  readonly designTokens?: Partial<TokenOverrides>;
  readonly semanticTokens?: Partial<SemanticTokenOverrides>;
  readonly components?: Record<string, unknown>;
};

export type ConfigThemes = Record<string, ConfigTheme>;

export type ResolvedConfig = {
  variants: { name: string; definition: string[] }[];
  utilities: Record<string, Record<string, string>>;
  colors: Record<string, string>;
  baseStyles: Record<string, Record<string, string>>;
};

export type ParsedColor = {
  cssFn: ColorFn;
  components: (string | number)[];
};
