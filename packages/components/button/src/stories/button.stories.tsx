import type {Meta, StoryObj} from "@storybook/react";

import {Heart, Download, ArrowRight} from "lucide-react";

import {Button} from "../button";

const meta: Meta<typeof Button> = {
  title: "Components/Button",
  component: Button,
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: "A versatile button component with multiple variants, sizes, and states.",
      },
    },
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: {type: "select"},
      options: ["solid", "outline", "ghost"],
      description: "Visual style variant",
    },
    color: {
      control: {type: "select"},
      options: ["default", "primary", "secondary", "success", "warning", "danger", "info"],
      description: "Color variant based on semantic intent",
    },
    size: {
      control: {type: "select"},
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Size of the button",
    },
    radius: {
      control: {type: "select"},
      options: ["none", "sm", "md", "lg", "xl", "full"],
      description: "Border radius variant",
    },
    loading: {
      control: {type: "boolean"},
      description: "Loading state",
    },
    disabled: {
      control: {type: "boolean"},
      description: "Disabled state",
    },
    fullWidth: {
      control: {type: "boolean"},
      description: "Full width button",
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Button",
  },
};

export const Variants: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button variant="solid">Solid</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
};

export const Colors: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      <Button color="default">Default</Button>
      <Button color="primary">Primary</Button>
      <Button color="secondary">Secondary</Button>
      <Button color="success">Success</Button>
      <Button color="warning">Warning</Button>
      <Button color="danger">Danger</Button>
      <Button color="info">Info</Button>
    </div>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Button size="xs">Extra Small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra Large</Button>
    </div>
  ),
};

export const WithIcons: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button startContent={<Heart className="h-4 w-4" />}>Like</Button>
      <Button endContent={<Download className="h-4 w-4" />}>Download</Button>
      <Button
        endContent={<ArrowRight className="h-4 w-4" />}
        startContent={<Heart className="h-4 w-4" />}
      >
        Like & Share
      </Button>
    </div>
  ),
};

export const Loading: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button loading>Loading</Button>
      <Button loading loadingText="Saving...">
        Save
      </Button>
      <Button loading variant="outline">
        Loading Outline
      </Button>
    </div>
  ),
};

export const States: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button>Normal</Button>
      <Button disabled>Disabled</Button>
      <Button loading>Loading</Button>
    </div>
  ),
};

export const Radius: Story = {
  render: () => (
    <div className="flex gap-4">
      <Button radius="none">None</Button>
      <Button radius="sm">Small</Button>
      <Button radius="md">Medium</Button>
      <Button radius="lg">Large</Button>
      <Button radius="xl">Extra Large</Button>
      <Button radius="full">Full</Button>
    </div>
  ),
};

export const FullWidth: Story = {
  render: () => (
    <div className="w-96">
      <Button fullWidth>Full Width Button</Button>
    </div>
  ),
};

export const Playground: Story = {
  args: {
    children: "Playground Button",
    variant: "solid",
    color: "primary",
    size: "md",
    radius: "md",
  },
};
