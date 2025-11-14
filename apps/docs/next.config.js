const withNextra = require('nextra')({
  theme: 'nextra-theme-docs',
  themeConfig: './theme.config.tsx',
  latex: true,
  search: {
    codeblocks: false
  },
  defaultShowCopyCode: true
})

module.exports = withNextra({
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    optimizeCss: true
  }
})