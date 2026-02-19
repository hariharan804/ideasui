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
  default: 'var(--ideasui-color-neutral-200)',
  subtle: 'var(--ideasui-color-neutral-100)',
  strong: 'var(--ideasui-color-neutral-300)',
  focus: 'var(--ideasui-color-primary-500)',
  danger: 'var(--ideasui-color-danger-500)',
} as const;

export const darkBorder = {
  default: 'var(--ideasui-color-neutral-800)',
  subtle: 'var(--ideasui-color-neutral-850)',
  strong: 'var(--ideasui-color-neutral-700)',
  focus: 'var(--ideasui-color-primary-500)',
  danger: 'var(--ideasui-color-danger-500)',
} as const;
