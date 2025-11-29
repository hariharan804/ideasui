'use client'
import React, { useState, useEffect } from 'react'
import {
  Moon,
  Sun,
  Zap,
  Box,
  Palette,
  Code,
  ArrowRight,
  Check,
  Sparkles,
  Layout,
  Layers,
  Github,
  Twitter,
  Play,
  Star,
  Download,
  Rocket,
  Lightbulb,
  Shield,
} from 'lucide-react'
import { useTheme } from '@your-org/theme-controller'

export default function ComponentLibraryLanding() {
  const { theme, setTheme } = useTheme()
  const [scrollY, setScrollY] = useState(0)
  const [activeTab, setActiveTab] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light')

  const features = [
    {
      icon: Zap,
      title: 'Lightning Fast',
      desc: 'Optimized components for peak performance and minimal bundle size',
      color: 'primary',
    },
    {
      icon: Palette,
      title: 'Fully Themeable',
      desc: 'Complete design system with dark mode and custom themes',
      color: 'secondary',
    },
    {
      icon: Box,
      title: '80+ Components',
      desc: 'Production-ready UI components for any project',
      color: 'success',
    },
    {
      icon: Code,
      title: 'TypeScript First',
      desc: 'Full type safety and intellisense support',
      color: 'info',
    },
    {
      icon: Shield,
      title: 'Accessible',
      desc: 'WCAG 2.1 compliant with keyboard navigation',
      color: 'warning',
    },
    {
      icon: Layers,
      title: 'Composable',
      desc: 'Build complex UIs with simple building blocks',
      color: 'danger',
    },
  ]

  const codeExamples = [
    {
      title: 'Button Component',
      code: `<Button variant="primary">
  Click me
</Button>`,
    },
    {
      title: 'Card Component',
      code: `<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
</Card>`,
    },
    {
      title: 'Input Component',
      code: `<Input 
  placeholder="Email"
  type="email"
/>`,
    },
  ]

  return (
    <div className={theme}>
      <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
        {/* Floating Header */}
        <header
          className={`fixed top-0 w-full z-50 transition-all duration-300 ${
            scrollY > 50
              ? 'bg-background/80 backdrop-blur-lg shadow-lg'
              : 'bg-transparent'
          }`}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-20">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="absolute inset-0 bg-primary rounded-xl blur opacity-50"></div>
                  <div className="relative w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-primary-foreground" />
                  </div>
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  IdeasUI
                </span>
              </div>

              <nav className="hidden md:flex items-center space-x-8">
                <a
                  href="#features"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Features
                </a>
                <a
                  href="#components"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Components
                </a>
                <a
                  href="#docs"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Docs
                </a>
                <a
                  href="#pricing"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Pricing
                </a>
                <button
                  onClick={toggleTheme}
                  className="p-2.5 rounded-lg bg-muted hover:bg-muted/80 transition-all hover:scale-105"
                >
                  {theme === 'light' ? (
                    <Moon className="w-5 h-5" />
                  ) : (
                    <Sun className="w-5 h-5" />
                  )}
                </button>
                <button className="px-5 py-2.5 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-all hover:scale-105 hover:shadow-lg">
                  Get Started
                </button>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section with Gradient Orbs */}
        <section className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
          {/* Animated Background Orbs */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse"></div>
            <div
              className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: '1s' }}
            ></div>
            <div
              className="absolute top-1/2 left-1/2 w-96 h-96 bg-success/10 rounded-full blur-3xl animate-pulse"
              style={{ animationDelay: '2s' }}
            ></div>
          </div>

          <div className="max-w-7xl mx-auto relative z-10">
            <div className="text-center max-w-4xl mx-auto">
              {/* Badge */}
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-primary/10 border border-primary/20 rounded-full mb-8 animate-bounce">
                <Rocket className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold text-primary">
                  New Launch - v2.0 is here!
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black mb-6 leading-tight">
                Build beautiful apps
                <br />
                <span className="bg-gradient-to-r from-primary via-secondary to-success bg-clip-text text-transparent animate-pulse">
                  in minutes, not days
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-muted-foreground mb-10 leading-relaxed">
                The most advanced React component library with 80+ components,
                full TypeScript support, and beautiful design out of the box.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
                <button className="group px-8 py-4 bg-gradient-to-r from-primary to-secondary text-primary-foreground rounded-xl font-semibold transition-all hover:scale-105 hover:shadow-2xl hover:shadow-primary/50 flex items-center space-x-2">
                  <Play className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  <span>Start Building</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="px-8 py-4 bg-card border-2 border-border rounded-xl font-semibold transition-all hover:scale-105 hover:border-primary hover:shadow-lg flex items-center space-x-2">
                  <Github className="w-5 h-5" />
                  <span>View on GitHub</span>
                </button>
              </div>

              {/* Stats Bar */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
                {[
                  { icon: Download, value: '100K+', label: 'Downloads' },
                  { icon: Star, value: '12K+', label: 'GitHub Stars' },
                  { icon: Box, value: '80+', label: 'Components' },
                  { icon: Code, value: '99%', label: 'Type Safe' },
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="p-4 bg-card/50 backdrop-blur-sm border border-border rounded-xl hover:scale-105 transition-transform"
                  >
                    <stat.icon className="w-6 h-6 text-primary mx-auto mb-2" />
                    <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Live Component Preview */}
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 px-4 py-2 bg-success/10 border border-success/20 rounded-full mb-4">
                <Lightbulb className="w-4 h-4 text-success" />
                <span className="text-sm font-semibold text-success">
                  Interactive Preview
                </span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                See it in action
              </h2>
              <p className="text-xl text-muted-foreground">
                Components that look great and work perfectly
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Code Preview */}
              <div className="space-y-4">
                <div className="flex space-x-2 border-b border-border">
                  {codeExamples.map((example, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveTab(idx)}
                      className={`px-4 py-2 font-medium transition-colors border-b-2 ${
                        activeTab === idx
                          ? 'border-primary text-primary'
                          : 'border-transparent text-muted-foreground hover:text-foreground'
                      }`}
                    >
                      {example.title}
                    </button>
                  ))}
                </div>
                <div className="bg-neutral-950 p-6 rounded-xl border border-border overflow-hidden">
                  <pre className="text-success-400 font-mono text-sm">
                    <code>{codeExamples[activeTab].code}</code>
                  </pre>
                </div>
              </div>

              {/* Live Preview */}
              <div className="bg-card p-8 rounded-2xl border border-border shadow-2xl">
                <h3 className="text-lg font-semibold mb-6 text-muted-foreground">
                  Live Preview
                </h3>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    <button className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-medium hover:opacity-90 transition-all hover:scale-105">
                      Primary Button
                    </button>
                    <button className="px-6 py-3 bg-secondary text-secondary-foreground rounded-lg font-medium hover:opacity-90 transition-all hover:scale-105">
                      Secondary
                    </button>
                    <button className="px-6 py-3 border-2 border-primary text-primary rounded-lg font-medium hover:bg-primary hover:text-primary-foreground transition-all hover:scale-105">
                      Outline
                    </button>
                  </div>
                  <div className="p-6 bg-gradient-to-br from-primary/5 to-secondary/5 border border-border rounded-xl">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-primary to-secondary rounded-full"></div>
                      <div>
                        <div className="font-semibold">Beautiful Card</div>
                        <div className="text-sm text-muted-foreground">
                          With gradient accents
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      Every component is crafted with attention to detail and
                      modern design principles.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                Everything you need to
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  {' '}
                  build amazing
                </span>
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Powerful features that make development a breeze
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="group p-8 bg-card border border-border rounded-2xl hover:shadow-2xl hover:scale-105 transition-all duration-300 hover:border-primary/50"
                >
                  <div
                    className={`w-14 h-14 bg-${feature.color}/10 border border-${feature.color}/20 rounded-xl mb-5 flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <feature.icon className={`w-7 h-7 text-${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Component Showcase */}
        <section
          id="components"
          className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30"
        >
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl lg:text-5xl font-bold mb-4">
                Components that
                <span className="bg-gradient-to-r from-success to-info bg-clip-text text-transparent">
                  {' '}
                  just work
                </span>
              </h2>
              <p className="text-xl text-muted-foreground">
                From simple buttons to complex data tables
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {/* Component Card 1 */}
              <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-xl transition-all">
                <div className="h-40 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl mb-4 flex items-center justify-center">
                  <Layout className="w-16 h-16 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-2">Layout Components</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Grids, containers, and spacing utilities
                </p>
                <div className="flex items-center text-sm text-primary font-medium">
                  <span>15 Components</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>

              {/* Component Card 2 */}
              <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-xl transition-all">
                <div className="h-40 bg-gradient-to-br from-success/20 to-info/20 rounded-xl mb-4 flex items-center justify-center">
                  <Box className="w-16 h-16 text-success" />
                </div>
                <h3 className="text-lg font-bold mb-2">Form Components</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Inputs, selects, and validation
                </p>
                <div className="flex items-center text-sm text-success font-medium">
                  <span>25 Components</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>

              {/* Component Card 3 */}
              <div className="bg-card border border-border rounded-2xl p-6 hover:shadow-xl transition-all">
                <div className="h-40 bg-gradient-to-br from-warning/20 to-danger/20 rounded-xl mb-4 flex items-center justify-center">
                  <Layers className="w-16 h-16 text-warning" />
                </div>
                <h3 className="text-lg font-bold mb-2">Data Display</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Tables, lists, and cards
                </p>
                <div className="flex items-center text-sm text-warning font-medium">
                  <span>20 Components</span>
                  <ArrowRight className="w-4 h-4 ml-2" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-5xl mx-auto">
            <div className="relative overflow-hidden bg-gradient-to-r from-primary via-secondary to-success p-12 rounded-3xl">
              <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
              <div className="relative z-10 text-center">
                <h2 className="text-4xl lg:text-5xl font-bold text-primary-foreground mb-6">
                  Start building today
                </h2>
                <p className="text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
                  Join thousands of developers who are already building amazing
                  products with IdeasUI
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <button className="px-8 py-4 bg-white text-primary rounded-xl font-semibold hover:scale-105 transition-all hover:shadow-2xl flex items-center space-x-2">
                    <span>Get Started Free</span>
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-semibold hover:scale-105 transition-all hover:bg-white/10">
                    View Documentation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t border-border bg-muted/20">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8 mb-8">
              <div className="col-span-2">
                <div className="flex items-center space-x-3 mb-4">
                  <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    IdeasUI
                  </span>
                </div>
                <p className="text-muted-foreground mb-4">
                  The modern component library for building beautiful React
                  applications.
                </p>
                <div className="flex space-x-4">
                  <a
                    href="#"
                    className="p-2 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                  <a
                    href="#"
                    className="p-2 bg-muted rounded-lg hover:bg-primary hover:text-primary-foreground transition-colors"
                  >
                    <Twitter className="w-5 h-5" />
                  </a>
                </div>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Product</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      Components
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      Templates
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      Pricing
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-4">Resources</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      Blog
                    </a>
                  </li>
                  <li>
                    <a
                      href="#"
                      className="hover:text-primary transition-colors"
                    >
                      Support
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="pt-8 border-t border-border flex flex-col md:flex-row items-center justify-between">
              <p className="text-sm text-muted-foreground">
                © 2024 IdeasUI. All rights reserved.
              </p>
              <p className="text-sm text-muted-foreground">
                Built with React, TypeScript & Tailwind CSS
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}
