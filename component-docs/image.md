# Image Component — TRD (Technical Reference Document)

## 1. Overview

- **Component:** `Image` (Single + Compound)
- **Package:** `@ideasui/image`
- **Directory:** `packages/components/image/`
- **Primary Exports:** `Image`, `ImageFallback`
- **Category:** Media / Display
- **Recipe Location:** `packages/core/theme/src/recipes/image.ts`
- **Standalone CSS:** `packages/core/styles/src/components/image.css`

### Purpose

`Image` is a fully accessible, framework-agnostic image component for IdeasUI applications. It is designed to work in **any React environment** — plain React apps, Next.js (App Router and Pages Router), Remix, Vite, and others — by accepting a custom `renderImage` render prop that lets consumers plug in their framework's optimized image primitive (e.g. `next/image`, `gatsby-image`, `@unpic/react`).

Out of the box it renders a native `<img>` with built-in loading states, error fallback, blur placeholder, `srcSet` / `sizes` support, and accessible markup. When a `renderImage` prop is provided, the native `<img>` is replaced entirely by the consumer's renderer while all layout, styling, fallback, and accessibility logic remains owned by `Image`.

Key Features:

- Framework-agnostic: works in plain React, Next.js, Remix, Gatsby, Vite, etc.
- `renderImage` render prop — plug in `next/image`, `@unpic/react`, or any custom renderer
- Native `<img>` with `srcSet` / `sizes` support out of the box
- `objectFit` and `objectPosition` control
- `aspectRatio` shorthand prop (`'square'`, `'video'`, `'auto'`, or custom string e.g. `'4/3'`)
- Loading states: `isLoading` skeleton shimmer before image loads
- Error fallback: `ImageFallback` sub-component shown on `onError`
- Blur placeholder: `blurDataURL` low-quality image placeholder (LQIP) shown while loading
- `priority` hint — maps to `loading="eager"` + `fetchpriority="high"` for LCP images
- `radius` prop for border radius (`none`, `sm`, `md`, `lg`, `xl`, `full`)
- `isZoomed` hover zoom effect
- `shadow` prop (`none`, `sm`, `md`, `lg`)
- Semantic OKLCH color tokens — no hardcoded colors or `dark:` prefixes
- `data-slot` attributes on every element for CSS targeting
- Zero-violation `vitest-axe` accessibility testing

---

## 2. Package Architecture & Directory Map

```
packages/components/image/
├── src/
│   ├── image.tsx           ← Image root component
│   ├── image-fallback.tsx  ← Fallback sub-component (shown on error)
│   ├── image.types.ts      ← Full TypeScript interfaces with JSDoc
│   └── index.ts            ← Barrel export (public API only)
├── __tests__/
│   └── image.test.tsx      ← Vitest + Testing Library + vitest-axe
├── stories/
│   └── image.stories.tsx   ← Storybook 10 stories
├── package.json
├── tsconfig.json
└── tsup.config.ts

packages/core/theme/src/recipes/
└── image.ts                ← Tailwind Variants tv() recipe

packages/core/styles/src/components/
└── image.css               ← Standalone BEM CSS rules
```

### Dependency Flow

```
@ideasui/image → @ideasui/theme, @ideasui/utils
@ideasui/react → @ideasui/image (re-export in master barrel)
```

> **Rule:** `@ideasui/image` MUST NOT import directly from other component directories. Use `workspace:*` for internal monorepo dependencies in `package.json`.

---

## 3. Component Architecture

`Image` is a **single compound component** with one optional sub-component (`ImageFallback`). There is no context — `ImageFallback` is rendered directly inside `Image` as a child.

### Slot Map

| Sub-Component      | `data-slot`      | Default Element   | Notes                                                       |
| ------------------ | ---------------- | ----------------- | ----------------------------------------------------------- |
| `Image`            | `image-wrapper`  | `<div>`           | Outer layout container (aspect ratio, radius, shadow, zoom) |
| `<img>` / renderer | `image`          | `<img>` or custom | The actual image element or custom renderer output          |
| `ImageFallback`    | `image-fallback` | `<div>`           | Shown when image errors or `src` is absent                  |
| Skeleton           | `image-skeleton` | `<div>`           | Shimmer overlay shown while `isLoading`                     |
| Blur placeholder   | `image-blur`     | `<img>`           | Low-quality placeholder shown before full image loads       |

### Anatomy

```
Image (wrapper div — owns layout, aspect ratio, radius, shadow, zoom)
├── <img> or renderImage(...)   (the actual image)
├── image-blur                  (optional — LQIP shown while loading)
├── image-skeleton              (optional — shimmer while isLoading)
└── ImageFallback               (optional — shown on error or no src)
```

### Framework Integration Pattern

```
Plain React (default)
  <Image src="/photo.jpg" alt="..." />
  → renders native <img src="/photo.jpg" ... />

Next.js App Router
  <Image
    src="/photo.jpg"
    alt="..."
    renderImage={({ src, alt, className, ...props }) => (
      <NextImage src={src} alt={alt} fill className={className} />
    )}
  />
  → renders Next.js <Image> inside the IdeasUI wrapper

Custom renderer (any framework)
  <Image
    src="/photo.jpg"
    alt="..."
    renderImage={(props) => <MyOptimizedImage {...props} />}
  />
```

---

## 4. Component API & Props Specification

### Public API Usage

