import type {Meta, StoryObj} from "@storybook/react";

import {Ripple} from "../ripple";

const meta: Meta<typeof Ripple> = {
  title: "Components/Ripple",
  component: Ripple,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["solid", "outline", "ghost"],
    },
    color: {
      control: "select",
      options: ["default", "primary", "secondary", "success", "warning", "danger"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    radius: {
      control: "select",
      options: ["none", "sm", "md", "lg", "xl", "full"],
    },
    disabled: {
      control: "boolean",
    },

    rippleColor: {
      control: "color",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Click me",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Ripple variant="solid">Solid</Ripple>
      <Ripple variant="outline">Outline</Ripple>
      <Ripple variant="ghost">Ghost</Ripple>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Ripple color="default">Default</Ripple>
      <Ripple color="primary">Primary</Ripple>
      <Ripple color="secondary">Secondary</Ripple>
      <Ripple color="success">Success</Ripple>
      <Ripple color="warning">Warning</Ripple>
      <Ripple color="danger">Danger</Ripple>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Ripple size="xs">XS</Ripple>
      <Ripple size="sm">SM</Ripple>
      <Ripple size="md">MD</Ripple>
      <Ripple size="lg">LG</Ripple>
      <Ripple size="xl">XL</Ripple>
    </div>
  ),
};

export const Radius: Story = {
  render: () => (
    <div className="flex gap-4">
      <Ripple radius="none">None</Ripple>
      <Ripple radius="sm">Small</Ripple>
      <Ripple radius="md">Medium</Ripple>
      <Ripple radius="lg">Large</Ripple>
      <Ripple radius="xl">XL</Ripple>
      <Ripple radius="full">Full</Ripple>
    </div>
  ),
};

export const CustomRippleColor: Story = {
  args: {
    children: "Custom Ripple",
    rippleColor: "#ff6b6b",
    variant: "outline",
  },
};

export const Disabled: Story = {
  args: {
    children: "Disabled",
    disabled: true,
  },
};

export const Interactive: Story = {
  render: () => (
    <div className="grid grid-cols-3 gap-4">
      <Ripple color="primary" variant="solid" onClick={() => alert("Primary clicked!")}>
        Primary Action
      </Ripple>
      <Ripple color="secondary" variant="outline" onClick={() => alert("Secondary clicked!")}>
        Secondary Action
      </Ripple>
      <Ripple color="success" variant="ghost" onClick={() => alert("Success clicked!")}>
        Success Action
      </Ripple>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-4">
      <Ripple className="gap-2">
        <span>❤️</span>
        Like
      </Ripple>
      <Ripple className="gap-2" variant="outline">
        <span>📤</span>
        Share
      </Ripple>
      <Ripple className="gap-2" variant="ghost">
        <span>💬</span>
        Comment
      </Ripple>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    children: "Playground",
    variant: "solid",
    color: "primary",
    size: "md",
    radius: "md",
    disabled: false,
  },
};
