import type { ButtonHTMLAttributes, ReactNode, JSX } from 'react';

type ButtonVariant = 'solid' | 'faded' | 'bordered' | 'light' | 'flat' | 'ghost' | 'shadow';
type ButtonColor = 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';

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
  // - text-{color}-on-base
  // - bg-{color}-subtle
  // - text-{color}-on-subtle
  // - border-{color}-base
  // - text-{color}-base (which maps to the base color itself)

  const variantStyles: Record<ButtonVariant, Record<ButtonColor, string>> = {
    solid: {
      primary: 'bg-primary text-on-primary',
      secondary: 'bg-secondary text-on-secondary',
      success: 'bg-success text-on-success',
      warning: 'bg-warning text-on-warning',
      error: 'bg-error text-on-error',
      info: 'bg-info text-on-info',
      neutral: 'bg-neutral text-on-neutral',
    },
    faded: {
      primary: 'bg-surface-elevated text-primary border-2 border-primary-subtle',
      secondary: 'bg-surface-elevated text-secondary border-2 border-secondary-subtle',
      success: 'bg-surface-elevated text-success border-2 border-success-subtle',
      warning: 'bg-surface-elevated text-warning border-2 border-warning-subtle',
      error: 'bg-surface-elevated text-error border-2 border-error-subtle',
      info: 'bg-surface-elevated text-info border-2 border-info-subtle',
      neutral: 'bg-surface-elevated text-neutral border-2 border-neutral-subtle',
    },
    bordered: {
      primary: 'bg-transparent text-primary border-2 border-primary',
      secondary: 'bg-transparent text-secondary border-2 border-secondary',
      success: 'bg-transparent text-success border-2 border-success',
      warning: 'bg-transparent text-warning border-2 border-warning',
      error: 'bg-transparent text-error border-2 border-error',
      info: 'bg-transparent text-info border-2 border-info',
      neutral: 'bg-transparent text-neutral border-2 border-neutral',
    },
    light: {
      primary: 'bg-transparent text-primary',
      secondary: 'bg-transparent text-secondary',
      success: 'bg-transparent text-success',
      warning: 'bg-transparent text-warning',
      error: 'bg-transparent text-error',
      info: 'bg-transparent text-info',
      neutral: 'bg-transparent text-neutral',
    },
    flat: {
      primary: 'bg-primary-subtle text-on-primary-subtle',
      secondary: 'bg-secondary-subtle text-on-secondary-subtle',
      success: 'bg-success-subtle text-on-success-subtle',
      warning: 'bg-warning-subtle text-on-warning-subtle',
      error: 'bg-error-subtle text-on-error-subtle',
      info: 'bg-info-subtle text-on-info-subtle',
      neutral: 'bg-neutral-subtle text-on-neutral-subtle',
    },
    ghost: {
      primary: 'bg-transparent text-primary',
      secondary: 'bg-transparent text-secondary',
      success: 'bg-transparent text-success',
      warning: 'bg-transparent text-warning',
      error: 'bg-transparent text-error',
      info: 'bg-transparent text-info',
      neutral: 'bg-transparent text-neutral',
    },
    shadow: {
      primary: 'bg-primary text-on-primary shadow-lg shadow-primary',
      secondary: 'bg-secondary text-on-secondary shadow-lg shadow-secondary',
      success: 'bg-success text-on-success shadow-lg shadow-success',
      warning: 'bg-warning text-on-warning shadow-lg shadow-warning',
      error: 'bg-error text-on-error shadow-lg shadow-error',
      info: 'bg-info text-on-info shadow-lg shadow-info',
      neutral: 'bg-neutral text-on-neutral shadow-lg shadow-neutral',
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
