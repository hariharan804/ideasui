# IdeasUI — Landing Page & Docs Site Development Guide

> Next.js App Router · Tailwind CSS v4 · Fumadocs · OKLCH Color Engine · React Aria · MDX

---

## 1. What is IdeasUI?

A modern, open-source React component library and its documentation website — purpose-built with:

- **React Aria Components** for first-class accessibility (WCAG 2.1 AA)
- **Tailwind CSS v4** with a perceptual **OKLCH color engine**
- **Tailwind Variants (`tv()`)** for composable, recipe-based component styling
- **`@ideasui/theme`** for semantic CSS variable tokens
- **Fumadocs** for the MDX documentation system (replaces `next-mdx-remote`)
- **Framer Motion** for smooth animations on the landing page

Users can:

- Browse components with live interactive previews
- Copy install commands and code snippets
- Read installation/usage docs
- Switch between dark/light themes
- Search components via ⌘K dialog (Fumadocs built-in)

---

## 2. Landing Page Layout

```
┌─────────────────────────────────────────────────────┐
│  Navbar (Logo | Docs | Components | Changelog |     │
│          GitHub icon | Theme Toggle | Mobile Menu)  │
├─────────────────────────────────────────────────────┤
│  Hero                                               │
│  ├── Social proof chips (Stars · Forks · MIT)       │
│  ├── Badge (v1 · Tailwind v4 · OKLCH)               │
│  ├── Headline + gradient subline                    │
│  ├── CTAs (Get Started + Star on GitHub)            │
│  ├── Install Snippet (pnpm add @ideasui/react)      │
│  └── Hero Code Preview (Preview | Code tab)         │
├─────────────────────────────────────────────────────┤
│  Stats Strip (50+ Components | 100% Open Source |   │
│              Tailwind v4 | WCAG AA)                 │
├─────────────────────────────────────────────────────┤
│  Feature Grid (6 cards — "Why IdeasUI?")            │
├─────────────────────────────────────────────────────┤
│  Bento Highlight                                    │
│  ├── Intent-First API card (3-col)                  │
│  ├── Accessibility First card                       │
│  └── Zero Runtime Cost card                         │
├─────────────────────────────────────────────────────┤
│  CTA Banner ("Start building today")                │
├─────────────────────────────────────────────────────┤
│  Footer (Logo · MIT · Docs · Components ·           │
│          Changelog · GitHub)                        │
└─────────────────────────────────────────────────────┘
```

---

## 3. Routing

| Route                           | Purpose                                     |
| ------------------------------- | ------------------------------------------- |
| `/`                             | Landing page (`apps/docs/app/page.tsx`)     |
| `/react/docs/start`             | Getting started / introduction docs         |
| `/react/docs/components/button` | Component detail (Fumadocs-powered MDX)     |
| `/react/docs/changelog`         | Version history                             |
| `/changelog`                    | Changelog page (`apps/docs/app/changelog/`) |
| `/api/*`                        | API routes (`apps/docs/app/api/`)           |

> **Note:** The docs routes live under `/react/docs/` because content is in `apps/docs/content/react/`. Fumadocs auto-generates routes from that directory tree.

---

## 4. Tech Stack

### Monorepo

```
pnpm-workspace monorepo (Turborepo)
├── apps/
│   ├── docs/         ← Next.js 16 docs + landing site
│   ├── playground/   ← Component sandbox
│   └── storybook/    ← Chromatic visual tests
└── packages/
    ├── components/   ← UI component packages (e.g. button/)
    ├── core/
    │   ├── react/    ← @ideasui/react — re-exports all components
    │   ├── styles/   ← @ideasui/styles — base CSS
    │   └── theme/    ← @ideasui/theme — design tokens + ThemeScript
    └── utils/        ← @ideasui/utils — shared utilities (cn, etc.)
```

### Docs App Dependencies (`apps/docs/package.json`)

