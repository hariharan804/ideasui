import type { CSSProperties } from 'react';
import type { ImageProps } from './image.types';

import { cn } from '@ideasui/utils';

export const IMAGE_PROPS_TO_OMIT = [
  'alt',
  'aspectRatio',
  'blurDataURL',
  'caption',
  'children',
  'className',
  'classNames',
  'crossOrigin',
  'decoding',
  'fallback',
  'fetchPriority',
  'height',
  'isLoading',
  'isZoomed',
  'loading',
  'objectFit',
  'objectPosition',
  'onError',
  'onLoad',
  'priority',
  'radius',
  'referrerPolicy',
  'renderImage',
  'shadow',
  'sizes',
  'slotProps',
  'src',
  'srcSet',
  'style',
  'width',
] as const;

export function resolveAspectRatioStyle(aspectRatio: string | undefined): CSSProperties {
  if (!aspectRatio || aspectRatio === 'auto') {
    return {};
  }
  if (aspectRatio === 'square') {
    return { aspectRatio: '1 / 1' };
  }
  if (aspectRatio === 'video') {
    return { aspectRatio: '16 / 9' };
  }

  return { aspectRatio };
}

export function resolveStandardAspectRatio(ratio: string): 'square' | 'video' | 'auto' {
  if (ratio === 'square' || ratio === 'video') {
    return ratio;
  }

  return 'auto';
}

export function resolveWrapperStyle(
  aspectRatio: string | undefined,
  style?: CSSProperties,
  slotStyle?: CSSProperties,
): CSSProperties {
  return {
    ...resolveAspectRatioStyle(aspectRatio),
    ...style,
    ...slotStyle,
  };
}

export function resolveImgClass(
  recipeImg: string,
  objectFit: string,
  isLoaded: boolean,
  className?: string,
  slotClassName?: string,
): string {
  return cn(
    recipeImg,
    'ideasui-image__img',
    `ideasui-image__img--${objectFit}`,
    isLoaded ? 'ideasui-image__img--loaded' : 'ideasui-image__img--loading',
    'absolute inset-0',
    className,
    slotClassName,
  );
}

export interface ResolvedImageProps {
  readonly alt: string;
  readonly objectFit: NonNullable<ImageProps['objectFit']>;
  readonly objectPosition: NonNullable<ImageProps['objectPosition']>;
  readonly aspectRatio: NonNullable<ImageProps['aspectRatio']>;
  readonly radius: NonNullable<ImageProps['radius']>;
  readonly shadow: NonNullable<ImageProps['shadow']>;
  readonly priority: boolean;
  readonly isLoading: boolean;
  readonly isZoomed: boolean;
  readonly decoding: NonNullable<ImageProps['decoding']>;
}

export function resolveResolvedProps(props: ImageProps): ResolvedImageProps {
  return {
    alt: props.alt ?? '',
    aspectRatio: props.aspectRatio ?? 'auto',
    decoding: props.decoding ?? 'async',
    isLoading: props.isLoading ?? false,
    isZoomed: props.isZoomed ?? false,
    objectFit: props.objectFit ?? 'cover',
    objectPosition: props.objectPosition ?? 'center',
    priority: props.priority ?? false,
    radius: props.radius ?? 'none',
    shadow: props.shadow ?? 'none',
  };
}

export interface WrapperClassOptions {
  readonly recipeWrapper: string;
  readonly radius: string;
  readonly shadow: string;
  readonly aspectRatio: string;
  readonly isZoomed: boolean;
  readonly classNamesRoot?: string;
  readonly className?: string;
  readonly slotPropsRootClass?: string;
}

export function resolveWrapperClasses(options: WrapperClassOptions): string {
  const {
    recipeWrapper,
    radius,
    shadow,
    aspectRatio,
    isZoomed,
    classNamesRoot,
    className,
    slotPropsRootClass,
  } = options;

  const radiusClass = radius === 'none' ? '' : `ideasui-image--radius-${radius}`;
  const shadowClass = shadow === 'none' ? '' : `ideasui-image--shadow-${shadow}`;
  const isStandardRatio = aspectRatio === 'square' || aspectRatio === 'video';
  const aspectClass =
    aspectRatio === 'auto' || !isStandardRatio ? '' : `ideasui-image--aspect-${aspectRatio}`;
  const zoomedClass = isZoomed ? 'ideasui-image--zoomed' : '';

  return cn(
    recipeWrapper,
    'ideasui-image',
    radiusClass,
    shadowClass,
    aspectClass,
    zoomedClass,
    classNamesRoot,
    className,
    slotPropsRootClass,
  );
}
