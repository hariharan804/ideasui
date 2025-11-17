import type { Meta, StoryObj } from '@storybook/react'
import { Lib } from '@/components/lib'

const meta: Meta<typeof Lib> = {
  title: 'Components/Lib',
  component: Lib,
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
    children: 'Lib Component'
  }
}

export const Variants: Story = {
  render: () => (
    <div className="flex gap-2">
      <Lib variant="default">Default</Lib>
      <Lib variant="secondary">Secondary</Lib>
    </div>
  )
}