import type {Meta, StoryObj} from "@storybook/react";
import {useButton} from "react-aria";

import {Ripple, useRipple, Touchable} from "../src";
import {useRef} from "react";
import {useTouchableRipple} from "../src/use-touchable-ripple";
import {TouchableRipple} from "../src/touchable-ripple";

const meta: Meta<typeof Ripple> = {
  title: "Components/Ripple",
  component: Ripple,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Ripple>;

const CustomRipple = ({children, className, ...args}: any) => {
  const domRef = useRef<HTMLButtonElement>(null);
  const {ripples, onClear, onPress} = useRipple();
  const {buttonProps} = useButton({...args, onPress}, domRef);

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
    color: "rgba(255,255,255,0.6)",
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

export const PointerDown: Story = {
  render: (args) => {
    const {ripples, onClear, onPress} = useRipple();
    return (
      <button
        className="relative cursor-pointer overflow-hidden rounded-lg bg-green-600 px-10 py-5 text-white"
        onPointerDown={onPress}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onPress(e as any);
          }
        }}
        {...args}
      >
        Large Button
        <Ripple ripples={ripples} onClear={onClear} />
      </button>
    );
  },
};

export const TouchableButton: Story = {
  render: (args) => {
    const {ripples, onClick, onClear} = useTouchableRipple();

    return (
      <button
        {...args}
        className="relative overflow-hidden rounded bg-blue-600 px-6 py-3 text-white"
        onPointerDown={onClick}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            onClick(e);
          }
        }}
      >
        Touchable Ripple
        <TouchableRipple ripples={ripples} onClear={onClear} />
      </button>
    );
  },
};
export const TouchableRippleCard: Story = {
  render: (args) => {
    return (
      <Touchable {...args} as="a" href="#" target="_blank" className="inline-block">
        <div className="bg-primary flex h-50 w-92 items-center justify-center rounded-md text-white">
          Touchable
        </div>
      </Touchable>
    );
  },
};
