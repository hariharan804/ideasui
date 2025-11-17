import type { Meta, StoryObj } from '@storybook/react'
import { Button } from '../index'

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    children: 'Button Component',
  },
}

export const Variants: Story = {
  render: () => (
    <div className="flex gap-2">
      <Button>Default</Button>
      <Button>Secondary</Button>
    </div>
  ),
}
