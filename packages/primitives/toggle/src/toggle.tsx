import * as React from 'react'

export interface ToggleState {
  isOn: boolean
  toggle: () => void
  turnOn: () => void
  turnOff: () => void
}

export interface ToggleProps {
  /**
   * Initial toggle state
   */
  defaultPressed?: boolean
  
  /**
   * Controlled toggle state
   */
  pressed?: boolean
  
  /**
   * Called when toggle state changes
   */
  onPressedChange?: (pressed: boolean) => void
  
  /**
   * Whether the toggle is disabled
   */
  disabled?: boolean
  
  /**
   * Render prop that receives toggle state
   */
  children: (state: ToggleState) => React.ReactNode
}

export const Toggle: React.FC<ToggleProps> = ({
  defaultPressed = false,
  pressed,
  onPressedChange,
  disabled = false,
  children,
}) => {
  const [internalPressed, setInternalPressed] = React.useState(defaultPressed)
  
  const isControlled = pressed !== undefined
  const isPressed = isControlled ? pressed : internalPressed
  
  const toggle = React.useCallback(() => {
    if (disabled) return
    
    const newPressed = !isPressed
    
    if (!isControlled) {
      setInternalPressed(newPressed)
    }
    
    onPressedChange?.(newPressed)
  }, [disabled, isPressed, isControlled, onPressedChange])
  
  const turnOn = React.useCallback(() => {
    if (disabled || isPressed) return
    
    if (!isControlled) {
      setInternalPressed(true)
    }
    
    onPressedChange?.(true)
  }, [disabled, isPressed, isControlled, onPressedChange])
  
  const turnOff = React.useCallback(() => {
    if (disabled || !isPressed) return
    
    if (!isControlled) {
      setInternalPressed(false)
    }
    
    onPressedChange?.(false)
  }, [disabled, isPressed, isControlled, onPressedChange])
  
  const state: ToggleState = {
    isOn: isPressed,
    toggle,
    turnOn,
    turnOff,
  }
  
  return <>{children(state)}</>
}

Toggle.displayName = 'Toggle'