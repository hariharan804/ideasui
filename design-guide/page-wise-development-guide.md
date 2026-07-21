# ideasUI — Page-Wise Development Guide

> Detailed layout and content for each page of the ideasUI component library website

---

## 1. Landing Page (`/`)

### Sections

```
┌─────────────────────────────────────────┐
│  Navbar                                 │
├─────────────────────────────────────────┤
│  Hero (Tagline + Install Cmd + CTAs)    │
├─────────────────────────────────────────┤
│  Features Grid (6 cards)                │
├─────────────────────────────────────────┤
│  Component Showcase (Live Previews)     │
├─────────────────────────────────────────┤
│  Stats (Components | Open Source)       │
├─────────────────────────────────────────┤
│  Community / GitHub CTA                 │
├─────────────────────────────────────────┤
│  Footer                                 │
└─────────────────────────────────────────┘
```

### Code Structure

```tsx
// src/app/page.tsx
import Hero from '@/components/landing/Hero';
import Features from '@/components/landing/Features';
import Showcase from '@/components/landing/Showcase';
import Stats from '@/components/landing/Stats';
import CommunityCTA from '@/components/landing/CommunityCTA';

export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Showcase />
      <Stats />
      <CommunityCTA />
    </>
  );
}
```

### Hero Content

```
Badge:       "v1.0 — Now Available"
Headline:    "Build beautiful UIs with copy-paste components"
Subtext:     "Accessible, customizable, open-source React components built with Tailwind CSS."
Install:     npx ideasui init
CTA 1:       "Get Started" → /docs
CTA 2:       "Browse Components" → /components
```

### Features Grid

| Feature      | Icon          | Description                               |
| ------------ | ------------- | ----------------------------------------- |
| Copy & Paste | Clipboard     | Just copy the code, no npm install needed |
| Dark Mode    | Moon          | Built-in dark mode for every component    |
| Accessible   | Accessibility | WAI-ARIA compliant out of the box         |
| TypeScript   | FileCode      | Full type safety and IntelliSense         |
| Customizable | Paintbrush    | CSS variables for easy theming            |
| Lightweight  | Zap           | Zero runtime, just Tailwind classes       |

### Stats

```
50+   Components
100%  Open Source
0     Runtime Dependencies
∞     Customization
```

---

## 2. Docs Index Page (`/docs`)

### Layout

```
┌──────┬──────────────────────────────────┐
│      │  Getting Started                 │
│ Side │                                  │
│ bar  │  Welcome to ideasUI...           │
│      │  Quick install + first steps     │
│      │                                  │
│      │  Next: Installation →            │
└──────┴──────────────────────────────────┘
```

### Code Structure

```tsx
// src/app/docs/layout.tsx
import Sidebar from '@/components/layout/Sidebar';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="mx-auto max-w-3xl flex-1 px-8 py-12">{children}</main>
    </div>
  );
}
```

### Sidebar Sections

```
Getting Started
  ├── Introduction
  ├── Installation
  ├── Theming
  └── CLI

Components
  ├── Button
  ├── Input
  ├── Card
  ├── Modal
  ├── Dropdown
  ├── Tabs
  ├── Toast
  ├── Table
  └── ...more
```

---

## 3. Installation Page (`/docs/installation`)

### Content

```markdown
# Installation

## Quick Start

\`\`\`bash
npx ideasui init
\`\`\`

## Manual Setup

### 1. Install Tailwind CSS

\`\`\`bash
npm install tailwindcss @tailwindcss/postcss postcss
\`\`\`

### 2. Configure paths

\`\`\`ts
// tailwind.config.ts
export default {
darkMode: "class",
content: ["./src/**/*.{ts,tsx}"],
}
\`\`\`

### 3. Add base styles

\`\`\`css
@tailwind base;
@tailwind components;
@tailwind utilities;
\`\`\`

### 4. Copy components

Browse /components and copy what you need into your project.
```

---

## 4. Theming Page (`/docs/theming`)

### Content

```markdown
# Theming

ideasUI uses CSS variables for theming. Override them to match your brand.

## CSS Variables

\`\`\`css
:root {
--brand: 139 92% 63%;
--background: 0 0% 100%;
--foreground: 240 10% 4%;
--card: 0 0% 100%;
--border: 240 6% 90%;
--radius: 0.75rem;
}

.dark {
--background: 240 10% 4%;
--foreground: 0 0% 98%;
--card: 240 10% 10%;
--border: 240 4% 16%;
}
\`\`\`

## Using with Tailwind

\`\`\`ts
// tailwind.config.ts
colors: {
background: "hsl(var(--background))",
foreground: "hsl(var(--foreground))",
brand: "hsl(var(--brand))",
}
\`\`\`
```

---

## 5. Components Index Page (`/components`)

### Layout

