import type { ColorVariant, ButtonSize, Radius } from '@ideasui/variants'

export interface RippleProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /**
   * Visual style variant
   * @default 'solid'
   */
  variant?: 'solid' | 'outline' | 'ghost'
  
  /**
   * Color variant based on semantic intent
   * @default 'default'
   */
  color?: ColorVariant
  
  /**
   * Size of the component
   * @default 'md'
   */
  size?: ButtonSize
  
  /**
   * Border radius variant
   * @default 'md'
   */
  radius?: Radius
}