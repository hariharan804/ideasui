import type { MetadataRoute } from 'next';
import { source } from '@/lib/source';
import { siteConfig } from '@/config/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = siteConfig.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/react/docs/start`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/react/docs/start/installation`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/react/docs/start/tokens`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/react/docs/start/dark-mode`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  const docPages: MetadataRoute.Sitemap = source.getPages().map((page) => {
    const slugPath = page.slugs.join('/');

    return {
      url: `${baseUrl}/react/docs/${slugPath}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: page.slugs.includes('components') ? 0.9 : 0.7,
    };
  });

  return [...staticRoutes, ...docPages];
}