```tsx
import { Image, ImageFallback } from '@ideasui/react';
import NextImage from 'next/image';

// ── Plain React — basic ─────────────────────────────────────────
<Image src="/photo.jpg" alt="Mountain landscape" />

// ── Plain React — with srcSet ───────────────────────────────────
<Image
  src="/photo.jpg"
  alt="Mountain landscape"
  srcSet="/photo-400.jpg 400w, /photo-800.jpg 800w, /photo-1200.jpg 1200w"
  sizes="(max-width: 768px) 100vw, 50vw"
/>

// ── Aspect ratio ────────────────────────────────────────────────
<Image src="/photo.jpg" alt="..." aspectRatio="video" />
<Image src="/photo.jpg" alt="..." aspectRatio="square" />
<Image src="/photo.jpg" alt="..." aspectRatio="4/3" />

// ── Object fit ──────────────────────────────────────────────────
<Image src="/photo.jpg" alt="..." objectFit="cover" />
<Image src="/photo.jpg" alt="..." objectFit="contain" />

// ── Radius ──────────────────────────────────────────────────────
<Image src="/photo.jpg" alt="..." radius="lg" />
<Image src="/photo.jpg" alt="..." radius="full" />

// ── Shadow ──────────────────────────────────────────────────────
<Image src="/photo.jpg" alt="..." shadow="md" />

// ── Priority (LCP image) ────────────────────────────────────────
<Image src="/hero.jpg" alt="Hero" priority />

// ── Blur placeholder (LQIP) ─────────────────────────────────────
<Image
  src="/photo.jpg"
  alt="..."
  blurDataURL="data:image/jpeg;base64,/9j/4AAQ..."
/>

// ── Loading skeleton ────────────────────────────────────────────
<Image src="/photo.jpg" alt="..." isLoading />

// ── Zoom on hover ───────────────────────────────────────────────
<Image src="/photo.jpg" alt="..." isZoomed />

// ── Error fallback ──────────────────────────────────────────────
<Image src="/broken.jpg" alt="...">
  <ImageFallback>
    <span>Image unavailable</span>
  </ImageFallback>
</Image>

// ── Next.js App Router (fill mode) ─────────────────────────────
<div style={{ position: 'relative', width: '100%', height: 400 }}>
  <Image
    src="/photo.jpg"
    alt="Mountain landscape"
    renderImage={({ src, alt, className }) => (
      <NextImage src={src!} alt={alt ?? ''} fill className={className} />
    )}
  />
</div>

// ── Next.js App Router (fixed dimensions) ──────────────────────
<Image
  src="/photo.jpg"
  alt="Mountain landscape"
  width={800}
  height={600}
  renderImage={({ src, alt, width, height, className }) => (
    <NextImage
      src={src!}
      alt={alt ?? ''}
      width={width}
      height={height}
      className={className}
    />
  )}
/>

// ── Next.js with priority (LCP) ─────────────────────────────────
<Image
  src="/hero.jpg"
  alt="Hero banner"
  aspectRatio="video"
  priority
  renderImage={({ src, alt, className }) => (
    <NextImage src={src!} alt={alt ?? ''} fill priority className={className} />
  )}
/>

// ── Next.js with blur placeholder ───────────────────────────────
<Image
  src="/photo.jpg"
  alt="..."
  blurDataURL="data:image/jpeg;base64,/9j/4AAQ..."
  renderImage={({ src, alt, blurDataURL, className }) => (
    <NextImage
      src={src!}
      alt={alt ?? ''}
      fill
      placeholder="blur"
      blurDataURL={blurDataURL}
      className={className}
    />
  )}
/>

// ── Plain React with all features ───────────────────────────────
<Image
  src="/photo.jpg"
  alt="Mountain landscape"
  aspectRatio="video"
  objectFit="cover"
  radius="lg"
  shadow="md"
  isZoomed
  priority
  blurDataURL="data:image/jpeg;base64,/9j/4AAQ..."
  srcSet="/photo-400.jpg 400w, /photo-800.jpg 800w"
  sizes="(max-width: 768px) 100vw, 800px"
  onLoad={() => console.log('loaded')}
  onError={() => console.log('error')}
>
  <ImageFallback>
    <BrokenImageIcon />
  </ImageFallback>
</Image>
```

### TypeScript Definition (`image.types.ts`)

