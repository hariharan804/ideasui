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

/** Override any design token family */
export interface TokenOverrides {
  /** Spacing scale (4px grid) */
  readonly spacing?: Record<SpacingProps | (string & {}), string>;
  /** Border radius tokens */
  readonly borderRadius?: Record<BorderRadiusProps | (string & {}), string>;
  /** Border width tokens */
  readonly borderWidth?: Record<BorderWidthProps | (string & {}), string>;
  /** Border color tokens */
  readonly borderColor?: Record<string, string>;
  /** Font size tokens (value or [size, { lineHeight }] tuple) */
  readonly fontSize?: Record<
    FontSizeProps | (string & {}),
    string | [string, { lineHeight: string }]
  >;
  /** Letter spacing tokens */
  readonly letterSpacing?: Record<LetterSpacingProps | (string & {}), string>;
  /** Font family tokens */
  readonly fontFamily?: Record<FontFamilyProps | (string & {}), string>;
  /** Font weight tokens */
  readonly fontWeight?: Record<FontWeightProps | (string & {}), string>;
  /** Box shadow tokens */
  readonly boxShadow?: Record<BoxShadowProps | (string & {}), string>;
  /** Z-index tokens */
  readonly zIndex?: Record<ZIndexProps | (string & {}), string | number>;
  /** Opacity tokens */
  readonly opacity?: Record<OpacityProps | (string & {}), string | number>;
  /** Blur tokens */
  readonly blur?: Record<BlurProps | (string & {}), string>;
  // /** Responsive breakpoints */
  // readonly breakpoints?: Record<'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | (string & {}), string>;
  /** Transition duration tokens */
  readonly duration?: Record<DurationProps | (string & {}), string>;
  /** Transition easing tokens */
  readonly easing?: Record<EasingProps | (string & {}), string>;
  /** Animation presets */
  readonly animation?: Record<AnimationProps | (string & {}), string>;
  /** Keyframe definitions */
  readonly keyframes?: Record<string, Record<string, Record<string, string>>>;
}

/** Override semantic token usage */
export interface SemanticTokenOverrides {
  /** Surface overrides */
  readonly surface?: Record<SurfaceProps | (string & {}), string>;
  /** Content overrides */
  readonly content?: Record<ContentProps | (string & {}), string>;
  /** Border color overrides */
  readonly border?: Record<string, string>;
  /** Elevation/shadow overrides */
  readonly elevation?: Record<string, string>;
}

export interface ThemeConfig {
  /** Theme configurations */
  readonly themes?: Record<
    string,
    {
      readonly colors?: Partial<ColorTokens>;
      readonly designTokens?: Partial<TokenOverrides>;
      readonly semanticTokens?: Partial<SemanticTokenOverrides>;
      readonly components?: Record<string, unknown>;
    }
  >;
  /** Default theme name */
  readonly defaultTheme?: 'light' | 'dark' | string;
  /** CSS variable prefix */
  readonly prefix?: string;
  /** Disable all animations globally */
  readonly disableAnimations?: boolean;
  /** Override any design token family */
  readonly designTokens?: Partial<TokenOverrides>;
  /** Override semantic tokens globally */
  readonly semanticTokens?: Partial<SemanticTokenOverrides>;
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
