import type { Meta, StoryObj } from '@storybook/react'
import { Ripple } from '../index'

const meta: Meta<typeof Ripple> = {
  title: 'Components/Ripple',
  component: Ripple,
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
    children: 'Ripple Component'
  }
}

export const Variants: Story = {
  render: () => (
    <div className="flex gap-2">
      <Ripple variant="default">Default</Ripple>
      <Ripple variant="secondary">Secondary</Ripple>
    </div>
  )
}

export const Sizes: Story = {
  render: () => (
    <div className="flex gap-2 items-center">
      <Ripple size="sm">Small</Ripple>
      <Ripple size="md">Medium</Ripple>
      <Ripple size="lg">Large</Ripple>
    </div>
  )
}