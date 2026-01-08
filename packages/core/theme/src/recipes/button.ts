import type {VariantProps} from "tailwind-variants";
import {tv} from "tailwind-variants";
import {colorVariants} from "../tokens/variants";
import {borderRadius} from "../tokens";

const button = tv({
  slots: {
    base: [
      "inline-flex",
      "items-center",
      "justify-center",
      "font-medium",
      "transition-colors",
      "focus-visible:outline-none",
      "focus-visible:ring-2",
      "focus-visible:ring-ring",
      "focus-visible:ring-offset-2",
      "disabled:opacity-50",
      "disabled:pointer-events-none",
    ],
    icon: ["shrink-0"],
    label: ["truncate"],
  },
  variants: {
    variant: {
      solid: {
        base: "text-white",
      },
      outline: {
        base: "border-2 bg-transparent hover:bg-opacity-10",
      },
      ghost: {
        base: "bg-transparent hover:bg-opacity-10",
      },
      link: {
        base: "bg-transparent underline-offset-4 hover:underline",
      },
    },
    size: {
      xs: {
        base: "h-8 px-2 text-xs rounded-md",
        icon: "h-3 w-3",
      },
      sm: {
        base: "h-9 px-3 text-sm rounded-md",
        icon: "h-4 w-4",
      },
      md: {
        base: "h-10 px-4 py-2 text-sm rounded-md",
        icon: "h-4 w-4",
      },
      lg: {
        base: "h-11 px-8 text-base rounded-lg",
        icon: "h-5 w-5",
      },
      xl: {
        base: "h-12 px-10 text-lg rounded-lg",
        icon: "h-6 w-6",
      },
      icon: {
        base: "h-10 w-10 rounded-md",
        icon: "h-4 w-4",
      },
    },
    // color: {
    //   primary: {
    //     base: "text-primary-500",
    //   },
    //   secondary: {
    //     base: "text-secondary-500",
    //   },
    //   success: {
    //     base: "text-success-500",
    //   },
    //   warning: {
    //     base: "text-warning-500",
    //   },
    //   danger: {
    //     base: "text-danger-500",
    //   },
    //   info: {
    //     base: "text-info-500",
    //   },
    //   neutral: {
    //     base: "text-neutral-500",
    //   },
    //   gray: {
    //     base: "text-gray-500",
    //   },
    // },
    color: Object.fromEntries(Object.keys(colorVariants).map((color) => [color, {}])) as Record<
      keyof typeof colorVariants,
      {}
    >,
    radius: {
      none: {base: borderRadius.none},
      sm: {base: borderRadius.sm},
      md: {base: borderRadius.md},
      lg: {base: borderRadius.lg},
      xl: {base: borderRadius.xl},
      full: {base: borderRadius.full},
    },
    isDisabled: {
      true: {
        base: "opacity-50 cursor-not-allowed pointer-events-none",
      },
    },
    disableAnimation: {
      true: "",
      false: {
        base: "transition-colors",
      },
    },
    fullWidth: {
      true: {
        base: "w-full",
      },
    },
  },
  compoundVariants: [
    // Solid variants
    {
      variant: "solid",
      color: "primary",
      class: {base: "bg-primary-500 hover:bg-primary-600 active:bg-primary-700"},
    },
    {
      variant: "solid",
      color: "secondary",
      class: {base: "bg-secondary-500 hover:bg-secondary-600 active:bg-secondary-700"},
    },
    {
      variant: "solid",
      color: "success",
      class: {base: "bg-success-500 hover:bg-success-600 active:bg-success-700"},
    },
    {
      variant: "solid",
      color: "warning",
      class: {base: "bg-warning-500 hover:bg-warning-600 active:bg-warning-700"},
    },
    {
      variant: "solid",
      color: "danger",
      class: {base: "bg-danger-500 hover:bg-danger-600 active:bg-danger-700"},
    },
    {
      variant: "solid",
      color: "info",
      class: {base: "bg-info-500 hover:bg-info-600 active:bg-info-700"},
    },
    {
      variant: "solid",
      color: "neutral",
      class: {base: "bg-neutral-500 hover:bg-neutral-600 active:bg-neutral-700"},
    },
    {
      variant: "solid",
      color: "gray",
      class: {base: "bg-gray-500 hover:bg-gray-600 active:bg-gray-700 text-white"},
    },
    // Outline variants
    {
      variant: "outline",
      color: "primary",
      class: {base: "border-primary-500 text-primary-500 hover:bg-primary-50"},
    },
    {
      variant: "outline",
      color: "secondary",
      class: {base: "border-secondary-500 text-secondary-500 hover:bg-secondary-50"},
    },
    {
      variant: "outline",
      color: "success",
      class: {base: "border-success-500 text-success-500 hover:bg-success-50"},
    },
    {
      variant: "outline",
      color: "warning",
      class: {base: "border-warning-500 text-warning-500 hover:bg-warning-50"},
    },
    {
      variant: "outline",
      color: "danger",
      class: {base: "border-danger-500 text-danger-500 hover:bg-danger-50"},
    },
    {
      variant: "outline",
      color: "info",
      class: {base: "border-info-500 text-info-500 hover:bg-info-50"},
    },
    {
      variant: "outline",
      color: "neutral",
      class: {base: "border-neutral-500 text-neutral-500 hover:bg-neutral-50"},
    },
    {
      variant: "outline",
      color: "gray",
      class: {base: "border-gray-500 text-gray-500 hover:bg-gray-50"},
    },
    // Ghost variants
    {
      variant: "ghost",
      color: "primary",
      class: {base: "text-primary-500 hover:bg-primary-50"},
    },
    {
      variant: "ghost",
      color: "secondary",
      class: {base: "text-secondary-500 hover:bg-secondary-50"},
    },
    {
      variant: "ghost",
      color: "success",
      class: {base: "text-success-500 hover:bg-success-50"},
    },
    {
      variant: "ghost",
      color: "warning",
      class: {base: "text-warning-500 hover:bg-warning-50"},
    },
    {
      variant: "ghost",
      color: "danger",
      class: {base: "text-danger-500 hover:bg-danger-50"},
    },
    {
      variant: "ghost",
      color: "info",
      class: {base: "text-info-500 hover:bg-info-50"},
    },
    {
      variant: "ghost",
      color: "neutral",
      class: {base: "text-neutral-500 hover:bg-neutral-50"},
    },
    {
      variant: "ghost",
      color: "gray",
      class: {base: "text-gray-500 hover:bg-gray-50"},
    },
    // Link variants
    {
      variant: "link",
      color: "primary",
      class: {base: "text-primary-500"},
    },
    {
      variant: "link",
      color: "secondary",
      class: {base: "text-secondary-500"},
    },
    {
      variant: "link",
      color: "success",
      class: {base: "text-success-500"},
    },
    {
      variant: "link",
      color: "warning",
      class: {base: "text-warning-500"},
    },
    {
      variant: "link",
      color: "danger",
      class: {base: "text-danger-500"},
    },
    {
      variant: "link",
      color: "info",
      class: {base: "text-info-500"},
    },
    {
      variant: "link",
      color: "neutral",
      class: {base: "text-neutral-500"},
    },
    {
      variant: "link",
      color: "gray",
      class: {base: "text-gray-500"},
    },
  ],
  defaultVariants: {
    variant: "solid",
    size: "md",
    color: "primary",
    radius: "md",
    isDisabled: false,
    disableAnimation: false,
  },
});

export type ButtonVariantProps = VariantProps<typeof button>;
export type ButtonSlots = keyof ReturnType<typeof button>;
export type ButtonReturnType = ReturnType<typeof button>;

export {button};
