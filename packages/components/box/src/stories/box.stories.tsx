import type {Meta, StoryObj} from "@storybook/react";

import {Box} from "../index";

const meta: Meta<typeof Box> = {
  title: "Components/Box",
  component: Box,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    as: {
      control: {type: "select"},
      options: ["div", "section", "article", "main", "aside", "header", "footer"],
    },
    display: {
      control: {type: "select"},
      options: [
        "block",
        "inline",
        "inline-block",
        "flex",
        "inline-flex",
        "grid",
        "inline-grid",
        "hidden",
      ],
    },
    p: {
      control: {type: "select"},
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12],
    },
    m: {
      control: {type: "select"},
      options: [0, 1, 2, 3, 4, 5, 6, 8, 10, 12, "auto"],
    },
    bg: {
      control: {type: "select"},
      options: [
        "transparent",
        "white",
        "black",
        "gray",
        "primary",
        "secondary",
        "success",
        "warning",
        "danger",
      ],
    },
    rounded: {
      control: {type: "select"},
      options: ["none", "sm", "md", "lg", "xl", "2xl", "3xl", "full"],
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: "Default Box",
  },
};

export const WithPadding: Story = {
  args: {
    p: 4,
    bg: "gray",
    children: "Box with padding",
  },
};

export const WithBorder: Story = {
  args: {
    p: 4,
    border: 1,
    borderColor: "primary",
    rounded: "md",
    children: "Box with border",
  },
};

export const AsSection: Story = {
  args: {
    as: "section",
    p: 6,
    bg: "primary",
    rounded: "lg",
    children: "Box rendered as section",
  },
};

export const FlexContainer: Story = {
  args: {
    display: "flex",
    p: 4,
    bg: "gray",
    rounded: "md",
    children: (
      <>
        <Box bg="primary" mx={1} p={2} rounded="sm">
          Item 1
        </Box>
        <Box bg="secondary" mx={1} p={2} rounded="sm">
          Item 2
        </Box>
        <Box bg="success" mx={1} p={2} rounded="sm">
          Item 3
        </Box>
      </>
    ),
  },
};

export const Card: Story = {
  args: {
    p: 6,
    bg: "white",
    border: 1,
    borderColor: "gray",
    rounded: "lg",
    shadow: "md",
    children: (
      <div>
        <h3 className="mb-2 text-lg font-semibold">Card Title</h3>
        <p className="text-gray-600">This is a card-like box with shadow and border.</p>
      </div>
    ),
  },
};
