import {useRef, useCallback, Ref} from "react";
import {useButton as useAriaButton, useFocusRing, useHover} from "react-aria";
import {toDataAttr, mergeProps} from "@ideasui/utils";
import {useRipple, RippleProps} from "@ideasui/ripple";
import {ButtonProps} from "./button";

export interface UseButtonProps extends Omit<ButtonProps, "children"> {
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

export function useButton(props: UseButtonProps) {
  const {
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
    ...ariaCompatibleProps
  } = props;

  const domRef = useRef<HTMLButtonElement>(null);
  const isDisabled = isDisabledProp || isLoading;

  const {isFocusVisible, isFocused, focusProps} = useFocusRing({
    autoFocus,
  });

  const {onPress: handleRipple, onClear: onClearRipple, ripples} = useRipple();
  const handlePress = useCallback(
    (e: any) => {
      // if (disableRipple || isDisabled || disableAnimation) return;
      domRef.current && handleRipple(e);
      onClick && onClick(e);
    },
    [isDisabled, domRef],
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

  const {buttonProps: ariaButtonProps, isPressed} = useAriaButton(ariaProps, domRef);

  const {isHovered, hoverProps} = useHover({isDisabled});

  const getRippleProps = useCallback(
    () => ({ripples, onClear: onClearRipple}),
    [ripples, onClearRipple],
  );

  const getButtonProps = useCallback(
    (props: any = {}) => ({
      "data-disabled": toDataAttr(isDisabled),
      "data-focus": toDataAttr(isFocused),
      "data-pressed": toDataAttr(isPressed),
      "data-focus-visible": toDataAttr(isFocusVisible),
      "data-hover": toDataAttr(isHovered),
      "data-loading": toDataAttr(isLoading),
      ...mergeProps(
        ariaButtonProps,
        focusProps,
        hoverProps,
        {
          ref: domRef,
          "aria-busy": isLoading,
          "aria-live": isLoading ? "polite" : undefined,
          "aria-label": isLoading ? "Loading" : props["aria-label"],
          style: {
            minHeight: "44px",
            minWidth: "44px",
            ...props.style,
          },
        },
        props,
      ),
    }),
    [
      ariaButtonProps,
      focusProps,
      hoverProps,
      isLoading,
      isDisabled,
      isFocused,
      isPressed,
      isFocusVisible,
      isHovered,
      handleRipple,
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

export type UseButtonReturn = ReturnType<typeof useButton>;
