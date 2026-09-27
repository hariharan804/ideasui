import type { Meta, StoryObj } from '@storybook/react-vite';

import { useState } from 'react';

import {
  Switch,
  SwitchGroup,
  SwitchGroupDescription,
  SwitchGroupError,
  SwitchGroupLabel,
} from '../src';

const meta: Meta<typeof Switch> = {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'An accessible, theme-aware toggle primitive supporting standalone usage, controlled state, visual variants, track labels, and group selection.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'soft', 'contrast'],
      description: 'The visual variant style.',
    },
    thumbVariant: {
      control: 'select',
      options: ['solid', 'flat', 'gradient', 'bordered', 'contrast', 'dark'],
      description: 'The thumb visual variant style.',
    },
    thumbShape: {
      control: 'select',
      options: ['full', 'pill', 'square', 'rectangle'],
      description: 'The shape of the switch thumb.',
    },
    thumbSize: {
      control: 'select',
      options: ['contained', 'extended'],
      description: 'Whether the thumb is contained inside track or extended.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The component size scale.',
    },
    color: {
      control: 'select',
      options: ['primary', 'neutral', 'success', 'warning', 'danger'],
      description: 'The semantic OKLCH color theme.',
    },
    labelPlacement: {
      control: 'select',
      options: ['start', 'end'],
      description: 'Position of label relative to track.',
    },
    defaultSelected: {
      control: 'boolean',
      description: 'Whether the switch is selected by default.',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the switch is disabled.',
    },
    isReadOnly: {
      control: 'boolean',
      description: 'Whether the switch is read-only.',
    },
    isInvalid: {
      control: 'boolean',
      description: 'Whether the switch is in an invalid state.',
    },
    children: {
      control: 'text',
      description: 'Label content displayed alongside the switch.',
    },
  },
  args: {
    children: 'Enable notifications',
    variant: 'solid',
    thumbVariant: 'solid',
    thumbShape: 'full',
    thumbSize: 'contained',
    color: 'primary',
    size: 'md',
    labelPlacement: 'end',
    defaultSelected: true,
    isDisabled: false,
    isReadOnly: false,
    isInvalid: false,
  },
};

export default meta;
type Story = StoryObj<typeof Switch>;

export const Default: Story = {
  render: (args) => <Switch {...args} />,
};

export const Variants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4">
      {(['solid', 'outline', 'soft', 'contrast'] as const).map((variant) => (
        <Switch key={variant} defaultSelected variant={variant}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)} Variant
        </Switch>
      ))}
    </div>
  ),
};

export const ThumbVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {(['solid', 'flat', 'gradient', 'bordered', 'contrast', 'dark'] as const).map(
        (thumbVariant) => (
          <div
            key={thumbVariant}
            className="border-border bg-surface-subtle/40 flex flex-col gap-3 rounded-xl border p-4 shadow-2xs"
          >
            <span className="text-content-secondary text-xs font-semibold tracking-wider uppercase">
              {thumbVariant.charAt(0).toUpperCase() + thumbVariant.slice(1)} Thumb
            </span>
            <div className="flex items-center gap-6">
              <Switch thumbVariant={thumbVariant}>Off</Switch>
              <Switch defaultSelected thumbVariant={thumbVariant}>
                On
              </Switch>
            </div>
          </div>
        ),
      )}
    </div>
  ),
};

export const ThumbShapes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4">
      {(['full', 'pill', 'square', 'rectangle'] as const).map((thumbShape) => (
        <Switch key={thumbShape} defaultSelected thumbShape={thumbShape}>
          {thumbShape.charAt(0).toUpperCase() + thumbShape.slice(1)} Thumb Shape
        </Switch>
      ))}
    </div>
  ),
};

export const ThumbSizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4">
      {(['contained', 'extended'] as const).map((thumbSize) => (
        <Switch key={thumbSize} defaultSelected thumbSize={thumbSize}>
          {thumbSize.charAt(0).toUpperCase() + thumbSize.slice(1)} Thumb Size
        </Switch>
      ))}
    </div>
  ),
};

