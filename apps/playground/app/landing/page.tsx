"use client";
import React, {useState, useEffect} from "react";
import {
  Moon,
  Sun,
  Zap,
  Box,
  Palette,
  Code,
  ArrowRight,
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
} from "lucide-react";
import {useTheme} from "@ideasui/theme";

export default function ComponentLibraryLanding() {
  const {theme, setTheme} = useTheme();
  const [scrollY, setScrollY] = useState(0);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      desc: "Optimized components for peak performance and minimal bundle size",
      color: "primary",
    },
    {
      icon: Palette,
      title: "Fully Themeable",
      desc: "Complete design system with dark mode and custom themes",
      color: "secondary",
    },
    {
      icon: Box,
      title: "80+ Components",
      desc: "Production-ready UI components for any project",
      color: "success",
    },
    {
      icon: Code,
      title: "TypeScript First",
      desc: "Full type safety and intellisense support",
      color: "info",
    },
    {
      icon: Shield,
      title: "Accessible",
      desc: "WCAG 2.1 compliant with keyboard navigation",
      color: "warning",
    },
    {
      icon: Layers,
      title: "Composable",
      desc: "Build complex UIs with simple building blocks",
      color: "danger",
    },
  ];

  const codeExamples = [
    {
      title: "Button Component",
      code: `<Button variant="primary">
  Click me
</Button>`,
    },
    {
      title: "Card Component",
      code: `<Card>
  <CardHeader>
    <CardTitle>Title</CardTitle>
  </CardHeader>
</Card>`,
    },
    {
      title: "Input Component",
      code: `<Input 
  placeholder="Email"
  type="email"
/>`,
    },
  ];

  return (
    <div className={theme}>
      <div className="bg-background text-foreground min-h-screen transition-colors duration-300">
        {/* Floating Header */}
        <header
          className={`fixed top-0 z-50 w-full transition-all duration-300 ${
            scrollY > 50 ? "bg-background/80 shadow-lg backdrop-blur-lg" : "bg-transparent"
          }`}
        >
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-20 items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="bg-primary absolute inset-0 rounded-xl opacity-50 blur" />
                  <div className="from-primary to-secondary relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br">
                    <Sparkles className="text-primary-foreground h-6 w-6" />
                  </div>
                </div>
                <span className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent">
                  IdeasUI
                </span>
              </div>

              <nav className="hidden items-center space-x-8 md:flex">
                <a
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  href="#features"
                >
                  Features
                </a>
                <a
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  href="#components"
                >
                  Components
                </a>
                <a
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  href="#docs"
                >
                  Docs
                </a>
                <a
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  href="#pricing"
                >
                  Pricing
                </a>
                <button
                  className="bg-muted hover:bg-muted/80 rounded-lg p-2.5 transition-all hover:scale-105"
                  onClick={toggleTheme}
                >
                  {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
                </button>
                <button className="bg-primary text-primary-foreground rounded-lg px-5 py-2.5 font-medium transition-all hover:scale-105 hover:opacity-90 hover:shadow-lg">
                  Get Started
                </button>
              </nav>
            </div>
          </div>
        </header>

        {/* Hero Section with Gradient Orbs */}
        <section className="relative overflow-hidden px-4 pt-32 pb-20 sm:px-6 lg:px-8">
          {/* Animated Background Orbs */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div className="bg-primary/20 absolute top-0 left-1/4 h-96 w-96 animate-pulse rounded-full blur-3xl" />
            <div
              className="bg-secondary/20 absolute right-1/4 bottom-0 h-96 w-96 animate-pulse rounded-full blur-3xl"
              style={{animationDelay: "1s"}}
            />
            <div
              className="bg-success/10 absolute top-1/2 left-1/2 h-96 w-96 animate-pulse rounded-full blur-3xl"
              style={{animationDelay: "2s"}}
            />
          </div>

          <div className="relative z-10 mx-auto max-w-7xl">
            <div className="mx-auto max-w-4xl text-center">
              {/* Badge */}
              <div className="bg-primary/10 border-primary/20 mb-8 inline-flex animate-bounce items-center space-x-2 rounded-full border px-4 py-2">
                <Rocket className="text-primary h-4 w-4" />
                <span className="text-primary text-sm font-semibold">
                  New Launch - v2.0 is here!
                </span>
              </div>

              {/* Main Heading */}
              <h1 className="mb-6 text-5xl leading-tight font-black sm:text-6xl lg:text-7xl">
                Build beautiful apps
                <br />
                <span className="from-primary via-secondary to-success animate-pulse bg-gradient-to-r bg-clip-text text-transparent">
                  in minutes, not days
                </span>
              </h1>

              <p className="text-muted-foreground mb-10 text-xl leading-relaxed sm:text-2xl">
                The most advanced React component library with 80+ components, full TypeScript
                support, and beautiful design out of the box.
              </p>

              {/* CTA Buttons */}
              <div className="mb-12 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <button className="group from-primary to-secondary text-primary-foreground hover:shadow-primary/50 flex items-center space-x-2 rounded-xl bg-gradient-to-r px-8 py-4 font-semibold transition-all hover:scale-105 hover:shadow-2xl">
                  <Play className="h-5 w-5 transition-transform group-hover:scale-110" />
                  <span>Start Building</span>
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </button>
                <button className="bg-card border-border hover:border-primary flex items-center space-x-2 rounded-xl border-2 px-8 py-4 font-semibold transition-all hover:scale-105 hover:shadow-lg">
                  <Github className="h-5 w-5" />
                  <span>View on GitHub</span>
                </button>
              </div>

              {/* Stats Bar */}
              <div className="mx-auto grid max-w-3xl grid-cols-2 gap-6 md:grid-cols-4">
                {[
                  {icon: Download, value: "100K+", label: "Downloads"},
                  {icon: Star, value: "12K+", label: "GitHub Stars"},
                  {icon: Box, value: "80+", label: "Components"},
                  {icon: Code, value: "99%", label: "Type Safe"},
                ].map((stat, idx) => (
                  <div
                    key={idx}
                    className="bg-card/50 border-border rounded-xl border p-4 backdrop-blur-sm transition-transform hover:scale-105"
                  >
                    <stat.icon className="text-primary mx-auto mb-2 h-6 w-6" />
                    <div className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-3xl font-bold text-transparent">
                      {stat.value}
                    </div>
                    <div className="text-muted-foreground text-sm">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Live Component Preview */}
        <section className="bg-muted/30 px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-12 text-center">
              <div className="bg-success/10 border-success/20 mb-4 inline-flex items-center space-x-2 rounded-full border px-4 py-2">
                <Lightbulb className="text-success h-4 w-4" />
                <span className="text-success text-sm font-semibold">Interactive Preview</span>
              </div>
              <h2 className="mb-4 text-4xl font-bold lg:text-5xl">See it in action</h2>
              <p className="text-muted-foreground text-xl">
                Components that look great and work perfectly
              </p>
            </div>

            <div className="grid items-center gap-8 lg:grid-cols-2">
              {/* Code Preview */}
              <div className="space-y-4">
                <div className="border-border flex space-x-2 border-b">
                  {codeExamples.map((example, idx) => (
                    <button
                      key={idx}
                      className={`border-b-2 px-4 py-2 font-medium transition-colors ${
                        activeTab === idx
                          ? "border-primary text-primary"
                          : "text-muted-foreground hover:text-foreground border-transparent"
                      }`}
                      onClick={() => setActiveTab(idx)}
                    >
                      {example.title}
                    </button>
                  ))}
                </div>
                <div className="border-border overflow-hidden rounded-xl border bg-neutral-950 p-6">
                  <pre className="text-success-400 font-mono text-sm">
                    <code>{codeExamples[activeTab].code}</code>
                  </pre>
                </div>
              </div>

              {/* Live Preview */}
              <div className="bg-card border-border rounded-2xl border p-8 shadow-2xl">
                <h3 className="text-muted-foreground mb-6 text-lg font-semibold">Live Preview</h3>
                <div className="space-y-4">
                  <div className="flex flex-wrap gap-3">
                    <button className="bg-primary text-primary-foreground rounded-lg px-6 py-3 font-medium transition-all hover:scale-105 hover:opacity-90">
                      Primary Button
                    </button>
                    <button className="bg-secondary text-secondary-foreground rounded-lg px-6 py-3 font-medium transition-all hover:scale-105 hover:opacity-90">
                      Secondary
                    </button>
                    <button className="border-primary text-primary hover:bg-primary hover:text-primary-foreground rounded-lg border-2 px-6 py-3 font-medium transition-all hover:scale-105">
                      Outline
                    </button>
                  </div>
                  <div className="from-primary/5 to-secondary/5 border-border rounded-xl border bg-gradient-to-br p-6">
                    <div className="mb-3 flex items-center space-x-3">
                      <div className="from-primary to-secondary h-12 w-12 rounded-full bg-gradient-to-br" />
                      <div>
                        <div className="font-semibold">Beautiful Card</div>
                        <div className="text-muted-foreground text-sm">With gradient accents</div>
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm">
                      Every component is crafted with attention to detail and modern design
                      principles.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="px-4 py-20 sm:px-6 lg:px-8" id="features">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold lg:text-5xl">
                Everything you need to
                <span className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-transparent">
                  {" "}
                  build amazing
                </span>
              </h2>
              <p className="text-muted-foreground mx-auto max-w-2xl text-xl">
                Powerful features that make development a breeze
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {features.map((feature, idx) => (
                <div
                  key={idx}
                  className="group bg-card border-border hover:border-primary/50 rounded-2xl border p-8 transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                >
                  <div
                    className={`h-14 w-14 bg-${feature.color}/10 border border-${feature.color}/20 mb-5 flex items-center justify-center rounded-xl transition-transform group-hover:scale-110`}
                  >
                    <feature.icon className={`h-7 w-7 text-${feature.color}`} />
                  </div>
                  <h3 className="mb-2 text-xl font-bold">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Component Showcase */}
        <section className="bg-muted/30 px-4 py-20 sm:px-6 lg:px-8" id="components">
          <div className="mx-auto max-w-7xl">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-4xl font-bold lg:text-5xl">
                Components that
                <span className="from-success to-info bg-gradient-to-r bg-clip-text text-transparent">
                  {" "}
                  just work
                </span>
              </h2>
              <p className="text-muted-foreground text-xl">
                From simple buttons to complex data tables
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
              {/* Component Card 1 */}
              <div className="bg-card border-border rounded-2xl border p-6 transition-all hover:shadow-xl">
                <div className="from-primary/20 to-secondary/20 mb-4 flex h-40 items-center justify-center rounded-xl bg-gradient-to-br">
                  <Layout className="text-primary h-16 w-16" />
                </div>
                <h3 className="mb-2 text-lg font-bold">Layout Components</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Grids, containers, and spacing utilities
                </p>
                <div className="text-primary flex items-center text-sm font-medium">
                  <span>15 Components</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>

              {/* Component Card 2 */}
              <div className="bg-card border-border rounded-2xl border p-6 transition-all hover:shadow-xl">
                <div className="from-success/20 to-info/20 mb-4 flex h-40 items-center justify-center rounded-xl bg-gradient-to-br">
                  <Box className="text-success h-16 w-16" />
                </div>
                <h3 className="mb-2 text-lg font-bold">Form Components</h3>
                <p className="text-muted-foreground mb-4 text-sm">
                  Inputs, selects, and validation
                </p>
                <div className="text-success flex items-center text-sm font-medium">
                  <span>25 Components</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>

              {/* Component Card 3 */}
              <div className="bg-card border-border rounded-2xl border p-6 transition-all hover:shadow-xl">
                <div className="from-warning/20 to-danger/20 mb-4 flex h-40 items-center justify-center rounded-xl bg-gradient-to-br">
                  <Layers className="text-warning h-16 w-16" />
                </div>
                <h3 className="mb-2 text-lg font-bold">Data Display</h3>
                <p className="text-muted-foreground mb-4 text-sm">Tables, lists, and cards</p>
                <div className="text-warning flex items-center text-sm font-medium">
                  <span>20 Components</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-5xl">
            <div className="from-primary via-secondary to-success relative overflow-hidden rounded-3xl bg-gradient-to-r p-12">
              <div className="bg-grid-pattern absolute inset-0 opacity-10" />
              <div className="relative z-10 text-center">
                <h2 className="text-primary-foreground mb-6 text-4xl font-bold lg:text-5xl">
                  Start building today
                </h2>
                <p className="text-primary-foreground/90 mx-auto mb-8 max-w-2xl text-xl">
                  Join thousands of developers who are already building amazing products with
                  IdeasUI
                </p>
                <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                  <button className="text-primary flex items-center space-x-2 rounded-xl bg-white px-8 py-4 font-semibold transition-all hover:scale-105 hover:shadow-2xl">
                    <span>Get Started Free</span>
                    <ArrowRight className="h-5 w-5" />
                  </button>
                  <button className="rounded-xl border-2 border-white bg-transparent px-8 py-4 font-semibold text-white transition-all hover:scale-105 hover:bg-white/10">
                    View Documentation
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-border bg-muted/20 border-t px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-7xl">
            <div className="mb-8 grid gap-8 md:grid-cols-4">
              <div className="col-span-2">
                <div className="mb-4 flex items-center space-x-3">
                  <div className="from-primary to-secondary flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br">
                    <Sparkles className="text-primary-foreground h-6 w-6" />
                  </div>
                  <span className="from-primary to-secondary bg-gradient-to-r bg-clip-text text-2xl font-bold text-transparent">
                    IdeasUI
                  </span>
                </div>
                <p className="text-muted-foreground mb-4">
                  The modern component library for building beautiful React applications.
                </p>
                <div className="flex space-x-4">
                  <a
                    className="bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg p-2 transition-colors"
                    href="#"
                  >
                    <Github className="h-5 w-5" />
                  </a>
                  <a
                    className="bg-muted hover:bg-primary hover:text-primary-foreground rounded-lg p-2 transition-colors"
                    href="#"
                  >
                    <Twitter className="h-5 w-5" />
                  </a>
                </div>
              </div>
              <div>
                <h4 className="mb-4 font-semibold">Product</h4>
                <ul className="text-muted-foreground space-y-2">
                  <li>
                    <a className="hover:text-primary transition-colors" href="#">
                      Components
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-primary transition-colors" href="#">
                      Templates
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-primary transition-colors" href="#">
                      Pricing
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="mb-4 font-semibold">Resources</h4>
                <ul className="text-muted-foreground space-y-2">
                  <li>
                    <a className="hover:text-primary transition-colors" href="#">
                      Documentation
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-primary transition-colors" href="#">
                      Blog
                    </a>
                  </li>
                  <li>
                    <a className="hover:text-primary transition-colors" href="#">
                      Support
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="border-border flex flex-col items-center justify-between border-t pt-8 md:flex-row">
              <p className="text-muted-foreground text-sm">© 2024 IdeasUI. All rights reserved.</p>
              <p className="text-muted-foreground text-sm">
                Built with React, TypeScript & Tailwind CSS
              </p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
