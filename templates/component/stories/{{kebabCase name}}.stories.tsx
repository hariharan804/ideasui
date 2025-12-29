import type { Meta } from '@storybook/react'
import { {{pascalCase name}} } from '../src'

const meta = {
  title: 'Components/{{pascalCase name}}',
  component: {{pascalCase name}},
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'secondary']
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg']
    }
  }
} as Meta<typeof {{pascalCase name}}>

export default meta

export const Default = {
  args: {
    children: '{{pascalCase name}} Component'
  }
}

export const Variants = {
  render: () => (
    <div className="flex gap-2">
      <{{pascalCase name}} variant="default">Default</{{pascalCase name}}>
      <{{pascalCase name}} variant="secondary">Secondary</{{pascalCase name}}>
    </div>
  )
}

export const Sizes = {
  render: () => (
    <div className="flex gap-2 items-center">
      <{{pascalCase name}} size="sm">Small</{{pascalCase name}}>
      <{{pascalCase name}} size="md">Medium</{{pascalCase name}}>
      <{{pascalCase name}} size="lg">Large</{{pascalCase name}}>
    </div>
  )
}