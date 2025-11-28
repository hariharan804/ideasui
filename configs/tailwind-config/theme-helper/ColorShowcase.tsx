'use client'
import { useState } from 'react'

const ColorBox = ({ className, children }: { className: string; children: React.ReactNode }) => (
  <div className={`w-20 h-20 rounded-lg flex items-center justify-center text-xs font-mono ${className}`}>
    {children}
  </div>
)

const ColorSection = ({ title, colors }: { title: string; colors: Array<{ shade: string; bg: string; text: string }> }) => (
  <section className="mb-12">
    <h2 className="text-2xl font-semibold mb-6">{title}</h2>
    <div className="grid grid-cols-11 gap-4">
      {colors.map(({ shade, bg, text }) => (
        <div key={shade} className="text-center">
          <ColorBox className={`${bg} ${text}`}>{shade}</ColorBox>
          <div className="text-xs font-mono mt-1">{bg}</div>
        </div>
      ))}
    </div>
  </section>
)

const MaterialDesignSection = () => (
  <section className="mb-12">
    <h2 className="text-2xl font-semibold mb-6">Material Design 3 Tokens</h2>
    <div className="grid grid-cols-4 gap-6">
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Primary</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <ColorBox className="bg-primary text-on-primary">Primary</ColorBox>
            <code className="text-sm">bg-primary text-on-primary</code>
          </div>
          <div className="flex items-center gap-4">
            <ColorBox className="bg-primary-container text-on-primary-container">Container</ColorBox>
            <code className="text-sm">bg-primary-container</code>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Secondary</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <ColorBox className="bg-secondary text-on-secondary">Secondary</ColorBox>
            <code className="text-sm">bg-secondary text-on-secondary</code>
          </div>
          <div className="flex items-center gap-4">
            <ColorBox className="bg-secondary-container text-on-secondary-container">Container</ColorBox>
            <code className="text-sm">bg-secondary-container</code>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Surface</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <ColorBox className="bg-surface text-on-surface">Surface</ColorBox>
            <code className="text-sm">bg-surface text-on-surface</code>
          </div>
          <div className="flex items-center gap-4">
            <ColorBox className="bg-surface-variant text-on-surface-variant">Variant</ColorBox>
            <code className="text-sm">bg-surface-variant</code>
          </div>
        </div>
      </div>
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Outline</h3>
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <ColorBox className="border-4 border-outline bg-surface text-on-surface">Outline</ColorBox>
            <code className="text-sm">border-outline</code>
          </div>
          <div className="flex items-center gap-4">
            <ColorBox className="border-4 border-outline-variant bg-surface text-on-surface">Variant</ColorBox>
            <code className="text-sm">border-outline-variant</code>
          </div>
        </div>
      </div>
    </div>
  </section>
)

const SemanticSection = () => (
  <section className="mb-12">
    <h2 className="text-2xl font-semibold mb-6">Semantic Tokens</h2>
    <div className="grid grid-cols-3 gap-6">
      <div className="flex items-center gap-4">
        <ColorBox className="bg-background text-foreground">Background</ColorBox>
        <code className="text-sm">bg-background text-foreground</code>
      </div>
      <div className="flex items-center gap-4">
        <ColorBox className="bg-card text-card-foreground">Card</ColorBox>
        <code className="text-sm">bg-card text-card-foreground</code>
      </div>
      <div className="flex items-center gap-4">
        <ColorBox className="bg-muted text-muted-foreground">Muted</ColorBox>
        <code className="text-sm">bg-muted text-muted-foreground</code>
      </div>
    </div>
  </section>
)

export default function ColorShowcase() {
  const [isDark, setIsDark] = useState(false)

  const toggleTheme = () => {
    setIsDark(!isDark)
    document.documentElement.classList.toggle('dark')
  }

  const shades = ['50', '100', '200', '300', '400', '500', '600', '700', '800', '900', '950']
  
  const generateColors = (colorName: string) => 
    shades.map(shade => ({
      shade,
      bg: `bg-${colorName}-${shade}`,
      text: parseInt(shade) >= 500 ? `text-${colorName}-50` : `text-${colorName}-950`
    }))

  const colorSections = [
    { title: 'Primary Colors', colors: generateColors('primary') },
    { title: 'Secondary Colors', colors: generateColors('secondary') },
    { title: 'Success Colors', colors: generateColors('success') },
    { title: 'Warning Colors', colors: generateColors('warning') },
    { title: 'Danger Colors', colors: generateColors('danger') },
    { title: 'Info Colors', colors: generateColors('info') },
    { title: 'Neutral Colors', colors: generateColors('neutral') }
  ]

  return (
    <div className="bg-background text-foreground p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Brand Theme Color Showcase</h1>
          <button 
            onClick={toggleTheme}
            className="bg-primary text-on-primary px-4 py-2 rounded-lg hover:opacity-90 transition-opacity"
          >
            Toggle {isDark ? 'Light' : 'Dark'} Mode
          </button>
        </div>

        {colorSections.map(section => (
          <ColorSection key={section.title} {...section} />
        ))}

        <MaterialDesignSection />
        <SemanticSection />
      </div>
    </div>
  )
}