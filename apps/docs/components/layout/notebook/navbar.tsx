/* eslint-disable @typescript-eslint/no-explicit-any */

'use client';

import type { LinkItemType, MenuItemType } from '@/components/ui/docs/link-item';
import type { SidebarTabWithProps } from 'fumadocs-ui/components/sidebar/tabs/dropdown';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import type { ComponentProps, HTMLAttributes, PointerEvent, ReactNode, FC } from 'react';
import type { LayoutHeaderTabsProps } from './header';

import { useState, useRef, Fragment } from 'react';
import { ChevronDown } from 'lucide-react';
import Link from 'fumadocs-core/link';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from 'fumadocs-ui/components/ui/popover';
import { cn } from '@ideasui/utils';

import { SidebarCollapseTrigger, SidebarTrigger } from './sidebar';
import { LayoutHeader, LayoutHeaderTabs } from './header';

import { Sidebar as SidebarIcon, Languages } from '@/components/ui/docs/icons';
import { DynamicSearchToggle, SearchToggle } from '@/components/ui/docs/search-toggle';
import { GitHubButton } from '@/components/ui/docs/github-button';
import { ThemeToggle } from '@/components/ui/docs/theme-toggle';
import { LanguageToggle } from '@/components/ui/docs/language-toggle';
import { LinkItem } from '@/components/ui/docs/link-item';

export function NavbarLinkItem({
  className,
  item,
  ...props
}: { item: LinkItemType } & HTMLAttributes<HTMLElement>) {
  if (item.type === 'custom') {
    return item.children;
  }

  if (item.type === 'menu') {
    return <NavbarLinkItemMenu className={className} item={item} {...props} />;
  }

  return (
    <LinkItem
      className={cn(
        'text-content-secondary hover:text-content-primary data-[active=true]:text-primary text-sm transition-colors',
        className,
      )}
      item={item}
      {...props}
    >
      {item.text}
    </LinkItem>
  );
}

function isTouchDevice() {
  return (
    typeof window !== 'undefined' && ('ontouchstart' in window || navigator.maxTouchPoints > 0)
  );
}

function NavbarLinkItemMenu({
  className,
  hoverDelay = 50,
  item,
  ...props
}: { item: MenuItemType; hoverDelay?: number } & HTMLAttributes<HTMLElement>) {
  const [open, setOpen] = useState(false);
  const timeoutRef = useRef<number>(null);
  const freezeUntil = useRef<number>(null);

  const delaySetOpen = (value: boolean) => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    timeoutRef.current = window.setTimeout(() => {
      setOpen(value);
      freezeUntil.current = Date.now() + 300;
    }, hoverDelay);
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
        {...props}
      >
        {item.url ? <LinkItem item={item as { url: string }}>{item.text}</LinkItem> : item.text}
        <ChevronDown className="size-3" />
      </PopoverTrigger>
      <PopoverContent
        className="text-content-secondary flex flex-col p-1 text-start"
        onPointerEnter={onPointerEnter}
        onPointerLeave={onPointerLeave}
      >
        {item.items.map((child, i) => {
          const keyId = `item-${i}`;

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
  headerTabsProps?: LayoutHeaderTabsProps;
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
}: DocsNavbarProps) {
  const navMode = nav.mode ?? 'auto';
  const showLayoutTabs = tabMode === 'navbar' && tabs.length > 0;

  // Normalize nav.title

  const titleNode = (
    typeof nav.title === 'function' ? nav.title({} as ComponentProps<'a'>) : nav.title
  ) as any;

  const themeSwitchEnabled = themeSwitch?.enabled !== false;
  const themeSwitchMode = themeSwitch?.mode ?? 'light-dark-system';

  return (
    <LayoutHeader
      className={cn('top-(--row-1) [grid-area:header]', showLayoutTabs ? 'h-auto pb-0' : '')}
      id="nd-subnav"
    >
      <div
        className="mx-auto flex h-14 w-full max-w-[1440px] items-center px-4 md:px-6"
        data-header-body=""
      >
        {/* Left Section */}
        <div
          className={cn(
            'flex flex-1 items-center gap-2',
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
        </div>

        {/* Center Section: Search */}
        <div className="flex flex-1 justify-center px-4">
          {searchToggle.enabled !== false &&
            (searchToggle.components?.lg ? (
              <div className="max-md:hidden">{searchToggle.components.lg}</div>
            ) : (
              <DynamicSearchToggle hideIfDisabled className="max-md:hidden" />
            ))}
        </div>

        {/* Right Section */}
        <div className="flex flex-1 items-center justify-end gap-3 md:gap-6">
          <nav className="flex items-center gap-5 empty:hidden max-lg:hidden">
            {links
              .filter(
                (item): item is Extract<LinkItemType, { type?: 'main' | 'menu' | 'button' }> =>
                  item.type !== 'icon',
              )
              .map((item, i) => {
                const navKey = `navbar-${i}`;

                return <NavbarLinkItem key={navKey} item={item} />;
              })}
          </nav>

          <div className="flex items-center gap-2">
            <GitHubButton className="max-lg:hidden" repo="hariharan804/ideasui" />

            <div className="flex items-center gap-1.5">
              {links
                .filter(
                  (item): item is Extract<LinkItemType, { type: 'icon' }> =>
                    item.type === 'icon' && !item.url?.includes('github.com'),
                )
                .map((item, i) => {
                  const iconKey = `icon-${i}`;

                  return (
                    <LinkItem
                      key={iconKey}
                      aria-label={item.label}
                      className={cn(
                        buttonVariants({ color: 'ghost', size: 'icon-sm' }),
                        'text-content-secondary hover:bg-surface-subtle hover:text-content-primary max-lg:hidden',
                      )}
                      item={item}
                    >
                      {item.icon}
                    </LinkItem>
                  );
                })}
            </div>
          </div>

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
            {themeSwitchEnabled
              ? (themeSwitch?.component ?? <ThemeToggle mode={themeSwitchMode} />)
              : null}
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
      {!!showLayoutTabs && (
        <div className="mx-auto w-full max-w-[1440px] px-4 md:px-6">
          <LayoutHeaderTabs
            className={cn(headerTabsProps?.className)}
            data-header-tabs=""
            {...headerTabsProps}
            options={tabs}
          />
        </div>
      )}
    </LayoutHeader>
  );
}
