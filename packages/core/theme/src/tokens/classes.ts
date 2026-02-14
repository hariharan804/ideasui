export const focus = {
  default: 'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
  primary: 'focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2',
  secondary: 'focus:outline-none focus:ring-2 focus:ring-neutral-500 focus:ring-offset-2',
} as const;

export const disabled = {
  default:
    'ideasui-disabled disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none',
} as const;

export const focusParams = {
  ringColor: 'color-mix(in srgb, var(--ideasui-primary-500) 50%, transparent)',
  ringOffset: '2px',
  ringWidth: '2px',
} as const;
