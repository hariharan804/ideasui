export const border = {
  none: '0',
  hairline: '0.5px',
  thin: '1px',
  widthDefault: '1px',
  medium: '2px',
  thick: '4px',
  heavy: '8px',
} as const;

export const lightBorder = {
  base: 'var(--ideasui-neutral-200)',
  subtle: 'var(--ideasui-neutral-100)',
  emphasis: 'var(--ideasui-neutral-300)',
  error: 'var(--ideasui-danger-500)',
  focus: 'var(--ideasui-primary-500)',
  success: 'var(--ideasui-success-500)',
} as const;

export const darkBorder = {
  base: 'var(--ideasui-neutral-800)',
  subtle: 'var(--ideasui-neutral-850)',
  emphasis: 'var(--ideasui-neutral-700)',
  error: 'var(--ideasui-danger-500)',
  focus: 'var(--ideasui-primary-500)',
  success: 'var(--ideasui-success-500)',
} as const;
