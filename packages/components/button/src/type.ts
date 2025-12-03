import * as React from 'react'
import { type VariantProps } from 'tailwind-variants'
import { buttonVariants } from './button'

export interface ButtonClassNames {
  /**
   * Override root button classes
   */
  root?: string

  /**
   * Override loading spinner classes
   */
  spinner?: string

  /**
   * Override content/text classes
   */
  content?: string

  /**
   * Override loading text classes
   */
  loadingText?: string

  /**
   * Override left icon classes
   */
  leftIcon?: string

  /**
   * Override right icon classes
   */
  rightIcon?: string
}

export interface ButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'color'>,
    VariantProps<typeof buttonVariants> {
  /**
   * The component to render as component
   * @default button
   */
  component?: React.ElementType

  /**
   * Show loading spinner and disable the button
   * @default false
   */
  loading?: boolean

  /**
   * Text to show when loading
   */
  loadingText?: string

  /**
   * Make button full width
   * @default false
   */
  fullWidth?: boolean

  /**
   * Radius of the button
   * @default md
   */
  radius?: 'full' | 'none' | 'sm' | 'md' | 'lg' | 'xl'
  /**
   * Icon to show before the button text
   */
  leftIcon?: React.ReactNode

  /**
   * Icon to show after the button text
   */
  rightIcon?: React.ReactNode

  /**
   * Override specific element classes
   */
  classNames?: ButtonClassNames

  /**
   * Enable ripple effect on click
   * @default false
   */
  ripple?: boolean

  /**
   * Custom variant for button+
   * @default false
   */
  customVariant?: string

  /**
   * ARIA label for accessibility
   */
  'aria-label'?: string

  /**
   * ARIA described by for accessibility
   */
  'aria-describedby'?: string

  /**
   * ARIA expanded state for accessibility
   */
  'aria-expanded'?: boolean

  /**
   * ARIA pressed state for accessibility
   */
  'aria-pressed'?: boolean

  /**
   * ARIA controls for accessibility
   */
  'aria-controls'?: string
}
