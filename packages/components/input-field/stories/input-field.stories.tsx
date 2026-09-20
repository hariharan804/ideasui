import type { Meta, StoryObj } from '@storybook/react-vite';

import { Mail, Search, DollarSign, Command, Lock, User, AtSign } from 'lucide-react';

import {
  InputField,
  InputFieldLabel,
  InputFieldInput,
  InputFieldDescription,
  InputFieldError,
} from '../src';

const meta: Meta<typeof InputField> = {
  title: 'Components/InputField',
  component: InputField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Accessible, compound InputField component with default, inside-fixed, inside-floating, and floating label variants.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    labelVariant: {
      control: 'select',
      options: ['default', 'inside-fixed', 'inside-floating', 'floating'],
      description: 'The label positioning and behavior variant.',
    },
    variant: {
      control: 'select',
      options: ['outline', 'filled', 'flushed', 'unstyled', 'shadow'],
      description: 'The visual variant style.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'The component size.',
    },
    shadow: {
      control: 'select',
      options: ['none', 'xs', 'sm', 'md', 'lg', 'xl'],
      description: 'The shadow elevation scale.',
    },
    inputFilter: {
      control: 'select',
      options: ['numeric', 'decimal', 'alpha', 'alphanumeric'],
      description: 'Character input filter restriction mode.',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the component is disabled.',
    },
    isReadOnly: {
      control: 'boolean',
      description: 'Whether the component is read-only.',
    },
    isRequired: {
      control: 'boolean',
      description: 'Whether the component is required.',
    },
    isInvalid: {
      control: 'boolean',
      description: 'Whether the component is invalid.',
    },
  },
};

export default meta;

type Story = StoryObj<typeof InputField>;

export const Basic: Story = {
  args: {
    label: 'Email address',
    placeholder: 'you@example.com',
    description: 'We will never share your email address.',
  },
  render: (args) => (
    <div className="w-80">
      <InputField {...args} startContent={<Mail className="h-4 w-4" />} />
    </div>
  ),
};

export const LabelVariants: Story = {
  render: (args) => (
    <div className="flex flex-col gap-8">
      <div>
        <h3 className="text-content-secondary mb-3 text-sm font-semibold">
          Standard Label Variants
        </h3>
        <div className="flex w-80 flex-col gap-6">
          <InputField {...args} labelVariant="default">
            <InputFieldLabel>Default Label</InputFieldLabel>
            <InputFieldInput placeholder="Default label position" />
            <InputFieldDescription>Label sits above input field.</InputFieldDescription>
          </InputField>

          <InputField {...args} labelVariant="inside-fixed">
            <InputFieldLabel>Inside Fixed Label</InputFieldLabel>
            <InputFieldInput placeholder="Inside fixed position" />
            <InputFieldDescription>
              Label sits permanently at top inside field.
            </InputFieldDescription>
          </InputField>

          <InputField {...args} labelVariant="inside-floating">
            <InputFieldLabel>Inside Floating Label</InputFieldLabel>
            <InputFieldInput placeholder="Inside floating position" />
            <InputFieldDescription>
              Label starts inside as placeholder and moves to top inside.
            </InputFieldDescription>
          </InputField>

          <InputField {...args} labelVariant="floating">
            <InputFieldLabel>Floating Label</InputFieldLabel>
            <InputFieldInput placeholder="Floating label position" />
            <InputFieldDescription>
              Label floats over top border on focus/value.
            </InputFieldDescription>
          </InputField>
        </div>
      </div>

      <div>
        <h3 className="text-content-secondary mb-3 text-sm font-semibold">
          Label Variants with Start & End Content
        </h3>
        <div className="flex w-80 flex-col gap-6">
          <InputField {...args} labelVariant="default">
            <InputFieldLabel>Default Label</InputFieldLabel>
            <InputFieldInput
              endContent={<span className="text-content-tertiary font-mono text-xs">USD</span>}
              placeholder="Default label position"
              startContent={<Mail className="h-4 w-4" />}
            />
            <InputFieldDescription>Label sits above input field.</InputFieldDescription>
          </InputField>

          <InputField {...args} labelVariant="inside-fixed">
            <InputFieldLabel>Inside Fixed Label</InputFieldLabel>
            <InputFieldInput
              endContent={<span className="text-content-tertiary font-mono text-xs">USD</span>}
              placeholder="Inside fixed position"
              startContent={<DollarSign className="h-4 w-4" />}
            />
            <InputFieldDescription>
              Label sits permanently at top inside field.
            </InputFieldDescription>
          </InputField>

          <InputField {...args} labelVariant="inside-floating">
            <InputFieldLabel>Inside Floating Label</InputFieldLabel>
            <InputFieldInput
              endContent={<span className="text-content-tertiary font-mono text-xs">USD</span>}
              placeholder="Inside floating position"
              startContent={<DollarSign className="h-4 w-4" />}
            />
            <InputFieldDescription>
              Label starts inside as placeholder and moves to top inside.
            </InputFieldDescription>
          </InputField>

          <InputField {...args} labelVariant="floating">
            <InputFieldLabel>Floating Label</InputFieldLabel>
            <InputFieldInput
              endContent={<Command className="h-4 w-4" />}
              placeholder="Floating label position"
              startContent={<Search className="h-4 w-4" />}
            />
            <InputFieldDescription>
              Label floats over top border on focus/value.
            </InputFieldDescription>
          </InputField>
        </div>
      </div>
    </div>
  ),
};