```
┌──────┬──────────────────────────────────┐
│      │  Components                      │
│ Side │                                  │
│ bar  │  ┌────┐ ┌────┐ ┌────┐          │
│      │  │Card│ │Card│ │Card│          │
│      │  └────┘ └────┘ └────┘          │
│      │  ┌────┐ ┌────┐ ┌────┐          │
│      │  │Card│ │Card│ │Card│          │
│      │  └────┘ └────┘ └────┘          │
└──────┴──────────────────────────────────┘
```

### Code Structure

```tsx
// src/app/components/page.tsx
import { components } from '@/data/components';

export default function ComponentsPage() {
  return (
    <div>
      <h1 className="text-3xl font-bold">Components</h1>
      <p className="mt-2 text-zinc-400">Browse all available components</p>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {components.map((comp) => (
          <Link
            key={comp.slug}
            href={`/components/${comp.slug}`}
            className="rounded-xl border border-zinc-800 p-4 transition hover:border-zinc-700 hover:bg-zinc-900"
          >
            <h3 className="font-semibold text-white">{comp.name}</h3>
            <p className="mt-1 text-sm text-zinc-400">{comp.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

### Component Data

```tsx
// src/data/components.ts
export const components = [
  {
    slug: 'button',
    name: 'Button',
    description: 'Clickable button with variants',
    category: 'Forms',
  },
  { slug: 'input', name: 'Input', description: 'Text input field', category: 'Forms' },
  {
    slug: 'card',
    name: 'Card',
    description: 'Container with border and padding',
    category: 'Data Display',
  },
  { slug: 'modal', name: 'Modal', description: 'Dialog overlay', category: 'Overlay' },
  { slug: 'dropdown', name: 'Dropdown', description: 'Menu with options', category: 'Overlay' },
  { slug: 'tabs', name: 'Tabs', description: 'Tabbed content switcher', category: 'Data Display' },
  { slug: 'toast', name: 'Toast', description: 'Notification popup', category: 'Feedback' },
  {
    slug: 'table',
    name: 'Table',
    description: 'Data table with sorting',
    category: 'Data Display',
  },
  { slug: 'avatar', name: 'Avatar', description: 'User profile image', category: 'Data Display' },
  { slug: 'badge', name: 'Badge', description: 'Status indicator label', category: 'Data Display' },
  { slug: 'alert', name: 'Alert', description: 'Informational message box', category: 'Feedback' },
  { slug: 'switch', name: 'Switch', description: 'Toggle on/off', category: 'Forms' },
  { slug: 'select', name: 'Select', description: 'Dropdown select input', category: 'Forms' },
  { slug: 'tooltip', name: 'Tooltip', description: 'Hover info popup', category: 'Overlay' },
  {
    slug: 'accordion',
    name: 'Accordion',
    description: 'Collapsible content sections',
    category: 'Data Display',
  },
  { slug: 'skeleton', name: 'Skeleton', description: 'Loading placeholder', category: 'Feedback' },
  {
    slug: 'progress',
    name: 'Progress',
    description: 'Progress bar indicator',
    category: 'Feedback',
  },
  {
    slug: 'breadcrumb',
    name: 'Breadcrumb',
    description: 'Navigation path',
    category: 'Navigation',
  },
  {
    slug: 'pagination',
    name: 'Pagination',
    description: 'Page navigation',
    category: 'Navigation',
  },
  { slug: 'drawer', name: 'Drawer', description: 'Slide-in panel', category: 'Overlay' },
];
```

---

## 6. Component Detail Page (`/components/[slug]`)

### Layout

````
┌──────┬──────────────────────────────────┐
│      │  Button                          │
│ Side │  A clickable button component    │
│ bar  │                                  │
│      │  ┌─────────────────────────────┐ │
│      │  │     [Live Preview]          │ │
│      │  ├─────────────────────────────┤ │
│      │  │     Code (with copy btn)    │ │
│      │  └─────────────────────────────┘ │
│      │                                  │
│      │  ## Usage                        │
│      │  ```code```                      │
│      │                                  │
│      │  ## Props                        │
│      │  | Prop | Type | Default |       │
│      │                                  │
│      │  ## Variants                     │
│      │  [Preview blocks]               │
└──────┴──────────────────────────────────┘
````

### Code Structure

```tsx
// src/app/components/[slug]/page.tsx
import { components } from '@/data/components';
import { notFound } from 'next/navigation';
import ComponentPreview from '@/components/docs/ComponentPreview';
import PropsTable from '@/components/docs/PropsTable';
import CodeBlock from '@/components/docs/CodeBlock';