```tsx
import type { CSSProperties, HTMLAttributes, ImgHTMLAttributes, ReactNode } from 'react';

export type ImageObjectFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
export type ImageObjectPosition = 'center' | 'top' | 'bottom' | 'left' | 'right' | string;
export type ImageRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type ImageShadow = 'none' | 'sm' | 'md' | 'lg';
export type ImageAspectRatio = 'square' | 'video' | 'auto' | string;

export interface ImageRenderProps {
  /**
   * The image source URL passed through from `Image` `src` prop.
   */
  readonly src?: string;

  /**
   * Alt text passed through from `Image` `alt` prop.
   */
  readonly alt?: string;

  /**
   * Width in pixels passed through from `Image` `width` prop.
   */
  readonly width?: number;

  /**
   * Height in pixels passed through from `Image` `height` prop.
   */
  readonly height?: number;

  /**
   * CSS class string to apply to the rendered image element.
   * Always pass this to your custom renderer to preserve objectFit and sizing styles.
   */
  readonly className?: string;

  /**
   * Blur data URL for LQIP placeholder. Pass to Next.js `blurDataURL` prop.
   */
  readonly blurDataURL?: string;

  /**
   * Whether this is a priority / LCP image. Pass to Next.js `priority` prop.
   */
  readonly priority?: boolean;

  /**
   * srcSet string for responsive images.
   */
  readonly srcSet?: string;

  /**
   * sizes string for responsive images.
   */
  readonly sizes?: string;

  /**
   * Called when the image finishes loading successfully.
   */
  readonly onLoad?: () => void;

  /**
   * Called when the image fails to load.
   */
  readonly onError?: () => void;
}

export interface ImageProps extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  /**
   * Image source URL.
   */
  readonly src?: string;

  /**
   * Alt text for the image. Required for accessibility unless the image is decorative.
   * Pass `alt=""` for decorative images.
   */
  readonly alt?: string;

  /**
   * Intrinsic width of the image in pixels.
   * Used by native `<img>` and passed to `renderImage` for custom renderers.
   */
  readonly width?: number;

  /**
   * Intrinsic height of the image in pixels.
   * Used by native `<img>` and passed to `renderImage` for custom renderers.
   */
  readonly height?: number;

  /**
   * Responsive image srcSet string.
   * e.g. `"/img-400.jpg 400w, /img-800.jpg 800w"`
   * Passed to native `<img>` and forwarded to `renderImage`.
   */
  readonly srcSet?: string;

  /**
   * Responsive sizes string.
   * e.g. `"(max-width: 768px) 100vw, 800px"`
   * Passed to native `<img>` and forwarded to `renderImage`.
   */
  readonly sizes?: string;

  /**
   * Custom image renderer — replaces the native `<img>` element entirely.
   * Receives `ImageRenderProps` and must return a rendered image element.
   *
   * Use this to integrate:
   * - Next.js `<Image>` (`next/image`)
   * - Gatsby `<GatsbyImage>`
   * - `@unpic/react`
   * - Any other optimized image component
   *
   * The IdeasUI `Image` wrapper still owns layout, aspect ratio, radius,
   * shadow, zoom, skeleton, fallback, and accessibility.
   *
   * @example — Next.js fill mode
   * renderImage={({ src, alt, className }) => (
   *   <NextImage src={src!} alt={alt ?? ''} fill className={className} />
   * )}
   *
   * @example — Next.js fixed dimensions
   * renderImage={({ src, alt, width, height, className }) => (
   *   <NextImage src={src!} alt={alt ?? ''} width={width} height={height} className={className} />
   * )}
   */
  readonly renderImage?: (props: ImageRenderProps) => JSX.Element;

  /**
   * How the image should be resized to fit its container.
   * @default 'cover'
   */
  readonly objectFit?: ImageObjectFit;

  /**
   * Alignment of the image within its container when `objectFit` is `cover` or `contain`.
   * @default 'center'
   */
  readonly objectPosition?: ImageObjectPosition;

  /**
   * Aspect ratio of the image wrapper.
   * - `'square'`  → `aspect-ratio: 1 / 1`
   * - `'video'`   → `aspect-ratio: 16 / 9`
   * - `'auto'`    → no aspect ratio constraint (default)
   * - Custom string e.g. `'4/3'`, `'3/2'`
   * @default 'auto'
   */
  readonly aspectRatio?: ImageAspectRatio;

  /**
   * Border radius of the image wrapper.
   * @default 'none'
   */
  readonly radius?: ImageRadius;

  /**
   * Box shadow applied to the image wrapper.
   * @default 'none'
   */
  readonly shadow?: ImageShadow;

  /**
   * Marks this image as a priority / LCP image.
   * - Native `<img>`: sets `loading="eager"` and `fetchpriority="high"`
   * - Custom renderer: forwarded via `renderImage` props
   * @default false
   */
  readonly priority?: boolean;

  /**
   * Low-quality image placeholder (LQIP) data URL shown while the full image loads.
   * Displayed as a blurred `<img>` behind the main image until load completes.
   * For Next.js, pass this to `blurDataURL` inside `renderImage`.
   */
  readonly blurDataURL?: string;

  /**
   * Shows a shimmer skeleton overlay. Use when the image src is not yet available
   * (e.g. loading from an API) to prevent layout shift.
   * @default false
   */
  readonly isLoading?: boolean;

  /**
   * Applies a CSS scale transform on hover for a zoom-in effect.
   * @default false
   */
  readonly isZoomed?: boolean;

  /**
   * Called when the image finishes loading successfully.
   */
  readonly onLoad?: () => void;

  /**
   * Called when the image fails to load. The `ImageFallback` child is shown automatically.
   */
  readonly onError?: () => void;

  /**
   * Custom CSS class names merged via `cn()` on the wrapper element.
   */
  readonly className?: string;

  /**
   * Inline styles applied to the wrapper element.
   */
  readonly style?: CSSProperties;

  /**
   * Optional `ImageFallback` child shown when the image errors or `src` is absent.
   */
  readonly children?: ReactNode;
}

export interface ImageFallbackProps extends HTMLAttributes<HTMLDivElement> {
  /**
   * Fallback content — icon, text, or any ReactNode.
   */
  readonly children?: ReactNode;

  readonly className?: string;
  readonly style?: CSSProperties;
}
```

---

## 5. Design Tokens & Recipe (`packages/core/theme/src/recipes/image.ts`)

Styles are managed using **Tailwind Variants (`tv()`)** and mapped to IdeasUI OKLCH semantic tokens. **Raw Tailwind palette colors (e.g. `gray-50`, `blue-600`) and `dark:` modifier prefixes are strictly forbidden.**

```tsx
import { tv, type VariantProps } from 'tailwind-variants';

export const image = tv({
  slots: {
    wrapper: ['relative overflow-hidden', 'transition-transform duration-300'],
    img: ['w-full h-full', 'transition-opacity duration-300'],
    fallback: [
      'absolute inset-0 flex items-center justify-center',
      'bg-surface-muted text-content-secondary',
    ],
    skeleton: ['absolute inset-0 z-10', 'bg-surface-muted', 'animate-pulse'],
    blur: [
      'absolute inset-0 w-full h-full',
      'scale-110 blur-xl',
      'transition-opacity duration-500',
    ],
  },

  variants: {
    objectFit: {
      cover: { img: 'object-cover' },
      contain: { img: 'object-contain' },
      fill: { img: 'object-fill' },
      none: { img: 'object-none' },
      'scale-down': { img: 'object-scale-down' },
    },

    radius: {
      none: { wrapper: 'rounded-none' },
      sm: { wrapper: 'rounded-sm' },
      md: { wrapper: 'rounded-md' },
      lg: { wrapper: 'rounded-lg' },
      xl: { wrapper: 'rounded-xl' },
      full: { wrapper: 'rounded-full' },
    },

    shadow: {
      none: { wrapper: 'shadow-none' },
      sm: { wrapper: 'shadow-sm' },
      md: { wrapper: 'shadow-md' },
      lg: { wrapper: 'shadow-lg' },
    },

    aspectRatio: {
      square: { wrapper: 'aspect-square' },
      video: { wrapper: 'aspect-video' },
      auto: { wrapper: '' },
    },

    isZoomed: {
      true: {
        wrapper: 'group',
        img: 'group-hover:scale-110 transition-transform duration-500',
      },
    },

    isLoaded: {
      true: { img: 'opacity-100' },
      false: { img: 'opacity-0' },
    },

    isLoading: {
      true: { skeleton: 'opacity-100' },
      false: { skeleton: 'opacity-0 pointer-events-none' },
    },
  },

  defaultVariants: {
    objectFit: 'cover',
    radius: 'none',
    shadow: 'none',
    aspectRatio: 'auto',
    isZoomed: false,
    isLoaded: false,
    isLoading: false,
  },
});

export type ImageVariants = VariantProps<typeof image>;
export type ImageReturnType = ReturnType<typeof image>;
```

