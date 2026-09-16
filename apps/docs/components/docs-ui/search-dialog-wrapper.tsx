'use client';

import dynamic from 'next/dynamic';
import type { ComponentType, ComponentProps } from 'react';
import type { CustomSearchDialog } from './custom-search-dialog';

export const CustomSearchDialogClient: ComponentType<ComponentProps<typeof CustomSearchDialog>> =
  dynamic(() => import('./custom-search-dialog').then((mod) => mod.CustomSearchDialog), {
    ssr: false,
  });
