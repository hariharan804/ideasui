'use client';

import type {
  ButtonProps,
  ButtonComponent,
  ButtonLabelProps,
  ButtonIconProps,
  ButtonSpinnerProps,
} from './button.types';
import type { ButtonReturnType } from '@ideasui/theme/recipes';
import type { ButtonRenderProps } from 'react-aria-components';
import type { ReactNode, JSX } from 'react';

import { Button as ButtonPrimitive } from 'react-aria-components';
import { cn } from '@ideasui/utils';
import { createContext, forwardRef, useContext } from 'react';
import { button } from '@ideasui/theme/recipes';

import { useButtonGroupContext } from './button-group-context';
import { ButtonGroup } from './button-group';

/* -----------------------------------------------------------------------------------------------
 * Button Context
 * ---------------------------------------------------------------------------------------------*/

/**
 * Internal context for the Button component to share styles with slots.
 */
interface ButtonContextValue {
  styles: ButtonReturnType;
}

const ButtonContext = createContext<ButtonContextValue | null>(null);

/**
 * Hook to consume the ButtonContext.
 * @internal
 * @throws Error if used outside of a Button component.
 */
function useButtonContext(): ButtonContextValue {
  const context = useContext(ButtonContext);

  if (!context) {
    throw new Error('Button sub-components must be rendered within a Button component');
  }

  return context;
}

/* -----------------------------------------------------------------------------------------------
 * Button Slots
 * ---------------------------------------------------------------------------------------------*/

const ButtonIcon = forwardRef<HTMLElement, ButtonIconProps>(
  ({ children, className, placement = 'left', ...props }, ref): JSX.Element => {
    const { styles } = useButtonContext();
    const { icon } = styles;

    return (
      <span
        ref={ref}
        aria-hidden="true"
        className={cn(icon(), placement === 'end' ? 'order-last' : 'order-first', className)}
        data-slot="button-icon"
        {...props}
      >
        {children}
      </span>
    );
  },
);

ButtonIcon.displayName = 'IdeasUI.Button.Icon';

const ButtonSpinner = forwardRef<HTMLSpanElement, ButtonSpinnerProps>(
  ({ className, label = 'Loading', ...props }, ref): JSX.Element => {
    const { styles } = useButtonContext();
    const { loader, icon } = styles;

    return (
      <span
        ref={ref}
        className={cn(
          loader(),
          icon(),
          'inline-flex shrink-0 items-center justify-center',
          className,
        )}
        data-slot="button-spinner"
        role="status"
        {...props}
      >
        <svg
          className="size-full animate-spin"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M21 12a9 9 0 1 1-6.219-8.56" />
        </svg>
        <span className="sr-only">{label}</span>
      </span>
    );
  },
);

ButtonSpinner.displayName = 'IdeasUI.Button.Spinner';

const ButtonLabel = forwardRef<HTMLSpanElement, ButtonLabelProps>(
  ({ children, className, ...props }, ref): JSX.Element => {
    const { styles } = useButtonContext();
    const { label } = styles;

    return (
      <span ref={ref} className={cn(label(), className)} data-slot="button-label" {...props}>
        {children}
      </span>
    );
  },
);

ButtonLabel.displayName = 'IdeasUI.Button.Label';

/* -----------------------------------------------------------------------------------------------
 * Button Render Helpers
 * ---------------------------------------------------------------------------------------------*/

interface ButtonContentProps {
  isLoading?: boolean;
  loadingIndicator?: React.ReactNode;
  loadingPosition?: 'start' | 'end' | 'center';
  isIconOnly?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  children: ButtonProps['children'];
  renderProps: ButtonRenderProps;
}

