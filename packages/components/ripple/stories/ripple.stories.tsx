import type {Meta, StoryObj} from "@storybook/react";

import {Ripple, useRipple} from "../src";

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

export const Default: Story = {
  render: (args) => {
    const {ripples, onClear, onPress} = useRipple();

    return (
      <div
        onClick={onPress}
        className="relative cursor-pointer overflow-hidden rounded-md bg-blue-600 px-6 py-3 text-white select-none"
      >
        Click me
        <Ripple {...args} ripples={ripples} onClear={onClear} />
      </div>
    );
  },
};

export const Large: Story = {
  render: (args) => {
    const {ripples, onPress, onClear} = useRipple();

    return (
      <div
        onClick={onPress}
        className="relative cursor-pointer overflow-hidden rounded-lg bg-green-600 px-10 py-5 text-white"
      >
        Large Button
        <Ripple {...args} ripples={ripples} onClear={onClear} />
      </div>
    );
  },
};

export const CustomColor: Story = {
  args: {
    color: "rgba(255,255,255,0.6)",
  },
  render: (args) => {
    const {ripples, onPress, onClear} = useRipple();

    return (
      <div
        onClick={onPress}
        className="relative cursor-pointer overflow-hidden rounded-md bg-purple-600 px-6 py-3 text-white"
      >
        Custom Ripple
        <Ripple {...args} ripples={ripples} onClear={onClear} />
      </div>
    );
  },
};
