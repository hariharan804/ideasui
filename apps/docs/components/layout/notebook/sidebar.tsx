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

const itemVariants = tv({
  base: 'text-content-secondary relative flex flex-row items-center gap-2.5 rounded-lg px-3 py-2 text-start transition-all duration-200 [&_svg]:size-4 [&_svg]:shrink-0 my-0.5 mx-2',
  variants: {
    highlight: {
      true: '',
    },
    variant: {
      button: 'hover:bg-surface/50 hover:text-content-primary',
      link: 'hover:bg-surface/40 hover:text-content-primary data-[active=true]:bg-primary/10 data-[active=true]:text-primary data-[active=true]:font-semibold transition-all duration-200',
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
  ref: refProp,
  ...props
}: ComponentProps<'aside'>) {
  const context = useContext(LayoutContext);
  const navMode = context?.navMode ?? 'auto';

  const ref = useRef<HTMLElement>(null);

  return (
    <Base.SidebarContent>
      {({ collapsed, hovered, ref: asideRef, ...rest }) => (
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
            ref={mergeRefs(ref, refProp, asideRef)}
            className={cn(
              'absolute inset-y-0 start-0 flex w-full flex-col items-end text-sm duration-250 *:w-(--sidebar-width)',
              navMode === 'auto' && 'bg-surface border-subtle/40 border-e',
              collapsed && [
                'bg-surface border-subtle/40 inset-y-2 w-(--sidebar-width) rounded-xl border transition-transform',
                hovered
                  ? 'translate-x-2 shadow-lg rtl:-translate-x-2'
                  : '-translate-x-(--sidebar-width) rtl:translate-x-full',
              ],
              ref.current &&
                (ref.current.getAttribute('data-collapsed') === 'true') !== collapsed &&
                'transition-[width,inset-block,translate,background-color]',
              className,
            )}
            data-collapsed={collapsed}
            data-hovered={!!collapsed && hovered}
            id="nd-sidebar"
            {...props}
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
  ...props
}: ComponentProps<typeof Base.SidebarDrawerContent>) {
  const pathname = usePathname();
  const { setOpen } = Base.useSidebar();

  useEffect(() => {
    setOpen(false);
  }, [pathname, setOpen]);

  return (
    <>
      <Base.SidebarDrawerOverlay className="data-[state=open]:animate-fd-fade-in data-[state=closed]:animate-fd-fade-out fixed inset-0 z-60 backdrop-blur-xs" />
      <Base.SidebarDrawerContent
        className={cn(
          'bg-surface/90 data-[state=open]:animate-fd-sidebar-in data-[state=closed]:animate-fd-sidebar-out fixed inset-y-0 end-0 z-60 flex w-[85%] max-w-[320px] flex-col text-[0.9375rem] shadow-lg backdrop-blur-md',
          className,
        )}
        {...props}
      >
        {children}
      </Base.SidebarDrawerContent>
    </>
  );
}

export function SidebarSeparator({ children, className, style, ...props }: ComponentProps<'p'>) {
  const depth = Base.useFolderDepth();

  return (
    <Base.SidebarSeparator
      className={cn(
        'text-content-muted mt-8 mb-2 flex items-center gap-2 text-[11px] font-bold tracking-[0.1em] uppercase transition-opacity',
        className,
      )}
      style={{
        paddingInlineStart: getItemOffset(depth),
        ...style,
      }}
      {...props}
    >
      <span className="bg-surface-muted h-px flex-1" />
      <span className="relative flex-none">{children}</span>
      <span className="bg-surface-muted h-px flex-1" />
    </Base.SidebarSeparator>
  );
}

export function SidebarItem({
  children,
  className,
  style,
  onClick,
  ...props
}: ComponentProps<typeof Base.SidebarItem>) {
  const depth = Base.useFolderDepth();
  const { setOpen } = Base.useSidebar();

  return (
    <Base.SidebarItem
      className={cn(itemVariants({ highlight: depth >= 1, variant: 'link' }), className)}
      style={{
        paddingInlineStart: getItemOffset(depth),
        ...style,
      }}
      onClick={(e) => {
        setOpen(false);
        onClick?.(e);
      }}
      {...props}
    >
      {children}
    </Base.SidebarItem>
  );
}

export function SidebarFolderTrigger({
  className,
  style,
  ...props
}: ComponentProps<typeof Base.SidebarFolderTrigger>) {
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
      {...props}
    >
      {props.children}
    </Base.SidebarFolderTrigger>
  );
}

export function SidebarFolderLink({
  className,
  style,
  onClick,
  ...props
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
      {...props}
    >
      {props.children}
    </Base.SidebarFolderLink>
  );
}

export function SidebarFolderContent({
  children,
  className,
  ...props
}: ComponentProps<typeof Base.SidebarFolderContent>) {
  const depth = Base.useFolderDepth();

  return (
    <Base.SidebarFolderContent
      className={cn(
        itemVariants({
          class: 'relative',
          highlight: depth === 1,
        }),
        className,
      )}
      {...props}
    >
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
