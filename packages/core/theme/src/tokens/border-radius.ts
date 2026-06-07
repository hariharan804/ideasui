export const borderRadius = {
  DEFAULT: '0.625rem', // 10px

  none: '0',

  xs: 'calc(var(--ideasui-radius) * 0.25)',
  sm: 'calc(var(--ideasui-radius) * 0.5)',
  md: 'calc(var(--ideasui-radius) * 0.75)',

  lg: 'calc(var(--ideasui-radius) * 1.25)',
  xl: 'calc(var(--ideasui-radius) * 1.5)',

  '2xl': 'calc(var(--ideasui-radius) * 2)',
  '3xl': 'calc(var(--ideasui-radius) * 3)',
  '4xl': 'calc(var(--ideasui-radius) * 4)',

  input: 'calc(var(--ideasui-radius) * 1.5)',

  full: 'calc(var(--ideasui-radius) * 9999)',
} as const;
