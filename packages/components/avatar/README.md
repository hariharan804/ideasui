# @ideasui/avatar

Accessible, theme-aware Avatar and AvatarGroup components for IdeasUI.

Part of the [IdeasUI](https://ideasui.com) React component library.

## Features

- **Compound Architecture:** `Avatar`, `AvatarGroup`, `AvatarImage`, `AvatarFallback`, and `AvatarIcon`.
- **Image Fallback Cascade:** Image URL / custom `as` renderer / inline SVG → Initials → Fallback children → Default person icon SVG.
- **Next.js & Custom Image Support:** First-class `as` render prop for Next.js `<Image>`, Gatsby, Cloudinary, etc.
- **Avatar Grouping & Overflow:** Configurable `max` with automatic `+{n}` overflow counter and negative margin overlap.
- **Theme-Aware:** Built with Tailwind Variants (`tv()`) mapped to OKLCH design tokens.
- **Accessibility:** Semantic HTML (`role="img"`, `role="group"`), WCAG 2.1 AA compliant, zero `vitest-axe` violations.

## Installation

```bash
pnpm add @ideasui/avatar
# or install via master bundle
pnpm add @ideasui/react
```

## Quick Start

```tsx
import { Avatar, AvatarGroup, AvatarImage, AvatarFallback } from '@ideasui/react';

// Basic with image and auto initials fallback
<Avatar src="/user.jpg" name="Jane Doe" />

// Initials only
<Avatar name="John Smith" color="primary" />

// Bordered and custom size
<Avatar name="Alex" size="lg" isBordered color="success" />

// Avatar group with overflow count
<AvatarGroup max={3} label="Active team members">
  <Avatar name="Alice" color="primary" />
  <Avatar name="Bob" color="success" />
  <Avatar name="Carol" color="warning" />
  <Avatar name="Dave" color="danger" />
</AvatarGroup>
```

## License

MIT © [IdeasUI](https://ideasui.com)
