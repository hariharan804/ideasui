/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import type { ReactNode } from 'react';

interface ShowcaseItemProperties extends React.ComponentProps<'div'> {
  item: any;
  href: string;
  children?: ReactNode;
  isSelected?: boolean;
  isMinimal?: boolean;
  className?: string;
}

export function ShowcaseItem({
  className,
  href,
  isMinimal = false,
  isSelected = false,
  item,
  ...properties
}: ShowcaseItemProperties) {
  return null;
}
