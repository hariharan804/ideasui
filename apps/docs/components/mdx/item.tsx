/* eslint-disable no-restricted-syntax */
import type { StatusChipStatus } from './status-chip';
import type { ComponentInfo } from '@/components-registry';

import Link from 'next/link';
import * as React from 'react';
import { cn } from '@ideasui/utils';

import { StatusChip } from './status-chip';
import { getDemo } from '@/showcase';

interface ItemProperties extends React.HTMLAttributes<HTMLAnchorElement> {
  component: ComponentInfo;
  status?: StatusChipStatus;
  openInNewTab?: boolean;
}

export function Item({
  className,
  component,
  openInNewTab = false,
  status,
  ...properties
}: Readonly<ItemProperties>) {
  const { href, title, name } = component;
  const demo = getDemo(`${name}-basic`) || getDemo(name);
  const DemoComponent = demo?.component;

  return (
    <Link
      className={cn(
        'group relative flex flex-col gap-3 transition-all duration-200 select-none',
        className,
      )}
      href={href}
      target={openInNewTab ? '_blank' : undefined}
      {...properties}
    >
      {/* Top Preview Canvas Box */}
      <div className="bg-surface-subtle/50 group-hover:bg-surface-subtle border-border-subtle/20 relative flex h-36 w-full items-center justify-center overflow-hidden rounded-2xl border p-4 backdrop-blur-sm transition-all duration-200 group-hover:scale-[1.01]">
        {/* Subtle grid pattern background */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(oklch(var(--ideasui-color-content-tertiary)/0.08)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)] [background-size:16px_16px]" />

        <div className="pointer-events-none relative z-10 flex items-center justify-center">
          {DemoComponent ? (
            <DemoComponent />
          ) : (
            <span className="text-content-tertiary font-mono text-xs font-semibold">{title}</span>
          )}
        </div>
      </div>

      {/* Bottom Label Row */}
      <div className="flex items-center justify-between px-1">
        <h3 className="text-content-primary group-hover:text-primary text-sm font-semibold transition-colors duration-150">
          {title}
        </h3>
        {!!status && <StatusChip status={status} />}
      </div>
    </Link>
  );
}

Item.displayName = 'IdeasUI.Item';
