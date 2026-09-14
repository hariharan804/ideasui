'use client';

import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import type { SidebarTabWithProps } from 'fumadocs-ui/components/sidebar/tabs/dropdown';
import type { ReactNode, ComponentProps, FC } from 'react';
import type { LinkItemType } from '@/components/docs-ui/link-item';

import { useMemo } from 'react';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import Link from 'fumadocs-core/link';
import { cn } from '@ideasui/utils';

import {
  SidebarContent as SidebarPrimitiveContent,
  SidebarViewport,
  SidebarLinkItem,
  SidebarPageTree,
  SidebarDrawer,
  SidebarTrigger,
  SidebarCollapseTrigger,
} from './sidebar';
import { FilteredSidebarTabsDropdown } from './header';

import { Sidebar as SidebarIcon, X, Languages } from '@/components/docs-ui/icons';
import { LanguageToggle } from '@/components/docs-ui/language-toggle';
import { ThemeToggle } from '@/components/docs-ui/theme-toggle';
import { LinkItem } from '@/components/docs-ui/link-item';

export interface SidebarContentProperties {
  sidebarProps: {
    banner?: ReactNode | FC<ComponentProps<'div'>>;
    footer?: ReactNode | FC<ComponentProps<'div'>>;
    collapsible?: boolean;
    components?: Record<string, FC>;
    [key: string]: unknown;
  };
  links: LinkItemType[];
  nav: {
    title?: ReactNode | FC<ComponentProps<'a'>>;
    url?: string;
    mode?: 'top' | 'auto';
    titleSuffix?: ReactNode;
    titleSuffixGap?: string;
    children?: ReactNode;
  };
  tabs: SidebarTabWithProps[];
  tabMode: string;
  // eslint-disable-next-line sonarjs/deprecation
  i18n: BaseLayoutProps['i18n'];
  themeSwitch: BaseLayoutProps['themeSwitch'];
}

function DefaultHeader({
  className,
  banner,
  children,
  ...properties
}: ComponentProps<'div'> & { banner?: ReactNode }) {
  return (
    <div
      className={cn('flex flex-col gap-3 p-4 !pt-6 pb-2 empty:hidden md:px-6', className)}
      {...properties}
    >
      {children}
      {banner}
    </div>
  );
}

function DefaultFooter({
  className,
  footer,
  iconLinks,
  children,
  ...properties
}: ComponentProps<'div'> & {
  footer?: ReactNode;
  iconLinks: Extract<LinkItemType, { type: 'icon' }>[];
}) {
  return (
    <div
      className={cn(
        'border-border-base/40 text-content-secondary hidden flex-row items-center border-t p-4 pt-2 md:px-6',
        iconLinks.length > 0 && 'max-lg:flex',
        className,
      )}
      {...properties}
    >
      {children}
      {footer}
    </div>
  );
}

/**
 * Renders the list of icon-type navigation links.
 * @param variant - 'sidebar' adds lg:hidden; 'drawer' adds me-auto on last item.
 */
function IconLinkList({
  iconLinks,
  variant,
}: Readonly<{
  iconLinks: Extract<LinkItemType, { type: 'icon' }>[];
  variant: 'sidebar' | 'drawer';
}>) {
  return (
    <>
      {iconLinks.map((item, index) => (
        <LinkItem
          key={item.url}
          aria-label={item.label}
          className={cn(
            buttonVariants({
              color: 'ghost',
              size: 'icon-sm',
            }),
            'text-content-secondary',
            variant === 'sidebar' && 'lg:hidden',
            variant === 'drawer' && index === iconLinks.length - 1 && 'me-auto',
          )}
          item={item}
        >
          {item.icon}
        </LinkItem>
      ))}
    </>
  );
}

