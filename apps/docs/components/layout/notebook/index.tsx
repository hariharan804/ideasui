'use client';

import type { LinkItemType } from '@/components/ui/docs/link-item';
import type * as PageTree from 'fumadocs-core/page-tree';
import type { GetSidebarTabsOptions } from 'fumadocs-ui/components/sidebar/tabs';
import type { SidebarTabWithProps } from 'fumadocs-ui/components/sidebar/tabs/dropdown';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import type { HTMLAttributes, ReactNode, FC, ComponentProps } from 'react';
import type { LayoutHeaderTabsProps as LayoutHeaderTabsProperties } from './header';

import { useMemo } from 'react';
import { getSidebarTabs } from 'fumadocs-ui/components/sidebar/tabs';
import { TreeContextProvider } from 'fumadocs-ui/contexts/tree';
import { resolveLinkItems } from 'fumadocs-ui/layouts/shared';

import { LayoutContextProvider } from './context';
import { LayoutBody } from './body';
import { Sidebar } from './sidebar';
import { SidebarContent } from './sidebar-content';
import { DocsNavbar } from './navbar';

export interface DocsLayoutProps extends BaseLayoutProps {
  tree: PageTree.Root;
  tabMode?: 'sidebar' | 'navbar';

  nav?: BaseLayoutProps['nav'] & {
    mode?: 'top' | 'auto';
    titleSuffix?: ReactNode;
    children?: ReactNode;
    className?: string;
    titleSuffixGap?: string;
    links?: LinkItemType[];
  };

  sidebar?: SidebarOptions;

  containerProps?: HTMLAttributes<HTMLDivElement>;
}

interface SidebarOptions
  extends
    ComponentProps<'aside'>,
    Pick<ComponentProps<typeof Sidebar>, 'defaultOpenLevel' | 'prefetch'> {
  components?: Record<string, FC>;
  tabs?: SidebarTabWithProps[] | GetSidebarTabsOptions | false;
  headerTabsProps?: LayoutHeaderTabsProperties;
  banner?: ReactNode | FC<ComponentProps<'div'>>;
  footer?: ReactNode | FC<ComponentProps<'div'>>;
  collapsible?: boolean;
}

export function DocsLayout(properties: DocsLayoutProps) {
  const {
    // eslint-disable-next-line sonarjs/deprecation
    i18n = false,
    nav = {},
    sidebar: {
      defaultOpenLevel,
      headerTabsProps,
      prefetch,
      tabs: tabOptions,
      ...sidebarProperties
    } = {},
    tabMode = 'sidebar',
    themeSwitch = {},
    tree,
    containerProps,
    children,
  } = properties;

  const links = resolveLinkItems(properties);
  const tabs = useMemo(() => {
    if (Array.isArray(tabOptions)) {
      return tabOptions;
    }
    if (typeof tabOptions === 'object') {
      return getSidebarTabs(tree, tabOptions);
    }
    if (tabOptions !== false) {
      return getSidebarTabs(tree);
    }

    return [];
  }, [tabOptions, tree]);

  return (
    <TreeContextProvider tree={tree}>
      <LayoutContextProvider
        navMode={nav.mode ?? 'auto'}
        navTransparentMode={nav.transparentMode}
        tabMode={tabMode}
      >
        <Sidebar defaultOpenLevel={defaultOpenLevel} prefetch={prefetch}>
          <LayoutBody {...containerProps}>
            <SidebarContent
              i18n={i18n}
              links={links}
              nav={nav}
              sidebarProps={sidebarProperties}
              tabMode={tabMode}
              tabs={tabs}
              themeSwitch={themeSwitch}
            />
            <DocsNavbar
              {...properties}
              headerTabsProps={headerTabsProps}
              links={links}
              tabs={tabs}
            />
            {children}
          </LayoutBody>
        </Sidebar>
      </LayoutContextProvider>
    </TreeContextProvider>
  );
}
