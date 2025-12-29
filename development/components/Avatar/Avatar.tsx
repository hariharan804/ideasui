"use client";
import type {VariantProps} from "tailwind-variants";

import * as React from "react";
import {tv} from "tailwind-variants";

import {cn} from "../../../packages/button/src/lib/utils";

const avatarVariants = tv({
  base: "relative flex shrink-0 overflow-hidden",
  variants: {
    size: {
      sm: "h-8 w-8",
      md: "h-10 w-10",
      lg: "h-12 w-12",
      xl: "h-16 w-16",
    },
    shape: {
      circle: "rounded-full",
      square: "rounded-md",
    },
  },
  defaultVariants: {
    size: "md",
    shape: "circle",
  },
});

interface AvatarProps
  extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof avatarVariants> {
  src?: string;
  alt?: string;
  fallback?: React.ReactNode;
}

export const Avatar = React.forwardRef<HTMLDivElement, AvatarProps>(
  ({className, size, shape, src, alt, fallback, ...props}, ref) => {
    const [imageError, setImageError] = React.useState(false);

    return (
      <div ref={ref} className={cn(avatarVariants({size, shape}), className)} {...props}>
        {src && !imageError ? (
          <img
            alt={alt}
            className="aspect-square h-full w-full object-cover"
            src={src}
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="bg-muted text-muted-foreground flex h-full w-full items-center justify-center">
            {fallback || (
              <svg className="h-1/2 w-1/2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" />
              </svg>
            )}
          </div>
        )}
      </div>
    );
  },
);

Avatar.displayName = "Avatar";
