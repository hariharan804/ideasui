export const borderRadius = {
  DEFAULT: '0.5rem',
  // input: 'calc(var(--ideasui-radius) * 1.5)',
  // '2xl': 'calc(var(--ideasui-radius) * 2)',
  // '3xl': 'calc(var(--ideasui-radius) * 3)',
  // '4xl': 'calc(var(--ideasui-radius) * 4)',
  // full: 'calc(var(--ideasui-radius) * 9999px)',
  // lg: 'var(--ideasui-radius)',
  // md: 'calc(var(--ideasui-radius) * 0.75)',
  // none: '0',
  // sm: 'calc(var(--ideasui-radius) * 0.5)',
  // xl: 'calc(var(--ideasui-radius) * 1.5)',
  // xs: 'calc(var(--ideasui-radius) * 0.25)',

  none: '0',

  xs: 'calc(var(--ideasui-radius) * 0.25)',
  sm: 'calc(var(--ideasui-radius) * 0.5)',
  md: 'calc(var(--ideasui-radius) * 0.75)',

  // DEFAULT: 'var(--ideasui-radius)',

  lg: 'calc(var(--ideasui-radius) * 1.25)',
  xl: 'calc(var(--ideasui-radius) * 1.5)',

  '2xl': 'calc(var(--ideasui-radius) * 2)',
  '3xl': 'calc(var(--ideasui-radius) * 3)',
  '4xl': 'calc(var(--ideasui-radius) * 4)',

  input: 'calc(var(--ideasui-radius) * 1.5)',

  full: '9999px',
} as const;
