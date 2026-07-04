import type { ButtonProps } from '@ideasui/react';
import type { VariantProps } from 'tailwind-variants';

import { Button } from '@ideasui/react';
import { button } from '@ideasui/theme/recipes';
import { tv } from 'tailwind-variants';

const myButtonVariants = tv({
  base: 'text-md font-semibold shadow-md text-shadow-lg data-[pending=true]:opacity-40',
  defaultVariants: {
    radius: 'full',
    variant: 'primary',
  },
  extend: button,
  variants: {
    radius: {
      full: 'rounded-full',
      lg: 'rounded-lg',
      md: 'rounded-md',
      sm: 'rounded-sm',
    },
    size: {
      lg: 'h-12 px-8',
      md: 'h-11 px-6',
      sm: 'h-10 px-4',
      xl: 'h-13 px-10',
    },
    variant: {
      primary: 'text-white dark:bg-white/10 dark:text-white dark:hover:bg-white/15',
    },
  },
});

type DistributiveOmit<T, K extends string | number | symbol> = T extends unknown
  ? Omit<T, K>
  : never;

type MyButtonVariants = VariantProps<typeof myButtonVariants>;
export type MyButtonProps = DistributiveOmit<ButtonProps, 'className' | 'variant'> &
  MyButtonVariants & { className?: string };

function CustomButton({
  className,
  radius = 'full',
  variant = 'primary',
  ...properties
}: MyButtonProps) {
  return (
    <Button
      className={myButtonVariants({ className, radius, variant }).base()}
      radius={radius as ButtonProps['radius']}
      variant={variant as ButtonProps['variant']}
      {...properties}
    />
  );
}

export function CustomVariants() {
  return <CustomButton>Custom Button</CustomButton>;
}
