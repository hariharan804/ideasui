# Avatar Component — TRD (Technical Reference Document)

## 1. Overview

- **Component:** `Avatar` (Compound)
- **Package:** `@ideasui/avatar`
- **Directory:** `packages/components/avatar/`
- **Primary Exports:** `Avatar`, `AvatarGroup`, `AvatarImage`, `AvatarFallback`, `AvatarIcon`
- **Category:** Display / Identity
- **Recipe Location:** `packages/core/theme/src/recipes/avatar.ts`

### Purpose

`Avatar` is a fully accessible, theme-aware identity element for IdeasUI applications. It represents a user, entity, or resource with an image, initials fallback, or icon fallback. `AvatarGroup` stacks multiple avatars with overlap and an overflow count indicator. It covers all visual variants, color schemes, sizes, shapes, and a full compound slot architecture.

Key Features:

- Compound component architecture (`Avatar`, `AvatarGroup`, `AvatarImage`, `AvatarFallback`, `AvatarIcon`)
- Image with automatic `onError` fallback to initials or icon
- `AvatarImage` accepts a native `<img>` (`src`), an inline SVG component, or a custom image renderer (e.g. Next.js `<Image>`) via the `as` render prop
- `AvatarFallback` accepts initials (auto-generated from `name`), an SVG component, or any `ReactNode`
- Initials auto-generated from `name` prop (up to 2 characters)
- Visual variants (`solid`, `soft`, `outline`, `ghost`)
- Color schemes (`primary`, `neutral`, `success`, `warning`, `danger`)
- Size scale (`xs`, `sm`, `md`, `lg`, `xl`)
- Shape options (`circle`, `square`)
- `AvatarGroup` with configurable `max`, `spacing`, and `direction`
- Overflow count badge rendered automatically when group exceeds `max`
- Semantic OKLCH color tokens — no hardcoded colors or `dark:` prefixes
- `data-slot` attributes on every sub-component for CSS targeting
- Zero-violation `vitest-axe` accessibility testing

---

## 2. Package Architecture & Directory Map

Follows the standard monorepo structure specified in `ARCHITECTURE.md` and `rules/project-structure.md`:

```
packages/components/avatar/
├── src/
│   ├── avatar.tsx              ← Avatar root (context consumer)
│   ├── avatar-group.tsx        ← Group root (context provider + overflow)
│   ├── avatar-image.tsx        ← Image sub-component
│   ├── avatar-fallback.tsx     ← Initials / icon fallback sub-component
│   ├── avatar-icon.tsx         ← Icon wrapper sub-component
│   ├── avatar-context.ts       ← AvatarGroupContext + hooks
│   ├── avatar.types.ts         ← Full TypeScript interfaces with JSDoc
│   └── index.ts                ← Barrel export (public API only)
├── __tests__/
│   └── avatar.test.tsx         ← Vitest + Testing Library + vitest-axe
├── stories/
│   └── avatar.stories.tsx      ← Storybook 10 stories
├── package.json
├── tsconfig.json
└── tsup.config.ts

packages/core/theme/src/recipes/
└── avatar.ts                   ← Tailwind Variants tv() recipe

packages/core/styles/src/components/
└── avatar.css                  ← Standalone BEM CSS rules
```

### Dependency Flow

```
@ideasui/avatar → @ideasui/theme, @ideasui/utils
@ideasui/react  → @ideasui/avatar (re-export in master barrel)
```

> **Rule:** `@ideasui/avatar` MUST NOT import directly from other component directories. Use `workspace:*` for internal monorepo dependencies in `package.json`.

---

## 3. Compound Component Architecture

`Avatar` is the **standalone root**. `AvatarGroup` is the **compound root** for stacked avatar collections. `AvatarImage`, `AvatarFallback`, and `AvatarIcon` are sub-components used inside `Avatar`.

### Slot Map

| Sub-Component    | `data-slot`       | Default Element        | Notes                                                                                                                     |
| ---------------- | ----------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| `AvatarGroup`    | `avatar-group`    | `<div>`                | Context provider, manages overlap + overflow                                                                              |
| `Avatar`         | `avatar`          | `<span>`               | Root container, always a `<span>`                                                                                         |
| `AvatarImage`    | `avatar-image`    | `<img>` / SVG / custom | Renders `<img>`, inline SVG, or custom renderer (e.g. Next.js `Image`) via `as` prop; fires `onError` to trigger fallback |
| `AvatarFallback` | `avatar-fallback` | `<span>`               | Shown when image fails or is absent                                                                                       |
| `AvatarIcon`     | `avatar-icon`     | `<span>`               | Icon wrapper inside fallback, `aria-hidden`                                                                               |

### Anatomy

```
AvatarGroup (root — context provider, manages stacking + overflow count)
└── Avatar[] (one or more avatars, overlapping via negative margin)
    ├── AvatarImage       (optional — renders <img>)
    └── AvatarFallback    (shown when no image or image errors)
        └── AvatarIcon    (optional — icon inside fallback)

Avatar (standalone — no group required)
├── AvatarImage           (optional)
└── AvatarFallback        (initials or icon)
    └── AvatarIcon        (optional)
```

### Fallback Priority

```
1. AvatarImage — src string rendered via <img> (default)
2. AvatarImage — src string rendered via custom `as` renderer (e.g. Next.js <Image>)
3. AvatarImage — inline SVG component passed as children (no src needed)
4. AvatarFallback with initials (if name provided)
5. AvatarFallback with SVG component or ReactNode children
6. AvatarFallback with AvatarIcon (icon wrapper)
7. AvatarFallback with generic person icon (default — no name, no children)
```

---

## 4. Component API & Props Specification

### Public API Usage

```tsx
import {
  Avatar,
  AvatarGroup,
  AvatarImage,
  AvatarFallback,
  AvatarIcon,
} from '@ideasui/react';

// Basic — image with auto initials fallback
<Avatar src="/user.jpg" name="Jane Doe" />

// Initials only (no image)
<Avatar name="John Smith" color="primary" />

// AvatarImage — inline SVG component (no src)
<Avatar name="Bot">
  <AvatarImage>
    <BotAvatarSvg />
  </AvatarImage>
</Avatar>

// AvatarImage — Next.js Image component via `as` render prop
import NextImage from 'next/image';
<Avatar name="Jane Doe">
  <AvatarImage
    src="/user.jpg"
    alt="Jane Doe"
    as={({ src, alt, className }) => (
      <NextImage src={src!} alt={alt ?? ''} fill className={className} />
    )}
  />
</Avatar>

// AvatarFallback — SVG component as children
<Avatar name="Bot" color="primary">
  <AvatarFallback>
    <BotAvatarSvg />
  </AvatarFallback>
</Avatar>

// AvatarFallback — custom icon via AvatarIcon
<Avatar>
  <AvatarFallback>
    <AvatarIcon><UserIcon /></AvatarIcon>
  </AvatarFallback>
</Avatar>

// All sizes
<Avatar size="xs" name="XS" />
<Avatar size="sm" name="SM" />
<Avatar size="md" name="MD" />
<Avatar size="lg" name="LG" />
<Avatar size="xl" name="XL" />

// All variants
<Avatar variant="solid"   color="primary" name="JD" />
<Avatar variant="soft"    color="success" name="JD" />
<Avatar variant="outline" color="warning" name="JD" />
<Avatar variant="ghost"   color="danger"  name="JD" />

// Square shape
<Avatar shape="square" name="AB" size="lg" />

// Bordered (ring)
<Avatar src="/user.jpg" name="Jane" isBordered />

// Disabled
<Avatar src="/user.jpg" name="Jane" isDisabled />

// AvatarGroup — default overlap
<AvatarGroup>
  <Avatar src="/a.jpg" name="Alice" />
  <Avatar src="/b.jpg" name="Bob" />
  <Avatar src="/c.jpg" name="Carol" />
</AvatarGroup>

// AvatarGroup — with max overflow count
<AvatarGroup max={3}>
  <Avatar src="/a.jpg" name="Alice" />
  <Avatar src="/b.jpg" name="Bob" />
  <Avatar src="/c.jpg" name="Carol" />
  <Avatar src="/d.jpg" name="Dave" />
  <Avatar src="/e.jpg" name="Eve" />
</AvatarGroup>
// renders 3 avatars + "+2" overflow indicator

// AvatarGroup — custom spacing
<AvatarGroup spacing="-0.75rem">
  <Avatar name="A" />
  <Avatar name="B" />
  <Avatar name="C" />
</AvatarGroup>
```

