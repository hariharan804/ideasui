import type { Meta, StoryObj } from '@storybook/react'
import { {{pascalCase name}} } from '../index'

const meta: Meta<typeof {{pascalCase name}}> = {
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
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: '{{pascalCase name}} Component'
  }
}

export const Variants: Story = {
  render: () => (
    <div className="flex gap-2">
      <{{pascalCase name}} variant="default">Default</{{pascalCase name}}>
      <{{pascalCase name}} variant="secondary">Secondary</{{pascalCase name}}>
    </div>
  )
}

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-2 items-center">
      <{{pascalCase name}} size="sm">Small</{{pascalCase name}}>
      <{{pascalCase name}} size="md">Medium</{{pascalCase name}}>
      <{{pascalCase name}} size="lg">Large</{{pascalCase name}}>
    </div>
  )
}