| Package             | Version   | Purpose                      |
| ------------------- | --------- | ---------------------------- |
| `next`              | 16.2.4    | App Router framework         |
| `react`             | 19.2.4    | UI runtime                   |
| `fumadocs-ui`       | 16.x      | Docs layout, sidebar, search |
| `fumadocs-core`     | 16.x      | MDX processing               |
| `fumadocs-mdx`      | 15.x      | MDX loader / source config   |
| `tailwindcss`       | v4        | Utility-first CSS            |
| `framer-motion`     | 12.x      | Landing page animations      |
| `next-themes`       | 0.4.6     | Dark/light theme switching   |
| `shiki`             | 3.x       | Syntax highlighting          |
| `lucide-react`      | 0.474     | Icons                        |
| `@ideasui/react`    | workspace | All component re-exports     |
| `@ideasui/theme`    | workspace | Token system + ThemeScript   |
| `@ideasui/utils`    | workspace | `cn()`, utilities            |
| `tailwind-variants` | 3.x       | `tv()` variant recipes       |
| `zod`               | 4.x       | Schema validation            |

### Setup Command

```bash
# From repo root (pnpm workspace)
pnpm install

# Start docs dev server
pnpm dev --filter @ideasui/docs
# or from apps/docs/
NODE_OPTIONS='--max-old-space-size=8192' next dev --webpack
```

---

## 5. Actual Folder Structure (`apps/docs/`)

```
apps/docs/
├── app/
│   ├── layout.tsx                  # Root layout — RootProvider, Navbar, ThemeBridge
│   ├── page.tsx                    # Landing page (all sections inlined, ~621 lines)
│   ├── globals.css                 # Base styles + CSS custom properties
│   ├── changelog/                  # Changelog route
│   ├── react/
│   │   └── docs/                   # Fumadocs auto-generated docs routes
│   └── api/                        # API routes
├── components/
│   ├── site-nav/
│   │   └── navbar.tsx              # Sticky navbar (hidden on /docs routes)
│   ├── docs-ui/
│   │   ├── custom-search-dialog.tsx # ⌘K search (Fumadocs override)
│   │   ├── github-button.tsx
│   │   ├── icons.tsx               # Custom SVG icon components
│   │   ├── theme-toggle.tsx
│   │   ├── search-toggle.tsx
│   │   ├── docs-badge.tsx
│   │   ├── copy-dropdown.tsx
│   │   ├── language-toggle.tsx
│   │   └── link-item.tsx
│   ├── layout/
│   │   ├── docs-layout/            # Fumadocs docs layout wrapper
│   │   └── layout.config.tsx       # Fumadocs sidebar/nav config
│   ├── mdx/                        # MDX component overrides
│   └── ui/
│       ├── logo.tsx                # IdeasUI logo component
│       ├── props-table.tsx         # Component API props table
│       ├── token-viewer.tsx        # Design token explorer
│       ├── theme-bridge.tsx        # Syncs next-themes → IdeasUI theme
│       └── external-link.tsx
├── content/
│   └── react/                      # MDX source files (Fumadocs)
│       ├── changelog.mdx
│       ├── meta.json
│       ├── start/                  # Getting started docs
│       └── components/             # Per-component MDX files
├── config/
│   └── site.ts                     # siteConfig (name, url, GitHub links)
├── hooks/                          # Custom React hooks
├── lib/                            # Utilities (mdx helpers, etc.)
├── public/                         # Static assets
├── showcase/                       # Component showcase helpers
├── components-registry.ts          # Registry of all components for docs
├── source.config.ts                # Fumadocs source configuration
├── next.config.mjs
└── package.json
```

---

## 6. Dark/Light Theme System

The theme system is **not** `next-themes` alone — it uses a custom `@ideasui/theme` package
that generates semantic CSS custom property tokens.

```tsx
// apps/docs/app/layout.tsx
import { ThemeScript } from '@ideasui/theme';
import { RootProvider } from 'fumadocs-ui/provider/next';
import { ThemeBridge } from '@/components/ui/theme-bridge';
import { Navbar } from '@/components/site-nav/navbar';

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        {/* Inlines a blocking script to prevent flash — reads from localStorage */}
        <ThemeScript defaultTheme="light" />
      </head>
      <body>
        <RootProvider search={{ SearchDialog: CustomSearchDialog }}>
          <ThemeBridge>
            <Navbar />
            {children}
          </ThemeBridge>
        </RootProvider>
      </body>
    </html>
  );
}
```

> **Default theme is `light`** — unlike the original BRD which specified dark. Adjusted to match actual implementation.

### ThemeBridge

`ThemeBridge` (`components/ui/theme-bridge.tsx`) syncs `next-themes` state into the IdeasUI CSS
token layer, so both Fumadocs UI and IdeasUI components use the same resolved theme.

