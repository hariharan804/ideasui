import { JsonLd } from './json-ld';
import { siteConfig } from '@/config/site';

export type WebsiteJsonLdProps = {
  name?: string;
  url?: string;
  description?: string;
};

/**
 * Renders WebSite, Organization, and SoftwareApplication structured data
 * for the root layout and documentation homepage.
 */
export function WebsiteJsonLd({
  name = siteConfig.name,
  url = siteConfig.url,
  description = siteConfig.description,
}: Readonly<WebsiteJsonLdProps> = {}) {
  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${url}/#website`,
        url,
        name,
        description,
        publisher: {
          '@type': 'Organization',
          '@id': `${url}/#organization`,
        },
      },
      {
        '@type': 'Organization',
        '@id': `${url}/#organization`,
        name: siteConfig.publisher,
        url,
        logo: {
          '@type': 'ImageObject',
          url: siteConfig.logo,
        },
        sameAs: [siteConfig.links.github, siteConfig.links.storybook].filter(Boolean),
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${url}/#software`,
        name,
        operatingSystem: 'Web',
        applicationCategory: 'DeveloperApplication',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '5',
          ratingCount: '1',
          bestRating: '5',
          worstRating: '1',
        },
      },
    ],
  };

  return <JsonLd data={data} id="jsonld-website" />;
}
