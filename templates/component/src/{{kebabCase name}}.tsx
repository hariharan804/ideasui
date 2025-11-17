import { forwardRef } from 'react'
import { cn } from '@your-org/lib'
import type { {{pascalCase name}}Props } from './type'


const {{pascalCase name}} = forwardRef<HTMLDivElement, {{pascalCase name}}Props>(
  ({ className, ...rest }, ref) => {
    return (
      <div
        className={cn({{camelCase name}}, className)}
        ref={ref}
        {...rest}
      />
    )
  }
)
{{pascalCase name}}.displayName = '{{pascalCase name}}'

export { {{pascalCase name}} }