import type {
  CSSProperties,
  ForwardRefExoticComponent,
  HTMLAttributes,
  ImgHTMLAttributes,
  JSX,
  ReactNode,
  RefAttributes,
} from 'react';
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
   * Explicit initials to display in fallback. Overrides initials generated from `name`.
   */
  readonly initials?: string;

  /**
   * Shorthand custom icon element displayed in fallback when image is not available.
   */
  readonly icon?: ReactNode;

  /**
   * Shorthand fallback content (SVG, element, or text) displayed when image is not available.
   */
  readonly fallback?: ReactNode;

  /**
   * Alt text for the image. Defaults to `name` if provided, otherwise `''`.
   */
  readonly alt?: string;

  /**
   * Custom image renderer — replaces the default `<img>` element.
   * Receives `{ src, alt, className, onError }` and must render an image element.
   * Use this to integrate Next.js `<Image>`, Gatsby `<GatsbyImage>`, or any other
   * optimized image component.
   */
  readonly as?: (props: AvatarImageRenderProps) => JSX.Element;

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
   * Custom CSS classes for individual avatar slots.
   */
  readonly classNames?: AvatarSlotClassNames;

  /**
   * Custom props forwarded to individual avatar slots.
   */
  readonly slotProps?: AvatarSlotProps;

  /**
   * Inline styles applied to the root element.
   */
  readonly style?: CSSProperties;

  /**
   * Child sub-components (`AvatarImage`, `AvatarFallback`).
   * When omitted, `Avatar` auto-renders image + fallback from props.
   */
  readonly children?: ReactNode;
}

export interface AvatarSlotClassNames {
  readonly root?: string;
  readonly image?: string;
  readonly fallback?: string;
  readonly icon?: string;
}

export interface AvatarSlotProps {
  readonly root?: HTMLAttributes<HTMLSpanElement> & { [key: `data-${string}`]: unknown };
  readonly image?: Partial<AvatarImageProps> & { [key: `data-${string}`]: unknown };
  readonly fallback?: Partial<AvatarFallbackProps> & { [key: `data-${string}`]: unknown };
  readonly icon?: Partial<AvatarIconProps> & { [key: `data-${string}`]: unknown };
}

export interface AvatarGroupSlotClassNames {
  readonly root?: string;
  readonly overflow?: string;
}

export interface AvatarGroupSlotProps {
  readonly root?: HTMLAttributes<HTMLDivElement> & { [key: `data-${string}`]: unknown };
  readonly overflow?: HTMLAttributes<HTMLSpanElement> & { [key: `data-${string}`]: unknown };
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
   * Custom CSS classes for individual group slots.
   */
  readonly classNames?: AvatarGroupSlotClassNames;

  /**
   * Custom props forwarded to individual group slots.
   */
  readonly slotProps?: AvatarGroupSlotProps;

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
  'src' | 'children' | 'onError'
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
   * Callback fired when image fails to load.
   */
  readonly onError?: (event?: unknown) => void;

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

  /**
   * Shorthand icon element to display inside fallback. Automatically wrapped in AvatarIcon.
   */
  readonly icon?: ReactNode;

  readonly className?: string;

  /**
   * Fallback content. Accepts:
   * - An inline SVG component (e.g. `<BotAvatarSvg />`)
   * - An `<AvatarIcon>` wrapper with any icon
   * - Any `ReactNode`
   * When omitted, renders `icon`, `initials`, or the default person SVG.
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

/**
 * Type for the Avatar component with attached static compound components.
 */
export interface AvatarComponent extends ForwardRefExoticComponent<
  AvatarProps & RefAttributes<HTMLSpanElement>
> {
  /**
   * Component to group multiple avatars together with overlap and overflow indicator.
   */
  Group: ForwardRefExoticComponent<AvatarGroupProps & RefAttributes<HTMLDivElement>>;
  /**
   * Component to render avatar image with support for native img, custom as renderer, or inline SVG.
   */
  Image: ForwardRefExoticComponent<AvatarImageProps & RefAttributes<HTMLImageElement>>;
  /**
   * Component to display fallback initials, custom icon, or default SVG icon.
   */
  Fallback: ForwardRefExoticComponent<AvatarFallbackProps & RefAttributes<HTMLSpanElement>>;
  /**
   * Component to wrap decorative icons inside avatar fallback.
   */
  Icon: ForwardRefExoticComponent<AvatarIconProps & RefAttributes<HTMLSpanElement>>;
}
