import { cn } from '@ideasui/utils';

export type StatusChipStatus = 'new' | 'new-dot' | 'preview' | 'updated' | 'planned';

interface StatusChipProperties {
  readonly status: StatusChipStatus;
  readonly className?: string;
}

export function StatusChip({ className, status }: StatusChipProperties) {
  const commonClasses =
    'inline-flex h-4 items-center rounded-md px-1.5 text-[9px] font-bold tracking-wider uppercase transition-all select-none leading-none';

  if (status === 'new') {
    return (
      <span className={cn(commonClasses, 'bg-success-subtle text-on-success-subtle', className)}>
        New
      </span>
    );
  }

  if (status === 'updated') {
    return (
      <span className={cn(commonClasses, 'bg-info-subtle text-on-info-subtle', className)}>
        Updated
      </span>
    );
  }

  if (status === 'preview') {
    return (
      <span className={cn(commonClasses, 'bg-surface-muted text-content-tertiary', className)}>
        Preview
      </span>
    );
  }

  if (status === 'planned') {
    return (
      <span className={cn(commonClasses, 'bg-warning-subtle text-on-warning-subtle', className)}>
        Planned
      </span>
    );
  }

  return null;
}

export default StatusChip;