### TypeScript Definition (`avatar.types.ts`)

```tsx
import type { CSSProperties, HTMLAttributes, ImgHTMLAttributes, ReactNode } from 'react';
import type { AvatarReturnType } from '@ideasui/theme/recipes';

export type AvatarVariant = 'solid' | 'soft' | 'outline' | 'ghost';
export type AvatarColor = 'primary' | 'neutral' | 'success' | 'warning' | 'danger';
export type AvatarSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type AvatarShape = 'circle' | 'square';

export interface AvatarProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Image source URL. When provided, renders `AvatarImage` internally.
   */
  readonly src?: string;

  /**
   * Full name used to generate initials fallback (up to 2 chars).
   * Also used as `alt` text for the image when `alt` is not provided.
   */
  readonly name?: string;

  /**
   * Alt text for the image. Defaults to `name` if provided, otherwise `''`.
   */
  readonly alt?: string;

  /**
   * Visual style variant.
   * @default 'soft'
   */
  readonly variant?: AvatarVariant;

  /**
   * Color scheme of the avatar fallback background.
   * @default 'neutral'
   */
  readonly color?: AvatarColor;

  /**
   * Size scale of the avatar.
   * @default 'md'
   */
  readonly size?: AvatarSize;

  /**
   * Shape of the avatar.
   * @default 'circle'
   */
  readonly shape?: AvatarShape;

  /**
   * Renders a ring border around the avatar.
   * @default false
   */
  readonly isBordered?: boolean;

  /**
   * Marks the avatar as disabled (reduced opacity, no pointer events).
   * @default false
   */
  readonly isDisabled?: boolean;

  /**
   * Custom CSS class names merged via `cn()`.
   */
  readonly className?: string;

  /**
   * Inline styles applied to the root element.
   */
  readonly style?: CSSProperties;

  /**
   * Child sub-components (`AvatarImage`, `AvatarFallback`).
   * When omitted, `Avatar` auto-renders image + fallback from `src` and `name`.
   */
  readonly children?: ReactNode;
}

export interface AvatarGroupProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Maximum number of avatars to display before showing overflow count.
   * When undefined, all avatars are shown.
   */
  readonly max?: number;

  /**
   * Negative margin between avatars (overlap amount).
   * @default '-0.5rem'
   */
  readonly spacing?: string;

  /**
   * Size propagated to all child Avatars.
   * @default 'md'
   */
  readonly size?: AvatarSize;

  /**
   * Variant propagated to all child Avatars.
   * @default 'soft'
   */
  readonly variant?: AvatarVariant;

  /**
   * Color propagated to all child Avatars.
   * @default 'neutral'
   */
  readonly color?: AvatarColor;

  /**
   * Whether all avatars in the group are bordered.
   * @default false
   */
  readonly isBordered?: boolean;

  /**
   * Accessible label for the group (used as `aria-label`).
   */
  readonly label?: string;

  /**
   * Custom CSS class names merged via `cn()`.
   */
  readonly className?: string;

  /**
   * Inline styles applied to the root wrapper element.
   */
  readonly style?: CSSProperties;

  /**
   * Child `Avatar` components.
   */
  readonly children: ReactNode;
}

export interface AvatarImageRenderProps {
  readonly src?: string;
  readonly alt?: string;
  readonly className?: string;
  readonly onError?: () => void;
}

export interface AvatarImageProps extends Omit<
  ImgHTMLAttributes<HTMLImageElement>,
  'src' | 'children'
> {
  /**
   * Image source URL. Required when rendering a native `<img>` or a custom `as` renderer.
   * Omit when passing an inline SVG component as `children`.
   */
  readonly src?: string;

  /**
   * Alt text for the image. Defaults to the parent `Avatar` `name` when not provided.
   */
  readonly alt?: string;

  /**
   * Custom image renderer — replaces the default `<img>` element.
   * Receives `{ src, alt, className, onError }` and must render an image element.
   * Use this to integrate Next.js `<Image>`, Gatsby `<GatsbyImage>`, or any other
   * optimized image component.
   *
   * @example
   * // Next.js Image
   * as={({ src, alt, className }) => (
   *   <NextImage src={src!} alt={alt ?? ''} fill className={className} />
   * )}
   */
  readonly as?: (props: AvatarImageRenderProps) => JSX.Element;

  /**
   * Inline SVG component rendered directly inside the avatar.
   * Use when you have an SVG avatar asset and do not need a URL-based image.
   * When `children` is provided, `src` and `as` are ignored.
   *
   * @example
   * <AvatarImage><BotAvatarSvg /></AvatarImage>
   */
  readonly children?: ReactNode;

  readonly className?: string;
}

export interface AvatarFallbackProps extends HTMLAttributes<HTMLSpanElement> {
  /**
   * Initials text to display. Auto-generated from `name` on `Avatar` when not provided.
   */
  readonly initials?: string;

  readonly className?: string;

  /**
   * Fallback content. Accepts:
   * - An inline SVG component (e.g. `<BotAvatarSvg />`)
   * - An `<AvatarIcon>` wrapper with any icon
   * - Any `ReactNode`
   * When omitted, renders `initials` if available, otherwise the default person SVG.
   */
  readonly children?: ReactNode;
}

export interface AvatarIconProps extends HTMLAttributes<HTMLSpanElement> {
  readonly className?: string;
  readonly children: ReactNode;
}

export interface AvatarGroupContextValue {
  readonly size?: AvatarSize;
  readonly variant?: AvatarVariant;
  readonly color?: AvatarColor;
  readonly isBordered?: boolean;
  readonly styles?: AvatarReturnType;
}
```

---

## 5. Design Tokens & Recipe (`packages/core/theme/src/recipes/avatar.ts`)

