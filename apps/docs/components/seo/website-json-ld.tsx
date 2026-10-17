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
  const canonicalUrl = url.endsWith('/') ? url.slice(0, -1) : url;

  const data = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': `${canonicalUrl}/#website`,
        url: canonicalUrl,
        name,
        description,
        publisher: {
          '@type': 'Organization',
          '@id': `${canonicalUrl}/#organization`,
        },
      },
      {
        '@type': 'Organization',
        '@id': `${canonicalUrl}/#organization`,
        name: siteConfig.publisher,
        url: canonicalUrl,
        logo: {
          '@type': 'ImageObject',
          url: siteConfig.logo,
        },
        sameAs: [siteConfig.links.github, siteConfig.links.storybook].filter(Boolean),
      },
      {
        '@type': 'SoftwareApplication',
        '@id': `${canonicalUrl}/#software`,
        name,
        url: canonicalUrl,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Web',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
      },
    ],
  };

  return <JsonLd data={data} id="jsonld-website" />;
}
