# ideasUI — UI Design Guide

> Goal: Developer-focused, clean, dark-first, fast, and inspiring — like shadcn/ui meets Vercel

---

## 1. Design Principles

| Principle           | How to Achieve                                              |
| ------------------- | ----------------------------------------------------------- |
| **Developer-first** | Code-centric layout, monospace fonts for code, copy buttons |
| **Clean**           | Minimal UI, lots of whitespace, no clutter                  |
| **Dark-first**      | Dark mode as default, light mode as option                  |
| **Fast**            | Instant search, quick navigation, no heavy animations       |
| **Inspiring**       | Beautiful component previews, subtle gradients              |

---

## 2. Color Palette

### Dark Mode (Default)

```
Background:     #09090B (near-black)
Surface/Card:   #18181B (zinc-900)
Surface Hover:  #27272A (zinc-800)
Text Primary:   #FAFAFA (zinc-50)
Text Secondary: #A1A1AA (zinc-400)
Accent:         #A78BFA (violet-400)
Accent Hover:   #8B5CF6 (violet-500)
Border:         #27272A (zinc-800)
Code BG:        #1C1C1E
```

### Light Mode

```
Background:     #FFFFFF
Surface/Card:   #F4F4F5 (zinc-100)
Text Primary:   #18181B (zinc-900)
Text Secondary: #71717A (zinc-500)
Accent:         #7C3AED (violet-600)
Border:         #E4E4E7 (zinc-200)
Code BG:        #F8F8FA
```

### Tailwind Config

```tsx
colors: {
  brand: {
    400: '#A78BFA',
    500: '#8B5CF6',
    600: '#7C3AED',
  },
}
```

---

## 3. Typography

### Fonts

```tsx
// Display/Body: Inter or Geist Sans
// Code: JetBrains Mono or Geist Mono

import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
```

### Scale

| Element       | Class                                           |
| ------------- | ----------------------------------------------- |
| Hero Heading  | `text-4xl md:text-6xl font-bold tracking-tight` |
| Page Title    | `text-3xl font-bold`                            |
| Section Title | `text-xl font-semibold`                         |
| Body          | `text-sm md:text-base text-zinc-400`            |
| Code          | `font-mono text-sm`                             |
| Badge         | `text-xs font-medium`                           |

---

## 4. Layout

### Docs Layout (Two-column)

```
┌──────┬──────────────────────────────────┐
│      │                                  │
│ Side │  Content Area                    │
│ bar  │  (MDX rendered docs)             │
│      │                                  │
│      │                                  │
└──────┴──────────────────────────────────┘
```

```tsx
// Docs layout
<div className="flex">
  <aside className="sticky top-16 h-[calc(100vh-4rem)] w-64 overflow-y-auto border-r border-zinc-800 p-4">
    <Sidebar />
  </aside>
  <main className="mx-auto max-w-3xl flex-1 px-8 py-12">{children}</main>
</div>
```

### Spacing

```
Navbar height:      h-16 (64px)
Sidebar width:      w-64 (256px)
Content max-width:  max-w-3xl (768px)
Section gap:        space-y-8
Code block padding: p-4
```

---

## 5. Component Preview Block

```tsx
<div className="overflow-hidden rounded-xl border border-zinc-800">
  {/* Preview */}
  <div className="flex items-center justify-center bg-zinc-950 p-8">
    {/* Live component render */}
  </div>

  {/* Code */}
  <div className="relative border-t border-zinc-800 bg-[#1C1C1E] p-4">
    <CopyButton />
    <pre className="overflow-x-auto font-mono text-sm text-zinc-300">{code}</pre>
  </div>
</div>
```

### Tab Switcher (Preview | Code)

```tsx
<div className="flex w-fit gap-1 rounded-lg bg-zinc-900 p-1">
  <button className="rounded-md bg-zinc-800 px-3 py-1.5 text-sm font-medium text-white">
    Preview
  </button>
  <button className="rounded-md px-3 py-1.5 text-sm font-medium text-zinc-400 hover:text-white">
    Code
  </button>
</div>
```

---

## 6. Code Block Styling

```tsx
// CodeBlock.tsx
<div className="group relative overflow-hidden rounded-lg border border-zinc-800 bg-[#1C1C1E]">
  {/* Language badge */}
  <div className="absolute top-2 left-3 text-xs text-zinc-500">tsx</div>

  {/* Copy button */}
  <button className="absolute top-2 right-2 rounded bg-zinc-700 px-2 py-1 text-xs text-zinc-300 opacity-0 transition group-hover:opacity-100 hover:bg-zinc-600">
    Copy
  </button>

  <pre className="overflow-x-auto p-4 pt-8 font-mono text-sm leading-relaxed">
    <code>{highlightedCode}</code>
  </pre>
</div>
```

