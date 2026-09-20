import type { VariantProps } from 'tailwind-variants';

import { tv } from 'tailwind-variants';

/**
 * Button recipe — maps variant props → BEM class names only.
 * All structural pseudo-selector styles live in button.css.
 */
const button = tv({
  slots: {
    base: 'ideasui-btn',
    icon: 'ideasui-btn__icon',
    label: 'ideasui-btn__label',
    loader: 'ideasui-btn__loader',
    shortcut: 'ideasui-btn__shortcut',
  },
  variants: {
    // ── Variant ───────────────────────────────────────────────────────────────
    variant: {
      solid: { base: 'ideasui-btn--solid' },
      outline: { base: 'ideasui-btn--outline' },
      ghost: { base: 'ideasui-btn--ghost' },
      soft: { base: 'ideasui-btn--soft' },
      link: { base: 'ideasui-btn--link' },
      text: { base: 'ideasui-btn--text' },
      elevated: { base: 'ideasui-btn--elevated' },
      surface: { base: 'ideasui-btn--surface' },
    },
    // ── Size ──────────────────────────────────────────────────────────────────
    size: {
      xs: { base: 'ideasui-btn--xs', icon: 'ideasui-btn__icon--xs' },
      sm: { base: 'ideasui-btn--sm', icon: 'ideasui-btn__icon--sm' },
      md: { base: 'ideasui-btn--md', icon: 'ideasui-btn__icon--md' },
      lg: { base: 'ideasui-btn--lg', icon: 'ideasui-btn__icon--lg' },
      xl: { base: 'ideasui-btn--xl', icon: 'ideasui-btn__icon--xl' },
    },
    // ── Color ─────────────────────────────────────────────────────────────────
    color: {
      primary: { base: 'ideasui-btn--primary' },
      secondary: { base: 'ideasui-btn--secondary' },
      tertiary: { base: 'ideasui-btn--tertiary' },
      success: { base: 'ideasui-btn--success' },
      warning: { base: 'ideasui-btn--warning' },
      danger: { base: 'ideasui-btn--danger' },
      info: { base: 'ideasui-btn--info' },
      neutral: { base: 'ideasui-btn--neutral' },
    },
    // ── Elevation ─────────────────────────────────────────────────────────────
    elevation: {
      none: { base: 'ideasui-btn--elevation-none' },
      xs: { base: 'ideasui-btn--elevation-xs' },
      sm: { base: 'ideasui-btn--elevation-sm' },
      md: { base: 'ideasui-btn--elevation-md' },
      lg: { base: 'ideasui-btn--elevation-lg' },
      xl: { base: 'ideasui-btn--elevation-xl' },
      '2xl': { base: 'ideasui-btn--elevation-2xl' },
    },
    // ── Radius ────────────────────────────────────────────────────────────────
    radius: {
      none: { base: 'ideasui-btn--radius-none' },
      sm: { base: 'ideasui-btn--radius-sm' },
      md: { base: 'ideasui-btn--radius-md' },
      lg: { base: 'ideasui-btn--radius-lg' },
      xl: { base: 'ideasui-btn--radius-xl' },
      full: { base: 'ideasui-btn--radius-full' },
    },
    // ── State ─────────────────────────────────────────────────────────────────
    isDisabled: {
      true: { base: 'ideasui-btn--disabled' },
    },
    isLoading: {
      true: { base: 'ideasui-btn--loading' },
    },
    disableAnimation: {
      true: { base: 'ideasui-btn--no-animation' },
      false: {},
    },
    fullWidth: {
      true: { base: 'ideasui-btn--full-width' },
    },
    isIconOnly: {
      true: { base: 'ideasui-btn--icon-only' },
    },
    // ── Group ─────────────────────────────────────────────────────────────────
    isAttached: {
      true: { base: 'ideasui-btn--attached' },
    },
    isVertical: {
      true: { base: 'ideasui-btn--vertical' },
    },
    divider: {
      none: {},
      full: { base: 'ideasui-btn--divider-full' },
      middle: { base: 'ideasui-btn--divider-middle' },
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
