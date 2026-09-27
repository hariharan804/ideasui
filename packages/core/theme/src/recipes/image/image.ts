import type { VariantProps } from 'tailwind-variants';

import { tv } from 'tailwind-variants';

export const image = tv({
  slots: {
    wrapper: ['relative overflow-hidden', 'transition-transform duration-300'],
    img: ['w-full h-full', 'transition-opacity duration-300'],
    fallback: [
      'absolute inset-0 flex items-center justify-center',
      'bg-surface-muted text-content-secondary',
    ],
    skeleton: ['absolute inset-0 z-10', 'bg-surface-muted', 'animate-pulse'],
    blur: [
      'absolute inset-0 w-full h-full',
      'scale-110 blur-xl',
      'transition-opacity duration-500',
    ],
  },

  variants: {
    objectFit: {
      cover: { img: 'object-cover' },
      contain: { img: 'object-contain' },
      fill: { img: 'object-fill' },
      none: { img: 'object-none' },
      'scale-down': { img: 'object-scale-down' },
    },

    radius: {
      none: { wrapper: 'rounded-none' },
      sm: { wrapper: 'rounded-sm' },
      md: { wrapper: 'rounded-md' },
      lg: { wrapper: 'rounded-lg' },
      xl: { wrapper: 'rounded-xl' },
      full: { wrapper: 'rounded-full' },
    },

    shadow: {
      none: { wrapper: 'shadow-none' },
      sm: { wrapper: 'shadow-sm' },
      md: { wrapper: 'shadow-md' },
      lg: { wrapper: 'shadow-lg' },
    },

    aspectRatio: {
      square: { wrapper: 'aspect-square' },
      video: { wrapper: 'aspect-video' },
      auto: { wrapper: '' },
    },

    isZoomed: {
      true: {
        wrapper: 'group',
        img: 'group-hover:scale-110 transition-transform duration-500',
      },
    },

    isLoaded: {
      true: { img: 'opacity-100' },
      false: { img: 'opacity-0' },
    },

    isLoading: {
      true: { skeleton: 'opacity-100' },
      false: { skeleton: 'opacity-0 pointer-events-none' },
    },
  },

  defaultVariants: {
    objectFit: 'cover',
    radius: 'none',
    shadow: 'none',
    aspectRatio: 'auto',
    isZoomed: false,
    isLoaded: false,
    isLoading: false,
  },
});

export type ImageVariantProps = VariantProps<typeof image>;
export type ImageSlots = keyof ReturnType<typeof image>;
export type ImageReturnType = ReturnType<typeof image>;
