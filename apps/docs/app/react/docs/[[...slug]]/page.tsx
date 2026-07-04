import { notFound, redirect } from 'next/navigation';
import defaultMdxComponents from 'fumadocs-ui/mdx';
import fs from 'node:fs/promises';
import path from 'node:path';

import { source } from '@/lib/source';
import { DocsPage, DocsBody, DocsDescription, DocsTitle } from '@/components/layout/notebook/page';
import { PropsTable } from '@/components/ui/props-table';
import { DocsBadges } from '@/components/ui/docs-badge';
import { Code2, BookOpen } from 'lucide-react';
import { Figma } from '@/components/ui/docs/icons';
import { siteConfig } from '@/config/site';

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
      <DocsTitle>{pageData.title}</DocsTitle>
      <DocsDescription className="mb-1">{pageData.description}</DocsDescription>
      <DocsBadges
        extra={[
          ...(pageData.links?.rac
            ? [
                {
                  label: 'React Aria',
                  href: pageData.links.rac,
                  icon: <Code2 className="size-3.5" />,
                  external: true,
                },
              ]
            : []),
          ...(pageData.links?.storybook
            ? [
                {
                  label: 'Storybook',
                  href: `${siteConfig.links.storybook}/?path=/docs/${pageData.links.storybook.toLowerCase().replace('/', '-')}`,
                  icon: <BookOpen className="size-3.5" />,
                  external: true,
                },
              ]
            : []),
          ...(pageData.links?.figma
            ? [
                {
                  label: 'Figma',
                  href:
                    typeof pageData.links.figma === 'string'
                      ? pageData.links.figma
                      : siteConfig.links.figmaDefault,
                  icon: <Figma className="size-3.5" />,
                  external: true,
                },
              ]
            : []),
        ]}
        pageTitle={pageData.title}
        rawMarkdown={rawMarkdown}
        source={
          pageData.links?.source
            ? `${siteConfig.links.componentsBase}/${pageData.links.source}`
            : `${siteConfig.links.componentsBase}/${parameters.slug?.at(-1) ?? ''}`
        }
        styles={
          pageData.links?.recipe
            ? `${siteConfig.links.packageBase}/${pageData.links.recipe}`
            : undefined
        }
      />
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
