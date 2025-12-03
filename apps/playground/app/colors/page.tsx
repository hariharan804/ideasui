'use client'
import { useTheme } from '@ideasui/theme-controller'
import { useState } from 'react'

const Box = ({ className, label }: { className: string; label: string }) => (
  <div className="flex items-center gap-4">
    <div
      className={`w-20 h-20 rounded-lg flex items-center justify-center text-xs font-mono ${className}`}
    >
      {label}
    </div>
    <code className="text-sm">{className}</code>
  </div>
)

export default function ColorsPage() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark')
  }

  return (
    <div className="bg-background text-foreground p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Static Color Showcase</h1>

        <button
          onClick={toggleTheme}
          className="bg-primary text-on-primary px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
        >
          Toggle {theme === 'light' ? 'Light' : 'Dark'}
        </button>
      </div>

      {/* PRIMARY */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Primary</h2>
        <div className="grid grid-cols-6 gap-4">
          <Box className="bg-primary-50 text-primary-950" label="50" />
          <Box className="bg-primary-100 text-primary-950" label="100" />
          <Box className="bg-primary-200 text-primary-950" label="200" />
          <Box className="bg-primary-300 text-primary-950" label="300" />
          <Box className="bg-primary-400 text-primary-50" label="400" />
          <Box className="bg-primary-500 text-primary-50" label="500" />
          <Box className="bg-primary-600 text-primary-50" label="600" />
          <Box className="bg-primary-700 text-primary-50" label="700" />
          <Box className="bg-primary-800 text-primary-50" label="800" />
          <Box className="bg-primary-900 text-primary-50" label="900" />
          <Box className="bg-primary-950 text-primary-50" label="950" />
        </div>
      </section>

      {/* SECONDARY */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Secondary</h2>
        <div className="grid grid-cols-6 gap-4">
          <Box className="bg-secondary-50 text-secondary-950" label="50" />
          <Box className="bg-secondary-100 text-secondary-950" label="100" />
          <Box className="bg-secondary-200 text-secondary-950" label="200" />
          <Box className="bg-secondary-300 text-secondary-950" label="300" />
          <Box className="bg-secondary-400 text-secondary-50" label="400" />
          <Box className="bg-secondary-500 text-secondary-50" label="500" />
          <Box className="bg-secondary-600 text-secondary-50" label="600" />
          <Box className="bg-secondary-700 text-secondary-50" label="700" />
          <Box className="bg-secondary-800 text-secondary-50" label="800" />
          <Box className="bg-secondary-900 text-secondary-50" label="900" />
          <Box className="bg-secondary-950 text-secondary-50" label="950" />
        </div>
      </section>

      {/* SUCCESS */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Success</h2>
        <div className="grid grid-cols-6 gap-4">
          <Box className="bg-success-50 text-success-950" label="50" />
          <Box className="bg-success-100 text-success-950" label="100" />
          <Box className="bg-success-200 text-success-950" label="200" />
          <Box className="bg-success-300 text-success-950" label="300" />
          <Box className="bg-success-400 text-success-50" label="400" />
          <Box className="bg-success-500 text-success-50" label="500" />
          <Box className="bg-success-600 text-success-50" label="600" />
          <Box className="bg-success-700 text-success-50" label="700" />
          <Box className="bg-success-800 text-success-50" label="800" />
          <Box className="bg-success-900 text-success-50" label="900" />
          <Box className="bg-success-950 text-success-50" label="950" />
        </div>
      </section>

      {/* WARNING */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Warning</h2>
        <div className="grid grid-cols-6 gap-4">
          <Box className="bg-warning-50 text-warning-950" label="50" />
          <Box className="bg-warning-100 text-warning-950" label="100" />
          <Box className="bg-warning-200 text-warning-950" label="200" />
          <Box className="bg-warning-300 text-warning-950" label="300" />
          <Box className="bg-warning-400 text-warning-50" label="400" />
          <Box className="bg-warning-500 text-warning-50" label="500" />
          <Box className="bg-warning-600 text-warning-50" label="600" />
          <Box className="bg-warning-700 text-warning-50" label="700" />
          <Box className="bg-warning-800 text-warning-50" label="800" />
          <Box className="bg-warning-900 text-warning-50" label="900" />
          <Box className="bg-warning-950 text-warning-50" label="950" />
        </div>
      </section>

      {/* DANGER */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Danger</h2>
        <div className="grid grid-cols-6 gap-4">
          <Box className="bg-danger-50 text-danger-950" label="50" />
          <Box className="bg-danger-100 text-danger-950" label="100" />
          <Box className="bg-danger-200 text-danger-950" label="200" />
          <Box className="bg-danger-300 text-danger-950" label="300" />
          <Box className="bg-danger-400 text-danger-50" label="400" />
          <Box className="bg-danger-500 text-danger-50" label="500" />
          <Box className="bg-danger-600 text-danger-50" label="600" />
          <Box className="bg-danger-700 text-danger-50" label="700" />
          <Box className="bg-danger-800 text-danger-50" label="800" />
          <Box className="bg-danger-900 text-danger-50" label="900" />
          <Box className="bg-danger-950 text-danger-50" label="950" />
        </div>
      </section>

      {/* INFO */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Info</h2>
        <div className="grid grid-cols-6 gap-4">
          <Box className="bg-info-50 text-info-950" label="50" />
          <Box className="bg-info-100 text-info-950" label="100" />
          <Box className="bg-info-200 text-info-950" label="200" />
          <Box className="bg-info-300 text-info-950" label="300" />
          <Box className="bg-info-400 text-info-50" label="400" />
          <Box className="bg-info-500 text-info-50" label="500" />
          <Box className="bg-info-600 text-info-50" label="600" />
          <Box className="bg-info-700 text-info-50" label="700" />
          <Box className="bg-info-800 text-info-50" label="800" />
          <Box className="bg-info-900 text-info-50" label="900" />
          <Box className="bg-info-950 text-info-50" label="950" />
        </div>
      </section>

      {/* --- MD3 TOKENS --- */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">
          Material Design 3 Tokens
        </h2>

        <div className="grid grid-cols-3 gap-6">
          <Box className="bg-primary text-on-primary" label="primary" />
          <Box
            className="bg-primary-container text-on-primary-container"
            label="primary-container"
          />
          <Box className="bg-secondary text-on-secondary" label="secondary" />
          <Box
            className="bg-secondary-container text-on-secondary-container"
            label="secondary-container"
          />
          <Box className="bg-surface text-on-surface" label="surface" />
          <Box
            className="bg-surface-variant text-on-surface-variant"
            label="surface-variant"
          />
          <Box className="border-4 border-outline" label="outline" />
          <Box
            className="border-4 border-outline-variant"
            label="outline-var"
          />
        </div>
      </section>

      {/* --- SEMANTIC TOKENS --- */}
      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Semantic Tokens</h2>

        <div className="grid grid-cols-3 gap-6">
          <Box
            className="bg-background text-foreground"
            label="background / foreground"
          />
          <Box
            className="bg-card text-card-foreground"
            label="card / card-foreground"
          />
          <Box
            className="bg-muted text-muted-foreground"
            label="muted / muted-foreground"
          />
        </div>
      </section>
    </div>
  )
}
