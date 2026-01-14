import type { Meta, StoryObj } from '@storybook/react';
import type { JSX, ComponentProps, ReactNode } from 'react';

import { useRef } from 'react';
import { useButton } from 'react-aria';

import { Ripple, useRipple } from '../src';

const meta: Meta<typeof Ripple> = {
  title: 'Components/Ripple',
  component: Ripple,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;

type Story = StoryObj<typeof Ripple>;

type CustomRippleProps = ComponentProps<typeof Ripple> & {
  children: ReactNode;
  className?: string;
};

const CustomRipple = ({ children, className, ...args }: CustomRippleProps): JSX.Element => {
  const domRef = useRef<HTMLButtonElement>(null);
  const { ripples, onClear, onPress } = useRipple();
  const { buttonProps } = useButton({ ...args, onPress }, domRef);

  return (
    <button className={className} {...buttonProps}>
      {children}
      <Ripple {...args} ripples={ripples} onClear={onClear} />
    </button>
  );
};

export const Default: Story = {
  render: (args) => (
    <CustomRipple
      className="relative cursor-pointer overflow-hidden rounded-md bg-blue-600 px-6 py-3 text-white select-none"
      {...args}
    >
      Click Me
    </CustomRipple>
  ),
};

export const Large: Story = {
  render: (args) => {
    return (
      <CustomRipple
        className="relative cursor-pointer overflow-hidden rounded-lg bg-green-600 px-10 py-5 text-white"
        {...args}
      >
        Large Button
      </CustomRipple>
    );
  },
};

export const CustomColor: Story = {
  args: {
    color: 'rgba(255,255,255,0.6)',
  },
  render: (args) => {
    return (
      <CustomRipple
        className="relative cursor-pointer overflow-hidden rounded-md bg-purple-600 px-6 py-3 text-white"
        {...args}
      >
        Custom Ripple
      </CustomRipple>
    );
  },
};

const DomEventsContent = (args: ComponentProps<typeof Ripple>): JSX.Element => {
  const { ripples, onClear, onPress } = useRipple();

  return (
    <button
      className="relative cursor-pointer overflow-hidden rounded-lg bg-orange-600 px-8 py-4 text-white"
      onClick={onPress}
      {...args}
    >
      DOM Click Event
      <Ripple ripples={ripples} onClear={onClear} />
    </button>
  );
};

export const DOMEvents: Story = {
  render: (args) => <DomEventsContent {...args} />,
};

const MouseDownContent = (args: ComponentProps<typeof Ripple>): JSX.Element => {
  const { ripples, onClear, onPress } = useRipple();

  return (
    <button
      className="relative cursor-pointer overflow-hidden rounded-lg bg-red-600 px-8 py-4 text-white"
      onMouseDown={onPress}
      {...args}
    >
      Mouse Down Event
      <Ripple ripples={ripples} onClear={onClear} />
    </button>
  );
};

export const MouseDown: Story = {
  render: (args) => <MouseDownContent {...args} />,
};
