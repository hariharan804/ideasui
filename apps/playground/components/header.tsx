'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Moon, Sun, Github, ExternalLink } from 'lucide-react'

interface HeaderProps {
  theme?: 'light' | 'dark'
  onToggleTheme?: () => void
  showBackButton?: boolean
  title?: string
  subtitle?: string
}

function Header({
  theme,
  onToggleTheme,
  showBackButton = false,
  title,
  subtitle,
}: HeaderProps) {
  const router = useRouter()

  const goBack = () => {
    router.push('/playground')
  }

  const goToGithub = () => {
    window.open('https://github.com/your-username/ideasui', '_blank')
  }

  const goToDocs = () => {
    window.open('/docs', '_blank')
  }

  return (
    <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {showBackButton && (
              <>
                <button
                  onClick={goBack}
                  className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Back to Components
                </button>
                <div className="h-6 w-px bg-gray-300" />
              </>
            )}
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                {title || 'IdeasUI Playground'}
              </h1>
              {subtitle && (
                <p className="text-sm text-gray-600 mt-1">{subtitle}</p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Documentation Link */}
            <button
              onClick={goToDocs}
              className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100"
            >
              <ExternalLink className="w-4 h-4" />
              Docs
            </button>

            {/* GitHub Link */}
            <button
              onClick={goToGithub}
              className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors rounded-lg hover:bg-gray-100"
            >
              <Github className="w-4 h-4" />
              GitHub
            </button>

            {/* Theme Toggle */}
            <button
              onClick={onToggleTheme}
              className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
