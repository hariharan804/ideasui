# IdeasUI Standalone CSS Boilerplate

This repository is a Next.js starter boilerplate template pre-configured with the **IdeasUI Standalone CSS** styling system. It provides a production-ready starting point for building clean, premium, and accessible web applications.

## 🚀 Features

- **Next.js App Router**: Configured with React 19 and Next.js 16.
- **IdeasUI Styles Integration**: Imports `@ideasui/styles` compiled base variables and utilities directly into the global stylesheet.
- **Component Packaging ready**: Uses workspace component dependencies like `@ideasui/button` directly.
- **Light/Dark Mode Theme**: Pre-configured with dynamic CSS color tokens that swap colors smoothly based on `data-ideasui-theme="light|dark"`.
- **CSS Modules & SCSS Support**: Native support for modular components and layout styles using Sass.

## 🛠️ Getting Started

### 1. Install Dependencies

From the workspace root or the project folder, run:

```bash
pnpm install
# or
npm install
# or
yarn install
```

### 2. Run the Development Server

Start the local server:

```bash
pnpm dev
# or
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### 3. Build for Production

Compile and bundle the production assets:

```bash
pnpm build
# or
npm run build
```

---

## 📁 Project Structure

- `app/globals.scss`: Global stylesheet importing base layout rules and IdeasUI design tokens.
- `app/layout.tsx`: Root HTML shell loading fonts and children.
- `app/page.tsx`: Welcome landing page featuring code guides and starter elements.
- `app/page.module.scss`: Modular styles for the welcome layout.

---

## 🎨 Theme & Customization

The theme system works by injecting design tokens as CSS variables. To change themes dynamically, toggle the `data-ideasui-theme` attribute on any parent wrapper or the `<html>`/`<body>` element:

```html
<div data-ideasui-theme="dark">
  <!-- Content will render using dark tokens -->
</div>
```

To add styles or override color tokens, edit `app/globals.scss`:

```scss
:root {
  --ideasui-font-sans: var(--font-geist-sans), 'Inter', sans-serif;
  // Custom token overrides can be added here
}
```
