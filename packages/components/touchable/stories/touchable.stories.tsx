import type {Meta, StoryObj} from "@storybook/react";

import {Touchable} from "../src";

const meta: Meta<typeof Touchable> = {
  title: "Components/Touchable",
  component: Touchable,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: "select",
      options: ["button", "div", "a", "span"],
      description: "The HTML element to render as",
    },
    disabled: {
      control: "boolean",
      description: "Disable ripple & interactions",
    },
    rippleColor: {
      control: "color",
      description: "Custom ripple color",
    },
  },
};

export default meta;

type Story = StoryObj<typeof Touchable>;

export const Default: Story = {
  render: (args) => (
    <Touchable
      className="cursor-pointer rounded-md bg-blue-600 px-6 py-3 text-white select-none"
      {...args}
    >
      Click Me
    </Touchable>
  ),
};

export const AsDiv: Story = {
  args: {
    as: "div",
  },
  render: (args) => (
    <Touchable className="cursor-pointer rounded-lg bg-green-600 px-10 py-5 text-white" {...args}>
      Touchable Div
    </Touchable>
  ),
};

export const AsLink: Story = {
  args: {
    as: "a",
  },
  render: (args) => (
    <Touchable
      className="inline-block cursor-pointer rounded-md bg-purple-600 px-6 py-3 text-white"
      href="#"
      {...args}
    >
      Touchable Link
    </Touchable>
  ),
};

export const CustomRippleColor: Story = {
  args: {
    rippleColor: "rgba(255, 255, 255, 0.6)",
  },
  render: (args) => (
    <Touchable className="cursor-pointer rounded-md bg-purple-600 px-6 py-3 text-white" {...args}>
      Custom Ripple Color
    </Touchable>
  ),
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => (
    <Touchable className="cursor-pointer rounded-md bg-blue-600 px-6 py-3 text-white" {...args}>
      Disabled
    </Touchable>
  ),
};

export const Card: Story = {
  args: {
    as: "div",
  },
  render: (args) => (
    <Touchable className="cursor-pointer rounded-xl bg-white p-6 shadow-lg" {...args}>
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-semibold text-gray-900">Touchable Card</h3>
        <p className="text-gray-600">Click anywhere on this card to see the ripple effect.</p>
      </div>
    </Touchable>
  ),
};

export const ListItem: Story = {
  args: {
    as: "div",
  },
  render: (args) => (
    <div className="w-64 rounded-lg border border-gray-200 bg-white">
      {["Item 1", "Item 2", "Item 3"].map((item) => (
        <Touchable
          key={item}
          className="w-full cursor-pointer border-b border-gray-100 px-4 py-3 text-left last:border-b-0 hover:bg-gray-50"
          {...args}
        >
          {item}
        </Touchable>
      ))}
    </div>
  ),
};

export const IconButton: Story = {
  render: (args) => (
    <Touchable
      className="flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-blue-600 text-white"
      {...args}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M5 12h14" />
        <path d="M12 5v14" />
      </svg>
    </Touchable>
  ),
};
