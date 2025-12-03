import type { Meta, StoryObj } from '@storybook/react'
import { Toggle } from '../index'

const meta: Meta<typeof Toggle> = {
  title: 'Primitives/Toggle',
  component: Toggle,
  parameters: {
    layout: 'centered'
  },
  tags: ['autodocs']
}

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  render: () => (
    <Toggle>
      {({ isOn, toggle }) => (
        <button
          onClick={toggle}
          className={`px-4 py-2 rounded ${
            isOn ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'
          }`}
        >
          {isOn ? 'ON' : 'OFF'}
        </button>
      )}
    </Toggle>
  )
}

export const DefaultPressed: Story = {
  render: () => (
    <Toggle defaultPressed>
      {({ isOn, toggle }) => (
        <button
          onClick={toggle}
          className={`px-4 py-2 rounded ${
            isOn ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-800'
          }`}
        >
          {isOn ? 'Active' : 'Inactive'}
        </button>
      )}
    </Toggle>
  )
}

export const WithSeparateControls: Story = {
  render: () => (
    <Toggle>
      {({ isOn, turnOn, turnOff }) => (
        <div className="flex gap-2 items-center">
          <button
            onClick={turnOn}
            disabled={isOn}
            className="px-3 py-1 bg-green-500 text-white rounded disabled:opacity-50"
          >
            Turn On
          </button>
          <span className={`px-2 py-1 rounded ${isOn ? 'bg-green-100' : 'bg-gray-100'}`}>
            {isOn ? 'ON' : 'OFF'}
          </span>
          <button
            onClick={turnOff}
            disabled={!isOn}
            className="px-3 py-1 bg-red-500 text-white rounded disabled:opacity-50"
          >
            Turn Off
          </button>
        </div>
      )}
    </Toggle>
  )
}

export const Disabled: Story = {
  render: () => (
    <Toggle disabled>
      {({ isOn, toggle }) => (
        <button
          onClick={toggle}
          className="px-4 py-2 rounded bg-gray-300 text-gray-500 cursor-not-allowed"
        >
          {isOn ? 'ON' : 'OFF'} (Disabled)
        </button>
      )}
    </Toggle>
  )
}

export const CustomSwitch: Story = {
  render: () => (
    <Toggle>
      {({ isOn, toggle }) => (
        <div className="flex items-center gap-2">
          <span>Dark Mode</span>
          <button
            onClick={toggle}
            className={`relative w-12 h-6 rounded-full transition-colors ${
              isOn ? 'bg-blue-500' : 'bg-gray-300'
            }`}
          >
            <div
              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                isOn ? 'translate-x-7' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      )}
    </Toggle>
  )
}