Styles are managed using **Tailwind Variants (`tv()`)** and mapped to IdeasUI OKLCH semantic tokens. **Raw Tailwind palette colors (e.g. `gray-50`, `blue-600`) and `dark:` modifier prefixes are strictly forbidden.**

```tsx
import { tv, type VariantProps } from 'tailwind-variants';

export const avatar = tv({
  slots: {
    root: [
      'relative inline-flex items-center justify-center shrink-0',
      'font-semibold uppercase select-none overflow-hidden',
      'transition-opacity duration-150',
    ],
    image: 'w-full h-full object-cover',
    fallback: 'absolute inset-0 flex items-center justify-center',
    icon: 'flex items-center justify-center',
  },

  variants: {
    variant: {
      solid: {
        root: 'border-transparent',
      },
      soft: {
        root: 'border-transparent',
      },
      outline: {
        root: 'bg-transparent',
      },
      ghost: {
        root: 'bg-transparent border-transparent',
      },
    },

    color: {
      primary: {},
      neutral: {},
      success: {},
      warning: {},
      danger: {},
    },

    size: {
      xs: {
        root: 'size-6 text-[10px]',
        icon: 'size-3',
        fallback: 'text-[10px]',
      },
      sm: {
        root: 'size-8 text-xs',
        icon: 'size-3.5',
        fallback: 'text-xs',
      },
      md: {
        root: 'size-10 text-sm',
        icon: 'size-4',
        fallback: 'text-sm',
      },
      lg: {
        root: 'size-12 text-base',
        icon: 'size-5',
        fallback: 'text-base',
      },
      xl: {
        root: 'size-16 text-lg',
        icon: 'size-6',
        fallback: 'text-lg',
      },
    },

    shape: {
      circle: { root: 'rounded-full' },
      square: { root: 'rounded-lg' },
    },

    isBordered: {
      true: {
        root: 'ring-2 ring-offset-2 ring-offset-surface-default',
      },
    },

    isDisabled: {
      true: {
        root: 'opacity-50 pointer-events-none',
      },
    },
  },

  compoundVariants: [
    // solid + color
    {
      variant: 'solid',
      color: 'primary',
      class: { root: 'bg-primary text-white', isBordered: true && 'ring-primary' },
    },
    { variant: 'solid', color: 'neutral', class: { root: 'bg-neutral text-white' } },
    { variant: 'solid', color: 'success', class: { root: 'bg-success text-white' } },
    { variant: 'solid', color: 'warning', class: { root: 'bg-warning text-white' } },
    { variant: 'solid', color: 'danger', class: { root: 'bg-danger  text-white' } },

    // soft + color
    { variant: 'soft', color: 'primary', class: { root: 'bg-primary-subtle text-primary' } },
    { variant: 'soft', color: 'neutral', class: { root: 'bg-neutral-subtle text-neutral' } },
    { variant: 'soft', color: 'success', class: { root: 'bg-success-subtle text-success' } },
    { variant: 'soft', color: 'warning', class: { root: 'bg-warning-subtle text-warning' } },
    { variant: 'soft', color: 'danger', class: { root: 'bg-danger-subtle  text-danger' } },

    // outline + color
    { variant: 'outline', color: 'primary', class: { root: 'border border-primary text-primary' } },
    { variant: 'outline', color: 'neutral', class: { root: 'border border-neutral text-neutral' } },
    { variant: 'outline', color: 'success', class: { root: 'border border-success text-success' } },
    { variant: 'outline', color: 'warning', class: { root: 'border border-warning text-warning' } },
    { variant: 'outline', color: 'danger', class: { root: 'border border-danger  text-danger' } },

    // ghost + color
    { variant: 'ghost', color: 'primary', class: { root: 'text-primary' } },
    { variant: 'ghost', color: 'neutral', class: { root: 'text-neutral' } },
    { variant: 'ghost', color: 'success', class: { root: 'text-success' } },
    { variant: 'ghost', color: 'warning', class: { root: 'text-warning' } },
    { variant: 'ghost', color: 'danger', class: { root: 'text-danger' } },

    // bordered ring color per color scheme
    { isBordered: true, color: 'primary', class: { root: 'ring-primary' } },
    { isBordered: true, color: 'neutral', class: { root: 'ring-neutral' } },
    { isBordered: true, color: 'success', class: { root: 'ring-success' } },
    { isBordered: true, color: 'warning', class: { root: 'ring-warning' } },
    { isBordered: true, color: 'danger', class: { root: 'ring-danger' } },
  ],

  defaultVariants: {
    variant: 'soft',
    color: 'neutral',
    size: 'md',
    shape: 'circle',
    isBordered: false,
    isDisabled: false,
  },
});

export const avatarGroup = tv({
  slots: {
    root: 'flex flex-row items-center',
    overflow: [
      'relative inline-flex items-center justify-center shrink-0',
      'font-semibold uppercase select-none',
      'bg-surface-muted text-content-secondary',
      'ring-2 ring-surface-default',
    ],
  },
  variants: {
    size: {
      xs: { overflow: 'size-6 text-[10px] rounded-full' },
      sm: { overflow: 'size-8 text-xs rounded-full' },
      md: { overflow: 'size-10 text-sm rounded-full' },
      lg: { overflow: 'size-12 text-base rounded-full' },
      xl: { overflow: 'size-16 text-lg rounded-full' },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type AvatarVariants = VariantProps<typeof avatar>;
export type AvatarGroupVariants = VariantProps<typeof avatarGroup>;
export type AvatarReturnType = ReturnType<typeof avatar>;
```

---

## 6. Context Definition (`packages/components/avatar/src/avatar-context.ts`)

`AvatarGroup` uses **native React context** to propagate shared `size`, `variant`, `color`, and `isBordered` to all child `Avatar` components.

```tsx
import type { AvatarGroupContextValue } from './avatar.types';
import { createContext, useContext } from 'react';

export const AvatarGroupContext = createContext<AvatarGroupContextValue | null>(null);

export function useAvatarGroupContext(): AvatarGroupContextValue | null {
  return useContext(AvatarGroupContext);
}

export function useRequiredAvatarGroupContext(): AvatarGroupContextValue {
  const context = useContext(AvatarGroupContext);
  if (!context) {
    throw new Error(
      'useRequiredAvatarGroupContext must be used within an <AvatarGroup> component.',
    );
  }
  return context;
}
```

> `Avatar` calls `useAvatarGroupContext()` (nullable) so it works both standalone and inside a group.

---

## 7. Component Implementation

### AvatarGroup (`avatar-group.tsx`)

