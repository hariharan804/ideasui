import { cn } from '@ideasui/utils';

export type StatusChipStatus = 'new' | 'new-dot' | 'preview' | 'updated' | 'stable' | 'planned';

interface StatusChipProperties {
  status: StatusChipStatus;
  className?: string;
}

export function StatusChip({ className, status }: StatusChipProperties) {
  const commonClasses =
    'inline-flex h-5 items-center rounded-3xl px-1.5 text-[10px] font-semibold transition-all';

  if (status === 'new') {
    return (
      <span className={cn(commonClasses, 'bg-primary-subtle text-primary', className)}>New</span>
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
      <span className={cn(commonClasses, 'bg-surface-subtle text-content-tertiary', className)}>
        Updated
      </span>
    );
  }

  if (status === 'stable') {
    return (
      <span className={cn(commonClasses, 'bg-success-subtle text-success', className)}>Stable</span>
    );
  }

  if (status === 'planned') {
    return (
      <span className={cn(commonClasses, 'bg-warning-subtle text-warning', className)}>
        Planned
      </span>
    );
  }

  return null;
}

export default StatusChip;