---

## 7. Sidebar Navigation

```tsx
<nav className="space-y-6">
  {/* Section */}
  <div>
    <p className="mb-2 text-xs font-semibold tracking-wider text-zinc-500 uppercase">
      Getting Started
    </p>
    <ul className="space-y-1">
      <li>
        <a className="block rounded-md px-3 py-1.5 text-sm text-zinc-400 transition hover:bg-zinc-800 hover:text-white">
          Installation
        </a>
      </li>
      {/* Active state */}
      <li>
        <a className="block rounded-md bg-zinc-800 px-3 py-1.5 text-sm font-medium text-white">
          Theming
        </a>
      </li>
    </ul>
  </div>
</nav>
```

---

## 8. Search Dialog (Cmd+K)

```tsx
<div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 pt-[20vh] backdrop-blur-sm">
  <div className="w-full max-w-lg overflow-hidden rounded-xl border border-zinc-800 bg-zinc-900 shadow-2xl">
    <div className="flex items-center gap-3 border-b border-zinc-800 px-4 py-3">
      <Search className="h-4 w-4 text-zinc-500" />
      <input
        placeholder="Search components..."
        className="flex-1 bg-transparent text-sm text-white outline-none placeholder:text-zinc-500"
      />
      <kbd className="rounded bg-zinc-800 px-1.5 py-0.5 text-xs text-zinc-500">ESC</kbd>
    </div>
    {/* Results */}
    <div className="max-h-80 overflow-y-auto p-2">{/* Result items */}</div>
  </div>
</div>
```

---

## 9. Buttons & Interactive Elements

### Primary Button

```tsx
<button className="rounded-lg bg-white px-4 py-2 text-sm font-medium text-black transition-colors hover:bg-zinc-200">
  Get Started
</button>
```

### Ghost Button

```tsx
<button className="rounded-lg px-4 py-2 text-sm text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white">
  View Docs
</button>
```

### Install Command (Copyable)

```tsx
<div className="flex w-fit items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5">
  <code className="font-mono text-sm text-zinc-300">npx ideasui init</code>
  <CopyButton />
</div>
```

---

## 10. Hero Section

```tsx
<section className="relative py-28 text-center md:py-40">
  {/* Subtle gradient glow */}
  <div className="absolute inset-0 bg-gradient-to-b from-violet-500/10 via-transparent to-transparent" />

  <div className="relative mx-auto max-w-3xl px-6">
    <Badge>v1.0 — Now Available</Badge>

    <h1 className="mt-6 text-4xl font-bold tracking-tight text-white md:text-6xl">
      Build beautiful UIs
      <br />
      <span className="text-violet-400">with copy-paste components</span>
    </h1>

    <p className="mx-auto mt-4 max-w-xl text-lg text-zinc-400">
      Accessible, customizable, open-source React components built with Tailwind CSS.
    </p>

    {/* Install command */}
    <div className="mt-8 flex items-center justify-center gap-3">
      <div className="rounded-lg border border-zinc-800 bg-zinc-900 px-4 py-2.5 font-mono text-sm text-zinc-300">
        npx ideasui init
      </div>
      <CopyButton />
    </div>

    {/* CTA buttons */}
    <div className="mt-6 flex justify-center gap-3">
      <Link
        href="/docs"
        className="rounded-lg bg-white px-5 py-2.5 text-sm font-medium text-black hover:bg-zinc-200"
      >
        Get Started
      </Link>
      <Link
        href="/components"
        className="rounded-lg border border-zinc-700 px-5 py-2.5 text-sm text-zinc-300 hover:bg-zinc-800"
      >
        Browse Components
      </Link>
    </div>
  </div>
</section>
```

---

## 11. Animations

```
Hero glow:       Subtle pulsing gradient (opacity animation)
Code blocks:     Fade in on scroll
Sidebar links:   hover:bg transition 150ms
Search dialog:   Fade + scale in (150ms)
Copy button:     "Copied!" tooltip fade (2s auto-hide)
```

### Rules

- Keep animations under 200ms for interactions
- No scroll-jacking
- No heavy parallax
- Subtle opacity/transform only

---

## 12. Do's and Don'ts

### ✅ Do

- Use monospace font for all code
- Show live preview above code
- Add copy button on every code block
- Keep sidebar always visible on desktop
- Use keyboard shortcuts (Cmd+K for search)
- Show component props in a clean table
- Use dark background as default

### ❌ Don't

- Use colorful/playful design (keep it professional)
- Add unnecessary illustrations
- Use large hero images
- Make users scroll to find code
- Hide the sidebar on desktop
- Use light mode as default for dev tools
