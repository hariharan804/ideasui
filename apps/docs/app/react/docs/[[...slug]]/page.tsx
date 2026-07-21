import { notFound, redirect } from 'next/navigation';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import fs from 'node:fs/promises';
import path from 'node:path';

import { source } from '@/lib/source';
import { DocsPage, DocsBody } from '@/components/layout/docs-layout/page';
import { PropsTable } from '@/components/ui/props-table';
import { Code2, BookOpen, Paintbrush, Sparkles, Box } from 'lucide-react';
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

  if (Array.isArray(node)) {
    return node.map((child) => extractText(child)).join('');
  }

  if (
    node &&
    typeof node === 'object' &&
    'props' in node &&
    (node as { props?: { children?: unknown } }).props?.children
  ) {
    return extractText((node as { props: { children: unknown } }).props.children);
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

async function getPackageVersion(componentSlug?: string): Promise<string> {
  if (!componentSlug) return '0.0.1';

  const pkgFolder = componentSlug === 'button-group' ? 'button' : componentSlug;

  try {
    const pkgPath = path.join(
      process.cwd(),
      '../../packages/components',
      pkgFolder,
      'package.json',
    );
    const content = await fs.readFile(pkgPath, 'utf8');
    const json = JSON.parse(content);

    return (json.version as string) ?? '0.0.1';
  } catch {
    try {
      const corePkgPath = path.join(process.cwd(), '../../packages/core/react/package.json');
      const content = await fs.readFile(corePkgPath, 'utf8');
      const json = JSON.parse(content);

      return (json.version as string) ?? '0.0.1';
    } catch {
      return '0.0.1';
    }
  }
}

export default async function Page(properties: Readonly<{ params: Promise<{ slug?: string[] }> }>) {
  const parameters = await properties.params;

  if (!parameters.slug || parameters.slug.length === 0) {
    redirect('/react/docs/start');
  }

  const page = source.getPage(parameters.slug);

  if (!page) {
    notFound();
  }

  const pageData = page.data;
  const MdxContent = pageData.body;

  const componentSlug = parameters.slug.at(-1);
  const packageVersion = await getPackageVersion(componentSlug);

  const filePath = page.absolutePath || path.join(process.cwd(), 'content/react', page.path);
  let rawMarkdown = '';

  try {
    rawMarkdown = await fs.readFile(filePath, 'utf8');
  } catch (error) {
    console.error('Failed to read page markdown file:', error);
  }

  return (
    <DocsPage className="!pt-8" full={pageData.full} toc={pageData.toc}>
      {/* ── Executive Hero Header Card ────────────────────────────────────── */}
      <div className="bg-surface-subtle/25 relative mb-8 rounded-3xl p-6 backdrop-blur-sm sm:p-8">
        {/* Decorative ambient background mesh */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-3xl">
          <div className="absolute inset-0 bg-[radial-gradient(oklch(var(--ideasui-color-content-tertiary)/0.10)_1px,transparent_1px)] [mask-image:radial-gradient(ellipse_at_center,black_60%,transparent_100%)] [background-size:24px_24px] dark:opacity-40" />
          <div className="bg-primary/10 absolute -top-20 -left-10 size-64 rounded-full blur-3xl dark:opacity-40" />
          <div className="bg-secondary/10 absolute -top-10 -right-10 size-56 rounded-full blur-3xl" />
          <div className="bg-primary/10 absolute -right-10 -bottom-20 size-64 rounded-full blur-3xl dark:opacity-40" />
        </div>

        {/* ── Title ────────────────────────────────────────────────────────── */}
        <h1 className="text-content-primary relative text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
          {pageData.title}
        </h1>

        {/* ── Description ──────────────────────────────────────────────────── */}
        {pageData.description && (
          <p className="text-content-secondary relative mt-3 max-w-2xl text-base leading-relaxed font-normal sm:text-lg">
            {pageData.description}
          </p>
        )}

        {/* ── Interactive Resource Cards ───────────────────────────────────── */}
        <div className="relative mt-6 flex flex-wrap items-center gap-2.5">
          {pageData.links?.npm && (
            <a
              className="group border-subtle/30 bg-surface/80 hover:bg-surface flex items-center gap-2.5 rounded-2xl border px-3.5 py-2 transition-all duration-200 hover:border-red-500/40 hover:shadow-xs active:scale-[0.98]"
              href={
                typeof pageData.links.npm === 'string' && pageData.links.npm.startsWith('http')
                  ? pageData.links.npm
                  : `https://www.npmjs.com/package/@ideasui/${componentSlug ?? 'button'}`
              }
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-red-500/10 text-red-500 transition-transform duration-200 group-hover:scale-105 group-hover:bg-red-500/20">
                <Box className="size-3.5" />
              </div>
              <div className="flex min-w-0 flex-col">
                <span className="text-content-primary truncate text-xs font-semibold">npm</span>
                <span className="text-content-tertiary truncate text-[10px]">
                  {typeof pageData.links.npm === 'string' &&
                  !pageData.links.npm.startsWith('http') &&
                  !pageData.links.npm.includes('true')
                    ? `v${pageData.links.npm}`
                    : `v${packageVersion}`}
                </span>
              </div>
            </a>
          )}

          {pageData.links?.source && (
            <a
              className="group bg-surface/80 hover:bg-surface hover:border-primary/40 flex items-center gap-2.5 rounded-2xl border px-3.5 py-2 transition-all duration-200 hover:shadow-xs active:scale-[0.98]"
              href={`${siteConfig.links.componentsBase}/${pageData.links.source}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className="bg-primary/10 text-primary group-hover:bg-primary/20 flex size-7 shrink-0 items-center justify-center rounded-xl transition-transform duration-200 group-hover:scale-105">
                <Code2 className="size-3.5" />
              </div>
              <div className="flex min-w-0 flex-col">
                <span className="text-content-primary truncate text-xs font-semibold">Source</span>
                <span className="text-content-tertiary truncate text-[10px]">View on GitHub</span>
              </div>
            </a>
          )}

          {pageData.links?.recipe && (
            <a
              className="group border-subtle/30 bg-surface/80 hover:bg-surface flex items-center gap-2.5 rounded-2xl border px-3.5 py-2 transition-all duration-200 hover:border-sky-500/40 hover:shadow-xs active:scale-[0.98]"
              href={`${siteConfig.links.packageBase}/${pageData.links.recipe}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-sky-500/10 text-sky-500 transition-transform duration-200 group-hover:scale-105 group-hover:bg-sky-500/20">
                <Paintbrush className="size-3.5" />
              </div>
              <div className="flex min-w-0 flex-col">
                <span className="text-content-primary truncate text-xs font-semibold">Recipe</span>
                <span className="text-content-tertiary truncate text-[10px]">Theme Styles</span>
              </div>
            </a>
          )}

          {pageData.links?.rac && (
            <a
              className="group border-subtle/30 bg-surface/80 hover:bg-surface flex items-center gap-2.5 rounded-2xl border px-3.5 py-2 transition-all duration-200 hover:border-emerald-500/40 hover:shadow-xs active:scale-[0.98]"
              href={pageData.links.rac}
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-500 transition-transform duration-200 group-hover:scale-105 group-hover:bg-emerald-500/20">
                <Code2 className="size-3.5" />
              </div>
              <div className="flex min-w-0 flex-col">
                <span className="text-content-primary truncate text-xs font-semibold">
                  React Aria
                </span>
                <span className="text-content-tertiary truncate text-[10px]">A11y Spec</span>
              </div>
            </a>
          )}

          {pageData.links?.storybook && (
            <a
              className="group border-subtle/30 bg-surface/80 hover:bg-surface flex items-center gap-2.5 rounded-2xl border px-3.5 py-2 transition-all duration-200 hover:border-amber-500/40 hover:shadow-xs active:scale-[0.98]"
              href={`${siteConfig.links.storybook}/?path=/docs/${pageData.links.storybook.toLowerCase().replace('/', '-')}`}
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-500 transition-transform duration-200 group-hover:scale-105 group-hover:bg-amber-500/20">
                <BookOpen className="size-3.5" />
              </div>
              <div className="flex min-w-0 flex-col">
                <span className="text-content-primary truncate text-xs font-semibold">
                  Storybook
                </span>
                <span className="text-content-tertiary truncate text-[10px]">Playground</span>
              </div>
            </a>
          )}

          {pageData.links?.figma && (
            <a
              className="group border-subtle/30 bg-surface/80 hover:bg-surface flex items-center gap-2.5 rounded-2xl border px-3.5 py-2 transition-all duration-200 hover:border-pink-500/40 hover:shadow-xs active:scale-[0.98]"
              href={
                typeof pageData.links.figma === 'string'
                  ? pageData.links.figma
                  : siteConfig.links.figmaDefault
              }
              rel="noopener noreferrer"
              target="_blank"
            >
              <div className="flex size-7 shrink-0 items-center justify-center rounded-xl bg-pink-500/10 text-pink-500 transition-transform duration-200 group-hover:scale-105 group-hover:bg-pink-500/20">
                <Figma className="size-3.5" />
              </div>
              <div className="flex min-w-0 flex-col">
                <span className="text-content-primary truncate text-xs font-semibold">
                  Figma UI
                </span>
                <span className="text-content-tertiary truncate text-[10px]">Design Assets</span>
              </div>
            </a>
          )}
        </div>

        {/* ── Copy Markdown Row ─────────────────────────────────────────────── */}
        {rawMarkdown && (
          <div className="relative mt-6 flex flex-wrap items-center justify-between gap-3 pt-2">
            <div className="text-content-tertiary flex items-center gap-2 text-xs font-medium">
              <span className="bg-primary/10 text-primary flex size-5 items-center justify-center rounded-full">
                <Sparkles className="size-3" />
              </span>
              <span>Copy as Markdown for AI assistants</span>
            </div>
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
