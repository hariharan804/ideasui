'use client';

import type {
  ButtonProps as ButtonProperties,
  ButtonComponent,
  ButtonClassNames,
  ButtonSlotProps,
  ButtonLabelProperties,
  ButtonIconProperties,
  ButtonSpinnerProperties,
  ButtonShortcutProperties,
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
  classNames?: ButtonClassNames;
  slotProps?: ButtonSlotProps;
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

const ButtonIcon = forwardRef<HTMLElement, ButtonIconProperties>(
  ({ children, className, placement = 'start', ...properties }, reference): JSX.Element => {
    const { styles, classNames, slotProps } = useButtonContext();
    const { icon } = styles;

    const slotClass = placement === 'start' ? classNames?.startIcon : classNames?.endIcon;
    const iconSlotProps = placement === 'start' ? slotProps?.startIcon : slotProps?.endIcon;

    return (
      <span
        ref={reference}
        aria-hidden="true"
        {...iconSlotProps}
        {...properties}
        className={cn(
          icon(),
          placement === 'end' ? 'order-last' : 'order-first',
          slotClass,
          iconSlotProps?.className,
          className,
        )}
        data-slot="button-icon"
      >
        {children}
      </span>
    );
  },
);

ButtonIcon.displayName = 'IdeasUI.Button.Icon';

const ButtonSpinner = forwardRef<HTMLSpanElement, ButtonSpinnerProperties>(
  ({ className, label = 'Loading', ...properties }, reference): JSX.Element => {
    const { styles, classNames, slotProps } = useButtonContext();
    const { loader, icon } = styles;
    const spinnerSlotProps = slotProps?.spinner;

    return (
      <span
        ref={reference}
        {...spinnerSlotProps}
        {...properties}
        className={cn(
          loader(),
          icon(),
          'inline-flex shrink-0 items-center justify-center',
          classNames?.spinner,
          spinnerSlotProps?.className,
          className,
        )}
        data-slot="button-spinner"
      >
        <svg
          aria-hidden="true"
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
        <span className="sr-only">{spinnerSlotProps?.label ?? label}</span>
      </span>
    );
  },
);

ButtonSpinner.displayName = 'IdeasUI.Button.Spinner';

const ButtonShortcut = forwardRef<HTMLSpanElement, ButtonShortcutProperties>(
  ({ children, className, ...properties }, reference): JSX.Element => {
    const { styles, classNames, slotProps } = useButtonContext();
    const { shortcut } = styles;
    const shortcutSlotProps = slotProps?.shortcut;

    return (
      <kbd
        ref={reference}
        {...shortcutSlotProps}
        {...properties}
        className={cn(shortcut(), classNames?.shortcut, shortcutSlotProps?.className, className)}
        data-slot="button-shortcut"
      >
        {children}
      </kbd>
    );
  },
);

ButtonShortcut.displayName = 'IdeasUI.Button.Shortcut';

const ButtonLabel = forwardRef<HTMLSpanElement, ButtonLabelProperties>(
  ({ children, className, ...properties }, reference): JSX.Element => {
    const { styles, classNames, slotProps } = useButtonContext();
    const { label } = styles;
    const labelSlotProps = slotProps?.label;

    return (
      <span
        ref={reference}
        {...labelSlotProps}
        {...properties}
        className={cn(label(), classNames?.label, labelSlotProps?.className, className)}
        data-slot="button-label"
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

interface ButtonContentProperties {
  isLoading?: boolean;
  loadingIndicator?: React.ReactNode;
  loadingPosition?: 'start' | 'end' | 'center';
  isIconOnly?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  shortcut?: React.ReactNode;
  children: ButtonProperties['children'];
  renderProps: ButtonRenderProps;
}

function getButtonSpinner(isLoading?: boolean, indicator?: ReactNode): ReactNode {
  const spinner: ReactNode = isLoading ? (indicator ?? <ButtonSpinner />) : null;

  return spinner;
}

function renderButtonContentLabel(content: ReactNode): ReactNode {
  const label: ReactNode =
    typeof content === 'string' || typeof content === 'number' ? (
      <ButtonLabel>{content}</ButtonLabel>
    ) : (
      content
    );

  return label;
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
}: ButtonContentProperties): ReactNode => {
  const content = typeof children === 'function' ? children(renderProps) : children;
  const isCenterLoading = isLoading && loadingPosition === 'center';

  if (isIconOnly || isCenterLoading) {
    const centerNode: ReactNode = isLoading ? getButtonSpinner(true, loadingIndicator) : content;

    return centerNode;
  }

  const spinner = getButtonSpinner(isLoading, loadingIndicator);
  const isStartLoading = isLoading && loadingPosition === 'start';
  const isEndLoading = isLoading && loadingPosition === 'end';

  let startNode: ReactNode = null;

  if (isStartLoading) {
    startNode = spinner;
  } else if (startIcon) {
    startNode = startIcon;
  }

  let endNode: ReactNode = null;

  if (isEndLoading) {
    endNode = spinner;
  } else if (endIcon) {
    endNode = endIcon;
  }

  const mainNode: ReactNode = (
    <>
      {startNode ? <ButtonIcon placement="start">{startNode}</ButtonIcon> : null}

      {renderButtonContentLabel(content)}

      {endNode ? <ButtonIcon placement="end">{endNode}</ButtonIcon> : null}

      {shortcut ? <ButtonShortcut>{shortcut}</ButtonShortcut> : null}
    </>
  );

  return mainNode;
};

/* -----------------------------------------------------------------------------------------------
 * Button Base
 * ---------------------------------------------------------------------------------------------*/

const ButtonBase = forwardRef<HTMLButtonElement, ButtonProperties>(
  (originalProperties, reference): JSX.Element => {
    const {
      isLoading,
      loadingIndicator,
      loadingPosition,
      startIcon,
      endIcon,
      shortcut,
      children,
      className,
      classNames,
      slotProps,
      ...properties
    } = originalProperties;

    const groupContext = useButtonGroupContext();
    const merged = mergePropsWithContext(originalProperties, groupContext);

    // Specific logic for Button
    const mergedDisabled = merged.isDisabled || isLoading;

    const isBorderlessVariant =
      merged.variant === 'ghost' || merged.variant === 'link' || merged.variant === 'text';
    const defaultDivider = !isBorderlessVariant && merged.isAttached ? 'full' : 'none';
    const divider = merged.divider || defaultDivider;

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
      divider,
    });

    // Context value - React Compiler will optimize this automatically
    const contextValue = { styles, classNames, slotProps };

    // Ensure we have an accessible name when loading or icon-only
    const ariaLabel = getAccessibleName(merged, typeof children === 'function' ? null : children);
    const loadingLabel = typeof loadingIndicator === 'string' ? loadingIndicator : 'Loading';

    return (
      <ButtonPrimitive
        ref={reference}
        aria-busy={isLoading}
        aria-label={isLoading && !ariaLabel ? loadingLabel : ariaLabel}
        {...slotProps?.base}
        {...properties}
        className={(renderProperties) => {
          const baseSlotClass =
            typeof slotProps?.base?.className === 'function'
              ? slotProps.base.className(renderProperties)
              : slotProps?.base?.className;

          return styles.base({
            className: cn(
              typeof className === 'function' ? className(renderProperties) : className,
              classNames?.base,
              baseSlotClass,
            ),
          });
        }}
        data-attached={merged.isAttached}
        data-slot="button"
        data-vertical={merged.isVertical}
        isDisabled={mergedDisabled}
        isPending={isLoading}
      >
        {(renderProperties) => (
          <ButtonContext.Provider value={contextValue}>
            <ButtonContent
              endIcon={endIcon}
              isIconOnly={merged.isIconOnly}
              isLoading={isLoading}
              loadingIndicator={loadingIndicator}
              loadingPosition={loadingPosition}
              renderProps={renderProperties}
              shortcut={shortcut}
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
Button.Shortcut = ButtonShortcut;
Button.Spinner = ButtonSpinner;
Button.Label = ButtonLabel;
Button.Group = ButtonGroup;
