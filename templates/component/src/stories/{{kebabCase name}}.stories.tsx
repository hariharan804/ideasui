import type { Meta, StoryObj } from '@storybook/react'
import { {{name}} } from '@/components/{{kebabCase name}}'

const meta: Meta<typeof {{name}}> = {
  title: 'Components/{{name}}',
  component: {{name}},
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
      options: ['default', 'sm', 'lg']
    }
  }
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: '{{name}} Component'
  }
}

export const Variants: Story = {
  render: () => (
    <div className="flex gap-2">
      <{{name}} variant="default">Default</{{name}}>
      <{{name}} variant="secondary">Secondary</{{name}}>
    </div>
  )
}