### Semantic Token Usage Rule

> **Rule:** Never hardcode `bg-zinc-900` or `text-violet-400`. Always use semantic CSS variable-backed tokens from `@ideasui/theme`.

```tsx
// Correct — semantic tokens
className = 'bg-background text-content-primary';
className = 'bg-surface text-content-secondary';
className = 'border-border-subtle';
className = 'text-content-muted';

// Wrong — raw Tailwind colors
className = 'bg-zinc-950 text-white';
className = 'text-violet-400';
```

---

## 7. Component Architecture

Components live in `packages/components/<name>/src/`. Each follows a **flat structure**:

```
packages/components/button/
├── src/
│   ├── button.tsx               # Main component (React.forwardRef + tv() recipes)
│   ├── button.types.ts          # TypeScript props interface
│   ├── button-group.tsx         # Companion component
│   ├── button-group-context.tsx
│   └── index.ts                 # Barrel export
├── __tests__/
├── stories/
├── package.json
└── tsup.config.ts
```

### Component Conventions

```tsx
// packages/components/button/src/button.tsx
import { tv } from 'tailwind-variants';
import { cn } from '@ideasui/utils';

// Styling via tv() recipes — NOT ad-hoc Tailwind classes
const buttonVariants = tv({
  base: 'inline-flex items-center justify-center font-medium transition-all',
  variants: {
    color: {
      primary: 'bg-primary text-primary-foreground',
      secondary: 'bg-secondary text-secondary-foreground',
      error: 'bg-dangertext-error-foreground',
    },
    variant: {
      solid: '',
      outline: 'bg-transparent border border-current',
      soft: 'bg-opacity-15',
      ghost: 'bg-transparent',
    },
    size: {
      sm: 'h-8 px-3 text-xs',
      md: 'h-10 px-4 text-sm',
      lg: 'h-12 px-6 text-base',
    },
  },
  defaultVariants: { color: 'primary', variant: 'solid', size: 'md' },
});

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, color, variant, size, ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ color, variant, size }), className)}
      {...props}
    />
  ),
);
Button.displayName = 'Button';
```

### Consuming Components in Docs

```tsx
// Import from the unified re-export package
import { Button, ButtonGroup } from '@ideasui/react';

// Usage on landing page (page.tsx)
<Button color="primary" size="md">Get Started</Button>
<Button variant="outline" size="md">Learn More</Button>
<Button color="error" variant="soft" size="md">Destructive</Button>
<ButtonGroup>
  <Button color="primary">Option A</Button>
  <Button variant="outline">Option B</Button>
</ButtonGroup>
```

---

## 8. Component Categories (Current Status)

| Category                | Status       | Package          |
| ----------------------- | ------------ | ---------------- |
| Button, ButtonGroup     | ✅ Available | `@ideasui/react` |
| Input, Textarea, Select | 🔜 Planned   | —                |
| Modal / Drawer          | 🔜 Planned   | —                |
| Card                    | 🔜 Planned   | —                |
| Badge                   | 🔜 Planned   | —                |
| Toast / Alert           | 🔜 Planned   | —                |
| Tabs / Accordion        | 🔜 Planned   | —                |

> Only **Button** is currently in `packages/components/`. All other components are roadmap items.
> The `50+` stat shown on the landing page is aspirational.

---

## 9. Landing Page — Actual Implementation

The landing page is implemented as a **single client component** at `apps/docs/app/page.tsx`
(~621 lines). All sections are defined inline — there are **no separate landing component files**
like `Hero.tsx`, `Features.tsx`, etc. (Those remain BRD targets, not current implementation.)

### Tech Used on Landing Page

```
'use client'   — required for framer-motion + useState
framer-motion  — fadeUp / fadeIn animation helpers
lucide-react   — icons (Palette, Accessibility, Zap, Star, etc.)
@ideasui/react — Button, ButtonGroup (live interactive preview)
next/link      — CTAs and navigation links
```

### Animation Helpers

```tsx
const fadeUp = (delay = 0): MotionProps => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
});

const fadeIn = (delay = 0): MotionProps => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { duration: 0.5, delay, ease: 'easeOut' },
});
```

### Install Command

```bash
pnpm add @ideasui/react @ideasui/theme
```

