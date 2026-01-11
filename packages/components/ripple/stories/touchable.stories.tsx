import type {Meta, StoryObj} from "@storybook/react";
import {Touchable} from "../src";

const meta: Meta<typeof Touchable> = {
  title: "Components/Touchable",
  component: Touchable,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export default meta;

type Story = StoryObj<typeof Touchable>;

export const Default: Story = {
  args: {
    children: "Click Me",
    className: "bg-primary-500 text-white px-6 py-3 rounded-md",
  },
};

export const CustomColor: Story = {
  args: {
    children: "Custom Ripple Color",
    rippleColor: "rgba(255, 255, 255, 0.5)",
    className: "bg-primary-500 text-white px-6 py-3 rounded-md",
  },
};

export const AsDiv: Story = {
  args: {
    as: "div",
    children: "I am a Div",
    className: "bg-primary-500 text-white px-6 py-3 rounded-md cursor-pointer select-none",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
    className: "bg-gray-400 text-white px-6 py-3 rounded-md",
  },
};
