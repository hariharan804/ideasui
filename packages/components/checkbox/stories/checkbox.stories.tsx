import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CheckboxProps } from '../src';
import type { JSX } from 'react';

import { useState } from 'react';

import {
  Checkbox,
  CheckboxGroup,
  CheckboxGroupLabel,
  CheckboxGroupDescription,
  CheckboxGroupError,
} from '../src';

const meta: Meta<typeof Checkbox> = {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['solid', 'outline', 'subtle', 'ghost', 'soft'],
      description: 'Visual style variant of the checkbox indicator.',
    },
    color: {
      control: 'select',
      options: ['primary', 'neutral', 'success', 'warning', 'danger'],
      description: 'Color applied to the checked state.',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size scale of the checkbox.',
    },
    radius: {
      control: 'select',
      options: ['none', 'sm', 'md', 'lg', 'full'],
      description: 'Border radius corner shape of the indicator.',
    },
    isDisabled: {
      control: 'boolean',
      description: 'Whether the checkbox is disabled.',
    },
    isInvalid: {
      control: 'boolean',
      description: 'Whether the checkbox is in an invalid state.',
    },
    isIndeterminate: {
      control: 'boolean',
      description: 'Whether the checkbox is in an indeterminate state.',
    },
    defaultSelected: {
      control: 'boolean',
      description: 'Default selected state for uncontrolled usage.',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Checkbox>;

// ── Standalone ──────────────────────────────────────────────────
export const Default: Story = {
  render: () => (
    <div className="p-3">
      <Checkbox defaultSelected>Accept terms and conditions</Checkbox>
    </div>
  ),
};

// ── All Variants ────────────────────────────────────────────────
export const Variants: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['solid', 'outline', 'subtle', 'ghost', 'soft'] as const).map((variant) => (
        <Checkbox key={variant} defaultSelected variant={variant}>
          {variant.charAt(0).toUpperCase() + variant.slice(1)}
        </Checkbox>
      ))}
    </div>
  ),
};

// ── All Colors ───────────────────────────────────────────
export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['primary', 'neutral', 'success', 'warning', 'danger'] as const).map((color) => (
        <Checkbox key={color} defaultSelected color={color}>
          {color.charAt(0).toUpperCase() + color.slice(1)}
        </Checkbox>
      ))}
    </div>
  ),
};

// ── All Sizes ───────────────────────────────────────────────────
export const Sizes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['sm', 'md', 'lg'] as const).map((size) => (
        <Checkbox key={size} defaultSelected size={size}>
          Size {size}
        </Checkbox>
      ))}
    </div>
  ),
};

function getRadiusLabel(radius: string): string {
  if (radius === 'none') {
    return 'Square (none)';
  }
  if (radius === 'full') {
    return 'Circular (full)';
  }

  return `Radius ${radius}`;
}

// ── Radius Shapes ───────────────────────────────────────────────
export const RadiusShapes: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['none', 'sm', 'md', 'lg', 'full'] as const).map((radius) => (
        <Checkbox key={radius} defaultSelected radius={radius}>
          {getRadiusLabel(radius)}
        </Checkbox>
      ))}
    </div>
  ),
};

// ── States ──────────────────────────────────────────────────────
export const States: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox>Unchecked</Checkbox>
      <Checkbox defaultSelected>Checked</Checkbox>
      <Checkbox isIndeterminate isSelected>
        Indeterminate
      </Checkbox>
      <Checkbox isDisabled>Disabled unchecked</Checkbox>
      <Checkbox defaultSelected isDisabled>
        Disabled checked
      </Checkbox>
      <Checkbox isInvalid>Invalid</Checkbox>
      <Checkbox defaultSelected isReadOnly>
        Read-only
      </Checkbox>
    </div>
  ),
};

