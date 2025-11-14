// Mock icons for demo
const Shield = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
  </svg>
)

const Zap = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

const Palette = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zM21 5a2 2 0 00-2-2h-4a2 2 0 00-2 2v12a4 4 0 004 4h4a2 2 0 002-2V5z" />
  </svg>
)

const Code = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
  </svg>
)

const Users = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
)

const Rocket = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l4-4a4 4 0 000-5.656z" />
  </svg>
)

const features = [
  {
    icon: Shield,
    title: 'Accessibility First',
    description: 'WCAG 2.1 AA compliant with full keyboard navigation and screen reader support.'
  },
  {
    icon: Zap,
    title: 'Performance Optimized',
    description: 'Tree-shakeable exports, minimal bundle size, and optimized for Core Web Vitals.'
  },
  {
    icon: Palette,
    title: 'Fully Customizable',
    description: 'CSS variables, design tokens, and Tailwind CSS for complete design control.'
  },
  {
    icon: Code,
    title: 'Developer Experience',
    description: 'TypeScript support, comprehensive docs, and excellent IDE integration.'
  },
  {
    icon: Users,
    title: 'Production Ready',
    description: 'Battle-tested components used by teams building real applications.'
  },
  {
    icon: Rocket,
    title: 'Modern Stack',
    description: 'Built with React 18, Next.js 14, and the latest web standards.'
  }
]

export function FeatureGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 my-12">
      {features.map((feature, index) => (
        <div key={index} className="group p-6 rounded-xl border bg-white dark:bg-gray-900 hover:shadow-lg transition-all duration-200">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
              <feature.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}