---

## 6. Component Implementation

### Image (`image.tsx`)

```tsx
'use client';

import type { ImageProps } from './image.types';
import type { CSSProperties, JSX } from 'react';

import { Children, forwardRef, isValidElement, useState } from 'react';
import { image as imageRecipe } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';
import { ImageFallback } from './image-fallback';

function resolveAspectRatioStyle(aspectRatio: string | undefined): CSSProperties {
  if (!aspectRatio || aspectRatio === 'auto') return {};
  if (aspectRatio === 'square') return { aspectRatio: '1 / 1' };
  if (aspectRatio === 'video') return { aspectRatio: '16 / 9' };
  return { aspectRatio };
}

export const Image = forwardRef<HTMLDivElement, ImageProps>(
  (
    {
      src,
      alt = '',
      width,
      height,
      srcSet,
      sizes,
      renderImage,
      objectFit = 'cover',
      objectPosition = 'center',
      aspectRatio = 'auto',
      radius = 'none',
      shadow = 'none',
      priority = false,
      blurDataURL,
      isLoading = false,
      isZoomed = false,
      onLoad,
      onError,
      className,
      style,
      children,
      ...properties
    },
    reference,
  ): JSX.Element => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [hasError, setHasError] = useState(false);
    const [blurVisible, setBlurVisible] = useState(!!blurDataURL);

    const hasFallback = Children.toArray(children).some(
      (child) =>
        isValidElement(child) && (child.type as any).displayName === 'IdeasUI.ImageFallback',
    );

    const showFallback = hasError || (!src && hasFallback);
    const showBlur = blurDataURL && blurVisible && !hasError;

    const styles = imageRecipe({
      objectFit,
      radius,
      shadow,
      aspectRatio: ['square', 'video', 'auto'].includes(aspectRatio)
        ? (aspectRatio as 'square' | 'video' | 'auto')
        : 'auto',
      isZoomed,
      isLoaded,
      isLoading,
    });

    const wrapperStyle: CSSProperties = {
      ...resolveAspectRatioStyle(aspectRatio),
      ...style,
    };

    const imgClass = cn(styles.img(), 'absolute inset-0');
    const imgStyle: CSSProperties = { objectPosition };

    const handleLoad = () => {
      setIsLoaded(true);
      setBlurVisible(false);
      onLoad?.();
    };

    const handleError = () => {
      setHasError(true);
      onError?.();
    };

    const renderProps = {
      src,
      alt,
      width,
      height,
      srcSet,
      sizes,
      blurDataURL,
      priority,
      className: imgClass,
      onLoad: handleLoad,
      onError: handleError,
    };

    return (
      <div
        ref={reference}
        className={cn(styles.wrapper(), className)}
        data-slot="image-wrapper"
        data-loaded={isLoaded || undefined}
        data-error={hasError || undefined}
        style={wrapperStyle}
        {...properties}
      >
        {/* Blur placeholder */}
        {showBlur && (
          <img
            src={blurDataURL}
            alt=""
            aria-hidden="true"
            className={cn(styles.blur())}
            data-slot="image-blur"
          />
        )}

        {/* Skeleton shimmer */}
        {isLoading && (
          <div className={cn(styles.skeleton())} data-slot="image-skeleton" aria-hidden="true" />
        )}

        {/* Image — custom renderer or native <img> */}
        {!showFallback &&
          src &&
          (renderImage ? (
            renderImage(renderProps)
          ) : (
            <img
              src={src}
              alt={alt}
              width={width}
              height={height}
              srcSet={srcSet}
              sizes={sizes}
              loading={priority ? 'eager' : 'lazy'}
              fetchPriority={priority ? 'high' : 'auto'}
              className={cn(imgClass)}
              style={imgStyle}
              data-slot="image"
              onLoad={handleLoad}
              onError={handleError}
            />
          ))}

        {/* Fallback */}
        {showFallback && children}
        {showFallback && !hasFallback && <ImageFallback />}
      </div>
    );
  },
);

Image.displayName = 'IdeasUI.Image';
```

### ImageFallback (`image-fallback.tsx`)

```tsx
'use client';

import type { ImageFallbackProps } from './image.types';
import type { JSX } from 'react';

import { forwardRef } from 'react';
import { image as imageRecipe } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';

const DefaultBrokenIcon = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    aria-hidden="true"
    focusable="false"
    width="2rem"
    height="2rem"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 3l18 18"
    />
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M3 3l18 18M3 3h18v18H3V3z"
      opacity="0.2"
    />
  </svg>
);

export const ImageFallback = forwardRef<HTMLDivElement, ImageFallbackProps>(
  ({ children, className, style, ...properties }, reference): JSX.Element => {
    const styles = imageRecipe();

    return (
      <div
        ref={reference}
        className={cn(styles.fallback(), className)}
        data-slot="image-fallback"
        aria-hidden="true"
        style={style}
        {...properties}
      >
        {children ?? <DefaultBrokenIcon />}
      </div>
    );
  },
);

ImageFallback.displayName = 'IdeasUI.ImageFallback';
```

### Barrel Export (`index.ts`)

```tsx
export { Image } from './image';
export { ImageFallback } from './image-fallback';

export type {
  ImageProps,
  ImageFallbackProps,
  ImageRenderProps,
  ImageObjectFit,
  ImageObjectPosition,
  ImageRadius,
  ImageShadow,
  ImageAspectRatio,
} from './image.types';
```

---

## 7. Standalone BEM CSS Specification (`packages/core/styles/src/components/image.css`)

