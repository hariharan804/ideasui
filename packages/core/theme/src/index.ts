import { colorTokens, darkColorTokens } from './tokens/colors';
import { systemTokens } from './tokens/system';
import type { ThemeConfig } from './system/types';

export function ideasUIPlugin(config: ThemeConfig = {}) {
  const {
    disableAnimations = false,
    colors: customColors = {},
    spacing: customSpacing = {},
    borderRadius: customBorderRadius = {},
    fontSize: customFontSize = {},
    animation: customAnimation = {},
    keyframes: customKeyframes = {},
    mode = 'light',
  } = config;

  // Merge custom colors with default tokens
  const mergedColors = {
    ...colorTokens,
    ...customColors,
    gray: colorTokens.neutral,
  } as any;

  const mergedDarkColors = {
    ...darkColorTokens,
    ...customColors,
    gray: darkColorTokens.neutral,
  } as any;

  // Generate CSS variables for colors
  const generateColorVars = (colors: typeof colorTokens, prefix = '') => {
    const vars: Record<string, string> = {};
    
    Object.entries(colors).forEach(([colorName, shades]) => {
      Object.entries(shades).forEach(([shade, value]) => {
        vars[`--color-${colorName}-${shade}`] = value;
      });
    });

    return vars;
  };

  // Generate semantic color variables
  const generateSemanticVars = (isDark = false) => {
    return {
      '--color-background': `var(--color-neutral-${isDark ? '950' : '50'})`,
      '--color-foreground': `var(--color-neutral-${isDark ? '50' : '900'})`,
      '--color-muted': `var(--color-neutral-${isDark ? '900' : '100'})`,
      '--color-muted-foreground': `var(--color-neutral-${isDark ? '400' : '500'})`,
      '--color-card': `var(--color-neutral-${isDark ? '900' : '50'})`,
      '--color-card-foreground': `var(--color-neutral-${isDark ? '50' : '900'})`,
      '--color-border': `var(--color-neutral-${isDark ? '800' : '200'})`,
      '--color-input': `var(--color-neutral-${isDark ? '800' : '200'})`,
      '--color-ring': `var(--color-primary-${isDark ? '400' : '500'})`,
      '--color-primary': `var(--color-primary-${isDark ? '400' : '500'})`,
      '--color-primary-foreground': `var(--color-primary-${isDark ? '950' : '50'})`,
      '--color-secondary': `var(--color-secondary-${isDark ? '400' : '500'})`,
      '--color-secondary-foreground': `var(--color-secondary-${isDark ? '950' : '50'})`,
      '--color-success': `var(--color-success-${isDark ? '400' : '500'})`,
      '--color-success-foreground': `var(--color-success-${isDark ? '950' : '50'})`,
      '--color-warning': `var(--color-warning-${isDark ? '400' : '500'})`,
      '--color-warning-foreground': `var(--color-warning-${isDark ? '950' : '50'})`,
      '--color-danger': `var(--color-danger-${isDark ? '400' : '500'})`,
      '--color-danger-foreground': `var(--color-danger-${isDark ? '950' : '50'})`,
      '--color-info': `var(--color-info-${isDark ? '400' : '500'})`,
      '--color-info-foreground': `var(--color-info-${isDark ? '950' : '50'})`,
    };
  };

  const baseVars = {
    ...generateColorVars(mergedColors),
    ...generateSemanticVars(false),
  };

  const darkVars = {
    ...generateColorVars(mergedDarkColors),
    ...generateSemanticVars(true),
  };

  return {
    theme: {
      extend: {
        colors: {
          primary: {
            50: 'var(--color-primary-50)',
            100: 'var(--color-primary-100)',
            200: 'var(--color-primary-200)',
            300: 'var(--color-primary-300)',
            400: 'var(--color-primary-400)',
            500: 'var(--color-primary-500)',
            600: 'var(--color-primary-600)',
            700: 'var(--color-primary-700)',
            800: 'var(--color-primary-800)',
            900: 'var(--color-primary-900)',
            950: 'var(--color-primary-950)',
            DEFAULT: 'var(--color-primary)',
            foreground: 'var(--color-primary-foreground)',
          },
          secondary: {
            50: 'var(--color-secondary-50)',
            100: 'var(--color-secondary-100)',
            200: 'var(--color-secondary-200)',
            300: 'var(--color-secondary-300)',
            400: 'var(--color-secondary-400)',
            500: 'var(--color-secondary-500)',
            600: 'var(--color-secondary-600)',
            700: 'var(--color-secondary-700)',
            800: 'var(--color-secondary-800)',
            900: 'var(--color-secondary-900)',
            950: 'var(--color-secondary-950)',
            DEFAULT: 'var(--color-secondary)',
            foreground: 'var(--color-secondary-foreground)',
          },
          success: {
            50: 'var(--color-success-50)',
            100: 'var(--color-success-100)',
            200: 'var(--color-success-200)',
            300: 'var(--color-success-300)',
            400: 'var(--color-success-400)',
            500: 'var(--color-success-500)',
            600: 'var(--color-success-600)',
            700: 'var(--color-success-700)',
            800: 'var(--color-success-800)',
            900: 'var(--color-success-900)',
            950: 'var(--color-success-950)',
            DEFAULT: 'var(--color-success)',
            foreground: 'var(--color-success-foreground)',
          },
          warning: {
            50: 'var(--color-warning-50)',
            100: 'var(--color-warning-100)',
            200: 'var(--color-warning-200)',
            300: 'var(--color-warning-300)',
            400: 'var(--color-warning-400)',
            500: 'var(--color-warning-500)',
            600: 'var(--color-warning-600)',
            700: 'var(--color-warning-700)',
            800: 'var(--color-warning-800)',
            900: 'var(--color-warning-900)',
            950: 'var(--color-warning-950)',
            DEFAULT: 'var(--color-warning)',
            foreground: 'var(--color-warning-foreground)',
          },
          danger: {
            50: 'var(--color-danger-50)',
            100: 'var(--color-danger-100)',
            200: 'var(--color-danger-200)',
            300: 'var(--color-danger-300)',
            400: 'var(--color-danger-400)',
            500: 'var(--color-danger-500)',
            600: 'var(--color-danger-600)',
            700: 'var(--color-danger-700)',
            800: 'var(--color-danger-800)',
            900: 'var(--color-danger-900)',
            950: 'var(--color-danger-950)',
            DEFAULT: 'var(--color-danger)',
            foreground: 'var(--color-danger-foreground)',
          },
          info: {
            50: 'var(--color-info-50)',
            100: 'var(--color-info-100)',
            200: 'var(--color-info-200)',
            300: 'var(--color-info-300)',
            400: 'var(--color-info-400)',
            500: 'var(--color-info-500)',
            600: 'var(--color-info-600)',
            700: 'var(--color-info-700)',
            800: 'var(--color-info-800)',
            900: 'var(--color-info-900)',
            950: 'var(--color-info-950)',
            DEFAULT: 'var(--color-info)',
            foreground: 'var(--color-info-foreground)',
          },
          neutral: {
            50: 'var(--color-neutral-50)',
            100: 'var(--color-neutral-100)',
            200: 'var(--color-neutral-200)',
            300: 'var(--color-neutral-300)',
            400: 'var(--color-neutral-400)',
            500: 'var(--color-neutral-500)',
            600: 'var(--color-neutral-600)',
            700: 'var(--color-neutral-700)',
            800: 'var(--color-neutral-800)',
            900: 'var(--color-neutral-900)',
            950: 'var(--color-neutral-950)',
          },
          gray: {
            50: 'var(--color-neutral-50)',
            100: 'var(--color-neutral-100)',
            200: 'var(--color-neutral-200)',
            300: 'var(--color-neutral-300)',
            400: 'var(--color-neutral-400)',
            500: 'var(--color-neutral-500)',
            600: 'var(--color-neutral-600)',
            700: 'var(--color-neutral-700)',
            800: 'var(--color-neutral-800)',
            900: 'var(--color-neutral-900)',
            950: 'var(--color-neutral-950)',
          },
          background: 'var(--color-background)',
          foreground: 'var(--color-foreground)',
          muted: 'var(--color-muted)',
          'muted-foreground': 'var(--color-muted-foreground)',
          card: 'var(--color-card)',
          'card-foreground': 'var(--color-card-foreground)',
          border: 'var(--color-border)',
          input: 'var(--color-input)',
          ring: 'var(--color-ring)',
        },
        spacing: {
          ...systemTokens.spacing,
          ...customSpacing,
        },
        borderRadius: {
          ...systemTokens.borderRadius,
          ...customBorderRadius,
        },
        fontSize: {
          ...systemTokens.fontSize,
          ...customFontSize,
        },
        boxShadow: systemTokens.boxShadow,
        animation: disableAnimations
          ? Object.fromEntries(
              Object.keys({ ...systemTokens.animation, ...customAnimation }).map(key => [key, 'none'])
            )
          : { ...systemTokens.animation, ...customAnimation },
        keyframes: disableAnimations ? {} : { ...systemTokens.keyframes, ...customKeyframes },
        transitionDuration: systemTokens.transitionDuration,
        transitionTimingFunction: systemTokens.transitionTimingFunction,
      },
    },
    plugins: [
      function ({ addBase }: { addBase: (styles: Record<string, any>) => void }) {
        addBase({
          ':root': baseVars,
          '.dark': darkVars,
          ...(disableAnimations && {
            '*, *::before, *::after': {
              'animation-duration': '0.01ms !important',
              'animation-iteration-count': '1 !important',
              'transition-duration': '0.01ms !important',
              'scroll-behavior': 'auto !important',
            },
          }),
        });
      },
    ],
  };
}

export * from './tokens/colors';
export * from './tokens/system';
export * from './system/types';
export * from './recipes';
export { ideasUIPlugin as default };