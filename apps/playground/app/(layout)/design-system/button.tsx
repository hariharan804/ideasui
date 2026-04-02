import type { ButtonHTMLAttributes, ReactNode, JSX } from 'react';

type ButtonVariant = 'solid' | 'faded' | 'bordered' | 'light' | 'flat' | 'ghost' | 'shadow';
type ButtonColor = 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'info' | 'neutral';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  color?: ButtonColor;
  children: ReactNode;
}

export function Button({
  variant = 'solid',
  color = 'primary',
  children,
  className = '',
  ...props
}: ButtonProps): JSX.Element {
  // Base classes for all buttons
  const baseClasses =
    'inline-flex items-center justify-center rounded-md px-4 h-10 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none';

  // We are relying ONLY on these semantic tokens, no hover/active states, no opacities, no raw shades:
  // - bg-{color}-base
  // - text-{color}-onBase
  // - bg-{color}-subtle
  // - text-{color}-onSubtle
  // - border-{color}-base
  // - text-{color}-base (which maps to the base color itself)

  const variantStyles: Record<ButtonVariant, Record<ButtonColor, string>> = {
    solid: {
      primary: 'bg-primary-base text-primary-onBase',
      secondary: 'bg-secondary-base text-secondary-onBase',
      success: 'bg-success-base text-success-onBase',
      warning: 'bg-warning-base text-warning-onBase',
      danger: 'bg-danger-base text-danger-onBase',
      info: 'bg-info-base text-info-onBase',
      neutral: 'bg-neutral-base text-neutral-onBase',
    },
    faded: {
      primary: 'bg-surface-elevated text-primary-base border-2 border-primary-subtle',
      secondary: 'bg-surface-elevated text-secondary-base border-2 border-secondary-subtle',
      success: 'bg-surface-elevated text-success-base border-2 border-success-subtle',
      warning: 'bg-surface-elevated text-warning-base border-2 border-warning-subtle',
      danger: 'bg-surface-elevated text-danger-base border-2 border-danger-subtle',
      info: 'bg-surface-elevated text-info-base border-2 border-info-subtle',
      neutral: 'bg-surface-elevated text-neutral-base border-2 border-neutral-subtle',
    },
    bordered: {
      primary: 'bg-transparent text-primary-base border-2 border-primary-base',
      secondary: 'bg-transparent text-secondary-base border-2 border-secondary-base',
      success: 'bg-transparent text-success-base border-2 border-success-base',
      warning: 'bg-transparent text-warning-base border-2 border-warning-base',
      danger: 'bg-transparent text-danger-base border-2 border-danger-base',
      info: 'bg-transparent text-info-base border-2 border-info-base',
      neutral: 'bg-transparent text-neutral-base border-2 border-neutral-base',
    },
    light: {
      primary: 'bg-transparent text-primary-base',
      secondary: 'bg-transparent text-secondary-base',
      success: 'bg-transparent text-success-base',
      warning: 'bg-transparent text-warning-base',
      danger: 'bg-transparent text-danger-base',
      info: 'bg-transparent text-info-base',
      neutral: 'bg-transparent text-neutral-base',
    },
    flat: {
      primary: 'bg-primary-subtle text-primary-onSubtle',
      secondary: 'bg-secondary-subtle text-secondary-onSubtle',
      success: 'bg-success-subtle text-success-onSubtle',
      warning: 'bg-warning-subtle text-warning-onSubtle',
      danger: 'bg-danger-subtle text-danger-onSubtle',
      info: 'bg-info-subtle text-info-onSubtle',
      neutral: 'bg-neutral-subtle text-neutral-onSubtle',
    },
    ghost: {
      // Very similar to light but could potentially have hover states. Since requested no hover, it's the same.
      primary: 'bg-transparent text-primary-base',
      secondary: 'bg-transparent text-secondary-base',
      success: 'bg-transparent text-success-base',
      warning: 'bg-transparent text-warning-base',
      danger: 'bg-transparent text-danger-base',
      info: 'bg-transparent text-info-base',
      neutral: 'bg-transparent text-neutral-base',
    },
    shadow: {
      primary: 'bg-primary-base text-primary-onBase shadow-lg shadow-primary-base',
      secondary: 'bg-secondary-base text-secondary-onBase shadow-lg shadow-secondary-base',
      success: 'bg-success-base text-success-onBase shadow-lg shadow-success-base',
      warning: 'bg-warning-base text-warning-onBase shadow-lg shadow-warning-base',
      danger: 'bg-danger-base text-danger-onBase shadow-lg shadow-danger-base',
      info: 'bg-info-base text-info-onBase shadow-lg shadow-info-base',
      neutral: 'bg-neutral-base text-neutral-onBase shadow-lg shadow-neutral-base',
    },
  };

  const currentVariantStyles = variantStyles[variant][color];
  const finalClassName = `${baseClasses} ${currentVariantStyles} ${className}`.trim();

  return (
    <button className={finalClassName} {...props}>
      {children}
    </button>
  );
}
