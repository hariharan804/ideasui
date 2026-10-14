'use client';

import type {
  CSSProperties,
  HTMLAttributeReferrerPolicy,
  HTMLAttributes,
  JSX,
  ReactNode,
} from 'react';
import type { ImageRenderProps, ImageSlotProps } from './image.types';

import { cn } from '@ideasui/utils';

import { ImageFallback } from './image-fallback';

export interface ImageContentProps {
  readonly src?: string;
  readonly alt: string;
  readonly width?: number;
  readonly height?: number;
  readonly srcSet?: string;
  readonly sizes?: string;
  readonly priority: boolean;
  readonly loading?: 'lazy' | 'eager';
  readonly decoding?: 'async' | 'sync' | 'auto';
  readonly fetchPriority?: 'high' | 'low' | 'auto';
  readonly crossOrigin?: 'anonymous' | 'use-credentials' | '';
  readonly referrerPolicy?: HTMLAttributeReferrerPolicy;
  readonly imgClass: string;
  readonly imgStyle: CSSProperties;
  readonly slotProps?: ImageSlotProps;
  readonly renderImage?: (props: ImageRenderProps) => JSX.Element;
  readonly handleLoad: () => void;
  readonly handleError: () => void;
  readonly renderProps: ImageRenderProps;
}

export function renderMainImage({
  renderImage,
  renderProps,
  alt,
  priority,
  loading,
  decoding = 'async',
  fetchPriority,
  crossOrigin,
  referrerPolicy,
  height,
  sizes,
  src,
  srcSet,
  width,
  slotProps,
  imgClass,
  handleError,
  handleLoad,
  imgStyle,
}: ImageContentProps): ReactNode {
  if (renderImage) {
    return renderImage(renderProps);
  }

  const loadingResolved = loading ?? (priority ? 'eager' : 'lazy');
  const fetchPriorityResolved = fetchPriority ?? (priority ? 'high' : 'auto');

  return (
    <img
      alt={alt}
      className={imgClass}
      crossOrigin={crossOrigin}
      data-slot="image"
      decoding={decoding}
      fetchPriority={fetchPriorityResolved}
      height={height}
      loading={loadingResolved}
      referrerPolicy={referrerPolicy}
      sizes={sizes}
      src={src}
      srcSet={srcSet}
      style={imgStyle}
      width={width}
      {...slotProps?.img}
      onError={handleError}
      onLoad={handleLoad}
    />
  );
}

export interface BlurProps {
  readonly blurDataURL?: string;
  readonly blurClass?: string;
  readonly blurProps?: ImageSlotProps;
  readonly isLoaded: boolean;
  readonly hasError: boolean;
}

export function renderBlur({
  blurDataURL,
  blurClass,
  blurProps,
  isLoaded,
  hasError,
}: BlurProps): ReactNode {
  if (!blurDataURL || hasError) {
    return null;
  }

  return (
    <img
      alt=""
      aria-hidden="true"
      src={blurDataURL}
      {...blurProps?.blur}
      className={cn(blurClass, isLoaded ? 'pointer-events-none opacity-0' : 'opacity-100')}
      data-slot="image-blur"
    />
  );
}

export interface SkeletonProps {
  readonly isLoading?: boolean;
  readonly skeletonClass?: string;
  readonly skeletonProps?: ImageSlotProps;
}

export function renderSkeleton({
  isLoading,
  skeletonClass,
  skeletonProps,
}: SkeletonProps): ReactNode {
  if (!isLoading) {
    return null;
  }

  return (
    <div
      aria-hidden="true"
      {...skeletonProps?.skeleton}
      className={skeletonClass}
      data-slot="image-skeleton"
    />
  );
}

export interface ContentRenderOptions {
  readonly showFallback: boolean;
  readonly fallback?: ReactNode;
  readonly children?: ReactNode;
  readonly classNamesFallback?: string;
  readonly slotPropsFallback?: ImageSlotProps['fallback'];
  readonly src?: string;
  readonly alt?: string;
  readonly mainImageProps: ImageContentProps;
}

export function renderContent(options: ContentRenderOptions): ReactNode {
  const {
    showFallback,
    fallback,
    children,
    classNamesFallback,
    slotPropsFallback,
    src,
    alt,
    mainImageProps,
  } = options;

  if (showFallback) {
    const fallbackAriaLabel = slotPropsFallback?.['aria-label'] ?? (alt || 'Image unavailable');

    if (fallback) {
      return (
        <ImageFallback
          aria-label={fallbackAriaLabel}
          className={classNamesFallback}
          {...slotPropsFallback}
        >
          {fallback}
        </ImageFallback>
      );
    }

    return (
      children ?? (
        <ImageFallback
          aria-label={fallbackAriaLabel}
          className={classNamesFallback}
          {...slotPropsFallback}
        />
      )
    );
  }

  if (src) {
    return renderMainImage(mainImageProps);
  }

  return null;
}

export interface BlurSlotOptions {
  readonly recipeBlur: string;
  readonly classNamesBlur?: string;
  readonly slotBlurClass?: string;
  readonly blurDataURL?: string;
  readonly slotProps?: ImageSlotProps;
  readonly hasError: boolean;
  readonly isLoaded: boolean;
}

export function renderBlurSlot(options: BlurSlotOptions): ReactNode {
  return renderBlur({
    blurClass: cn(
      options.recipeBlur,
      'ideasui-image__blur',
      options.classNamesBlur,
      options.slotBlurClass,
    ),
    blurDataURL: options.blurDataURL,
    blurProps: options.slotProps,
    hasError: options.hasError,
    isLoaded: options.isLoaded,
  });
}

export interface SkeletonSlotOptions {
  readonly recipeSkeleton: string;
  readonly classNamesSkeleton?: string;
  readonly slotSkeletonClass?: string;
  readonly slotProps?: ImageSlotProps;
  readonly isLoading: boolean;
}

export function renderSkeletonSlot(options: SkeletonSlotOptions): ReactNode {
  return renderSkeleton({
    isLoading: options.isLoading,
    skeletonClass: cn(
      options.recipeSkeleton,
      'ideasui-image__skeleton',
      options.classNamesSkeleton,
      options.slotSkeletonClass,
    ),
    skeletonProps: options.slotProps,
  });
}

export interface FigureWrapperOptions {
  readonly caption?: ReactNode;
  readonly captionId?: string;
  readonly children: ReactNode;
  readonly classNamesFigure?: string;
  readonly classNamesCaption?: string;
  readonly slotPropsFigure?: HTMLAttributes<HTMLElement>;
  readonly slotPropsCaption?: HTMLAttributes<HTMLElement>;
}

export function renderFigureWrapper(options: FigureWrapperOptions): ReactNode {
  const {
    caption,
    captionId,
    children,
    classNamesFigure,
    classNamesCaption,
    slotPropsFigure,
    slotPropsCaption,
  } = options;

  if (!caption) {
    return children;
  }

  return (
    <figure
      data-slot="image-figure"
      {...slotPropsFigure}
      className={cn(
        'ideasui-image__figure m-0 inline-block',
        classNamesFigure,
        slotPropsFigure?.className,
      )}
    >
      {children}
      <figcaption
        data-slot="image-caption"
        id={captionId}
        {...slotPropsCaption}
        className={cn(
          'ideasui-image__caption text-content-secondary mt-2 text-center text-sm',
          classNamesCaption,
          slotPropsCaption?.className,
        )}
      >
        {caption}
      </figcaption>
    </figure>
  );
}
