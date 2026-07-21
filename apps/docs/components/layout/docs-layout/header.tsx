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

export function LayoutHeader(properties: ComponentProps<'header'>) {
  const { open } = useSidebar();
  const context = useContext(LayoutContext);
  const isNavTransparent = context?.isNavTransparent ?? !open;

  return (
    <header
      data-transparent={isNavTransparent}
      {...properties}
      className={cn(
        'sticky top-0 z-50 flex w-full flex-col border-b transition-all duration-300',
        isNavTransparent ? 'bg-transparent' : 'border-base/40 backdrop-blur-md',
        properties.className,
      )}
    >
      {properties.children}
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
  className,
  ...properties
}: ComponentProps<typeof SidebarTabsDropdown> & { filterByPathname?: boolean }) {
  const pathname = usePathname();
  const filteredOptions = useMemo(() => {
    if (!options) {
      return;
    }
    const baseOptions = filterByPathname ? filterTabsByPathname(options, pathname) : options;
    const selected = pathname
      ? baseOptions.findLast((item) => isTabActive(item, pathname))
      : undefined;

    return baseOptions.map((option) => {
      const isActive = selected ? option.url === selected.url : false;

      return {
        ...option,
        icon: option.icon ? (
          <span
            className={cn(
              'flex size-full items-center justify-center transition-colors [&_svg]:size-4',
              isActive ? 'text-primary' : 'text-content-secondary',
            )}
          >
            {option.icon}
          </span>
        ) : undefined,
        props: {
          ...option.props,
          className: cn(
            option.props?.className,
            isActive
              ? 'bg-primary/10 text-primary font-semibold'
              : 'text-content-secondary hover:bg-surface-subtle hover:text-content-primary',
          ),
        },
      };
    });
  }, [options, pathname, filterByPathname]);

  if (!filteredOptions || filteredOptions.length === 0) {
    return null;
  }

  return (
    <SidebarTabsDropdown
      {...properties}
      className={cn(
        '[&>div:first-child]:my-auto [&>div:first-child]:flex [&>div:first-child]:size-5 [&>div:first-child]:items-center [&>div:first-child]:justify-center',
        'border-primary/30 bg-primary/5 text-primary hover:bg-primary/10 font-medium',
        className,
      )}
      options={filteredOptions}
    />
  );
}

export function LayoutHeaderTabs({
  children,
  className,
  filterByPathname = false,
  options,
  ...properties
}: LayoutHeaderTabsProps) {
  const pathname = usePathname();
  const filteredOptions = useMemo(() => {
    if (!options) {
      return;
    }
    if (!filterByPathname) {
      return options;
    }

    return filterTabsByPathname(options, pathname);
  }, [options, pathname, filterByPathname]);

  const selectedIndex = useMemo(() => {
    if (!filteredOptions || !pathname) {
      return -1;
    }

    return filteredOptions.findLastIndex((option) => isTabActive(option, pathname));
  }, [filteredOptions, pathname]);

  return (
    <div
      className={cn(
        'flex [scrollbar-width:none] flex-row items-center gap-1.5 [-ms-overflow-style:none] max-md:overflow-x-auto max-md:overflow-y-hidden [&::-webkit-scrollbar]:hidden',
        className,
      )}
      {...properties}
    >
      {filteredOptions?.map((option, index) => {
        const { props: { className, ...rest } = {}, title, url } = option;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const icon = (option as any).icon;
        const isSelected = selectedIndex === index;

        return (
          <Link
            key={url}
            className={cn(
              'group relative flex-shrink-0 px-3 py-1.5 text-sm font-medium transition-colors duration-200',
              isSelected ? 'text-primary' : 'text-content-tertiary hover:text-content-primary',
              className,
            )}
            href={url}
            {...rest}
          >
            <span className="relative z-10 flex items-center gap-2">
              {icon ? (
                <span
                  className={cn(
                    'size-4 transition-colors duration-200',
                    isSelected
                      ? 'text-primary'
                      : 'text-content-tertiary group-hover:text-content-primary',
                  )}
                >
                  {icon}
                </span>
              ) : null}
              {title}
            </span>
          </Link>
        );
      })}
      {children}
    </div>
  );
}
