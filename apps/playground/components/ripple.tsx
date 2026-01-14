'use client';

import type { JSX, ReactNode } from 'react';

import { Ripple } from '@ideasui/ripple';
import { cn } from '@ideasui/utils';

interface RippleExampleProps {
  className?: string;
  color?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger';
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full';
  children?: ReactNode;
}

const LAYOUT_CLASSES = 'cursor-pointer overflow-hidden select-none';

const RipplePreview = ({
  className,
  color = 'primary',
  radius = 'md',
  children = 'Click me',
  ...props
}: RippleExampleProps): JSX.Element => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <h2 className="text-xl font-bold">Ripple Examples</h2>

      <div className="flex flex-wrap gap-4">
        {/* Basic Ripple Button */}
        <div
          className={cn(
            'relative flex h-10 items-center justify-center rounded-md px-4 font-medium',
            'bg-primary text-primary-foreground',
            LAYOUT_CLASSES,
            'hover:bg-primary/90 transition-colors',
            className,
          )}
          style={{ borderRadius: radius === 'full' ? '9999px' : undefined }}
          {...props}
        >
          {children}
          <Ripple color={color} ripples={[]} onClear={() => {}} />
        </div>

        {/* Ripple with different variant */}
        <div
          className={cn(
            'relative flex h-10 items-center justify-center rounded-md border-2 px-4 font-medium',
            'border-primary text-foreground',
            LAYOUT_CLASSES,
            'hover:bg-primary/10 transition-colors',
            className,
          )}
        >
          Bordered Ripple
          <Ripple color={color} ripples={[]} onClear={() => {}} />
        </div>
      </div>

      <div className="flex flex-wrap gap-4">
        {/* Different colors */}
        {['primary', 'secondary', 'success', 'warning', 'danger'].map((c) => (
          <div
            key={c}
            className={cn(
              'relative flex h-10 items-center justify-center rounded-md px-4 font-medium',
              `bg-${c} text-${c}-foreground`,
              LAYOUT_CLASSES,
              `hover:bg-${c}/90`,
              className,
            )}
            style={{ borderRadius: radius === 'full' ? '9999px' : undefined }}
          >
            {c.charAt(0).toUpperCase() + c.slice(1)}
            <Ripple
              color={c as 'primary' | 'secondary' | 'success' | 'warning' | 'danger'}
              ripples={[]}
              onClear={() => {}}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RipplePreview;
