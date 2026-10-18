import { createMDX } from 'fumadocs-mdx/next';
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  transpilePackages: ['@ideasui/react', '@ideasui/theme', '@ideasui/utils'],
  experimental: {
    optimizePackageImports: ['lucide-react', 'fumadocs-ui', 'motion', 'framer-motion'],
  },
  async headers() {
    const cspHeader = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com",
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' blob: data: https://ideasui.com https://*.githubusercontent.com https://picsum.photos https://*.picsum.photos https://images.unsplash.com https://*.unsplash.com",
      "font-src 'self' data:",
      "connect-src 'self' https://api.github.com https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://*.googletagmanager.com",
      "frame-ancestors 'self'",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      'upgrade-insecure-requests',
    ].join('; ');

    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: cspHeader,
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: '/react/docs',
        destination: '/react/docs/start',
        permanent: true,
      },
      {
        source: '/docs',
        destination: '/react/docs/start',
        permanent: true,
      },
      {
        source: '/react/docs/button',
        destination: '/react/docs/components/button',
        permanent: true,
      },
    ];
  },
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }
    return config;
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