export function SidebarContent({
  sidebarProps,
  links,
  nav,
  tabs,
  tabMode,
  i18n,
  themeSwitch,
}: Readonly<SidebarContentProperties>) {
  const { banner, collapsible = true, components, footer, ...rest } = sidebarProps;
  const navMode = nav.mode ?? 'auto';
  const iconLinks = useMemo(
    () =>
      links.filter((item): item is Extract<LinkItemType, { type: 'icon' }> => item.type === 'icon'),
    [links],
  );
  const linkItems = useMemo(() => {
    return links
      .filter((item) => item.type !== 'icon')
      .map((item, index) => ({
        item,
        key: item.type === 'custom' ? `custom-${index}` : item.url || item.text || `link-${index}`,
      }));
  }, [links]);
  const Header = typeof banner === 'function' ? banner : DefaultHeader;
  const Footer = typeof footer === 'function' ? footer : DefaultFooter;

  // Normalize nav.title

  const titleNode = (typeof nav.title === 'function' ? nav.title({}) : nav.title) as ReactNode;

  const viewport = (
    <SidebarViewport>
      {linkItems.map(({ item, key }, index, array) => (
        <SidebarLinkItem
          key={key as string}
          className={cn('lg:hidden', index === array.length - 1 && 'mb-4')}
          item={item}
        />
      ))}

      <SidebarPageTree {...components} />
    </SidebarViewport>
  );

  const themeSwitchEnabled = themeSwitch?.enabled !== false;
  const themeSwitchMode = themeSwitch?.mode ?? 'light-dark-system';
  // eslint-disable-next-line sonarjs/deprecation
  const themeToggle = themeSwitch?.component ?? <ThemeToggle mode={themeSwitchMode} />;

  return (
    <>
      <SidebarPrimitiveContent {...rest}>
        <Header banner={typeof banner === 'function' ? undefined : banner}>
          {navMode === 'auto' && (
            <div className="flex justify-between">
              {nav.titleSuffix ? (
                <div className={cn('flex items-center', nav.titleSuffixGap ?? 'gap-4')}>
                  <Link
                    className="inline-flex items-center gap-2.5 font-medium"
                    href={nav.url ?? '/'}
                  >
                    {titleNode}
                  </Link>
                  {nav.titleSuffix}
                </div>
              ) : (
                <Link
                  className="inline-flex items-center gap-2.5 font-medium"
                  href={nav.url ?? '/'}
                >
                  {titleNode}
                </Link>
              )}
              {!!collapsible && (
                <SidebarCollapseTrigger
                  className={cn(
                    buttonVariants({
                      className: 'text-content-secondary mt-px mb-auto',
                      color: 'ghost',
                      size: 'icon-sm',
                    }),
                  )}
                >
                  <SidebarIcon />
                </SidebarCollapseTrigger>
              )}
            </div>
          )}
          {nav.children}
          {tabs.length > 0 && (
            <FilteredSidebarTabsDropdown
              className={cn('sidebar-tabs-dropdown', tabMode === 'navbar' && 'lg:hidden')}
              options={tabs}
            />
          )}
        </Header>
        {viewport}
        <Footer footer={typeof footer === 'function' ? undefined : footer} iconLinks={iconLinks}>
          <div className="flex w-full items-center justify-between gap-2">
            <IconLinkList iconLinks={iconLinks} variant="sidebar" />
            {themeSwitchEnabled ? (
              <div className="bg-surface-muted text-content-tertiary flex h-8 items-center rounded-full px-1 shadow-xs backdrop-blur-md">
                {themeToggle}
              </div>
            ) : null}
          </div>
        </Footer>
      </SidebarPrimitiveContent>
      <SidebarDrawer {...rest}>
        <Header banner={typeof banner === 'function' ? undefined : banner}>
          <div className="flex items-center justify-between">
            <SidebarTrigger
              className={cn(
                buttonVariants({
                  className: 'text-content-secondary ms-auto',
                  color: 'ghost',
                  size: 'icon-sm',
                }),
              )}
            >
              <X />
            </SidebarTrigger>
          </div>
          {tabs.length > 0 && (
            <FilteredSidebarTabsDropdown className="sidebar-tabs-dropdown mt-2" options={tabs} />
          )}
        </Header>
        {viewport}
        <Footer
          className="border-border-subtle/20 flex flex-col gap-3 border-t p-4"
          footer={typeof footer === 'function' ? undefined : footer}
          iconLinks={iconLinks}
        >
          {themeSwitchEnabled ? (
            <div className="flex w-full items-center justify-end">
              <div className="bg-surface-muted text-content-tertiary flex h-8 items-center rounded-full px-1 shadow-xs backdrop-blur-md">
                {themeToggle}
              </div>
            </div>
          ) : null}
          {(iconLinks.length > 0 || !!i18n) && (
            <div className="border-border-subtle/10 flex w-full items-center justify-between gap-2 border-t pt-1">
              <IconLinkList iconLinks={iconLinks} variant="drawer" />
              {!!i18n && (
                <LanguageToggle>
                  <div className="bg-surface-muted text-content-tertiary flex h-8 items-center rounded-full px-2.5 shadow-xs backdrop-blur-md">
                    <Languages className="size-4" />
                  </div>
                </LanguageToggle>
              )}
            </div>
          )}
        </Footer>
      </SidebarDrawer>
    </>
  );
}