export const Variants: Story = {
  render: (args) => (
    <div className="flex w-80 flex-col gap-6">
      <InputField {...args} variant="outline">
        <InputFieldLabel>Outline Variant</InputFieldLabel>
        <InputFieldInput placeholder="Outline style" startContent={<Mail className="h-4 w-4" />} />
      </InputField>
      <InputField {...args} variant="filled">
        <InputFieldLabel>Filled Variant</InputFieldLabel>
        <InputFieldInput placeholder="Filled style" startContent={<Mail className="h-4 w-4" />} />
      </InputField>
      <InputField {...args} variant="flushed">
        <InputFieldLabel>Flushed Variant</InputFieldLabel>
        <InputFieldInput placeholder="Flushed style" startContent={<Mail className="h-4 w-4" />} />
      </InputField>
      <InputField {...args} variant="unstyled">
        <InputFieldLabel>Unstyled Variant</InputFieldLabel>
        <InputFieldInput placeholder="Unstyled style" startContent={<Mail className="h-4 w-4" />} />
      </InputField>
      <InputField {...args} variant="shadow">
        <InputFieldLabel>Shadow Variant</InputFieldLabel>
        <InputFieldInput placeholder="Shadow style" startContent={<Mail className="h-4 w-4" />} />
      </InputField>
    </div>
  ),
};

export const Sizes: Story = {
  render: (args) => (
    <div className="flex w-80 flex-col gap-6">
      <InputField {...args} size="sm">
        <InputFieldLabel>Small Size</InputFieldLabel>
        <InputFieldInput
          placeholder="Small input"
          startContent={<Search className="h-3.5 w-3.5" />}
        />
      </InputField>
      <InputField {...args} size="md">
        <InputFieldLabel>Medium Size</InputFieldLabel>
        <InputFieldInput placeholder="Medium input" startContent={<Search className="h-4 w-4" />} />
      </InputField>
      <InputField {...args} size="lg">
        <InputFieldLabel>Large Size</InputFieldLabel>
        <InputFieldInput placeholder="Large input" startContent={<Search className="h-5 w-5" />} />
      </InputField>
    </div>
  ),
};