```tsx
'use client';

import type { AvatarGroupProps } from './avatar.types';
import type { CSSProperties, JSX } from 'react';

import { Children, forwardRef, isValidElement } from 'react';
import { avatarGroup as avatarGroupRecipe } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';
import { AvatarGroupContext } from './avatar-context';

export const AvatarGroup = forwardRef<HTMLDivElement, AvatarGroupProps>(
  (
    {
      max,
      spacing = '-0.5rem',
      size = 'md',
      variant = 'soft',
      color = 'neutral',
      isBordered = false,
      label,
      className,
      style,
      children,
      ...properties
    },
    reference,
  ): JSX.Element => {
    const childArray = Children.toArray(children).filter(isValidElement);
    const visibleChildren = max !== undefined ? childArray.slice(0, max) : childArray;
    const overflowCount = max !== undefined ? Math.max(0, childArray.length - max) : 0;

    const groupStyles = avatarGroupRecipe({ size });

    return (
      <AvatarGroupContext.Provider value={{ size, variant, color, isBordered }}>
        <div
          ref={reference}
          className={cn(groupStyles.root(), className)}
          data-slot="avatar-group"
          role="group"
          aria-label={label}
          style={style}
          {...properties}
        >
          {visibleChildren.map((child, index) => (
            <span
              key={index}
              style={{ marginInlineStart: index === 0 ? undefined : spacing } as CSSProperties}
            >
              {child}
            </span>
          ))}
          {overflowCount > 0 && (
            <span
              className={cn(groupStyles.overflow())}
              data-slot="avatar-overflow"
              aria-label={`${overflowCount} more`}
              style={{ marginInlineStart: spacing } as CSSProperties}
            >
              +{overflowCount}
            </span>
          )}
        </div>
      </AvatarGroupContext.Provider>
    );
  },
);

AvatarGroup.displayName = 'IdeasUI.AvatarGroup';
```

### Avatar (`avatar.tsx`)

```tsx
'use client';

import type { AvatarProps } from './avatar.types';
import type { JSX } from 'react';

import { forwardRef, useState } from 'react';
import { avatar as avatarRecipe } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';
import { useAvatarGroupContext } from './avatar-context';
import { AvatarImage } from './avatar-image';
import { AvatarFallback } from './avatar-fallback';

function getInitials(name: string): string {
  return name
    .split(' ')
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? '')
    .join('');
}

export const Avatar = forwardRef<HTMLSpanElement, AvatarProps>(
  (
    {
      src,
      name,
      alt,
      variant,
      color,
      size,
      shape = 'circle',
      isBordered,
      isDisabled = false,
      className,
      style,
      children,
      ...properties
    },
    reference,
  ): JSX.Element => {
    const group = useAvatarGroupContext();

    const resolvedVariant = variant ?? group?.variant ?? 'soft';
    const resolvedColor = color ?? group?.color ?? 'neutral';
    const resolvedSize = size ?? group?.size ?? 'md';
    const resolvedIsBordered = isBordered ?? group?.isBordered ?? false;

    const [imgError, setImgError] = useState(false);
    const showImage = src && !imgError;

    const styles = avatarRecipe({
      variant: resolvedVariant,
      color: resolvedColor,
      size: resolvedSize,
      shape,
      isBordered: resolvedIsBordered,
      isDisabled,
    });

    return (
      <span
        ref={reference}
        className={cn(styles.root(), className)}
        data-slot="avatar"
        data-disabled={isDisabled || undefined}
        aria-label={name}
        role="img"
        style={style}
        {...properties}
      >
        {children ?? (
          <>
            {showImage && (
              <AvatarImage
                src={src}
                alt={alt ?? name ?? ''}
                className={cn(styles.image())}
                onError={() => setImgError(true)}
              />
            )}
            {!showImage && (
              <AvatarFallback
                initials={name ? getInitials(name) : undefined}
                className={cn(styles.fallback())}
              />
            )}
          </>
        )}
      </span>
    );
  },
);

Avatar.displayName = 'IdeasUI.Avatar';
```

### AvatarImage (`avatar-image.tsx`)

`AvatarImage` supports three rendering modes:

| Mode                        | When to use                                 | How                              |
| --------------------------- | ------------------------------------------- | -------------------------------- |
| Native `<img>` (default)    | Standard URL-based images                   | Pass `src` string                |
| Custom renderer (`as` prop) | Next.js `<Image>`, Gatsby, Cloudinary, etc. | Pass `as` render prop            |
| Inline SVG (`children`)     | SVG avatar assets, bot icons, brand marks   | Pass SVG component as `children` |

```tsx
'use client';

import type { AvatarImageProps } from './avatar.types';
import type { JSX } from 'react';

import { forwardRef } from 'react';
import { cn } from '@ideasui/utils';

export const AvatarImage = forwardRef<HTMLImageElement, AvatarImageProps>(
  (
    { src, alt = '', as: Renderer, children, className, onError, ...properties },
    reference,
  ): JSX.Element => {
    const imageClass = cn('w-full h-full object-cover', className);

    // Mode 1: inline SVG component as children
    if (children) {
      return (
        <span
          className={cn(
            'absolute inset-0 flex h-full w-full items-center justify-center',
            className,
          )}
          data-slot="avatar-image"
          aria-hidden="true"
        >
          {children}
        </span>
      );
    }

    // Mode 2: custom renderer (e.g. Next.js Image)
    if (Renderer) {
      return (
        <span className="absolute inset-0 h-full w-full" data-slot="avatar-image">
          <Renderer src={src} alt={alt} className={imageClass} onError={onError} />
        </span>
      );
    }

    // Mode 3: native <img> (default)
    return (
      <img
        ref={reference}
        src={src}
        alt={alt}
        className={imageClass}
        data-slot="avatar-image"
        onError={onError}
        {...properties}
      />
    );
  },
);

AvatarImage.displayName = 'IdeasUI.AvatarImage';
```

### AvatarFallback (`avatar-fallback.tsx`)

`AvatarFallback` renders when no image is present or the image fails to load. It accepts:

- Auto-generated `initials` string (passed down from `Avatar`)
- Any `ReactNode` as `children` — including inline SVG components, `<AvatarIcon>`, or custom markup
- Falls back to the built-in `DefaultPersonIcon` SVG when neither `initials` nor `children` are provided

```tsx
'use client';

import type { AvatarFallbackProps } from './avatar.types';
import type { JSX } from 'react';

import { forwardRef } from 'react';
import { cn } from '@ideasui/utils';

const DefaultPersonIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    width="60%"
    height="60%"
  >
    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
  </svg>
);

export const AvatarFallback = forwardRef<HTMLSpanElement, AvatarFallbackProps>(
  ({ initials, className, children, ...properties }, reference): JSX.Element => (
    <span
      ref={reference}
      className={cn('absolute inset-0 flex items-center justify-center', className)}
      data-slot="avatar-fallback"
      aria-hidden="true"
      {...properties}
    >
      {children ?? (initials ? initials : <DefaultPersonIcon />)}
    </span>
  ),
);

AvatarFallback.displayName = 'IdeasUI.AvatarFallback';
```

### AvatarIcon (`avatar-icon.tsx`)

```tsx
'use client';

import type { AvatarIconProps } from './avatar.types';
import type { JSX } from 'react';

import { forwardRef } from 'react';
import { cn } from '@ideasui/utils';

export const AvatarIcon = forwardRef<HTMLSpanElement, AvatarIconProps>(
  ({ className, children, ...properties }, reference): JSX.Element => (
    <span
      ref={reference}
      className={cn('flex items-center justify-center', className)}
      data-slot="avatar-icon"
      aria-hidden="true"
      {...properties}
    >
      {children}
    </span>
  ),
);

AvatarIcon.displayName = 'IdeasUI.AvatarIcon';
```