> **The original BRD had the wrong install command.** `npx ideasui init` and `npm install @ideasui/react`
> are not correct. The actual install uses `pnpm add` for both packages.

---

## 10. Section-by-Section Implementation Guide

### Section 1 — Navbar (`components/site-nav/navbar.tsx`)

```
Logo (IdeasUI) | Docs | Components | Changelog | [GitHub icon] | [Theme Toggle]
Mobile: [Theme Toggle] + [Hamburger → slide-down drawer]
```

Key behaviors:

- Sticky, `backdrop-blur-md`, `bg-background/80` via semantic tokens
- **Auto-hidden on `/docs` routes** — Fumadocs provides its own navbar inside the docs layout
- Nav links: `/react/docs/start`, `/react/docs/components/button`, `/changelog`
- GitHub link: `https://github.com/ideas2logic-lab/ideasui`
- Theme toggle: `next-themes` `setTheme()`, shows `Sun` / `Moon` from lucide-react
- Mobile: hamburger (`Menu` / `X`) opens a `flex-col` nav drawer below the header

```tsx
<header className="border-border-subtle bg-background/80 sticky top-0 z-50 w-full border-b backdrop-blur-md">
  <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
    <Link href="/">
      <Logo />
    </Link>

    {/* Desktop — hidden on mobile */}
    <nav className="flex items-center gap-6 max-md:hidden">
      {links.map((link) => (
        <Link key={link.href} href={link.href}>
          {link.label}
        </Link>
      ))}
      <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}>
        {theme === 'dark' ? <Sun /> : <Moon />}
      </button>
      <a href="https://github.com/ideas2logic-lab/ideasui">
        <Github />
      </a>
    </nav>

    {/* Mobile */}
    <div className="flex items-center gap-3 md:hidden">
      <ThemeToggleButton />
      <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        {mobileMenuOpen ? <X /> : <Menu />}
      </button>
    </div>
  </div>
  {mobileMenuOpen && <MobileDrawer links={links} />}
</header>
```

---

### Section 2 — Hero

> Goal: Communicate value in under 5 seconds. All elements animate in with `fadeUp`.

```
[Social proof chips]   ★ 2.4k   ⑂ 180+   MIT
[Badge]                IdeasUI v1 · Tailwind CSS v4 · OKLCH Color Engine
[H1]                   Build stunning UIs
                       without the friction   ← gradient text (blue→violet→blue)
[Subtitle]             Open-source React component library powered by
                       Tailwind CSS v4 and a perceptual OKLCH color engine.
[CTAs]                 [Get Started →]   [★ Star on GitHub]
[Install cmd]          pnpm add @ideasui/react @ideasui/theme   [Copy]
[Code Preview]         ┌─ App.tsx — IdeasUI ─────────── [Preview | Code] ─┐
                       │  Live interactive Button components / Code view   │
                       └──────────────────────────────────────────────────┘
```

Design details:

- Background: radial dot grid pattern + ambient blue/violet glow blobs (`blur-3xl`)
- Social proof chips: pill badges with `border border-black/10 bg-black/5`
- Badge: `border-blue-500/25 bg-blue-500/8` with animated `animate-pulse` dot
- Headline: `text-5xl md:text-6xl lg:text-[72px] font-extrabold tracking-tight`
- Gradient subline: `bg-gradient-to-r from-blue-600 via-violet-500 to-blue-600 bg-clip-text text-transparent`
- Primary CTA: `bg-blue-600 shadow-blue-600/25 hover:bg-blue-500 active:scale-95`
- Secondary CTA: glass button `border border-black/12 bg-black/5 backdrop-blur-sm`
- Install snippet: copyable pill with `Terminal` icon, `font-mono`, `backdrop-blur-md`
- Code preview: macOS-style window chrome (red/yellow/green dots), Preview / Code tab switcher

```tsx
const SOCIAL_PROOF = [
  { value: '2.4k', label: 'GitHub Stars', icon: <Star className="size-3.5" /> },
  { value: '180+', label: 'Forks', icon: <GitFork className="size-3.5" /> },
  { value: 'MIT', label: 'License', icon: <ShieldCheck className="size-3.5" /> },
];

const cmd = 'pnpm add @ideasui/react @ideasui/theme';

// CTA hrefs
href = '/react/docs/start'; // Get Started
href = 'https://github.com/ideas2logic-lab/ideasui'; // GitHub
```

