import type { Ref } from 'react';
import type { ButtonProps } from './button';
import type { RippleEvent, RippleItem } from '@ideasui/ripple';

import { useRef, useCallback, useImperativeHandle } from 'react';
import { useButton as useAriaButton, useFocusRing, useHover } from 'react-aria';
import { useRipple } from '@ideasui/ripple';
import { toDataAttr } from '@ideasui/utils/aria';
import { mergeProps } from '@ideasui/utils/react';

export interface UseButtonProps extends Omit<ButtonProps, 'children'> {
  /**
   * Ref to the DOM node
   */
  ref?: Ref<HTMLButtonElement>;
  /**
   * Whether the button should display a loading spinner
   */
  isLoading?: boolean;
  /**
   * Whether the button is disabled
   */
  isDisabled?: boolean;
  /**
   * Whether to disable the ripple effect
   */
  disableRipple?: boolean;
}

export interface UseButtonReturn {
  domRef: React.RefObject<HTMLButtonElement | null>;
  isPressed: boolean;
  isDisabled: boolean;
  isLoading: boolean;
  isFocused: boolean;
  isFocusVisible: boolean;
  isHovered: boolean;
  ripples: RippleItem[];
  getButtonProps: (
    userProps?: React.HTMLAttributes<HTMLButtonElement>,
  ) => React.HTMLAttributes<HTMLButtonElement>;
  getRippleProps: () => { ripples: RippleItem[]; onClear: (key: React.Key) => void };
}

export function useButton(props: UseButtonProps): UseButtonReturn {
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const {
    ref,
    loading = false,
    disabled = false,
    isLoading = loading,
    isDisabled: isDisabledProp = disabled,
    onClick,
    autoFocus,
    as,
    variant,
    color,
    size,
    radius,
    fullWidth,
    loadingText,
    startContent,
    endContent,
    formAction,
    value,
    className,
    style,
    disableRipple,
    ...ariaCompatibleProps
  } = props;
  /* eslint-enable @typescript-eslint/no-unused-vars */

  const domRef = useRef<HTMLButtonElement>(null);

  useImperativeHandle(ref, () => domRef.current as HTMLButtonElement);

  const isDisabled = isDisabledProp || isLoading;

  const { isFocusVisible, isFocused, focusProps } = useFocusRing({
    autoFocus,
  });
  const { onPress: handleRipple, onClear: onClearRipple, ripples } = useRipple();
  const handlePress = useCallback(
    (e: RippleEvent) => {
      if (isDisabled) {
        return;
      }
      if (!disableRipple) {
        handleRipple(e);
      }
      onClick && onClick(e as React.MouseEvent<HTMLButtonElement>);
    },
    [handleRipple, onClick, disableRipple, isDisabled],
  );
  // Only pass specific props that React Aria expects
  const ariaProps = {
    onPress: handlePress,
    isDisabled,
    autoFocus,
    type: ariaCompatibleProps.type,
    form: ariaCompatibleProps.form,
    formMethod: ariaCompatibleProps.formMethod,
    formEncType: ariaCompatibleProps.formEncType,
    formNoValidate: ariaCompatibleProps.formNoValidate,
    formTarget: ariaCompatibleProps.formTarget,
    name: ariaCompatibleProps.name,
  };

  const { buttonProps: ariaButtonProps, isPressed } = useAriaButton(ariaProps, domRef);
  const { isHovered, hoverProps } = useHover({ isDisabled });

  const getRippleProps = useCallback(
    () => ({ ripples, onClear: onClearRipple }),
    [ripples, onClearRipple],
  );

  const getButtonProps = useCallback(
    (userProps: React.HTMLAttributes<HTMLButtonElement> = {}) =>
      ({
        'data-disabled': toDataAttr(isDisabled),
        'data-focus': toDataAttr(isFocused),
        'data-pressed': toDataAttr(isPressed),
        'data-focus-visible': toDataAttr(isFocusVisible),
        'data-hover': toDataAttr(isHovered),
        'data-loading': toDataAttr(isLoading),
        ...mergeProps(
          ariaButtonProps,
          ariaCompatibleProps,
          focusProps,
          hoverProps,
          {
            ref: domRef,
            'aria-busy': isLoading,
            'aria-live': isLoading ? 'polite' : undefined,
            'aria-label': isLoading ? 'Loading' : userProps['aria-label'],
            style: {
              minHeight: '44px',
              minWidth: '44px',
              ...userProps.style,
            },
          },
          userProps,
        ),
      }) as React.HTMLAttributes<HTMLButtonElement>,
    [
      ariaButtonProps,
      ariaCompatibleProps,
      focusProps,
      hoverProps,
      isLoading,
      isDisabled,
      isFocused,
      isPressed,
      isFocusVisible,
      isHovered,
      domRef,
    ],
  );

  return {
    domRef,
    isPressed,
    isDisabled,
    isLoading,
    isFocused,
    isFocusVisible,
    isHovered,
    ripples,
    getButtonProps,
    getRippleProps,
  };
}
