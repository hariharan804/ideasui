import { JsonLd } from './json-ld';
import { siteConfig } from '@/config/site';

export type BreadcrumbItem = {
  name: string;
  path: string;
};

export type BreadcrumbJsonLdProps = {
  items: readonly BreadcrumbItem[];
};

/**
 * Renders BreadcrumbList structured data matching on-page navigation hierarchy.
 */
export function BreadcrumbJsonLd({ items }: Readonly<BreadcrumbJsonLdProps>) {
  if (!items || items.length === 0) return null;

  const data = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.path.startsWith('http')
        ? item.path
        : new URL(item.path, siteConfig.url).toString(),
    })),
  };

  return <JsonLd data={data} id="jsonld-breadcrumbs" />;
}
