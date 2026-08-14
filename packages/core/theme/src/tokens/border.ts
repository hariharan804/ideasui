export const border = {
  none: '0',
  hairline: '0.5px',
  thin: '1px',
  medium: '2px',
  thick: '4px',
  heavy: '8px',
} as const;

/**
 * Semantic divider color tokens.
 * Named `divider` (formerly `borderColor` / `border`) to distinguish color intent
 * tokens from structural `border` width scale tokens and avoid collisions with
 * Tailwind CSS v4 `border-*` utilities.
 */
export const dividerColors = {
  DEFAULT: 'var(--ideasui-color-neutral-200)',
  base: 'var(--ideasui-color-neutral-200)',
  subtle: 'var(--ideasui-color-neutral-100)',
  strong: 'var(--ideasui-color-neutral-300)',
  focus: 'var(--ideasui-color-primary-500)',
  error: 'var(--ideasui-color-error-500)',
} as const;
