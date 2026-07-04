/* eslint-disable no-restricted-syntax */
import type { StatusChipStatus } from './status-chip';
import type { ComponentInfo } from '@/components-registry';

import Link from 'next/link';
import * as React from 'react';
import { cn } from '@ideasui/utils';

import { StatusChip } from './status-chip';

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
  const { description, href, title } = component;

  return (
    <Link
      className={cn(
        'group border-separator hover:bg-surface-hover bg-surface relative flex flex-col gap-2 rounded-xl border p-4 transition-all hover:shadow-md',
        className,
      )}
      href={href}
      target={openInNewTab ? '_blank' : undefined}
      {...properties}
    >
      <div className="flex items-center justify-between">
        <h3 className="font-semibold">{title}</h3>
        {!!status && <StatusChip status={status} />}
      </div>
      <p className="text-muted-foreground line-clamp-2 text-sm">{description}</p>
    </Link>
  );
}

Item.displayName = 'IdeasUI.Item';