---

### Section 3 — Stats Strip

> Goal: Social proof through numbers. Animated in with `whileInView` scroll triggers.

```
┌──────────────┬──────────────┬────────────────┬──────────────┐
│  📦  50+     │  🌐  100%    │  ✨  v4        │  🛡  AA      │
│  UI Components│ Open Source  │ Tailwind CSS   │ Accessibility│
└──────────────┴──────────────┴────────────────┴──────────────┘
```

```tsx
const STATS = [
  { label: 'UI Components', value: '50+', icon: <Box className="size-4" /> },
  { label: 'Open Source', value: '100%', icon: <Globe className="size-4" /> },
  { label: 'Tailwind CSS', value: 'v4', icon: <Sparkles className="size-4" /> },
  { label: 'Accessibility', value: 'AA', icon: <ShieldCheck className="size-4" /> },
];
```

Design: `bg-surface-subtle border-y`, divided by `divide-x divide-black/8`.
Stat values use `bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent`
in light mode and a white gradient in dark mode.

---

### Section 4 — Feature Grid

> Goal: Answer "why should I use this?" with 6 scannable cards.

```tsx
const FEATURES = [
  {
    title: 'Perceptual OKLCH Engine',
    iconColor: 'text-violet-400',
    gradient: 'from-violet-500/20 to-blue-500/20',
  },
  {
    title: 'WCAG 2.1 AA Built-in',
    iconColor: 'text-emerald-400',
    gradient: 'from-emerald-500/20 to-teal-500/20',
  },
  {
    title: 'Tree-Shakeable & Modular',
    iconColor: 'text-blue-400',
    gradient: 'from-blue-500/20 to-cyan-500/20',
  },
  {
    title: 'Copy & Paste Ready',
    iconColor: 'text-orange-400',
    gradient: 'from-orange-500/20 to-amber-500/20',
  },
  {
    title: 'CSS-Driven Dark Mode',
    iconColor: 'text-pink-400',
    gradient: 'from-pink-500/20 to-rose-500/20',
  },
  {
    title: 'Zero Runtime Overhead',
    iconColor: 'text-yellow-400',
    gradient: 'from-yellow-500/20 to-orange-500/20',
  },
];
```

Card design:

- `rounded-2xl border border-black/8 bg-surface shadow-sm`
- Hover: gradient glow blob appears (`-top-8 -right-8 blur-2xl opacity-0 → opacity-100`)
- Icon container scales: `group-hover:scale-110`
- Card lifts: `hover:-translate-y-1 hover:shadow-lg`

---

### Section 5 — Bento Highlight

> Goal: Showcase two defining qualities in a visually rich bento layout.

```
┌────────────────────────────────┬──────────────────────────┐
│  Intent-First Component API    │  Accessibility First      │
│  (col-span-3)                  │  (col-span-2, row 1)     │
│  primary, secondary, outline   ├──────────────────────────┤
│  [Live Button components]      │  Zero Runtime Cost        │
│                                │  (col-span-2, row 2)     │
└────────────────────────────────┴──────────────────────────┘
```

- Layout: `grid gap-4 lg:grid-cols-5`
- Left card: `col-span-3`, right column: `col-span-2 flex flex-col gap-4`
- Left card contains **live Button components** from `@ideasui/react`
- Animated in with `x: -20` / `x: 20` slide transitions

---

### Section 6 — CTA Banner

> Goal: Convert visitors into users. Centered, elevated card with gradient background.

```
         ✨  (floating animated bounce icon)
    Start building today
    Drop IdeasUI into any React project…
    [View Documentation →]   [GitHub]
```

- Card: `rounded-3xl bg-surface-subtle border border-black/10` with radial gradient overlay and dot grid background
- Icon bounces: `animate={{ y: [0, -4, 0] }}` infinite loop
- Primary CTA → `/react/docs/start`
- Secondary CTA → GitHub repo

---

### Section 7 — Footer

```
[I] IdeasUI  © 2026 · MIT License        Docs · Components · Changelog · GitHub
```

Links:

- Docs: `/react/docs/start`
- Components: `/react/docs/components/button`
- Changelog: `/react/docs/changelog`
- GitHub: `https://github.com/ideas2logic-lab/ideasui`

---

## 11. Visual Design System