export const Colors: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4">
      {(['primary', 'neutral', 'success', 'warning', 'danger'] as const).map((color) => (
        <Switch key={color} defaultSelected color={color}>
          {color.charAt(0).toUpperCase() + color.slice(1)} Color
        </Switch>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Switch key={size} defaultSelected size={size}>
          Size {size}
        </Switch>
      ))}
    </div>
  ),
};

export const LabelPlacement: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch defaultSelected labelPlacement="end">
        Label end (default)
      </Switch>
      <Switch defaultSelected labelPlacement="start">
        Label start
      </Switch>
    </div>
  ),
};

export const WithTrackLabels: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch defaultSelected offLabel="OFF" size="sm" onLabel="ON">
        Small with track labels
      </Switch>
      <Switch defaultSelected offLabel="OFF" size="md" onLabel="ON">
        Medium with track labels
      </Switch>
      <Switch defaultSelected offLabel="OFF" size="lg" onLabel="ON">
        Large with track labels
      </Switch>
    </div>
  ),
};

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="flex flex-col gap-4">
      <Switch>Unchecked</Switch>
      <Switch defaultSelected>Checked</Switch>
      <Switch isDisabled>Disabled Unchecked</Switch>
      <Switch defaultSelected isDisabled>
        Disabled Checked
      </Switch>
      <Switch defaultSelected isReadOnly>
        Read-Only
      </Switch>
      <Switch isInvalid>Invalid State</Switch>
    </div>
  ),
};

export const Controlled: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const ControlledExample = () => {
      const [isSelected, setIsSelected] = useState(true);

      return (
        <div className="flex flex-col gap-3">
          <Switch isSelected={isSelected} onChange={(checked) => setIsSelected(checked)}>
            Subscribe to email updates
          </Switch>
          <p className="text-xs">Current state: {isSelected ? 'ON' : 'OFF'}</p>
        </div>
      );
    };

    return <ControlledExample />;
  },
};

export const Group: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <SwitchGroup defaultValue={['email']}>
      <SwitchGroupLabel>Notification Channels</SwitchGroupLabel>
      <Switch value="email">Email</Switch>
      <Switch value="sms">SMS</Switch>
      <Switch value="push">Push Notifications</Switch>
      <SwitchGroupDescription>Enable at least one channel.</SwitchGroupDescription>
    </SwitchGroup>
  ),
};

export const GroupHorizontal: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <SwitchGroup defaultValue={['wifi']} orientation="horizontal">
      <SwitchGroupLabel>Connectivity</SwitchGroupLabel>
      <Switch value="wifi">Wi-Fi</Switch>
      <Switch value="bluetooth">Bluetooth</Switch>
      <Switch value="cellular">Cellular Data</Switch>
    </SwitchGroup>
  ),
};

export const GroupInvalid: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <SwitchGroup isInvalid defaultValue={[]}>
      <SwitchGroupLabel>Required Preferences</SwitchGroupLabel>
      <Switch value="terms">Accept terms & conditions</Switch>
      <SwitchGroupDescription>You must accept the terms.</SwitchGroupDescription>
      <SwitchGroupError>Please toggle to accept the terms.</SwitchGroupError>
    </SwitchGroup>
  ),
};

export const GroupDisabled: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <SwitchGroup isDisabled defaultValue={['a']}>
      <SwitchGroupLabel>Locked System Settings</SwitchGroupLabel>
      <Switch value="a">Option A</Switch>
      <Switch value="b">Option B</Switch>
      <SwitchGroupDescription>System settings managed by administrator.</SwitchGroupDescription>
    </SwitchGroup>
  ),
};

export const SettingsPanel: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="border-border bg-surface flex w-80 flex-col gap-4 rounded-xl border p-4 shadow-sm">
      <h3 className="text-content-primary text-sm font-semibold">Privacy Settings</h3>
      <Switch defaultSelected color="primary">
        Public Profile
      </Switch>
      <Switch defaultSelected color="success">
        Search Engine Indexing
      </Switch>
      <Switch color="danger">Data Collection</Switch>
    </div>
  ),
};

