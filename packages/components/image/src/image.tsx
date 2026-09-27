'use client';

import type { ImageProps, ImageRenderProps, ImageSlotProps } from './image.types';
import type { CSSProperties, JSX, ReactNode } from 'react';

import { Children, forwardRef, isValidElement, useState } from 'react';
import { image as imageRecipe } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';

import { ImageFallback } from './image-fallback';

function resolveAspectRatioStyle(aspectRatio: string | undefined): CSSProperties {
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

interface ImageContentProps {
  readonly src?: string;
  readonly alt: string;
  readonly width?: number;
  readonly height?: number;
  readonly srcSet?: string;
  readonly sizes?: string;
  readonly priority: boolean;
  readonly imgClass: string;
  readonly imgStyle: CSSProperties;
  readonly slotProps?: ImageSlotProps;
  readonly renderImage?: (props: ImageRenderProps) => JSX.Element;
  readonly handleLoad: () => void;
  readonly handleError: () => void;
  readonly renderProps: ImageRenderProps;
}

function renderMainImage({
  renderImage,
  renderProps,
  alt,
  priority,
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

  return (
    <img
      alt={alt}
      className={imgClass}
      data-slot="image"
      fetchPriority={priority ? 'high' : 'auto'}
      height={height}
      loading={priority ? 'eager' : 'lazy'}
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

interface BlurProps {
  readonly showBlur?: boolean;
  readonly blurDataURL?: string;
  readonly blurClass?: string;
  readonly blurProps?: ImageSlotProps;
}

function renderBlur({ showBlur, blurDataURL, blurClass, blurProps }: BlurProps): ReactNode {
  if (!showBlur || !blurDataURL) {
    return null;
  }

  return (
    <img
      alt=""
      aria-hidden="true"
      src={blurDataURL}
      {...blurProps?.blur}
      className={blurClass}
      data-slot="image-blur"
    />
  );
}

interface SkeletonProps {
  readonly isLoading?: boolean;
  readonly skeletonClass?: string;
  readonly skeletonProps?: ImageSlotProps;
}

function renderSkeleton({ isLoading, skeletonClass, skeletonProps }: SkeletonProps): ReactNode {
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

interface WrapperClassOptions {
  readonly recipeWrapper: string;
  readonly radius: string;
  readonly shadow: string;
  readonly aspectRatio: string;
  readonly isZoomed: boolean;
  readonly classNamesRoot?: string;
  readonly className?: string;
  readonly slotPropsRootClass?: string;
}

function resolveWrapperClasses(options: WrapperClassOptions): string {
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

interface ContentRenderOptions {
  readonly showFallback: boolean;
  readonly children?: ReactNode;
  readonly classNamesFallback?: string;
  readonly slotPropsFallback?: ImageSlotProps['fallback'];
  readonly src?: string;
  readonly mainImageProps: ImageContentProps;
}

function renderContent(options: ContentRenderOptions): ReactNode {
  const { showFallback, children, classNamesFallback, slotPropsFallback, src, mainImageProps } =
    options;

  if (showFallback) {
    return children ?? <ImageFallback className={classNamesFallback} {...slotPropsFallback} />;
  }

  if (src) {
    return renderMainImage(mainImageProps);
  }

  return null;
}

interface UseImageStateOptions {
  readonly src?: string;
  readonly blurDataURL?: string;
  readonly children?: ReactNode;
  readonly onLoad?: () => void;
  readonly onError?: () => void;
}

interface UseImageStateResult {
  readonly isLoaded: boolean;
  readonly hasError: boolean;
  readonly showFallback: boolean;
  readonly showBlur: boolean;
  readonly handleLoad: () => void;
  readonly handleError: () => void;
}

function useImageState(options: UseImageStateOptions): UseImageStateResult {
  const { src, blurDataURL, children, onLoad, onError } = options;
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [blurVisible, setBlurVisible] = useState(Boolean(blurDataURL));

  const hasFallback = Children.toArray(children).some(
    (child) =>
      isValidElement(child) &&
      (child.type as { displayName?: string })?.displayName === 'IdeasUI.ImageFallback',
  );

  const handleLoad = (): void => {
    setIsLoaded(true);
    setBlurVisible(false);
    onLoad?.();
  };

  const handleError = (): void => {
    setHasError(true);
    onError?.();
  };

  return {
    isLoaded,
    hasError,
    showFallback: hasError || (!src && hasFallback),
    showBlur: Boolean(blurDataURL && blurVisible && !hasError),
    handleLoad,
    handleError,
  };
}

interface ResolvedImageProps {
  readonly alt: string;
  readonly objectFit: NonNullable<ImageProps['objectFit']>;
  readonly objectPosition: NonNullable<ImageProps['objectPosition']>;
  readonly aspectRatio: NonNullable<ImageProps['aspectRatio']>;
  readonly radius: NonNullable<ImageProps['radius']>;
  readonly shadow: NonNullable<ImageProps['shadow']>;
  readonly priority: boolean;
  readonly isLoading: boolean;
  readonly isZoomed: boolean;
}

function resolveResolvedProps(props: ImageProps): ResolvedImageProps {
  return {
    alt: props.alt ?? '',
    objectFit: props.objectFit ?? 'cover',
    objectPosition: props.objectPosition ?? 'center',
    aspectRatio: props.aspectRatio ?? 'auto',
    radius: props.radius ?? 'none',
    shadow: props.shadow ?? 'none',
    priority: props.priority ?? false,
    isLoading: props.isLoading ?? false,
    isZoomed: props.isZoomed ?? false,
  };
}

export const Image = forwardRef<HTMLDivElement, ImageProps>((props, reference): JSX.Element => {
  const {
    src,
    width,
    height,
    srcSet,
    sizes,
    renderImage,
    blurDataURL,
    classNames,
    slotProps,
    onLoad,
    onError,
    className,
    style,
    children,
    ...properties
  } = props;

  const {
    alt,
    objectFit,
    objectPosition,
    aspectRatio,
    radius,
    shadow,
    priority,
    isLoading,
    isZoomed,
  } = resolveResolvedProps(props);

  const { isLoaded, hasError, showFallback, showBlur, handleLoad, handleError } = useImageState({
    blurDataURL,
    children,
    onError,
    onLoad,
    src,
  });

  const styles = imageRecipe({
    aspectRatio: ['square', 'video', 'auto'].includes(aspectRatio)
      ? (aspectRatio as 'square' | 'video' | 'auto')
      : 'auto',
    isLoaded,
    isLoading,
    isZoomed,
    objectFit,
    radius,
    shadow,
  });

  const wrapperStyle: CSSProperties = {
    ...resolveAspectRatioStyle(aspectRatio),
    ...style,
    ...slotProps?.root?.style,
  };

  const imgClass = cn(
    styles.img(),
    'ideasui-image__img',
    `ideasui-image__img--${objectFit}`,
    isLoaded ? 'ideasui-image__img--loaded' : 'ideasui-image__img--loading',
    'absolute inset-0',
    classNames?.img,
    slotProps?.img?.className,
  );

  const imgStyle: CSSProperties = {
    objectPosition,
    ...slotProps?.img?.style,
  };

  const renderProps: ImageRenderProps = {
    alt,
    blurDataURL,
    className: imgClass,
    height,
    onError: handleError,
    onLoad: handleLoad,
    priority,
    sizes,
    src,
    srcSet,
    width,
  };

  const wrapperClasses = resolveWrapperClasses({
    aspectRatio,
    className,
    classNamesRoot: classNames?.root,
    isZoomed,
    radius,
    recipeWrapper: styles.wrapper(),
    shadow,
    slotPropsRootClass: slotProps?.root?.className,
  });

  return (
    <div
      ref={reference}
      className={wrapperClasses}
      data-error={hasError || undefined}
      data-loaded={isLoaded || undefined}
      data-slot="image-wrapper"
      style={wrapperStyle}
      {...slotProps?.root}
      {...properties}
    >
      {renderBlur({
        blurClass: cn(
          styles.blur(),
          'ideasui-image__blur',
          classNames?.blur,
          slotProps?.blur?.className,
        ),
        blurDataURL,
        blurProps: slotProps,
        showBlur,
      })}

      {renderSkeleton({
        isLoading,
        skeletonClass: cn(
          styles.skeleton(),
          'ideasui-image__skeleton',
          classNames?.skeleton,
          slotProps?.skeleton?.className,
        ),
        skeletonProps: slotProps,
      })}

      {renderContent({
        children,
        classNamesFallback: classNames?.fallback,
        mainImageProps: {
          alt,
          handleError,
          handleLoad,
          height,
          imgClass,
          imgStyle,
          priority,
          renderImage,
          renderProps,
          sizes,
          slotProps,
          src,
          srcSet,
          width,
        },
        showFallback,
        slotPropsFallback: slotProps?.fallback,
        src,
      })}
    </div>
  );
});

Image.displayName = 'IdeasUI.Image';
