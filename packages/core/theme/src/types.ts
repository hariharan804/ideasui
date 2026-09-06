export type ThemeToken<K extends string | number | symbol, V> = Partial<Record<K, V>> &
  Record<string, V>;

/** Override any design token family */
export interface TokenOverrides {
  /** Spacing scale (4px grid) */
  readonly spacing?: ThemeToken<string, string>;
  /** Border radius tokens */
  readonly borderRadius?: ThemeToken<string, string>;
  /** Border width tokens */
  readonly borderWidth?: ThemeToken<string, string>;
  /** Font size tokens (value or [size, { lineHeight }] tuple) */
  readonly fontSize?: ThemeToken<string, string | [string, { lineHeight: string }]>;
  /** Letter spacing tokens */
  readonly letterSpacing?: ThemeToken<string, string>;
  /** Font family tokens */
  readonly fontFamily?: ThemeToken<string, string>;
  /** Font weight tokens */
  readonly fontWeight?: ThemeToken<string, string>;
  /** Box shadow tokens */
  readonly boxShadow?: ThemeToken<string, string>;
  /**
   * Shadow tokens — alias for `boxShadow`.
   * @example shadow: { sm: '0 2px 4px rgb(0 0 0 / 0.06)' }
   */
  readonly shadow?: ThemeToken<string, string>;
  /** Z-index tokens */
  readonly zIndex?: ThemeToken<string, string | number>;
  /** Opacity tokens */
  readonly opacity?: ThemeToken<string, string | number>;
  /** Blur tokens */
  readonly blur?: ThemeToken<string, string>;
  /** Transition duration tokens */
  readonly duration?: ThemeToken<string, string>;
  /** Transition easing tokens */
  readonly easing?: ThemeToken<string, string>;
  /** Animation presets */
  readonly animation?: ThemeToken<string, string>;
  /** Keyframe definitions */
  readonly keyframes?: Partial<Record<string, Record<string, Record<string, string>>>>;
}

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

  // ── Intent: Danger ────────────────────────────────────────────
  danger?: string;
  'on-danger'?: string;
  'danger-subtle'?: string;
  'on-danger-subtle'?: string;
  'danger-muted'?: string;
  'on-danger-muted'?: string;

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
  surface?: string | Record<string, string>;
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
  /** Dialogs, drawers, popovers, overlays */
  'surface-overlay'?: string;

  // ── Content — text emphasis hierarchy ─────────────────────────
  content?: string | Record<string, string>;
  'content-primary'?: string;
  'content-secondary'?: string;
  'content-tertiary'?: string;
  'content-placeholder'?: string;
  'content-disabled'?: string;
  'content-inverse'?: string;

  // ── Border ────────────────────────────────────────────────────
  border?: string | Record<string, string>;
  'border-border-subtle'?: string;
  ' border-border-strong'?: string;
  'border-focus'?: string;
  'border-danger'?: string;

  // ── Scrim ─────────────────────────────────────────────────────
  /** Overlay / backdrop color. @example 'oklch(0 0 0 / 0.45)' */
  scrim?: string;

  /**
   * Any custom semantic token not listed above.
   * Emitted as `--ideasui-color-{key}` (flat) or grouped sub-objects.
   */
  [key: string]: string | Record<string, string> | undefined;
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
  /** Override any design token family */
  readonly designTokens?: Partial<TokenOverrides>;
  /** Override semantic tokens globally */
  readonly semanticTokens?: Partial<SemanticTokenOverrides>;
  /** Global component style overrides */
  readonly components?: Record<string, unknown>;
}

export interface ColorTokens {
  readonly primary?: string;
  readonly 'on-primary'?: string;
  readonly 'primary-subtle'?: string;
  readonly 'on-primary-subtle'?: string;
  readonly 'primary-muted'?: string;
  readonly 'on-primary-muted'?: string;
  readonly secondary?: string;
  readonly 'on-secondary'?: string;
  readonly tertiary?: string;
  readonly 'on-tertiary'?: string;
  readonly success?: string;
  readonly 'on-success'?: string;
  readonly warning?: string;
  readonly 'on-warning'?: string;
  readonly danger?: string;
  readonly 'on-danger'?: string;
  readonly info?: string;
  readonly 'on-info'?: string;
  readonly neutral?: string;
  readonly 'on-neutral'?: string;
  readonly surface?: string;
  readonly 'on-surface'?: string;
  readonly background?: string;
  readonly 'on-background'?: string;
  readonly [key: string]: string | Record<string, string> | undefined;
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
