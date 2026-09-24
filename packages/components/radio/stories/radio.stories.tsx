import type { Meta, StoryObj } from '@storybook/react-vite';
import type { RadioProps } from '../src';

import { Radio, RadioGroup, RadioGroupDescription, RadioGroupError, RadioGroupLabel } from '../src';

const meta: Meta<typeof Radio> = {
  title: 'Components/Radio',
  component: Radio,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Enterprise radio component supporting single and group usage, semantic colors, variants, sizes, custom indicators, and full WCAG 2.1 AA accessibility.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'subtle'],
      description: 'Visual style variant of the radio indicator.',
    },
    color: {
      control: 'select',
      options: ['primary', 'neutral', 'success', 'warning', 'danger'],
      description: 'Color theme applied to the selected state.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size scale of the radio indicator.',
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
      description: 'Corner radius shape of the indicator.',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the radio is disabled.',
    },
    isInvalid: {
      control: 'boolean',
      description: 'Whether the radio is in an invalid state.',
    },
    defaultSelected: {
      control: 'boolean',
      description: 'Default selected state for uncontrolled usage.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Radio>;

export const Default: Story = {
  render: () => (
    <div className="p-3">
      <Radio defaultSelected>Option 1</Radio>
    </div>
  ),
};

export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['solid', 'outline', 'subtle'] as const).map((variant) => (
        <Radio key={variant} defaultSelected variant={variant}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Radio>
      ))}
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['primary', 'neutral', 'success', 'warning', 'danger'] as const).map((color) => (
        <Radio key={color} defaultSelected color={color}>
          {color.charAt(0).toUpperCase() + color.slice(1)}
        </Radio>
      ))}
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Radio key={size} defaultSelected size={size}>
          Size {size}
        </Radio>
      ))}
    </div>
  ),
};

export const Group: Story = {
  render: () => (
    <RadioGroup defaultValue="monthly">
      <RadioGroupLabel>Billing Cycle</RadioGroupLabel>
      <Radio value="monthly">Monthly ($12/mo)</Radio>
      <Radio value="yearly">Yearly ($100/yr)</Radio>
      <RadioGroupDescription>Save 30% with an annual subscription.</RadioGroupDescription>
      <RadioGroupError>Please select a billing plan.</RadioGroupError>
    </RadioGroup>
  ),
};

export const GroupHorizontal: Story = {
  render: () => (
    <RadioGroup defaultValue="card" orientation="horizontal">
      <RadioGroupLabel>Payment Method</RadioGroupLabel>
      <Radio value="card">Credit Card</Radio>
      <Radio value="paypal">PayPal</Radio>
      <Radio value="apple">Apple Pay</Radio>
    </RadioGroup>
  ),
};

export const GroupInvalid: Story = {
  render: () => (
    <RadioGroup isInvalid>
      <RadioGroupLabel>Required Selection</RadioGroupLabel>
      <Radio value="a">Option A</Radio>
      <Radio value="b">Option B</Radio>
      <RadioGroupError>You must select an option before continuing.</RadioGroupError>
    </RadioGroup>
  ),
};

export const GroupDisabled: Story = {
  render: () => (
    <RadioGroup isDisabled defaultValue="standard">
      <RadioGroupLabel>Delivery Speed</RadioGroupLabel>
      <Radio value="standard">Standard Shipping</Radio>
      <Radio value="express">Express Shipping</Radio>
    </RadioGroup>
  ),
};

export const Playground: Story = {
  args: {
    variant: 'solid',
    color: 'primary',
    size: 'md',
    isDisabled: false,
    isInvalid: false,
    defaultSelected: false,
    children: 'Radio label',
  },
  render: (args: RadioProps) => <Radio {...args} />,
};
