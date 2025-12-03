import * as React from 'react'
import { type VariantProps } from 'tailwind-variants'
// Import will be available after compilation

export interface BoxProps
  extends React.HTMLAttributes<HTMLElement>,
    VariantProps<typeof boxVariants> {
  /**
   * The element or component to render as
   * @default 'div'
   */
  as?: React.ElementType
  
  /**
   * The content of the box
   */
  children?: React.ReactNode
  
  /**
   * Display type
   */
  display?: 'block' | 'inline' | 'inline-block' | 'flex' | 'inline-flex' | 'grid' | 'inline-grid' | 'hidden'
  
  /**
   * Padding on all sides
   */
  p?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12
  
  /**
   * Horizontal padding
   */
  px?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12
  
  /**
   * Vertical padding
   */
  py?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12
  
  /**
   * Margin on all sides
   */
  m?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 'auto'
  
  /**
   * Horizontal margin
   */
  mx?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 'auto'
  
  /**
   * Vertical margin
   */
  my?: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 'auto'
  
  /**
   * Background color
   */
  bg?: 'transparent' | 'white' | 'black' | 'gray' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  
  /**
   * Border width
   */
  border?: 0 | 1 | 2 | 4 | 8
  
  /**
   * Border color
   */
  borderColor?: 'transparent' | 'current' | 'gray' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  
  /**
   * Border radius
   */
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
  
  /**
   * Box shadow
   */
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
  
  /**
   * Position type
   */
  position?: 'static' | 'fixed' | 'absolute' | 'relative' | 'sticky'
  
  /**
   * Overflow behavior
   */
  overflow?: 'auto' | 'hidden' | 'visible' | 'scroll'
}