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
  default: 'var(--ideasui-neutral-200)',
  subtle: 'var(--ideasui-neutral-100)',
  strong: 'var(--ideasui-neutral-300)',
  focus: 'var(--ideasui-primary-500)',
  danger: 'var(--ideasui-danger-500)',
} as const;

export const darkBorder = {
  default: 'var(--ideasui-neutral-800)',
  subtle: 'var(--ideasui-neutral-850)',
  strong: 'var(--ideasui-neutral-700)',
  focus: 'var(--ideasui-primary-500)',
  danger: 'var(--ideasui-danger-500)',
} as const;
