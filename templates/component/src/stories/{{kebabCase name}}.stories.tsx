import type { Meta, StoryObj } from '@storybook/react'
import { {{name}} } from '../index'

const meta: Meta<typeof {{name}}> = {
  title: 'Components/{{name}}',
  component: {{name}},
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs'],
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
      <{{name}}>Default</{{name}}>
      <{{name}}>Secondary</{{name}}>
    </div>
  )
}