```css
/* ─── Wrapper ─────────────────────────────────────────────────── */
.ideasui-image {
  position: relative;
  overflow: hidden;
  transition: transform 300ms ease;
}

/* ─── Radius ──────────────────────────────────────────────────── */
.ideasui-image--radius-none {
  border-radius: 0;
}
.ideasui-image--radius-sm {
  border-radius: var(--ideasui-radius-sm, 0.125rem);
}
.ideasui-image--radius-md {
  border-radius: var(--ideasui-radius-md, 0.375rem);
}
.ideasui-image--radius-lg {
  border-radius: var(--ideasui-radius-lg, 0.5rem);
}
.ideasui-image--radius-xl {
  border-radius: var(--ideasui-radius-xl, 0.75rem);
}
.ideasui-image--radius-full {
  border-radius: 9999px;
}

/* ─── Shadow ──────────────────────────────────────────────────── */
.ideasui-image--shadow-none {
  box-shadow: none;
}
.ideasui-image--shadow-sm {
  box-shadow: var(--ideasui-shadow-sm);
}
.ideasui-image--shadow-md {
  box-shadow: var(--ideasui-shadow-md);
}
.ideasui-image--shadow-lg {
  box-shadow: var(--ideasui-shadow-lg);
}

/* ─── Aspect ratios ───────────────────────────────────────────── */
.ideasui-image--aspect-square {
  aspect-ratio: 1 / 1;
}
.ideasui-image--aspect-video {
  aspect-ratio: 16 / 9;
}

/* ─── Zoom ────────────────────────────────────────────────────── */
.ideasui-image--zoomed .ideasui-image__img {
  transition: transform 500ms ease;
}
.ideasui-image--zoomed:hover .ideasui-image__img {
  transform: scale(1.1);
}

/* ─── Image element ───────────────────────────────────────────── */
.ideasui-image__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transition: opacity 300ms ease;
}
.ideasui-image__img--cover {
  object-fit: cover;
}
.ideasui-image__img--contain {
  object-fit: contain;
}
.ideasui-image__img--fill {
  object-fit: fill;
}
.ideasui-image__img--none {
  object-fit: none;
}
.ideasui-image__img--scale-down {
  object-fit: scale-down;
}

.ideasui-image__img--loaded {
  opacity: 1;
}
.ideasui-image__img--loading {
  opacity: 0;
}

/* ─── Blur placeholder ────────────────────────────────────────── */
.ideasui-image__blur {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  transform: scale(1.1);
  filter: blur(20px);
  transition: opacity 500ms ease;
}

/* ─── Skeleton shimmer ────────────────────────────────────────── */
.ideasui-image__skeleton {
  position: absolute;
  inset: 0;
  z-index: 10;
  background-color: oklch(var(--ideasui-color-surface-muted));
  animation: ideasui-shimmer 1.5s infinite;
}

@keyframes ideasui-shimmer {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
}

/* ─── Fallback ────────────────────────────────────────────────── */
.ideasui-image__fallback {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: oklch(var(--ideasui-color-surface-muted));
  color: oklch(var(--ideasui-color-content-secondary));
}

/* prefers-reduced-motion — suppressed via @ideasui/styles global rule */
@media (prefers-reduced-motion: reduce) {
  .ideasui-image__skeleton {
    animation: none;
  }
  .ideasui-image--zoomed:hover .ideasui-image__img {
    transform: none;
  }
  .ideasui-image__img,
  .ideasui-image__blur {
    transition: none;
  }
}
```

---

## 8. All Variants Reference

### Object Fit

| `objectFit`       | CSS                      | Use case                                     |
| ----------------- | ------------------------ | -------------------------------------------- |
| `cover` (default) | `object-fit: cover`      | Fill container, crop if needed — most common |
| `contain`         | `object-fit: contain`    | Show full image, letterbox if needed         |
| `fill`            | `object-fit: fill`       | Stretch to fill — distorts aspect ratio      |
| `none`            | `object-fit: none`       | No resizing — natural size                   |
| `scale-down`      | `object-fit: scale-down` | Smaller of `none` or `contain`               |

### Aspect Ratio

| `aspectRatio`    | CSS                     | Use case                        |
| ---------------- | ----------------------- | ------------------------------- |
| `auto` (default) | none                    | Image determines its own height |
| `square`         | `aspect-ratio: 1 / 1`   | Profile photos, thumbnails      |
| `video`          | `aspect-ratio: 16 / 9`  | Hero images, video thumbnails   |
| Custom string    | `aspect-ratio: {value}` | e.g. `'4/3'`, `'3/2'`, `'21/9'` |

### Radius

| `radius`         | Border Radius         |
| ---------------- | --------------------- |
| `none` (default) | `0`                   |
| `sm`             | `--ideasui-radius-sm` |
| `md`             | `--ideasui-radius-md` |
| `lg`             | `--ideasui-radius-lg` |
| `xl`             | `--ideasui-radius-xl` |
| `full`           | `9999px`              |

### Shadow

| `shadow`         | Value                 |
| ---------------- | --------------------- |
| `none` (default) | none                  |
| `sm`             | `--ideasui-shadow-sm` |
| `md`             | `--ideasui-shadow-md` |
| `lg`             | `--ideasui-shadow-lg` |

### Special Props

| Prop          | Type                                       | Behavior                                                                                 |
| ------------- | ------------------------------------------ | ---------------------------------------------------------------------------------------- |
| `priority`    | `boolean`                                  | `loading="eager"` + `fetchpriority="high"` on native `<img>`; forwarded to `renderImage` |
| `blurDataURL` | `string`                                   | LQIP `<img>` shown blurred behind main image until load; forwarded to `renderImage`      |
| `isLoading`   | `boolean`                                  | Shimmer skeleton overlay — use when `src` is not yet available                           |
| `isZoomed`    | `boolean`                                  | CSS scale transform on hover                                                             |
| `renderImage` | `(props: ImageRenderProps) => JSX.Element` | Replaces native `<img>` with custom renderer                                             |

---

## 9. Behavior Rules

