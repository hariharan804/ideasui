import * as React from 'react'
import { type VariantProps } from 'tailwind-variants'

export interface {{pascalCase name}}Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof {{camelCase name}}Variants> {
  children?: React.ReactNode
}
