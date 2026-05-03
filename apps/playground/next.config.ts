import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Required to transpile internal workspace packages from TypeScript source
  // especially when using Turbopack and the App Router.
  transpilePackages: ['@ideasui/button', '@ideasui/theme', '@ideasui/utils'],

  /* config options here */
};

export default nextConfig;