| Behavior                         | Rule                                                                                     |
| -------------------------------- | ---------------------------------------------------------------------------------------- |
| `renderImage` provided           | Native `<img>` is NOT rendered; `renderImage` is called with `ImageRenderProps`          |
| `renderImage` absent             | Native `<img>` rendered with `src`, `alt`, `srcSet`, `sizes`, `loading`, `fetchPriority` |
| `priority=true` (native)         | Sets `loading="eager"` and `fetchpriority="high"` on the `<img>` element                 |
| `priority=true` (custom)         | Forwarded via `renderImage` props — consumer passes to `next/image` `priority` prop      |
| `blurDataURL` (native)           | Rendered as a blurred `<img>` behind the main image; hidden after `onLoad` fires         |
| `blurDataURL` (custom)           | Forwarded via `renderImage` props — consumer passes to `next/image` `blurDataURL`        |
| `isLoading=true`                 | Shimmer skeleton shown; use when `src` is not yet known (async data)                     |
| `onLoad` fires                   | `isLoaded` set to `true`; blur placeholder fades out                                     |
| `onError` fires                  | `hasError` set to `true`; `ImageFallback` shown; image element hidden                    |
| `ImageFallback` child            | Shown when `hasError=true` or `src` is absent and a fallback child is present            |
| No `ImageFallback` child + error | Default broken image icon rendered via internal `ImageFallback`                          |
| `aspectRatio` custom string      | Applied as inline `style={{ aspectRatio }}` — not via Tailwind class                     |
| `objectPosition`                 | Applied as inline `style={{ objectPosition }}` on the `<img>` element                    |
| `isZoomed`                       | CSS `scale(1.1)` on hover via `group-hover` — suppressed by `prefers-reduced-motion`     |
| `alt=""`                         | Valid for decorative images — passes axe accessibility check                             |
| `displayName`                    | Set on both sub-components (`IdeasUI.Image`, `IdeasUI.ImageFallback`)                    |
| `data-slot`                      | `image-wrapper`, `image`, `image-blur`, `image-skeleton`, `image-fallback`               |

---

## 10. Framework Integration Guide

### Plain React (Vite, CRA, etc.)

No configuration needed. `Image` renders a native `<img>` with lazy loading by default.

```tsx
import { Image } from '@ideasui/react';

// Basic
<Image src="/photo.jpg" alt="Mountain" width={800} height={600} />

// Responsive
<Image
  src="/photo.jpg"
  alt="Mountain"
  srcSet="/photo-400.jpg 400w, /photo-800.jpg 800w, /photo-1200.jpg 1200w"
  sizes="(max-width: 768px) 100vw, 800px"
  aspectRatio="video"
/>

// Priority LCP image
<Image src="/hero.jpg" alt="Hero" priority aspectRatio="video" />
```

### Next.js App Router

Use `renderImage` to plug in `next/image`. The IdeasUI wrapper owns all layout and styling.

```tsx
import { Image } from '@ideasui/react';
import NextImage from 'next/image';

// Fill mode — parent must have position: relative and explicit dimensions
<div style={{ position: 'relative', width: '100%', height: 400 }}>
  <Image
    src="/photo.jpg"
    alt="Mountain"
    aspectRatio="video"
    radius="lg"
    renderImage={({ src, alt, className }) => (
      <NextImage src={src!} alt={alt ?? ''} fill className={className} />
    )}
  />
</div>

// Fixed dimensions
<Image
  src="/photo.jpg"
  alt="Mountain"
  width={800}
  height={600}
  radius="md"
  shadow="md"
  renderImage={({ src, alt, width, height, className }) => (
    <NextImage
      src={src!}
      alt={alt ?? ''}
      width={width!}
      height={height!}
      className={className}
    />
  )}
/>

// Priority + blur placeholder (LCP hero)
<Image
  src="/hero.jpg"
  alt="Hero banner"
  aspectRatio="video"
  priority
  blurDataURL="data:image/jpeg;base64,/9j/4AAQ..."
  renderImage={({ src, alt, blurDataURL, priority, className }) => (
    <NextImage
      src={src!}
      alt={alt ?? ''}
      fill
      priority={priority}
      placeholder="blur"
      blurDataURL={blurDataURL}
      className={className}
    />
  )}
/>
```

### Next.js Pages Router

Identical to App Router — `next/image` works the same way in both routers.

### Remix

```tsx
import { Image } from '@ideasui/react';

// Remix has no built-in image optimization — use native <img> (default)
<Image
  src="/photo.jpg"
  alt="Mountain"
  srcSet="/photo-400.jpg 400w, /photo-800.jpg 800w"
  sizes="(max-width: 768px) 100vw, 800px"
  aspectRatio="video"
  radius="lg"
/>;
```

### `@unpic/react`

```tsx
import { Image } from '@ideasui/react';
import { Image as UnpicImage } from '@unpic/react';

<Image
  src="<https://cdn.example.com/photo.jpg>"
  alt="Mountain"
  aspectRatio="video"
  renderImage={({ src, alt, width, height, className }) => (
    <UnpicImage
      src={src!}
      alt={alt ?? ''}
      width={width ?? 800}
      height={height ?? 450}
      className={className}
    />
  )}
/>;
```

---

## 11. Accessibility Requirements (WCAG 2.1 AA)

- **`alt` prop**: Required for meaningful images. Pass `alt=""` for decorative images — this is valid and passes axe checks. The `alt` prop defaults to `''` if omitted.
- **`ImageFallback` `aria-hidden`**: The fallback container is `aria-hidden="true"` — it is a visual placeholder only. The `Image` wrapper's `alt` text provides the accessible description.
- **Blur placeholder `aria-hidden`**: The LQIP `<img>` is always `aria-hidden="true"` and `alt=""` — it is decorative.
- **Skeleton `aria-hidden`**: The shimmer skeleton `<div>` is always `aria-hidden="true"`.
- **`priority` images**: Setting `priority` on above-the-fold images improves LCP (Core Web Vitals) which indirectly improves perceived accessibility for users on slow connections.
- **`prefers-reduced-motion`**: Zoom hover effect, skeleton animation, and opacity transitions are all suppressed via `@media (prefers-reduced-motion: reduce)` in the BEM CSS.
- **Contrast**: `ImageFallback` background uses `-ideasui-color-surface-muted` and icon uses `-ideasui-color-content-secondary` — both meet 3:1 contrast ratio for non-text elements.
- **A11y Tests (`vitest-axe`)**: Must pass zero-violation automated accessibility testing:

