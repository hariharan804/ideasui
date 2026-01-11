'use client';

import { Ripple } from '@ideasui/ripple';
import { cn } from '@ideasui/utils';

interface RippleExampleProps {
  className?: string;
  variant?: 'solid' | 'bordered' | 'light' | 'flat' | 'faded' | 'shadow' | 'dot';
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  isDisabled?: boolean;
  disableRipple?: boolean;
  children?: React.ReactNode;
}

export default function RipplePreview({
  className,
  variant = 'solid',
  color = 'primary',
  radius = 'md',
  isDisabled = false,
  disableRipple = false,
  children = 'Click me',
  ...props
}: RippleExampleProps) {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-xl font-bold">Ripple Examples</h2>

      <div className="flex flex-wrap gap-4">
        {/* Basic Ripple Button */}
        <Ripple
          className={cn(
            'relative flex h-10 items-center justify-center rounded-md px-4 font-medium',
            'bg-primary text-primary-foreground',
            'cursor-pointer overflow-hidden select-none',
            'hover:bg-primary/90 transition-colors',
            className,
          )}
          // variant={variant}
          color={color}
          radius={radius}
          // isDisabled={isDisabled}
          // disableRipple={disableRipple}
          {...props}
        >
          {children}
        </Ripple>

        {/* Ripple with different variant */}
        <Ripple
          className={cn(
            'relative flex h-10 items-center justify-center rounded-md border-2 px-4 font-medium',
            'border-primary text-foreground',
            'cursor-pointer overflow-hidden select-none',
            'hover:bg-primary/10 transition-colors',
            className,
          )}
          // variant="bordered"
          color={color}
          radius={radius}
        >
          Bordered Ripple
        </Ripple>
      </div>

      <div className="flex flex-wrap gap-4">
        {/* Different colors */}
        {['primary', 'secondary', 'success', 'warning', 'danger'].map((color) => (
          <Ripple
            key={color}
            className={cn(
              'relative flex h-10 items-center justify-center rounded-md px-4 font-medium',
              `bg-${color} text-${color}-foreground`,
              'cursor-pointer overflow-hidden select-none',
              `hover:bg-${color}/90`,
              className,
            )}
            // variant={variant}
            color={color as any}
            radius={radius}
          >
            {color.charAt(0).toUpperCase() + color.slice(1)}
          </Ripple>
        ))}
      </div>
    </div>
  );
}