### 3-Layer Background System

```
Layer 1 — Background:      var(--background)       — page base
Layer 2 — Surface:         var(--surface)          — cards, panels
Layer 3 — Surface-Subtle:  var(--surface-subtle)   — hover states, strips
```

### Semantic Token Classes

```
bg-background        text-content-primary     — main page + primary text
bg-surface           text-content-secondary   — cards + secondary text
bg-surface-subtle    text-content-tertiary    — strips + tertiary text
border-border-subtle        text-content-muted       — dividers + muted text
```

### Accent Colors (Landing Page)

```
Blue:   blue-600 / blue-400    — primary CTA, headings, links
Violet: violet-500 / violet-400 — gradient partner, features
```

### Gradient Techniques

```tsx
// Hero headline gradient
<span className="bg-gradient-to-r from-blue-600 via-violet-500 to-blue-600
  bg-clip-text text-transparent dark:from-blue-400 dark:via-violet-400 dark:to-blue-400">
  without the friction
</span>

// Ambient hero glow blobs
<div className="absolute top-0 left-1/2 h-[600px] w-[900px] -translate-x-1/2
  rounded-full bg-gradient-to-b from-blue-600/10 via-violet-600/6 to-transparent blur-3xl" />

// Section divider
<div className="h-px bg-gradient-to-r from-transparent via-zinc-700 to-transparent" />
```

### Micro-Interactions

```tsx
// Card hover lift
className = 'hover:-translate-y-1 hover:shadow-lg transition-all duration-300';

// CTA press feedback
className = 'active:scale-95 transition-transform duration-200';

// Button shadow glow
className = 'hover:shadow-lg hover:shadow-blue-600/25 transition-shadow duration-200';

// Feature card icon scale
className = 'group-hover:scale-110 transition-transform duration-300';

// Link color transition
className = 'text-content-muted hover:text-content-primary transition-colors';
```

---

## 12. Responsive Strategy

### Breakpoints

| Screen  | Size         | Layout                               |
| ------- | ------------ | ------------------------------------ |
| Mobile  | `< 640px`    | Single column, stacked CTAs          |
| Tablet  | `640–1024px` | 2 columns, hidden desktop nav        |
| Desktop | `> 1024px`   | Full layout, sidebar visible in docs |
| Wide    | `> 1280px`   | `max-w-7xl` containers centered      |

### Key Responsive Patterns

```tsx
// Hero padding
<section className="pt-28 pb-16 lg:pt-36 lg:pb-24">
<h1 className="text-5xl md:text-6xl lg:text-[72px] font-extrabold">

// Features: 1 → 2 → 3 columns
<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

// Stats: 2 → 4 columns
<div className="grid grid-cols-2 gap-0 md:grid-cols-4">

// Bento: stack on mobile, 5-col grid on desktop
<div className="grid gap-4 lg:grid-cols-5">

// CTAs wrap on narrow screens
<div className="flex flex-wrap items-center justify-center gap-3">
```

### Touch & Mobile UX Rules

```
✅ Tap targets minimum 44×44px
✅ No hover-only interactions
✅ Install snippet pill scrolls horizontally on small screens (overflow-x-auto)
✅ Code blocks scroll horizontally, never wrap
✅ Font size never below 14px on mobile
✅ Line length max ~65 chars (max-w-2xl or max-w-prose)
✅ Navbar collapses to hamburger on mobile (< md breakpoint)
```

---

## 13. Fumadocs Integration

The docs are powered by **Fumadocs** (not custom MDX pipelines), which provides:

- Auto-generated sidebar from `content/react/` directory + `meta.json`
- Built-in ⌘K search (overridden with `CustomSearchDialog`)
- Responsive docs layout with mobile sidebar
- Syntax highlighting via Shiki
- Code copy buttons

```tsx
// source.config.ts — defines the docs content source for Fumadocs
// layout.config.tsx — configures Fumadocs sidebar, navigation, links

// /react/docs/* routes are rendered by Fumadocs' auto page component
// MDX content source: apps/docs/content/react/**/*.mdx
```

> **Fumadocs has its own Navbar inside `/docs` routes.**
> The custom `Navbar` component calls `usePathname()` and returns `null` when `pathname.includes('/docs')`.

---

## 14. Trust Signals

