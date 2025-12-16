import * as React from 'react'
import { useButton as useAriaButton } from 'react-aria'
import { useFocusRing } from 'react-aria'
import { useHover } from 'react-aria'
import type { AriaButtonProps } from 'react-aria'
import type { RippleProps } from './ripple-types'
import { toDataAttr, mergeProps } from '@ideasui/utils'

export interface UseRippleProps extends Omit<RippleProps, 'children'>, AriaButtonProps {
  /**
   * Ref to the DOM node
   */
  ref?: React.Ref<HTMLElement>
  /**
   * Whether the component should display a loading spinner
   */
  isLoading?: boolean
  /**
   * Whether the component is disabled
   */
  isDisabled?: boolean
}

export function useRipple(props: UseRippleProps) {
  const {
    loading = false,
    disabled = false,
    isLoading = loading,
    isDisabled: isDisabledProp = disabled,
    onClick,
    autoFocus,
    ...otherProps
  } = props

  const domRef = React.useRef<HTMLElement>(null)
  const [ripples, setRipples] = React.useState<Array<{ key: number; x: number; y: number }>>([])
  const isDisabled = isDisabledProp || isLoading

  const { isFocusVisible, isFocused, focusProps } = useFocusRing({
    autoFocus,
  })

  const { buttonProps: ariaButtonProps, isPressed } = useAriaButton(
    {
      ...otherProps,
      onPress: onClick,
      isDisabled,
    },
    domRef
  )

  const { isHovered, hoverProps } = useHover({ isDisabled })

  const handleRipple = React.useCallback((event: React.MouseEvent) => {
    if (isDisabled) return
    
    const rect = domRef.current?.getBoundingClientRect()
    if (!rect) return
    
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    const key = Date.now()
    
    setRipples(prev => [...prev, { key, x, y }])
    
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.key !== key))
    }, 600)
  }, [isDisabled])

  const getRippleProps = React.useCallback(
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
    rippleProps: getRippleProps(),
    getRippleProps,
  }
}

export type UseRippleReturn = ReturnType<typeof useRipple>