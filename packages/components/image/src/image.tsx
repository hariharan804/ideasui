'use client';

import type { HTMLAttributeReferrerPolicy, JSX, ReactNode } from 'react';
import type { ImageContentProps } from './image-elements';
import type {
  ImageComponent,
  ImageProps,
  ImageRenderProps,
  ImageSlotClassNames,
  ImageSlotProps,
} from './image.types';

import { forwardRef, useId } from 'react';
import { image as imageRecipe } from '@ideasui/theme/recipes';
import { omit } from '@ideasui/utils';

import {
  renderBlurSlot,
  renderContent,
  renderFigureWrapper,
  renderSkeletonSlot,
} from './image-elements';
import { ImageFallback } from './image-fallback';
import {
  IMAGE_PROPS_TO_OMIT,
  resolveImgClass,
  resolveResolvedProps,
  resolveStandardAspectRatio,
  resolveWrapperClasses,
  resolveWrapperStyle,
} from './image-utils';
import { ImageWrapper } from './image-wrapper';
import { useImageState } from './use-image-state';

interface ImageSlotContentOptions {
  readonly styles: ReturnType<typeof imageRecipe>;
  readonly classNames?: ImageSlotClassNames;
  readonly slotProps?: ImageSlotProps;
  readonly blurDataURL?: string;
  readonly hasError: boolean;
  readonly isLoaded: boolean;
  readonly isLoading: boolean;
  readonly alt: string;
  readonly fallback?: ReactNode;
  readonly children?: ReactNode;
  readonly mainImageProps: ImageContentProps;
  readonly showFallback: boolean;
  readonly src?: string;
}

function renderImageSlotContent(options: ImageSlotContentOptions): ReactNode {
  const {
    styles,
    classNames,
    slotProps,
    blurDataURL,
    hasError,
    isLoaded,
    isLoading,
    alt,
    fallback,
    children,
    mainImageProps,
    showFallback,
    src,
  } = options;

  return (
    <>
      {renderBlurSlot({
        blurDataURL,
        classNamesBlur: classNames?.blur,
        hasError,
        isLoaded,
        recipeBlur: styles.blur(),
        slotBlurClass: slotProps?.blur?.className,
        slotProps,
      })}
      {renderSkeletonSlot({
        classNamesSkeleton: classNames?.skeleton,
        isLoading,
        recipeSkeleton: styles.skeleton(),
        slotProps,
        slotSkeletonClass: slotProps?.skeleton?.className,
      })}
      {renderContent({
        alt,
        children,
        classNamesFallback: classNames?.fallback,
        fallback,
        mainImageProps,
        showFallback,
        slotPropsFallback: slotProps?.fallback,
        src,
      })}
    </>
  );
}

interface BuildRenderPropsOptions {
  readonly alt: string;
  readonly blurDataURL?: string;
  readonly className: string;
  readonly crossOrigin?: 'anonymous' | 'use-credentials' | '';
  readonly decoding?: 'async' | 'sync' | 'auto';
  readonly fetchPriority?: 'high' | 'low' | 'auto';
  readonly height?: number;
  readonly loading?: 'lazy' | 'eager';
  readonly onError: () => void;
  readonly onLoad: () => void;
  readonly priority: boolean;
  readonly referrerPolicy?: HTMLAttributeReferrerPolicy;
  readonly sizes?: string;
  readonly src?: string;
  readonly srcSet?: string;
  readonly width?: number;
}

function buildRenderProps(options: BuildRenderPropsOptions): ImageRenderProps {
  return options;
}

const ImageBase = forwardRef<HTMLDivElement, ImageProps>((props, reference): JSX.Element => {
  const {
    blurDataURL,
    caption,
    children,
    className,
    classNames,
    crossOrigin,
    fallback,
    fetchPriority,
    height,
    loading,
    onError,
    onLoad,
    referrerPolicy,
    renderImage,
    sizes,
    slotProps,
    src,
    srcSet,
    style,
    width,
  } = props;

  const captionId = useId();
  const resolved = resolveResolvedProps(props);

  const { isLoaded, hasError, showFallback, handleLoad, handleError } = useImageState({
    blurDataURL,
    children,
    fallback,
    onError,
    onLoad,
    src,
  });

  const styles = imageRecipe({
    aspectRatio: resolveStandardAspectRatio(resolved.aspectRatio),
    isLoaded,
    isLoading: resolved.isLoading,
    isZoomed: resolved.isZoomed,
    objectFit: resolved.objectFit,
    radius: resolved.radius,
    shadow: resolved.shadow,
  });

  const restProps = omit(
    props as unknown as Record<string, unknown>,
    IMAGE_PROPS_TO_OMIT as unknown as (keyof Record<string, unknown>)[],
  );

  const rootSlotProps = omit(
    (slotProps?.root ?? {}) as Record<string, unknown>,
    ['className', 'style'] as (keyof Record<string, unknown>)[],
  );

  const wrapperStyle = resolveWrapperStyle(resolved.aspectRatio, style, slotProps?.root?.style);

  const imgClass = resolveImgClass(
    styles.img(),
    resolved.objectFit,
    isLoaded,
    classNames?.img,
    slotProps?.img?.className,
  );

  const renderProps = buildRenderProps({
    alt: resolved.alt,
    blurDataURL,
    className: imgClass,
    crossOrigin,
    decoding: resolved.decoding,
    fetchPriority,
    height,
    loading,
    onError: handleError,
    onLoad: handleLoad,
    priority: resolved.priority,
    referrerPolicy,
    sizes,
    src,
    srcSet,
    width,
  });

  const wrapperClasses = resolveWrapperClasses({
    aspectRatio: resolved.aspectRatio,
    className,
    classNamesRoot: classNames?.root,
    isZoomed: resolved.isZoomed,
    radius: resolved.radius,
    recipeWrapper: styles.wrapper(),
    shadow: resolved.shadow,
    slotPropsRootClass: slotProps?.root?.className,
  });

  const slotContent = renderImageSlotContent({
    alt: resolved.alt,
    blurDataURL,
    children,
    classNames,
    fallback,
    hasError,
    isLoaded,
    isLoading: resolved.isLoading,
    mainImageProps: {
      alt: resolved.alt,
      crossOrigin,
      decoding: resolved.decoding,
      fetchPriority,
      handleError,
      handleLoad,
      height,
      imgClass,
      imgStyle: { objectPosition: resolved.objectPosition, ...slotProps?.img?.style },
      loading,
      priority: resolved.priority,
      referrerPolicy,
      renderImage,
      renderProps,
      sizes,
      slotProps,
      src,
      srcSet,
      width,
    },
    showFallback,
    slotProps,
    src,
    styles,
  });

  const wrapperNode = (
    <ImageWrapper
      caption={caption}
      captionId={captionId}
      hasError={hasError}
      isLoaded={isLoaded}
      isLoading={resolved.isLoading}
      reference={reference}
      restProps={restProps}
      rootSlotProps={rootSlotProps}
      wrapperClasses={wrapperClasses}
      wrapperStyle={wrapperStyle}
    >
      {slotContent}
    </ImageWrapper>
  );

  return renderFigureWrapper({
    caption,
    captionId,
    children: wrapperNode,
    classNamesCaption: classNames?.caption,
    classNamesFigure: classNames?.figure,
    slotPropsCaption: slotProps?.caption,
    slotPropsFigure: slotProps?.figure,
  }) as JSX.Element;
});

ImageBase.displayName = 'IdeasUI.Image';

export const Image = ImageBase as ImageComponent;

Image.Fallback = ImageFallback;
