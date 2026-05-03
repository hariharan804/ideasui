/* ================================
   Shadow Scale
================================ */

export const lightShadow = {
  none: 'none',

  xs: '0 1px 2px rgb(0 0 0 / 0.05)',

  sm: '0 2px 4px rgb(0 0 0 / 0.06), 0 1px 2px rgb(0 0 0 / 0.04)',

  md: '0 4px 8px rgb(0 0 0 / 0.08), 0 2px 4px rgb(0 0 0 / 0.05)',

  lg: '0 8px 16px rgb(0 0 0 / 0.1), 0 4px 6px rgb(0 0 0 / 0.05)',

  xl: '0 16px 24px rgb(0 0 0 / 0.12), 0 6px 8px rgb(0 0 0 / 0.06)',

  '2xl': '0 24px 48px rgb(0 0 0 / 0.16)',

  inner: 'inset 0 2px 4px rgb(0 0 0 / 0.06)',
} as const;

export const darkShadow = {
  none: 'none',
  xs: '0 1px 2px rgb(0 0 0 / 0.12)',
  sm: '0 2px 4px rgb(0 0 0 / 0.15), 0 1px 2px rgb(0 0 0 / 0.10)',
  md: '0 4px 8px rgb(0 0 0 / 0.18), 0 2px 4px rgb(0 0 0 / 0.12)',
  lg: '0 8px 16px rgb(0 0 0 / 0.22), 0 4px 6px rgb(0 0 0 / 0.14)',
  xl: '0 16px 24px rgb(0 0 0 / 0.26), 0 6px 8px rgb(0 0 0 / 0.16)',
  '2xl': '0 24px 48px rgb(0 0 0 / 0.32)',
  inner: 'inset 0 2px 4px rgb(0 0 0 / 0.20)',
} as const;
