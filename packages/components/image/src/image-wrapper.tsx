'use client';

import type { CSSProperties, ForwardedRef, JSX, ReactNode } from 'react';

export interface ImageWrapperProps {
  readonly reference: ForwardedRef<HTMLDivElement>;
  readonly isLoading: boolean;
  readonly isLoaded: boolean;
  readonly hasError: boolean;
  readonly caption?: ReactNode;
  readonly captionId: string;
  readonly rootSlotProps: Record<string, unknown>;
  readonly restProps: Record<string, unknown>;
  readonly wrapperClasses: string;
  readonly wrapperStyle: CSSProperties;
  readonly children: ReactNode;
}

export function ImageWrapper(props: ImageWrapperProps): JSX.Element {
  const {
    reference,
    isLoading,
    isLoaded,
    hasError,
    caption,
    captionId,
    rootSlotProps,
    restProps,
    wrapperClasses,
    wrapperStyle,
    children,
  } = props;

  return (
    <div
      ref={reference}
      aria-busy={isLoading || !isLoaded ? true : undefined}
      aria-labelledby={caption ? captionId : undefined}
      data-error={hasError || undefined}
      data-loaded={isLoaded || undefined}
      data-slot="image-wrapper"
      {...rootSlotProps}
      {...restProps}
      className={wrapperClasses}
      style={wrapperStyle}
    >
      {children}
    </div>
  );
}
