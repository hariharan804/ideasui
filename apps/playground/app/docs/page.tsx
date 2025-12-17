"use client";

import {useState} from "react";
import {Button} from "@ideasui/button";

const codeExamples = {
  basic: `import { Button } from '@ideasui/button'

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
};

export default function DocsPage() {
  const [activeTab, setActiveTab] = useState("overview");

  const CodeBlock = ({code}: {code: string}) => (
    <div className="relative">
      <pre className="overflow-x-auto rounded-lg bg-gray-900 p-4 text-sm text-gray-100">
        <code>{code}</code>
      </pre>
      <button
        className="absolute top-2 right-2 rounded bg-gray-700 px-2 py-1 text-xs text-white hover:bg-gray-600"
        onClick={() => navigator.clipboard.writeText(code)}
      >
        Copy
      </button>
    </div>
  );

  const PropTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-50">
            <th className="border border-gray-300 px-4 py-2 text-left">Prop</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Type</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Default</th>
            <th className="border border-gray-300 px-4 py-2 text-left">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="border border-gray-300 px-4 py-2 font-mono text-sm">variant</td>
            <td className="border border-gray-300 px-4 py-2 font-mono text-sm">
              'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
            </td>
            <td className="border border-gray-300 px-4 py-2 font-mono text-sm">'default'</td>
            <td className="border border-gray-300 px-4 py-2">
              The visual style variant of the button
            </td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border border-gray-300 px-4 py-2 font-mono text-sm">size</td>
            <td className="border border-gray-300 px-4 py-2 font-mono text-sm">
              'default' | 'sm' | 'lg' | 'icon'
            </td>
            <td className="border border-gray-300 px-4 py-2 font-mono text-sm">'default'</td>
            <td className="border border-gray-300 px-4 py-2">The size of the button</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 font-mono text-sm">disabled</td>
            <td className="border border-gray-300 px-4 py-2 font-mono text-sm">boolean</td>
            <td className="border border-gray-300 px-4 py-2 font-mono text-sm">false</td>
            <td className="border border-gray-300 px-4 py-2">Whether the button is disabled</td>
          </tr>
          <tr className="bg-gray-50">
            <td className="border border-gray-300 px-4 py-2 font-mono text-sm">onClick</td>
            <td className="border border-gray-300 px-4 py-2 font-mono text-sm">{"() => void"}</td>
            <td className="border border-gray-300 px-4 py-2 font-mono text-sm">-</td>
            <td className="border border-gray-300 px-4 py-2">Click event handler</td>
          </tr>
          <tr>
            <td className="border border-gray-300 px-4 py-2 font-mono text-sm">children</td>
            <td className="border border-gray-300 px-4 py-2 font-mono text-sm">ReactNode</td>
            <td className="border border-gray-300 px-4 py-2 font-mono text-sm">-</td>
            <td className="border border-gray-300 px-4 py-2">Button content</td>
          </tr>
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-0 z-50 border-b border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-xl font-semibold">Button</h1>
              <span className="rounded bg-blue-100 px-2 py-1 text-sm text-blue-800">Component</span>
            </div>
            <div className="flex items-center space-x-4">
              <a className="text-blue-600 hover:text-blue-800" href="/library">
                ← Back to Library
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 lg:flex-row">
          {/* Sidebar Navigation */}
          <div className="flex-shrink-0 lg:w-64">
            <div className="sticky top-24">
              <nav className="space-y-1">
                {[
                  {id: "overview", label: "Overview"},
                  {id: "examples", label: "Examples"},
                  {id: "api", label: "API Reference"},
                  {id: "playground", label: "Playground"},
                ].map((tab) => (
                  <button
                    key={tab.id}
                    className={`w-full rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                      activeTab === tab.id
                        ? "bg-blue-100 text-blue-700"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                    onClick={() => setActiveTab(tab.id)}
                  >
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="max-w-4xl flex-1">
            {activeTab === "overview" && (
              <div className="space-y-8">
                <div>
                  <h2 className="mb-4 text-2xl font-bold">Button</h2>
                  <p className="mb-6 text-lg text-gray-600">
                    Buttons allow users to take actions, and make choices, with a single tap.
                  </p>
                </div>

                <div>
                  <h3 className="mb-4 text-xl font-semibold">Basic Usage</h3>
                  <div className="space-y-4">
                    <div className="rounded-lg border bg-gray-50 p-6">
                      <Button>Default Button</Button>
                    </div>
                    <CodeBlock code={codeExamples.basic} />
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-xl font-semibold">Installation</h3>
                  <CodeBlock code="npm install @ideasui/button" />
                </div>
              </div>
            )}

            {activeTab === "examples" && (
              <div className="space-y-8">
                <div>
                  <h2 className="mb-4 text-2xl font-bold">Examples</h2>
                </div>

                <div>
                  <h3 className="mb-4 text-xl font-semibold">Variants</h3>
                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-4 rounded-lg border bg-gray-50 p-6">
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
                  <h3 className="mb-4 text-xl font-semibold">Sizes</h3>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 rounded-lg border bg-gray-50 p-6">
                      <Button size="sm">Small</Button>
                      <Button size="default">Default</Button>
                      <Button size="lg">Large</Button>
                      <Button size="icon">🚀</Button>
                    </div>
                    <CodeBlock code={codeExamples.sizes} />
                  </div>
                </div>

                <div>
                  <h3 className="mb-4 text-xl font-semibold">Disabled State</h3>
                  <div className="space-y-4">
                    <div className="rounded-lg border bg-gray-50 p-6">
                      <Button disabled>Disabled Button</Button>
                    </div>
                    <CodeBlock code={codeExamples.disabled} />
                  </div>
                </div>
              </div>
            )}

            {activeTab === "api" && (
              <div className="space-y-8">
                <div>
                  <h2 className="mb-4 text-2xl font-bold">API Reference</h2>
                  <p className="mb-6 text-gray-600">
                    Complete reference of all props and their types.
                  </p>
                </div>

                <div>
                  <h3 className="mb-4 text-xl font-semibold">Props</h3>
                  <PropTable />
                </div>

                <div>
                  <h3 className="mb-4 text-xl font-semibold">CSS Classes</h3>
                  <p className="mb-4 text-gray-600">
                    The Button component uses Tailwind CSS classes. You can customize the appearance
                    by overriding these classes.
                  </p>
                  <div className="rounded-lg bg-gray-50 p-4">
                    <p className="font-mono text-sm">
                      Base classes: inline-flex items-center justify-center rounded-md text-sm
                      font-medium
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "playground" && (
              <div className="space-y-8">
                <div>
                  <h2 className="mb-4 text-2xl font-bold">Interactive Playground</h2>
                  <p className="mb-6 text-gray-600">
                    Experiment with different props and see the changes in real-time.
                  </p>
                </div>

                <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                  <p className="text-blue-800">
                    🚀 <strong>Try the full playground:</strong> Visit the{" "}
                    <a className="font-medium underline" href="/components">
                      interactive playground
                    </a>{" "}
                    for a complete experience with live prop editing.
                  </p>
                </div>

                <div className="rounded-lg border bg-gray-50 p-8 text-center">
                  <Button onClick={() => (window.location.href = "/components")}>
                    Open Full Playground
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
