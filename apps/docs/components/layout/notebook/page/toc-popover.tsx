'use client';

import type { ComponentProps, SVGAttributes } from 'react';

import { createContext, use, useMemo, useState, useRef, useEffect, useEffectEvent } from 'react';
import { ChevronDown } from 'lucide-react';
import { useActiveAnchor } from 'fumadocs-core/toc';
import { useTOCItems } from 'fumadocs-ui/components/toc';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from 'fumadocs-ui/components/ui/collapsible';
import { useTranslations } from '@fuma-translate/react';
import { useTreePath } from 'fumadocs-ui/contexts/tree';
import { cn } from '@ideasui/utils';

import { LayoutContext } from '../context';

const TocPopoverContext = createContext<{
  open: boolean;
  setOpen: (open: boolean) => void;
} | null>(null);

export function PageTOCPopover({ children, className, ...rest }: ComponentProps<'div'>) {
  const ref = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(false);
  const context = use(LayoutContext);
  const isNavTransparent = context?.isNavTransparent ?? true;

  const onClick = useEffectEvent((e: Event) => {
    if (!open) {
      return;
    }
    if (ref.current && !ref.current.contains(e.target as HTMLElement)) {
      setOpen(false);
    }
  });

  useEffect(() => {
    window.addEventListener('click', onClick);

    return () => window.removeEventListener('click', onClick);
  }, []); // onClick is stable from useEffectEvent

  return (
    <TocPopoverContext
      value={useMemo(
        () => ({
          open,
          setOpen,
        }),
        [setOpen, open],
      )}
    >
      <Collapsible
        className={cn(
          'max-xl:layout:[--toc-popover-height:--spacing(10)] sticky top-(--row-2) z-10 h-(--toc-popover-height) [grid-area:toc-popover] xl:hidden',
          className,
        )}
        data-toc-popover=""
        open={open}
        onOpenChange={setOpen}
        {...rest}
      >
        <header
          ref={ref}
          className={cn(
            'border-b backdrop-blur-sm transition-colors',
            (!isNavTransparent || open) && 'bg-surface/80',
            open && 'shadow-lg',
          )}
        >
          {children}
        </header>
      </Collapsible>
    </TocPopoverContext>
  );
}

export function PageTOCPopoverTrigger({ className, ...props }: ComponentProps<'button'>) {
  const t = useTranslations({ note: 'table of contents' });
  const context = use(TocPopoverContext);
  const items = useTOCItems();
  const active = useActiveAnchor();
  const selected = useMemo(() => {
    if (!Array.isArray(items)) {
      return -1;
    }

    return items.findIndex((item) => active === item?.url?.slice(1));
  }, [items, active]);
  const treePath = useTreePath();

  if (!context) {
    return null;
  }
  const { open } = context;
  const path = Array.isArray(treePath) ? treePath.at(-1) : undefined;
  const showItem = selected !== -1 && !open;

  return (
    <CollapsibleTrigger
      className={cn(
        'text-content-secondary flex h-10 w-full items-center gap-2.5 px-4 py-2.5 text-start text-sm focus-visible:outline-none md:px-6 [&_svg]:size-4',
        className,
      )}
      data-toc-popover-trigger=""
      {...props}
    >
      <ProgressCircle
        className={cn('shrink-0', open && 'text-primary')}
        max={1}
        value={(selected + 1) / Math.max(1, items?.length ?? 1)}
      />
      <span className="grid flex-1 *:col-start-1 *:row-start-1 *:my-auto">
        <span
          className={cn(
            'truncate transition-all',
            open && 'text-content-primary',
            showItem && 'pointer-events-none -translate-y-full opacity-0',
          )}
        >
          {path?.name ?? t('On this page')}
        </span>
        <span
          className={cn(
            'truncate transition-all',
            !showItem && 'pointer-events-none translate-y-full opacity-0',
          )}
        >
          {selected !== -1 && Array.isArray(items) ? items[selected]?.title : null}
        </span>
      </span>
      <ChevronDown className={cn('mx-0.5 shrink-0 transition-transform', open && 'rotate-180')} />
    </CollapsibleTrigger>
  );
}

export function PageTOCPopoverContent(props: ComponentProps<'div'>) {
  return (
    <CollapsibleContent
      data-toc-popover-content=""
      {...props}
      className={cn('flex max-h-[50vh] flex-col px-4 md:px-6', props.className)}
    >
      {props.children}
    </CollapsibleContent>
  );
}

interface ProgressCircleProps extends SVGAttributes<SVGSVGElement> {
  max?: number;
  min?: number;
  size?: number;
  strokeWidth?: number;
  value: number;
}

function ProgressCircle({
  max = 100,
  min = 0,
  size = 24,
  strokeWidth = 2,
  value,
  ...restSvgProps
}: ProgressCircleProps) {
  const normalizedValue = Math.min(Math.max(value, min), max);
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const progress = (normalizedValue / max) * circumference;
  const circleProps = {
    cx: size / 2,
    cy: size / 2,
    fill: 'none',
    r: radius,
    strokeWidth,
  };

  return (
    <svg
      aria-valuemax={max}
      aria-valuemin={min}
      aria-valuenow={normalizedValue}
      role="progressbar"
      viewBox={`0 0 ${size} ${size}`}
      {...restSvgProps}
    >
      <circle {...circleProps} className="stroke-current/25" />
      <circle
        {...circleProps}
        className="transition-all"
        stroke="currentColor"
        strokeDasharray={circumference}
        strokeDashoffset={circumference - progress}
        strokeLinecap="round"
        transform={`rotate(-90 ${size / 2} ${size / 2})`}
      />
    </svg>
  );
}
