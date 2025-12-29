import type {Meta} from "@storybook/react";

import {Heart, Download, File} from "lucide-react";
import {Button, ButtonProps} from "../src";
import {buttonVariants} from "@ideasui/variants/button";
import {useState} from "react";
const meta = {
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
} as Meta<typeof Button>;

export default meta;
const defaultProps = {
  ...buttonVariants?.defaultVariants,
  children: "Button",
};
export const Default = {
  args: {
    ...defaultProps,
  },
};

export const WithIcons = {
  args: {
    ...defaultProps,
    startContent: <File className="h-4 w-4" />,
    endContent: <Download className="h-4 w-4" />,
  },
};

export const Loading = {
  args: {
    ...defaultProps,
    loading: true,
  },
};

const StateControlled = (args: ButtonProps) => {
  const [pressedCount, setPressedCount] = useState(0);

  const handlePress = (e: any) => {
    // eslint-disable-next-line no-console
    console.log("Pressed", e);
    setPressedCount((prev) => prev + 1);
  };
  const label = pressedCount ? "Pressed " + pressedCount : "Press";
  return (
    <div className="flex gap-2">
      <Button {...args} aria-label={label} aria-pressed={pressedCount > 0} onClick={handlePress}>
        {label}
      </Button>
      <Button variant="outline" disabled={pressedCount === 0} onClick={() => setPressedCount(0)}>
        Reset
      </Button>
    </div>
  );
};

export const WithState = {
  render: StateControlled,
  args: {
    ...defaultProps,
  },
};

export const Radius = {
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

export const FullWidth = {
  render: () => (
    <div className="w-full">
      <div className="min-w-vw" />
      <Button fullWidth>Full Width Button</Button>
    </div>
  ),
};

export const Variants = {
  render: () => (
    <div className="flex gap-4">
      <Button variant="solid">Solid</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>
    </div>
  ),
};

export const Colors = {
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

export const Sizes = {
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

export const IconButton = {
  args: {
    ...defaultProps,
    radius: "full",
    isIconOnly: true,
    color: "danger",
    children: <Heart className="h-5 w-5" />,
  },
};

export const CustomWithClassNames = {
  args: {
    ...defaultProps,
    radius: "full",
    className: "bg-gradient-to-tr from-primary-500 to-primary-200 text-white shadow-lg",
  },
};