| Signal             | Where                  | Implementation                                      |
| ------------------ | ---------------------- | --------------------------------------------------- |
| GitHub stars count | Hero social chips      | Hardcoded `2.4k` (upgrade to live API)              |
| Fork count         | Hero social chips      | Hardcoded `180+`                                    |
| MIT License        | Hero chips + Footer    | `ShieldCheck` icon                                  |
| Open source        | Stats strip            | `100% Open Source` stat                             |
| WCAG AA            | Stats strip + Features | `AA` stat + Accessibility feature card              |
| Live components    | Hero code preview      | Real `Button` / `ButtonGroup` from `@ideasui/react` |
| Version badge      | Hero                   | `IdeasUI v1 · Tailwind CSS v4 · OKLCH Color Engine` |
| Active maintenance | Footer changelog link  | `/react/docs/changelog`                             |

### GitHub Stars — Live API (Upgrade Path)

```tsx
// Upgrade from hardcoded → live fetch (RSC-compatible)
async function getGitHubStars(): Promise<{ stars: number; forks: number }> {
  const res = await fetch('https://api.github.com/repos/ideas2logic-lab/ideasui', {
    next: { revalidate: 3600 },
  });
  const data = await res.json();
  return { stars: data.stargazers_count ?? 0, forks: data.forks_count ?? 0 };
}
```

---

## 15. Content & Copy Guidelines

### Hero Headline (Current)

```
"Build stunning UIs
without the friction"
```

### Feature Card Copy — Strong vs. Weak

```
✅ "Perceptual OKLCH Engine — color tokens with uniform lightness across themes"
✅ "WCAG 2.1 AA Built-in — React Aria powers keyboard nav & ARIA states automatically"
✅ "Copy & Paste Ready — drop into React, Next.js, or Vite with zero extra config"
✅ "CSS-Driven Dark Mode — no runtime context providers required"
✅ "Zero Runtime Overhead — pure CSS recipes, 60fps guaranteed"

❌ Weak: "Dark mode support"
❌ Weak: "Accessible"
❌ Weak: "TypeScript"
```

### Bento Intent-First Copy

```
"Semantic names like `primary`, `secondary`, `outline` — not visual descriptions.
Your code stays readable at scale."
```

---

## 16. Site Configuration

```ts
// apps/docs/config/site.ts
export const siteConfig = {
  name: 'IdeasUI',
  description: 'A beautiful, accessible, and premium React component library built on React Aria.',
  url: 'https://ideasui.dev',
  links: {
    github: 'https://github.com/ideas2logic-lab/ideasui',
    packageBase: 'https://github.com/ideas2logic-lab/ideasui/tree/main/packages',
    componentsBase: 'https://github.com/ideas2logic-lab/ideasui/tree/main/packages/components',
    storybook: 'http://localhost:6006',
  },
};
```

---

## 17. Quick Start Checklist

### Landing Page

- [x] Hero section with gradient headline, animated badges, framer-motion
- [x] Install snippet with copy button (`pnpm add @ideasui/react @ideasui/theme`)
- [x] Hero code preview (Preview / Code tab switcher with live Button components)
- [x] Stats strip (50+ | 100% | v4 | AA)
- [x] Feature grid (6 cards with hover glow)
- [x] Bento highlight (Intent-First API | A11y | Zero Runtime)
- [x] CTA banner with animated floating icon
- [x] Footer with all links
- [x] Responsive layout (mobile → desktop)
- [x] Navbar with mobile hamburger drawer
- [x] Dark/light theme toggle (ThemeScript + next-themes)
- [ ] Live GitHub stars API fetch (currently hardcoded)
- [ ] Testimonials section
- [ ] Component showcase section (beyond Button)

### Docs

- [x] Fumadocs setup with custom search dialog
- [x] `content/react/` MDX pages
- [x] Button component docs with props table
- [x] ThemeBridge integration
- [ ] More component MDX files (Input, Card, Badge, etc.)
- [ ] Design token viewer page
- [ ] Examples page

### Infrastructure

- [x] Monorepo (Turborepo + pnpm workspaces)
- [x] `@ideasui/react` unified package
- [x] `@ideasui/theme` token system
- [x] Changeset-based versioning
- [x] Storybook / Chromatic visual tests
- [x] Vitest unit tests
- [x] Playwright E2E tests
- [ ] Deploy on Vercel (`ideasui.dev`)
