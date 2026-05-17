/* eslint-disable react/jsx-pascal-case */
/* eslint-disable no-restricted-syntax */
import { notFound, redirect } from 'next/navigation';
import defaultMdxComponents from 'fumadocs-ui/mdx';

import { source } from '@/lib/source';
import { DocsPage, DocsBody, DocsDescription, DocsTitle } from '@/components/layout/notebook/page';
import { PropsTable } from '@/components/ui/props-table';
import { DocsBadges } from '@/components/ui/docs-badge';

// IdeasUI MDX Components
import { Preview } from '@/components/mdx/preview';
import { Related } from '@/components/mdx/related';
import { RelatedShowcases } from '@/components/mdx/related-showcases';
import { FrameworkTabs } from '@/components/mdx/framework-tabs';
import { Category } from '@/components/mdx/category';
import { Item } from '@/components/mdx/item';

export default async function Page(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params;

  if (!params.slug || params.slug.length === 0) {
    redirect('/react/docs/getting-started');
  }

  const page = source.getPage(params.slug);

  if (!page) {
    notFound();
  }

  const MDX = page.data.body;

  return (
    <DocsPage className="!pt-8" full={page.data.full} toc={page.data.toc}>
      <DocsTitle>{page.data.title}</DocsTitle>
      <DocsDescription>{page.data.description}</DocsDescription>
      <DocsBadges
        source={`https://github.com/ideas2logic-lab/ideasui/tree/main/packages/components/${params.slug?.at(-1) ?? ''}`}
      />
      <DocsBody>
        <MDX
          components={{
            ...defaultMdxComponents,
            PropsTable,
            Preview,
            Related,
            RelatedShowcases,
            FrameworkTabs,
            Category,
            Item,
          }}
        />
      </DocsBody>
    </DocsPage>
  );
}

export async function generateStaticParams() {
  return source.generateParams();
}

export async function generateMetadata(props: { params: Promise<{ slug?: string[] }> }) {
  const params = await props.params;
  const page = source.getPage(params.slug);

  if (!page) {
    if (!params.slug || params.slug.length === 0) {
      return {
        title: 'Documentation',
      };
    }
    notFound();
  }

  return {
    title: page.data.title,
    description: page.data.description,
  };
}
