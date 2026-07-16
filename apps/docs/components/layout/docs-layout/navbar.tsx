/* eslint-disable @typescript-eslint/no-explicit-any, sonarjs/deprecation, sonarjs/function-return-type */

'use client';

import type { LinkItemType, MenuItemType } from '@/components/docs-ui/link-item';
import type { SidebarTabWithProps } from 'fumadocs-ui/components/sidebar/tabs/dropdown';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import type { ComponentProps, HTMLAttributes, PointerEvent, ReactNode, FC } from 'react';
import type { LayoutHeaderTabsProps as LayoutHeaderTabsProperties } from './header';

import { useState, useRef, Fragment } from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'fumadocs-core/link';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from 'fumadocs-ui/components/ui/popover';
import { useIsScrollTop } from 'fumadocs-ui/utils/use-is-scroll-top';
import { cn } from '@ideasui/utils';

import { SidebarCollapseTrigger, SidebarTrigger } from './sidebar';
import { LayoutHeader, LayoutHeaderTabs } from './header';

import { Sidebar as SidebarIcon, Languages } from '@/components/docs-ui/icons';
import { DynamicSearchToggle, SearchToggle } from '@/components/docs-ui/search-toggle';
import { GitHubButton } from '@/components/docs-ui/github-button';
import { ThemeToggle } from '@/components/docs-ui/theme-toggle';
import { LanguageToggle } from '@/components/docs-ui/language-toggle';
import { LinkItem } from '@/components/docs-ui/link-item';

export function NavbarLinkItem({
  className,
  item,
  ...properties
}: { item: LinkItemType } & HTMLAttributes<HTMLElement>) {
  if (item.type === 'custom') {
    return item.children;
  }

  if (item.type === 'menu') {
    return <NavbarLinkItemMenu className={className} item={item} {...properties} />;
  }

  return (
    <LinkItem
      className={cn(
        'text-content-secondary hover:text-content-primary data-[active=true]:text-primary text-sm transition-colors',
        className,
      )}
      item={item}
      {...properties}
    >
      {item.text}
    </LinkItem>
  );
}

function isTouchDevice() {
  return (
    globalThis.window !== undefined &&
    ('ontouchstart' in globalThis || navigator.maxTouchPoints > 0)
  );
}

function NavbarLinkItemMenu({
  className,
  hoverDelay = 50,
  item,
  ...properties
}: { item: MenuItemType; hoverDelay?: number } & HTMLAttributes<HTMLElement>) {
  const [open, setOpen] = useState(false);
  const timeoutReference = useRef<number>(null);
  const freezeUntil = useRef<number>(null);

  const delaySetOpen = (value: boolean) => {
    if (timeoutReference.current) {
      clearTimeout(timeoutReference.current);
      timeoutReference.current = null;
    }

    timeoutReference.current = globalThis.setTimeout(() => {
      setOpen(value);
      freezeUntil.current = Date.now() + 300;
    }, hoverDelay) as unknown as number;
  };
  const onPointerEnter = (e: PointerEvent) => {
    if (e.pointerType === 'touch') {
      return;
    }
    delaySetOpen(true);
  };
  const onPointerLeave = (e: PointerEvent) => {
    if (e.pointerType === 'touch') {
      return;
    }
    delaySetOpen(false);
  };

  return (
    <Popover
      open={open}
      onOpenChange={(value) => {
        if (freezeUntil.current === null || Date.now() >= freezeUntil.current) {
          setOpen(value);
        }
      }}
    >
      <PopoverTrigger
        className={cn(
          'text-content-secondary has-data-[active=true]:text-primary data-[state=open]:text-content-primary inline-flex items-center gap-1.5 p-1 text-sm transition-colors focus-visible:outline-none',
          className,
        )}
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
        {...properties}
      >
        {item.url ? <LinkItem item={item as { url: string }}>{item.text}</LinkItem> : item.text}
        <ChevronDown className="size-3" />
      </PopoverTrigger>
      <PopoverContent
        className="text-content-secondary flex flex-col p-1 text-start"
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
      >
        {item.items.map((child, index) => {
          const keyId = `item-${index}`;

          if (child.type === 'custom') {
            return <Fragment key={keyId}>{child.children}</Fragment>;
          }

          return (
            <LinkItem
              key={keyId}
              className="hover:bg-surface-subtle hover:text-content-primary data-[active=true]:text-primary inline-flex items-center gap-2 rounded-md p-2 transition-colors [&_svg]:size-4"
              item={child}
              onClick={() => {
                if (isTouchDevice()) {
                  setOpen(false);
                }
              }}
            >
              {child.icon}
              {child.text}
            </LinkItem>
          );
        })}
      </PopoverContent>
    </Popover>
  );
}

