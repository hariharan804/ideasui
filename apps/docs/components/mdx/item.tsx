/* eslint-disable no-restricted-syntax */
import type { StatusChipStatus } from './status-chip';
import type { ComponentInfo } from '@/components-registry';

import Link from 'next/link';
import * as React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { cn } from '@ideasui/utils';

import { StatusChip } from './status-chip';
import { getDemo } from '@/showcase';
import { ComponentThumbnailPreview } from './thumbnail-previews';

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
  const { href, title, name, description } = component;
  const demo = getDemo(`${name}-basic`) || getDemo(`${name}-default`) || getDemo(name);
  const DemoComponent = demo?.component;

  return (
    <Link
      aria-label={`View ${title} component documentation`}
      className={cn(
        'group border-border/70 bg-surface/40 hover:bg-surface/80 hover:border-primary/40 hover:shadow-primary/5 relative flex flex-col overflow-hidden rounded-2xl border transition-all duration-200 select-none hover:shadow-lg',
        className,
      )}
      href={href}
      target={openInNewTab ? '_blank' : undefined}
      {...properties}
    >
      {/* Top Preview Canvas Box */}
      <div className="bg-surface-subtle/30 group-hover:bg-surface-subtle/60 border-border/40 relative flex h-40 w-full items-center justify-center overflow-hidden border-b p-4 transition-all duration-200">
        {/* Subtle dot grid pattern background */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(oklch(var(--ideasui-color-content-tertiary)/0.12)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black_70%,transparent_100%)] [background-size:16px_16px]" />

        <div className="pointer-events-none relative z-10 flex w-full items-center justify-center transition-transform duration-200 group-hover:scale-[1.02]">
          <ComponentThumbnailPreview DemoComponent={DemoComponent} name={name} title={title} />
        </div>
      </div>

      {/* Bottom Info Section */}
      <div className="bg-surface/50 group-hover:bg-surface/80 flex flex-col gap-1 p-3.5 transition-colors duration-200">
        <div className="flex items-center justify-between gap-2">
          <h3 className="text-content-primary group-hover:text-primary flex items-center gap-1 text-sm font-semibold transition-colors duration-150">
            {title}
            <ArrowUpRight className="text-content-tertiary group-hover:text-primary h-3.5 w-3.5 -translate-x-1 translate-y-1 opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100" />
          </h3>
          {!!status && <StatusChip status={status} />}
        </div>
        {description && (
          <p className="text-content-secondary line-clamp-1 text-xs leading-normal">
            {description}
          </p>
        )}
      </div>
    </Link>
  );
}

Item.displayName = 'IdeasUI.Item';
