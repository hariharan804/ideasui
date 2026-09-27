import type { CSSProperties, HTMLAttributes, ImgHTMLAttributes, JSX, ReactNode } from 'react';

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
}

export interface ImageSlotProps {
  readonly root?: HTMLAttributes<HTMLDivElement> & { [key: `data-${string}`]: unknown };
  readonly img?: ImgHTMLAttributes<HTMLImageElement> & { [key: `data-${string}`]: unknown };
  readonly fallback?: HTMLAttributes<HTMLDivElement> & { [key: `data-${string}`]: unknown };
  readonly skeleton?: HTMLAttributes<HTMLDivElement> & { [key: `data-${string}`]: unknown };
  readonly blur?: ImgHTMLAttributes<HTMLImageElement> & { [key: `data-${string}`]: unknown };
}

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
   * @default ''
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
