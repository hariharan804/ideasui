'use client';

import type { ComponentProps } from 'react';

import * as Base from 'fumadocs-ui/components/sidebar/base';
import { createLinkItemRenderer } from 'fumadocs-ui/components/sidebar/link-item';
import { createPageTreeRenderer } from 'fumadocs-ui/components/sidebar/page-tree';
import { useContext, useRef, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { tv } from 'tailwind-variants';
import { cn } from '@ideasui/utils';

import { LayoutContext } from './context';

import { mergeRefs } from '@/lib/docs/merge-refs';
import { StatusChip, type StatusChipStatus } from '@/components/mdx/status-chip';
import { getComponentInfo } from '@/components-registry';

const itemVariants = tv({
  base: 'relative my-0.5 flex flex-row items-center gap-2 rounded-md px-2.5 py-1.5 text-start text-sm text-content-secondary transition-colors duration-150 [&_svg]:size-4 [&_svg]:shrink-0',
  variants: {
    highlight: {
      true: '',
    },
    variant: {
      button: 'hover:bg-surface-subtle hover:text-content-primary',
      link: 'hover:bg-surface-subtle hover:text-content-primary data-[active=true]:bg-primary/10 data-[active=true]:font-semibold data-[active=true]:text-primary',
    },
  },
});

function getItemOffset(depth: number) {
  return `calc(${2 + 3 * depth} * var(--spacing))`;
}

export const {
  SidebarCollapseTrigger,
  SidebarFolder,
  SidebarProvider: Sidebar,
  SidebarTrigger,
  SidebarViewport,
} = Base;

export function SidebarContent({
  children,
  className,
  ref: referenceProperty,
  ...properties
}: ComponentProps<'aside'>) {
  const context = useContext(LayoutContext);
  const navMode = context?.navMode ?? 'auto';

  const reference = useRef<HTMLElement>(null);

  return (
    <Base.SidebarContent>
      {({ collapsed, hovered, ref: asideReference, ...rest }) => (
        <div
          className={cn(
            'pointer-events-none sticky z-20 [grid-area:sidebar] *:pointer-events-auto max-md:hidden',
            navMode === 'auto'
              ? 'top-(--row-1) h-[calc(var(--docs-height)-var(--row-1))]'
              : 'top-(--row-2) h-[calc(var(--docs-height)-var(--row-2))]',
          )}
          data-sidebar-placeholder=""
        >
          {!!collapsed && <div className="absolute inset-y-0 start-0 w-4" {...rest} />}
          <aside
            ref={mergeRefs(reference, referenceProperty, asideReference)}
            className={cn(
              'bg-surface absolute inset-y-0 start-0 flex w-full flex-col items-end text-sm duration-250 *:w-(--sidebar-width)',
              navMode === 'auto' && 'border-border-subtle/40 border-e',
              collapsed && [
                'border-border-subtle/40 bg-surface inset-y-2 w-(--sidebar-width) rounded-xl border transition-transform',
                hovered
                  ? 'translate-x-2 shadow-lg rtl:-translate-x-2'
                  : '-translate-x-(--sidebar-width) rtl:translate-x-full',
              ],
              reference.current &&
                (reference.current.dataset.collapsed === 'true') !== collapsed &&
                'transition-[width,inset-block,translate,background-color]',
              className,
            )}
            data-collapsed={collapsed}
            data-hovered={!!collapsed && hovered}
            id="nd-sidebar"
            {...properties}
            {...rest}
          >
            {children}
          </aside>
        </div>
      )}
    </Base.SidebarContent>
  );
}

export function SidebarDrawer({
  children,
  className,
  ...properties
}: ComponentProps<typeof Base.SidebarDrawerContent>) {
  const pathname = usePathname();
  const { open, setOpen } = Base.useSidebar();
  const isMounted = useRef(false);

  useEffect(() => {
    if (isMounted.current) {
      setOpen(false);
    } else {
      isMounted.current = true;
    }
  }, [pathname, setOpen]);

  return (
    <>
      <Base.SidebarDrawerOverlay className="data-[state=open]:animate-fd-fade-in data-[state=closed]:animate-fade-out fixed inset-0 z-60 backdrop-blur-xs" />
      {open && (
        <Base.SidebarDrawerContent
          className={cn(
            'data-[state=open]:animate-fd-sidebar-in data-[state=closed]:animate-fade-out bg-surface fixed inset-y-0 end-0 z-60 flex w-[85%] max-w-[320px] flex-col text-[0.9375rem] shadow-lg backdrop-blur-md',
            className,
          )}
          id="nd-sidebar-mobile"
          {...properties}
        >
          {children}
        </Base.SidebarDrawerContent>
      )}
    </>
  );
}

export function SidebarSeparator({
  children,
  className,
  style,
  ...properties
}: ComponentProps<'p'>) {
  const depth = Base.useFolderDepth();

  return (
    <Base.SidebarSeparator
      className={cn(
        'text-content-muted mt-4 mb-1.5 flex items-center px-2.5 text-[11px] font-bold tracking-wider uppercase transition-opacity',
        className,
      )}
      style={{
        paddingInlineStart: getItemOffset(depth),
        ...style,
      }}
      {...properties}
    >
      {children}
    </Base.SidebarSeparator>
  );
}

export function SidebarItem({
  children,
  className,
  icon,
  style,
  onClick,
  ...properties
}: ComponentProps<typeof Base.SidebarItem> & { icon?: React.ReactNode }) {
  const depth = Base.useFolderDepth();
  const { setOpen } = Base.useSidebar();

  const href = (properties as { href?: string }).href ?? '';
  const componentSlug = href.includes('/components/')
    ? href.split('/components/')[1]?.split('/')[0]?.split('#')[0]
    : undefined;

  const componentInfo = componentSlug ? getComponentInfo(componentSlug) : undefined;
  const status: StatusChipStatus | undefined =
    (componentInfo?.status as StatusChipStatus) ||
    (typeof icon === 'string' && ['new', 'updated', 'preview', 'planned'].includes(icon)
      ? (icon as StatusChipStatus)
      : undefined);

  const statusBadge = status ? <StatusChip className="shrink-0" status={status} /> : undefined;

  let renderedIcon = icon;

  if (typeof icon === 'string' && ['new', 'updated', 'preview', 'planned'].includes(icon)) {
    renderedIcon = undefined;
  }

  return (
    <Base.SidebarItem
      className={cn(
        'text-content-secondary hover:text-content-primary data-[active=true]:text-primary relative mt-0.5 flex flex-row items-center justify-start gap-2 rounded-md px-2 py-1.5 text-sm font-medium transition-colors duration-200',
        'hover:from-primary/5 data-[active=true]:from-primary/10 hover:bg-gradient-to-r hover:to-transparent data-[active=true]:bg-gradient-to-r data-[active=true]:to-transparent data-[active=true]:font-semibold',
        '[&_svg]:size-4 [&_svg]:shrink-0',
        className,
      )}
      icon={renderedIcon}
      style={{
        paddingInlineStart: getItemOffset(depth),
        ...style,
      }}
      onClick={(e) => {
        setOpen(false);
        onClick?.(e);
      }}
      {...properties}
    >
      <span className="truncate">{children}</span>
      {statusBadge}
    </Base.SidebarItem>
  );
}

export function SidebarFolderTrigger({
  className,
  style,
  ...properties
}: Readonly<ComponentProps<typeof Base.SidebarFolderTrigger>>) {
  const { collapsible, depth } = Base.useFolder()!;

  return (
    <Base.SidebarFolderTrigger
      className={itemVariants({
        class: `w-full ${className}`,
        variant: collapsible ? 'button' : undefined,
      })}
      style={{
        paddingInlineStart: getItemOffset(depth - 1),
        ...style,
      }}
      {...properties}
    >
      {properties.children}
    </Base.SidebarFolderTrigger>
  );
}

export function SidebarFolderLink({
  className,
  style,
  onClick,
  ...properties
}: ComponentProps<typeof Base.SidebarFolderLink>) {
  const depth = Base.useFolderDepth();
  const { setOpen } = Base.useSidebar();

  return (
    <Base.SidebarFolderLink
      className={cn(itemVariants({ highlight: depth > 1, variant: 'link' }), 'w-full', className)}
      style={{
        paddingInlineStart: getItemOffset(depth - 1),
        ...style,
      }}
      onClick={(e) => {
        setOpen(false);
        onClick?.(e);
      }}
      {...properties}
    >
      {properties.children}
    </Base.SidebarFolderLink>
  );
}

export function SidebarFolderContent({
  children,
  className,
  ...properties
}: Readonly<ComponentProps<typeof Base.SidebarFolderContent>>) {
  return (
    <Base.SidebarFolderContent className={cn('flex flex-col gap-0.5', className)} {...properties}>
      {children}
    </Base.SidebarFolderContent>
  );
}
export const SidebarPageTree = createPageTreeRenderer({
  SidebarFolder,
  SidebarFolderContent,
  SidebarFolderLink,
  SidebarFolderTrigger,
  SidebarItem,
  SidebarSeparator,
});

export const SidebarLinkItem = createLinkItemRenderer({
  SidebarFolder,
  SidebarFolderContent,
  SidebarFolderLink,
  SidebarFolderTrigger,
  SidebarItem,
});
