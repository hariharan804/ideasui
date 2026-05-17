/* eslint-disable no-restricted-syntax */
'use client';

import type { ReactNode } from 'react';

import { Rocket, Blocks } from 'lucide-react';

import { DocsLayout } from '@/components/layout/notebook';
import { reactPageTree } from '@/lib/source';
import { baseOptions } from '@/components/layout/layout.config';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      tabMode="navbar"
      tree={reactPageTree}
      {...baseOptions}
      containerProps={{
        className: 'relative selection:bg-primary/20 selection:text-primary',
        children: (
          <div className="pointer-events-none absolute inset-0 z-[-1] overflow-hidden">
            <div className="bg-primary/5 absolute -top-[10%] -left-[10%] h-[40%] w-[40%] rounded-full blur-[120px]" />
            <div className="bg-secondary/5 absolute top-[20%] -right-[10%] h-[35%] w-[35%] rounded-full blur-[100px]" />
          </div>
        ),
      }}
      links={[]}
      nav={{
        ...baseOptions.nav,
        mode: 'top',
        className:
          'border-b border-subtle/40 bg-surface/60 backdrop-blur-xl transition-all duration-500',
        links: [],
      }}
      sidebar={{
        collapsible: false,
        defaultOpenLevel: 0,
        tabs: [
          {
            title: 'Getting Started',
            url: '/react/docs',
            // @ts-expect-error -- icon is not in SidebarTab type but used in our custom LayoutHeaderTabs
            icon: <Rocket className="size-4" />,
          },
          {
            title: 'Components',
            url: '/react/docs/components/button',
            // @ts-expect-error -- icon is not in SidebarTab type but used in our custom LayoutHeaderTabs
            icon: <Blocks className="size-4" />,
          },
        ],
      }}
      themeSwitch={{
        mode: 'light-dark-system',
      }}
    >
      {children}
    </DocsLayout>
  );
}
