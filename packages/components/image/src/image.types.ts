import type {
  CSSProperties,
  ForwardRefExoticComponent,
  HTMLAttributeReferrerPolicy,
  HTMLAttributes,
  ImgHTMLAttributes,
  JSX,
  ReactNode,
  RefAttributes,
} from 'react';
import type { ImageFallback } from './image-fallback';

export type ImageObjectFit = 'cover' | 'contain' | 'fill' | 'none' | 'scale-down';
export type ImageObjectPosition = 'center' | 'top' | 'bottom' | 'left' | 'right' | (string & {});
export type ImageRadius = 'none' | 'sm' | 'md' | 'lg' | 'xl' | 'full';
export type ImageShadow = 'none' | 'sm' | 'md' | 'lg';
export type ImageAspectRatio = 'square' | 'video' | 'auto' | (string & {});

export interface ImageSlotClassNames {
  readonly root?: string;
  readonly img?: string;
  readonly fallback?: string;
  readonly skeleton?: string;
  readonly blur?: string;
  readonly figure?: string;
  readonly caption?: string;
}

export interface ImageSlotProps {
  readonly root?: HTMLAttributes<HTMLDivElement> & { [key: `data-${string}`]: unknown };
  readonly img?: ImgHTMLAttributes<HTMLImageElement> & { [key: `data-${string}`]: unknown };
  readonly fallback?: HTMLAttributes<HTMLDivElement> & { [key: `data-${string}`]: unknown };
  readonly skeleton?: HTMLAttributes<HTMLDivElement> & { [key: `data-${string}`]: unknown };
  readonly blur?: ImgHTMLAttributes<HTMLImageElement> & { [key: `data-${string}`]: unknown };
  readonly figure?: HTMLAttributes<HTMLElement> & { [key: `data-${string}`]: unknown };
  readonly caption?: HTMLAttributes<HTMLElement> & { [key: `data-${string}`]: unknown };
}

export interface ImageRenderProps {
  /** The image source URL. */
  readonly src?: string;
  /** Alt text passed through from `Image` `alt` prop. */
  readonly alt?: string;
  /** Width in pixels. */
  readonly width?: number;
  /** Height in pixels. */
  readonly height?: number;
  /** CSS class string to apply to the rendered image element. */
  readonly className?: string;
  /** Blur data URL for LQIP placeholder. */
  readonly blurDataURL?: string;
  /** Whether this is a priority / LCP image. */
  readonly priority?: boolean;
  /** Native image loading strategy for SEO. */
  readonly loading?: 'lazy' | 'eager';
  /** Image decoding hint for Core Web Vitals optimization. */
  readonly decoding?: 'async' | 'sync' | 'auto';
  /** Fetch priority hint for LCP optimization. */
  readonly fetchPriority?: 'high' | 'low' | 'auto';
  /** Cross-origin attribute for CDN sharing. */
  readonly crossOrigin?: 'anonymous' | 'use-credentials' | '';
  /** Referrer policy for external image assets. */
  readonly referrerPolicy?: HTMLAttributeReferrerPolicy;
  /** srcSet string for responsive images. */
  readonly srcSet?: string;
  /** sizes string for responsive images. */
  readonly sizes?: string;
  /** Called when the image finishes loading successfully. */
  readonly onLoad?: () => void;
  /** Called when the image fails to load. */
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
   * @default ''
   */
  readonly alt?: string;

  /**
   * Intrinsic width of the image in pixels.
   * Used by native `<img>` to prevent Cumulative Layout Shift (CLS) and passed to `renderImage`.
   */
  readonly width?: number;

  /**
   * Intrinsic height of the image in pixels.
   * Used by native `<img>` to prevent Cumulative Layout Shift (CLS) and passed to `renderImage`.
   */
  readonly height?: number;

  /**
   * Responsive image srcSet string.
   * e.g. `"/img-400.jpg 400w, /img-800.jpg 800w"`
   */
  readonly srcSet?: string;

  /**
   * Responsive sizes string.
   * e.g. `"(max-width: 768px) 100vw, 800px"`
   */
  readonly sizes?: string;

  /**
   * Native image loading strategy.
   * Defaults to `'eager'` when `priority={true}`, otherwise `'lazy'`.
   */
  readonly loading?: 'lazy' | 'eager';

  /**
   * Image decoding hint. Modern SEO best practice defaults to `'async'`
   * to avoid blocking the main browser thread during Core Web Vitals checks.
   * @default 'async'
   */
  readonly decoding?: 'async' | 'sync' | 'auto';

  /**
   * Fetch priority hint for browser preloading and LCP optimization.
   * Defaults to `'high'` when `priority={true}`, otherwise `'auto'`.
   */
  readonly fetchPriority?: 'high' | 'low' | 'auto';

  /**
   * Cross-origin attribute for CDN and resource sharing.
   */
  readonly crossOrigin?: 'anonymous' | 'use-credentials' | '';

  /**
   * Referrer policy for external image assets.
   */
  readonly referrerPolicy?: HTMLAttributeReferrerPolicy;

  /**
   * Optional image caption. When provided, the image is rendered inside a semantic
   * `<figure>` with an accessible `<figcaption>` linked via `aria-labelledby`.
   */
  readonly caption?: ReactNode;

  /**
   * Custom image renderer — replaces the native `<img>` element entirely.
   * Receives `ImageRenderProps` and must return a rendered image element.
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
   */
  readonly blurDataURL?: string;

  /**
   * Shows a shimmer skeleton overlay. Use when the image src is not yet available.
   * @default false
   */
  readonly isLoading?: boolean;

  /**
   * Applies a CSS scale transform on hover for a zoom-in effect.
   * @default false
   */
  readonly isZoomed?: boolean;

  /**
   * Slot specific class names.
   */
  readonly classNames?: ImageSlotClassNames;

  /**
   * Slot specific props.
   */
  readonly slotProps?: ImageSlotProps;

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
   * Shorthand fallback content shown when the image errors or `src` is absent.
   * If not provided, an `ImageFallback` child can be used instead.
   */
  readonly fallback?: ReactNode;

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

export type ImageComponent = ForwardRefExoticComponent<
  ImageProps & RefAttributes<HTMLDivElement>
> & {
  Fallback: typeof ImageFallback;
};
