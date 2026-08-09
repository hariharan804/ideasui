import type {
  SpacingProps as SpacingProperties,
  BorderRadiusProps as BorderRadiusProperties,
  FontSizeProps as FontSizeProperties,
  LetterSpacingProps as LetterSpacingProperties,
  FontFamilyProps as FontFamilyProperties,
  FontWeightProps as FontWeightProperties,
  BoxShadowProps as BoxShadowProperties,
  ZIndexProps as ZIndexProperties,
  OpacityProps as OpacityProperties,
  BlurProps as BlurProperties,
  BorderWidthProps as BorderWidthProperties,
  SurfaceProps as SurfaceProperties,
  ContentProps as ContentProperties,
  DurationProps as DurationProperties,
  EasingProps as EasingProperties,
  AnimationProps as AnimationProperties,
} from './tokens';

export type ThemeToken<K extends string | number | symbol, V> = Partial<Record<K, V>> &
  Record<string, V>;

/** Override any design token family */
export interface TokenOverrides {
  /** Spacing scale (4px grid) */
  readonly spacing?: ThemeToken<SpacingProperties, string>;
  /** Border radius tokens */
  readonly borderRadius?: ThemeToken<BorderRadiusProperties, string>;
  /** Border width tokens */
  readonly borderWidth?: ThemeToken<BorderWidthProperties, string>;
  /** Border color tokens */
  readonly borderColor?: Partial<Record<string, string>>;
  /** Font size tokens (value or [size, { lineHeight }] tuple) */
  readonly fontSize?: ThemeToken<FontSizeProperties, string | [string, { lineHeight: string }]>;
  /** Letter spacing tokens */
  readonly letterSpacing?: ThemeToken<LetterSpacingProperties, string>;
  /** Font family tokens */
  readonly fontFamily?: ThemeToken<FontFamilyProperties, string>;
  /** Font weight tokens */
  readonly fontWeight?: ThemeToken<FontWeightProperties, string>;
  /** Box shadow tokens */
  readonly boxShadow?: ThemeToken<BoxShadowProperties, string>;
  /**
   * Shadow tokens — alias for `boxShadow`.
   * @example shadow: { sm: '0 2px 4px rgb(0 0 0 / 0.06)' }
   */
  readonly shadow?: ThemeToken<BoxShadowProperties, string>;
  /** Z-index tokens */
  readonly zIndex?: ThemeToken<ZIndexProperties, string | number>;
  /** Opacity tokens */
  readonly opacity?: ThemeToken<OpacityProperties, string | number>;
  /** Blur tokens */
  readonly blur?: ThemeToken<BlurProperties, string>;
  /** Transition duration tokens */
  readonly duration?: ThemeToken<DurationProperties, string>;
  /** Transition easing tokens */
  readonly easing?: ThemeToken<EasingProperties, string>;
  /** Animation presets */
  readonly animation?: ThemeToken<AnimationProperties, string>;
  /** Keyframe definitions */
  readonly keyframes?: Partial<Record<string, Record<string, Record<string, string>>>>;
}

/**
 * Grouped semantic surface token overrides.
 * Keys are emitted as `--ideasui-color-{key}`.
 */
export type SurfaceTokenOverrides = ThemeToken<SurfaceProperties, string>;

/**
 * Grouped semantic content token overrides.
 * Keys are emitted as `--ideasui-color-content-{key}`.
 */
export type ContentTokenOverrides = ThemeToken<ContentProperties, string>;

/**
 * Grouped semantic border token overrides.
 * Keys are emitted as `--ideasui-border-{key}`.
 */
export type BorderTokenOverrides = Partial<Record<string, string>>;

/**
 * Override semantic token usage.
 *
 * Supports two forms that can be combined freely:
 *
 * **Flat tokens** — arbitrary key → color string. Each key is emitted as
 * `--ideasui-color-{key}`, making it addressable in Tailwind as `bg-{key}` etc.
 * This is the primary way to override intent colors.
 * ```ts
 * semanticTokens: {
 *   primary:            'oklch(0.55 0.22 268.4)',
 *   'on-primary':       'oklch(0.98 0.02 240)',
 *   'primary-muted':    'var(--ideasui-color-primary-100)',
 *   scrim:              'oklch(0 0 0 / 0.45)',
 * }
 * ```
 *
 * **Grouped tokens** — structured sub-objects for surface, content, and border.
 * Keys inside `content` are prefixed with `content-`; keys inside `border` map
 * to `--ideasui-border-{key}`.
 * ```ts
 * semanticTokens: {
 *   surface:  { cus: 'red', 'on-cus': 'blue' },
 *   content:  { cus: 'red' },
 *   border:   { cus: 'red' },
 * }
 * ```
 */
