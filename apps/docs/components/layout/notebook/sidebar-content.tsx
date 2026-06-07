/* eslint-disable @typescript-eslint/no-explicit-any, react/no-array-index-key */
'use client';

import type { BaseLayoutProps } from 'fumadocs-ui/layouts/shared';
import type { SidebarTabWithProps } from 'fumadocs-ui/components/sidebar/tabs/dropdown';
import type { ReactNode, ComponentProps, FC } from 'react';
import type { LinkItemType } from '@/components/ui/docs/link-item';

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

import { Sidebar as SidebarIcon, X, Languages } from '@/components/ui/docs/icons';
import { LanguageToggle } from '@/components/ui/docs/language-toggle';
import { ThemeToggle } from '@/components/ui/docs/theme-toggle';
import { LinkItem } from '@/components/ui/docs/link-item';

export interface SidebarContentProps {
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
  i18n: BaseLayoutProps['i18n'];
  themeSwitch: BaseLayoutProps['themeSwitch'];
}

function DefaultHeader({
  className,
  banner,
  children,
  ...props
}: ComponentProps<'div'> & { banner?: ReactNode }) {
  return (
    <div
      className={cn('flex flex-col gap-3 px-4 py-4 !pt-6 pb-2 empty:hidden md:px-6', className)}
      {...props}
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
  ...props
}: ComponentProps<'div'> & {
  footer?: ReactNode;
  iconLinks: Extract<LinkItemType, { type: 'icon' }>[];
}) {
  return (
    <div
      className={cn(
        'text-content-secondary border-base/40 hidden flex-row items-center border-t px-4 py-4 pt-2 md:px-6',
        iconLinks.length > 0 && 'max-lg:flex',
        className,
      )}
      {...props}
    >
      {children}
      {footer}
    </div>
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
}: SidebarContentProps) {
  const { banner, collapsible = true, components, footer, ...rest } = sidebarProps;
  const navMode = nav.mode ?? 'auto';
  const iconLinks = useMemo(
    () =>
      links.filter((item): item is Extract<LinkItemType, { type: 'icon' }> => item.type === 'icon'),
    [links],
  );

  const Header = typeof banner === 'function' ? banner : DefaultHeader;
  const Footer = typeof footer === 'function' ? footer : DefaultFooter;

  // Normalize nav.title

  const titleNode = (
    typeof nav.title === 'function' ? nav.title({} as ComponentProps<'a'>) : nav.title
  ) as any;

  const viewport = (
    <SidebarViewport>
      {links
        .filter((item) => item.type !== 'icon')
        .map((item, i, arr) => (
          <SidebarLinkItem
            key={i}
            className={cn('lg:hidden', i === arr.length - 1 && 'mb-4')}
            item={item}
          />
        ))}

      <SidebarPageTree {...components} />
    </SidebarViewport>
  );

  const themeSwitchEnabled = themeSwitch?.enabled !== false;
  const themeSwitchMode = themeSwitch?.mode ?? 'light-dark-system';

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
              className={cn(tabMode === 'navbar' && 'lg:hidden')}
              options={tabs}
            />
          )}
        </Header>
        {viewport}
        <Footer footer={typeof footer === 'function' ? undefined : footer} iconLinks={iconLinks}>
          {iconLinks.map((item, i) => (
            <LinkItem
              key={i}
              aria-label={item.label}
              className={cn(
                buttonVariants({
                  className: 'lg:hidden',
                  color: 'ghost',
                  size: 'icon-sm',
                }),
              )}
              item={item}
            >
              {item.icon}
            </LinkItem>
          ))}
        </Footer>
      </SidebarPrimitiveContent>
      <SidebarDrawer {...rest}>
        <Header banner={typeof banner === 'function' ? undefined : banner}>
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
          {/* Tabs are hidden on mobile view as requested */}
        </Header>
        {viewport}
        <Footer
          className={cn(
            'hidden flex-row items-center justify-end',
            (!!i18n || themeSwitchEnabled) && 'flex',
            iconLinks.length > 0 && 'max-lg:flex',
          )}
          footer={typeof footer === 'function' ? undefined : footer}
          iconLinks={iconLinks}
        >
          {iconLinks.map((item, i) => (
            <LinkItem
              key={i}
              aria-label={item.label}
              className={cn(
                buttonVariants({
                  color: 'ghost',
                  size: 'icon-sm',
                }),
                'text-content-secondary lg:hidden',
                i === iconLinks.length - 1 && 'me-auto',
              )}
              item={item}
            >
              {item.icon}
            </LinkItem>
          ))}
          {!!i18n && (
            <LanguageToggle>
              <Languages className="text-content-secondary size-4.5" />
            </LanguageToggle>
          )}
          {themeSwitchEnabled
            ? (themeSwitch?.component ?? <ThemeToggle mode={themeSwitchMode} />)
            : null}
        </Footer>
      </SidebarDrawer>
    </>
  );
}
