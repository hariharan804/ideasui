import { notFound, redirect } from 'next/navigation';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import fs from 'node:fs/promises';
import path from 'node:path';

import { source } from '@/lib/source';
import { DocsPage, DocsBody } from '@/components/layout/docs-layout/page';
import { PropsTable } from '@/components/ui/props-table';
import { Code2, BookOpen, Paintbrush } from 'lucide-react';
import { Figma } from '@/components/docs-ui/icons';
import { siteConfig } from '@/config/site';
import { CopyDropdown } from '@/components/docs-ui/copy-dropdown';

// IdeasUI MDX Components
import { Preview } from '@/components/mdx/preview';
import { Related } from '@/components/mdx/related';
import { RelatedShowcases } from '@/components/mdx/related-showcases';
import { Category } from '@/components/mdx/category';
import { Item } from '@/components/mdx/item';
import { InstallTabs } from '@/components/mdx/install-tabs';
import { APIReferenceViewer } from '@/components/mdx/api-reference-viewer';
import { QuickNav } from '@/components/mdx/quick-nav';
import { Pre } from 'fumadocs-ui/components/codeblock';
import { CodeBlock } from '@/components/mdx/codeblock-client';
import { cn } from '@ideasui/utils';

const MAX_LINES_FOR_LINE_NUMBERS = 5;

function extractText(node: unknown): string {
  if (typeof node === 'string') return node;

  if (
    node !== null &&
    typeof node === 'object' &&
    'props' in node &&
    node.props !== null &&
    typeof node.props === 'object' &&
    'children' in node.props
  ) {
    const { children } = node.props;

    if (Array.isArray(children)) {
      return children.map((element) => extractText(element)).join('');
    }

    return extractText(children);
  }

  return '';
}

function MdxPreBlock({
  children,
  ref: _reference,
  className,
  ...properties
}: React.ComponentPropsWithRef<'pre'>) {
  let lineCount = 1;
  const codeContent = extractText(children);

  lineCount = codeContent.split('\n').length;

  const classes = cn(
    'mdx-code-inline-block border-none bg-surface-muted/50!',
    lineCount > MAX_LINES_FOR_LINE_NUMBERS ? 'docs-code-block-line-numbers' : undefined,
    className,
  );

  return (
    <CodeBlock {...properties} className={classes}>
      <Pre>{children}</Pre>
    </CodeBlock>
  );
}

