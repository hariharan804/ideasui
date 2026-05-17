/* eslint-disable react/no-array-index-key */
/* eslint-disable no-restricted-syntax */
'use client';

import type { SidebarTabWithProps } from 'fumadocs-ui/components/sidebar/tabs/dropdown';
import type { ComponentProps } from 'react';

import { useContext, useMemo } from 'react';
import { usePathname } from 'fumadocs-core/framework';
import Link from 'fumadocs-core/link';
import { useSidebar } from 'fumadocs-ui/components/sidebar/base';
import { SidebarTabsDropdown, isTabActive } from 'fumadocs-ui/components/sidebar/tabs/dropdown';
import { cn } from '@ideasui/utils';

import { LayoutContext } from './context';

export function LayoutHeader(props: ComponentProps<'header'>) {
  const { open } = useSidebar();
  const context = useContext(LayoutContext);
  const isNavTransparent = context?.isNavTransparent ?? !open;

  return (
    <header
      data-transparent={isNavTransparent}
      {...props}
      className={cn(
        'sticky top-0 z-50 flex w-full flex-col border-b transition-all duration-300',
        isNavTransparent ? 'bg-transparent' : 'border-base/40 backdrop-blur-md',
        props.className,
      )}
    >
      {props.children}
    </header>
  );
}

export type LayoutHeaderTabsProps = ComponentProps<'div'> & {
  options?: SidebarTabWithProps[];
  filterByPathname?: boolean;
};

function getFirstTwoPathSegments(pathname: string): string[] | null {
  const segments = pathname.split('/').filter(Boolean);

  if (segments.length < 2) {
    return null;
  }

  return segments.slice(0, 2);
}

export function filterTabsByPathname(
  tabs: SidebarTabWithProps[],
  pathname: string | null | undefined,
): SidebarTabWithProps[] {
  const currentSegments = getFirstTwoPathSegments(pathname || '');

  if (!currentSegments) {
    return tabs;
  }

  return tabs.filter((tab) => {
    if (typeof tab.url !== 'string') {
      return true;
    }
    const tabSegments = getFirstTwoPathSegments(tab.url);

    if (!tabSegments) {
      return true;
    }

    return currentSegments[0] === tabSegments[0] && currentSegments[1] === tabSegments[1];
  });
}

export function FilteredSidebarTabsDropdown({
  filterByPathname = false,
  options,
  ...props
}: ComponentProps<typeof SidebarTabsDropdown> & { filterByPathname?: boolean }) {
  const pathname = usePathname();
  const filteredOptions = useMemo(() => {
    if (!options) {
      return undefined;
    }
    if (!filterByPathname) {
      return options;
    }

    return filterTabsByPathname(options, pathname);
  }, [options, pathname, filterByPathname]);

  if (!filteredOptions || filteredOptions.length === 0) {
    return null;
  }

  return <SidebarTabsDropdown {...props} options={filteredOptions} />;
}

export function LayoutHeaderTabs({
  children,
  className,
  filterByPathname = false,
  options,
  ...props
}: LayoutHeaderTabsProps) {
  const pathname = usePathname();
  const filteredOptions = useMemo(() => {
    if (!options) {
      return undefined;
    }
    if (!filterByPathname) {
      return options;
    }

    return filterTabsByPathname(options, pathname);
  }, [options, pathname, filterByPathname]);

  const selectedIdx = useMemo(() => {
    if (!filteredOptions || !pathname) {
      return -1;
    }

    return filteredOptions.findLastIndex((option) => isTabActive(option, pathname));
  }, [filteredOptions, pathname]);

  return (
    <div
      className={cn(
        'flex flex-row items-center gap-2 [-ms-overflow-style:none] [scrollbar-width:none] max-md:overflow-x-auto max-md:overflow-y-hidden [&::-webkit-scrollbar]:hidden',
        className,
      )}
      {...props}
    >
      {filteredOptions?.map((option, i) => {
        const { props: { className, ...rest } = {}, title, url } = option;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const icon = (option as any).icon;
        const isSelected = selectedIdx === i;

        return (
          <Link
            key={`header-${i}`}
            className={cn(
              'group relative -mb-px flex-shrink-0 px-4 py-2 text-sm font-medium transition-all duration-300',
              'rounded-t-xl active:scale-[0.98]',
              isSelected
                ? 'bg-surface border-base/20 !border-b-none text-primary z-1 border !border-b-transparent'
                : 'text-content-secondary hover:bg-surface-muted hover:text-content-primary z-1',
              className,
            )}
            href={url}
            {...rest}
          >
            <span className="relative z-10 flex items-center gap-2">
              {icon ? <span className="size-4 opacity-70">{icon}</span> : null}
              {title}
            </span>
          </Link>
        );
      })}
      {children}
    </div>
  );
}
