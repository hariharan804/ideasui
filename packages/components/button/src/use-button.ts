import * as React from 'react'
import { useButton as useAriaButton } from 'react-aria'
import { useFocusRing } from 'react-aria'
import { useHover } from 'react-aria'
import { usePress } from 'react-aria'
import type { AriaButtonProps } from 'react-aria'
import type { ButtonProps } from './button-types'
import { toDataAttr, mergeProps } from '@ideasui/utils'

export interface UseButtonProps extends Omit<ButtonProps, 'children'> {
  /**
   * Ref to the DOM node
   */
  ref?: React.Ref<HTMLButtonElement>
  /**
   * Whether the button should display a loading spinner
   */
  isLoading?: boolean
  /**
   * Whether the button is disabled
   */
  isDisabled?: boolean
}

export function useButton(props: UseButtonProps) {
  const {
    loading = false,
    disabled = false,
    isLoading = loading,
    isDisabled: isDisabledProp = disabled,
    onClick,
    autoFocus,
    ...otherProps
  } = props

  const domRef = React.useRef<HTMLButtonElement>(null)
  const [ripples, setRipples] = React.useState<
    Array<{ key: number; x: number; y: number }>
  >([])
  const isDisabled = isDisabledProp || isLoading

  const { isFocusVisible, isFocused, focusProps } = useFocusRing({
    autoFocus,
  })

  // Convert onClick to onPress handler
  const handlePress = React.useCallback(
    (e: any) => {
      if (onClick) {
        // Create a synthetic mouse event-like object
        const syntheticEvent = {
          ...e,
          currentTarget: domRef.current,
          target: domRef.current,
        }
        onClick(syntheticEvent as React.MouseEvent<HTMLButtonElement>)
      }
    },
    [onClick]
  )

  // Filter out props that conflict with AriaButtonProps
  const {
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
  } = otherProps

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
  }

  const { buttonProps: ariaButtonProps, isPressed } = useAriaButton(
    ariaProps,
    domRef
  )

  const { isHovered, hoverProps } = useHover({ isDisabled })
  const handleRipple = React.useCallback(
    (event: React.MouseEvent) => {
      if (isDisabled) return

      const rect = domRef.current?.getBoundingClientRect()
      if (!rect) return

      const x = event.clientX - rect.left
      const y = event.clientY - rect.top
      const key = Date.now()

      setRipples((prev) => [...prev, { key, x, y }])

      setTimeout(() => {
        setRipples((prev) => prev.filter((ripple) => ripple.key !== key))
      }, 600)
    },
    [isDisabled]
  )

  const getButtonProps = React.useCallback(
    (props: any = {}) => ({
      'data-disabled': toDataAttr(isDisabled),
      'data-focus': toDataAttr(isFocused),
      'data-pressed': toDataAttr(isPressed),
      'data-focus-visible': toDataAttr(isFocusVisible),
      'data-hover': toDataAttr(isHovered),
      'data-loading': toDataAttr(isLoading),
      ...mergeProps(
        ariaButtonProps,
        focusProps,
        hoverProps,
        {
          ref: domRef,
          'aria-busy': isLoading,
          'aria-live': isLoading ? 'polite' : undefined,
          'aria-label': isLoading ? 'Loading' : props['aria-label'],
          onMouseDown: handleRipple,
          style: {
            minHeight: '44px',
            minWidth: '44px',
            ...props.style,
          },
        },
        props
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
    ]
  )

  return {
    domRef,
    isPressed,
    isDisabled,
    isLoading,
    isFocused,
    isFocusVisible,
    isHovered,
    ripples,
    buttonProps: getButtonProps(),
    getButtonProps,
  }
}

export type UseButtonReturn = ReturnType<typeof useButton>
