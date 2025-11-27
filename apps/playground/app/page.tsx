'use client'
import { useTheme } from '@your-org/theme-switcher'
import Image from 'next/image'
import { useEffect } from 'react'

export default function Home() {
  const theme = useTheme()
  // console.log('👨‍💻 ~ Home ~ theme:', theme)

  // useEffect(() => {
  //   window.testSystemTheme = () => {
  //     const event = new MediaQueryListEvent('change', {
  //       matches: !window.matchMedia('(prefers-color-scheme: dark)').matches,
  //       media: '(prefers-color-scheme: dark)',
  //     })
  //     window.matchMedia('(prefers-color-scheme: dark)').dispatchEvent(event)
  //   }
  //   console.log(
  //     '👨‍💻 ~ Home ~ window.33:',
  //     window.matchMedia('(prefers-color-scheme: dark)')
  //   )
  //   console.log(
  //     '👨‍💻 ~ Home ~ window.testSystemTheme:',
  //     window.matchMedia('(prefers-color-scheme: dark)').matches
  //   )
  // }, [])

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
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <div className="p-6 bg-blue-500 dark:bg-red-500"></div>
          <button
            className="text-xl text-primary dark:bg-red-500"
            onClick={() => {
              const themes = ['light', 'dark', 'system']
              const currentIndex = themes.indexOf(theme?.theme || 'system')
              const nextTheme = themes[(currentIndex + 1) % themes.length]
              theme?.setTheme(nextTheme)
            }}
          >
            {theme?.theme} ({theme?.resolvedTheme})
          </button>
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black">
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
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-base font-medium">
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
        </div>
      </main>
    </div>
  )
}
