'use client';

import type { ImageFallbackProps } from './image.types';
import type { JSX } from 'react';

import { forwardRef } from 'react';
import { image as imageRecipe } from '@ideasui/theme/recipes';
import { cn } from '@ideasui/utils';

const DefaultBrokenIcon = (): JSX.Element => (
  <svg
    aria-hidden="true"
    fill="none"
    focusable="false"
    height="2rem"
    stroke="currentColor"
    strokeWidth="1.5"
    viewBox="0 0 24 24"
    width="2rem"
  >
    <path
      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 3l18 18"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M3 3l18 18M3 3h18v18H3V3z"
      opacity="0.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const ImageFallback = forwardRef<HTMLDivElement, ImageFallbackProps>(
  ({ children, className, style, ...properties }, reference): JSX.Element => {
    const styles = imageRecipe();

    return (
      <div
        ref={reference}
        aria-hidden="true"
        className={cn(styles.fallback(), 'ideasui-image__fallback', className)}
        data-slot="image-fallback"
        style={style}
        {...properties}
      >
        {children ?? <DefaultBrokenIcon />}
      </div>
    );
  },
);

ImageFallback.displayName = 'IdeasUI.ImageFallback';
