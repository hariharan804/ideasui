/* ================================
   Shadow Scale
================================ */

export const lightShadow = {
  xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',

  sm: '0 1px 3px 0 rgb(0 0 0 / 0.08), 0 1px 2px -1px rgb(0 0 0 / 0.08)',

  md: '0 4px 6px -1px rgb(0 0 0 / 0.10), 0 2px 4px -2px rgb(0 0 0 / 0.10)',

  lg: '0 10px 15px -3px rgb(0 0 0 / 0.12), 0 4px 6px -4px rgb(0 0 0 / 0.12)',

  xl: '0 20px 25px -5px rgb(0 0 0 / 0.14), 0 8px 10px -6px rgb(0 0 0 / 0.14)',

  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.20)',

  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',

  none: 'none',
} as const;

export const darkShadow = {
  xs: '0 1px 2px 0 rgb(0 0 0 / 0.25)',

  sm: '0 1px 3px 0 rgb(0 0 0 / 0.25), 0 1px 2px -1px rgb(0 0 0 / 0.25)',

  md: '0 4px 6px -1px rgb(0 0 0 / 0.30), 0 2px 4px -2px rgb(0 0 0 / 0.30)',

  lg: '0 10px 15px -3px rgb(0 0 0 / 0.35), 0 4px 6px -4px rgb(0 0 0 / 0.35)',

  xl: '0 20px 25px -5px rgb(0 0 0 / 0.40), 0 8px 10px -6px rgb(0 0 0 / 0.40)',

  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.45)',

  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.30)',

  none: 'none',
} as const;
