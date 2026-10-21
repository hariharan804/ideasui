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

import { forwardRef, useId, useMemo } from 'react';
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

interface BuildMainImagePropsOptions {
  readonly resolved: ReturnType<typeof resolveResolvedProps>;
  readonly imgClass: string;
  readonly blurDataURL?: string;
  readonly crossOrigin?: 'anonymous' | 'use-credentials' | '';
  readonly fetchPriority?: 'high' | 'low' | 'auto';
  readonly height?: number;
  readonly loading?: 'lazy' | 'eager';
  readonly handleError: () => void;
  readonly handleLoad: () => void;
  readonly referrerPolicy?: HTMLAttributeReferrerPolicy;
  readonly renderImage?: ImageProps['renderImage'];
  readonly sizes?: string;
  readonly slotProps?: ImageSlotProps;
  readonly src?: string;
  readonly srcSet?: string;
  readonly width?: number;
}

function buildMainImageProps(options: BuildMainImagePropsOptions): ImageContentProps {
  const {
    resolved,
    imgClass,
    blurDataURL,
    crossOrigin,
    fetchPriority,
    height,
    loading,
    handleError,
    handleLoad,
    referrerPolicy,
    renderImage,
    sizes,
    slotProps,
    src,
    srcSet,
    width,
  } = options;

  const renderProps: ImageRenderProps = {
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
  };

  return {
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
  };
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

  const styles = useMemo(
    () =>
      imageRecipe({
        aspectRatio: resolveStandardAspectRatio(resolved.aspectRatio),
        isLoaded,
        isLoading: resolved.isLoading,
        isZoomed: resolved.isZoomed,
        objectFit: resolved.objectFit,
        radius: resolved.radius,
        shadow: resolved.shadow,
      }),
    [
      resolved.aspectRatio,
      isLoaded,
      resolved.isLoading,
      resolved.isZoomed,
      resolved.objectFit,
      resolved.radius,
      resolved.shadow,
    ],
  );

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

  const mainImageProps = buildMainImageProps({
    blurDataURL,
    crossOrigin,
    fetchPriority,
    handleError,
    handleLoad,
    height,
    imgClass,
    loading,
    referrerPolicy,
    renderImage,
    resolved,
    sizes,
    slotProps,
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
    mainImageProps,
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
