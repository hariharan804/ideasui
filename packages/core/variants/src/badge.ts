import {tv} from "tailwind-variants";

/**
 * Badge variants for status indicators
 */
export const badgeVariants = tv({
  base: ["inline-flex items-center", "font-medium text-xs", "px-2 py-1", "rounded-full"],
  variants: {
    variant: {
      solid: "",
      outline: "border bg-transparent",
      soft: "",
    },
    color: {
      primary: "",
      secondary: "",
      success: "",
      warning: "",
      danger: "",
      info: "",
    },
    size: {
      sm: "px-1.5 py-0.5 text-xs",
      md: "px-2 py-1 text-xs",
      lg: "px-2.5 py-1 text-sm",
    },
  },
  compoundVariants: [
    // Primary variants
    {
      variant: "solid",
      color: "primary",
      class: "bg-blue-600 text-white",
    },
    {
      variant: "outline",
      color: "primary",
      class: "border-blue-600 text-blue-600",
    },
    {
      variant: "soft",
      color: "primary",
      class: "bg-blue-50 text-blue-700",
    },
    // Secondary variants
    {
      variant: "solid",
      color: "secondary",
      class: "bg-gray-600 text-white",
    },
    {
      variant: "outline",
      color: "secondary",
      class: "border-gray-600 text-gray-600",
    },
    {
      variant: "soft",
      color: "secondary",
      class: "bg-gray-50 text-gray-700",
    },
    // Success variants
    {
      variant: "solid",
      color: "success",
      class: "bg-green-600 text-white",
    },
    {
      variant: "outline",
      color: "success",
      class: "border-green-600 text-green-600",
    },
    {
      variant: "soft",
      color: "success",
      class: "bg-green-50 text-green-700",
    },
    // Warning variants
    {
      variant: "solid",
      color: "warning",
      class: "bg-yellow-600 text-white",
    },
    {
      variant: "outline",
      color: "warning",
      class: "border-yellow-600 text-yellow-600",
    },
    {
      variant: "soft",
      color: "warning",
      class: "bg-yellow-50 text-yellow-700",
    },
    // Danger variants
    {
      variant: "solid",
      color: "danger",
      class: "bg-red-600 text-white",
    },
    {
      variant: "outline",
      color: "danger",
      class: "border-red-600 text-red-600",
    },
    {
      variant: "soft",
      color: "danger",
      class: "bg-red-50 text-red-700",
    },
    // Info variants
    {
      variant: "solid",
      color: "info",
      class: "bg-cyan-600 text-white",
    },
    {
      variant: "outline",
      color: "info",
      class: "border-cyan-600 text-cyan-600",
    },
    {
      variant: "soft",
      color: "info",
      class: "bg-cyan-50 text-cyan-700",
    },
  ],
  defaultVariants: {
    variant: "solid",
    color: "primary",
    size: "md",
  },
});