export default async function Page(properties: Readonly<{ params: Promise<{ slug?: string[] }> }>) {
  const parameters = await properties.params;

  if (!parameters.slug || parameters.slug.length === 0) {
    redirect('/react/docs/getting-started');
  }

  const page = source.getPage(parameters.slug);

  if (!page) {
    notFound();
  }

  const pageData = page.data;
  const MdxContent = pageData.body;

  const filePath = page.absolutePath || path.join(process.cwd(), 'content/react', page.path);
  let rawMarkdown = '';

  try {
    rawMarkdown = await fs.readFile(filePath, 'utf8');
  } catch (error) {
    console.error('Failed to read page markdown file:', error);
  }

  return (
    <DocsPage className="!pt-8" full={pageData.full} toc={pageData.toc}>
      <div className="border-subtle relative mb-8 border-b pb-8">
        {/* ── Decorative Background (self-clipped) ──────────────────────────── */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-t-xl">
          {/* Dot grid */}
          <div className="absolute inset-0 -mx-4 bg-[radial-gradient(#88888818_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_50%,transparent_100%)] [background-size:20px_20px] sm:-mx-6 lg:-mx-8" />
          {/* Primary glow */}
          <div className="bg-primary/20 absolute -top-16 -left-8 size-56 rounded-full blur-3xl dark:opacity-50" />
          {/* Secondary accent glow */}
          <div className="bg-secondary/15 absolute -top-8 right-0 size-48 rounded-full blur-3xl" />
          {/* Bottom fade */}
          <div className="from-background absolute right-0 bottom-0 left-0 h-16 bg-gradient-to-t to-transparent" />
        </div>

        {/* ── Breadcrumb ────────────────────────────────────────────────────── */}
        <div className="relative mb-4 flex flex-wrap items-center gap-2">
          <span className="text-primary bg-primary/10 border-primary/25 inline-flex items-center gap-1 rounded-full border px-2.5 py-0.5 text-[9px] font-bold tracking-widest uppercase">
            <span className="bg-primary size-1.5 rounded-full" />
            {parameters.slug?.includes('components') ? 'Component' : 'Guide'}
          </span>
          <span className="text-content-subtle font-mono text-[11px]">
            {parameters.slug ? parameters.slug.join(' › ') : ''}
          </span>
        </div>

        {/* ── Title ─────────────────────────────────────────────────────────── */}
        <h1 className="text-content-primary relative text-3xl font-black tracking-tight sm:text-4xl lg:text-[2.75rem] lg:leading-[1.1]">
          {pageData.title}
        </h1>

        {/* ── Description ───────────────────────────────────────────────────── */}
        <p className="text-content-secondary relative mt-3 mb-7 max-w-2xl text-base leading-relaxed sm:text-[17px]">
          {pageData.description}
        </p>

        {/* ── Interactive Resource Cards ────────────────────────────────────── */}
        <div
          className="relative mt-8 grid gap-3"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))' }}
        >
          {pageData.links?.source && (
            <a
              className="border-subtle bg-surface-subtle/50 hover:bg-surface-subtle hover:border-primary/40 group flex items-center gap-3 rounded-2xl border p-2.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-sm"
              href={`${siteConfig.links.componentsBase}/${pageData.links.source}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className="bg-primary/10 text-primary group-hover:bg-primary/20 flex size-8 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110">
                <Code2 className="size-4" />
              </div>
              <div className="flex min-w-0 flex-col">
                <span className="text-content-primary truncate text-[11px] font-bold tracking-tight">
                  Source
                </span>
                <span className="text-content-tertiary truncate text-[9px] font-medium">
                  View on GitHub
                </span>
              </div>
            </a>
          )}

          {pageData.links?.recipe && (
            <a
              className="border-subtle bg-surface-subtle/50 hover:bg-surface-subtle hover:border-info/40 group flex items-center gap-3 rounded-2xl border p-2.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-sm"
              href={`${siteConfig.links.packageBase}/${pageData.links.recipe}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className="bg-info/10 text-info group-hover:bg-info/20 flex size-8 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110">
                <Paintbrush className="size-4" />
              </div>
              <div className="flex min-w-0 flex-col">
                <span className="text-content-primary truncate text-[11px] font-bold tracking-tight">
                  Recipe
                </span>
                <span className="text-content-tertiary truncate text-[9px] font-medium">
                  Theme Styles
                </span>
              </div>
            </a>
          )}

          {pageData.links?.rac && (
            <a
              className="border-subtle bg-surface-subtle/50 hover:bg-surface-subtle hover:border-success/40 group flex items-center gap-3 rounded-2xl border p-2.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-sm"
              href={pageData.links.rac}
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className="bg-success/10 text-success group-hover:bg-success/20 flex size-8 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110">
                <Code2 className="size-4" />
              </div>
              <div className="flex min-w-0 flex-col">
                <span className="text-content-primary truncate text-[11px] font-bold tracking-tight">
                  React Aria
                </span>
                <span className="text-content-tertiary truncate text-[9px] font-medium">
                  A11y Spec
                </span>
              </div>
            </a>
          )}

          {pageData.links?.storybook && (
            <a
              className="border-subtle bg-surface-subtle/50 hover:bg-surface-subtle hover:border-warning/40 group flex items-center gap-3 rounded-2xl border p-2.5 transition-all duration-300 hover:-translate-y-1 hover:shadow-sm"
              href={`${siteConfig.links.storybook}/?path=/docs/${pageData.links.storybook.toLowerCase().replace('/', '-')}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className="bg-warning/10 text-warning group-hover:bg-warning/20 flex size-8 shrink-0 items-center justify-center rounded-xl transition-transform duration-300 group-hover:scale-110">
                <BookOpen className="size-4" />
              </div>
              <div className="flex min-w-0 flex-col">
                <span className="text-content-primary truncate text-[11px] font-bold tracking-tight">
                  Storybook
                </span>
                <span className="text-content-tertiary truncate text-[9px] font-medium">
                  Playground
                </span>
              </div>
            </a>
          )}

          {pageData.links?.figma && (
            <a
              className="border-subtle bg-surface-subtle/50 hover:bg-surface-subtle group flex items-center gap-3 rounded-2xl border p-2.5 transition-all duration-300 hover:-translate-y-1 hover:border-pink-500/40 hover:shadow-sm"
              href={
                typeof pageData.links.figma === 'string'
                  ? pageData.links.figma
                  : siteConfig.links.figmaDefault
              }
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className="flex size-8 shrink-0 items-center justify-center rounded-xl bg-pink-500/10 text-pink-500 transition-transform duration-300 group-hover:scale-110 group-hover:bg-pink-500/20">
                <Figma className="size-4" />
              </div>
              <div className="flex min-w-0 flex-col">
                <span className="text-content-primary truncate text-[11px] font-bold tracking-tight">
                  Figma UI
                </span>
                <span className="text-content-tertiary truncate text-[9px] font-medium">
                  Design Assets
                </span>
              </div>
            </a>
          )}
        </div>

        {/* ── Copy Markdown Row ─────────────────────────────────────────────── */}
        {rawMarkdown && (
          <div className="border-subtle/50 relative mt-6 flex items-center justify-between border-t pt-4">
            <span className="text-content-subtle text-[11px]">
              Copy as Markdown to use with AI assistants
            </span>
            <CopyDropdown pageTitle={pageData.title ?? ''} rawMarkdown={rawMarkdown} />
          </div>
        )}
      </div>

      <DocsBody>
        <MdxContent
          components={{
            ...defaultMdxComponents,
            PropsTable,
            Preview,
            Related,
            RelatedShowcases,
            Category,
            Item,
            InstallTabs,
            APIReferenceViewer,
            QuickNav,
            pre: MdxPreBlock,
          }}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(properties: { params: Promise<{ slug?: string[] }> }) {
  const parameters = await properties.params;
  const page = source.getPage(parameters.slug);

  if (!page) {
    if (!parameters.slug || parameters.slug.length === 0) {
      return {
        title: 'Documentation',
      };
    }
    notFound();
  }

  const canonicalUrl = `/react/docs/${parameters.slug?.join('/') ?? ''}`;

  return {
    title: page.data.title,
    description: page.data.description,
    openGraph: {
      title: page.data.title,
      description: page.data.description,
      type: 'article',
      url: canonicalUrl,
    },
    twitter: {
      card: 'summary_large_image',
      title: page.data.title,
      description: page.data.description,
    },
    alternates: {
      canonical: canonicalUrl,
    },
  };
}