const ButtonContent = ({
  isLoading,
  loadingIndicator,
  loadingPosition = 'start',
  isIconOnly,
  startIcon,
  endIcon,
  children,
  renderProps,
}: ButtonContentProps): ReactNode => {
  const content = typeof children === 'function' ? children(renderProps) : children;
  const loader = loadingIndicator || <ButtonSpinner />;

  if (isIconOnly || (isLoading && loadingPosition === 'center')) {
    return isLoading ? loader : content;
  }

  const showStartLoader = isLoading && loadingPosition === 'start';
  const showEndLoader = isLoading && loadingPosition === 'end';
  const showStartIcon = startIcon && !showStartLoader;
  const showEndIcon = endIcon && !showEndLoader;

  return (
    <>
      {showStartLoader ? <ButtonIcon placement="start">{loader}</ButtonIcon> : null}

      {showStartIcon ? <ButtonIcon placement="start">{startIcon}</ButtonIcon> : null}

      {typeof content === 'string' || typeof content === 'number' ? (
        <ButtonLabel>{content}</ButtonLabel>
      ) : (
        content
      )}

      {showEndIcon ? <ButtonIcon placement="end">{endIcon}</ButtonIcon> : null}

      {showEndLoader ? <ButtonIcon placement="end">{loader}</ButtonIcon> : null}
    </>
  );
};

/* -----------------------------------------------------------------------------------------------
 * Button Base
 * ---------------------------------------------------------------------------------------------*/

const ButtonBase = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant,
      size,
      color,
      radius,
      fullWidth,
      isIconOnly,
      disableAnimation,
      className,
      startIcon,
      endIcon,
      isLoading,
      loadingIndicator,
      loadingPosition,
      isDisabled,
      children,
      ...props
    },
    ref,
  ): JSX.Element => {
    const groupContext = useButtonGroupContext();

    const mergedVariant = variant ?? groupContext?.variant;
    const mergedSize = size ?? groupContext?.size;
    const mergedColor = color ?? groupContext?.color;
    const mergedDisabled = (isDisabled ?? groupContext?.isDisabled) || isLoading;
    const mergedRadius = radius ?? groupContext?.radius;
    const mergedFullWidth = fullWidth ?? groupContext?.fullWidth;
    const mergedDisableAnimation = disableAnimation ?? groupContext?.disableAnimation;
    const isAttached = groupContext?.isAttached;
    const isVertical = groupContext?.isVertical;

    const styles = button({
      variant: mergedVariant,
      size: mergedSize,
      color: mergedColor,
      radius: mergedRadius,
      fullWidth: mergedFullWidth,
      isIconOnly,
      isDisabled: mergedDisabled,
      isLoading,
      disableAnimation: mergedDisableAnimation,
      isAttached,
      isVertical,
      showDivider: props.showDivider ?? groupContext?.showDivider ?? isAttached,
    });

    return (
      <ButtonPrimitive
        ref={ref}
        aria-busy={isLoading}
        className={(renderProps) =>
          styles.base({
            className: typeof className === 'function' ? className(renderProps) : className,
          })
        }
        data-attached={isAttached}
        data-slot="button"
        data-vertical={isVertical}
        isDisabled={mergedDisabled}
        isPending={isLoading}
        {...props}
      >
        {(renderProps) => (
          <ButtonContext.Provider value={{ styles }}>
            <ButtonContent
              endIcon={endIcon}
              isIconOnly={isIconOnly}
              isLoading={isLoading}
              loadingIndicator={loadingIndicator}
              loadingPosition={loadingPosition}
              renderProps={renderProps}
              startIcon={startIcon}
            >
              {children}
            </ButtonContent>
          </ButtonContext.Provider>
        )}
      </ButtonPrimitive>
    );
  },
);

ButtonBase.displayName = 'IdeasUI.Button';

/* -----------------------------------------------------------------------------------------------
 * Final Export
 * ---------------------------------------------------------------------------------------------*/

export const Button = ButtonBase as ButtonComponent;

Button.Icon = ButtonIcon;
Button.Spinner = ButtonSpinner;
Button.Label = ButtonLabel;
Button.Group = ButtonGroup;
