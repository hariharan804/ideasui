'use client';

import type { AnchorProviderProps, TOCItemType } from 'fumadocs-core/toc';
import type { BreadcrumbProps as BreadcrumbProperties } from './breadcrumb';
import type { FooterProperties } from './footer';
import type { ComponentProps, ReactNode } from 'react';

import { useMemo, isValidElement } from 'react';
import { TOCProvider, TOCScrollArea } from 'fumadocs-ui/components/toc';
import { TOCItems, TOCItem } from 'fumadocs-ui/components/toc/clerk';
import { buttonVariants } from 'fumadocs-ui/components/ui/button';
import { useTranslations } from '@fuma-translate/react';
import { cn } from '@ideasui/utils';

import { PageBreadcrumb } from './breadcrumb';
import { PageFooter } from './footer';
import { PageTOCPopover, PageTOCPopoverContent, PageTOCPopoverTrigger } from './toc-popover';

import { Edit, Text } from '@/components/docs-ui/icons';

interface BreadcrumbOptions extends BreadcrumbProperties {
  enabled: boolean;
  component: ReactNode;
}

interface FooterOptions extends FooterProperties {
  enabled: boolean;
  component: ReactNode;
}

export interface DocsPageProps {
  toc?: TOCItemType[];
  tableOfContent?: Partial<TableOfContentOptions>;
  tableOfContentPopover?: Partial<TableOfContentPopoverOptions>;
  full?: boolean;
  breadcrumb?: Partial<BreadcrumbOptions>;
  footer?: Partial<FooterOptions>;
  children?: ReactNode;
  className?: string;
}

type TableOfContentOptions = Pick<AnchorProviderProps, 'single'> & {
  header?: ReactNode;
  footer?: ReactNode;
  enabled: boolean;
  component: ReactNode;
  style?: 'normal' | 'clerk';
};

type TableOfContentPopoverOptions = Omit<TableOfContentOptions, 'single'>;

function extractText(node: ReactNode): string {
  if (!node) {
    return '';
  }
  if (typeof node === 'string') {
    return node;
  }
  if (typeof node === 'number') {
    return String(node);
  }
  if (Array.isArray(node)) {
    return node.map((it) => extractText(it)).join('');
  }
  if (
    isValidElement(node) &&
    node.props &&
    typeof node.props === 'object' &&
    'children' in node.props
  ) {
    return extractText(node.props.children as ReactNode);
  }

  return '';
}

const defaultWrapper = (children: ReactNode) => children;

// eslint-disable-next-line sonarjs/function-return-type
export function DocsPage({
  breadcrumb: {
    component: breadcrumb,
    enabled: breadcrumbEnabled = true,
    ...breadcrumbProperties
  } = {},
  children,
  className,
  footer = {},
  full = false,
  tableOfContent: { component: tocReplace, enabled: tocEnabled, ...tocOptions } = {},
  tableOfContentPopover: {
    component: tocPopover,
    enabled: tocPopoverEnabled,
    ...tocPopoverOptions
  } = {},
  toc = [],
}: DocsPageProps) {
  const t = useTranslations({ note: 'table of contents' });
  const currentToc = useMemo(() => {
    const rawToc = Array.isArray(toc) ? toc : [];

    return rawToc
      .filter(
        (item): item is TOCItemType =>
          item !== null && typeof item === 'object' && typeof item.url === 'string',
      )
      .map((item) => {
        const title = item.title;
        const cleanTitle = extractText(title) ?? 'Untitled';

        return {
          ...item,
          title: cleanTitle,
        };
      });
  }, [toc]);

  tocEnabled ??=
    !full &&
    (currentToc.length > 0 || tocOptions.footer !== undefined || tocOptions.header !== undefined);

  tocPopoverEnabled ??=
    currentToc.length > 0 ||
    tocPopoverOptions.header !== undefined ||
    tocPopoverOptions.footer !== undefined;

  let wrapper = defaultWrapper;

  if (tocEnabled || tocPopoverEnabled) {
    wrapper = (children) => (
      <TOCProvider single={tocOptions.single} toc={currentToc}>
        {children}
      </TOCProvider>
    );
  }

  return wrapper(
    <>
      {!!tocPopoverEnabled &&
        (tocPopover ?? (
          <PageTOCPopover>
            <PageTOCPopoverTrigger />
            <PageTOCPopoverContent>
              {tocPopoverOptions.header}
              <TOCScrollArea>
                {currentToc.length > 0 && TOCItems ? (
                  <TOCItems>
                    {currentToc.map((item) => (
                      <TOCItem key={item.url} item={item} />
                    ))}
                  </TOCItems>
                ) : null}
              </TOCScrollArea>
              {tocPopoverOptions.footer}
            </PageTOCPopoverContent>
          </PageTOCPopover>
        ))}
      <article
        className={cn(
          'flex flex-col gap-4 px-4 py-6 [grid-area:main] *:max-w-[900px] md:px-6 md:pt-4 xl:px-8 xl:pt-6',
          full && '*:max-w-[1285px]',
          className,
        )}
        data-full={full}
        id="nd-page"
      >
        {!!breadcrumbEnabled && (breadcrumb ?? <PageBreadcrumb {...breadcrumbProperties} />)}
        {children}
        {footer.enabled !== false && (footer.component ?? <PageFooter items={footer.items} />)}
      </article>
      {!!tocEnabled &&
        (tocReplace ?? (
          <div
            className="xl:layout:[--toc-width:268px] sticky top-(--row-3) flex h-[calc(var(--docs-height)-var(--row-3))] w-(--toc-width) flex-col pe-4 pt-8 pb-2 [grid-area:toc] max-xl:hidden"
            id="nd-toc"
          >
            {tocOptions.header}
            <h3
              className="text-content-secondary inline-flex items-center gap-1.5 text-sm"
              id="toc-title"
            >
              <Text className="size-4" />
              {t('On this page')}
            </h3>
            <TOCScrollArea>
              {currentToc.length > 0 && TOCItems ? (
                <TOCItems>
                  {currentToc.map((item) => (
                    <TOCItem key={item.url} item={item} />
                  ))}
                </TOCItems>
              ) : null}
            </TOCScrollArea>
            {tocOptions.footer}
          </div>
        ))}
    </>,
  );
}

export function EditOnGitHub(properties: ComponentProps<'a'>) {
  const t = useTranslations({ note: 'page actions' });

  return (
    <a
      rel="noreferrer noopener"
      target="_blank"
      {...properties}
      className={cn(
        buttonVariants({
          className: 'not-prose gap-1.5',
          color: 'secondary',
          size: 'sm',
        }),
        properties.className,
      )}
    >
      {properties.children ?? (
        <>
          <Edit className="size-3.5" />
          {t('Edit on GitHub')}
        </>
      )}
    </a>
  );
}

export function DocsBody({ children, className, ...properties }: ComponentProps<'div'>) {
  return (
    <div {...properties} className={cn('prose flex-1', className)}>
      {children}
    </div>
  );
}

export function DocsDescription({ children, className, ...properties }: ComponentProps<'p'>) {
  if (children === undefined) {
    return null;
  }

  return (
    <p {...properties} className={cn('text-content-secondary mb-8 text-lg', className)}>
      {children}
    </p>
  );
}

export function DocsTitle({ children, className, ...properties }: ComponentProps<'h1'>) {
  return (
    <h1 {...properties} className={cn('text-[1.75em] font-semibold', className)}>
      {children}
    </h1>
  );
}

export { PageBreadcrumb } from './breadcrumb';

export { PageLastUpdate } from './footer';
