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
      url: `${baseUrl}/react/docs/components`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  const docPages: MetadataRoute.Sitemap = source.getPages().map((page) => {
    const slugPath = page.slugs.join('/');

    return {
      url: `${baseUrl}/react/docs/${slugPath}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: page.slugs.includes('components') ? 0.9 : 0.8,
    };
  });

  const routesMap = new Map<string, MetadataRoute.Sitemap[number]>();

  for (const route of [...staticRoutes, ...docPages]) {
    routesMap.set(route.url, route);
  }

  return [...routesMap.values()];
}
