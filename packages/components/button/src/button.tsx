'use client';
import type { ColorVariantProps } from '@ideasui/theme/token';
import type { ElementType, ReactNode } from 'react';

import { useMemo } from 'react';
import { button as buttonVariants } from '@ideasui/theme/recipes';
import { Ripple } from '@ideasui/ripple';
import { Slot } from '@ideasui/slot';
import { forwardRef } from '@ideasui/utils';

import { Spinner } from './spinner';
import { useButton } from './use-button';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * The element or component to render as
   * @default 'button'
   */
  as?: ElementType;

  /**
   * Visual variant of the button
   * @default 'solid'
   */
  variant?: 'solid' | 'outline' | 'ghost';

  /**
   * Color variant based on semantic intent
   * @default 'primary'
   */
  color?: ColorVariantProps;

  /**
   * Size of the button
   * @default 'md'
   */
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';

  /**
   * Border radius variant
   * @default 'md'
   */
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';

  /**
   * Whether the button should take full width
   * @default false
   */
  fullWidth?: boolean;

  /**
   * Whether the button is in loading state
   * @default false
   */
  loading?: boolean;

  /**
   * Text to show when loading
   */
  loadingText?: string;

  /**
   * Content to show at the start of the button
   */
  startContent?: ReactNode;

  /**
   * Content to show at the end of the button
   */
  endContent?: ReactNode;

  /**
   * Whether the button should display a ripple effect
   * @default false
   */
  disableRipple?: boolean;
}
export const Button = forwardRef<'button', ButtonProps>(
  (
    {
      as,
      className,
      variant = 'solid',
      color = 'primary',
      size = 'md',
      radius = 'md',
      loading = false,
      loadingText,
      disabled,
      children,
      startContent,
      endContent,
      fullWidth = false,
      disableRipple = false,
      ...props
    },
    ref,
  ) => {
    const Component = useMemo(() => {
      if (!as) {
        return 'button';
      }

      if (typeof as === 'string') {
        const validElements = ['button', 'a', 'div', 'span', 'input'];

        return validElements.includes(as) ? as : 'button';
      }

      // For React components, check if it's a valid component
      if (typeof as === 'function' || (typeof as === 'object' && as !== null)) {
        return as;
      }

      // Fallback to button for invalid values
      return 'button';
    }, [as]);

    const { getButtonProps, isLoading, getRippleProps } = useButton({
      as: Component,
      ref,
      className,
      loading,
      disabled,
      ...props,
    });

    const recipes = buttonVariants({
      variant,
      color,
      size,
      radius,
      fullWidth,
    });

    return (
      <Slot {...getButtonProps()} className={recipes.base()}>
        {isLoading ? <Spinner size={size} /> : null}
        {!isLoading && startContent ? <span className="mr-2 shrink-0">{startContent}</span> : null}

        <span className={isLoading ? 'ml-2' : ''}>
          {isLoading && loadingText ? loadingText : children}
        </span>

        {!isLoading && endContent ? <span className="ml-2 shrink-0">{endContent}</span> : null}
        {!disableRipple && <Ripple {...getRippleProps()} />}
      </Slot>
    );
  },
);

Button.displayName = 'IdeasUI.Button';
