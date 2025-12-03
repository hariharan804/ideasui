import type { Meta, StoryObj } from '@storybook/react'
import { IdeasUIProvider, useIdeasUI } from '../index'

const ConfigDisplay = () => {
  const config = useIdeasUI()
  
  return (
    <div className="p-4 border rounded-md bg-gray-50">
      <h3 className="font-semibold mb-2">IdeasUI Configuration</h3>
      <div className="space-y-1 text-sm">
        <div><strong>Theme:</strong> {config.defaultTheme}</div>
        <div><strong>CSS Prefix:</strong> {config.cssPrefix}</div>
        <div><strong>Animations:</strong> {config.disableAnimations ? 'Disabled' : 'Enabled'}</div>
        <div><strong>Strict Mode:</strong> {config.strict ? 'On' : 'Off'}</div>
      </div>
    </div>
  )
}

const meta: Meta<typeof IdeasUIProvider> = {
  title: 'Core/Provider',
  component: IdeasUIProvider,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <IdeasUIProvider>
      <ConfigDisplay />
    </IdeasUIProvider>
  )
}

export const DarkTheme: Story = {
  render: () => (
    <IdeasUIProvider defaultTheme="dark">
      <ConfigDisplay />
    </IdeasUIProvider>
  )
}

export const DisabledAnimations: Story = {
  render: () => (
    <IdeasUIProvider disableAnimations={true}>
      <ConfigDisplay />
    </IdeasUIProvider>
  )
}

export const CustomPrefix: Story = {
  render: () => (
    <IdeasUIProvider cssPrefix="--my-ui">
      <ConfigDisplay />
    </IdeasUIProvider>
  )
}

export const StrictMode: Story = {
  render: () => (
    <IdeasUIProvider strict={true}>
      <ConfigDisplay />
    </IdeasUIProvider>
  )
}

export const FullConfiguration: Story = {
  render: () => (
    <IdeasUIProvider
      defaultTheme="dark"
      cssPrefix="--custom"
      disableAnimations={true}
      strict={true}
    >
      <ConfigDisplay />
    </IdeasUIProvider>
  )
}