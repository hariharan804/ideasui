import type { MetadataRoute } from 'next';
import { siteConfig } from '@/config/site';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#6366f1',
    icons: [
      {
        src: '/IdeasUI-favicon-16.svg',
        sizes: '16x16',
        type: 'image/svg+xml',
      },
      {
        src: '/IdeasUI-favicon-32.svg',
        sizes: '32x32',
        type: 'image/svg+xml',
      },
      {
        src: '/apple-icon-180.png',
        sizes: '180x180',
        type: 'image/png',
      },
    ],
  };
}