### Barrel Export (`index.ts`)

```tsx
export { Avatar } from './avatar';
export { AvatarGroup } from './avatar-group';
export { AvatarImage } from './avatar-image';
export { AvatarFallback } from './avatar-fallback';
export { AvatarIcon } from './avatar-icon';
export {
  AvatarGroupContext,
  useAvatarGroupContext,
  useRequiredAvatarGroupContext,
} from './avatar-context';

export type {
  AvatarProps,
  AvatarGroupProps,
  AvatarImageProps,
  AvatarImageRenderProps,
  AvatarFallbackProps,
  AvatarIconProps,
  AvatarGroupContextValue,
  AvatarVariant,
  AvatarColor,
  AvatarSize,
  AvatarShape,
} from './avatar.types';
```

---

## 8. Standalone BEM CSS Specification (`packages/core/styles/src/components/avatar.css`)

```css
/* ─── Avatar root ─────────────────────────────────────────────── */
.ideasui-avatar {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-weight: 600;
  text-transform: uppercase;
  user-select: none;
  overflow: hidden;
  transition: opacity 150ms ease;
}

/* ─── Shapes ──────────────────────────────────────────────────── */
.ideasui-avatar--circle {
  border-radius: 9999px;
}
.ideasui-avatar--square {
  border-radius: 0.5rem;
}

/* ─── Sizes ───────────────────────────────────────────────────── */
.ideasui-avatar--xs {
  width: 1.5rem;
  height: 1.5rem;
  font-size: 10px;
}
.ideasui-avatar--sm {
  width: 2rem;
  height: 2rem;
  font-size: var(--ideasui-font-size-xs);
}
.ideasui-avatar--md {
  width: 2.5rem;
  height: 2.5rem;
  font-size: var(--ideasui-font-size-sm);
}
.ideasui-avatar--lg {
  width: 3rem;
  height: 3rem;
  font-size: var(--ideasui-font-size-base);
}
.ideasui-avatar--xl {
  width: 4rem;
  height: 4rem;
  font-size: var(--ideasui-font-size-lg);
}

/* ─── Bordered ────────────────────────────────────────────────── */
.ideasui-avatar--bordered {
  box-shadow:
    0 0 0 2px oklch(var(--ideasui-color-surface-default)),
    0 0 0 4px currentColor;
}

/* ─── Disabled ────────────────────────────────────────────────── */
.ideasui-avatar--disabled {
  opacity: 0.5;
  pointer-events: none;
}

/* ─── Variant: solid ──────────────────────────────────────────── */
.ideasui-avatar--solid.ideasui-avatar--primary {
  background-color: oklch(var(--ideasui-color-primary));
  color: white;
}
.ideasui-avatar--solid.ideasui-avatar--neutral {
  background-color: oklch(var(--ideasui-color-neutral));
  color: white;
}
.ideasui-avatar--solid.ideasui-avatar--success {
  background-color: oklch(var(--ideasui-color-success));
  color: white;
}
.ideasui-avatar--solid.ideasui-avatar--warning {
  background-color: oklch(var(--ideasui-color-warning));
  color: white;
}
.ideasui-avatar--solid.ideasui-avatar--danger {
  background-color: oklch(var(--ideasui-color-danger));
  color: white;
}

/* ─── Variant: soft ───────────────────────────────────────────── */
.ideasui-avatar--soft.ideasui-avatar--primary {
  background-color: oklch(var(--ideasui-color-primary-subtle));
  color: oklch(var(--ideasui-color-primary));
}
.ideasui-avatar--soft.ideasui-avatar--neutral {
  background-color: oklch(var(--ideasui-color-neutral-subtle));
  color: oklch(var(--ideasui-color-neutral));
}
.ideasui-avatar--soft.ideasui-avatar--success {
  background-color: oklch(var(--ideasui-color-success-subtle));
  color: oklch(var(--ideasui-color-success));
}
.ideasui-avatar--soft.ideasui-avatar--warning {
  background-color: oklch(var(--ideasui-color-warning-subtle));
  color: oklch(var(--ideasui-color-warning));
}
.ideasui-avatar--soft.ideasui-avatar--danger {
  background-color: oklch(var(--ideasui-color-danger-subtle));
  color: oklch(var(--ideasui-color-danger));
}

/* ─── Variant: outline ────────────────────────────────────────── */
.ideasui-avatar--outline {
  background-color: transparent;
}
.ideasui-avatar--outline.ideasui-avatar--primary {
  border: 1px solid oklch(var(--ideasui-color-primary));
  color: oklch(var(--ideasui-color-primary));
}
.ideasui-avatar--outline.ideasui-avatar--neutral {
  border: 1px solid oklch(var(--ideasui-color-neutral));
  color: oklch(var(--ideasui-color-neutral));
}
.ideasui-avatar--outline.ideasui-avatar--success {
  border: 1px solid oklch(var(--ideasui-color-success));
  color: oklch(var(--ideasui-color-success));
}
.ideasui-avatar--outline.ideasui-avatar--warning {
  border: 1px solid oklch(var(--ideasui-color-warning));
  color: oklch(var(--ideasui-color-warning));
}
.ideasui-avatar--outline.ideasui-avatar--danger {
  border: 1px solid oklch(var(--ideasui-color-danger));
  color: oklch(var(--ideasui-color-danger));
}

/* ─── Variant: ghost ──────────────────────────────────────────── */
.ideasui-avatar--ghost {
  background-color: transparent;
  border-color: transparent;
}
.ideasui-avatar--ghost.ideasui-avatar--primary {
  color: oklch(var(--ideasui-color-primary));
}
.ideasui-avatar--ghost.ideasui-avatar--neutral {
  color: oklch(var(--ideasui-color-neutral));
}
.ideasui-avatar--ghost.ideasui-avatar--success {
  color: oklch(var(--ideasui-color-success));
}
.ideasui-avatar--ghost.ideasui-avatar--warning {
  color: oklch(var(--ideasui-color-warning));
}
.ideasui-avatar--ghost.ideasui-avatar--danger {
  color: oklch(var(--ideasui-color-danger));
}

/* ─── Image ───────────────────────────────────────────────────── */
.ideasui-avatar__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* ─── Fallback ────────────────────────────────────────────────── */
.ideasui-avatar__fallback {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* ─── Icon ────────────────────────────────────────────────────── */
.ideasui-avatar__icon {
  display: flex;
  align-items: center;
  justify-content: center;
}
.ideasui-avatar__icon--xs {
  width: 0.75rem;
  height: 0.75rem;
}
.ideasui-avatar__icon--sm {
  width: 0.875rem;
  height: 0.875rem;
}
.ideasui-avatar__icon--md {
  width: 1rem;
  height: 1rem;
}
.ideasui-avatar__icon--lg {
  width: 1.25rem;
  height: 1.25rem;
}
.ideasui-avatar__icon--xl {
  width: 1.5rem;
  height: 1.5rem;
}

/* ─── Group ───────────────────────────────────────────────────── */
.ideasui-avatar-group {
  display: flex;
  flex-direction: row;
  align-items: center;
}

/* ─── Overflow indicator ──────────────────────────────────────── */
.ideasui-avatar-group__overflow {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  font-weight: 600;
  text-transform: uppercase;
  user-select: none;
  border-radius: 9999px;
  background-color: oklch(var(--ideasui-color-surface-muted));
  color: oklch(var(--ideasui-color-content-secondary));
  box-shadow: 0 0 0 2px oklch(var(--ideasui-color-surface-default));
}
.ideasui-avatar-group__overflow--xs {
  width: 1.5rem;
  height: 1.5rem;
  font-size: 10px;
}
.ideasui-avatar-group__overflow--sm {
  width: 2rem;
  height: 2rem;
  font-size: var(--ideasui-font-size-xs);
}
.ideasui-avatar-group__overflow--md {
  width: 2.5rem;
  height: 2.5rem;
  font-size: var(--ideasui-font-size-sm);
}
.ideasui-avatar-group__overflow--lg {
  width: 3rem;
  height: 3rem;
  font-size: var(--ideasui-font-size-base);
}
.ideasui-avatar-group__overflow--xl {
  width: 4rem;
  height: 4rem;
  font-size: var(--ideasui-font-size-lg);
}

/* prefers-reduced-motion — suppressed via @ideasui/styles global rule */
```

