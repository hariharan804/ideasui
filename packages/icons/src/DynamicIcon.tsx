import React, { Suspense, lazy, useMemo } from 'react';
import type { DynamicIconProps, IconProps } from './types';

// Default fallback icon
const DefaultFallback: React.FC<IconProps> = ({ size = 24, color = 'currentColor', className, ...props }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
    <path d="M12 17h.01" />
  </svg>
);

// Icon cache for performance
const iconCache = new Map<string, React.ComponentType<IconProps>>();

/**
 * Dynamic icon component that loads icons on demand
 * 
 * @example
 * ```tsx
 * <DynamicIcon name="arrow-right" size={24} color="blue" />
 * ```
 */
export const DynamicIcon: React.FC<DynamicIconProps> = ({
  name,
  fallback: Fallback = DefaultFallback,
  ...iconProps
}) => {
  const IconComponent = useMemo(() => {
    // Check cache first
    if (iconCache.has(name)) {
      return iconCache.get(name)!;
    }

    // Create lazy component
    const LazyIcon = lazy(async () => {
      try {
        // Dynamic import with proper error handling
        const module = await import(`./${name}`);
        const Component = module[name] || module.default;
        
        if (!Component) {
          throw new Error(`Icon "${name}" not found in module`);
        }

        // Cache the component
        iconCache.set(name, Component);
        
        return { default: Component };
      } catch (error) {
        console.warn(`Failed to load icon "${name}":`, error);
        // Return fallback as default export
        return { default: Fallback };
      }
    });

    return LazyIcon;
  }, [name, Fallback]);

  return (
    <Suspense fallback={<Fallback {...iconProps} />}>
      <IconComponent {...iconProps} />
    </Suspense>
  );
};

DynamicIcon.displayName = 'DynamicIcon';