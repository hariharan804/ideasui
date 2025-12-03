'use client'
import { useTheme } from '@ideasui/theme-controller'
import Image from 'next/image'

export default function Home() {
  const theme = useTheme()

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-8 text-center sm:items-start sm:text-left">
          {/* Theme Controls */}
          <div className="flex gap-2">
            {['light', 'dark', 'system'].map((themeOption) => (
              <button
                key={themeOption}
                className={`px-4 py-2 rounded-md border transition-colors ${
                  theme?.theme === themeOption
                    ? 'bg-primary text-white border-primary-500'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
                onClick={() => theme?.setTheme(themeOption)}
              >
                {themeOption}
              </button>
            ))}
          </div>
          <p className="text-sm text-gray-600">
            Current: {theme?.theme} (Resolved: {theme?.resolvedTheme})
          </p>

          {/* Text Showcase */}
          <div className="w-full space-y-4">
            <h2 className="text-xl font-semibold">Text Styles</h2>
            <div className="grid gap-2">
              <h1 className="text-4xl font-bold">Heading 1</h1>
              <h2 className="text-2xl font-semibold">Heading 2</h2>
              <p className="text-base">Regular paragraph text</p>
              <p className="text-sm text-gray-600">Small muted text</p>
              <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                Code text
              </code>
            </div>
          </div>

          {/* Borders Showcase */}
          <div className="w-full space-y-4">
            <h2 className="text-xl font-semibold">Borders</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 border border-gray-200 rounded">
                Default border
              </div>
              <div className="p-4 border-2 border-blue-500 rounded">
                Colored border
              </div>
              <div className="p-4 border border-dashed border-gray-400 rounded">
                Dashed border
              </div>
              <div className="p-4 border-l-4 border-green-500 bg-green-50">
                Left accent
              </div>
            </div>
          </div>

          {/* Backgrounds Showcase */}
          <div className="w-full space-y-4">
            <h2 className="text-xl font-semibold">Backgrounds</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-gray-100 rounded">Gray background</div>
              <div className="p-4 bg-blue-500 text-white rounded">
                Blue background
              </div>
              <div className="p-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded">
                Gradient
              </div>
              <div className="p-4 bg-red-50 border border-red-200 text-red-800 rounded">
                Alert style
              </div>
            </div>
          </div>
          {/* <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 ">
            Looking for a starting point or more instructions? Head over to{' '}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950  "
            >
              Templates
            </a>{' '}
            or the{' '}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 "
            >
              Learning
            </a>{' '}
            center.
          </p> */}
        </div>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-base font-medium">
          <a
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 px-5 text-white transition-all hover:from-purple-600 hover:to-pink-600 transform hover:scale-105"
            href="/library"
          >
            🏛️ Library
          </a>
          <a
            className="flex h-12 items-center justify-center gap-2 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 px-5 text-white transition-all hover:from-blue-600 hover:to-cyan-600 transform hover:scale-105"
            href="/playground"
          >
            🎮 Playground
          </a>
          <a
            className="flex h-12 items-center justify-center rounded-full bg-gradient-to-r from-orange-500 to-red-500 px-5 text-white transition-all hover:from-orange-600 hover:to-red-600 transform hover:scale-105"
            href="/docs"
          >
            📖 Docs
          </a>
        </div> */}
      </main>
    </div>
  )
}