```tsx
import { render } from '@testing-library/react';
import { axe } from 'vitest-axe';
import { Image, ImageFallback } from '../src';

it('image with alt has zero a11y violations', async () => {
  const { container } = render(<Image src="/photo.jpg" alt="Mountain landscape" />);
  expect(await axe(container)).toHaveNoViolations();
});

it('decorative image with empty alt has zero a11y violations', async () => {
  const { container } = render(<Image src="/bg.jpg" alt="" />);
  expect(await axe(container)).toHaveNoViolations();
});

it('image with fallback has zero a11y violations', async () => {
  const { container } = render(
    <Image src="/broken.jpg" alt="Broken image">
      <ImageFallback>
        <span>Unavailable</span>
      </ImageFallback>
    </Image>,
  );
  expect(await axe(container)).toHaveNoViolations();
});

it('loading skeleton image has zero a11y violations', async () => {
  const { container } = render(<Image alt="Loading..." isLoading />);
  expect(await axe(container)).toHaveNoViolations();
});

it('image with renderImage has zero a11y violations', async () => {
  const { container } = render(
    <Image
      src="/photo.jpg"
      alt="Mountain"
      renderImage={({ src, alt, className }) => (
        <img src={src} alt={alt ?? ''} className={className} />
      )}
    />,
  );
  expect(await axe(container)).toHaveNoViolations();
});
```

---

## 12. Storybook Stories (`image.stories.tsx`)

```tsx
import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Image, ImageFallback } from '../src';

const meta: Meta<typeof Image> = {
  title: 'Components/Image',
  component: Image,
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<typeof Image>;

// ── Default ─────────────────────────────────────────────────────
export const Default: Story = {
  render: () => (
    <Image
      src="<https://picsum.photos/seed/ideasui/800/600>"
      alt="Random landscape"
      width={800}
      height={600}
      style={{ width: 400, height: 300 }}
    />
  ),
};

// ── Aspect Ratios ───────────────────────────────────────────────
export const AspectRatios: Story = {
  render: () => (
    <div className="flex flex-col gap-6" style={{ width: 400 }}>
      {(['square', 'video', '4/3', '3/2'] as const).map((ratio) => (
        <div key={ratio}>
          <p className="text-content-secondary mb-1 text-xs">{ratio}</p>
          <Image
            src={`https://picsum.photos/seed/${ratio}/800/600`}
            alt={`Aspect ratio ${ratio}`}
            aspectRatio={ratio}
          />
        </div>
      ))}
    </div>
  ),
};

// ── Object Fit ──────────────────────────────────────────────────
export const ObjectFit: Story = {
  render: () => (
    <div className="flex flex-wrap gap-4">
      {(['cover', 'contain', 'fill', 'scale-down'] as const).map((fit) => (
        <div key={fit} style={{ width: 160, height: 120 }}>
          <p className="text-content-secondary mb-1 text-xs">{fit}</p>
          <Image
            src="<https://picsum.photos/seed/fit/400/300>"
            alt={`Object fit ${fit}`}
            objectFit={fit}
            style={{ width: 160, height: 120 }}
          />
        </div>
      ))}
    </div>
  ),
};

// ── Radius ──────────────────────────────────────────────────────
export const Radius: Story = {
  render: () => (
    <div className="flex flex-wrap items-end gap-4">
      {(['none', 'sm', 'md', 'lg', 'xl', 'full'] as const).map((radius) => (
        <div key={radius}>
          <p className="text-content-secondary mb-1 text-xs">{radius}</p>
          <Image
            src="<https://picsum.photos/seed/radius/200/200>"
            alt={`Radius ${radius}`}
            radius={radius}
            aspectRatio="square"
            style={{ width: 80 }}
          />
        </div>
      ))}
    </div>
  ),
};

// ── Shadow ──────────────────────────────────────────────────────
export const Shadow: Story = {
  render: () => (
    <div className="flex flex-wrap gap-8 p-6">
      {(['none', 'sm', 'md', 'lg'] as const).map((shadow) => (
        <div key={shadow}>
          <p className="text-content-secondary mb-2 text-xs">{shadow}</p>
          <Image
            src="<https://picsum.photos/seed/shadow/400/300>"
            alt={`Shadow ${shadow}`}
            shadow={shadow}
            radius="md"
            style={{ width: 160, height: 120 }}
          />
        </div>
      ))}
    </div>
  ),
};

// ── Zoom on Hover ───────────────────────────────────────────────
export const Zoomed: Story = {
  render: () => (
    <Image
      src="<https://picsum.photos/seed/zoom/800/600>"
      alt="Hover to zoom"
      isZoomed
      radius="lg"
      aspectRatio="video"
      style={{ width: 400 }}
    />
  ),
};

// ── Priority (LCP) ──────────────────────────────────────────────
export const Priority: Story = {
  render: () => (
    <Image
      src="<https://picsum.photos/seed/priority/1200/600>"
      alt="Hero image — priority loaded"
      priority
      aspectRatio="video"
      style={{ width: '100%' }}
    />
  ),
};

// ── Blur Placeholder (LQIP) ─────────────────────────────────────
export const BlurPlaceholder: Story = {
  render: () => (
    <Image
      src="<https://picsum.photos/seed/blur/800/600>"
      alt="Image with blur placeholder"
      blurDataURL="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4MDAiIGhlaWdodD0iNjAwIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZTJlOGYwIi8+PC9zdmc+"
      aspectRatio="video"
      style={{ width: 400 }}
    />
  ),
};

// ── Loading Skeleton ────────────────────────────────────────────
export const LoadingSkeleton: Story = {
  render: () => {
    const [loading, setLoading] = useState(true);
    return (
      <div className="flex flex-col gap-4" style={{ width: 400 }}>
        <Image
          src={loading ? undefined : '<https://picsum.photos/seed/skeleton/800/600>'}
          alt="Async loaded image"
          isLoading={loading}
          aspectRatio="video"
          radius="md"
        />
        <button
          type="button"
          className="text-primary w-fit text-sm underline"
          onClick={() => setLoading((v) => !v)}
        >
          {loading ? 'Simulate load complete' : 'Reset to loading'}
        </button>
      </div>
    );
  },
};

// ── Error Fallback ──────────────────────────────────────────────
export const ErrorFallback: Story = {
  render: () => (
    <div className="flex gap-4">
      {/* Default broken icon fallback */}
      <Image
        src="/this-does-not-exist.jpg"
        alt="Broken image"
        aspectRatio="square"
        radius="md"
        style={{ width: 120 }}
      />
      {/* Custom fallback content */}
      <Image
        src="/this-does-not-exist.jpg"
        alt="Broken image with custom fallback"
        aspectRatio="square"
        radius="md"
        style={{ width: 120 }}
      >
        <ImageFallback>
          <span className="text-content-secondary px-2 text-center text-xs">Image unavailable</span>
        </ImageFallback>
      </Image>
    </div>
  ),
};

