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
      <span
        className={cn(
          commonClasses,
          'bg-emerald-500/12 text-emerald-600 dark:bg-emerald-400/18 dark:text-emerald-300',
          className,
        )}
      >
        New
      </span>
    );
  }

  if (status === 'updated') {
    return (
      <span
        className={cn(
          commonClasses,
          'bg-sky-500/12 text-sky-600 dark:bg-sky-400/18 dark:text-sky-300',
          className,
        )}
      >
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
      <span
        className={cn(
          commonClasses,
          'bg-amber-500/12 text-amber-600 dark:bg-amber-400/18 dark:text-amber-300',
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