---

## 9. All Variants Reference

### Visual Variants

| Variant   | Background             | Text            | Border          |
| --------- | ---------------------- | --------------- | --------------- |
| `solid`   | `{color}` token        | `white`         | transparent     |
| `soft`    | `{color}-subtle` token | `{color}` token | transparent     |
| `outline` | transparent            | `{color}` token | `{color}` token |
| `ghost`   | transparent            | `{color}` token | transparent     |

### Color Schemes

| `color`   | Tokens used                                                 |
| --------- | ----------------------------------------------------------- |
| `primary` | `--ideasui-color-primary`, `--ideasui-color-primary-subtle` |
| `neutral` | `--ideasui-color-neutral`, `--ideasui-color-neutral-subtle` |
| `success` | `--ideasui-color-success`, `--ideasui-color-success-subtle` |
| `warning` | `--ideasui-color-warning`, `--ideasui-color-warning-subtle` |
| `danger`  | `--ideasui-color-danger`, `--ideasui-color-danger-subtle`   |

### Sizes

| `size` | Dimensions | Font        | Icon    |
| ------ | ---------- | ----------- | ------- |
| `xs`   | 24×24px    | 10px        | 12×12px |
| `sm`   | 32×32px    | `text-xs`   | 14×14px |
| `md`   | 40×40px    | `text-sm`   | 16×16px |
| `lg`   | 48×48px    | `text-base` | 20×20px |
| `xl`   | 64×64px    | `text-lg`   | 24×24px |

### Shapes

| `shape`            | Border Radius           |
| ------------------ | ----------------------- |
| `circle` (default) | `border-radius: 9999px` |
| `square`           | `border-radius: 0.5rem` |

### Special Props

| Prop         | Type      | Behavior                                                                      |
| ------------ | --------- | ----------------------------------------------------------------------------- |
| `isBordered` | `boolean` | Renders a 2px ring with 2px offset in the surface color                       |
| `isDisabled` | `boolean` | `opacity: 0.5; pointer-events: none`                                          |
| `name`       | `string`  | Auto-generates initials (up to 2 chars); used as `aria-label` and image `alt` |
| `src`        | `string`  | Renders `AvatarImage`; on error falls back to `AvatarFallback`                |

---

## 10. Behavior Rules

| Behavior                         | Rule                                                                                                     |
| -------------------------------- | -------------------------------------------------------------------------------------------------------- |
| Fallback priority                | `AvatarImage` (src / SVG / custom) → initials → `AvatarFallback` children → default person icon          |
| `src` + `name`                   | Image renders first; on `onError`, falls back to initials from `name`                                    |
| `name` only                      | Initials rendered directly in `AvatarFallback`; no image element rendered                                |
| `AvatarImage` with `children`    | Inline SVG rendered inside avatar; `src` and `as` are ignored                                            |
| `AvatarImage` with `as` prop     | Custom renderer called with `{ src, alt, className, onError }` — use for Next.js `<Image>`, Gatsby, etc. |
| `AvatarImage` with `src` only    | Default native `<img>` rendered                                                                          |
| `AvatarFallback` with `children` | Renders `children` directly — accepts SVG components, `<AvatarIcon>`, or any `ReactNode`                 |
| `children` on `Avatar`           | Skips auto image/fallback rendering entirely — consumer controls slot content                            |
| `AvatarGroup` `max`              | Slices `children` to `max`; renders `+{overflow}` indicator for the remainder                            |
| `AvatarGroup` `spacing`          | Applied as `margin-inline-start` CSS on each avatar after the first                                      |
| `AvatarGroup` context            | Propagates `size`, `variant`, `color`, `isBordered` to all child `Avatar` components                     |
| Local props override group       | Props on individual `Avatar` take precedence over `AvatarGroupContext` values                            |
| `isBordered`                     | Renders `ring-2 ring-offset-2` — ring color matches the `color` scheme                                   |
| `isDisabled`                     | `opacity: 0.5; pointer-events: none` — avatar stays in DOM                                               |
| `role="img"`                     | Applied on `Avatar` root `<span>` with `aria-label={name}`                                               |
| `AvatarFallback` `aria-hidden`   | Always `aria-hidden="true"` — the `Avatar` root carries the accessible name                              |
| `AvatarIcon` `aria-hidden`       | Always `aria-hidden="true"` — decorative                                                                 |
| `displayName`                    | Set on all 5 sub-components (`IdeasUI.Avatar*`)                                                          |
| `data-slot`                      | `avatar`, `avatar-group`, `avatar-image`, `avatar-fallback`, `avatar-icon`, `avatar-overflow`            |

---

## 11. Avatar vs Chip (with Avatar) — Decision Guide

| Concern                          | `Avatar`                                                             | `Chip` with `ChipAvatar`                  |
| -------------------------------- | -------------------------------------------------------------------- | ----------------------------------------- |
| **Standalone identity display**  | Yes — primary use case                                               | No — avatar is a slot inside Chip         |
| **Interactive**                  | No — display only                                                    | Yes — `selectable` / `dismissible` modes  |
| **Group stacking with overflow** | Yes — `AvatarGroup` with `max`                                       | No                                        |
| **Bordered ring**                | Yes — `isBordered` prop                                              | No                                        |
| **Shape options**                | Yes — `circle` / `square`                                            | No — always `circle`                      |
| **SVG avatar**                   | Yes — `AvatarImage` with SVG `children` or `AvatarFallback` with SVG | No                                        |
| **Next.js Image**                | Yes — `AvatarImage` `as` render prop                                 | No                                        |
| **Label text alongside**         | No                                                                   | Yes — chip label                          |
| **Dismiss / remove**             | No                                                                   | Yes — `ChipDismiss`                       |
| **Use case**                     | User profiles, comment threads, member lists                         | People chips, assignee tags, filter chips |

