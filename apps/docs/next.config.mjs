import { createMDX } from 'fumadocs-mdx/next';
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@ideasui/react', '@ideasui/theme', '@ideasui/utils'],
  experimental: {
    optimizePackageImports: ['lucide-react', 'fumadocs-ui', 'motion', 'framer-motion'],
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
