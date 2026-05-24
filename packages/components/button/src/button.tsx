'use client';

import type {
  ButtonProps,
  ButtonComponent,
  ButtonLabelProps,
  ButtonIconProps,
  ButtonSpinnerProps,
  ButtonShortcutProps,
} from './button.types';
import type { ButtonReturnType } from '@ideasui/theme/recipes';
import type { ButtonRenderProps } from 'react-aria-components';
import type { ReactNode, JSX } from 'react';

import { Button as ButtonPrimitive } from 'react-aria-components';
import { cn, getAccessibleName, mergePropsWithContext } from '@ideasui/utils';
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
  classNames?: ButtonProps['classNames'];
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
  ({ children, className, placement = 'start', ...props }, ref): JSX.Element => {
    const { styles, classNames } = useButtonContext();
    const { icon } = styles;

    const slotClass = placement === 'start' ? classNames?.startIcon : classNames?.endIcon;

    return (
      <span
        ref={ref}
        aria-hidden="true"
        className={cn(
          icon(),
          placement === 'end' ? 'order-last' : 'order-first',
          slotClass,
          className,
        )}
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
    const { styles, classNames } = useButtonContext();
    const { loader, icon } = styles;

    return (
      <span
        ref={ref}
        className={cn(
          loader(),
          icon(),
          'inline-flex shrink-0 items-center justify-center',
          classNames?.spinner,
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

const ButtonShortcut = forwardRef<HTMLSpanElement, ButtonShortcutProps>(
  ({ children, className, ...props }, ref): JSX.Element => {
    const { styles, classNames } = useButtonContext();
    const { shortcut } = styles;

    return (
      <kbd
        ref={ref}
        className={cn(shortcut(), classNames?.shortcut, className)}
        data-slot="button-shortcut"
        {...props}
      >
        {children}
      </kbd>
    );
  },
);

ButtonShortcut.displayName = 'IdeasUI.Button.Shortcut';

const ButtonLabel = forwardRef<HTMLSpanElement, ButtonLabelProps>(
  ({ children, className, ...props }, ref): JSX.Element => {
    const { styles, classNames } = useButtonContext();
    const { label } = styles;

    return (
      <span
        ref={ref}
        className={cn(label(), classNames?.label, className)}
        data-slot="button-label"
        {...props}
      >
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
  shortcut?: React.ReactNode;
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
  shortcut,
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

      {shortcut ? <ButtonShortcut>{shortcut}</ButtonShortcut> : null}
    </>
  );
};

/* -----------------------------------------------------------------------------------------------
 * Button Base
 * ---------------------------------------------------------------------------------------------*/

const ButtonBase = forwardRef<HTMLButtonElement, ButtonProps>((originalProps, ref): JSX.Element => {
  const {
    isLoading,
    loadingIndicator,
    loadingPosition,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    isIconOnly,
    startIcon,
    endIcon,
    shortcut,
    children,
    className,
    classNames,
    ...props
  } = originalProps;

  const groupContext = useButtonGroupContext();
  const merged = mergePropsWithContext(originalProps, groupContext);

  // Specific logic for Button
  const mergedDisabled = merged.isDisabled || isLoading;

  const styles = button({
    variant: merged.variant,
    size: merged.size,
    color: merged.color,
    radius: merged.radius,
    fullWidth: merged.fullWidth,
    isIconOnly: merged.isIconOnly,
    isDisabled: mergedDisabled,
    isLoading,
    disableAnimation: merged.disableAnimation,
    isAttached: merged.isAttached,
    isVertical: merged.isVertical,
    elevation: merged.elevation,
    showDivider: merged.showDivider ?? merged.isAttached,
  });

  // Ensure we have an accessible name when loading or icon-only
  const ariaLabel = getAccessibleName(merged, typeof children === 'function' ? null : children);
  const loadingLabel = typeof loadingIndicator === 'string' ? loadingIndicator : 'Loading';

  return (
    <ButtonPrimitive
      ref={ref}
      aria-busy={isLoading}
      aria-label={isLoading && !ariaLabel ? loadingLabel : ariaLabel}
      className={(renderProps) =>
        styles.base({
          className: cn(
            typeof className === 'function' ? className(renderProps) : className,
            classNames?.base,
          ),
        })
      }
      data-attached={merged.isAttached}
      data-slot="button"
      data-vertical={merged.isVertical}
      isDisabled={mergedDisabled}
      isPending={isLoading}
      {...props}
    >
      {(renderProps) => (
        <ButtonContext.Provider value={{ styles, classNames }}>
          <ButtonContent
            endIcon={endIcon}
            isIconOnly={merged.isIconOnly}
            isLoading={isLoading}
            loadingIndicator={loadingIndicator}
            loadingPosition={loadingPosition}
            renderProps={renderProps}
            shortcut={shortcut}
            startIcon={startIcon}
          >
            {children}
          </ButtonContent>
        </ButtonContext.Provider>
      )}
    </ButtonPrimitive>
  );
});

ButtonBase.displayName = 'IdeasUI.Button';

/* -----------------------------------------------------------------------------------------------
 * Final Export
 * ---------------------------------------------------------------------------------------------*/

export const Button = ButtonBase as ButtonComponent;

Button.Icon = ButtonIcon;
Button.Shortcut = ButtonShortcut;
Button.Spinner = ButtonSpinner;
Button.Label = ButtonLabel;
Button.Group = ButtonGroup;
