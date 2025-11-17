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
      >{{camelCase name}} Change here</div>
    )
  }
)
{{pascalCase name}}.displayName = '{{pascalCase name}}'

export { {{pascalCase name}} }