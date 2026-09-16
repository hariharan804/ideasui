import { createMDX } from 'fumadocs-mdx/next';
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@ideasui/react', '@ideasui/theme', '@ideasui/utils'],
  experimental: {
    optimizePackageImports: ['lucide-react', 'fumadocs-ui', 'motion', 'framer-motion'],
  },
};

const withMDX = createMDX();

export default withMDX(nextConfig);
