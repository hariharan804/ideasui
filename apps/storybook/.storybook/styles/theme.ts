import { create, themes as storybookThemes } from 'storybook/theming';

// HEX Approximations for Storybook Manager UI (OKLCH not supported by polished/storybook-theming)
// This ensures we avoid "Cannot convert object to primitive value" errors.
const HEX_TOKENS = {
  light: {
    primary: {
      500: '#232ED1',
      600: '#1E25A9',
    },
    neutral: {
      50: '#FAFAFA',
      200: '#E4E4E7',
      500: '#71717A',
      900: '#111827',
    },
  },
  dark: {
    primary: {
      300: '#818CF8',
      400: '#6366F1',
      500: '#4338CA',
    },
    neutral: {
      50: '#09090B',
      100: '#18181B',
      200: '#27272A',
      300: '#3F3F46',
      400: '#52525B',
      900: '#FAFAFA',
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

// IdeasUI Brand Assets as Data URIs (Forces visibility and bypasses caching)
const IDEAS_UI_LOGO_DARK =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMjAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDwhLS0gSWRlYXNVSSBNb2Rlcm4gSGV4YWdvbmFsIE1hcmsgLS0+CiAgPHBhdGggZD0iTTEyIDIuNUwyMC42NjAzIDcuNVYxNy41TDEyIDIyLjVMMy4zMzk3NSAxNy41VjcuNUwxMiAyLjVaIiBmaWxsPSIjNjM2NkYxIi8+CiAgPHBhdGggZD0iTTEyIDMwVjQwTTIwLjY2MDMgMzVMMTIgNDBMMy4zMzk3NSAzNSIgc3Ryb2tlPSIjNjM2NkYxIiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxjaXJjbGUgY3g9IjEyIiBjeT0iMTIuNSIgcj0iMi41IiBmaWxsPSJ3aGl0ZSIvPgogIDxyZWN0IHg9IjEwLjUiIHk9IjE3IiB3aWR0aD0iMyIgaGVpZ2h0PSI4IiByeD0iMS41IiBmaWxsPSJ3aGl0ZSIvPgogIAogIDwhLS0gIklkZWFzVUkiIFR5cG9ncmFwaHkgY29uc3RydWN0ZWQgZnJvbSBnZW9tZXRyaWMgcGF0aHMgLS0+CiAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNDAsIDI4KSI+CiAgICA8IS0tIEkgLS0+CiAgICA8cmVjdCB4PSIwIiB5PSItMTgiIHdpZHRoPSI1LjUiIGhlaWdodD0iMTgiIHJ4PSIxIiBmaWxsPSIjMTExODI3Ii8+CiAgICA8IS0tIGQgLS0+CiAgICA8cGF0aCBkPSJNMTguNSAtMThWMDBNMTguNSAtOUMxOC41IC00IDE0LjUgMCA5LjUgMEM0LjUgMCAwLjUgLTQgMC41IC05QzAuNSAtMTQgNC41IC0xOCA5LjUgLTE4IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4LCAwKSIgc3Ryb2tlPSIjMTExODI3IiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgogICAgPCEtLSBlIC0tPgogICAgPHBhdGggZD0iTTE1IC05SDAuNUMwLjUgLTE0IDQuNSAtMTggOS41IC0xOEMxNC41IC0xOCAxOC41IC0xNCAxOC41IC05QzE4LjUgLTQgMTQuNSAwIDkuNSAwQzQuNSAwIDAuNSAtNCAwLjUgLTkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMwLCAwKSIgc3Ryb2tlPSIjMTExODI3IiBzdHJva2Utd2lkdGg9IjMiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgZmlsbD0ibm9uZSIvPgogICAgPCEtLSBhIC0tPgogICAgPHBhdGggZD0iTTE4LjUgLTlWMDBNMC41IC05QzAuNSAtNCA0LjUgMCA5LjUgMEMxNC41IDAgMTguNSAtNCAxOC41IC05QzE4LjUgLTE0IDE0LjUgLTE4IDkuNSAtMThDNC41IC0xOCAwLjUgLTE0IDAuNSAtOSIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTIsIDApIiBzdHJva2U9IiMxMTE4MjciIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBmaWxsPSJub25lIi8+CiAgICA8IS0tIHMgLS0+CiAgICA8cGF0aCBkPSJNMTggLTE4QzE4IC0xOCAyIC0xOCAyIC0xM0MyIC05IDE4IC05IDE4IC01QzE4IDAgMiAwIDIgMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNzQsIDApIiBzdHJva2U9IiMxMTE4MjciIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBmaWxsPSJub25lIi8+CiAgICAKICAgIDwhLS0gVUkgKFN0eWxpemVkKSAtLT4KICAgIDxwYXRoIGQ9Ik0yIC0xOFYtN0MyIC0yIDYgLTIgMTAgLTJDMTQgLTIgMTggLTIgMTggLTdWLTE4IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMDAsIDApIiBzdHJva2U9IiM2MzY2RjEiIHN0cm9rZS13aWR0aD0iMy41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIGZpbGw9Im5vbmUiLz4KICAgIDxyZWN0IHg9IjIiIHk9Ii0xOCIgd2lkdGg9IjQuNSIgaGVpZ2h0PSIxOCIgcng9IjEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyNCwgMCkiIGZpbGw9IiM2MzY2RjEiLz4KICA8L2c+Cjwvc3ZnPg==';
const IDEAS_UI_LOGO_LIGHT =
  'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjQwIiB2aWV3Qm94PSIwIDAgMjAwIDQwIiBmaWxsPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciPgogIDwhLS0gSWRlYXNVSSBNb2Rlcm4gSGV4YWdvbmFsIE1hcmsgLS0+CiAgPHBhdGggZD0iTTEyIDIuNUwyMC42NjAzIDcuNVYxNy41TDEyIDIyLjVMMy4zMzk3NSAxNy41VjcuNUwxMiAyLjVaIiBmaWxsPSIjODE4Q0Y4Ii8+CiAgPHBhdGggZD0iTTEyIDMwVjQwTTIwLjY2MDMgMzVMMTIgNDBMMy4zMzk3NSAxNy41VjcuNUwxMiAyLjVaIiBmaWxsPSIjODE4Q0Y4Ii8+CiAgPHBhdGggZD0iTTEyIDMwVjQwTTIwLjY2MDMgMzVMMTIgNDBMMy4zMzk3NSAxNy41VjcuNUwxMiAyLjVaIiBmaWxsPSIjODE4Q0Y4Ii8+CiAgPHBhdGggZD0iTTEyIDMwVjQwTTIwLjY2MDMgMzVMMTIgNDBMMy4zMzk3NSAzNSIgc3Ryb2tlPSIjODE4Q0Y4IiBzdHJva2Utd2lkdGg9IjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIvPgogIDxjaXJjbGUgY3g9IjEyIiBjeT0iMTIuNSIgcj0iMi41IiBmaWxsPSJ3aGl0ZSIvPgogIDxyZWN0IHg9IjEwLjUiIHk9IjE3IiB3aWR0aD0iMyIgaGVpZ2h0PSI4IiByeD0iMS41IiBmaWxsPSJ3aGl0ZSIvPgogIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKDQwLCAyOCkiPgogICAgPHJlY3QgeD0iMCIgeT0iLTE4IiB3aWR0aD0iNS41IiBoZWlnaHQ9IjE4IiByeD0iMSIgZmlsbD0iI0ZGRkZGRiIvPgogICAgPHBhdGggZD0iTTE4LjUgLTE4VjAwTTE4LjUgLTlDMTguNSAtNCAxNC41IDAgOS41IDBDNC41IDAgMC41IC00IDAuNSAtOUMwLjUgLTE0IDQuNSAtMTggOS41IDExOCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoOCwgMCkiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik0xNSAtOUgwLjVDMC41IC0xNCA0LjUgLTE4IDkuNSAtMThDMTQuNSAtMTggMTguNSAtMTQgMTguNSAtOUMxOC41IC00IDE0LjUgMCA5LjUgMCIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMzAsIDApIiBzdHJva2U9IiNGRkZGRkYiIHN0cm9rZS13aWR0aD0iMyIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBmaWxsPSJub25lIi8+CiAgICA8cGF0aCBkPSJNMTguNSAtOVYwME0wLjUgLTlDMC41IC00IDQuNSAwIDkuNSAwQzE0LjUgMCAxOC41IC00IDE4LjUgLTlDMTguNSAtMTQgMTQuNSAtMTggOS41IC0xOEM0LjUgLTE4IDAuNSAtMTQgMC41IC05IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg1MiwgMCkiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik0xOCAtMThDMTggLTE4IDIgLTE4IDIgLTEzQzIgLTkgMTggLTkgMTggLTVDMTggMCAyIDAgMiAwIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg3NCwgMCkiIHN0cm9rZT0iI0ZGRkZGRiIgc3Ryb2tlLXdpZHRoPSIzIiBzdHJva2UtbGluZWNhcD0icm91bmQiIGZpbGw9Im5vbmUiLz4KICAgIDxwYXRoIGQ9Ik0yIC0xOFYtN0MyIC0yIDYgLTIgMTAgLTJDMTQgLTIgMTggLTIgMTggLTdWLTE4IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMDAsIDApIiBzdHJva2U9IiM4MThDRjgiIHN0cm9rZS13aWR0aD0iMy41IiBzdHJva2UtbGluZWNhcD0icm91bmQiIGZpbGw9Im5vbmUiLz4KICAgIDxyZWN0IHg9IjMiIHk9Ii0xOCIgd2lkdGg9IjQuNSIgaGVpZ2h0PSIxOCIgcng9IjEiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEyNCwgMCkiIGZpbGw9IiM4MThDRjgiLz4KICA8L2c+Cjwvc3ZnPic7';

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
  brandImage: IDEAS_UI_LOGO_DARK,
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
