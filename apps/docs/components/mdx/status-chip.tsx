/* eslint-disable no-restricted-syntax */
import * as React from 'react';
import { cn } from '@ideasui/utils';

export type StatusChipStatus = 'new' | 'new-dot' | 'preview' | 'updated' | 'stable' | 'planned';

interface StatusChipProps {
  status: StatusChipStatus;
  className?: string;
}

export function StatusChip({ className, status }: StatusChipProps) {
  const commonClasses =
    'inline-flex h-5 items-center rounded-full px-1.5 text-[10px] font-semibold transition-all';

  if (status === 'new') {
    return (
      <span
        className={cn(commonClasses, 'bg-pink-400/10 text-pink-500 dark:bg-pink-400/20', className)}
      >
        New
      </span>
    );
  }

  if (status === 'preview') {
    return (
      <span
        className={cn(commonClasses, 'border-subtle bg-surface text-content-secondary', className)}
      >
        Preview
      </span>
    );
  }

  if (status === 'updated') {
    return (
      <span className={cn(commonClasses, 'bg-surface-muted text-content-tertiary', className)}>
        Updated
      </span>
    );
  }

  if (status === 'stable') {
    return (
      <span
        className={cn(
          commonClasses,
          'bg-green-400/10 text-green-600 dark:bg-green-400/20 dark:text-green-400',
          className,
        )}
      >
        Stable
      </span>
    );
  }

  if (status === 'planned') {
    return (
      <span
        className={cn(
          commonClasses,
          'bg-yellow-400/10 text-yellow-600 dark:bg-yellow-400/20 dark:text-yellow-500',
          className,
        )}
      >
        Planned
      </span>
    );
  }

  return null;
}

export default StatusChip;
