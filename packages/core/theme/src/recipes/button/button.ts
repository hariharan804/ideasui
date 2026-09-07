import type { VariantProps } from 'tailwind-variants';

import { tv } from 'tailwind-variants';

/**
 * Button recipe — maps variant props → BEM class names only.
 * All Tailwind utility classes live in button.css-map.ts.
 * All structural pseudo-selector styles live in src/components/button.group.css.
 */
const button = tv({
  slots: {
    base: 'btn',
    icon: 'btn__icon',
    label: 'btn__label',
    loader: 'btn__loader',
    shortcut: 'btn__shortcut',
  },
  variants: {
    // ── Variant ───────────────────────────────────────────────────────────────
    variant: {
      solid: { base: 'btn--solid' },
      outline: { base: 'btn--outline' },
      ghost: { base: 'btn--ghost' },
      soft: { base: 'btn--soft' },
      link: { base: 'btn--link' },
      text: { base: 'btn--text' },
      elevated: { base: 'btn--elevated' },
      surface: { base: 'btn--surface' },
    },
    // ── Size ──────────────────────────────────────────────────────────────────
    size: {
      xs: { base: 'btn--xs', icon: 'btn__icon--xs' },
      sm: { base: 'btn--sm', icon: 'btn__icon--sm' },
      md: { base: 'btn--md', icon: 'btn__icon--md' },
      lg: { base: 'btn--lg', icon: 'btn__icon--lg' },
      xl: { base: 'btn--xl', icon: 'btn__icon--xl' },
    },
    // ── Color ─────────────────────────────────────────────────────────────────
    color: {
      primary: { base: 'btn--primary' },
      secondary: { base: 'btn--secondary' },
      tertiary: { base: 'btn--tertiary' },
      success: { base: 'btn--success' },
      warning: { base: 'btn--warning' },
      danger: { base: 'btn--danger' },
      info: { base: 'btn--info' },
      neutral: { base: 'btn--neutral' },
    },
    // ── Elevation ─────────────────────────────────────────────────────────────
    // Shadow depth — only active on the 'elevated' variant via CSS compound selector.
    // e.g. .btn.btn--elevated.btn--elevation-sm { @apply shadow-sm ...; }
    elevation: {
      none: { base: 'btn--elevation-none' },
      xs: { base: 'btn--elevation-xs' },
      sm: { base: 'btn--elevation-sm' },
      md: { base: 'btn--elevation-md' },
      lg: { base: 'btn--elevation-lg' },
      xl: { base: 'btn--elevation-xl' },
      '2xl': { base: 'btn--elevation-2xl' },
    },
    // ── Radius ────────────────────────────────────────────────────────────────
    radius: {
      none: { base: 'btn--radius-none' },
      sm: { base: 'btn--radius-sm' },
      md: { base: 'btn--radius-md' },
      lg: { base: 'btn--radius-lg' },
      xl: { base: 'btn--radius-xl' },
      full: { base: 'btn--radius-full' },
    },
    // ── State ─────────────────────────────────────────────────────────────────
    isDisabled: {
      true: { base: 'btn--disabled' },
    },
    isLoading: {
      true: { base: 'btn--loading' },
    },
    disableAnimation: {
      true: { base: 'btn--no-animation' },
      false: {},
    },
    fullWidth: {
      true: { base: 'btn--full-width' },
    },
    isIconOnly: {
      true: { base: 'btn--icon-only' },
    },
    // ── Group ─────────────────────────────────────────────────────────────────
    // Structural styles (overlap, radius clipping, dividers) handled via
    // CSS pseudo-selectors in src/components/button.group.css
    isAttached: {
      true: { base: 'btn--attached' },
    },
    isVertical: {
      true: { base: 'btn--vertical' },
    },
    divider: {
      none: {},
      full: { base: 'btn--divider-full' },
      middle: { base: 'btn--divider-middle' },
    },
  },
  defaultVariants: {
    variant: 'solid',
    size: 'md',
    color: 'primary',
    radius: 'md',
    elevation: 'sm',
    isDisabled: false,
    disableAnimation: false,
  },
});

export type ButtonVariantProps = VariantProps<typeof button>;
export type ButtonSlots = keyof ReturnType<typeof button>;
export type ButtonReturnType = ReturnType<typeof button>;

export { button };