const IndeterminateSelectAllDemo = (): JSX.Element => {
  const options = ['Email', 'SMS', 'Push'];
  const [selected, setSelected] = useState<string[]>([]);
  const allSelected = selected.length === options.length;
  const someSelected = selected.length > 0 && !allSelected;

  const toggleAll = (checked: boolean): void => {
    setSelected(checked ? [...options] : []);
  };

  const toggleOne = (val: string, checked: boolean): void => {
    setSelected((previous) => (checked ? [...previous, val] : previous.filter((v) => v !== val)));
  };

  return (
    <div className="flex flex-col gap-2">
      <Checkbox isIndeterminate={someSelected} isSelected={allSelected} onChange={toggleAll}>
        Select all
      </Checkbox>
      {options.map((opt) => (
        <Checkbox
          key={opt}
          className="ml-6"
          isSelected={selected.includes(opt)}
          value={opt}
          onChange={(checked) => toggleOne(opt, checked)}
        >
          {opt}
        </Checkbox>
      ))}
    </div>
  );
};

// ── Indeterminate (select-all pattern) ──────────────────────────
export const IndeterminateSelectAll: Story = {
  render: () => <IndeterminateSelectAllDemo />,
};

// ── Group ───────────────────────────────────────────────────────
export const Group: Story = {
  render: () => (
    <CheckboxGroup defaultValue={['email']}>
      <CheckboxGroupLabel>Notification channels</CheckboxGroupLabel>
      <Checkbox value="email">Email</Checkbox>
      <Checkbox value="sms">SMS</Checkbox>
      <Checkbox value="push">Push notifications</Checkbox>
      <CheckboxGroupDescription>Choose at least one channel.</CheckboxGroupDescription>
      <CheckboxGroupError>Please select at least one option.</CheckboxGroupError>
    </CheckboxGroup>
  ),
};

// ── Group Horizontal ────────────────────────────────────────────
export const GroupHorizontal: Story = {
  render: () => (
    <CheckboxGroup defaultValue={['read']} orientation="horizontal">
      <CheckboxGroupLabel>Permissions</CheckboxGroupLabel>
      <Checkbox value="read">Read</Checkbox>
      <Checkbox value="write">Write</Checkbox>
      <Checkbox value="delete">Delete</Checkbox>
    </CheckboxGroup>
  ),
};

// ── Group Invalid ───────────────────────────────────────────────
export const GroupInvalid: Story = {
  render: () => (
    <CheckboxGroup isInvalid>
      <CheckboxGroupLabel>Required options</CheckboxGroupLabel>
      <Checkbox value="a">Option A</Checkbox>
      <Checkbox value="b">Option B</Checkbox>
      <CheckboxGroupError>You must select at least one option.</CheckboxGroupError>
    </CheckboxGroup>
  ),
};

// ── Group Disabled ──────────────────────────────────────────────
export const GroupDisabled: Story = {
  render: () => (
    <CheckboxGroup isDisabled defaultValue={['a']}>
      <CheckboxGroupLabel>Archived settings</CheckboxGroupLabel>
      <Checkbox value="a">Option A</Checkbox>
      <Checkbox value="b">Option B</Checkbox>
    </CheckboxGroup>
  ),
};

// ── Custom Icons ────────────────────────────────────────────────
export const CustomIcons: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      <Checkbox
        defaultSelected
        checkedIcon={
          <svg className="size-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
          </svg>
        }
      >
        Custom check SVG
      </Checkbox>
      <Checkbox
        uncheckedIcon={
          <svg className="size-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              d="M6 18L18 6M6 6l12 12"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
            />
          </svg>
        }
      >
        Custom uncheck icon
      </Checkbox>
      <Checkbox
        isIndeterminate
        indeterminateIcon={
          <svg className="size-full" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M20 12H4" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} />
          </svg>
        }
      >
        Custom indeterminate icon
      </Checkbox>
    </div>
  ),
};

// ── Playground ──────────────────────────────────────────────────
export const Playground: Story = {
  args: {
    variant: 'solid',
    color: 'primary',
    size: 'md',
    isDisabled: false,
    isInvalid: false,
    isIndeterminate: false,
    defaultSelected: false,
    children: 'Checkbox label',
  },
  render: (args: CheckboxProps) => <Checkbox {...args} />,
};
