import { create, themes as storybookThemes } from 'storybook/theming';
import '@ideasui/theme/index.css';

// IdeasUI Palette HEX Map for Storybook Manager UI (Storybook Manager does not support OKLCH CSS variables)
const HEX_TOKENS = {
  light: {
    primary: {
      500: '#543EE7', // IdeasUI primary (OKLCH 0.54 0.22 272)
      600: '#4732D2',
    },
    neutral: {
      50: '#FAFAFA', // bg-surface
      200: '#E4E4E7', // border-subtle
      500: '#71717A', // content-muted
      900: '#18181B', // content-primary
    },
  },
  dark: {
    primary: {
      300: '#A594F9',
      400: '#818CF8', // IdeasUI dark primary (OKLCH 0.62 0.22 272)
      500: '#6366F1',
    },
    neutral: {
      50: '#09090B', // bg-background dark
      100: '#121215', // bg-surface dark
      200: '#27272A', // border-subtle dark
      300: '#3F3F46', // border dark
      400: '#A1A1AA', // content-secondary dark
      900: '#FAFAFA', // content-primary dark
    },
  },
  common: {
    white: '#FFFFFF',
  },
};

const fontBase =
  'Inter, ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"';
const fontCode =
  'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace';

const IDEAS_UI_LOGO_DARK = './IdeasUI-wordmark.png';
const IDEAS_UI_LOGO_LIGHT = './IdeasUI-wordmark.png';

const lightTheme = create({
  ...storybookThemes.light,
  base: 'light',
  brandTitle: 'IdeasUI',
  brandImage: IDEAS_UI_LOGO_DARK,
  brandTarget: '_self',

  // Colors
  colorPrimary: HEX_TOKENS.light.primary[500],
  colorSecondary: HEX_TOKENS.light.primary[600],

  // UI
  appBg: HEX_TOKENS.light.neutral[50],
  appContentBg: HEX_TOKENS.common.white,
  appPreviewBg: HEX_TOKENS.common.white,
  appBorderColor: HEX_TOKENS.light.neutral[200],
  appBorderRadius: 10,

  // Typography
  fontBase,
  fontCode,

  // Text
  textColor: HEX_TOKENS.light.neutral[900],
  textInverseColor: HEX_TOKENS.common.white,
  textMutedColor: HEX_TOKENS.light.neutral[500],

  // Toolbar
  barBg: HEX_TOKENS.common.white,
  barTextColor: HEX_TOKENS.light.neutral[500],
  barSelectedColor: HEX_TOKENS.light.primary[600],
  barHoverColor: HEX_TOKENS.light.primary[500],

  // Form colors
  inputBg: HEX_TOKENS.common.white,
  inputBorder: HEX_TOKENS.light.neutral[200],
  inputTextColor: HEX_TOKENS.light.neutral[900],
  inputBorderRadius: 6,
});

const darkTheme = create({
  ...storybookThemes.dark,
  base: 'dark',
  brandTitle: 'IdeasUI',
  brandImage: IDEAS_UI_LOGO_LIGHT,
  brandTarget: '_self',

  // Colors
  colorPrimary: HEX_TOKENS.dark.primary[500],
  colorSecondary: HEX_TOKENS.dark.primary[400],

  // UI
  appBg: HEX_TOKENS.dark.neutral[50],
  appContentBg: HEX_TOKENS.dark.neutral[100],
  appPreviewBg: HEX_TOKENS.dark.neutral[100],
  appBorderColor: HEX_TOKENS.dark.neutral[200],
  appBorderRadius: 10,

  // Typography
  fontBase,
  fontCode,

  // Text
  textColor: HEX_TOKENS.dark.neutral[900],
  textInverseColor: HEX_TOKENS.dark.neutral[50],
  textMutedColor: HEX_TOKENS.dark.neutral[400],

  // Toolbar
  barBg: HEX_TOKENS.dark.neutral[50],
  barTextColor: HEX_TOKENS.dark.neutral[400],
  barSelectedColor: HEX_TOKENS.dark.primary[400],
  barHoverColor: HEX_TOKENS.dark.primary[300],

  // Form colors
  inputBg: HEX_TOKENS.dark.neutral[100],
  inputBorder: HEX_TOKENS.dark.neutral[300],
  inputTextColor: HEX_TOKENS.dark.neutral[900],
  inputBorderRadius: 6,
});

export const themes = {
  dark: darkTheme,
  light: lightTheme,
};
