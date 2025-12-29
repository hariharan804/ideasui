// import type { ThemeConfig } from '../system/types';

// export const lightTheme: ThemeConfig = {
//   mode: 'light',
//   disableAnimations: false,
// };

// export const darkTheme: ThemeConfig = {
//   mode: 'dark',
//   disableAnimations: false,
// };

// export const accessibleTheme: ThemeConfig = {
//   mode: 'light',
//   disableAnimations: true,
//   // High contrast colors for better accessibility
//   colors: {
//     primary: {
//       50: 'oklch(0.98 0.002 308)',
//       100: 'oklch(0.95 0.01 307)',
//       200: 'oklch(0.88 0.04 307)',
//       300: 'oklch(0.75 0.11 306)',
//       400: 'oklch(0.60 0.22 302)',
//       500: 'oklch(0.45 0.30 296)', // Higher contrast
//       600: 'oklch(0.40 0.28 292)',
//       700: 'oklch(0.35 0.25 293)',
//       800: 'oklch(0.30 0.22 294)',
//       900: 'oklch(0.25 0.18 295)',
//       950: 'oklch(0.20 0.12 297)',
//     },
//   },
// };

// export const minimalTheme: ThemeConfig = {
//   mode: 'light',
//   disableAnimations: false,
//   borderRadius: {
//     none: '0px',
//     sm: '2px',
//     md: '4px',
//     lg: '6px',
//     xl: '8px',
//     '2xl': '10px',
//     '3xl': '12px',
//     full: '9999px',
//   },
//   colors: {
//     primary: {
//       50: 'oklch(0.98 0.001 0)',
//       100: 'oklch(0.95 0.002 0)',
//       200: 'oklch(0.90 0.004 0)',
//       300: 'oklch(0.80 0.008 0)',
//       400: 'oklch(0.70 0.012 0)',
//       500: 'oklch(0.50 0.000 0)', // Pure gray
//       600: 'oklch(0.45 0.000 0)',
//       700: 'oklch(0.40 0.000 0)',
//       800: 'oklch(0.30 0.000 0)',
//       900: 'oklch(0.20 0.000 0)',
//       950: 'oklch(0.10 0.000 0)',
//     },
//   },
// };

// export const vibrantTheme: ThemeConfig = {
//   mode: 'light',
//   disableAnimations: false,
//   colors: {
//     primary: {
//       50: 'oklch(0.97 0.02 280)',
//       100: 'oklch(0.94 0.05 280)',
//       200: 'oklch(0.87 0.12 280)',
//       300: 'oklch(0.75 0.20 280)',
//       400: 'oklch(0.65 0.28 280)',
//       500: 'oklch(0.55 0.35 280)', // More saturated
//       600: 'oklch(0.50 0.32 280)',
//       700: 'oklch(0.45 0.28 280)',
//       800: 'oklch(0.40 0.24 280)',
//       900: 'oklch(0.35 0.20 280)',
//       950: 'oklch(0.25 0.15 280)',
//     },
//     secondary: {
//       50: 'oklch(0.97 0.02 120)',
//       100: 'oklch(0.94 0.05 120)',
//       200: 'oklch(0.87 0.12 120)',
//       300: 'oklch(0.75 0.20 120)',
//       400: 'oklch(0.65 0.28 120)',
//       500: 'oklch(0.55 0.35 120)',
//       600: 'oklch(0.50 0.32 120)',
//       700: 'oklch(0.45 0.28 120)',
//       800: 'oklch(0.40 0.24 120)',
//       900: 'oklch(0.35 0.20 120)',
//       950: 'oklch(0.25 0.15 120)',
//     },
//   },
// };

// export const corporateTheme: ThemeConfig = {
//   mode: 'light',
//   disableAnimations: false,
//   colors: {
//     primary: {
//       50: 'oklch(0.97 0.01 220)',
//       100: 'oklch(0.94 0.03 220)',
//       200: 'oklch(0.87 0.08 220)',
//       300: 'oklch(0.75 0.15 220)',
//       400: 'oklch(0.65 0.22 220)',
//       500: 'oklch(0.45 0.18 220)', // Professional blue
//       600: 'oklch(0.40 0.16 220)',
//       700: 'oklch(0.35 0.14 220)',
//       800: 'oklch(0.30 0.12 220)',
//       900: 'oklch(0.25 0.10 220)',
//       950: 'oklch(0.20 0.08 220)',
//     },
//   },
//   borderRadius: {
//     none: '0px',
//     sm: '2px',
//     md: '4px',
//     lg: '6px',
//     xl: '8px',
//     '2xl': '10px',
//     '3xl': '12px',
//     full: '9999px',
//   },
// };

// export const themes = {
//   light: lightTheme,
//   dark: darkTheme,
//   accessible: accessibleTheme,
//   minimal: minimalTheme,
//   vibrant: vibrantTheme,
//   corporate: corporateTheme,
// } as const;

// export type ThemeName = keyof typeof themes;
