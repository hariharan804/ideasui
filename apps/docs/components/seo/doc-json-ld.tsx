import type { ReactElement } from 'react';

import { JsonLd } from './json-ld';
import { siteConfig } from '@/config/site';

export interface DocBreadcrumbItem {
  name: string;
  path: string;
}

export interface DocJsonLdProps {
  title: string;
  description?: string;
  path: string;
  type?: 'TechArticle' | 'Article' | 'WebPage';
  datePublished?: string;
  dateModified?: string;
  version?: string;
  breadcrumbs?: DocBreadcrumbItem[];
  image?: string;
}

const resolveFullUrl = (base: string, rawPath: string): string => {
  if (rawPath.startsWith('http')) {
    return rawPath;
  }

  const normalizedPath = rawPath.startsWith('/') ? rawPath : `/${rawPath}`;

  return `${base}${normalizedPath}`;
};

/**
 * Unified JSON-LD structured data graph for documentation and component pages.
 * Integrates WebSite, Organization, SoftwareApplication, TechArticle, and BreadcrumbList
 * into a single cohesive @graph avoiding duplicate or disconnected script tags.
 */
export function DocJsonLd({
  title,
  description,
  path,
  type = 'TechArticle',
  datePublished,
  dateModified,
  version,
  breadcrumbs = [],
  image,
}: Readonly<DocJsonLdProps>): ReactElement {
  const canonicalBase = siteConfig.url.endsWith('/') ? siteConfig.url.slice(0, -1) : siteConfig.url;
  const pageUrl = resolveFullUrl(canonicalBase, path);
  const articleImage = resolveFullUrl(canonicalBase, image || siteConfig.ogImage);

  const articleNode: Record<string, unknown> = {
    '@type': type,
    '@id': `${pageUrl}#article`,
    headline: title,
    description: description || siteConfig.description,
    image: [articleImage],
    url: pageUrl,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': pageUrl,
    },
    author: {
      '@id': `${canonicalBase}/#organization`,
    },
    publisher: {
      '@id': `${canonicalBase}/#organization`,
    },
    isPartOf: {
      '@id': `${canonicalBase}/#website`,
    },
    inLanguage: 'en-US',
    ...(type === 'TechArticle'
      ? {
          dependencies: 'react, tailwindcss',
          articleSection: path.includes('/components/') ? 'Components' : 'Guides',
        }
      : {}),
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    ...(version ? { version } : {}),
  };

  const graphNodes: Record<string, unknown>[] = [
    {
      '@type': 'WebSite',
      '@id': `${canonicalBase}/#website`,
      url: canonicalBase,
      name: siteConfig.name,
      description: siteConfig.description,
      publisher: {
        '@type': 'Organization',
        '@id': `${canonicalBase}/#organization`,
      },
    },
    {
      '@type': 'Organization',
      '@id': `${canonicalBase}/#organization`,
      name: siteConfig.publisher,
      url: canonicalBase,
      logo: {
        '@type': 'ImageObject',
        url: siteConfig.logo,
      },
      sameAs: [siteConfig.links.github, siteConfig.links.storybook].filter(Boolean),
    },
    {
      '@type': 'SoftwareApplication',
      '@id': `${canonicalBase}/#software`,
      name: siteConfig.name,
      url: canonicalBase,
      applicationCategory: 'DeveloperApplication',
      operatingSystem: 'Web',
      offers: {
        '@type': 'Offer',
        price: '0',
        priceCurrency: 'USD',
      },
    },
    articleNode,
  ];

  if (breadcrumbs.length > 0) {
    graphNodes.push({
      '@type': 'BreadcrumbList',
      '@id': `${pageUrl}#breadcrumb`,
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: resolveFullUrl(canonicalBase, crumb.path),
      })),
    });
  }

  const data = {
    '@context': 'https://schema.org',
    '@graph': graphNodes,
  };

  return <JsonLd data={data} id="jsonld-docs" />;
}
