import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const {{camelCase name}}Variants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface {{name}}Props
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof {{camelCase name}}Variants> {
  asChild?: boolean
}

const {{name}} = React.forwardRef<HTMLDivElement, {{name}}Props>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "div"
    return (
      <Comp
        className={cn({{camelCase name}}Variants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
{{name}}.displayName = "{{name}}"

export { {{name}}, {{camelCase name}}Variants }