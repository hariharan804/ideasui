/* eslint-disable sonarjs/no-duplicate-string */
export const lightShadow = {
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.05)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
  none: 'none',
  sm: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
  xs: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
} as const;

export const darkShadow = {
  sm: '0 1px 2px 0 rgb(0 0 0 / 0.3)',
  md: '0 4px 6px -1px rgb(0 0 0 / 0.4), 0 2px 4px -2px rgb(0 0 0 / 0.4)',
  lg: '0 10px 15px -3px rgb(0 0 0 / 0.4), 0 4px 6px -4px rgb(0 0 0 / 0.4)',
  xl: '0 20px 25px -5px rgb(0 0 0 / 0.4), 0 8px 10px -6px rgb(0 0 0 / 0.4)',
  '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.5)',
  inner: 'inset 0 2px 4px 0 rgb(0 0 0 / 0.3)',
  none: 'none',
} as const;

export const lightElevation = {
  base: {
    surface: 'var(--ideasui-color-neutral-50)',
    shadow: lightShadow.none,
  },
  raised: {
    surface: 'var(--ideasui-color-neutral-100)',
    shadow: lightShadow.sm,
  },
  floating: {
    surface: 'var(--ideasui-color-neutral-100)',
    shadow: lightShadow.md,
  },
  overlay: {
    surface: 'var(--ideasui-color-neutral-100)',
    shadow: lightShadow.lg,
  },
  modal: {
    surface: 'var(--ideasui-color-neutral-100)',
    shadow: lightShadow.xl,
  },
  toast: {
    surface: 'var(--ideasui-color-neutral-100)',
    shadow: lightShadow['2xl'],
  },
  sunken: {
    surface: 'var(--ideasui-color-neutral-200)',
    shadow: lightShadow.inner,
  },
} as const;

export const darkElevation = {
  base: {
    surface: 'var(--ideasui-color-neutral-900)',
    shadow: darkShadow.none,
  },
  raised: {
    surface: 'var(--ideasui-color-neutral-800)',
    shadow: darkShadow.sm,
  },
  floating: {
    surface: 'var(--ideasui-color-neutral-800)',
    shadow: darkShadow.md,
  },
  overlay: {
    surface: 'var(--ideasui-color-neutral-800)',
    shadow: darkShadow.lg,
  },
  modal: {
    surface: 'var(--ideasui-color-neutral-800)',
    shadow: darkShadow.xl,
  },
  toast: {
    surface: 'var(--ideasui-color-neutral-800)',
    shadow: darkShadow['2xl'],
  },
  sunken: {
    surface: 'var(--ideasui-color-neutral-950)',
    shadow: darkShadow.inner,
  },
} as const;
