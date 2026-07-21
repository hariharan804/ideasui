# ideasUI — Component Library Website Development Guide

> Next.js App Router | Tailwind CSS | MDX | Dark/Light Theme | Documentation Site

---

## 1. What is ideasUI?

A modern, open-source React component library website — like shadcn/ui, Chakra UI, or Radix UI docs site. Users can:

- Browse components with live previews
- Copy code snippets
- Read installation/usage docs
- Switch between dark/light themes
- Search components

---

## 2. Landing Page Layout

```
┌─────────────────────────────────────────┐
│  Navbar (Logo | Docs | Components |     │
│          GitHub | Theme Toggle)          │
├─────────────────────────────────────────┤
│  Hero (Tagline + Install Command + CTA) │
├─────────────────────────────────────────┤
│  Features Grid (Why ideasUI?)           │
├─────────────────────────────────────────┤
│  Component Showcase (Live Preview)      │
├─────────────────────────────────────────┤
│  Stats (Components | Downloads | Stars) │
├─────────────────────────────────────────┤
│  Testimonials / Community               │
├─────────────────────────────────────────┤
│  CTA (Get Started)                      │
├─────────────────────────────────────────┤
│  Footer                                 │
└─────────────────────────────────────────┘
```

---

## 3. Routing

| Route                | Page             | Purpose                       |
| -------------------- | ---------------- | ----------------------------- |
| `/`                  | Landing          | Homepage with hero + showcase |
| `/docs`              | Docs Index       | Getting started guide         |
| `/docs/installation` | Installation     | Install & setup instructions  |
| `/docs/theming`      | Theming          | Customize colors, dark mode   |
| `/docs/cli`          | CLI              | CLI tool usage (optional)     |
| `/components`        | Components Index | Browse all components         |
| `/components/[slug]` | Component Detail | Docs + preview + code         |
| `/examples`          | Examples         | Full page examples            |
| `/changelog`         | Changelog        | Version history               |

---

## 4. Tech Stack

```bash
npx create-next-app@latest ideas-ui-site --typescript --tailwind --app
cd ideas-ui-site
npm install next-themes next-mdx-remote shiki lucide-react
```

| Package           | Purpose              |
| ----------------- | -------------------- |
| `next-themes`     | Dark/light mode      |
| `next-mdx-remote` | MDX content for docs |
| `shiki`           | Syntax highlighting  |
| `lucide-react`    | Icons                |

---

## 5. Folder Structure

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                    # Landing
│   ├── docs/
│   │   ├── page.tsx                # Docs index
│   │   ├── installation/page.tsx
│   │   ├── theming/page.tsx
│   │   └── cli/page.tsx
│   ├── components/
│   │   ├── page.tsx                # All components list
│   │   └── [slug]/page.tsx         # Component detail
│   ├── examples/page.tsx
│   └── changelog/page.tsx
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx
│   │   ├── Sidebar.tsx
│   │   └── Footer.tsx
│   ├── docs/
│   │   ├── CodeBlock.tsx
│   │   ├── ComponentPreview.tsx
│   │   ├── CopyButton.tsx
│   │   ├── PropsTable.tsx
│   │   └── TabSwitcher.tsx
│   ├── landing/
│   │   ├── Hero.tsx
│   │   ├── Features.tsx
│   │   ├── Showcase.tsx
│   │   └── CTA.tsx
│   └── ui/
│       ├── ThemeToggle.tsx
│       ├── SearchDialog.tsx
│       └── Badge.tsx
├── content/
│   └── components/
│       ├── button.mdx
│       ├── card.mdx
│       ├── input.mdx
│       ├── modal.mdx
│       └── ...
├── data/
│   └── components.ts
└── lib/
    ├── mdx.ts
    └── highlighter.ts
```

---

## 6. Dark/Light Theme

```tsx
// src/app/layout.tsx
import { ThemeProvider } from 'next-themes';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
```

> Default to **dark** theme — most dev tool sites use dark as default.

---

## 7. Component Categories

| Category     | Components                                               |
| ------------ | -------------------------------------------------------- |
| Layout       | Container, Grid, Stack, Divider                          |
| Forms        | Button, Input, Textarea, Select, Checkbox, Radio, Switch |
| Feedback     | Alert, Toast, Progress, Spinner, Skeleton                |
| Overlay      | Modal, Drawer, Popover, Tooltip, Dropdown                |
| Data Display | Card, Badge, Avatar, Table, Accordion, Tabs              |
| Navigation   | Navbar, Sidebar, Breadcrumb, Pagination                  |
| Typography   | Heading, Text, Code, Blockquote                          |

---

## 8. Key Features to Highlight

```
✅ Copy-paste components (like shadcn/ui)
✅ Fully accessible (WAI-ARIA)
✅ Dark mode built-in
✅ Tailwind CSS based
✅ TypeScript support
✅ Customizable with CSS variables
✅ Lightweight — no runtime overhead
✅ Open source
```

---

## 9. Installation Command (Hero Section)

```bash
npx ideasui init
# or
npm install @ideasui/react
```

---

## 10. Quick Start Checklist

- [ ] Setup Next.js + Tailwind + next-themes
- [ ] Create landing page with hero
- [ ] Build docs layout with sidebar
- [ ] Add component pages with live preview + code
- [ ] Add copy-to-clipboard on code blocks
- [ ] Add search (Cmd+K dialog)
- [ ] Add syntax highlighting with shiki
- [ ] Deploy on Vercel
