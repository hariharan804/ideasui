/* eslint-disable @typescript-eslint/no-explicit-any, sonarjs/deprecation */

'use client';

import type { LinkItemType, MenuItemType } from '@/components/docs-ui/link-item';
import type { SidebarTabWithProps } from 'fumadocs-ui/components/sidebar/tabs/dropdown';
import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import type { ComponentProps, HTMLAttributes, PointerEvent, ReactNode, FC } from 'react';
import type { LayoutHeaderTabsProps as LayoutHeaderTabsProperties } from './header';

import { useState, useRef, Fragment } from 'react';
import { ChevronDown, Palette, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
import {
  ThemeCustomizerModal,
  useInitThemeCustomizer,
} from '@/components/docs-ui/theme-customizer-modal';
import { ROUTES } from '@/config/routes';

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

/**
 * Shared pill/circle container used for navbar action buttons (Theme, Language, etc.).
 * Provides a consistent frosted-glass appearance across all icon controls.
 */
function NavbarPill({ children, className, ...properties }: ComponentProps<'div'>) {
  return (
    <div
      className={cn(
        'bg-surface-muted text-content-tertiary',
        'flex h-8 items-center justify-center rounded-full px-2.5 backdrop-blur-md transition-all active:scale-95',
        'hover:text-content-primary',
        className,
      )}
      {...properties}
    >
      {children}
    </div>
  );
}

/** Pill variant that renders as a semantic `<button>` element. */
function NavbarPillButton({ children, className, ...properties }: ComponentProps<'button'>) {
  return (
    <button
      className={cn(
        'bg-surface-muted text-content-tertiary',
        'flex h-8 cursor-pointer items-center gap-1.5 rounded-full px-3.5 backdrop-blur-md transition-all active:scale-95',
        'hover:bg-surface-subtle hover:text-content-primary',
        className,
      )}
      type="button"
      {...properties}
    >
      {children}
    </button>
  );
}

export interface DocsNavbarProps {
  headerTabsProps?: LayoutHeaderTabsProperties;
  i18n?: BaseLayoutProps['i18n'];
  isLanding?: boolean;
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

function NavbarDesktopActions({
  i18n,
  isLanding,
  onOpenThemeModal,
  themeSwitch,
  themeSwitchEnabled,
  themeSwitchMode,
}: Readonly<{
  i18n?: BaseLayoutProps['i18n'];
  isLanding: boolean;
  onOpenThemeModal: () => void;
  themeSwitch?: BaseLayoutProps['themeSwitch'];
  themeSwitchEnabled: boolean;
  themeSwitchMode: 'light-dark' | 'light-dark-system';
}>) {
  return (
    <div className="ml-2 flex items-center gap-1.5 max-md:hidden sm:gap-2">
      <NavbarPillButton
        aria-label="Customize Theme"
        className="bg-primary-subtle hover:bg-primary-muted text-primary hover:text-primary cursor-pointer gap-1.5 px-2.5 text-xs font-medium transition-colors sm:px-3.5"
        onClick={onOpenThemeModal}
      >
        <Palette className="size-4" />
        <span
          className="size-4 rounded-full shadow-xs transition-colors"
          style={{ backgroundColor: 'oklch(var(--ideasui-color-primary))' }}
        />
        <span className="hidden xl:inline">Theme</span>
      </NavbarPillButton>

      <GitHubButton repo="ideas2logic-lab/ideasui" />

      {!!i18n && (
        <LanguageToggle>
          <NavbarPill>
            <Languages className="size-4" />
          </NavbarPill>
        </LanguageToggle>
      )}

      {themeSwitchEnabled ? (
        <NavbarPill className="px-1">
          {themeSwitch?.component ?? <ThemeToggle mode={themeSwitchMode} />}
        </NavbarPill>
      ) : null}

      {isLanding && (
        <Link
          className="bg-primary text-on-primary hover:bg-primary/95 shadow-primary/20 ml-1 inline-flex h-8.5 items-center gap-1.5 rounded-full px-4 text-xs font-semibold shadow-sm transition-all duration-200 hover:shadow-md active:scale-95 max-md:hidden"
          href={ROUTES.docs.start}
        >
          <span>Get Started</span>
          <ArrowRight className="size-3.5" />
        </Link>
      )}
    </div>
  );
}

function getHeaderBodyClassName(isLanding: boolean, isTop: boolean): string {
  if (isLanding) {
    return cn(
      'w-[95%] max-w-7xl gap-3 transition-all duration-300 sm:w-[92%] lg:w-[88%]',
      isTop
        ? 'rounded-none border-transparent bg-transparent shadow-none backdrop-blur-none px-4.5 sm:px-6'
        : 'bg-surface/90 border-border-subtle/80 rounded-full border px-4.5 shadow-xl backdrop-blur-2xl sm:px-6',
    );
  }

  return cn(
    'max-w-[95%] min-w-10 gap-2 border transition-all duration-300 pr-3 pl-4 backdrop-blur-md sm:gap-4 sm:py-2 sm:pl-5 md:gap-6 md:pl-6',
    isTop
      ? 'rounded-none border-transparent bg-transparent shadow-none'
      : 'border-surface-muted bg-surface/85 rounded-full shadow-sm',
  );
}

export function DocsNavbar({
  headerTabsProps,
  i18n,
  isLanding = false,
  links,
  nav = {},
  searchToggle = {},
  sidebar: { collapsible: sidebarCollapsible = true } = {},
  tabMode = 'sidebar',
  tabs = [],
  themeSwitch = {},
}: Readonly<DocsNavbarProps>) {
  const navMode = nav.mode ?? 'auto';
  const showLayoutTabs = tabMode === 'navbar' && tabs.length > 0;
  const isTop = useIsScrollTop({ enabled: true }) ?? true;
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const titleNode = (
    typeof nav.title === 'function' ? nav.title({} as ComponentProps<'a'>) : nav.title
  ) as any;

  const themeSwitchEnabled = themeSwitch?.enabled !== false;
  const themeSwitchMode = themeSwitch?.mode ?? 'light-dark-system';

  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);

  useInitThemeCustomizer();

  const HeaderComponent = isLanding ? 'header' : LayoutHeader;

  return (
    <HeaderComponent
      className={cn(
        isLanding
          ? 'fixed top-0 right-0 left-0 z-50 flex w-full [transform:translateZ(0)] flex-col border-none bg-transparent pt-3 backdrop-blur-none transition-all duration-300 sm:pt-4'
          : 'top-(--row-1) border-none bg-transparent pt-4 backdrop-blur-none [grid-area:header]',
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
          'relative z-50 mx-auto flex h-14 w-full items-center justify-between transition-all duration-300',
          getHeaderBodyClassName(isLanding, isTop),
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
            'flex items-center gap-2.5 sm:gap-4',
            isLanding && 'z-10 flex items-center',
            !isLanding && navMode === 'top' && 'flex-1',
            !isLanding && navMode === 'auto' && 'max-md:flex has-data-[collapsed=true]:md:flex',
            !isLanding && navMode === 'auto' && 'hidden md:items-center',
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
          {!isLanding && searchToggle.enabled !== false && (
            <div className="mr-2 flex items-center justify-end sm:mr-4">
              {searchToggle.components?.lg ? (
                <div className="max-md:hidden">{searchToggle.components.lg}</div>
              ) : (
                <>
                  <DynamicSearchToggle hideIfDisabled className="w-64 max-xl:hidden" />
                  <SearchToggle hideIfDisabled className="p-2 max-md:hidden xl:hidden" />
                </>
              )}
            </div>
          )}

          <nav
            className={cn(
              'flex items-center gap-2 empty:hidden max-lg:hidden sm:gap-3 lg:gap-4',
              isLanding && 'absolute left-1/2 -translate-x-1/2 gap-6 max-md:hidden',
            )}
          >
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

          <NavbarDesktopActions
            i18n={i18n}
            isLanding={isLanding}
            themeSwitch={themeSwitch}
            themeSwitchEnabled={themeSwitchEnabled}
            themeSwitchMode={themeSwitchMode}
            onOpenThemeModal={() => setIsThemeModalOpen(true)}
          />

          {/* Mobile Controls */}
          <div className="flex items-center gap-1 sm:gap-1.5 md:hidden">
            {/* Theme Customizer Pill (Mobile) */}
            <NavbarPillButton
              aria-label="Customize Theme"
              className="relative cursor-pointer px-2 text-xs font-medium"
              onClick={() => setIsThemeModalOpen(true)}
            >
              <Palette className="size-4" />
              <span
                className="absolute top-1 right-1 size-1.5 rounded-full shadow-xs transition-colors"
                style={{ backgroundColor: 'oklch(var(--ideasui-color-primary))' }}
              />
            </NavbarPillButton>

            {!isLanding &&
              searchToggle.enabled !== false &&
              (searchToggle.components?.sm ?? <SearchToggle hideIfDisabled className="p-2" />)}

            <div className="xs:inline-flex hidden">
              <GitHubButton repo="ideas2logic-lab/ideasui" />
            </div>

            {sidebarCollapsible ? (
              <>
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
                {navMode === 'top' && (
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
              </>
            ) : (
              <button
                aria-label="Toggle mobile menu"
                className="text-content-primary bg-surface-subtle hover:bg-surface-muted flex size-9 items-center justify-center rounded-full border transition-all active:scale-95"
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="size-4.5" /> : <Menu className="size-4.5" />}
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation Drawer for Non-Sidebar pages */}
      {!sidebarCollapsible && (
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="border-surface-muted bg-surface-overlay/95 mx-auto mt-2.5 w-[92%] max-w-lg overflow-hidden rounded-2xl border p-5 shadow-2xl backdrop-blur-2xl md:hidden"
              exit={{ opacity: 0, y: -10, scale: 0.97 }}
              initial={{ opacity: 0, y: -10, scale: 0.97 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
            >
              <nav className="flex flex-col gap-1.5">
                {links.map((item, index) => {
                  const itemUrl = (item as any).url ?? '#';
                  const itemText =
                    (item as any).text ?? (item as any).label ?? (item as any).title ?? '';
                  const keyId = itemUrl === '#' ? `mobile-link-${index}` : `mobile-link-${itemUrl}`;

                  return (
                    <Link
                      key={keyId}
                      className="hover:bg-surface-muted text-content-primary flex min-h-[44px] items-center gap-2.5 rounded-xl px-3.5 text-sm font-semibold transition-colors"
                      href={itemUrl}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {(item as any).icon}
                      <span>{itemText}</span>
                    </Link>
                  );
                })}

                {links.length === 0 &&
                  tabs.map((tab, index) => {
                    const tabUrl = (tab as any).url ?? '#';
                    const tabTitle = (tab as any).title ?? (tab as any).text ?? '';
                    const keyId = `mobile-tab-${index}-${tabUrl}`;

                    return (
                      <Link
                        key={keyId}
                        className="hover:bg-surface-muted text-content-primary flex min-h-[44px] items-center gap-2.5 rounded-xl px-3.5 text-sm font-semibold transition-colors"
                        href={tabUrl}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {(tab as any).icon}
                        <span>{tabTitle}</span>
                      </Link>
                    );
                  })}
              </nav>

              {isLanding && (
                <div className="border-surface-muted mt-4 flex flex-col gap-2.5 border-t pt-4">
                  <Link
                    className="bg-primary text-on-primary hover:bg-primary/90 flex min-h-[44px] items-center justify-center gap-2 rounded-xl text-xs font-semibold shadow-md transition-all active:scale-98"
                    href={ROUTES.docs.start}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span>Get Started</span>
                    <ArrowRight className="size-3.5" />
                  </Link>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      )}

      <ThemeCustomizerModal isOpen={isThemeModalOpen} onClose={() => setIsThemeModalOpen(false)} />
    </HeaderComponent>
  );
}
