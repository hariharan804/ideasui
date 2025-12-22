import * as React from 'react'
import { {{camelCase name}}Variants } from '@ideasui/variants'
import { cn } from '@ideasui/utils'
import type { {{pascalCase name}}Props } from './{{name}}-types'
import type { ColorVariant, ButtonSize, Radius } from '@ideasui/variants'

export interface {{pascalCase name}}Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
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
export const {{pascalCase name}} = React.forwardRef<HTMLButtonElement, {{pascalCase name}}Props>(
  ({ className, variant, color, size, radius, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn({{camelCase name}}Variants({ variant, color, size, radius }), className)}
        {...props}
      />
    )
  }
)

{{pascalCase name}}.displayName = 'IdeasUI.{{pascalCase name}}'