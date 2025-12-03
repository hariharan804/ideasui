import { Button } from '@ideasui/button'
import { ComponentType } from 'react'

export interface PropConfig {
  type: 'select' | 'boolean' | 'string' | 'number'
  options?: string[]
  defaultValue: any
  label: string
}

export interface ComponentConfig {
  component: ComponentType<any>
  props: Record<string, PropConfig>
  defaultChildren?: string
}

export const componentRegistry: Record<string, ComponentConfig> = {
  Button: {
    component: Button,
    props: {
      variant: {
        type: 'select',
        options: [
          'default',
          'destructive',
          'outline',
          'secondary',
          'ghost',
          'link',
        ],
        defaultValue: 'default',
        label: 'Variant',
      },
      size: {
        type: 'select',
        options: ['default', 'sm', 'lg', 'icon'],
        defaultValue: 'default',
        label: 'Size',
      },
      disabled: {
        type: 'boolean',
        defaultValue: false,
        label: 'Disabled',
      },
    },
    defaultChildren: 'Click Me',
  },
}

export const getComponentNames = () => Object.keys(componentRegistry)