// ── Next.js Image (simulated) ───────────────────────────────────
// In a real Next.js app, replace SimulatedNextImage with:
//   import NextImage from 'next/image'
export const NextJsIntegration: Story = {
  render: () => {
    const SimulatedNextImage = ({
      src,
      alt,
      className,
      width,
      height,
    }: {
      src?: string;
      alt?: string;
      className?: string;
      width?: number;
      height?: number;
    }) => (
      <img
        src={src}
        alt={alt ?? ''}
        width={width}
        height={height}
        className={className}
        style={{
          objectFit: 'cover',
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
        }}
      />
    );

    return (
      <div className="flex flex-col gap-6" style={{ width: 400 }}>
        <div>
          <p className="text-content-secondary mb-1 text-xs">Fill mode</p>
          <Image
            src="<https://picsum.photos/seed/nextjs/800/600>"
            alt="Next.js fill mode"
            aspectRatio="video"
            radius="lg"
            renderImage={({ src, alt, className }) => (
              <SimulatedNextImage src={src} alt={alt} className={className} />
            )}
          />
        </div>
        <div>
          <p className="text-content-secondary mb-1 text-xs">Fixed dimensions</p>
          <Image
            src="<https://picsum.photos/seed/nextjs2/800/600>"
            alt="Next.js fixed dimensions"
            width={800}
            height={600}
            radius="md"
            shadow="md"
            renderImage={({ src, alt, width, height, className }) => (
              <SimulatedNextImage
                src={src}
                alt={alt}
                width={width}
                height={height}
                className={className}
              />
            )}
          />
        </div>
      </div>
    );
  },
};

// ── All Features Combined ───────────────────────────────────────
export const AllFeatures: Story = {
  render: () => (
    <Image
      src="<https://picsum.photos/seed/all/800/600>"
      alt="All features combined"
      aspectRatio="video"
      objectFit="cover"
      radius="xl"
      shadow="lg"
      isZoomed
      style={{ width: 480 }}
    >
      <ImageFallback>
        <span className="text-content-secondary text-sm">Image unavailable</span>
      </ImageFallback>
    </Image>
  ),
};

// ── Playground ──────────────────────────────────────────────────
export const Playground: Story = {
  args: {
    src: '<https://picsum.photos/seed/playground/800/600>',
    alt: 'Playground image',
    aspectRatio: 'video',
    objectFit: 'cover',
    radius: 'none',
    shadow: 'none',
    priority: false,
    isLoading: false,
    isZoomed: false,
  },
  render: (args) => <Image {...args} style={{ width: 400 }} />,
};
```

---

## 13. Definition of Done Checklist

- [ ] Package created at `packages/components/image/`
- [ ] Recipe created at `packages/core/theme/src/recipes/image.ts`
- [ ] Standalone BEM CSS created at `packages/core/styles/src/components/image.css`
- [ ] `index.ts` barrel exports `Image`, `ImageFallback`, and all public types
- [ ] Exported through `@ideasui/react` master barrel
- [ ] Native `<img>` mode: renders with `src`, `alt`, `srcSet`, `sizes`, `loading`, `fetchPriority`
- [ ] `renderImage` mode: custom renderer called with full `ImageRenderProps`; native `<img>` NOT rendered
- [ ] `priority=true` sets `loading="eager"` and `fetchpriority="high"` on native `<img>`
- [ ] `priority` forwarded via `renderImage` props for Next.js `priority` prop
- [ ] `blurDataURL` renders blurred LQIP `<img>` behind main image; fades out on `onLoad`
- [ ] `blurDataURL` forwarded via `renderImage` props for Next.js `placeholder="blur"`
- [ ] `isLoading=true` shows shimmer skeleton overlay
- [ ] `onLoad` fires → `isLoaded=true`, blur placeholder hidden
- [ ] `onError` fires → `hasError=true`, `ImageFallback` shown, image hidden
- [ ] Default broken icon rendered when no `ImageFallback` child and image errors
- [ ] All 5 `objectFit` values implemented and verified
- [ ] All 4 `aspectRatio` presets (`square`, `video`, `auto`, custom string) implemented
- [ ] Custom `aspectRatio` string applied as inline `style={{ aspectRatio }}`
- [ ] `objectPosition` applied as inline `style={{ objectPosition }}` on `<img>`
- [ ] All 6 `radius` values implemented and verified
- [ ] All 4 `shadow` values implemented and verified
- [ ] `isZoomed` applies CSS scale on hover via `group-hover`
- [ ] `isZoomed` zoom suppressed by `prefers-reduced-motion`
- [ ] `ImageFallback` is always `aria-hidden="true"`
- [ ] Blur placeholder `<img>` is always `aria-hidden="true"` and `alt=""`
- [ ] Skeleton `<div>` is always `aria-hidden="true"`
- [ ] `alt=""` on decorative images passes axe check
- [ ] `displayName` set on both sub-components (`IdeasUI.Image`, `IdeasUI.ImageFallback`)
- [ ] `data-slot` rendered on `image-wrapper`, `image`, `image-blur`, `image-skeleton`, `image-fallback`
- [ ] `ImageRenderProps` type exported from barrel
- [ ] Framework integration verified: plain React, Next.js App Router (fill + fixed), Next.js Pages Router
- [ ] `vitest-axe` accessibility tests pass with 0 violations (basic, decorative, fallback, skeleton, renderImage)
- [ ] `prefers-reduced-motion` suppression verified for zoom, skeleton, and transitions
- [ ] Storybook stories created (`Default`, `AspectRatios`, `ObjectFit`, `Radius`, `Shadow`, `Zoomed`, `Priority`, `BlurPlaceholder`, `LoadingSkeleton`, `ErrorFallback`, `NextJsIntegration`, `AllFeatures`, `Playground`)
- [ ] Documentation page created at `apps/docs/content/react/components/image.mdx`
- [ ] Monorepo `pnpm typecheck` and `pnpm lint` pass cleanly