> **Rule:** Use `Avatar` for standalone identity display and grouped member lists. Use `Chip` with `ChipAvatar` when the person element needs a label, is selectable, or is dismissible.

---

## 12. Accessibility Requirements (WCAG 2.1 AA)

- **`role="img"`**: Applied on the `Avatar` root `<span>` with `aria-label={name}`. This ensures screen readers announce the avatar as an image with a meaningful name.
- **`alt` on `AvatarImage`**: Defaults to `name` when not explicitly provided. When `name` is absent, `alt=""` is used (decorative image). When `AvatarImage` renders an inline SVG via `children`, the SVG must carry `aria-hidden="true"` — the `Avatar` root `aria-label` provides the accessible name. When using the `as` render prop (e.g. Next.js `<Image>`), the consumer must pass a meaningful `alt` string.
- **`AvatarFallback` `aria-hidden`**: The fallback `<span>` is always `aria-hidden="true"` — the `Avatar` root's `aria-label` carries the accessible name.
- **`AvatarIcon` `aria-hidden`**: Icon wrappers are always `aria-hidden="true"` — decorative only.
- **`AvatarGroup` `role="group"`**: Applied with `aria-label` so screen readers announce the group purpose (e.g. `"Team members"`).
- **Overflow indicator**: The `+{n}` overflow `<span>` has `aria-label="{n} more"` for screen reader announcement.
- **`isDisabled`**: Does not use `aria-disabled` since `Avatar` is non-interactive. Applies `opacity: 0.5` and `pointer-events: none` only.
- **Contrast Ratios**: All color tokens map to OKLCH variables meeting or exceeding 4.5:1 contrast in light and dark modes. White text on `solid` color backgrounds is verified at all 5 color schemes.
- **`prefers-reduced-motion`**: `transition-opacity` suppressed via the global `@media (prefers-reduced-motion: reduce)` rule in `@ideasui/styles`.
- **A11y Tests (`vitest-axe`)**: Must pass zero-violation automated accessibility testing:

```tsx
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Avatar, AvatarGroup } from '../src';

it('avatar with name has zero a11y violations', async () => {
  const { container } = render(<Avatar name="Jane Doe" />);
  expect(await axe(container)).toHaveNoViolations();
});

it('avatar with src and name has zero a11y violations', async () => {
  const { container } = render(<Avatar src="/user.jpg" name="Jane Doe" />);
  expect(await axe(container)).toHaveNoViolations();
});

it('avatar with icon fallback has zero a11y violations', async () => {
  const { container } = render(
    <Avatar aria-label="Unknown user">
      <AvatarFallback>
        <AvatarIcon>
          <span>icon</span>
        </AvatarIcon>
      </AvatarFallback>
    </Avatar>,
  );
  expect(await axe(container)).toHaveNoViolations();
});

it('avatar group has zero a11y violations', async () => {
  const { container } = render(
    <AvatarGroup label="Team members" max={3}>
      <Avatar name="Alice" />
      <Avatar name="Bob" />
      <Avatar name="Carol" />
      <Avatar name="Dave" />
    </AvatarGroup>,
  );
  expect(await axe(container)).toHaveNoViolations();
});

it('disabled avatar has zero a11y violations', async () => {
  const { container } = render(<Avatar name="Jane Doe" isDisabled />);
  expect(await axe(container)).toHaveNoViolations();
});
```

---

## 13. Storybook Stories (`avatar.stories.tsx`)

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Avatar, AvatarGroup, AvatarFallback, AvatarIcon } from '../src';

const UserIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="60%" height="60%">
    <path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z" />
  </svg>
);

const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Avatar>;

// ── Default ─────────────────────────────────────────────────────
export const Default: Story = {
  render: () => <Avatar src="/user.jpg" name="Jane Doe" />,
};

// ── Initials Fallback ───────────────────────────────────────────
export const InitialsFallback: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar name="Jane Doe" />
      <Avatar name="John Smith" color="primary" />
      <Avatar name="Alice B" color="success" />
      <Avatar name="X" color="warning" />
    </div>
  ),
};

// ── All Variants ────────────────────────────────────────────────
export const Variants: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      {(['solid', 'soft', 'outline', 'ghost'] as const).map((variant) => (
        <Avatar key={variant} variant={variant} color="primary" name="JD" />
      ))}
    </div>
  ),
};

// ── All Color Schemes ───────────────────────────────────────────
export const Colors: Story = {
  render: () => (
    <div className="flex flex-col gap-4">
      {(['solid', 'soft', 'outline'] as const).map((variant) => (
        <div key={variant} className="flex items-center gap-3">
          {(['primary', 'neutral', 'success', 'warning', 'danger'] as const).map((color) => (
            <Avatar key={color} variant={variant} color={color} name="JD" />
          ))}
        </div>
      ))}
    </div>
  ),
};

// ── All Sizes ───────────────────────────────────────────────────
export const Sizes: Story = {
  render: () => (
    <div className="flex items-end gap-3">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <Avatar key={size} size={size} name="JD" color="primary" />
      ))}
    </div>
  ),
};

// ── Shapes ──────────────────────────────────────────────────────
export const Shapes: Story = {
  render: () => (
    <div className="flex items-center gap-4">
      <Avatar shape="circle" name="JD" size="lg" color="primary" />
      <Avatar shape="square" name="JD" size="lg" color="primary" />
    </div>
  ),
};

// ── Bordered ────────────────────────────────────────────────────
export const Bordered: Story = {
  render: () => (
    <div className="flex items-center gap-4 p-4">
      {(['primary', 'success', 'warning', 'danger'] as const).map((color) => (
        <Avatar key={color} isBordered color={color} name="JD" size="lg" />
      ))}
    </div>
  ),
};

// ── Icon Fallback ───────────────────────────────────────────────
export const IconFallback: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar color="neutral" size="md" aria-label="Unknown user">
        <AvatarFallback>
          <AvatarIcon>
            <UserIcon />
          </AvatarIcon>
        </AvatarFallback>
      </Avatar>
      <Avatar color="primary" size="lg" aria-label="Unknown user">
        <AvatarFallback>
          <AvatarIcon>
            <UserIcon />
          </AvatarIcon>
        </AvatarFallback>
      </Avatar>
    </div>
  ),
};

// ── Disabled ────────────────────────────────────────────────────
// -- SVG Image --------------------------------------------------
export const SvgImage: Story = {
  render: () => {
    const BotSvg = () => (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="80%" height="80%">
        <rect x="7" y="2" width="10" height="8" rx="2" />
        <circle cx="9.5" cy="6" r="1" fill="white" />
        <circle cx="14.5" cy="6" r="1" fill="white" />
        <rect x="4" y="12" width="16" height="9" rx="3" />
        <rect x="11" y="1" width="2" height="2" />
      </svg>
    );
    return (
      <div className="flex items-center gap-3">
        <Avatar name="Bot" color="primary" size="lg">
          <AvatarImage>
            <BotSvg />
          </AvatarImage>
        </Avatar>
        <Avatar name="Bot" color="neutral" size="lg">
          <AvatarFallback>
            <BotSvg />
          </AvatarFallback>
        </Avatar>
      </div>
    );
  },
};

