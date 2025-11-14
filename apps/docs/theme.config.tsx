import { DocsThemeConfig } from 'nextra-theme-docs'
import { useRouter } from 'next/router'

const config: DocsThemeConfig = {
  logo: (
    <div className="flex items-center gap-2">
      <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
        <span className="text-white font-bold text-sm">UI</span>
      </div>
      <span className="font-bold text-xl">Component Library</span>
    </div>
  ),
  project: {
    link: 'https://github.com/username/my-component-lib'
  },
  docsRepositoryBase: 'https://github.com/username/my-component-lib/tree/main/apps/docs',
  footer: {
    text: (
      <div className="flex w-full flex-col items-center sm:items-start">
        <p className="mt-6 text-xs">
          © {new Date().getFullYear()} Component Library. Built with ❤️ using ShadCN/UI.
        </p>
      </div>
    )
  },
  search: {
    placeholder: 'Search components...'
  },
  editLink: {
    text: 'Edit this page on GitHub →'
  },
  feedback: {
    content: 'Question? Give us feedback →',
    labels: 'feedback'
  },
  sidebar: {
    titleComponent({ title, type }) {
      if (type === 'separator') {
        return <div className="flex items-center gap-2 text-xs uppercase tracking-wider text-gray-500 font-medium">{title}</div>
      }
      return <>{title}</>
    }
  },
  toc: {
    backToTop: true
  },
  useNextSeoProps() {
    const { asPath } = useRouter()
    if (asPath !== '/') {
      return {
        titleTemplate: '%s – UI Components'
      }
    }
  },
  head: (
    <>
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta property="og:title" content="UI Component Library" />
      <meta property="og:description" content="Modern, accessible React components built with ShadCN/UI" />
      <link rel="icon" href="/favicon.ico" />
    </>
  )
}

export default config