export const States: Story = {
  render: (args) => (
    <div className="flex w-80 flex-col gap-6">
      <InputField {...args} labelVariant="inside-floating">
        <InputFieldLabel>Inside Floating (Unfocused)</InputFieldLabel>
        <InputFieldInput startContent={<Mail className="h-4 w-4" />} />
      </InputField>

      <InputField {...args} labelVariant="inside-floating">
        <InputFieldLabel>Inside Floating (Filled)</InputFieldLabel>
        <InputFieldInput
          defaultValue="john@example.com"
          startContent={<Mail className="h-4 w-4" />}
        />
      </InputField>

      <InputField {...args} labelVariant="floating">
        <InputFieldLabel>Border Floating (Filled)</InputFieldLabel>
        <InputFieldInput
          defaultValue="john@example.com"
          startContent={<Mail className="h-4 w-4" />}
        />
      </InputField>

      <InputField {...args} isDisabled labelVariant="floating">
        <InputFieldLabel>Disabled</InputFieldLabel>
        <InputFieldInput
          defaultValue="disabled@example.com"
          startContent={<Lock className="h-4 w-4" />}
        />
      </InputField>

      <InputField {...args} isReadOnly labelVariant="floating">
        <InputFieldLabel>Read-only</InputFieldLabel>
        <InputFieldInput startContent={<Lock className="h-4 w-4" />} value="readonly@example.com" />
      </InputField>
    </div>
  ),
};

export const Adornments: Story = {
  render: (args) => (
    <div className="flex w-80 flex-col gap-6">
      <InputField {...args} labelVariant="inside-fixed">
        <InputFieldLabel>Price</InputFieldLabel>
        <InputFieldInput
          endContent={<span className="text-content-tertiary font-mono text-xs">USD</span>}
          placeholder="0.00"
          startContent={<DollarSign className="h-4 w-4" />}
        />
      </InputField>

      <InputField {...args} labelVariant="floating">
        <InputFieldLabel>Search Query</InputFieldLabel>
        <InputFieldInput
          endContent={<Command className="h-4 w-4" />}
          placeholder="Search..."
          startContent={<Search className="h-4 w-4" />}
        />
      </InputField>

      <InputField {...args} labelVariant="inside-floating">
        <InputFieldLabel>User Profile</InputFieldLabel>
        <InputFieldInput
          endContent={<AtSign className="h-4 w-4" />}
          placeholder="john_doe"
          startContent={<User className="h-4 w-4" />}
        />
      </InputField>
    </div>
  ),
};

export const Validation: Story = {
  render: (args) => (
    <div className="flex w-80 flex-col gap-6">
      <InputField {...args} isInvalid labelVariant="floating">
        <InputFieldLabel>Username</InputFieldLabel>
        <InputFieldInput defaultValue="invalid_user" startContent={<User className="h-4 w-4" />} />
        <InputFieldDescription>Must be unique.</InputFieldDescription>
        <InputFieldError>Username is already taken.</InputFieldError>
      </InputField>

      <InputField {...args} isInvalid labelVariant="inside-fixed">
        <InputFieldLabel>Email</InputFieldLabel>
        <InputFieldInput defaultValue="invalid-email" startContent={<Mail className="h-4 w-4" />} />
        <InputFieldError>Please enter a valid email address.</InputFieldError>
      </InputField>
    </div>
  ),
};