export default function ComponentDetail({ params }: { params: { slug: string } }) {
  const comp = components.find((c) => c.slug === params.slug);
  if (!comp) notFound();

  return (
    <div className="space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">{comp.name}</h1>
        <p className="mt-2 text-zinc-400">{comp.description}</p>
      </div>

      {/* Preview + Code */}
      <ComponentPreview slug={comp.slug} />

      {/* Installation */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-white">Installation</h2>
        <CodeBlock language="bash" code={`npx ideasui add ${comp.slug}`} />
      </section>

      {/* Usage */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-white">Usage</h2>
        <CodeBlock language="tsx" code={comp.usageCode} />
      </section>

      {/* Props */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-white">Props</h2>
        <PropsTable props={comp.props} />
      </section>

      {/* Variants */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-white">Variants</h2>
        {comp.variants.map((v) => (
          <ComponentPreview key={v.name} variant={v} />
        ))}
      </section>
    </div>
  );
}
```

### Props Table

```tsx
// PropsTable.tsx
<table className="w-full text-sm">
  <thead>
    <tr className="border-b border-zinc-800 text-left">
      <th className="py-2 font-medium text-zinc-400">Prop</th>
      <th className="py-2 font-medium text-zinc-400">Type</th>
      <th className="py-2 font-medium text-zinc-400">Default</th>
      <th className="py-2 font-medium text-zinc-400">Description</th>
    </tr>
  </thead>
  <tbody>
    <tr className="border-b border-zinc-800/50">
      <td className="py-2 font-mono text-violet-400">variant</td>
      <td className="py-2 font-mono text-zinc-300">"default" | "outline" | "ghost"</td>
      <td className="py-2 font-mono text-zinc-500">"default"</td>
      <td className="py-2 text-zinc-400">Button style variant</td>
    </tr>
  </tbody>
</table>
```

---

## 7. Examples Page (`/examples`)

### Layout

```
┌─────────────────────────────────────────┐
│  Examples                               │
├─────────────────────────────────────────┤
│  ┌─────────────────────────────────┐    │
│  │  Dashboard Example (Screenshot) │    │
│  │  [View Code] [Live Demo]        │    │
│  └─────────────────────────────────┘    │
│  ┌─────────────────────────────────┐    │
│  │  Auth Page Example              │    │
│  │  [View Code] [Live Demo]        │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
```

### Examples List

| Example        | Description                             |
| -------------- | --------------------------------------- |
| Dashboard      | Admin panel with sidebar, cards, charts |
| Authentication | Login/Register forms                    |
| Landing Page   | Marketing page with hero                |
| Settings       | Form-heavy settings page                |
| Data Table     | Table with filters, sorting, pagination |

---

## 8. Changelog Page (`/changelog`)

### Layout

```
# Changelog

## v1.2.0 — 2024-12-15
- Added: Drawer component
- Added: Pagination component
- Fixed: Modal focus trap
- Improved: Button loading state

## v1.1.0 — 2024-11-20
- Added: Toast component
- Added: Skeleton component
- Fixed: Dark mode flicker

## v1.0.0 — 2024-10-01
- Initial release with 20+ components
```

---

## 9. Shared Components

### Navbar

```
Logo (ideasUI) | Docs | Components | Examples | [Search ⌘K] | [GitHub] | [ThemeToggle]
```

```tsx
<nav className="sticky top-0 z-50 h-16 border-b border-zinc-800 bg-zinc-950/80 backdrop-blur-md">
  <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6">
    <div className="flex items-center gap-8">
      <Logo />
      <div className="hidden items-center gap-6 text-sm text-zinc-400 md:flex">
        <Link href="/docs" className="transition hover:text-white">
          Docs
        </Link>
        <Link href="/components" className="transition hover:text-white">
          Components
        </Link>
        <Link href="/examples" className="transition hover:text-white">
          Examples
        </Link>
      </div>
    </div>
    <div className="flex items-center gap-3">
      <SearchTrigger />
      <GitHubLink />
      <ThemeToggle />
    </div>
  </div>
</nav>
```

### Footer

```
┌─────────────────────────────────────────┐
│  ideasUI          Docs        Community │
│  Beautiful UI     Installation  GitHub  │
│  components       Theming       Twitter │
│                   Components    Discord │
├─────────────────────────────────────────┤
│  Built by [Your Name]. Open Source.     │
└─────────────────────────────────────────┘
```

---

## 10. File Checklist

```
src/app/
├── page.tsx                        ← Landing
├── docs/
│   ├── layout.tsx                  ← Docs layout (sidebar)
│   ├── page.tsx                    ← Docs index
│   ├── installation/page.tsx
│   ├── theming/page.tsx
│   └── cli/page.tsx
├── components/
│   ├── page.tsx                    ← Components index
│   └── [slug]/page.tsx             ← Component detail
├── examples/page.tsx
└── changelog/page.tsx

src/components/
├── layout/Navbar.tsx
├── layout/Sidebar.tsx
├── layout/Footer.tsx
├── docs/CodeBlock.tsx
├── docs/ComponentPreview.tsx
├── docs/CopyButton.tsx
├── docs/PropsTable.tsx
├── docs/TabSwitcher.tsx
├── landing/Hero.tsx
├── landing/Features.tsx
├── landing/Showcase.tsx
├── landing/Stats.tsx
├── landing/CommunityCTA.tsx
├── ui/ThemeToggle.tsx
├── ui/SearchDialog.tsx
└── ui/Badge.tsx

src/data/
├── components.ts
└── navigation.ts

src/content/components/
├── button.mdx
├── card.mdx
├── input.mdx
└── ...
```
