import { colorTokens, darkColorTokens } from './tokens/colors';
import { systemTokens } from './tokens/system';
import { defaultLayout, lightLayout, darkLayout } from './tokens/layout';
import type { ThemeConfig } from './system/types';
// @ts-ignore
import plugin from 'tailwindcss/plugin.js';

const DEFAULT_PREFIX = 'ideasui';

const resolveConfig = (
  themes: Record<string, any> = {},
  defaultTheme: string,
  prefix: string,
  globalLayout: Record<string, any> = {},
) => {
  const resolved = {
    variants: [] as { name: string; definition: string[] }[],
    utilities: {} as Record<string, Record<string, any>>,
    colors: {} as Record<string, string>,
    baseStyles: {} as Record<string, Record<string, any>>,
  };

  for (const [themeName, themeConfig] of Object.entries(themes)) {
    const cssSelector = `.${themeName}`;
    const scheme = themeName === 'light' || themeName === 'dark' ? themeName : 'light';
    let baseSelector = '';

    if (themeName === defaultTheme) {
      baseSelector = `:root, [data-theme=${themeName}]`;
    }

    if (baseSelector) {
      resolved.baseStyles[baseSelector] = { 'color-scheme': scheme };
    }

    resolved.utilities[cssSelector] = { 'color-scheme': scheme };

    resolved.variants.push({
      name: themeName,
      definition: [`&.${themeName}`, `&[data-theme='${themeName}']`],
    });

    // Generate color variables with deep merge
    const baseColors = themeName === 'dark' ? darkColorTokens : colorTokens;
    const mergedColors = themeConfig.colors 
      ? Object.keys(baseColors).reduce((acc, colorName) => {
          acc[colorName] = {
            ...baseColors[colorName as keyof typeof baseColors],
            ...(themeConfig.colors[colorName] || {})
          };
          return acc;
        }, {} as any)
      : baseColors;
    
    Object.entries(mergedColors).forEach(([colorName, shades]: [string, any]) => {
      Object.entries(shades).forEach(([shade, value]) => {
        const varName = `--${prefix}-color-${colorName}-${shade}`;
        resolved.utilities[cssSelector][varName] = value as string;
        if (baseSelector) {
          resolved.baseStyles[baseSelector][varName] = value as string;
        }
      });
    });

    // Generate layout variables
    const baseLayout = themeName === 'dark' ? darkLayout : lightLayout;
    const mergedLayout = { ...globalLayout, ...baseLayout, ...themeConfig.layout };
    
    Object.entries(mergedLayout).forEach(([key, value]) => {
      const kebabKey = key.replace(/([A-Z])/g, '-$1').toLowerCase();
      const varName = `--${prefix}-${kebabKey}`;
      resolved.utilities[cssSelector][varName] = value as string;
      if (baseSelector) {
        resolved.baseStyles[baseSelector][varName] = value as string;
      }
    });

    // Generate semantic colors
    const isDark = themeName === 'dark';
    const semanticVars = {
      [`--${prefix}-color-background`]: `var(--${prefix}-color-neutral-${isDark ? '950' : '50'})`,
      [`--${prefix}-color-foreground`]: `var(--${prefix}-color-neutral-${isDark ? '50' : '900'})`,
      [`--${prefix}-color-primary`]: `var(--${prefix}-color-primary-${isDark ? '400' : '500'})`,
      [`--${prefix}-color-primary-foreground`]: `var(--${prefix}-color-primary-${isDark ? '950' : '50'})`,
    };

    Object.assign(resolved.utilities[cssSelector], semanticVars);
    if (baseSelector) {
      Object.assign(resolved.baseStyles[baseSelector], semanticVars);
    }
  }

  // Generate Tailwind color references
  Object.keys(colorTokens).forEach(colorName => {
    Object.keys(colorTokens[colorName as keyof typeof colorTokens]).forEach(shade => {
      resolved.colors[`${colorName}-${shade}`] = `var(--${prefix}-color-${colorName}-${shade})`;
    });
    resolved.colors[colorName] = `var(--${prefix}-color-${colorName})`;
    resolved.colors[`${colorName}-foreground`] = `var(--${prefix}-color-${colorName}-foreground)`;
  });

  resolved.colors.background = `var(--${prefix}-color-background)`;
  resolved.colors.foreground = `var(--${prefix}-color-foreground)`;

  return resolved;
};

const corePlugin = (
  themes: Record<string, any> = {},
  defaultTheme: string,
  prefix: string,
  disableAnimations: boolean,
  globalLayout: Record<string, any> = {},
) => {
  const resolved = resolveConfig(themes, defaultTheme, prefix, globalLayout);

  return plugin(
    ({ addBase, addUtilities, addVariant }: any) => {
      addBase(resolved.baseStyles);
      addUtilities(resolved.utilities);
      
      resolved.variants.forEach((variant) => {
        addVariant(variant.name, variant.definition);
      });

      if (disableAnimations) {
        addBase({
          '*, *::before, *::after': {
            'animation-duration': '0.01ms !important',
            'animation-iteration-count': '1 !important',
            'transition-duration': '0.01ms !important',
          },
        });
      }
    },
    {
      theme: {
        extend: {
          colors: resolved.colors,
          spacing: systemTokens.spacing,
          borderRadius: {
            ...systemTokens.borderRadius,
            small: `var(--${prefix}-radius-small)`,
            medium: `var(--${prefix}-radius-medium)`,
            large: `var(--${prefix}-radius-large)`,
          },
          fontSize: systemTokens.fontSize,
          boxShadow: {
            ...systemTokens.boxShadow,
            small: `var(--${prefix}-box-shadow-small)`,
            medium: `var(--${prefix}-box-shadow-medium)`,
            large: `var(--${prefix}-box-shadow-large)`,
          },
          borderWidth: {
            small: `var(--${prefix}-border-width-small)`,
            medium: `var(--${prefix}-border-width-medium)`,
            large: `var(--${prefix}-border-width-large)`,
          },
          opacity: {
            hover: `var(--${prefix}-hover-opacity)`,
            disabled: `var(--${prefix}-disabled-opacity)`,
          },
          animation: disableAnimations
            ? Object.fromEntries(Object.keys(systemTokens.animation).map(key => [key, 'none']))
            : systemTokens.animation,
          keyframes: disableAnimations ? {} : systemTokens.keyframes,
          transitionDuration: systemTokens.transitionDuration,
          transitionTimingFunction: systemTokens.transitionTimingFunction,
        },
      },
    },
  );
};

export function ideasUIPlugin(config: ThemeConfig = {}) {
  const {
    themes = {},
    defaultTheme = 'light',
    prefix = DEFAULT_PREFIX,
    disableAnimations = false,
    layout: globalLayout = {},
  } = config;

  const defaultThemes = {
    light: { colors: colorTokens, layout: lightLayout },
    dark: { colors: darkColorTokens, layout: darkLayout },
    ...themes,
  };

  return corePlugin(defaultThemes, defaultTheme, prefix, disableAnimations, globalLayout);
}

export * from "./tokens/colors";
export * from "./tokens/system";
export * from "./system/types";
export * from "./recipes";
export {ideasUIPlugin as default};
