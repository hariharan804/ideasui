import { JsonLd } from './json-ld';
import { siteConfig } from '@/config/site';

export type ArticleJsonLdProps = {
  title: string;
  description?: string;
  path: string;
  type?: 'TechArticle' | 'Article' | 'WebPage';
  datePublished?: string;
  dateModified?: string;
  keywords?: string[];
  version?: string;
  image?: string;
};

/**
 * Renders TechArticle or WebPage structured data for component guides,
 * installation guides, and reference documentation.
 */
export function ArticleJsonLd({
  title,
  description,
  path,
  type = 'TechArticle',
  datePublished,
  dateModified,
  keywords,
  version,
  image,
}: Readonly<ArticleJsonLdProps>) {
  const url = path.startsWith('http') ? path : new URL(path, siteConfig.url).toString();

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': type,
    headline: title,
    description: description || siteConfig.description,
    image: [image || siteConfig.ogImage],
    url,
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url,
    },
    author: {
      '@type': 'Organization',
      name: siteConfig.publisher,
      url: siteConfig.url,
    },
    publisher: {
      '@type': 'Organization',
      name: siteConfig.publisher,
      url: siteConfig.url,
      logo: {
        '@type': 'ImageObject',
        url: siteConfig.logo,
      },
    },
    isPartOf: {
      '@type': 'WebSite',
      name: siteConfig.name,
      url: siteConfig.url,
    },
    inLanguage: 'en-US',
    ...(datePublished ? { datePublished } : {}),
    ...(dateModified ? { dateModified } : {}),
    ...(keywords && keywords.length > 0 ? { keywords: keywords.join(', ') } : {}),
    ...(version ? { version } : {}),
  };

  return <JsonLd data={data} id={`jsonld-${type.toLowerCase()}`} />;
}