export const AllSwitchesGallery: Story = {
  name: 'All Switches Showcase',
  parameters: { controls: { disable: true } },
  render: () => (
    <div className="border-border bg-surface flex flex-col gap-8 rounded-2xl border p-6 shadow-sm">
      {/* 1. Track Variants */}
      <div className="flex flex-col gap-3">
        <h3 className="text-content-primary text-xs font-bold tracking-wider uppercase">
          Track Variants
        </h3>
        <div className="flex flex-wrap items-center gap-6">
          {(['solid', 'outline', 'soft', 'contrast'] as const).map((variant) => (
            <Switch key={variant} defaultSelected variant={variant}>
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </Switch>
          ))}
        </div>
      </div>

      {/* 2. Thumb Variants */}
      <div className="flex flex-col gap-3">
        <h3 className="text-content-primary text-xs font-bold tracking-wider uppercase">
          Thumb Variants
        </h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {(['solid', 'flat', 'gradient', 'bordered', 'contrast', 'dark'] as const).map(
            (thumbVariant) => (
              <div
                key={thumbVariant}
                className="border-border bg-surface-subtle/40 flex flex-col gap-2 rounded-xl border p-3 shadow-2xs"
              >
                <span className="text-content-muted text-[10px] font-bold tracking-wider uppercase">
                  {thumbVariant}
                </span>
                <div className="flex items-center gap-4">
                  <Switch thumbVariant={thumbVariant}>Off</Switch>
                  <Switch defaultSelected thumbVariant={thumbVariant}>
                    On
                  </Switch>
                </div>
              </div>
            ),
          )}
        </div>
      </div>

      {/* 3. Thumb Shapes */}
      <div className="flex flex-col gap-3">
        <h3 className="text-content-primary text-xs font-bold tracking-wider uppercase">
          Thumb Shapes
        </h3>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {(['full', 'pill', 'square', 'rectangle'] as const).map((thumbShape) => (
            <div
              key={thumbShape}
              className="border-border bg-surface-subtle/40 flex flex-col gap-2 rounded-xl border p-3 shadow-2xs"
            >
              <span className="text-content-muted text-[10px] font-bold tracking-wider uppercase">
                {thumbShape}
              </span>
              <div className="flex items-center gap-4">
                <Switch thumbShape={thumbShape}>Off</Switch>
                <Switch defaultSelected thumbShape={thumbShape}>
                  On
                </Switch>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 4. Thumb Sizes */}
      <div className="flex flex-col gap-3">
        <h3 className="text-content-primary text-xs font-bold tracking-wider uppercase">
          Thumb Sizes
        </h3>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {(['contained', 'extended'] as const).map((thumbSize) => (
            <div
              key={thumbSize}
              className="border-border bg-surface-subtle/40 flex flex-col gap-2 rounded-xl border p-3 shadow-2xs"
            >
              <span className="text-content-muted text-[10px] font-bold tracking-wider uppercase">
                {thumbSize}
              </span>
              <div className="flex items-center gap-6">
                <Switch thumbSize={thumbSize}>Off</Switch>
                <Switch defaultSelected thumbSize={thumbSize}>
                  On
                </Switch>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 5. Colors */}
      <div className="flex flex-col gap-3">
        <h3 className="text-content-primary text-xs font-bold tracking-wider uppercase">
          Color Palette
        </h3>
        <div className="flex flex-wrap items-center gap-6">
          {(['primary', 'neutral', 'success', 'warning', 'danger'] as const).map((color) => (
            <Switch key={color} defaultSelected color={color}>
              {color.charAt(0).toUpperCase() + color.slice(1)}
            </Switch>
          ))}
        </div>
      </div>

      {/* 6. Sizes */}
      <div className="flex flex-col gap-3">
        <h3 className="text-content-primary text-xs font-bold tracking-wider uppercase">
          Size Scale
        </h3>
        <div className="flex items-center gap-6">
          {(['sm', 'md', 'lg'] as const).map((size) => (
            <Switch key={size} defaultSelected size={size}>
              Size {size}
            </Switch>
          ))}
        </div>
      </div>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    children: 'Playground Switch',
    variant: 'solid',
    thumbVariant: 'solid',
    thumbShape: 'full',
    thumbSize: 'contained',
    color: 'primary',
    size: 'md',
    labelPlacement: 'end',
    defaultSelected: true,
  },
  render: (args) => <Switch {...args} />,
};