export const Customization: Story = {
  render: (args) => (
    <div className="flex w-[500px] flex-col gap-8">
      <div>
        <h3 className="text-content-secondary mb-3 text-sm font-semibold">
          Custom Widths (Full Width & Compact)
        </h3>
        <div className="flex flex-col gap-4">
          <InputField {...args} className="w-full">
            <InputFieldLabel>Full Width Input (w-full)</InputFieldLabel>
            <InputFieldInput
              placeholder="Spans full container width..."
              startContent={<Search className="h-4 w-4" />}
            />
            <InputFieldDescription>Input expanding to fit parent width.</InputFieldDescription>
          </InputField>

          <InputField {...args} className="w-64">
            <InputFieldLabel>Compact Fixed Width (w-64)</InputFieldLabel>
            <InputFieldInput placeholder="Fixed compact width" />
          </InputField>
        </div>
      </div>

      <div>
        <h3 className="text-content-secondary mb-3 text-sm font-semibold">
          Custom Colors & Styling
        </h3>
        <div className="flex flex-col gap-4">
          <InputField {...args} labelVariant="floating">
            <InputFieldLabel className="text-primary">Primary Brand Accent</InputFieldLabel>
            <InputFieldInput
              className="text-primary font-medium"
              placeholder="Custom brand accent colors"
              startContent={<Mail className="text-primary h-4 w-4" />}
            />
            <InputFieldDescription>
              Custom label, content, and adornment color overrides.
            </InputFieldDescription>
          </InputField>

          <InputField {...args} labelVariant="inside-floating">
            <InputFieldLabel className="text-secondary font-semibold">
              Secondary Style Accent
            </InputFieldLabel>
            <InputFieldInput
              className="text-secondary font-medium"
              placeholder="Secondary token theme"
              startContent={<User className="text-secondary h-4 w-4" />}
            />
          </InputField>
        </div>
      </div>

      <div>
        <h3 className="text-content-secondary mb-3 text-sm font-semibold">
          Custom Height & Size Variations
        </h3>
        <div className="flex flex-col gap-4">
          <InputField {...args} labelVariant="inside-floating" size="sm">
            <InputFieldLabel>Small Size (h-8 / 32px)</InputFieldLabel>
            <InputFieldInput
              placeholder="Small size height"
              startContent={<Search className="h-3.5 w-3.5" />}
            />
          </InputField>

          <InputField {...args} labelVariant="floating" size="md">
            <InputFieldLabel>Medium Size (h-10 / 40px)</InputFieldLabel>
            <InputFieldInput
              placeholder="Medium size height"
              startContent={<Mail className="h-4 w-4" />}
            />
          </InputField>

          <InputField {...args} labelVariant="floating" size="lg">
            <InputFieldLabel>Large Size (h-12 / 48px)</InputFieldLabel>
            <InputFieldInput
              placeholder="Large size height"
              startContent={<Lock className="h-5 w-5" />}
            />
          </InputField>

          <InputField {...args} labelVariant="floating">
            <InputFieldLabel>Custom Tall Height (h-14 / 56px)</InputFieldLabel>
            <InputFieldInput
              className="h-14"
              placeholder="Custom wrapper height h-14"
              startContent={<Search className="h-5 w-5" />}
            />
            <InputFieldDescription>
              Custom wrapper height override via InputFieldInput className="h-14".
            </InputFieldDescription>
          </InputField>
        </div>
      </div>
    </div>
  ),
};

export const SingleComponentShorthand: Story = {
  render: (args) => (
    <div className="flex w-80 flex-col gap-6">
      <InputField
        {...args}
        description="Single component shorthand usage via props."
        label="Email Address"
        placeholder="you@example.com"
        startContent={<Mail className="h-4 w-4" />}
      />

      <InputField
        {...args}
        label="Floating Shorthand"
        labelVariant="floating"
        placeholder="Floating label via props"
        startContent={<Search className="h-4 w-4" />}
      />

      <InputField
        {...args}
        isInvalid
        errorMessage="Invalid username provided."
        label="Username"
        placeholder="john_doe"
        startContent={<User className="h-4 w-4" />}
      />
    </div>
  ),
};

export const InputFilter: Story = {
  render: (args) => (
    <div className="flex w-80 flex-col gap-6">
      <InputField
        {...args}
        description="Only digits (0-9) allowed."
        inputFilter="numeric"
        label="Numeric Filter"
        placeholder="123456"
      />

      <InputField
        {...args}
        description="Digits and single decimal point allowed (0-9, .)."
        inputFilter="decimal"
        label="Decimal Filter"
        placeholder="99.99"
      />

      <InputField
        {...args}
        description="Only alphabetic letters allowed (A-Z, a-z)."
        inputFilter="alpha"
        label="Alpha Filter"
        placeholder="Hariharan"
      />

      <InputField
        {...args}
        description="Only alphanumeric characters allowed."
        inputFilter="alphanumeric"
        label="Alphanumeric Filter"
        placeholder="Hari123"
      />
    </div>
  ),
};

export const Playground: Story = {
  render: (args) => (
    <div className="w-80">
      <InputField {...args}>
        <InputFieldLabel>Playground Label</InputFieldLabel>
        <InputFieldInput placeholder="Type here..." startContent={<Mail className="h-4 w-4" />} />
        <InputFieldDescription>Interactive playground demo.</InputFieldDescription>
        <InputFieldError>Something went wrong.</InputFieldError>
      </InputField>
    </div>
  ),
  args: {
    labelVariant: 'default',
    variant: 'outline',
    size: 'md',
    isDisabled: false,
    isReadOnly: false,
    isRequired: false,
    isInvalid: false,
  },
};