export interface DocsNavbarProps {
  headerTabsProps?: LayoutHeaderTabsProperties;
  i18n?: BaseLayoutProps['i18n'];
  links: LinkItemType[];
  nav?: {
    mode?: 'top' | 'auto';
    title?: ReactNode | FC<ComponentProps<'a'>>;
    url?: string;
    titleSuffix?: ReactNode;
    titleSuffixGap?: string;
    children?: ReactNode;
    transparentMode?: 'top' | 'always' | 'none';
  };
  searchToggle?: {
    enabled?: boolean;
    components?: {
      lg?: ReactNode;
      sm?: ReactNode;
    };
  };
  sidebar?: {
    collapsible?: boolean;
  };
  tabMode?: 'sidebar' | 'navbar';
  tabs: SidebarTabWithProps[];
  themeSwitch?: BaseLayoutProps['themeSwitch'];
}

export function DocsNavbar({
  headerTabsProps,
  i18n,
  links,
  nav = {},
  searchToggle = {},
  sidebar: { collapsible: sidebarCollapsible = true } = {},
  tabMode = 'sidebar',
  tabs,
  themeSwitch = {},
}: Readonly<DocsNavbarProps>) {
  const navMode = nav.mode ?? 'auto';
  const showLayoutTabs = tabMode === 'navbar' && tabs.length > 0;
  const isTop = useIsScrollTop({ enabled: true }) ?? true;

  // Normalize nav.title

  const titleNode = (
    typeof nav.title === 'function' ? nav.title({} as ComponentProps<'a'>) : nav.title
  ) as any;

  const themeSwitchEnabled = themeSwitch?.enabled !== false;
  const themeSwitchMode = themeSwitch?.mode ?? 'light-dark-system';

  return (
    <LayoutHeader
      className={cn(
        'top-(--row-1) border-none bg-transparent pt-4 backdrop-blur-none [grid-area:header]',
        showLayoutTabs ? 'h-auto pb-0' : '',
      )}
      id="nd-subnav"
      style={{
        backdropFilter: 'none',
        WebkitBackdropFilter: 'none',
      }}
    >
      <div
        className={cn(
          'relative z-50 mx-auto flex h-14 w-full max-w-[95%] min-w-10 items-center gap-6 border-2 pr-2 pl-4 shadow-sm transition-all duration-300 sm:py-2 md:pl-6',
          isTop ? 'rounded-none border-transparent bg-transparent shadow-none' : 'rounded-full',
        )}
        data-header-body=""
        style={{
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
        }}
      >
        {/* Left Section: Logo & Tabs */}
        <div
          className={cn(
            'flex items-center gap-4',
            navMode === 'top' && 'flex-1',
            navMode === 'auto' && 'max-md:flex has-data-[collapsed=true]:md:flex',
            navMode === 'auto' && 'hidden md:items-center',
          )}
        >
          {!!sidebarCollapsible && navMode === 'auto' && (
            <SidebarCollapseTrigger
              className={cn(
                buttonVariants({
                  color: 'ghost',
                  size: 'icon-sm',
                }),
                'text-content-secondary hover:bg-surface-subtle hover:text-content-primary transition-all duration-300 hover:scale-105 data-[collapsed=false]:hidden max-md:hidden',
              )}
            >
              <SidebarIcon />
            </SidebarCollapseTrigger>
          )}

          <Link
            className="flex items-center gap-2.5 font-bold transition-opacity hover:opacity-80"
            href={nav.url ?? '/'}
          >
            {titleNode}
            {nav.titleSuffix}
          </Link>

          {/* Vertical Separator */}
          <div className="bg-border mx-2 block h-4 w-px max-md:hidden" />

          {/* React / Native Toggle */}
          {/* NOSONAR */}
          {/* <div className="flex items-center rounded-full bg-black/5 p-1 text-xs font-semibold max-md:hidden dark:bg-white/5">
            <div className="bg-primary rounded-full px-3 py-1 text-white shadow-sm">REACT</div>
            <div className="text-content-secondary hover:text-content-primary cursor-pointer rounded-full px-3 py-1 transition-colors hover:bg-black/5 dark:hover:bg-white/10">
              NATIVE
            </div>
          </div> */}
        </div>

        {/* Center Section: Tabs (Perfectly Centered on Desktop) */}
        {!!showLayoutTabs && (
          <div className="flex items-center justify-center px-4 max-lg:hidden">
            <LayoutHeaderTabs
              className={cn(headerTabsProps?.className)}
              data-header-tabs=""
              {...headerTabsProps}
              options={tabs}
            />
          </div>
        )}

        {/* Center / Right Section: Search & Icons */}
        <div className="flex flex-1 items-center justify-end">
          <div className="mr-4 flex items-center justify-end">
            {searchToggle.enabled !== false &&
              (searchToggle.components?.lg ? (
                <div className="max-md:hidden">{searchToggle.components.lg}</div>
              ) : (
                <>
                  <DynamicSearchToggle hideIfDisabled className="w-64 max-xl:hidden" />
                  <SearchToggle hideIfDisabled className="p-2 max-md:hidden xl:hidden" />
                </>
              ))}
          </div>

          <nav className="flex items-center gap-4 empty:hidden max-lg:hidden">
            {links
              .filter(
                (item): item is Extract<LinkItemType, { type?: 'main' | 'menu' | 'button' }> =>
                  item.type !== 'icon',
              )
              .map((item, index) => {
                const navKey = `navbar-${index}`;

                return <NavbarLinkItem key={navKey} item={item} />;
              })}
          </nav>

          <div className="ml-2 flex items-center gap-1 rounded-full bg-black/5 px-1 py-1 max-md:hidden dark:bg-white/5">
            {themeSwitchEnabled ? (
              <div className="[&_button]:text-content-secondary [&_button:hover]:text-content-primary flex items-center justify-center transition-colors [&_button]:h-7 [&_button]:w-7 [&_button]:rounded-full [&_button]:border-none [&_button]:bg-transparent [&_button:hover]:bg-black/5 dark:[&_button:hover]:bg-white/10 [&_svg]:size-4">
                {themeSwitch?.component ?? <ThemeToggle mode={themeSwitchMode} />}
              </div>
            ) : null}
            <a
              className="text-content-secondary hover:text-content-primary flex items-center gap-1.5 rounded-full px-3 py-1.5 transition-colors hover:bg-black/5 dark:hover:bg-white/10"
              href="https://github.com/hariharan804/ideasui"
              rel="noreferrer"
              target="_blank"
            >
              <svg
                fill="none"
                height="14"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                width="14"
                xmlns="http://www.w3.org/2000/svg"
              >
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span className="text-xs font-semibold">5.2k</span>
            </a>
          </div>

          {/* Mobile Controls */}
          <div className="flex items-center gap-1 md:hidden">
            {searchToggle.enabled !== false &&
              (searchToggle.components?.sm ?? <SearchToggle hideIfDisabled className="p-2" />)}

            <GitHubButton className="bg-transparent px-2" repo="hariharan804/ideasui" />

            <SidebarTrigger
              className={cn(
                buttonVariants({
                  className:
                    'text-content-secondary hover:bg-surface-subtle hover:text-content-primary p-2 transition-all',
                  color: 'ghost',
                  size: 'icon-sm',
                }),
              )}
            >
              <SidebarIcon />
            </SidebarTrigger>
          </div>

          <div className="flex items-center gap-1 max-md:hidden">
            {!!i18n && (
              <LanguageToggle>
                <Languages className="text-content-secondary size-4.5" />
              </LanguageToggle>
            )}
            {!!sidebarCollapsible && navMode === 'top' && (
              <SidebarCollapseTrigger
                className={cn(
                  buttonVariants({
                    color: 'secondary',
                    size: 'icon-sm',
                  }),
                  'text-content-secondary hover:bg-surface-subtle hover:text-content-primary -me-1.5 rounded-3xl transition-all duration-300 hover:rotate-180',
                )}
              >
                <SidebarIcon />
              </SidebarCollapseTrigger>
            )}
          </div>
        </div>
      </div>
    </LayoutHeader>
  );
}