// -- Next.js Image ----------------------------------------------
// NOTE: Replace NextImageRenderer with import NextImage from 'next/image' in a real Next.js app.
export const NextJsImage: Story = {
  render: () => {
    const NextImageRenderer = ({
      src,
      alt,
      className,
    }: {
      src?: string;
      alt?: string;
      className?: string;
    }) => <img src={src} alt={alt ?? ''} className={className} style={{ objectFit: 'cover' }} />;
    return (
      <div className="flex items-center gap-3">
        <Avatar name="Jane Doe" size="md">
          <AvatarImage
            src="/user.jpg"
            alt="Jane Doe"
            as={({ src, alt, className }) => (
              <NextImageRenderer src={src} alt={alt} className={className} />
            )}
          />
        </Avatar>
        <Avatar name="John Smith" size="lg">
          <AvatarImage
            src="/user2.jpg"
            alt="John Smith"
            as={({ src, alt, className }) => (
              <NextImageRenderer src={src} alt={alt} className={className} />
            )}
          />
        </Avatar>
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div className="flex items-center gap-3">
      <Avatar name="Jane Doe" isDisabled />
      <Avatar src="/user.jpg" name="Jane Doe" isDisabled />
    </div>
  ),
};

// ── AvatarGroup — Basic ─────────────────────────────────────────
export const Group: Story = {
  render: () => (
    <AvatarGroup label="Team members">
      <Avatar src="/a.jpg" name="Alice" />
      <Avatar src="/b.jpg" name="Bob" />
      <Avatar src="/c.jpg" name="Carol" />
      <Avatar name="Dave" color="primary" />
    </AvatarGroup>
  ),
};

// ── AvatarGroup — With Max Overflow ────────────────────────────
export const GroupWithOverflow: Story = {
  render: () => (
    <AvatarGroup label="Team members" max={3}>
      <Avatar name="Alice" color="primary" />
      <Avatar name="Bob" color="success" />
      <Avatar name="Carol" color="warning" />
      <Avatar name="Dave" color="danger" />
      <Avatar name="Eve" color="neutral" />
    </AvatarGroup>
  ),
};

// ── AvatarGroup — All Sizes ─────────────────────────────────────
export const GroupSizes: Story = {
  render: () => (
    <div className="flex flex-col gap-6">
      {(['xs', 'sm', 'md', 'lg', 'xl'] as const).map((size) => (
        <AvatarGroup key={size} size={size} label={`Size ${size}`}>
          <Avatar name="Alice" color="primary" />
          <Avatar name="Bob" color="success" />
          <Avatar name="Carol" color="warning" />
        </AvatarGroup>
      ))}
    </div>
  ),
};

// ── AvatarGroup — Bordered ──────────────────────────────────────
export const GroupBordered: Story = {
  render: () => (
    <AvatarGroup label="Bordered group" isBordered max={4}>
      <Avatar name="Alice" color="primary" />
      <Avatar name="Bob" color="success" />
      <Avatar name="Carol" color="warning" />
      <Avatar name="Dave" color="danger" />
      <Avatar name="Eve" color="neutral" />
    </AvatarGroup>
  ),
};

// ── Playground ──────────────────────────────────────────────────
export const Playground: Story = {
  args: {
    variant: 'soft',
    color: 'neutral',
    size: 'md',
    shape: 'circle',
    isBordered: false,
    isDisabled: false,
    name: 'Jane Doe',
  },
  render: (args) => <Avatar {...args} />,
};
```

---

## 14. Definition of Done Checklist

- [ ] Package created at `packages/components/avatar/`
- [ ] Recipe created at `packages/core/theme/src/recipes/avatar.ts`
- [ ] Standalone BEM CSS created at `packages/core/styles/src/components/avatar.css`
- [ ] `index.ts` barrel exports all 5 sub-components, context hooks, and all public types
- [ ] Exported through `@ideasui/react` master barrel
- [ ] All 4 variants (`solid`, `soft`, `outline`, `ghost`) implemented and verified
- [ ] All 5 color schemes (`primary`, `neutral`, `success`, `warning`, `danger`) implemented and verified
- [ ] All 5 sizes (`xs`, `sm`, `md`, `lg`, `xl`) implemented and verified
- [ ] Both shapes (`circle`, `square`) implemented and verified
- [ ] `isBordered` renders correct ring with color-matched ring color
- [ ] `isDisabled` applies `opacity: 0.5; pointer-events: none`
- [ ] `AvatarImage` — native `<img>` mode: renders with correct `alt` text; fires `onError` to trigger fallback
- [ ] `AvatarImage` — SVG `children` mode: renders inline SVG; `src` and `as` ignored; SVG is `aria-hidden`
- [ ] `AvatarImage` — `as` render prop mode: calls custom renderer with `{ src, alt, className, onError }`; verified with Next.js `<Image>` example
- [ ] `AvatarFallback` renders initials from `name` (up to 2 chars, uppercase)
- [ ] `AvatarFallback` renders `DefaultPersonIcon` when no `name` and no `children`
- [ ] `AvatarFallback` renders SVG component or any `ReactNode` passed as `children`
- [ ] `AvatarImageRenderProps` type exported from barrel
- [ ] `AvatarIcon` is always `aria-hidden="true"`
- [ ] `AvatarFallback` is always `aria-hidden="true"`
- [ ] `Avatar` root has `role="img"` and `aria-label={name}`
- [ ] `AvatarGroup` renders `role="group"` with `aria-label`
- [ ] `AvatarGroup` `max` prop slices children and renders `+{overflow}` indicator
- [ ] Overflow indicator has `aria-label="{n} more"`
- [ ] `AvatarGroup` `spacing` prop applied as `margin-inline-start` on each avatar after the first
- [ ] `AvatarGroup` context propagates `size`, `variant`, `color`, `isBordered` to child `Avatar` components
- [ ] Local `Avatar` props override `AvatarGroupContext` values
- [ ] `compoundVariants` correctly apply color scheme per variant combination (20 rules + 5 bordered ring rules)
- [ ] `useAvatarGroupContext` returns `null` safely when used outside group (standalone `Avatar`)
- [ ] `displayName` set on all 5 sub-components (`IdeasUI.Avatar*`)
- [ ] `data-slot` attribute rendered on all sub-components and overflow indicator
- [ ] All semantic OKLCH colors used — no hardcoded colors or `dark:` prefixes
- [ ] `vitest-axe` accessibility tests pass with 0 violations (with name, with src, icon fallback, group, disabled)
- [ ] `prefers-reduced-motion` suppression verified via `@ideasui/styles` global rule
- [ ] Storybook stories created (`Default`, `InitialsFallback`, `Variants`, `Colors`, `Sizes`, `Shapes`, `Bordered`, `IconFallback`, `SvgImage`, `NextJsImage`, `Disabled`, `Group`, `GroupWithOverflow`, `GroupSizes`, `GroupBordered`, `Playground`)
- [ ] Documentation page created at `apps/docs/content/react/components/avatar.mdx`
- [ ] Monorepo `pnpm typecheck` and `pnpm lint` pass cleanly
