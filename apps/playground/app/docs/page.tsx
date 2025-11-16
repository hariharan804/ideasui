'use client'

import { useState } from 'react'
import { Button } from '@your-org/button'

const codeExamples = {
  basic: `import { Button } from '@your-org/button'

export default function App() {
  return <Button>Click me</Button>
}`,
  variants: `<Button variant="default">Default</Button>
<Button variant="destructive">Destructive</Button>
<Button variant="outline">Outline</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button variant="link">Link</Button>`,
  sizes: `<Button size="sm">Small</Button>
<Button size="default">Default</Button>
<Button size="lg">Large</Button>
<Button size="icon">🚀</Button>`,
  disabled: `<Button disabled>Disabled Button</Button>`,
}

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState('overview')

  const CodeBlock = ({ code }: { code: string }) => (
    <div className="relative">
      <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm">
        <code>{code}</code>
      </pre>
      <button
        onClick={() => navigator.clipboard.writeText(code)}
        className="absolute top-2 right-2 bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded text-xs"
      >
        Copy
      </button>
    </div>
  )

  const PropTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-50">
            <th className="border border-gray-300 px-4 py-2 text-left">Prop</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Default
            </th>
            <th className="border border-gray-300 px-4 py-2 text-left">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2 font-mono text-sm">
              variant
            </td>
            <td className="border border-gray-300 px-4 py-2 font-mono text-sm">
              'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' |
              'link'
            </td>
            <td className="border border-gray-300 px-4 py-2 font-mono text-sm">
              'default'
            </td>
            <td className="border border-gray-300 px-4 py-2">
              The visual style variant of the button
            </td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border border-gray-300 px-4 py-2 font-mono text-sm">
              size
            </td>
            <td className="border border-gray-300 px-4 py-2 font-mono text-sm">
              'default' | 'sm' | 'lg' | 'icon'
            </td>
            <td className="border border-gray-300 px-4 py-2 font-mono text-sm">
              'default'
            </td>
            <td className="border border-gray-300 px-4 py-2">
              The size of the button
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 font-mono text-sm">
              disabled
            </td>
            <td className="border border-gray-300 px-4 py-2 font-mono text-sm">
              boolean
            </td>
            <td className="border border-gray-300 px-4 py-2 font-mono text-sm">
              false
            </td>
            <td className="border border-gray-300 px-4 py-2">
              Whether the button is disabled
            </td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border border-gray-300 px-4 py-2 font-mono text-sm">
              onClick
            </td>
            <td className="border border-gray-300 px-4 py-2 font-mono text-sm">
              {'() => void'}
            </td>
            <td className="border border-gray-300 px-4 py-2 font-mono text-sm">
              -
            </td>
            <td className="border border-gray-300 px-4 py-2">
              Click event handler
            </td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 font-mono text-sm">
              children
            </td>
            <td className="border border-gray-300 px-4 py-2 font-mono text-sm">
              ReactNode
            </td>
            <td className="border border-gray-300 px-4 py-2 font-mono text-sm">
              -
            </td>
            <td className="border border-gray-300 px-4 py-2">Button content</td>
          </tr>
        </tbody>
      </table>
    </div>
  )

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200 bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold">Button</h1>
              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">
                Component
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <a href="/library" className="text-blue-600 hover:text-blue-800">
                ← Back to Library
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Navigation */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="sticky top-24">
              <nav className="space-y-1">
                {[
                  { id: 'overview', label: 'Overview' },
                  { id: 'examples', label: 'Examples' },
                  { id: 'api', label: 'API Reference' },
                  { id: 'playground', label: 'Playground' },
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-100 text-blue-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 max-w-4xl">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Button</h2>
                  <p className="text-gray-600 text-lg mb-6">
                    Buttons allow users to take actions, and make choices, with
                    a single tap.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Basic Usage</h3>
                  <div className="space-y-4">
                    <div className="p-6 border rounded-lg bg-gray-50">
                      <Button>Default Button</Button>
                    </div>
                    <CodeBlock code={codeExamples.basic} />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Installation</h3>
                  <CodeBlock code="npm install @your-org/button" />
                </div>
              </div>
            )}

            {activeTab === 'examples' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">Examples</h2>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Variants</h3>
                  <div className="space-y-4">
                    <div className="p-6 border rounded-lg bg-gray-50 flex flex-wrap gap-4">
                      <Button variant="default">Default</Button>
                      <Button variant="destructive">Destructive</Button>
                      <Button variant="outline">Outline</Button>
                      <Button variant="secondary">Secondary</Button>
                      <Button variant="ghost">Ghost</Button>
                      <Button variant="link">Link</Button>
                    </div>
                    <CodeBlock code={codeExamples.variants} />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Sizes</h3>
                  <div className="space-y-4">
                    <div className="p-6 border rounded-lg bg-gray-50 flex items-center gap-4">
                      <Button size="sm">Small</Button>
                      <Button size="default">Default</Button>
                      <Button size="lg">Large</Button>
                      <Button size="icon">🚀</Button>
                    </div>
                    <CodeBlock code={codeExamples.sizes} />
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Disabled State</h3>
                  <div className="space-y-4">
                    <div className="p-6 border rounded-lg bg-gray-50">
                      <Button disabled>Disabled Button</Button>
                    </div>
                    <CodeBlock code={codeExamples.disabled} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'api' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">API Reference</h2>
                  <p className="text-gray-600 mb-6">
                    Complete reference of all props and their types.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">Props</h3>
                  <PropTable />
                </div>

                <div>
                  <h3 className="text-xl font-semibold mb-4">CSS Classes</h3>
                  <p className="text-gray-600 mb-4">
                    The Button component uses Tailwind CSS classes. You can
                    customize the appearance by overriding these classes.
                  </p>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <p className="font-mono text-sm">
                      Base classes: inline-flex items-center justify-center
                      rounded-md text-sm font-medium
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'playground' && (
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-bold mb-4">
                    Interactive Playground
                  </h2>
                  <p className="text-gray-600 mb-6">
                    Experiment with different props and see the changes in
                    real-time.
                  </p>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-blue-800">
                    🚀 <strong>Try the full playground:</strong> Visit the{' '}
                    <a href="/components" className="underline font-medium">
                      interactive playground
                    </a>{' '}
                    for a complete experience with live prop editing.
                  </p>
                </div>

                <div className="p-8 border rounded-lg bg-gray-50 text-center">
                  <Button
                    onClick={() => (window.location.href = '/components')}
                  >
                    Open Full Playground
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