export type SemanticTokenOverrides = {
  // ── Intent: Primary ──────────────────────────────────────────
  primary?: string;
  'on-primary'?: string;
  'primary-subtle'?: string;
  'on-primary-subtle'?: string;
  'primary-muted'?: string;
  'on-primary-muted'?: string;

  // ── Intent: Secondary ─────────────────────────────────────────
  secondary?: string;
  'on-secondary'?: string;
  'secondary-subtle'?: string;
  'on-secondary-subtle'?: string;
  'secondary-muted'?: string;
  'on-secondary-muted'?: string;

  // ── Intent: Tertiary ──────────────────────────────────────────
  tertiary?: string;
  'on-tertiary'?: string;
  'tertiary-subtle'?: string;
  'on-tertiary-subtle'?: string;
  'tertiary-muted'?: string;
  'on-tertiary-muted'?: string;

  // ── Intent: Success ───────────────────────────────────────────
  success?: string;
  'on-success'?: string;
  'success-subtle'?: string;
  'on-success-subtle'?: string;
  'success-muted'?: string;
  'on-success-muted'?: string;

  // ── Intent: Warning ───────────────────────────────────────────
  warning?: string;
  'on-warning'?: string;
  'warning-subtle'?: string;
  'on-warning-subtle'?: string;
  'warning-muted'?: string;
  'on-warning-muted'?: string;

  // ── Intent: Error ─────────────────────────────────────────────
  error?: string;
  'on-error'?: string;
  'error-subtle'?: string;
  'on-error-subtle'?: string;
  'error-muted'?: string;
  'on-error-muted'?: string;

  // ── Intent: Info ──────────────────────────────────────────────
  info?: string;
  'on-info'?: string;
  'info-subtle'?: string;
  'on-info-subtle'?: string;
  'info-muted'?: string;
  'on-info-muted'?: string;

  // ── Intent: Neutral ───────────────────────────────────────────
  neutral?: string;
  'on-neutral'?: string;
  'neutral-subtle'?: string;
  'on-neutral-subtle'?: string;
  'neutral-muted'?: string;
  'on-neutral-muted'?: string;

  // ── Surface — elevation layers ────────────────────────────────
  // sunken < surface < surface-muted < surface-strong
  surface?: string;
  'on-surface'?: string;
  'surface-sunken'?: string;
  'surface-muted'?: string;
  'on-surface-muted'?: string;
  'surface-strong'?: string;
  'on-surface-strong'?: string;
  'surface-inverse'?: string;
  'on-surface-inverse'?: string;
  /** Dropdowns / popovers */
  'surface-floating'?: string;
  /** Dialogs / drawers */
  'surface-modal'?: string;

  // ── Content — text emphasis hierarchy ─────────────────────────
  'content-primary'?: string;
  'content-secondary'?: string;
  'content-tertiary'?: string;
  'content-placeholder'?: string;
  'content-disabled'?: string;
  'content-inverse'?: string;

  // ── Border ────────────────────────────────────────────────────
  border?: string;
  'border-subtle'?: string;
  'border-strong'?: string;
  'border-focus'?: string;
  'border-error'?: string;

  // ── Scrim ─────────────────────────────────────────────────────
  /** Overlay / backdrop color. @example 'oklch(0 0 0 / 0.45)' */
  scrim?: string;

  /**
   * Any custom semantic token not listed above.
   * Emitted as `--ideasui-color-{key}`.
   */
  [key: string]: string | undefined;
};

export interface ThemeOptions {
  readonly extend?: 'light' | 'dark';
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
  readonly defaultTheme?: 'light' | 'dark' | (string & {});
  /** CSS variable prefix */
  // readonly prefix?: string;
  /** Disable all animations globally */
  readonly disableAnimations?: boolean;
  /** Automatically generate 11-stop color scales for partial color scale overrides. Default: false */
  readonly autoGenerateScales?: boolean;
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
  readonly 1000?: string;
  readonly [key: string]: string | undefined;
}

export interface ColorTokens {
  readonly primary?: ColorScale;
  readonly secondary?: ColorScale;
  readonly success?: ColorScale;
  readonly warning?: ColorScale;
  readonly error?: ColorScale;
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
