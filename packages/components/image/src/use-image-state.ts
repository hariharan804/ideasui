'use client';

import type { ReactNode } from 'react';

import { Children, isValidElement, useState } from 'react';

export interface UseImageStateOptions {
  readonly src?: string;
  readonly blurDataURL?: string;
  readonly children?: ReactNode;
  readonly fallback?: ReactNode;
  readonly onLoad?: () => void;
  readonly onError?: () => void;
}

export interface UseImageStateResult {
  readonly isLoaded: boolean;
  readonly hasError: boolean;
  readonly showFallback: boolean;
  readonly showBlur: boolean;
  readonly handleLoad: () => void;
  readonly handleError: () => void;
}

export function useImageState(options: UseImageStateOptions): UseImageStateResult {
  const { src, blurDataURL, children, fallback, onLoad, onError } = options;
  const [prevSrc, setPrevSrc] = useState(src);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [blurVisible, setBlurVisible] = useState(Boolean(blurDataURL));

  if (prevSrc !== src) {
    setPrevSrc(src);
    setIsLoaded(false);
    setHasError(false);
    setBlurVisible(Boolean(blurDataURL));
  }

  const hasFallbackChild = Children.toArray(children).some(
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

  const hasFallback = Boolean(fallback) || hasFallbackChild;

  return {
    handleError,
    handleLoad,
    hasError,
    isLoaded,
    showBlur: Boolean(blurDataURL && blurVisible && !hasError),
    showFallback: hasError || (!src && hasFallback),
  };
}
