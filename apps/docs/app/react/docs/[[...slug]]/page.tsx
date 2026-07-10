import { notFound, redirect } from 'next/navigation';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import fs from 'node:fs/promises';
import path from 'node:path';

import { source } from '@/lib/source';
import { DocsPage, DocsBody } from '@/components/layout/notebook/page';
import { PropsTable } from '@/components/ui/props-table';
import { Code2, BookOpen, Paintbrush } from 'lucide-react';
import { Figma } from '@/components/ui/docs/icons';
import { siteConfig } from '@/config/site';
import { CopyDropdown } from '@/components/ui/copy-dropdown';

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
      <div className="border-subtle relative mb-8 overflow-hidden border-b pb-6">
        {/* Decorative Grid Mesh & Glow */}
        <div className="pointer-events-none absolute inset-0 -mx-4 h-[240px] bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] bg-[size:16px_16px] sm:-mx-6 lg:-mx-8" />
        <div className="bg-primary/10 pointer-events-none absolute -top-12 -left-12 size-40 rounded-full opacity-60 blur-3xl dark:opacity-45" />
        <div className="bg-secondary/5 pointer-events-none absolute top-4 right-12 size-32 rounded-full opacity-45 blur-3xl" />

        {/* Category & Breadcrumb Path */}
        <div className="relative mb-3 flex flex-wrap items-center gap-2">
          <span className="text-primary bg-primary/10 border-primary/20 rounded-full border px-2.5 py-0.5 text-[9px] font-bold tracking-wider uppercase">
            {parameters.slug?.includes('components') ? 'Component' : 'Guide'}
          </span>
          <span className="text-content-tertiary font-mono text-xs font-semibold">
            {parameters.slug ? parameters.slug.join(' / ') : ''}
          </span>
        </div>

        {/* Title */}
        <h1 className="text-content-primary relative text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl">
          {pageData.title}
        </h1>

        {/* Description */}
        <p className="text-content-secondary relative mt-3 mb-6 max-w-3xl text-base leading-relaxed sm:text-lg">
          {pageData.description}
        </p>

        {/* Interactive Resource Cards Grid */}
        <div className="relative mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {/* Source Card */}
          {pageData.links?.source && (
            <a
              className="border-subtle bg-surface-subtle/30 hover:bg-surface-subtle/60 hover:border-primary/20 group flex items-center gap-3 rounded-xl border p-3 transition-all duration-300 hover:-translate-y-0.5"
              href={`${siteConfig.links.componentsBase}/${pageData.links.source}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className="bg-primary/10 text-primary group-hover:bg-primary/20 shrink-0 rounded-lg p-2 transition-all group-hover:scale-105">
                <Code2 className="size-4" />
              </div>
              <div className="overflow-hidden">
                <div className="text-content-primary truncate text-[11px] font-bold">Source</div>
                <div className="text-content-tertiary truncate text-[9px]">View on GitHub</div>
              </div>
            </a>
          )}

          {/* Theme Recipe Card */}
          {pageData.links?.recipe && (
            <a
              className="border-subtle bg-surface-subtle/30 hover:bg-surface-subtle/60 hover:border-primary/20 group flex items-center gap-3 rounded-xl border p-3 transition-all duration-300 hover:-translate-y-0.5"
              href={`${siteConfig.links.packageBase}/${pageData.links.recipe}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className="bg-info/10 text-info group-hover:bg-info/20 shrink-0 rounded-lg p-2 transition-all group-hover:scale-105">
                <Paintbrush className="size-4" />
              </div>
              <div className="overflow-hidden">
                <div className="text-content-primary truncate text-[11px] font-bold">Recipe</div>
                <div className="text-content-tertiary truncate text-[9px]">Theme Styles</div>
              </div>
            </a>
          )}

          {/* React Aria Spec Card */}
          {pageData.links?.rac && (
            <a
              className="border-subtle bg-surface-subtle/30 hover:bg-surface-subtle/60 hover:border-primary/20 group flex items-center gap-3 rounded-xl border p-3 transition-all duration-300 hover:-translate-y-0.5"
              href={pageData.links.rac}
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className="bg-success/10 text-success group-hover:bg-success/20 shrink-0 rounded-lg p-2 transition-all group-hover:scale-105">
                <Code2 className="size-4" />
              </div>
              <div className="overflow-hidden">
                <div className="text-content-primary truncate text-[11px] font-bold">
                  React Aria
                </div>
                <div className="text-content-tertiary truncate text-[9px]">Accessibility Spec</div>
              </div>
            </a>
          )}

          {/* Storybook Playgrounds Card */}
          {pageData.links?.storybook && (
            <a
              className="border-subtle bg-surface-subtle/30 hover:bg-surface-subtle/60 hover:border-primary/20 group flex items-center gap-3 rounded-xl border p-3 transition-all duration-300 hover:-translate-y-0.5"
              href={`${siteConfig.links.storybook}/?path=/docs/${pageData.links.storybook.toLowerCase().replace('/', '-')}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className="bg-warning/10 text-warning group-hover:bg-warning/20 shrink-0 rounded-lg p-2 transition-all group-hover:scale-105">
                <BookOpen className="size-4" />
              </div>
              <div className="overflow-hidden">
                <div className="text-content-primary truncate text-[11px] font-bold">Storybook</div>
                <div className="text-content-tertiary truncate text-[9px]">Playground Demos</div>
              </div>
            </a>
          )}

          {/* Figma Design Card */}
          {pageData.links?.figma && (
            <a
              className="border-subtle bg-surface-subtle/30 hover:bg-surface-subtle/60 hover:border-primary/20 group flex items-center gap-3 rounded-xl border p-3 transition-all duration-300 hover:-translate-y-0.5"
              href={
                typeof pageData.links.figma === 'string'
                  ? pageData.links.figma
                  : siteConfig.links.figmaDefault
              }
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className="shrink-0 rounded-lg bg-pink-500/10 p-2 text-pink-500 transition-all group-hover:scale-105 group-hover:bg-pink-500/20">
                <Figma className="size-4" />
              </div>
              <div className="overflow-hidden">
                <div className="text-content-primary truncate text-[11px] font-bold">Figma UI</div>
                <div className="text-content-tertiary truncate text-[9px]">Design Assets</div>
              </div>
            </a>
          )}
        </div>

        {/* Copy drop down row */}
        {rawMarkdown && (
          <div className="border-subtle/60 relative mt-5 flex items-center justify-between border-t pt-4">
            <span className="text-content-tertiary text-[11px] font-medium">
              Need to review raw markdown? Copy the template markup.
            </span>
            <CopyDropdown pageTitle={pageData.title || ''} rawMarkdown={rawMarkdown} />
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
